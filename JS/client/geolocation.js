const inputs = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNsa3JvOW55eDJscXgzcWtlY2F5d21kZW4ifQ.Xp_C-dMh7SEjIBFKd8njCA'

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-46.625290, -23.533773],
    zoom: 12,
    minZoom: 8,
    language: 'pt'
})

map.addControl(new mapboxgl.NavigationControl());

const start = new mapboxgl.Marker({
    color: '#ef9652',
    draggable: true
})

const end = new mapboxgl.Marker({
    color: '#ef9652',
    draggable: true
})

inputs.forEach((input, i) => {
    input.addEventListener('input', async () => {
        const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.value}.json?access_token=${accessToken}&language=pt&bbox=${bbox}&limit=3`
        const res = await fetch(url)
        const dataRes = await res.json()
        console.log(dataRes)
        results[i].innerHTML = ''
        dataRes.features.forEach((suggestion) => {
            const suggestionItem = document.createElement('li')
            suggestionItem.innerText = suggestion.place_name
            suggestionItem.addEventListener('click', () => {
                const coords = suggestion.geometry.coordinates
                if (input.classList.contains('start')) {
                    start.setLngLat(coords).addTo(map)
                } else {
                    end.setLngLat(coords).addTo(map)
                }
                map.flyTo({
                    center: coords
                })
            })
            results[i].appendChild(suggestionItem)
        })
    })
})