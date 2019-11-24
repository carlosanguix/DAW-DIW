/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function migrar(e) {


    let paso = parseInt(e.target.dataset.step) + 1;
    let elemento = document.querySelector(`[data-step="${paso}"]`);

    let nombre = elemento.localName;

    if (nombre == "progress") {
        console.log(elemento);

        for (let i = 0; i < 100; i++) {

            setTimeout(function() {
                elemento.value = elemento.value + 1;

            }, 10000);

        }
    }

    elemento.addEventListener('transitionend', migrar);

    elemento.classList.add('estabaEscondido');

}





function startMigration() {

    let step1 = document.querySelector(`[data-step="1"]`);

    step1.addEventListener('transitionend', migrar);

    step1.classList.add('estabaEscondido');
}

function init() {
    console.info(" * Init envirnoment ");
    document.querySelector("button").addEventListener("click", startMigration);
}

window.onload = init;