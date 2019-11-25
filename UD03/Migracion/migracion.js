/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

// Función en la que recursivamente se desarrolla todo, recibiendo como parámetro el elemento
async function migrar(e) {

    let cantidadDataSteps = document.querySelectorAll('[data-step]');
    contador++;

    let elemento = e;
    let nombre = elemento.tagName;

    // Le asignamos la clase que lo hace aparecer
    elemento.classList.add('estabaEscondido');

    await new Promise(resolve => elemento.addEventListener('transitionend', resolve))

    // Si el elemento en el que nos encontramos es "progress" incrementamos el value cada 10ms
    // Para que no se haga todo de golpe y podamos visualizar el progreso, debemos parar ese proceso por cada iteración
    if (nombre == "PROGRESS") {

        for (let i = 0; i < 100; i++) {

            elemento.value = elemento.value + 1;
            // Llamamos a la función que contiene la promesa con la que podemos esperarnos esa cantidad de tiempo
            await sleep(10);

        }
    }

    // Nos valdría para una cantidad desconocida de dataSteps
    if (contador < cantidadDataSteps.length) {
        let paso = parseInt(e.dataset.step) + 1;
        elemento = document.querySelector(`[data-step="${paso}"]`);

        migrar(elemento);
    }
}

// Ejemplo cedido por rubén (ni idea de lo que hace)
function sleep(ms) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

// Función con la que llamamos a la función migrar pasándole como parámtro el primer paso como elemento
function startMigration() {

    let step1 = document.querySelector(`[data-step="1"]`);
    migrar(step1);
}

function init() {

    console.info(" * Init envirnoment ");
    document.querySelector("button").addEventListener("click", startMigration);
}

window.onload = init;
/* Esto aquí no recoge la cantidad de dataSteps (¿Por qué?)
    let cantidadDataSteps = document.querySelectorAll('[data-step]');
*/
let contador = 0;