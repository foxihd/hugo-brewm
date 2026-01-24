// constant block
    // DOM element getters
const getElement = id => document.getElementById(id);
const getElements = selector => document.querySelectorAll(selector);
    // collapsable
const collapseParentNode = getElements('.js-cpn');
const collapseGrandParentNode = getElements('.js-cgpn');
const detailsElements = getElements('details.js-details');
    // register date
const date = new Date();

// Event listener helper function
function addEvent(element, event, handler) {
    if (element) {
        if (element.attachEvent) {
            return element.attachEvent('on' + event, handler);
        }
        return element.addEventListener(event, handler, false);
    }
}

// Logotype width calculation
function recalcLogotypeWidth() {
    const logotype = getElement('logotype');
    const logotypeText = getElement('logotype__text');
    if (logotype) {
        logotype.setAttribute('width', `${logotypeText.getBoundingClientRect().width}px`);
    }
}

// Viewport adaptation
function adaptViewport() {
    // fix logotype when font loading delayed
    document.fonts.ready.then(() => {
        recalcLogotypeWidth();
    });
    if (window.innerWidth < 640) {
        if (getElement('has-search')) {
            getElement('has-search').setAttribute('open', 'open');
            getElement('has-search').removeAttribute('name');
        }
        if (getElement('has-more-menu')) {
            getElement('has-more-menu').setAttribute('open', 'open');
        }
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
        if (getElement('top-nav')) {
            getElement('top-nav').setAttribute('open', 'open');
        }
        if (typeof visualViewport !== 'undefined') {
            addEvent(visualViewport, 'resize', adaptViewport);            
        }
    }
}
addEvent(window, 'DOMContentLoaded', adaptViewport);

// Node collapse handlers
collapseParentNode.forEach(element => {
    const handler = () => element.parentNode.removeAttribute('open');
    addEvent(element, 'click', handler);
});

collapseGrandParentNode.forEach(element => {
    const handler = () => element.parentNode.parentNode.removeAttribute('open');
    addEvent(element, 'click', handler);
});

if (window.innerWidth > 640) {
    // Accordion details element handler for legacy browsers that ignore name attribute for
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

// Date handling
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