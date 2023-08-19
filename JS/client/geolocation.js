const input = document.querySelectorAll('.address')
const results = document.querySelectorAll('.suggestions-options')
const accessToken = 'pk.eyJ1IjoiZ2FicmllbGNhcnZhbGgwIiwiYSI6ImNsa3JvOW55eDJscXgzcWtlY2F5d21kZW4ifQ.Xp_C-dMh7SEjIBFKd8njCA'
const bbox = "-53.305664,-25.204941,-45.439453,-19.849394"

mapboxgl.accessToken = accessToken
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-46.625290, -23.533773],
    zoom: 12,
    language: 'pt'
})

input.forEach((item, i) => {
    item.addEventListener('input', async () => {
        // console.log(item.value.length % 2 == 0);
        // if (item.value.length % 3 == 0) {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.value}.json?access_token=${accessToken}&language=pt&bbox=${bbox}&limit=3`
            const res = await fetch(url)
            const dataRes = await res.json()
            console.log(dataRes)
            results[i].innerHTML = ''
            dataRes.features.forEach((item) => {
                const suggestion = document.createElement('li')
                suggestion.innerText = item.place_name
                suggestion.addEventListener('click', () => {
                    const coords = item.geometry.coordinates
                    const marker = new mapboxgl.Marker({
                        color: '#ef9652',
                        draggable: true
                    }).setLngLat(coords).addTo(map)
                    // console.log(item.geometry.coordinates)
                    map.flyTo({
                        center: coords,
                        zoom: 12
                    })
                })
                results[i].appendChild(suggestion)
            })
        // }
    })
})