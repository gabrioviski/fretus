const cuponCall = document.querySelector('.action > span')
const cuponNum = document.querySelector('.card-cupon .money')
const cuponPopup = document.querySelector('.popup.cupon')
const cuponClose = document.querySelector('.popup.cupon .close')

const showCuponPopup = () => {
    cuponPopup.classList.add('show')
}

const changeInfo = () => {
    cuponCall.textContent = 'Consultar'
    cuponNum.textContent = '1 Cupom'
    showAcceptNotification('Cupom Ativado!')
    cuponCall.removeEventListener('click', changeInfo)
    cuponCall.addEventListener('click', showCuponPopup)
}

cuponCall.addEventListener('click', changeInfo)

cuponClose.addEventListener('click', () => cuponPopup.classList.remove('show'))