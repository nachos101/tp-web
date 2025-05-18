"USE STRICT"
//Captcha
function generarCaptcha() {
    let num1 = Math.floor(Math.random() * 100);
    let num2 = Math.floor(Math.random() * 100);
    
    let captcha = num1 + num2; // Asigna el valor al campo de entrada
    document.getElementById("captcha").innerHTML = captcha; // Muestra el captcha en el elemento HTML
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

//Menu Plegable
document.querySelector("header svg").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navbar").classList.toggle("show");
}