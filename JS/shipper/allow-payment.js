/* Solução estranha, pra um erro também estranho... */
const chatContent = document.querySelector('.msgs-content');

chatContent.addEventListener('click', hideBtns)

function hideBtns(e) {
    let target = e.target
    if (target.classList.contains('yes')) {
        const deny = target.parentElement.querySelector('.no')
        deny.remove()
        target.innerText = 'Proposta Aceita!'
        chatContent.removeEventListener('click', hideBtns)
    } else if (target.classList.contains('no')) {
        const accept = target.parentElement.querySelector('.yes')
        accept.remove()
        target.innerText = 'Proposta Negada!'
        chatContent.removeEventListener('click', hideBtns)
    }
}