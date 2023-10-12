const container = document.querySelector('.requests-container')
const cards = document.querySelectorAll('.card')
const btns = document.querySelectorAll('.card .denied')
const notificationContainer = document.querySelector('.notification-container')

btns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const removed = cards[idx]
        removed.remove()
        showNotification(removed, idx)
    })
})

function showNotification(r, i) {
    if (notificationContainer.innerHTML != '') {
        document.querySelector('.notification').remove()
    }
    
    notificationContainer.classList.add('show')
    
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const msg = document.createElement('p')
    msg.textContent = 'Entrega Cancelada! '
    const undo = document.createElement('span')
    undo.textContent = 'Desfazer'
    msg.appendChild(undo)
    notification.appendChild(msg)
    const loading = document.createElement('div')
    loading.classList.add('loading')
    notification.appendChild(loading)

    undo.addEventListener('click', () => {
        const position = container.children[i]
        container.insertBefore(r, position)
        notificationContainer.classList.remove('show')
    })

    notificationContainer.addEventListener('animationend', () => {
        notificationContainer.classList.remove('show')
    })

    notificationContainer.appendChild(notification)
}