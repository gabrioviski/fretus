const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const vehicle = document.querySelector('input[name="vehicles"]')
const submit = document.querySelector('[type="submit"].cta')
const modal = document.querySelector('.modal')
const formContainer = document.querySelector('main > .form')
const mapContainer = document.querySelector('main > .map')
const backForm = document.querySelector('.return-form')
const close = document.querySelector('.close')

submit.addEventListener('click', e => {
    if (inputStart.validity.valid == true && inputEnd.validity.valid == true && vehicle.validity.valid) {
        e.preventDefault()
        modal.classList.add('show')
        formContainer.classList.add('mobile')
        mapContainer.classList.add('mobile')
        backForm.classList.add('show')
        }
    })
    
backForm.addEventListener('click', () => {
    formContainer.classList.toggle('mobile')
})

close.addEventListener('click', () => {
    modal.classList.remove('show')
})