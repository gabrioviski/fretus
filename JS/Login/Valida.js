var form   = document.getElementById("form");/*.value*/
var email  = document.getElementById(".inputs");
var senha  = document.getElementById(".input_field");
var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

function emailValido(){

    if( emailRegex.test(campos1[1].value)){
        alert('valido')
    }else{
        alert("invalido")
    }
}

