const main = document.querySelector('main')
const container = document.querySelector('.requests-container')
let cards = Array.from(document.querySelectorAll('.card'))
let denied = Array.from(document.querySelectorAll('.denied'))
let modal
let removed

denied.forEach(item => {
    item.addEventListener('click', () => {
        let index = denied.indexOf(item)
        removed = cards[index]
        removed.style = `opacity: 0; order: 1;`
        showModal()
    })
})

function showModal() {
    if (main.children.length > 2) {
        main.children[2].remove()
    }
    modal = document.createElement('div')
    modal.innerHTML = `<p>Entrega cancelada! <span>Desfazer</span></p>
    <div class="loading"></div>`
    modal.classList.add('modal', 'active')
    main.appendChild(modal)
    updateUndo()
    setTimeout(() => {
        if (main.children.length > 2) {
            removed.remove()
        }
    }, 7000)
}

function updateUndo() {
    const undo = document.querySelectorAll('.modal p > span')
    undo.forEach(item => {
        item.addEventListener('click', () => {
            removed.style = `display: block`
            modal.classList.remove('active')
            setTimeout(() => {
                modal.remove()
            }, 300)
        })
    })
}