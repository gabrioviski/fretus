const header = document.querySelector('header')
let lastScroll = 0

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if(!immediate) func.apply(context, args)
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

window.addEventListener('scroll', debounce(() => {
    const scrollHeight = window.scrollY

    if (scrollHeight == 0) {
        header.classList.remove('resized')
    } else if (scrollHeight <= 1800) {
        header.classList.add('resized')
        header.classList.remove('hide')
    } else {
        header.classList.add('hide')
        if (scrollHeight < lastScroll) {
            header.classList.remove('hide')
        }
    }
console.log(1);
    lastScroll = scrollHeight
}, 100))