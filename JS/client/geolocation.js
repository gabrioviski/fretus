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
    color: '#ef9652',
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
            /* results[i].innerHTML = ''
            input.classList.remove('border') */
            removeSuggestions(input, i)
        }
    })
})

function removeSuggestions(input, i) {
    results[i].innerHTML = ''
    input.classList.remove('border')
}