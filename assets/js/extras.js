
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
    const elements = getElements('.grain, #dwclock');
    elements.forEach(element => {
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