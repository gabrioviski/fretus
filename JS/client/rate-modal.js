const rate = document.querySelectorAll('.rate')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const stars = document.querySelectorAll('.star')

rate.forEach(item => {
    item.addEventListener('click', () => {
        modal.classList.add('show')
    })
})

close.addEventListener('click', () => {
    modal.classList.remove('show')
})

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        removeClass(stars, 'checked')
        addClass(stars, i)
    })
})

function removeClass(el, className) {
    el.forEach(item => {
        if (item.classList.contains(className)) {
            item.classList.remove(className)
        }
    })
}

function addClass(el, i) {
    for (let j = el.length - 1; j >= i; j--) {
        el[j].classList.add('checked')
    }
}