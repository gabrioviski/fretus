const carousel = document.querySelector('.carousel')
const content = document.querySelector('.content')
const items = document.querySelectorAll('.content > .products')
const controls = document.querySelectorAll('.controls > *')
let index = 0

let acts = {
    next() {
        index++
    },
    prev() {
        index--
    }
}

controls.forEach((item) => {
    item.addEventListener('click', (e) => {
        let target = e.target
        acts[target.id]()
        changeState()
    })
})

function changeState() {
    let width = carousel.clientWidth
    let visibleItems = Math.floor(width / 260)
    let clicks = items.length - visibleItems
    if (index > clicks) {
        index = 0
    } else if (index < 0) {
        index = items.length - visibleItems
    }
    content.style = `transform: translate3d(-${260 * index}px, 0, 0);`
}