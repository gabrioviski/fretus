const rate = document.querySelectorAll('.rate')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const stars = document.querySelectorAll('.star')
const submit = document.querySelector('button.cta')
const error = document.querySelector('.modal span')
const cardBottom = document.querySelectorAll('.card .bottom')

rate.forEach((item, i) => {
    item.addEventListener('click', () => {
        modal.classList.add('show')
        modal.dataset.shipper = i
    })
})

close.addEventListener('click', closeModal)

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        removeClass(stars, 'checked')
        addClass(stars, i)
    })
})

submit.addEventListener('click', () => {
    let hasChecked = false
    stars.forEach(star => {
        if (star.classList.contains('checked')) {
            hasChecked = true
        }
    })

    if (hasChecked) {
        error.classList.remove('error')
        rate[modal.dataset.shipper].remove()
        let msg = document.createElement('span')
        msg.innerText = 'Avaliação Feita'
        cardBottom[modal.dataset.shipper].appendChild(msg)
        closeModal()
    } else {
        error.classList.add('error')
    }
})

function closeModal() {
    modal.classList.remove('show')
    removeClass(stars, 'checked')
}

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