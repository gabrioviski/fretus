const inputs = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNsa3JvOW55eDJscXgzcWtlY2F5d21kZW4ifQ.Xp_C-dMh7SEjIBFKd8njCA'

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-46.625290, -23.533773],
    zoom: 12,
    minZoom: 7,
    language: 'pt'
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

inputs.forEach((input, i) => {
    input.addEventListener('input', async () => {
        input.classList.add('border')
        const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.value}.json?access_token=${accessToken}&language=pt&bbox=${bbox}&limit=3`
        const res = await fetch(url)
        const dataRes = await res.json()
        console.log(dataRes)
        results[i].innerHTML = ''
        dataRes.features.forEach((suggestion) => {
            const suggestionItem = document.createElement('li')
            suggestionItem.innerText = suggestion.place_name
            suggestionItem.addEventListener('click', (e) => {
                const coords = suggestion.geometry.coordinates
                input.value = e.target.innerText
                if (input.classList.contains('start')) {
                    start.setLngLat(coords).addTo(map)
                } else {
                    end.setLngLat(coords).addTo(map)
                }
                
                map.flyTo({
                    center: coords
                })
                removeSuggestions(input, i)
            })
            results[i].appendChild(suggestionItem)
        })
    })
})

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


// minha parte

//linhas para usuario desenhar


const draw = new MapboxDraw({
  
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true
  },
  
  defaultMode: 'draw_line_string',
  styles: [
    
    {
      id: 'gl-draw-line',
      type: 'line',
      filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color':'transparent' ,
        'line-dasharray': [0.2, 2],
        'line-width': 4,
        'line-opacity': 0.7
      }
    },
    
    {
      id: 'gl-draw-polygon-and-line-vertex-halo-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
        
        'circle-radius': 12,
        'circle-color': 'transparent'
      }
    },
    
    {
      id: 'gl-draw-polygon-and-line-vertex-active',
      type: 'circle',
      filter: [
        'all',
        ['==', 'meta', 'vertex'],
        ['==', '$type', 'Point'],
        ['!=', 'mode', 'static']
      ],
      paint: {
           
     
    
       'circle-radius': 8,
       'circle-color': 'transparent'
      }
    }
  ]
});


map.addControl(draw);

//--------------------------
//retorna dados

/*
function updateRoute() {
  
  const profile = 'driving';
  
  const data = draw.getAll();
  const lastFeature = data.features.length - 1;
  const coords = data.features[lastFeature].geometry.coordinates;
  
  const newCoords = coords.join(';');
  
  const radius = coords.map(() => 25);
  getMatch(newCoords, radius, profile);
}
*/


//-------------

map.on('draw.create', updateRoute);
map.on('draw.update', updateRoute);

//----

function addRoute(coords) {
  
  if (map.getSource('route')) {
    map.removeLayer('route');
    map.removeSource('route');
  } else {
    
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: coords
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#0562ec',
        'line-width': 5,
        'line-opacity': 0.8
      }
    });
  }
}

//-----------


//-----------------

function getInstructions(data) {
  
  const directions = document.getElementById('directions');
  let tripDirections = '';
  
  for (const leg of data.legs) {
    const steps = leg.steps;
    for (const step of steps) {
      tripDirections += `<li>${step.maneuver.instruction}</li>`;
    }
  }
  directions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
    data.duration / 60
  )} min.</strong></p><ol>${tripDirections}</ol>`;
}

//----------


async function getMatch(coordinates, radius, profile) {
  const radiuses = radius.join(';');
  const query = await fetch(
    `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const response = await query.json();

  if (response.code !== 'Ok') {
    alert(
      `${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
    );
    return;
  }

  var coords = response.matchings[0].geometry;

  // Adicione a rota ao mapa
  addRoute(coords);

  // Exiba as informações da rota no elemento HTML
  var routeDuration = response.matchings[0].duration;
  var routeDistance = response.matchings[0].distance;

  // Verifique se os valores são números válidos antes de exibi-los
  if (!isNaN(routeDuration) && !isNaN(routeDistance)) { 
   
    var routeDurationInMinutes = Math.floor(routeDuration / 60);
    var routeDistanceInKilometers = (routeDistance / 1000).toFixed(2);

    // Exibir as informações no HTML
    //APENAS OS DESENHADOS
    document.getElementById('route-duration').textContent = `${routeDurationInMinutes} minutos`;
    document.getElementById('route-distance').textContent = `${routeDistanceInKilometers} km`;
  }
}

// ...


// ...EXECUtAR TEMPO DE ROTA DIGITADO

  
//-----------

//deleta rota


function removeRoute() {
  if (!map.getSource('route')) return;
  map.removeLayer('route');
  map.removeSource('route');
}

map.on('draw.delete', removeRoute);



//-------------------

// Função para obter a rota entre os marcadores start e end







async function getRoute(startCoords, endCoords) {
  const profile = 'driving';
  var coordinates = `${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}`;
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
  
  try {


    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].geometry.coordinates;

  } catch (error) {
    console.error('Erro ao obter a rota:', error);
    return null;
  }
}











async function showRoute() {
  var startCoords = start.getLngLat().toArray();
  var endCoords = end.getLngLat().toArray();
  var routeCoordinates = await getRoute(startCoords, endCoords);

  if (routeCoordinates) {
    const routeGeoJSON = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    };

    // Adicionar a rota ao mapa
    if (map.getSource('route')) {
      map.getSource('route').setData(routeGeoJSON);
    } else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: routeGeoJSON,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#438EE4',
          'line-width': 5,
          'line-opacity': 0.8,
        },
      });
    }
  }

  
  var route = await getRoute(startCoords, endCoords);

  if (route) {
    var routeDuration = route.duration; // em segundos
    var routeDistance = route.distance; // em metros

   
    var routeDurationInMinutes = Math.floor(routeDuration / 60);
    var routeDistanceInKilometers = (routeDistance / 1000).toFixed(2);

    // HTML
    document.getElementById('route-duration').textContent = `${routeDurationInMinutes} minutos`;
    document.getElementById('route-distance').textContent = `${routeDistanceInKilometers} km`;
  }

}












// Chamar a função showRoute quando os marcadores forem movidos
start.on('dragend', showRoute);
end.on('dragend', showRoute);

//-------------------

// Função para obter a rota entre os marcadores start e end




// Função para exibir a rota no mapa

function displayRoute() {
  const startCoords = start.getLngLat().toArray();
  const endCoords = end.getLngLat().toArray();
  
  getRoute(startCoords, endCoords)
    .then(routeCoordinates => {
      if (routeCoordinates) {
        const routeGeoJSON = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates,
          },
        };
  
        // Adicionar a rota ao mapa
        if (map.getSource('route')) {
          map.getSource('route').setData(routeGeoJSON);
        } else {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: routeGeoJSON,
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#438EE4',
              'line-width': 5,
              'line-opacity': 0.8,
            },
          });
        }
      }
    });
}

// Chamar a função displayRoute quando os locais são digitados
inputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    input.classList.add('border');
    const bbox = "-53.305664,-25.204941,-45.439453,-19.849394";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.value}.json?access_token=${accessToken}&language=pt&bbox=${bbox}&limit=3`;
    
    fetch(url)
      .then(response => response.json())
      .then(dataRes => {
        console.log(dataRes);
        results[i].innerHTML = '';
        dataRes.features.forEach(suggestion => {
          const suggestionItem = document.createElement('li');
          suggestionItem.innerText = suggestion.place_name;
          suggestionItem.addEventListener('click', e => {
            const coords = suggestion.geometry.coordinates;
            input.value = e.target.innerText;
            if (input.classList.contains('start')) {
              start.setLngLat(coords).addTo(map);
              var start2 = start.setLngLat(coords)
            } else {
              end.setLngLat(coords).addTo(map);
              var end2 = end.setLngLat(coords)
            }
            map.flyTo({
              center: coords
            });
            removeSuggestions(input, i);
            
            // Exibir a rota assim que os locais são digitados
            displayRoute();
            rotaDigitada();

          });
          results[i].appendChild(suggestionItem);
        });
      });
  });
});

//------------
// ...










function updateRoute() {
  // Remove os marcadores "start" e "end" existentes
  start.remove();
  end.remove();

  
  const profile = 'driving';
  
  const data = draw.getAll();
  const lastFeature = data.features.length - 1;
  const coords = data.features[lastFeature].geometry.coordinates;
  
  const newCoords = coords.join(';');
  
  const radius = coords.map(() => 25);
  getMatch(newCoords, radius, profile);

  // Adicione o marcador "start" na primeira coordenada
  start.setLngLat(coords[0]).addTo(map);

  // Adicione o marcador "end" nas coordenadas restantes
  for (let i = 1; i < coords.length; i++) {
    end.setLngLat(coords[i]).addTo(map);
  }

}










// ...

//inofrmações tempo


//novos codigo 




function rotaDigitada(){
  

//var routeDuration = response.matchings[0].duration;
//var routeDistance = response.matchings[0].distance;
  var startCoords = start.getLngLat()//.toArray();
  var endCoords = end.getLngLat()//.toArray();
  
  //var route =  showRoute(startCoords, endCoords);
  var route =  getRoute(startCoords, endCoords);
  //var route = essarota()


  if (route) {
    var routeDuration = route.duration; // em segundos
    var routeDistance = route.distance; // em metros


    var routeDurationInMinutes = Math.floor(routeDuration / 60);
    var routeDistanceInKilometers = (routeDistance / 1000).toFixed(2);


    // HTML
    document.getElementById('route-duration').textContent = `${routeDurationInMinutes} minutos`;
    document.getElementById('route-distance').textContent = `${routeDistanceInKilometers} km`;

  }
}





// ...


// Função para exibir a rota no mapa
function displayRoute(routeCoordinates) {
  if (routeCoordinates) {
    const routeGeoJSON = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates,
      },
    };

    // Adicionar ou atualizar a camada da rota no mapa
    if (map.getSource('route')) {
      map.getSource('route').setData(routeGeoJSON);
    } else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: routeGeoJSON,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#438EE4',
          'line-width': 5,
          'line-opacity': 0.8,
        },
      });
    }
  }
}






//QUANDO MOVE FAZ CALCULO TEMPO
/*
async function updateRoute() {
  // Remova os marcadores "start" e "end" existentes
  start.remove();
  end.remove();

  const profile = 'driving';

  // Obtenha as coordenadas do desenho no mapa
  const data = draw.getAll();

  if (data.features.length === 0) {
    // Não há coordenadas desenhadas, saia da função
    return;
  }

  const coords = data.features[data.features.length - 1].geometry.coordinates;
  const newCoords = coords.join(';');
  const radius = coords.map(() => 25);

  // Adicione o marcador "start" na primeira coordenada
  start.setLngLat(coords[0]).addTo(map);

  // Adicione o marcador "end" nas coordenadas restantes
  for (let i = 1; i < coords.length; i++) {
    end.setLngLat(coords[i]).addTo(map);
  }

  // Obter as coordenadas dos marcadores
  const startCoords = start.getLngLat();
  const endCoords = end.getLngLat();

  // Obter a rota
  const route = await getRoute(startCoords, endCoords);

  if (route) {
    // Exibir a rota no mapa
    displayRoute(route.coordinates);
    addRoute(startCoords,endCoords)

    // Exibir as informações da rota no HTML
    const routeDurationInMinutes = Math.floor(route.duration / 60);
    const routeDistanceInKilometers = (route.distance / 1000).toFixed(2);

    document.getElementById('route-duration').textContent = `${routeDurationInMinutes} minutos`;
    document.getElementById('route-distance').textContent = `${routeDistanceInKilometers} km`;
  }
}

// Atualize o chamado para a função updateRoute



*/



