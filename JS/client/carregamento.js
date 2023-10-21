
const continueButton = document.getElementById('continue-button');
const loaderContainer = document.getElementById('loader-container');

continueButton.addEventListener('click', () => {
    // Ocultar o popup
    document.querySelector('.popup').style.display = 'none';

    // Mostrar a tela de carregamento
    loaderContainer.style.display = 'flex';

    // Simula um tempo de carregamento (10 segundos neste caso)
    setTimeout(() => {
        // Redireciona para outra página após o carregamento
        window.location.href = './escolher-entregador.html'; // Substitua pelo URL desejado
    }, 10000);
});