const inputs = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNscG14ZDB6OTAwc3Eya29pM2dvZm5uamYifQ.IPac1tcfJTcmQLrrn937wQ'
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
    // console.log(route.distance / 1000)
    // setPrice(route.distance / 1000)
})

end.on('dragend', async () => {
    const newCoords = end._lngLat
    end.setLngLat(newCoords)
    getRoute(start, end)
    const newAddress = await dataResult(newCoords)
    inputs[1].value = `${newAddress.features[0].place_name}`
    inputs[1].setCustomValidity('')
    // console.log(route.distance / 1000)
    // setPrice(route.distance / 1000)
})

const dataResult = async (query) => {
    // const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
    let url = `https://mapbox-hidden-api.vercel.app/geocoding/${query}`
    if (typeof query != 'string') {
        url = `https://mapbox-hidden-api.vercel.app/geocoding/${query.lng},${query.lat}?reverse=true`
    }
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
        const url = `https://mapbox-hidden-api.vercel.app/routes/?startLng=${startCoords.lng}&startLat=${startCoords.lat}&endLng=${endCoords.lng}&endLat=${endCoords.lat}`
        const res = await fetch(url)
        const data = await res.json()
        route = data.routes[0]
        
        // const minutes = Math.floor(route.duration / 60)
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
        setPrice(route.distance / 1000)
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

///areas periosas/////////////////
async function apiLugares() {
    const options = {
      method: 'GET',
      url: 'https://crimeometer.p.rapidapi.comraw-data/',
      params: {
        datetime_end: '2024-03-22T12:00:00',
        lat: '-23.512929',
        datetime_ini: '2024-03-22T00:00:00',
        lon: '-46.883900',
        distance: '10km'
      },
      headers: {
        'x-api-key': 'k3RAzKN1Ag14xTPlculT39RZb38LGgsG8n27ZycG',
        'X-RapidAPI-Key': '1a6f3b17ebmsh03bfa950d89b1ecp1ef1f2jsn1915b95728ff',
        'X-RapidAPI-Host': 'crimeometer.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(options.url, {
        method: options.method,
        headers: options.headers
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
//apiLugares()
//===========================

  var areas = [
    {
        center: [-46.809745, -23.485262],
        size: 0.01, // Tamanho do quadrado
        fillColor: 'red'
    },
    {
        center: [-46.648486, -23.554119], // Nova coordenada
        size: 0.01, 
        fillColor: 'red' 
    },
    // Adicionar mais áreas conforme necessário
];

  
  map.on('load', function () {
    areas.forEach(function (area, index) {
      var coordinates = generateSquareCoordinates(area.center, area.size);
  
      map.addSource('area' + index, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [coordinates]
          }
        }
      });
  
      map.addLayer({
        'id': 'area' + index,
        'type': 'fill',
        'source': 'area' + index,
        'layout': {},
        'paint': {
          'fill-color': area.fillColor,
          'fill-opacity': 0.5
        }
      });
    });
  });
  
  // Função para gerar as coordenadas de um quadrado
  function generateSquareCoordinates(center, size) {
    var halfSize = size / 2;
    return [
      [center[0] - halfSize, center[1] - halfSize],
      [center[0] + halfSize, center[1] - halfSize],
      [center[0] + halfSize, center[1] + halfSize],
      [center[0] - halfSize, center[1] + halfSize],
      [center[0] - halfSize, center[1] - halfSize]
    ];
  }