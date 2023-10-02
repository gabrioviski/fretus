const pay = document.querySelectorAll('.pay')
const popup = document.querySelector('.popup')
const close = document.querySelector('.popup .close')
const inputField = document.querySelectorAll('.input-field:not([readonly])')
const img = document.querySelector('.card-input img')

pay.forEach(item => {
    item.addEventListener('click', () => {
        popup.classList.add('show')
    })
})

close.addEventListener('click', () => {
    inputField.forEach(input => input.value = '')
    popup.classList.remove('show')
})

new Cleave('#card-number', {
    creditCard: true,
    onCreditCardTypeChanged: (type) => {
        if (type != 'unknown') {
            img.setAttribute('src', `../../imgs/client/card-icons/${type}.svg`)
        } else {
            img.setAttribute('src', '')
        }
    }  
})

new Cleave('#card-validity', {
    date: true,
    datePattern: ['m', 'y']
})

new Cleave('#card-cvv', {
    blocks: [3],
    numericOnly: true
})