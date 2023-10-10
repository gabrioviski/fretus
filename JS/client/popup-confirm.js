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
        setPrice(route.distance / 1000)
    }
})

const setPrice = distance => {
    const typeVehicle = document.querySelector('input[name="vehicles"]:checked').id // pega o tipo do veiculo
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    }) // classe que transforma qualquer valor em reais

    /* fazer os calculos aqui */
    const preco = calcularPreco(distance, typeVehicle);

 
    let price = f.format(preco) // linha que transforma qualquer valor em reais
    priceContainer.textContent = price // coloca o preco no popup
}
    
backForm.addEventListener('click', () => {
    formContainer.classList.toggle('mobile')
})

close.addEventListener('click', () => {
    popup.classList.remove('show')
})


//PREÇOS

var distancia = (route.distance/1000)
typeVehicle = document.querySelector('input[name="vehicles"]:checked').id
function calcularPreco(distancia,veiculo) {
    let precoPorKm;

    if (veiculo=== 'bike') {
      precoPorKm = 2;
    } else if (veiculo=== 'car' || veiculo === 'van') {
      precoPorKm = 2.5;
    } else if (veiculo === 'truck') {
      precoPorKm = 3;
    } else {
      precoPorKm = 2; 
    }
  
    var precoTotal = distancia * precoPorKm;

    return precoTotal;
  }
 
  

  function valorMinimo(){
    var porcentagem = ( precoDaRota*15)/100
    var precoMinimo= precoDaRota - porcentagem

    return precoMinimo
  }
 
  