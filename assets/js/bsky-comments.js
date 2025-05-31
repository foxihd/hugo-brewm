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

const bskyRoot = document.querySelector("#bsky-comments");
var bskyCommentsLoaded = false;

function ToBskyUrl(uri) {
    const splitUri = uri.split('/');
    if (splitUri[0] === 'at:') {
        return 'https://bsky.app/profile/' + splitUri[2] + '/post/' + splitUri[4];
    } else {
        return uri;
    }
}

function ToAtProtoUri(url) {
    const splitUrl = url.split('/');
    if (splitUrl[0] === 'https:' || splitUrl[0] === 'http:') {
        return 'at://' + splitUrl[4] + '/app.bsky.feed.post/' + splitUrl[6];
    } else {
        return url;
    }
}

function ToBskyImgUrl(did, blobLink, thumb) {
    return `https://cdn.bsky.app/img/${thumb ? "feed_thumbnail" : "feed_fullsize"}/plain/${did}/${blobLink}`;
}


function renderMainStat() {
    getElement("mastodon-stats").innerHTML = `
        <a class="replies ${replies > 0 ? "active" : "" }" href="${bskyRoot.dataset.uri}" rel="nofollow" aria-label="${i18nReplies}"><span>${replies > 0 ? replies : "" }</span></a>
        <a class="reblogs ${reblogs > 0 ? "active" : "" }" href="${bskyRoot.dataset.uri}/reposted-by" rel="nofollow" aria-label="${i18nReblogs}"><span>${reblogs > 0 ? reblogs : "" }</span></a>
        <a class="favourites ${favourites > 0 ? "active" : "" }" href="${bskyRoot.dataset.uri}/liked-by" rel="nofollow" aria-label="${i18nFavourites}"><span>${favourites > 0 ? favourites : "" }</span></a>`;
}

const atProto = ToAtProtoUri(bskyRoot.dataset.uri);

if (atProto) {
    const loadBskyComments = async () => {
        if (bskyCommentsLoaded) return;

        try {
            const response = await fetch(
                "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=" + atProto
            );

            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }

            const data = await response.json();

            if (typeof data.thread.replies != "undefined" && data.thread.replies.length > 0) {
                if (fed) {
                    replies = replies + data.thread.post.replyCount;
                    reblogs = reblogs + data.thread.post.repostCount;
                    favourites = favourites + data.thread.post.likeCount;
                    fed.appendChild(DOMPurify.sanitize(renderComments(data.thread), {RETURN_DOM_FRAGMENT: true}));
                } else {
                    if (!mstdRoot) {
                        getElement('mastodon-content').innerHTML =  renderRichText(data.thread.post.record);
                        renderMainStat();
                    }
                    bskyRoot.appendChild(DOMPurify.sanitize(renderComments(data.thread), {RETURN_DOM_FRAGMENT: true}));
                    bskyRoot.setAttribute('aria-busy', 'false');
                }
            } else {
                if (!fed) {
                    bskyRoot.innerHTML = i18nNoComment;
                }
            }
            bskyCommentsLoaded = true;
        } catch (error) {
            console.error(`Bluesky ${i18nErr}`, error);
            bskyRoot.innerHTML = `Bluesky ${i18nErr} : ${error}`;
        }
    }

    function renderComments(thread) {
        const commentsNode = document.createDocumentFragment();
        for (const comment of thread.replies) {
            const renderedString = renderComment(comment);
            const htmlContent = createElementFromHTML(renderedString);

            htmlContent.querySelector(".rep").appendChild(renderComments(comment));

            commentsNode.appendChild(htmlContent);
        }

        return commentsNode;
    }

    //https://stackoverflow.com/a/494348
    function createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }

    function renderRichText(record) {
        let richText = `<p>`

        const textEncoder = new TextEncoder();
        const utf8Decoder = new TextDecoder();
        const utf8Text = new Uint8Array(record.text.length * 3);
        textEncoder.encodeInto(record.text, utf8Text);

        var charIdx = 0;
        for (const facetIdx in record.facets) {
            const facet = record.facets[facetIdx];
            const facetFeature = facet.features[0];
            const facetType = facetFeature.$type;

            var facetLink = "#";
            if (facetType == "app.bsky.richtext.facet#tag") {
                facetLink = `https://bsky.app/hashtag/${facetFeature.tag}`;
            } else if (facetType == "app.bsky.richtext.facet#link") {
                facetLink = facetFeature.uri;
            } else if (facetType == "app.bsky.richtext.facet#mention") {
                facetLink = `https://bsky.app/profile/${facetFeature.did}`;
            }

            if (charIdx < facet.index.byteStart) {
                const preFacetText = utf8Text.slice(charIdx, facet.index.byteStart);
                richText += utf8Decoder.decode(preFacetText)
            }

            const facetText = utf8Text.slice(facet.index.byteStart, facet.index.byteEnd);
            richText += `<a href="${facetLink}" target="_blank">` + utf8Decoder.decode(facetText) + '</a>';

            charIdx = facet.index.byteEnd;
        }

        if (charIdx < utf8Text.length) {
            const postFacetText = utf8Text.slice(charIdx, utf8Text.length);
            richText += utf8Decoder.decode(postFacetText);
        }

        return richText + '</p>';
    }

    function renderAttachment(post) {
        let attachment = "";
        const did = post.author.did;
        if (post.embed) {
            const embedType = post.embed.$type;

            if (embedType === "app.bsky.embed.external#view") {
                const {uri, title, description} = post.embed.external;
                if (uri.includes(".gif?")) {
                    attachment = `<img src="${uri}" title="${title}" alt="${description}" loading="lazy">`;
                }
            } else if (embedType === "app.bsky.embed.images#view") {
                const images = post.record.embed.images;
                attachment = images.map(image => {
                    const thumb = ToBskyImgUrl(did, image.image.ref.$link, true);
                    const src = ToBskyImgUrl(did, image.image.ref.$link, false);
                    return `<a href="${src}" target="_blank"><img src="${thumb}" alt="${image.alt}" loading="lazy"></a>`;
                }).join('');
            } else if (embedType === "app.bsky.embed.video#view") {
                const video = post.record.embed.video;
                attachment = `<video controls poster="${post.embed.thumbnail}" preload="none">
                    <source src="https://bsky.social/xrpc/com.atproto.sync.getBlob?cid=${video.ref.$link}&did=${did}" type="${video.mimeType}"></video>`
            }

            return `<div class="attachments">`+attachment+`</div>`
        }

        return attachment;
    }

    function renderComment(comment) {
        const replyDate = new Date(comment.post.record.createdAt);
        return `
        <li data-date="${toISOString(replyDate)}" id="${comment.post.cid}">
            <article class="fediverse-comment bsky" style="margin-bottom: 1rem">
            <header class="author">
                <img src="${comment.post.author.avatar}" width=58 height=48 alt="${comment.post.author.handle}" loading="lazy" />
                <a class="has-aria-label" href="https://bsky.app/profile/${comment.post.author.handle}" rel="ugc" aria-label="@${comment.post.author.handle}" aria-description="${comment.post.author.displayName}">
                    <span>${comment.post.author.displayName}</span>
                </a>
            </header>
            <div class="content">
                <div class="par" data-bionRead-safe>${renderRichText(comment.post.record)}</div>
                ${renderAttachment(comment.post)}
            </div>
            <footer>
                <div class="stat">
                <a class="replies ${comment.post.replyCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow"  aria-label="${i18nReplies}">
                    <span>${comment.post.replyCount > 0 ? comment.post.replyCount : ''}</span>
                </a>
                <a class="reblogs ${comment.post.repostCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}/reposted-by" rel="nofollow" aria-label="${i18nReblogs}">
                    <span>${comment.post.repostCount > 0 ? comment.post.repostCount : ''}</span>
                </a>
                <a class="favourites ${comment.post.likeCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}/liked-by" rel="nofollow" aria-label="${i18nFavourites}">
                    <span>${comment.post.likeCount > 0 ? comment.post.likeCount : ''}</span>
                </a>
                </div>
                <a class="date" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow"><time datetime="${toISOString(replyDate)}">${formatDate(replyDate)}</time></a>
            </footer>
            </article>
            <ul class="rep"></ul>
        </li>`;
    }

    respondToVisibility(bskyRoot, loadBskyComments);

}

// aggregate mastodon and bluesky comments
function aggregateComment() {
    if (commentsLoaded && bskyCommentsLoaded) {
        const items = Array.from(document.querySelectorAll("#fediverse-comments > li[data-date]"));
        const seen = new Set();
        items.sort(({dataset: {date: a}}, {dataset: {date: b}}) => a.localeCompare(b))
            .forEach((item) => {
                if (!seen.has(item.id)) {
                    seen.add(item.id);
                    item.parentNode.appendChild(item);
                } else {
                    item.remove();
                }
            });
        renderMainStat();
        bskyRoot.remove();
        mstdRoot.remove();
    } else {
        window.setTimeout(aggregateComment, 100);
    }
}

if (bskyRoot && mstdRoot) {
    aggregateComment();
}