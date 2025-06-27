"use strict"
const cuerpoTabla = document.getElementById("cuerpoTabla");
const url = "https://685aefc889952852c2d819af.mockapi.io/api/relojesQuartz/relojes";
const btnAgregar = document.getElementById("btn-agregar");
const btnEditar = document.getElementById("btn-editar");
const form = document.getElementById("formularioRelojes");

document.addEventListener("DOMContentLoaded", async () => {
    await mostrarTabla();
    asignarEventosEliminar();
});

async function agregarTabla(event) {
    event.preventDefault();
    let formadata = new FormData(form);
    let marca = formadata.get("Marca");
    let modelo = formadata.get("Modelo");
    let disponibilidad = formadata.get("Disponibilidad");
    let precio = formadata.get("Precio");

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Marca: marca,
            Modelo: modelo,
            Disponibilidad: disponibilidad,
            Precio: precio
        })
    });

    await mostrarTabla();
}

async function mostrarTabla() {
    cuerpoTabla.innerHTML = "";
    try {
        let response = await fetch(url);
        let relojes = await response.json();

        for (let reloj of relojes) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${reloj.Marca}</td>
                <td>${reloj.Modelo}</td>
                <td>${reloj.Disponibilidad}</td>
                <td>${reloj.Precio}</td>
                <td><a class="comprar" href="Compra.html">Comprar</a></td>
                <td><button class="editar" data-id="${reloj.id}">Editar</button></td>
                <td><button class="eliminar" data-id="${reloj.id}">Eliminar</button></td>
            `;
            cuerpoTabla.appendChild(fila);
        }

        asignarEventosEliminar();
        asignarEventosEditar();

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

let btn_agregar = document.getElementById("btn-agregar");
btn_agregar.addEventListener("click", agregarTabla);

async function eliminarReloj(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE"
        });
        await mostrarTabla();
    } catch (error) {
        console.error("Error al eliminar el reloj:", error);
    }
}

function asignarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            eliminarReloj(id);
        });
    });
}

function mostrarBotonEditar(mostrar) {
    if(mostrar){
        btnAgregar.classList.add("ocultar");
        btnAgregar.classList.remove("mostrar");
        btnEditar.classList.remove("ocultar");
        btnEditar.classList.add("mostrar");
    } else {
        btnAgregar.classList.remove("ocultar");
        btnAgregar.classList.add("mostrar");
        btnEditar.classList.add("ocultar");
        btnEditar.classList.remove("mostrar");
    }
}

function asignarEventosEditar() {
    const botonesEditar = document.querySelectorAll(".editar");

    botonesEditar.forEach(boton => {
        boton.addEventListener("click", () => {
            const fila = boton.closest("tr");
            const celdas = fila.querySelectorAll("td");

            document.getElementById("marca").value = celdas[0].textContent;
            document.getElementById("modelo").value = celdas[1].textContent;
            document.getElementById("disponibilidad").value = celdas[2].textContent;
            document.getElementById("precio").value = celdas[3].textContent;

            form.setAttribute("data-id-editar", boton.dataset.id);
            mostrarBotonEditar(true);
        });
    });
}


btnEditar.addEventListener("click", async () => {
    const id = form.getAttribute("data-id-editar");

    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const disponibilidad = document.getElementById("disponibilidad").value;
    const precio = document.getElementById("precio").value;

    await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Marca: marca,
            Modelo: modelo,
            Disponibilidad: disponibilidad,
            Precio: precio
        })
    });

    form.reset();
    form.removeAttribute("data-id-editar");
    mostrarBotonEditar(false);
    await mostrarTabla();
});