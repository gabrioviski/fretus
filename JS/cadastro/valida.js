var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");

function emailValido() {
    var email = inputEmail.value;

    if (emailRegex.test(email)) {

        messageEmail.textContent = "E-mail válido";
        messageEmail.style.color = "green";
        messageEmail.style.fontSize = "";  
        inputEmail.style.border = "solid 1px green ";  
    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
    }
}