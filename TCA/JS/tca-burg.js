var burguer = document.getElementById('burguer')
burguer.addEventListener('click', mostrarBurg)

function mostrarBurg() {
    var conteudo = document.getElementById('nav')
    conteudo.classList.toggle('ativo')
}