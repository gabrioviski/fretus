const inputs = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNsa3JvOW55eDJscXgzcWtlY2F5d21kZW4ifQ.Xp_C-dMh7SEjIBFKd8njCA'
let route

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-46.625290, -23.533773],
    zoom: 12,
    minZoom: 5,
    language: 'pt'
})

window.addEventListener('resize', () => {
    if (route) {
        setZoomRoute(route)
    }
})

map.addControl(new mapboxgl.NavigationControl());

const start = new mapboxgl.Marker({
    color: '#2C6493',
    draggable: true
})

const end = new mapboxgl.Marker({
    color: '#ef9652',
    draggable: true

})

start.on('dragend', async () => {
    const newCoords = start._lngLat
    start.setLngLat(newCoords)
    getRoute(start, end)
    const newAddress = await dataResult(newCoords)
    inputs[0].value = `${newAddress.features[0].place_name}`
    inputs[0].setCustomValidity('')
})

end.on('dragend', async () => {
    const newCoords = end._lngLat
    end.setLngLat(newCoords)
    getRoute(start, end)
    const newAddress = await dataResult(newCoords)
    inputs[1].value = `${newAddress.features[0].place_name}`
    inputs[1].setCustomValidity('')
})

const dataResult = async (query) => {
    const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${typeof query == 'string'?
                                                                    `${query}.json?access_token=${accessToken}&limit=3`:
                                                                    `${query.lng},${query.lat}.json?access_token=${accessToken}&limit=1`}
                                                                    &language=pt&bbox=${bbox}`
    const res = await fetch(url)
    const dataRes = await res.json()
    return dataRes
}

inputs.forEach((input, i) => {
    input.addEventListener('input', async () => {
        input.setCustomValidity('Endereço não válido!')
        input.classList.add('border')
        const dataRes = await dataResult(input.value)
        results[i].innerHTML = ''
        dataRes.features.forEach((suggestion) => {
            const suggestionItem = document.createElement('li')
            suggestionItem.innerText = suggestion.place_name
            suggestionItem.addEventListener('click', (e) => {
                input.setCustomValidity('')
                const coords = suggestion.geometry.coordinates
                input.value = e.target.innerText
                if (input.classList.contains('start')) {
                    start.setLngLat(coords).addTo(map)
                } else {
                    end.setLngLat(coords).addTo(map)
                }

                getRoute(start, end)

                map.easeTo({
                    center: coords
                })
                removeSuggestions(input, i)
            })
            results[i].appendChild(suggestionItem)
        })
    })
})

async function getRoute(start, end) {
    const startCoords = start._lngLat
    const endCoords = end._lngLat

    if (startCoords && endCoords) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?steps=false&overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`
        const res = await fetch(url)
        const data = await res.json()
        route = data.routes[0]
        const minutes = Math.floor(route.duration / 60)
        // const meters = route.distance
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route.geometry.coordinates
            }
        }

        if (map.getSource('route')) {
            map.getSource('route').setData(geojson);
        }
        else {
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
        }

        setZoomRoute(route)
    }
}

const setZoomRoute = route => {
    const bounds = new mapboxgl.LngLatBounds(
        route.geometry.coordinates[0],
        route.geometry.coordinates[0]
    )
    
    route.geometry.coordinates.forEach(coord => {
        bounds.extend(coord)
    })

    map.fitBounds(bounds, { padding: 50 })
}

inputs.forEach((input, i) => {
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !results[i].contains(e.target)) {
            removeSuggestions(input, i)
        }
    })
})

function removeSuggestions(input, i) {
    results[i].innerHTML = ''
    input.classList.remove('border')
}


//PREÇOS

var distancia = (route.distance/1000)
var tipoVeiculo = document.querySelector('input[name="vehicles"]:checked').id
var typeVehicle = document.querySelector('input[name="vehicles"]:checked').id
function calcularPreco(distancia, typeVelhicle) {
    let precoPorKm;
  
  
    if (typeVelhicle=== 'bike') {
      precoPorKm = 2;
    } else if (typeVelhicle=== 'car' || typeVelhicle === 'van') {
      precoPorKm = 2.5;
    } else if (typeVelhicle === 'truck') {
      precoPorKm = 3;
    } else {
      precoPorKm = 2; 
    }
  
    // Calcular o preço total
    var precoTotal = distancia * precoPorKm;
    
    return precoTotal;
  }
 
  
  //var precoDaRota = calcularPreco(distancia, typeVelhicle);
  //console.log(`O preço da rota é de R$${precoDaRota.toFixed(2)}`);

  function valorMinimo(){
    var porcentagem = ( precoDaRota*15)/100
    var precoMinimo= precoDaRota - porcentagem
  }
  
  