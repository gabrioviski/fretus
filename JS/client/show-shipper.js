const shippers = document.querySelectorAll('.products')

setInterval(() => {
    items = document.querySelectorAll('.products.show')
    let len = shippers.length
    let random = parseInt(Math.random() * len)
    shippers[random].classList.add('show')
    // console.log(random)
}, 2000)