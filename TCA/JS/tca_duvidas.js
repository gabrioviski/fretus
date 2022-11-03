var perguntas = document.getElementsByClassName('perguntas')[0]
var respondido = document.getElementById('respostaP')

var resposta = perguntas.addEventListener('click', event => {
	var alvo = event.target
	responder()
	function responder() {
		document.getElementById('respostaDiv').style = 'display: block;'
		if (alvo.innerText == 'Qual agregado escolher?') {
			respondido.innerText = 'Se está em dúvida de qual agregado escolher, sugiro que vá ao ranking dos agregados e veja aquela que faz mais sentido para você :)'
		} else if (alvo.innerText == 'Como posso efetuar o pagamento?') {
			respondido.innerText = 'Aceitamos todos tipos de pagamentos.'
		} else if (alvo.innerText == 'O que significa as mensangens de erro na entrega?') {
			respondido.innerText = 'Essas mensagens de erro ocorrem quando você insere entregas que não são possiveis de serem realizadas'
		} else if (alvo.innerText == 'Como denunciar o agregado?')
			respondido.innerText = 'Você pode denunciar um agregado, clicando no icone de exclamaçao no menu lateral.'
	}

})