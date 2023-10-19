var password = document.getElementById("password");
var messageSenha = document.getElementById("messageSenha");
var entrar = document.getElementById("entrar");
var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");

messageEmail.style.marginLeft = "12px"; 
messageSenha.style.marginLeft = "12px"; 

function emailValido() {
    var email = inputEmail.value;

    if (emailRegex.test(email)) {

        messageEmail.textContent = "";
        messageEmail.style.color = "";
        messageEmail.style.fontSize = "";  
        inputEmail.style.border = ""; 
        return "valido"

    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
        return "invalido"
    }
}

entrar.addEventListener("click", function senhaValida() {

    if (password.value.length < 8) {

        messageSenha.textContent = "Senha inválida";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "1px solid red";

    }else{
        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "";

    }

if(emailValido() === "invalido"){
    messageEmail.textContent = "E-mail inválido";
    messageEmail.style.color = "red";
    messageEmail.style.fontSize = "12px";
    inputEmail.style.border = "1px solid red";
}

});

function senhaValidada(){

    if(password.value.length >= 8){

    messageSenha.textContent = "";
    messageSenha.style.color = "";
    messageSenha.style.fontSize = "";
    password.style.border = "";
    }
}