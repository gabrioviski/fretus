var form   = document.getElementById("form");/*.value*/
var email  = document.getElementById("inputEmail");
var senha  = document.getElementById("password").value
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var entrar = document.getElementById("entrar");

function emailValido(){

    if (emailRegex.test(email)) {

        messageEmail.textContent = "E-mail válido";
        messageEmail.style.color = "green";
        console.log("valido")

    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "solid 1px red";
    }
}


entrar.addEventListener("click", function senhaValida(){

    if(senha[0].value.length < 1){

        messageSenha.textContent = "senha inválido";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "solid 1px red";
    }

});
