// Event listener helper function
function addEvent(element, event, handler) {
    if (element?.attachEvent) {
        return element.attachEvent('on' + event, handler);
    }
    return element?.addEventListener(event, handler, false);
}

// DOM element getters
const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);

// Logotype width calculation
function recalcLogotypeWidth() {
    const logotype = getElement('logotype');
    const logotypeText = getElement('logotype__text');
    logotype?.setAttribute('width', `${logotypeText.getBoundingClientRect().width}px`);
}

// Viewport adaptation
function adaptViewport() {
    // fix logotype when font loading delayed
    document.fonts.ready.then(() => {
        recalcLogotypeWidth();
    });
    if (window.innerWidth < 640) {
        getElement('has-search')?.setAttribute('open', 'open');
        getElement('has-search')?.removeAttribute('name');
        getElement('has-more-menu')?.setAttribute('open', 'open');
        // rotate to content top icon if homepage has slide
        let hasSlide = getElement('slide-1');
        if (hasSlide) {
            function adjustToTopButon() {
                let toTop = getElement('to-top');
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    toTop.classList.remove('to-content-top')
                } else {
                    toTop.classList.add('to-content-top')
                }
            }
            adjustToTopButon();
            addEvent(window, 'scroll', adjustToTopButon);
        };
    } else {
        getElement('top-nav')?.setAttribute('open', 'open');
        addEvent(visualViewport, 'resize', adaptViewport);
    }
}
addEvent(window, 'DOMContentLoaded', adaptViewport);

// Node collapse handlers
const collapseParentNode = getElements('.js-cpn');
const collapseGrandParentNode = getElements('.js-cgpn');
const detailsElements = getElements('details.js-details');

collapseParentNode.forEach(element => {
    const handler = () => element.parentNode?.removeAttribute('open');
    addEvent(element, 'click', handler);
});

collapseGrandParentNode.forEach(element => {
    const handler = () => element.parentNode?.parentNode?.removeAttribute('open');
    addEvent(element, 'click', handler);
});

if (window.innerWidth > 640) {
    // Details element handler for firefox based browsers which do not respect the same name attribute
    detailsElements.forEach(detail => {
        const handler = (e) => {
            const name = detail.getAttribute('name');
            if (name) {
                getElements(`details.js-details[name="${name}"]`).forEach(otherDetail => {
                    if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                        otherDetail.removeAttribute('open');
                    }
                });
            }
        };
        addEvent(detail, 'click', handler);
    });
}

// enable copy and navigatorShare element when protocol is secure
if (location.protocol === 'https:') {
    getElement('copyPermalink')?.removeAttribute('class');

    // use navigator.share when supported
    if (navigator.share) {
        getElement('navigatorShare')?.setAttribute(
            'href',
            'javascript:navigator.share({title: document.title, url: window.location.href})'
        );
    }
}

getElement('print-button')?.removeAttribute('class');
getElement('back')?.removeAttribute('class');

// Date handling

const date = new Date();
function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        formatMatcher: 'basic'
    }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
}

function toISOString(dateString) {
    return new Date(dateString).toISOString()
}

// Mastodon and QR code functionality
if (typeof mastodonInstance !== 'undefined') {
    getElement('has-mastodon').className = 'active';

    const mastodonHandler = () => {
        mastodonTitle.disabled = true;
        mastodonPermalink.disabled = true;
        mastodonText.disabled = false;
        mastodon?.setAttribute('action', `${mastodonInstance.value}/share`);
    };

    addEvent(mastodonInstance, 'input', mastodonHandler);

    if (typeof QRCode !== 'undefined') {
        getElement('colophon').removeAttribute('style');

        qr?.appendChild(
            QRCode({
                msg: window.location.href,
                ecl: 'M',
                pal: ['#000', '#fff'],
                pad: 2,
                dim: 96,
            })
        );

        const timeStamp = getElement('time-stamp');
              timeStamp.innerHTML = formatDate(date);
              timeStamp?.setAttribute('datetime', date.toISOString());
    }
}

// Digital well-being clock
const hour = date.getHours();
const isDaytime = hour > 6 && hour < 21;

function toggleNightElements(hidden) {
    const elements = ['grain', 'dwclock'];
    elements.forEach(id => {
        const element = getElement(id);
        element?.[hidden ? 'setAttribute' : 'removeAttribute']('hidden', 'hidden');
    });
}

if (isDaytime) {
    toggleNightElements(true);
} else {
    toggleNightElements(false);

    let clockInterval;
    function updateClock() {
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
        const hourDegrees = ((hour / 12) * 360) + ((minutes/60)*30);

        const transforms = ['transform', 'webkitTransform', 'mozTransform', 'msTransform', 'oTransform'];
        const hands = {
            '#min': minutesDegrees,
            '#hour': hourDegrees
        };

        Object.entries(hands).forEach(([selector, degrees]) => {
            const hand = document.querySelector(selector);
            transforms.forEach(transform => {
                hand.style[transform] = `rotate(${degrees}deg)`;
            });
        });
    }

    updateClock();
    clockInterval = setInterval(updateClock, 10000);
}

// Overwrite browser search bar (canceled)
// addEvent(document, 'keydown', function(e) {
//     if (e.ctrlKey && e.key === 'k') {
//         e.preventDefault();
//         getElement('has-search')?.setAttribute('open', 'open');
//         const searchInput = document.querySelector('.pagefind-ui__search-input');
//         searchInput?.focus();
//     }
// });

// clashes with details handler on firefox, need workaround
addEvent(window, 'beforeprint', function() {
    getElements('[name="redaction-history"]')?.forEach(e => {
        e.setAttribute('open', 'open');
    });
});

// copying
const copyPermalink = getElement('copyPermalink');
addEvent(copyPermalink, 'click', function() {
    getElement('copy').innerText = getElement('isCopying').innerText;
    setTimeout(() => getElement('copy').innerText = getElement('copyText').innerText, 2000 )
});