const toggle = document.querySelectorAll('.switch > input[name="change"]')
const span = document.querySelector('.switch > span')

toggle.forEach((item, i, arr) => {
    item.addEventListener('click', () => {
        span.style = `transform: translateX(${item.dataset.move}px)`
        document.querySelector(`.${item.id}`).style = `display: block;`
        document.querySelector(`.${arr[1 - i].id}`).style = `display: none;`
    })
})