const pay = document.querySelectorAll('.pay')
const popup = document.querySelector('.popup')
const close = document.querySelector('.popup .close')
const inputField = document.querySelectorAll('.input-field:not([readonly])')

pay.forEach(item => {
    item.addEventListener('click', () => {
        popup.classList.add('show')
    })
})

close.addEventListener('click', () => {
    inputField.forEach(input => input.value = '')
    popup.classList.remove('show')
})