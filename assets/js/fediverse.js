const mstdRoot = getElement('mastodon-comments');
const tootUri = mstdRoot.dataset.uri;

// display on scroll
const respondToVisibility = (element, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback();
            }
        });
    }, { root: null });

    observer.observe(element);
};

// sync localization with hugo i18n
const i18nreplies = getElement('i18n--is-replies').innerHTML;
const i18nreblogs = getElement('i18n--is-reblogs').innerHTML;
const i18nfavourites = getElement('i18n--is-favourites').innerHTML;
const i18nLoading = getElement('i18n--is-loading').innerHTML;
const i18nErr = getElement('i18n--is-error').innerHTML;
const i18nNoComment = getElement('i18n--no-comment').innerHTML;

const style = document.createElement('style');
style.textContent = `
    #comments > * {width: var(--golden-ratio)}
    #comments noscript {margin: var(--medskip) 0}
    #discussion-starter {margin-bottom: var(--medskip)}
    #discussion-starter > footer {display: flex; align-items: center; justify-content: space-between; margin-top: 1em}
    .fediverse-comment {margin: 1rem 0 1rem calc(var(--mul) * var(--indent)); border: 1pt solid #fff4; border-left: 2pt solid var(--ac); background: #80808008; padding: 1rem 1rem 1ex; box-shadow: 0 0.5pt 1pt 0 var(--g18s); overflow: auto}
    .fediverse-comment.bsky {--ac: #1185fe}
    .fediverse-comment.mstd {--ac: #563acc}
    .fediverse-comment > .author > img{margin-right: 12pt}
    .fediverse-comment .content {margin-left: 4rem; line-height: calc(var(--baselineStretch) * 1.272)}
    .fediverse-comment .par a {max-width: 100%; vertical-align: bottom; white-space: break-spaces}
    .fediverse-comment > footer {display: flex; align-items: center; margin-top: 1rem; margin-left: 3.5rem; white-space: nowrap}
    .fediverse-comment > footer .stat {display: inline-flex; flex-shrink: 0; gap: 5pt}
    .attachments {display: flex;overflow: auto}
    .attachments > * {flex-shrink: 0; width: 100%; height: auto}
    .attachments img {width: 100%; height: auto}
    .stat > * {display: inline-flex; align-items: center; padding: 2pt; color: var(--mid); gap: 2pt;}
    .stat > *::before {vertical-align: text-top; font-family: 'base-ui';}
    .stat > * > span {font-size: 0.8em}
    a.replies.active, a.reblogs.active {color: var(--ac)}
    a.favourites.active {color: var(--i3i)}
    .fediverse-comment .date {margin-left: auto; padding-left: 1rem; color: var(--mid); font-size: calc(10pt * var(--fontScale))}
    @media only screen and (max-width: 960px) {
        .fediverse-comment .content, .fediverse-comment > footer {margin-left: 0}
    }`;
document.head.appendChild(style);

if (tootUri) {

    function escapeHtml(unsafe) {
        return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    let commentsLoaded = false;

    const toot_active = (toot, what) => {
        const count = toot[`${what}_count`];
        return count > 0 ? 'active' : '';
    };

    const toot_count = (toot, what) => {
        const count = toot[`${what}_count`];
        return count > 0 ? count : '';
    };

    const renderStat = toot => `
        <a class="replies ${toot_active(toot, 'replies')}" href="${toot.url}" rel="nofollow" aria-label="${i18nreplies}">
            <span>${toot_count(toot, 'replies')}</span>
        </a>
        <a class="reblogs ${toot_active(toot, 'reblogs')}" href="${toot.url}" rel="nofollow" aria-label="${i18nreblogs}">
            <span>${toot_count(toot, 'reblogs')}</span>
        </a>
        <a class="favourites ${toot_active(toot, 'favourites')}" href="${toot.url}" rel="nofollow" aria-label="${i18nfavourites}">
            <span>${toot_count(toot, 'favourites')}</span>
        </a>`;

    const renderAttachment = attachment => {
        const attachmentTypes = {
            image: () => `<a href="${attachment.url}" rel="nofollow"><img src="${attachment.preview_url}" alt="${attachment.description}" loading="lazy" /></a>`,
            video: () => `<video controls><source src="${attachment.url}" type="${attachment.mime_type}"></video>`,
            gifv: () => `<video autoplay loop muted playsinline><source src="${attachment.url}" type="${attachment.mime_type}"></video>`,
            audio: () => `<audio controls><source src="${attachment.url}" type="${attachment.mime_type}"></audio>`,
            default: () => `<a href="${attachment.url}" rel="nofollow">${attachment.type}</a>`
        };

        return (attachmentTypes[attachment.type] || attachmentTypes.default)();
    };

    const renderContent = toot => `
        <div class="par" data-bionRead-safe>${toot.content}</div>
        <div class="attachments">${toot.media_attachments.map(renderAttachment).join('')}</div>
    `;

    const user_account = (account) => {
        let result = `@${account.acct}`;
        if (!account.acct.includes('@')) {
            const domain = new URL(account.url);
            result += `@${domain.hostname}`;
        }
        return result;
    };

    const render_toots = (toots, in_reply_to, depth) => {
        const tootsToRender = toots
            .filter(toot => toot.in_reply_to_id === in_reply_to)
            .sort((a, b) => a.created_at.localeCompare(b.created_at));
        tootsToRender.forEach(toot => render_toot(toots, toot, depth));
    };

    const render_toot = (toots, toot, depth) => {
        toot.account.display_name = escapeHtml(toot.account.display_name);
        toot.account.emojis.forEach(emoji => {
            toot.account.display_name = toot.account.display_name.replace(
                `:${emoji.shortcode}:`,
                `<img src="${escapeHtml(emoji.static_url)}" alt="Emoji ${emoji.shortcode}" height="20" width="20" />`
            );
        });

        const mastodonComment = `
        <li>
            <article class="fediverse-comment mstd" style="--mul: ${depth}">
                <header class="author">
                    <img src="${escapeHtml(toot.account.avatar_static)}" height=48 width=48 alt="${user_account(toot.account)}" loading="lazy"/>
                    <a class="has-aria-label" href="${toot.account.url}" rel="nofollow" title="${toot.account.display_name}" aria-label="${user_account(toot.account)}">
                        <span>${toot.account.display_name}</span>
                    </a>
                </header>
                <div class="content">${renderContent(toot)}</div>
                <footer>
                    <div class="stat">${renderStat(toot)}</div>
                    <a class="date" href="${toot.url}" rel="nofollow">
                        <time datetime="${toISOString(toot.created_at)}">${formatDate(toot.created_at)}</time>
                    </a>
                </footer>
            </article>
        </li>`;

        mstdRoot.appendChild(DOMPurify.sanitize(mastodonComment, {'RETURN_DOM_FRAGMENT': true}));

        render_toots(toots, toot.id, depth + 1);
    };

    const loadComments = async () => {
        if (commentsLoaded) return;

        mstdRoot.innerHTML = i18nLoading;

        const splitUrl = tootUri.split('/');
        function getJson() {
            if (splitUrl[0] === 'https:' || splitUrl[0] === 'http:') {
                return 'https://' + splitUrl[2] + '/api/v1/statuses/' + splitUrl[4]
            }
        }

        try {
            const [tootResponse, contextResponse] = await Promise.all([
                fetch(getJson()),
                fetch(getJson()+`/context`)
            ]);

            const [toot, data] = await Promise.all([
                tootResponse.json(),
                contextResponse.json()
            ]);

            getElement("mastodon-content").innerHTML = renderContent(toot);
            getElement("mastodon-stats").innerHTML = renderStat(toot);

            if (data.descendants?.length > 0) {
                mstdRoot.innerHTML = "";
                render_toots(data.descendants, splitUrl[4], 0);
            } else {
                mstdRoot.innerHTML = i18nNoComment;
            }

            commentsLoaded = true;
            mstdRoot.setAttribute('aria-busy', 'false');
        } catch (error) {
            console.error(`Mastodon ${i18nErr}`, error);
            mstdRoot.innerHTML = `Mastodon ${i18nErr} : ${error}`;
        }
    };

    respondToVisibility(mstdRoot, loadComments);
}