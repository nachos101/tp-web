"USE STRICT"

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