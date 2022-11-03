var imag = document.getElementById('img')
var img = document.querySelectorAll('#img img')
var index = 0

function meuCarrosel() {
    index++
    if (index > img.length - 1) {
        index = 0
    }
    
    var largura = document.querySelector('#img img').offsetWidth
    imag.style.transform = `translateX(${-index * (largura + 50)}px)`

    var media = window.matchMedia('(max-width: 850px)')
    if (media.matches) {
        imag.style.transform = `translateX(${-index * largura}px)`
    }
}

setInterval(meuCarrosel, 4000)