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

document.querySelector("header svg").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navbar").classList.toggle("show");
}

const botonModo = document.getElementById('boton_modo');

function cambiarModo() {
    const elementosOscuro = document.querySelectorAll(
        'body,.encabezado, header, footer, .menu,.btn_menu, .navbar, .navbar li, .cuerpo, .contPrincipal, .derecha, .ePayDesign, .ePayDesign p, table, td, tr, .footer, .boton, .formulario, .formulario input, textarea, .lista-marcas, .lista-marcas li, span'
    );

    elementosOscuro.forEach(elemento => {
        elemento.classList.toggle('oscuro');
    });

}

botonModo.addEventListener('click', cambiarModo);