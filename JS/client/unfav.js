const container = document.querySelector('.carousel .content')
const unfav = document.querySelectorAll('.unfav-call')
const shippers = document.querySelectorAll('.carousel .products')
const notificationContainer = document.querySelector('.notification-container')

unfav.forEach((item, idx) => {
    item.addEventListener('click', () => {
        const removed = shippers[idx]
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
    msg.textContent = 'Entregador Desfavoritado! '
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