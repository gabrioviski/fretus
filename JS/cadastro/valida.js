var inputEmail = document.getElementById("inputEmail");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
var messageEmail = document.getElementById("messageEmail");
var messageCpf = document.getElementById("messageCpf");
var cpf =document.getElementById("cpf");
var password = document.getElementById("password");
var messageSenha = document.getElementById("messageSenha");
var criar1 = document.getElementById("criar1");

var nome = document.getElementById("nome");
var messageNome = document.getElementById("messageNome");

function emailValido() {
    var email = inputEmail.value;

    if (emailRegex.test(email)) {

        messageEmail.textContent = "E-mail válido";
        messageEmail.style.color = "green";
        messageEmail.style.fontSize = "";  
        inputEmail.style.border = "solid 1px green ";
        return "valido"
    } else {

        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
        return "invalido"
    }
}

function cpfValido(){

    if (cpf.value.length < 11) {

        messageCpf.textContent = "cpf inválido";
        messageCpf.style.color = "red";
        messageCpf.style.fontSize = "12px";
        cpf.style.border = "1px solid red";
        return "invalido"

    }else{
        messageCpf.textContent = "";
        messageCpf.style.color = "";
        messageCpf.style.fontSize = "";
        cpf.style.border = "solid 1px green";
        return "valido"

    }
}

criar1.addEventListener("click", function senhaValida() {

    if (password.value.length < 1) {

        messageSenha.textContent = "Senha inválida";
        messageSenha.style.color = "red";
        messageSenha.style.fontSize = "12px";
        password.style.border = "1px solid red";

      
    }else{
        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "solid 1px green";

    }

    if(emailValido() === "invalido"){
        messageEmail.textContent = "E-mail inválido";
        messageEmail.style.color = "red";
        messageEmail.style.fontSize = "12px";
        inputEmail.style.border = "1px solid red";
        }

        if(cpfValido() === "invalido"){
            messageCpf.textContent = "cpf inválido";
            messageCpf.style.color = "red";
            messageCpf.style.fontSize = "12px";
            cpf.style.border = "1px solid red";
        }

        if(nomeValido() === "invalido"){
            messageNome.textContent = "nome inválido";
            messageNome.style.color = "red";
            nome.style.border = "1px solid red";
        }
});



function senhaValidada(){

    if(password.value.length > 0){

        messageSenha.textContent = "";
        messageSenha.style.color = "";
        messageSenha.style.fontSize = "";
        password.style.border = "solid 1px green";
        }else{
            password.style.border = "solid 1px red";
        }
}


function Letras(nome) {
    const regex = /^[a-zA-Z]+$/; // Expressão regular que corresponde apenas a letras
    return regex.test(nome);
  }


function nomeValido(){
    var name = nome.value;
    if (Letras(name) && nome.value.length >= 3) {
       
        nome.style.border = "1px solid green";
        messageNome.textContent = "";
        return "valido"

      } else if(nome.value.length <= 3){

        messageNome.textContent = "Nome deve ter pelo menos 3 caracteres ";
        messageNome.style.color = "red";
        messageNome.style.fontSize = "12px";
        nome.style.border = "1px solid red";
        return "invalido"

      }else {
        messageNome.textContent = "nome inválido";
        messageNome.style.color = "red";
        nome.style.border = "1px solid red";
        return "invalido"
      }

  

}

/*
if (nome.value.length < 3) {
        
    messageNome.textContent = "Nome deve ter pelo menos 3 caracteres e conter apenas letras";
    messageNome.style.color = "red";
    messageNome.style.fontSize = "12px";
    nome.style.border = "1px solid red";
}*/