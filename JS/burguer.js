const burguer = document.querySelectorAll('.burguer')
const menu = document.querySelector('.menu-burguer')

burguer.forEach(item => {
    item.addEventListener('click', async () => {
        menu.classList.toggle('active')
        const query = 'Barueri'
        const url = `https://mapbox-hidden-api.vercel.app/api/${query}`
        const res = await fetch(url)
        const dataRes = await res.json()
        console.log(JSON.stringify(dataRes, null, 2))
    })
})