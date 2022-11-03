var items = document.getElementsByClassName('items')
var pages = [`<div id="historico">
<h2>Histórico de Entregas</h2>
<span>Ultima entrega: Realizada à 3 dias, recebeu R$250,00, avaliação de 3.5/5 estrelas</span>
<span>Penultima entrega:  Realizada à 1 semana, recebeu R$200,00, avaliação de 4.5/5 estrelas</span>
<span>Antepenultima entrega:  Realizada à 2 semanas, recebeu R$2000,00, avaliação de 5/5 estrelas</span>
</div>`, `<table> <caption>Ranking dos Agregados</caption> <tbody> <tr> <td class="tabTitu">1° Lugar</td> <td>Agregado 1</td> </tr> <tr> <td class="tabTitu">2° Lugar</td> <td>Agregado 2</td> </tr> <tr> <td class="tabTitu">3° Lugar</td> <td>Agregado 3</td> </tr> <tr> <td class="tabTitu">4° Lugar</td> <td>Agregado 4</td> </tr> <tr> <td class="tabTitu">7° Lugar</td> <td>Você</td> </tr> </tbody> </table>`, `<div id="chat"> <div id="contatos"> <h2>Contatos</h2> <div onclick="clicar2()"> <span>Cliente 1</span> </div> <div onclick="clicar2()"> <span>Cliente 2</span> </div> <div onclick="clicar2()"> <span>Cliente 3</span> </div> </div> <div id="conversa"> <h2>Cliente</h2> <div id="body"> <div class="mens"></div> <div class="mens"></div> <div class="mens"></div> <div class="mens"></div> </div> <form> <input type="text" id="txt" placeholder="Digite a Sua Mensagem"> <button type="button" id="txtEnviar" onclick="clicar2()">Enviar</button> </form> </div> </div>`,
 `<div id="ofertas">
 <h2>Inclusão de Ofertas</h2>
 <form action="">
     <label for="percentual">Quanto percentual de desconto será incluso:</label>
     <input type="text" name="percentual">
     <br>
     <label for="tempo">Por quanto tempo este desconto estará incluso:</label>
     <select name="tempo">
         <option value="ads">Algumas Horas</option>
         <option value="">1 dia</option>
         <option value="">1 semana</option>
         <option value="">1 mês</option>
         <option value="">Para sempre</option>
     </select>
     <br>
     <p id="erro" style="text-align: center; visibility: hidden; color: black;">adas</p>
     <button type="button" onclick="desc()">Incluir desconto</button>
 </form>
 </div>
 <div id="modal" style="display: none;"> 
     <h3 id="mens"></h3>
 </div>`, `<div id="grana">
<h2>Dinheiro Recebido</h2>
<ul>
    <li>Você recebeu nessa semana R$250,00.</li>
    <li>Em 2 semanas, você recebeu R$450,00.</li>
    <li>Neste mês, você recebeu R$2450,00.</li>
    <li>Desde sua primeira entrega, você já recebeu um total de R$5000,00.</li>
</ul>
</div>`,
  `<div id="denuncias"> <h2>Denúncias</h2> <label for="nome">Insira o Nome do Agregado: </label> <input type="text" name="nome" id="txt"> <br> <label for="motivo">Insira o Motivo da Denúncia:</label> <select name="motivo" id=""> <option value="">Golpe</option> <option value="">Abuso</option> <option value="">Péssimo atendimento</option> <option value="">Veiculo diferente do descrito no perfil</option> <option value="">Violar regras do site</option> </select> <br> <input onclick="enviarDen()" type="button" value="Enviar" id="prim"> </div> <div id="modal"> <h3>Denuncia Enviada</h3></div>`]

for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', event => {
        var alvo = event.target
        clicar()
        
        function clicar() {
            for (i = 0; i < items.length; i++) {
                if (items[i] == alvo) {
                    var atual = document.getElementById('ranking') 
                    atual.innerHTML = pages[i]
                }
            }
        }
    })
    
}

function clicar2() {
    var atual = document.getElementById('ranking')
    
    if (atual.innerHTML == pages[2]) {
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


function enviarDen() {
    var modal = document.getElementById('modal')
    console.log(modal)
    modal.style.display = 'flex'
    setTimeout(function(){
        modal.style.display = 'none'
    }, 1500)
}

function desc() {
    var modal = document.getElementById('modal')
    var erro = document.getElementById('erro')
    var per = document.getElementsByName('percentual')[0].value
    if (per == '') {
        erro.style.visibility = 'visible'
        erro.innerText = 'Informe o percentual de desconto que será incluso!'
    } else {
        var sel = document.getElementsByName('tempo')[0]
        var tempo = sel.options[sel.selectedIndex].text
        document.getElementById('mens').innerText = `O desconto de ${per}% ficará ativo por ${tempo.toLowerCase()}`
        erro.style.visibility = 'hidden'
        modal.style.display = 'flex'
        setTimeout(function(){
            modal.style.display = 'none'
        }, 2000)
    }
}