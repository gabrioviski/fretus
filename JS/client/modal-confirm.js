const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const vehicle = document.querySelector('input[name="vehicles"]')
const submit = document.querySelector('[type="submit"].cta')
const modal = document.querySelector('.modal')
const formContainer = document.querySelector('main > .form')
const mapContainer = document.querySelector('main > .map')

submit.addEventListener('click', (e) => {
    /* if (inputStart.validity.valid == true && inputEnd.validity.valid == true && vehicle.validity.valid) { */
        e.preventDefault()
        modal.classList.add('show')
        formContainer.classList.add('mobile')
        mapContainer.classList.add('mobile')
    /* } */
})


// console.log(formContainer, mapContainer)