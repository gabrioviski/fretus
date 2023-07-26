const send = document.querySelector('.send')
const chat = document.querySelector('.msgs-content')
const chatContainer = document.querySelector('.chat-msgs')

send.addEventListener('click', sendMsg)

textarea.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        e.preventDefault()
        sendMsg()
    }
})

function sendMsg() {
    let msg = textarea.value
    if (msg != '') {
        chat.innerHTML += `<div class="row my-msg">
                                <div class="user-icon rounded-icon">
                                    <img src="https://files.axshare.com/gsc/NW3CCE/d7/2e/63/d72e6396c33043df9eca85714bda96d5/images/area_do_cliente__desktop_/u195.svg?pageId=a1cd8bfa-51f9-4251-8edd-b9adceed65b6" alt="">
                                </div>
                                <div class="msg">
                                    <p>${msg}</p>
                                </div>
                            </div>`
        textarea.value = ''
        textarea.style = `height: 24px;`
        chatContainer.scrollTop = chatContainer.scrollHeight
    }
}