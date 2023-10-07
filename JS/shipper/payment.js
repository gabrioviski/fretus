const pay = document.querySelector('.pay')
const payModal = document.querySelector('.pay-modal')
const yes = document.querySelector('.modal-content .yes')
const no = document.querySelector('.modal-content .no')
const input = document.querySelector('.modal-content input')

pay.addEventListener('click', () => {
    payModal.showModal()
})

yes.addEventListener('click', () => {
    const f = new Intl.NumberFormat('pt-br', {
        currency: 'BRL',
        style: 'currency'
    })
    let price = input.value
    if (price != '') {
        payModal.close()
        chat.innerHTML += `<div class="row my-msg">
                                        <div class="user-icon rounded-icon">
                                            <img src="https://files.axshare.com/gsc/NW3CCE/d7/2e/63/d72e6396c33043df9eca85714bda96d5/images/area_do_cliente__desktop_/u195.svg?pageId=a1cd8bfa-51f9-4251-8edd-b9adceed65b6" alt="">
                                        </div>
                                        <div class="msg payment">
                                            <h1>Você enviou uma proposta!</h1>
                                            <span>${f.format(price)}</span>
                                            <div class="btn-container">
                                                <button class="no" onclick="console.log(this.parentElement.parentElement.parentElement.remove())">Cancelar proposta</button>
                                            </div>
                                        </div>
                                    </div>`
        chatContainer.scrollTop = chatContainer.scrollHeight
        input.value = ''
    }
})

no.addEventListener('click', () => {
    payModal.close()
})