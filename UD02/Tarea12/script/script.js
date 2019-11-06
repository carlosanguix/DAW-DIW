/* 
 
    ^(;,;)^ : Fragmento perdido

*/
import Celda from "./celda.js";
import Tablero from "./tablero.js";
//window.onload = init;

let tablero = new Tablero();
console.log(tablero);

let cantidadDivs = 0;

const boton = document.querySelector('button');

const container = document.querySelector('container');

boton.addEventListener('click', function() {
    if (cantidadDivs < 20) {
        let fila = parseInt(cantidadDivs / 5, 10);
        let columna = cantidadDivs % 5;
        console.log(fila + ", " + columna);
        crearDiv(fila, columna);
        cantidadDivs++;
    }
});



function crearDiv(fila, columna) {

    let box = document.createElement('box');
    let id = String(fila + "" + columna);
    box.setAttribute('id', id);
    box.addEventListener('click', function() {
        cambiarEstado();
    });
    container.appendChild(box);
}

function cambiarEstado() {

}