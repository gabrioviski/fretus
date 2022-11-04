var items = document.getElementsByClassName('items')
var pages = [`<div id="solicitar"> <h2>Selecione o Tipo de Entrega</h2> <label for="select">Tamanho da Carga:</label> <select name="select" class="slc"> <option value="">Pequena</option> <option value="">Média</option> <option value="">Grande</option> </select> <label for="select2">Peso: </label> <select name="select2" class="slc"> <option value="">Leve</option> <option value="">Peso Médio</option> <option value="">Pesado</option> <option value="">Bastante Pesado</option> </select> <label for="select3">Quantidade:</label> <select name="select3" class="slc"> <option value="">Pequena Quantidade (1 à 5)</option> <option value="">Quantidade Média (5 à 10)</option> <option value="">Grande Quantidade (10 ou superior)</option> </select> <label for="select4">Tipo de transporte:</label> <select id="select4" class="slc"> <option value="">Moto</option> <option value="">Van</option> <option value="">Carro</option> <option value="">Caminhão</option> </select> <div id="erro"><p id="txtErro"></p></div> <br> <div class="botoes"> <button id="prim" onclick="clicar2()">Enviar</button> <button onclick="pular()" style="margin-left: 0;">Pular</button> </div> </div>`, `<div id="favoritos"> <div id="favoritados"> <h2 class="txtFav">[VAZIO]</h2> <p class="txtFav">Você ainda não favoritou nenhum entregador</p> </div> </div>`, ` <table> <caption>Ranking dos Entregadores</caption> <tbody> <tr> <td class="tabTitu">1° Lugar</td> <td>Entregador 1</td> </tr> <tr> <td class="tabTitu">2° Lugar</td> <td>Entregador 2</td> </tr> <tr> <td class="tabTitu">3° Lugar</td> <td>Entregador 3</td> </tr> <tr> <td class="tabTitu">4° Lugar</td> <td>Entregador 4</td> </tr> <tr> <td class="tabTitu">5° Lugar</td> <td>Entregador 5</td> </tr> </tbody> </table>`, `<div id="chat"> <div id="contatos"> <h2>Contatos</h2> <div onclick="clicar2()"> <span>Motorista 1</span> </div> <div onclick="clicar2()"> <span>Motorista 2</span> </div> <div onclick="clicar2()"> <span>Motorista 3</span> </div> </div> <div id="conversa"> <h2 id="conTit" style="margin-right: 10px">Motorista</h2> <div id="body"> <div class="mens"></div> <div class="mens"></div> <div class="mens"></div> <div class="mens"></div> </div> <form> <input type="text" id="txt" placeholder="Digite a Sua Mensagem"> <button type="button" id="txtEnviar" onclick="clicar2()">Enviar</button> </form> </div> </div>`, `<div id="denuncias"> <h2>Denúncias</h2> <label for="nome">Insira o Nome do Entregador: </label> <input type="text" name="nome" id="txt"> <br> <label for="motivo">Insira o Motivo da Denúncia:</label> <select name="motivo" id=""> <option value="">Golpe</option> <option value="">Abuso</option> <option value="">Péssimo atendimento</option> <option value="">Veiculo diferente do descrito no perfil</option> <option value="">Violar regras do site</option> </select> <br> <input onclick="enviarDen()" type="button" value="Enviar" id="prim"> </div> <div id="modal"> <h3>Denuncia Enviada</h3></div>`]
var pages2 = [`<div id="solicitar2">
<div class="head">
    <img id="voltar" src="../img/fechar.svg" onclick="voltar()">
    <h2>Entregadores Encontrados</h2>
</div>
        <div class="titulo">
            <img class="mot" src="../img/caminhao-cinza.svg" alt="Motorista 1">
            <p class="desc"></p>
        </div>
        
        <div class="titulo">
            <img class="mot" src="../img/caminhao-cinza.svg" alt="Motorista 2">
            <p class="desc"></p>
        </div>
        
        <div class="titulo">
            <img class="mot" src="../img/caminhao-cinza.svg" alt="Motorista 3">
            <p class="desc"></p>
        </div>
        <div id="modal" style="display: none; top:35%; left: 40%; max-width: 250px; max-height: 150px; font-size: 20px; padding: 15px;"> 
     <h3 id="mens">Você atingiu o máximo de entregadores favoritados!</h3>
 </div>
        
`]
var favTxt = []

var tipoVei = [`Moto`, `Van`, `Carro`, `Caminhão`]
var txtSol = [`Avaliação: 5/5 estrelas<br>Tempo de Entrega: 1 dia<br>Histórico de Transportação: Última entrega feita a três dias, com avaliação de 5/5 estrelas`, `Avaliação: 3.5/5 estrelas<br>Tempo de Entrega: 5 dias<br>Histórico de Transportação: Última entrega feita a uma semana com avaliação de 4/5 estrelas`, `Avaliação: 4.5/5 Estrelas<br>Tempo de Entregas: 3 dia<br>Histórico de Transportação: Última entrega feita a três dias, com avaliação de 4.5/5 estrelas.`]
var fav = []
var favUnicos = []

for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', event => {
        var alvo = event.target
        clicar()
        
        function clicar() {
            for (i = 0; i < items.length; i++) {
                if (items[i] == alvo) {
                    var atual = document.getElementById('ranking') 
                    atual.innerHTML = pages[i]
                    if (atual.innerHTML == pages[1]) {
                        var del = document.getElementById('favoritados')
                        for (var c = 0; c < favUnicos.length; c++) {
                            del.style.display = 'none'
                                var novo = document.createElement('div')
                                novo.setAttribute('id', 'favoritados')
                                novo.innerHTML = favUnicos[c] + '<br> <img style="margin-right: 0;" onclick="conversar()" src="../img/chat.svg" class="imgChat">'
                                document.getElementById('favoritos').appendChild(novo)
                        }
                    }
                }
            }
        }
    })
    
}

function clicar2() {
    var atual = document.getElementById('ranking')
    
    if (atual.innerHTML == pages[0] || atual.innerHTML == pages2[1]) {
        var erro = document.getElementById('txtErro')
        var select = document.getElementsByClassName('slc')

        var tam = select[0].options.selectedIndex
        var peso = select[1].options.selectedIndex
        var quant = select[2].options.selectedIndex
        var vei = select[3].options.selectedIndex
        document.getElementsByClassName('gam')[0].innerText = vei
        
        function solicitar() {
            var vei = document.getElementsByClassName('gam')[0].innerText
            for (var i = 0; i <= 3; i++) {
                if (vei == i) {
                    vei = tipoVei[i]
                }
            }
            
            atual.innerHTML = pages2[0]
            var img = document.getElementsByClassName('mot')
            var p = document.getElementsByClassName('desc')
            for (i = 0; i < img.length; i++) {
                img[i].addEventListener('click', event => {
                    for (var i = 0; i < 3; i++) {
                        p[i].innerHTML = `<strong>MOTORISTA ${i+1}</strong><br>Tipo de automovel: ${vei}<br>`
                        p[i].innerHTML += txtSol[i] + `<br> <svg onclick="favoritar()" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="42px" height="40px">
                        <g transform="matrix(1 0 0 1 -62 -783 )">
                          <path class="imag" d="M 40.58653846153846 14.34152488972905  C 41.52884615384615 14.492753623188408  42 14.879227053140095  42 15.500945179584122  C 42 15.870615416929216  41.78125 16.2738920394875  41.34375 16.710775047258977  L 32.18149038461539 25.63327032136106  L 34.35216346153846 38.235664776307495  C 34.36899038461539 38.35328712455367  34.37740384615385 38.52131905061961  34.37740384615385 38.73976055450535  C 34.37740384615385 39.092627599243855  34.2890625 39.39088426801092  34.11237980769231 39.63453056080655  C 33.93569711538461 39.878176853602184  33.67908653846154 40  33.34254807692307 40  C 33.02283653846154 40  32.68629807692307 39.89918084436043  32.33293269230769 39.69754253308129  L 21 33.74921235034657  L 9.667067307692307 39.69754253308129  C 9.296875 39.89918084436043  8.960336538461538 40  8.657451923076923 40  C 8.304086538461538 40  8.0390625 39.878176853602184  7.8623798076923075 39.63453056080655  C 7.685697115384616 39.39088426801092  7.597355769230769 39.092627599243855  7.597355769230769 38.73976055450535  C 7.597355769230769 38.63894139886578  7.614182692307693 38.47090947279983  7.647836538461538 38.235664776307495  L 9.818509615384615 25.63327032136106  L 0.6310096153846154 16.710775047258977  C 0.21033653846153844 16.257088846880908  0 15.853812224322624  0 15.500945179584122  C 0 14.879227053140095  0.4711538461538461 14.492753623188408  1.4134615384615383 14.34152488972905  L 14.084134615384615 12.501575299306866  L 19.763221153846153 1.033396345305606  C 20.082932692307693 0.34446544843520055  20.495192307692307 0  21 0  C 21.50480769230769 0  21.917067307692307 0.34446544843520055  22.236778846153847 1.033396345305606  L 27.915865384615387 12.501575299306866  L 40.58653846153846 14.34152488972905  Z " fill-rule="nonzero" fill="#FFFFFF" stroke="none" transform="matrix(1 0 0 1 62 783 )"/>
                        </g>
                      </svg> <img class="imagChat" onclick="conversar()" src="../img/chat.svg">`
                    }
                    
                    var alvo = event.target
                    for (i = 0; i < 3; i++) {
                        if (alvo == img[i]) {
                            if (p[i].style.display == 'block') {
                                p[i].style = 'display: none;'
                                document.getElementsByClassName('titulo')[i].style = ''
                            } else {
                                p[i].style = 'display: block;'
                                document.getElementsByClassName('titulo')[i].style = 'background-color: rgba(224, 110, 11, 0.95); width: 100%; border: 2px #242424 solid;'
                            }
                        }
                    }
                })
            }
        }
        
        if (tam != 0 && vei == 0) {
            erro.innerText = 'ERRO! o veiculo selecionado não suporta esse tipo de carga.'
        } else if (vei == 0 && peso != 0 || vei == 2 && peso == 3) {
            erro.innerText = 'ERRO! o veiculo selecionado não suporta este peso.' 
        } else if (quant != 0 && vei == 0 || quant == 2 && vei == 2){
            erro.innerText = 'ERRO! o veiculo selecionado não suporta esta quantidade.'
        } else {
            solicitar()
        }
        pages2[1] = atual.innerHTML
        
    } else if (atual.innerHTML == pages[3]) {
        document.getElementById('conversa').style = 'display: block;'
        var mens = document.getElementsByClassName('mens')
        var c = 0
        document.getElementById('txtEnviar').addEventListener('click', function() {
            var txt = document.getElementById('txt').value
            
            if (c == 0) {
                mens[0].innerText = txt
                mens[0].style = "visibility: visible;"
                c++
            } else if (c == 1) {
                mens[1].innerText = txt
                mens[1].style = "visibility: visible;"
                c++
            } else if (c == 2) {
                mens[2].innerText = txt
                mens[2].style = "visibility: visible;"
                c++
            } else if (c == 3) {
                mens[3].innerText = txt
                mens[3].style = "visibility: visible;"
                c++
            }
            
        })
    }
}

function pular() {
    document.getElementById('ranking').innerHTML = pages2[0]
    var img = document.getElementsByClassName('mot')
            var p = document.getElementsByClassName('desc')
            for (i = 0; i < img.length; i++) {
                img[i].addEventListener('click', event => {
                    for (var i = 0; i < 3; i++) {
                        p[i].innerHTML = `<strong>MOTORISTA ${i+1}</strong><br>Tipo de automovel: ${tipoVei[i]}<br>`
                        p[i].innerHTML += txtSol[i] + `<br> <svg onclick="favoritar()" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="42px" height="40px">
                        <g transform="matrix(1 0 0 1 -62 -783 )">
                          <path class="imag" d="M 40.58653846153846 14.34152488972905  C 41.52884615384615 14.492753623188408  42 14.879227053140095  42 15.500945179584122  C 42 15.870615416929216  41.78125 16.2738920394875  41.34375 16.710775047258977  L 32.18149038461539 25.63327032136106  L 34.35216346153846 38.235664776307495  C 34.36899038461539 38.35328712455367  34.37740384615385 38.52131905061961  34.37740384615385 38.73976055450535  C 34.37740384615385 39.092627599243855  34.2890625 39.39088426801092  34.11237980769231 39.63453056080655  C 33.93569711538461 39.878176853602184  33.67908653846154 40  33.34254807692307 40  C 33.02283653846154 40  32.68629807692307 39.89918084436043  32.33293269230769 39.69754253308129  L 21 33.74921235034657  L 9.667067307692307 39.69754253308129  C 9.296875 39.89918084436043  8.960336538461538 40  8.657451923076923 40  C 8.304086538461538 40  8.0390625 39.878176853602184  7.8623798076923075 39.63453056080655  C 7.685697115384616 39.39088426801092  7.597355769230769 39.092627599243855  7.597355769230769 38.73976055450535  C 7.597355769230769 38.63894139886578  7.614182692307693 38.47090947279983  7.647836538461538 38.235664776307495  L 9.818509615384615 25.63327032136106  L 0.6310096153846154 16.710775047258977  C 0.21033653846153844 16.257088846880908  0 15.853812224322624  0 15.500945179584122  C 0 14.879227053140095  0.4711538461538461 14.492753623188408  1.4134615384615383 14.34152488972905  L 14.084134615384615 12.501575299306866  L 19.763221153846153 1.033396345305606  C 20.082932692307693 0.34446544843520055  20.495192307692307 0  21 0  C 21.50480769230769 0  21.917067307692307 0.34446544843520055  22.236778846153847 1.033396345305606  L 27.915865384615387 12.501575299306866  L 40.58653846153846 14.34152488972905  Z " fill-rule="nonzero" fill="#FFFFFF" stroke="none" transform="matrix(1 0 0 1 62 783 )"/>
                        </g> <img class="imagChat" onclick="conversar()" src="../img/chat.svg">`
                    }
                    
                    var alvo = event.target
                    for (i = 0; i < 3; i++) {
                        if (alvo == img[i]) {
                            if (p[i].style.display == 'block') {
                                p[i].style = 'display: none;'
                                document.getElementsByClassName('titulo')[i].style = ''
                            } else {
                                p[i].style = 'display: block;'
                                document.getElementsByClassName('titulo')[i].style = 'background-color: #E06E0B; width: 100%;  border: 2px #242424 solid;'
                            }
                        }
                    }
                })
            }
}

function voltar() {
    var atual = document.getElementById('ranking')
    atual.innerHTML = pages[0]
}

function favoritar() {
    var img = document.querySelectorAll('.imag')
    var pFav = document.getElementsByClassName('desc')
    for (var c = 0; c < pFav.length; c++) {
        pFav[c].addEventListener('click', event => {
            var alvo = event.target
            for (var i = 0; i < pFav.length; i++) {
                if (alvo == img[i]) {
                    if (favUnicos.length > 2) {
                        document.getElementById('modal').style.display = 'flex'
                        setTimeout(function() {
                            document.getElementById('modal').style.display = 'none'
                        }, 1000)
                    } else {
                        img[i].style.fill = '#f8b83f'
                        fav.push(pFav[i].innerHTML)
                        favUnicos = [...new Set(fav)]
                    }
                }
            }
        })
    }
}

function enviarDen() {
    var modal = document.getElementById('modal')
    modal.style.display = 'flex'
    setTimeout(function(){
        modal.style.display = 'none'
    }, 1500)
}

function conversar() {
    document.getElementById('ranking').innerHTML = pages[3]
    document.getElementById('contatos').style.display = 'none'
    document.getElementById('conversa').style.display = 'block'
    var mens = document.getElementsByClassName('mens')
        var c = 0
        document.getElementById('txtEnviar').addEventListener('click', function() {
            var txt = document.getElementById('txt').value
            
            if (c == 0) {
                mens[0].innerText = txt
                mens[0].style = "visibility: visible;"
                c++
            } else if (c == 1) {
                mens[1].innerText = txt
                mens[1].style = "visibility: visible;"
                c++
            } else if (c == 2) {
                mens[2].innerText = txt
                mens[2].style = "visibility: visible;"
                c++
            } else if (c == 3) {
                mens[3].innerText = txt
                mens[3].style = "visibility: visible;"
                c++
            }
            
        })
}
