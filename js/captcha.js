"USE STRICT"
//Captcha
function generarCaptcha() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    
    let captcha = num1 + num2; 
    document.getElementById("captcha").innerHTML = captcha; 
}

function verificar(event) {
    event.preventDefault();
    let respuesta = document.getElementById("respuesta").value;
    let captcha = document.getElementById("captcha").innerHTML;

    if (respuesta == captcha){
        document.getElementById("verificacion").innerHTML = "Captcha correcto ✅";
    }
    else {
        document.getElementById("verificacion").innerHTML = "Captcha incorrecto ❌";
        generarCaptcha();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generarCaptcha();

    let boton_enviar = document.getElementById("Enviar");
    boton_enviar.addEventListener("click", verificar);
});
