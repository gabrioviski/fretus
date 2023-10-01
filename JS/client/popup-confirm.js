const inputStart = document.querySelector('.start')
const inputEnd = document.querySelector('.end')
const vehicle = document.querySelector('input[name="vehicles"]')
const submit = document.querySelector('[type="submit"].cta')
const popup = document.querySelector('.popup')
const formContainer = document.querySelector('main > .form')
const mapContainer = document.querySelector('main > .map')
const backForm = document.querySelector('.return-form')
const close = document.querySelector('.close')
const priceContainer = document.querySelector('.price')

submit.addEventListener('click', e => {
    if (inputStart.validity.valid == true && inputEnd.validity.valid == true && vehicle.validity.valid) {
        e.preventDefault()
        popup.classList.add('show')
        formContainer.classList.add('mobile')
        mapContainer.classList.add('mobile')
        backForm.classList.add('show')
        map.resize()
        setZoomRoute(route)
        setPrice(route.distance)
    }
})

const setPrice = distance => {
    const typeVehicle = document.querySelector('input[name="vehicles"]:checked').id
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    })

    /* fazer os calculos aqui */

    let price = f.format(5)
    priceContainer.textContent = price
    console.log(typeVehicle, price)
}
    
backForm.addEventListener('click', () => {
    formContainer.classList.toggle('mobile')
})

close.addEventListener('click', () => {
    popup.classList.remove('show')
})