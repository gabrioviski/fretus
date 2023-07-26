const accept = document.querySelector('.msg.payment .yes')
const deny = document.querySelector('.msg.payment .no')

accept.addEventListener('click', () => {
    deny.remove()
    accept.innerText = 'Proposta Aceita!'
})

deny.addEventListener('click', () => {
    accept.remove()
    deny.innerText = 'Proposta Negada!'
})