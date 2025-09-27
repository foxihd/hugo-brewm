/*
MIT License

Copyright (c) 2024 Nicholas Sideras

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const bskyRoot = getElement('bsky-comments');

if (bskyRoot) {
    var bskyCommentsLoaded = false;
    var skeetURL = bskyRoot.dataset.url;
    const toBskyURL = (uri) => {
    const splitUri = uri.split('/');
    if (splitUri[0] === 'at:') {
        return 'https://bsky.app/profile/' + splitUri[2] + '/post/' + splitUri[4];
    } else {
        return uri;
    }
}
    const toAtProtoURI = (splitUrl) => `at://${splitUrl[4]}/app.bsky.feed.post/${splitUrl[6]}`;
    const ToBskyImgURL = (did, blobLink, thumb) => `https://cdn.bsky.app/img/${thumb ? 'feed_thumbnail' : 'feed_fullsize'}/plain/${did}/${blobLink}`;
    const bskyAPI = getURI(skeetURL, toAtProtoURI);

    if (bskyAPI !== skeetURL) {

        const loadbskyAPI = async () => {
        if (bskyCommentsLoaded) return;

            if (!fedRoot) {
                bskyRoot.innerHTML = `<span id=bskyIsLoading class=loading>${i18nLoading}</span>`;
            }

        try {
                const skeetResponse = await fetch(
                    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${bskyAPI}`
                );
                const data = await skeetResponse.json();
                checkResponseStatus(skeetResponse);

                if (fedRoot) {
                    addToCounter(data.thread.post.replyCount, data.thread.post.repostCount, data.thread.post.likeCount);
                } else {
                    getElement('stats').innerHTML = renderBskyStat(data.thread.post);
                    getElement('bskyIsLoading').remove();
                }

                if (!mstdRoot) {
                    getElement('discussion-starter-content').innerHTML = `<div data-bionRead-safe>${renderRichText(data.thread.post.record)}</div>`;
                }

                if (typeof data.thread.replies != 'undefined' && data.thread.replies.length > 0) {
                    const bskyDOM =
                        typeof DOMPurify !== 'undefined'
                            ? DOMPurify.sanitize(renderSkeets(data.thread), { RETURN_DOM_FRAGMENT: true })
                            : renderSkeets(data.thread);
                    if (fedRoot) {
                        fedRoot.appendChild(bskyDOM);
                    } else {
                        bskyRoot.appendChild(bskyDOM);
                        const bskyItems = getElements('#bsky-comments > li[data-date]');
                        sortComment(bskyItems);
                }
            } else {
                    if (!fedRoot) {
                    bskyRoot.innerHTML = i18nNoComment;
                }
            }

            bskyCommentsLoaded = true;
            bskyRoot.setAttribute('aria-busy', 'false');

        } catch (error) {
            console.error(`Bluesky ${i18nErr}`, error);
            bskyRoot.innerHTML = `Bluesky ${i18nErr} : ${error}`;
        }
    }

        respondToVisibility(bskyRoot, loadbskyAPI);
    }

    const renderBskyContent = (post) => `
        <div data-bionRead-safe>${renderRichText(post.record)}</div>
        ${renderBskyAttachment(post)}
    `;

    const renderRichText = (record) => {
        let richText = ``

        const textEncoder = new TextEncoder();
        const utf8Decoder = new TextDecoder();
        const utf8Text = new Uint8Array(record.text.length * 3);
        textEncoder.encodeInto(record.text, utf8Text);
        var charIdx = 0;

        for (const facetIdx in record.facets) {
            const facet = record.facets[facetIdx];
            const facetFeature = facet.features[0];
            const facetType = facetFeature.$type;

            var facetLink = '#';
            if (facetType == 'app.bsky.richtext.facet#tag') {
                facetLink = `https://bsky.app/hashtag/${facetFeature.tag}`;
            } else if (facetType == 'app.bsky.richtext.facet#link') {
                facetLink = facetFeature.uri;
            } else if (facetType == 'app.bsky.richtext.facet#mention') {
                facetLink = `https://bsky.app/profile/${facetFeature.did}`;
            }

            if (charIdx < facet.index.byteStart) {
                const preFacetText = utf8Text.slice(charIdx, facet.index.byteStart);
                richText += utf8Decoder.decode(preFacetText)
            }

            const facetText = utf8Text.slice(facet.index.byteStart, facet.index.byteEnd);
            richText += `<a href='${facetLink}' target='_blank' rel='external noreferrer nofollow'>` + utf8Decoder.decode(facetText) + `</a>`;

            charIdx = facet.index.byteEnd;
        }

        if (charIdx < utf8Text.length) {
            const postFacetText = utf8Text.slice(charIdx, utf8Text.length);
            richText += utf8Decoder.decode(postFacetText);
        }

        return `<p>${richText.replace(/\n/g, `<br />`)}</p>`;
    }

    const renderBskyAttachment = (post) => {
        let attachment = ``;
        if (post.embed) {
            const did = post.author.did;
            const embedType = post.embed.$type;
            if (embedType === 'app.bsky.embed.external#view') {
                const { uri, title, description, thumb } = post.embed.external;
                if (uri.includes('.gif?')) {
                    attachment = `<img src='${uri}' title='${title}' alt='${description}' loading='lazy'>`;
                } else if (thumb) {
                    attachment = `<a href='${uri}' aria-label='${title}'><img src='${thumb}' alt='${description}' loading='lazy'></a>`
                }
            } else if (embedType === 'app.bsky.embed.images#view') {
                const images = post.record.embed.images;
                attachment = images.map(image => {
                    const thumb = ToBskyImgURL(did, image.image.ref.$link, true);
                    const src = ToBskyImgURL(did, image.image.ref.$link, false);
                    return `<a href='${src}' target='_blank'><img src='${thumb}' alt='${image.alt}' loading='lazy'></a>`;
                }).join('');
            } else if (embedType === 'app.bsky.embed.video#view') {
                const video = post.record.embed.video;
                attachment = `<video controls poster='${post.embed.thumbnail}' preload='none'><source src='https://bsky.social/xrpc/com.atproto.sync.getBlob?cid=${video.ref.$link}&did=${did}' type='${video.mimeType}'></video>`
            }
            return `<div class='attachments'>${attachment}</div>`;
        }
        return attachment;
    }

    const renderBskyStat = (post) => `
        ${renderStat(post.replyCount, toBskyURL(post.uri), i18nReplies, 'replies')}
        ${renderStat(post.repostCount, `${toBskyURL(post.uri)}/reposted-by`, i18nReblogs, 'reblogs')}
        ${renderStat(post.likeCount, `${toBskyURL(post.uri)}/liked-by`, i18nFavourites, 'favourites')}
    `;

    const renderSkeet = (comment) => {
        const replyDate = new Date(comment.post.record.createdAt);
        return `
        <li data-date='${toISOString(replyDate)}' id='${comment.post.cid}'>
            <article class='fed-comments bsky'>
            <header class='author'>
                <img src='${comment.post.author.avatar}' width=48 height=48 alt='${comment.post.author.handle}' loading='lazy' />
                <a class='has-aria-label' href='https://bsky.app/profile/${comment.post.author.handle}' rel='external noreferrer nofollow' aria-label='@${comment.post.author.handle}' aria-description='${comment.post.author.displayName}'>
                    <span>${comment.post.author.displayName}</span>
                </a>
            </header>
            <div class='content'>${renderBskyContent(comment.post)}</div>
            <footer>
                <div class='stat'>${renderBskyStat(comment.post)}</div>
                <a class='date' href='${toBskyURL(comment.post.uri)}' rel='ugc external noreferrer nofollow'><time datetime='${toISOString(replyDate)}'>${formatDate(replyDate)}</time></a>
            </footer>
            </article>
        </li>`;
    }

    const renderSkeets = (thread) => {
        const node = document.createDocumentFragment();
        const createElementFromHTML = (htmlString) => {
            const li = document.createElement('li');
            li.innerHTML = htmlString.trim();
            return li.firstChild;
        }
        for (const comment of thread.replies) {
            const skeet = createElementFromHTML(renderSkeet(comment));
            if (comment.replies.length > 0 ) {
                const reply = document.createElement('ul');
                skeet
                    .appendChild(reply)
                    .appendChild(renderSkeets(comment));
            }
            node.appendChild(skeet);
        }
        return node;
    }
}

const sortComment = (rootItem) => {
    const items = Array.from(rootItem);
    if (items.length > 0) {
        const index = new Set();
        items.sort(({ dataset: { date: a } }, { dataset: { date: b } }) => a.localeCompare(b))
        .forEach((item) => {
            if (!index.has(item.id)) {
                index.add(item.id);
                item.parentNode.appendChild(item);
            } else {
                item.remove();
            }
        });
    } else {
        rootItem.parentNode.innerHTML = i18nNoComment;
    }
}

const aggregateComment = () => {
    if (mstdCommentsLoaded && bskyCommentsLoaded) {
        const fedItems = getElements('#fed-comments > li[data-date]');
        sortComment(fedItems);
        getElement('stats').innerHTML = `
            ${renderStat(replies, skeetURL, i18nReplies, 'replies')}
            ${renderStat(reblogs, `${skeetURL}/reposted-by`, i18nReblogs, 'reblogs')}
            ${renderStat(favourites, `${skeetURL}/liked-by`, i18nFavourites, 'favourites')}
        `;
        bskyRoot.remove();
        mstdRoot.remove();
    } else {
        window.setTimeout(aggregateComment, 100);
    }
}

if (bskyRoot && mstdRoot) {
    aggregateComment();
}