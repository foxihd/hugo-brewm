const cmt = getElement('comments');
const { i18nReplies, i18nReblogs, i18nFavourites, i18nLoading, i18nErr, i18nNoComment } = cmt.dataset;

const cmtSty = document.createElement('style');
cmtSty.textContent = `
    #comments ul ul {padding-left:1pc}
    #comments ul > li {border-radius:1ex;overflow:hidden}
    #comments noscript {margin:var(--medskip) 0}
    #discussion-starter {margin-bottom:var(--medskip)}
    #stats {margin-left:auto}
    #mstd-comments, #bsky-comments, #fed-comments {padding:0;list-style:none;width:var(--golden-ratio)}
    #comments li, #comments li > ul {margin-top:1rem;list-style:none}
    .fed-comments {border-left:3pt solid var(--ac);background:#80808008;padding:1rem 2rem 1ex 1rem;overflow:auto}
    .fed-comments.bsky {--ac:#1185fe}
    .fed-comments.mstd {--ac:#563acc}
    .fed-comments > .author > img{margin-right:12pt}
    .fed-comments .content {margin-left:4rem;line-height:calc(var(--baselineStretch) * 1.272)}
    .fed-comments .content p {margin: 1.618rem 0}
    .fed-comments .content a {max-width:100%;vertical-align:bottom;white-space:break-spaces}
    .fed-comments > footer {display:flex;align-items:center;margin-top:1rem;margin-left:3.5rem;white-space:nowrap}
    .fed-comments > footer .stat {display:inline-flex;flex-shrink:0;gap:5pt}
    .attachments, #comments > summary {display:flex;margin:.618pc 0;overflow:auto}
    .attachments > * {flex-shrink:0;width:100%;height:auto}
    .attachments img {width:100%;height:auto}
    .stat > * {display:inline-flex;align-items:center;padding:2pt;color:var(--mid);gap:2pt}
    .stat > *::before {vertical-align:text-top;font-family:'base-ui'}
    .stat > * > span {font-size:0.8em}
    a.replies.active, a.reblogs.active {color:var(--ac)}
    a.favourites.active {color:var(--i3i)}
    .fed-comments .date {margin-left:auto;padding-left:1rem;color:var(--mid);font-size:calc(10pt * var(--fontScale))}
    .bluesky {display:inline-block}
    #join-discussion:hover .blueksy, #join-discussion-bluesky:hover .bluesky {transform-origin:center center;animation:flutter 0.2s alternate infinite}
    @keyframes flutter {from { transform:rotateY(0)}to { transform:rotateY(80deg)}}
    @media (max-width:960px) {
        .fed-comments .content, .fed-comments > footer {margin-left:0}
    }
    @media (max-width:480px) {
        .fed-comments {padding: 1rem 1rem 1ex}
    }
    @media print {
        .fed-comments {position:relative;background:none;padding-bottom:0}
        .fed-comments .date {position:absolute;top:0;right:0}
        .fed-comments .stat {display:none !important}
    }`;
document.head.appendChild(cmtSty);

const fedRoot = getElement('fed-comments');

if (fedRoot) {
    var replies = 0;
    var reblogs = 0;
    var favourites = 0;
}

const addToCounter = (reply, reblog, favorite) => {
    replies = replies + reply;
    reblogs = reblogs + reblog;
    favourites = favourites + favorite;
}

const renderStat = (count, url, label, interaction) => `
    <a class='${interaction} ${count > 0 ? 'active' : ''}' href='${url}' rel='external noreferrer nofollow' aria-label='${label}'>
        <span>${count > 0 ? count : ''}</span>
    </a>
`;

const respondToVisibility = (element, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
            }
        });
    });
    observer.observe(element);
}

const getURI = (url, format) => {
    const splitUrl = url.split('/');
    const isUrl = splitUrl[0] === 'https:' || splitUrl[0] === 'http:';
    return isUrl ? format(splitUrl) : url;
}

const checkResponseStatus = (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
    }
}

const mstdRoot = getElement('mstd-comments');

if (mstdRoot) {
    var mstdCommentsLoaded = false;
    const tootURL = mstdRoot.dataset.url;
    const mstdRootID = tootURL.split('/')[4];
    const toMastodonURI = (splitUrl) => `https://${splitUrl[2]}/api/v1/statuses/${splitUrl[4]}`;
    const mstdAPI = getURI(tootURL, toMastodonURI);

    if (mstdAPI !== tootURL) {

        const loadMstdAPI = async () => {
            if (mstdCommentsLoaded) return;

            if (!fedRoot) {
                mstdRoot.innerHTML = `<span id=mstdIsLoading class=loading>${i18nLoading}</span>`;
            }

            try {
                const [tootResponse, contextResponse] = await Promise.all([
                    fetch(mstdAPI),
                    fetch(mstdAPI + `/context`)
                ]);
                const [toot, data] = await Promise.all([
                    tootResponse.json(),
                    contextResponse.json()
                ]);
                checkResponseStatus(tootResponse);
                checkResponseStatus(contextResponse);

                if (fedRoot) {
                    addToCounter(toot.replies_count, toot.reblogs_count, toot.favourites_count);
                } else {
                    getElement('stats').innerHTML = renderMstdStat(toot);
                    getElement('mstdIsLoading').remove();
                }
                getElement('discussion-starter-content').innerHTML = renderMstdContent(toot);

                if (data.descendants?.length > 0) {
                    typeof DOMPurify !== 'undefined'
                        ? DOMPurify.sanitize(renderToots(data.descendants, mstdRootID), { RETURN_DOM_FRAGMENT: true })
                        : renderToots(data.descendants, mstdRootID);
                } else {
                    if (!fedRoot) {
                        mstdRoot.innerHTML = i18nNoComment;
                    }
                }

                mstdCommentsLoaded = true;
                mstdRoot.setAttribute('aria-busy', 'false');

            } catch (error) {
                console.error(`Mastodon ${i18nErr}`, error);
                mstdRoot.innerHTML = `Mastodon ${i18nErr} : ${error}`;
            }
        }

        respondToVisibility(mstdRoot, loadMstdAPI);
    }

    const renderMstdContent = (toot) => {
        const attachments = 
            toot.media_attachments.length > 0 
            ? `<div class='attachments'>${toot.media_attachments.map(renderMstdAttachment).join('')}</div>` 
            : '';

        return `
            <div data-bionRead-safe>${toot.content}</div>
            ${attachments}
        `;
    }

    const renderMstdAttachment = (attachment) => {
        const attachmentTypes = {
            image: () => `<a href='${attachment.url}' rel='nofollow'><img src='${attachment.preview_url}' alt='${attachment.description}' loading='lazy' /></a>`,
            video: () => `<video controls preload='none'><source src='${attachment.url}' type='${attachment.mime_type}'></video>`,
            gifv: () => `<video autoplay loop muted playsinline><source src='${attachment.url}' type='${attachment.mime_type}'></video>`,
            audio: () => `<audio controls><source src='${attachment.url}' type='${attachment.mime_type}'></audio>`,
            default: () => `<a href='${attachment.url}' rel='nofollow'>${attachment.type}</a>`
        }

        if (attachmentTypes) {
            return (attachmentTypes[attachment.type] || attachmentTypes.default)();
        }

    }

    const renderMstdStat = (toot) => `
        ${renderStat(toot.replies_count, toot.url, i18nReplies, 'replies')}
        ${renderStat(toot.reblogs_count, `${toot.url}/reblogs`, i18nReblogs, 'reblogs')}
        ${renderStat(toot.favourites_count, `${toot.url}/favourites`, i18nFavourites, 'favourites')}
    `;

    const renderToot = (toot) => {
        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        const display_name = escapeHtml(toot.account.display_name);
        toot.account.display_name = display_name;
        toot.account.emojis.forEach(emoji => {
            toot.account.display_name = toot.account.display_name.replace(
                `:${emoji.shortcode}:`,
                `<img src='${escapeHtml(emoji.static_url)}' alt='Emoji ${emoji.shortcode}' height='20' width='20' />`
            );
        });

        const user_account = (account) => {
            let result = `@${account.acct}`;
            if (!account.acct.includes('@')) {
                const domain = new URL(account.url);
                result += `@${domain.hostname}`;
            }
            return result;
        }

        const node = document.createElement('li');
        node.id = `mstd${toot.id}`;
        node.dataset.date = toISOString(toot.created_at);
        node.innerHTML = `
            <article class='fed-comments mstd'>
                <header class='author'>
                    <img src='${escapeHtml(toot.account.avatar_static)}' height=48 width=48 alt='${user_account(toot.account)}' loading='lazy'/>
                    <a class='has-aria-label' href='${toot.account.url}' rel='external noreferrer nofollow' aria-label='${user_account(toot.account)}' aria-description='${display_name}'>
                        <span>${toot.account.display_name}</span>
                    </a>
                </header>
                <div class='content' data-bionRead-safe>${renderMstdContent(toot)}</div>
                <footer>
                    <div class='stat'>${renderMstdStat(toot)}</div>
                    <a class='date' href='${toot.url}' rel='ugc external noreferrer nofollow'>
                        <time datetime='${toISOString(toot.created_at)}'>${toot.edited_at ? '*' : ''}${formatDate(toot.created_at)}</time>
                    </a>
                </footer>
            </article>`;

        return node;
    }

    const renderToots = (toots, in_reply_to) => {
        const node = toots
            .filter(toot => toot.in_reply_to_id === in_reply_to);
        node.forEach(toot => {
            if (toot.in_reply_to_id === mstdRootID) {
                if (fedRoot) {
                    fedRoot.appendChild(renderToot(toot));
                } else {
                    mstdRoot.appendChild(renderToot(toot));
                }
            } else {
                const hasChildren = toots.find(t => t.id === toot.in_reply_to_id);
                if (hasChildren) {
                    const ul = document.createElement('ul');
                    getElement(`mstd${toot.in_reply_to_id}`)
                        .appendChild(ul)
                        .appendChild(renderToot(toot));
                }
            }
            renderToots(toots, toot.id);
        });
    }
}