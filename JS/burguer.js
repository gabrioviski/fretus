const burguer = document.querySelector('.burguer')
const menu = document.querySelector('.menu-burguer')

burguer.addEventListener('click', () => {
    menu.classList.toggle('active')
})