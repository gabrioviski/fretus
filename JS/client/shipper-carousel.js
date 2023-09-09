const carousel = document.querySelectorAll('.carousel')
const content = document.querySelectorAll('.content')
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

controls.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        acts[item.id]()
        changeState(parseInt(i / 2))
    })
})

function changeState(idx) {
    let width = carousel[idx].clientWidth
    let visibleItems = Math.floor(width / 260)
    let clicks = (items.length / carousel.length) - visibleItems
    if (index > clicks) {
        index = 0
    } else if (index < 0) {
        index = clicks
    }
    carousel[idx].scrollLeft = 260 * index
}