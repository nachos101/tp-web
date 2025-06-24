"use strict"
const tabla = document.getElementById("tablaRelojes");
const url = "https://685aefc889952852c2d819af.mockapi.io/api/relojesQuartz/relojes";

document.addEventListener("DOMContentLoaded", mostrarTabla());

async function agregarTabla(event){
    event.preventDefault(event);
    let form = document.getElementById("formulario");
    let formadata = new FormData(form);
    let marca = formadata.get("Marca");
    let modelo = formadata.get("Modelo");
    let disponibilidad = formadata.get("Disponibilidad");
    let precio = formadata.get("Precio");

    let fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>${disponibilidad}</td>
        <td>${precio}</td>
    `;
    tabla.appendChild(fila);

    await fetch("https://685aefc889952852c2d819af.mockapi.io/api/relojesQuartz/relojes", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        'body': JSON.stringify({
            "Marca": marca,
            "Modelo": modelo,
            "Disponibilidad": disponibilidad,
            "Precio": precio
        })
    });
    await mostrarTabla();
}

async function mostrarTabla() {
    tabla.innerHTML = "";
    try{
    let promise = await fetch(url);
    let json = await promise.json();
    let encabezado = document.createElement("tr");
    encabezado.innerHTML = `
        <th>Marca</th>
        <th>Modelo</th>
        <th>Disponibilidad</th>
        <th>Precio</th>
        <th>Comprar</th>
        <th>Editar</th>
        <th>Eliminar</th>
    `;
    tabla.appendChild(encabezado);

    for(let reloj of json){
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reloj.Marca}</td>
            <td>${reloj.Modelo}</td>
            <td>${reloj.Disponibilidad}</td>
            <td>${reloj.Precio}</td>
            <td><button class="comprar">Comprar</button></td>
            <td><button class="editar">Editar</button></td>
            <td><button class="eliminar">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
    }
}catch(error){
    console.error("Error al cargar los datos:", error);
}
}

let btn_agregar = document.getElementById("btn-agregar");
btn_agregar.addEventListener("click", agregarTabla);

async function eliminarFila(event) {
    event.preventDefault(event);
    let id = event.target.dataset.id;
    await fetch(`${url}/${id}`, {
        "method": "DELETE"
    });
}

let btn_eliminar = document.querySelectorAll(".eliminar");
btn_eliminar.forEach(btn => {
    btn.addEventListener("click", eliminarFila);
});