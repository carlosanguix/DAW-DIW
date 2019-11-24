/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

async function migrar(e) {

    let elemento = e;
    let nombre = elemento.tagName;

    elemento.classList.add('estabaEscondido');
    await new Promise(resolve => elemento.addEventListener('transitionend', resolve))

    if (nombre == "PROGRESS") {

        for (let i = 0; i < 100; i++) {

            elemento.value = elemento.value + 1;
            await sleep(10);

        }
    }

    if (parseInt(e.dataset.step) != 17) {
        let paso = parseInt(e.dataset.step) + 1;
        elemento = document.querySelector(`[data-step="${paso}"]`);
        migrar(elemento);
    }
}

function sleep(ms) {
    console.log("sleep")
    return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

function startMigration() {

    let step1 = document.querySelector(`[data-step="1"]`);
    migrar(step1);
}

function init() {
    console.info(" * Init envirnoment ");
    document.querySelector("button").addEventListener("click", startMigration);
}

window.onload = init;