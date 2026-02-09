const menu = getElement('menu');
const hour = date.getHours();

if (menu) {
    const {
        i18nBack,
        i18nPrint,
        i18nCopy,
        i18nCopying
    } = menu.dataset;
    const hasBack = getElement('has-back');

    menu.innerHTML += `
<li>
  <button id="print-button" onclick="window.print()" aria-label="${i18nPrint}">
    <span class="t srt" role="tooltip">${i18nPrint}</span>
  </button>
</li>
    `

    if (hasBack) {
        hasBack.innerHTML = `
<button id="back" type="button" onclick="history.back();" aria-label="${i18nBack}">
  <span class="t srt" role="tooltip">${i18nBack}</span>
</button>
        `
    }

    // enable copy and navigatorShare element when protocol is secure
    if (location.protocol === 'https:') {
        // use navigator.share when supported
        shareBtn = getElement('navigatorShare');
        if (navigator.share && shareBtn) {
            shareBtn.setAttribute(
                'href',
                'javascript:navigator.share({title: document.title, url: window.location.href})'
            );
        }

        menu.innerHTML += `
<li>
  <button id="copy" onclick="navigator.clipboard.writeText(window.location.href)" aria-label="${i18nCopy}">
    <span id="status" class="t srt" role="tooltip">${i18nCopy}</span>
  </button>
</li>
        `
        // copying
        const status = getElement('status');
        addEvent(getElement('copy'), 'click', () => {
            status.innerText = i18nCopying;
            setTimeout(() => status.innerText = i18nCopy, 2000 )
        });
    }
}

// Mastodon and QR code functionality
if (typeof mastodonInstance !== 'undefined') {
    getElement('has-mastodon').className = 'active';

    const mastodonHandler = () => {
        mastodonTitle.disabled = true;
        mastodonPermalink.disabled = true;
        mastodonText.disabled = false;
        mastodon.setAttribute('action', `${mastodonInstance.value}/share`);
    };

    addEvent(mastodonInstance, 'input', mastodonHandler);
}

// Colophon
if (getElement('colophon') && (typeof QRCode !== 'undefined')) {
    getElement('colophon').removeAttribute('style');
    getElement('qr').appendChild(
        QRCode({
            msg: window.location.href,
            ecl: 'M',
            pal: ['#000', '#fff'],
            pad: 2,
            dim: 96,
        })
    );

    const timeStamp = getElement('time-stamp');
    if (timeStamp) {
        timeStamp.innerHTML = formatDate(date);
        timeStamp.setAttribute('datetime', date.toISOString());
    }
}

// Digital well-being clock
if (hour > 6 && hour < 21) {
    getElements('.grain, #dwclock').forEach(e => {
        e.remove();
    });
} else {
    getElement('background-body').innerHTML = `
<div id="dwclock">
  <div id="min"><div class="hand"></div></div>
  <div id="hour"><div class="hand"></div></div>
</div>
    `

    const bg = getElements('.background, #background-body');
    const clockSty = document.createElement('style');
    bg.forEach(e => {
        e.innerHTML += `<div class="grain"></div>`;
    });
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
    getElements('[name="redaction-history"]').forEach(e => {
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

const toc = getElement('has-TableOfContents');
const content = getElement('content');
const halfmarginpar = 11.077 * parseFloat(getComputedStyle(document.documentElement).fontSize);
if (content && toc && (content.getBoundingClientRect().x > halfmarginpar) ) {
    const tocy = getElement('timestamp').getBoundingClientRect().y;
    const tocSty = Object.assign(document.createElement('style'), {
        id: 'tocSty',
        textContent: `#has-TableOfContents{--top:${tocy}px;display:flex;position:fixed;top:var(--top);left:calc(var(--void) - 11.077rem);flex-direction:column;align-items:center;padding:0 1rem;width:var(--marginparwidth);height:calc(var(--vbody) + var(--vhead) - var(--top));overflow-y:auto;transition:1s;}a.active{color:var(--fg)}#exclude{background:var(--bg);position:relative}#top,.pagewidth{padding-right:calc(var(--void) - 11.077rem);padding-left:calc(var(--void) - 11.077rem)}#main-article{padding-right:calc(var(--void) - 11.077rem);padding-left:calc(var(--void) + 11.077rem)}.form{z-index:2}#i18n-menu > .on-plank, #more-menu > .on-plank {margin: 1rem calc(var(--void) - 11.077rem) 1rem auto;}#main-footer > div {padding: 0 calc(var(--void) - 1em - 12.695rem);}`
    });
    document.head.appendChild(tocSty);
    function adjusttoc() {
        if (document.documentElement.scrollTop < tocy) {
            toc.style.setProperty('--top', tocy + 'px' );
        } else {
            toc.style.setProperty('--top', '6rem');
        }
    }
    adjusttoc();
    addEvent(window, 'beforeprint', () => {getElement('tocSty').remove()});
    addEvent(window, 'scroll', adjusttoc);
    addEvent(document, 'DOMContentLoaded', () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
            document.querySelector(`#has-TableOfContents a[href="#${id}"]`).classList.add('active');
        } else {
            document.querySelector(`#has-TableOfContents a[href="#${id}"]`).classList.remove('active');
        }
        });
    });
    getElements('h2[id], h3[id]').forEach((h) => {
        observer.observe(h);
    });
    });
};