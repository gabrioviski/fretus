const step = Array.from(document.querySelectorAll('.mobile-controls > label'))
const imgs = document.querySelectorAll('.mobile-content > .content-item')
let mobileIndex

step.forEach(item => {
    item.addEventListener('click', () => {
        mobileIndex = step.indexOf(item)
        removeClass()
        imgs[mobileIndex].classList.add('show')
    })
})

function removeClass() {
    imgs.forEach(item => {
        if (item.classList.contains('show')) {
            item.classList.remove('show')
        }
    })
}