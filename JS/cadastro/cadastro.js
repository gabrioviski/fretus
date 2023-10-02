var container = document.querySelector('.signup-container');
var btnColor = document.querySelector('.btnColor');

document.querySelector('#btnCliente').addEventListener('click', () => {
  container.scrollLeft = 0;
  btnColor.style.left = "0px";
  document.querySelector('#btnEntregador').style.color = '#333'
  document.querySelector('#btnCliente').style.color = 'white'
});

document.querySelector('#btnEntregador').addEventListener('click', () => {
  container.scrollLeft = (container.clientWidth) + 15;
  btnColor.style.left = "50%";
  document.querySelector('#btnEntregador').style.color = 'white'
  document.querySelector('#btnCliente').style.color = '#333'
});

const input = document.querySelector('#mascara');

input.addEventListener('keypress', () => {
    let inputLength = input.value.length

    if (inputLength == 3 || inputLength == 7) {
        input.value += '.'
    } else if (inputLength == 11) {
        input.value += '-'
    }
})