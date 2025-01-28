const id = getElement('metadata-post').innerText;

if (id) {
    const host = getElement('metadata-instance').innerText;
    const user = getElement('metadata-user').innerText;
    const style = document.createElement('style');
    style.textContent = `
        #comments > * {width: var(--golden-ratio)}
        #comments noscript {margin: var(--medskip) 0}
        #discussion-starter {margin-bottom: var(--medskip)}
        #discussion-starter > footer {display: flex; align-items: center; justify-content: space-between}
        .mastodon-comment {margin: 1rem 0 1rem calc(var(--mul) * var(--indent)); border: 1pt solid #fff4; border-left: 2pt solid var(--ac); background: #80808008; padding: 1rem 1rem 1ex; box-shadow: 0 .5pt 1pt 0 var(--g18s); overflow: auto}
        .mastodon-comment .content {margin-left: 4rem; line-height: calc(var(--baselineStretch) * 1.272)}
        .mastodon-comment .par a {max-width: 100%; vertical-align: bottom; white-space: break-spaces}
        .mastodon-comment .attachments * {width: 100%; height: auto}
        .mastodon-comment > footer {margin-top: 1rem; margin-left: 3.5rem}
        .mastodon-comment > footer .stat {display: inline-flex; flex-shrink: 0; gap: 5pt}
        .stat a {display: inline-flex; align-items: center; padding: 2pt; color: var(--mid); gap: 2pt}
        .stat a::before {vertical-align: text-top}
        a.replies.active, a.reblogs.active {color: var(--ac)}
        a.favourites.active {color: var(--i3i)}
        .mastodon-comment .date {margin-left: auto; padding-left: 1rem; color: var(--mid); font-size: calc(10pt * var(--fonttScale))}
        @media only screen and (max-width: 960px) {
            .mastodon-comment .content, .mastodon-comment > footer {margin-left: 0}
        }
    `;
    document.head.appendChild(style);

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

        const mastodonComment = `
            <article class="mastodon-comment" style="--mul: ${depth}">
                <header class="author">
                    <img src="${escapeHtml(toot.account.avatar_static)}" height=48 width=48 alt="${user_account(toot.account)}" loading="lazy"/>
                    <a class="has-aria-label" href="${toot.account.url}" rel="nofollow" aria-label="${user_account(toot.account)}">
                        <span>${toot.account.display_name}</span>
                    </a>
                </header>
                <div class="content">
                    <div class="par" data-bionRead-safe>${toot.content}</div>
                    <div class="attachments">
                        ${toot.media_attachments.map(renderAttachment).join('')}
                    </div>
                </div>
                <footer>
                    <div class="stat">
                        <a class="replies ${toot_active(toot, 'replies')}" href="${toot.url}" rel="nofollow">
                            ${toot_count(toot, 'replies')}
                        </a>
                        <a class="reblogs ${toot_active(toot, 'reblogs')}" href="${toot.url}" rel="nofollow">
                            ${toot_count(toot, 'reblogs')}
                        </a>
                        <a class="favourites ${toot_active(toot, 'favourites')}" href="${toot.url}" rel="nofollow">
                            ${toot_count(toot, 'favourites')}
                        </a>
                    </div>
                    <a class="date" href="${toot.url}" rel="nofollow">
                        <time>${toot.created_at.substr(0, 10)} ${toot.created_at.substr(11, 8)}</time>
                    </a>
                </footer>
            </article>`;

        getElement('mastodon-comments-list')
            .appendChild(DOMPurify.sanitize(mastodonComment, {'RETURN_DOM_FRAGMENT': true}));

        render_toots(toots, toot.id, depth + 1);
    };

    const toot_stats = toot => `
        <a class="replies ${toot_active(toot, 'replies')}" href="${toot.url}" rel="nofollow">
            ${toot_count(toot, 'replies')}
        </a>
        <a class="reblogs ${toot_active(toot, 'reblogs')}" href="${toot.url}" rel="nofollow">
            ${toot_count(toot, 'reblogs')}
        </a>
        <a class="favourites ${toot_active(toot, 'favourites')}" href="${toot.url}" rel="nofollow">
            ${toot_count(toot, 'favourites')}
        </a>`;

    const loadComments = async () => {
        if (commentsLoaded) return;

        const commentsList = getElement('mastodon-comments-list');
        commentsList.innerHTML = getElement('i18n--is-loading').innerHTML;

        try {
            const [tootResponse, contextResponse] = await Promise.all([
                fetch(`https://${host}/api/v1/statuses/${id}`),
                fetch(`https://${host}/api/v1/statuses/${id}/context`)
            ]);

            const [toot, data] = await Promise.all([
                tootResponse.json(),
                contextResponse.json()
            ]);

            getElement("mastodon-stats").innerHTML = toot_stats(toot);

            if (data.descendants?.length > 0) {
                commentsList.innerHTML = "";
                render_toots(data.descendants, id, 0);
            } else {
                commentsList.innerHTML = getElement('i18n--no-comment').innerHTML;
            }

            commentsLoaded = true;
            commentsList.setAttribute('aria-busy', 'false');
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = 'Error loading comments';
        }
    };

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

    const comments = getElement("mastodon-comments-list");
    respondToVisibility(comments, loadComments);
}