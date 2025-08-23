
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

    const clockSty = document.createElement('style');
    clockSty.textContent = `
     .grain{position:absolute;mix-blend-mode:difference;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' version='1.1' width='256' height='256' viewBox='0 0 256 256'><defs><filter id='grain' x='0' y='0' width='1' height='1' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'><feTurbulence type='turbulence' baseFrequency='.7' numOctaves='7' seed='42' stitchTiles='stitch' x='-1%' y='-1%' width='102%' height='102%' result='turbulence' id='feTurbulence2' /><feSpecularLighting surfaceScale='7' specularConstant='3' specularExponent='10' lighting-color='%23ffffff' x='-1%' y='-1%' width='102%' height='102%' in='turbulence' result='specularLighting' id='feSpecularLighting'><feDistantLight azimuth='3' elevation='163' id='feDistantLight' /></feSpecularLighting></filter></defs><rect width='320' height='320' fill='%23000000' id='blackbody' x='-32' y='-32' opacity='.03' /><rect width='320' height='320' fill='%23ffffff' filter='url(%23grain)' id='noise' x='-32' y='-32' opacity='.03' /></svg>");width:100%;height:100%}#dwclock{opacity:.33;margin:auto;width:100vmin;height:100vmin;filter:blur(2vmin) saturate(2)}#hour,#min{position:absolute;width:100vmin;height:100vmin}.hand{--min:40vmin;--hour:28vmin;--tsf:translateY(calc(50vmin - var(--min)));margin:0 auto auto;border-right:2vmin solid transparent;border-bottom:var(--min) solid #60f;border-left:2vmin solid transparent;border-radius:2vmin;background-image:linear-gradient(0deg,var(--bg) 0%,#60f 100%);width:3vmin;height:var(--min)}#hour .hand{--tsf:translateY(calc(50vmin - var(--hour)));border-bottom:var(--hour) solid #20f;background-image:linear-gradient(0deg,var(--bg) 0%,#20f 100%);height:var(--hour)}
    `
    document.head.appendChild(clockSty)

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

// expand redaction history on print
function expandRH() {
    getElements('[name="redaction-history"]')?.forEach(e => {
        e.removeAttribute('name');
        e.removeAttribute('class');
        e.setAttribute('open', 'open');
    });
}

if (window.matchMedia("print").matches) {
    expandRH();
} else {
    addEvent(window, 'beforeprint', expandRH);
}

// copying
const copyPermalink = getElement('copyPermalink');
addEvent(copyPermalink, 'click', () => {
    getElement('copy').innerText = getElement('isCopying').innerText;
    setTimeout(() => getElement('copy').innerText = getElement('copyText').innerText, 2000 )
});