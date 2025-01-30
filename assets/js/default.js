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
    recalcLogotypeWidth();
    if (window.innerWidth < 640) {
        getElement('has-search')?.setAttribute('open', 'open');
        getElement('has-search')?.removeAttribute('name');
        getElement('has-more-menu')?.setAttribute('open', 'open');
    } else {
        getElement('top-nav')?.setAttribute('open', 'open')
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

// Share functionality
if (typeof navigatorShare !== 'undefined') {
    getElement('navigatorShare')?.setAttribute(
        'href',
        'javascript:navigator.share({title: document.title, url: window.location.href})'
    );

    if (location.protocol === 'https:') {
        getElement('copyPermalink')?.removeAttribute('class');
    }
}

getElement('print-button')?.removeAttribute('class');
getElement('back')?.removeAttribute('class');

// Date handling
const date = new Date();

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

        const isoTime = date.toISOString();
        const timeStamp = getElement('time-stamp');
              timeStamp.innerHTML = isoTime;
              timeStamp?.setAttribute('datetime', isoTime);
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

addEvent(document, 'keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        getElement('has-search')?.setAttribute('open', 'open');
        const searchInput = document.querySelector('.pagefind-ui__search-input');
        searchInput?.focus();
    }
});

// addEvent(getElement('qrButton'), 'click', function() {
//     const script = document.createElement('script');
//     script.src = '/assets/js/qrcode.js';
//     document.head.appendChild(script);
// });
