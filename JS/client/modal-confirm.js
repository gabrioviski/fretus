const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const vehicle = document.querySelector('input[name="vehicles"]')
const submit = document.querySelector('[type="submit"].cta')
const modal = document.querySelector('dialog')

submit.addEventListener('click', (e) => {
    if (inputStart.validity.valid == true && inputEnd.validity.valid == true && vehicle.validity.valid) {
        e.preventDefault()
        modal.showModal()
    }
})