var password = document.getElementById("password");
var messageSenha = document.getElementById("messageSenha");
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

entrar.addEventListener("click", function senhaValida() {

    if (password.value.length < 1) {

        messageSenha.textContent = "Senha inválida";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "1px solid red";

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
    }else{
        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "1px solid black";

    }
});

function senhaValidada(){

    if(password.value.length > 0){

    messageSenha.textContent = "";
    messageSenha.style.color = "";
    messageSenha.style.fontSize = "";
    password.style.border = "1px solid black";
    }
}