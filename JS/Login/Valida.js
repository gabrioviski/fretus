var form   = document.getElementById("form");/*.value*/
var senha  = document.getElementById(".input__field");
var entrar = document.getElementById("entrar");

var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");

function emailValido() {
    var email = inputEmail.value;

    if (emailRegex.test(email)) {

        messageEmail.textContent = "E-mail válido";
        messageEmail.style.color = "green";
        messageEmail.style.fontSize = "";  
        inputEmail.style.border = "";  
    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
    }
}



entrar.addEventListener("click", function senhaValida(){

    if(senha[0].value.length < 1){

        messageSenha.textContent = "senha inválido";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "solid 15px red";
    }

});
