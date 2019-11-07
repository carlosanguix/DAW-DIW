/* 
 
    ^(;,;)^ : Fragmento perdido

*/
//window.onload = init;


let cantidadDivs = 0;

const boton = document.querySelector('button');

const container = document.querySelector('container');

boton.addEventListener('click', function() {
    if (cantidadDivs < 20) {
        crearDiv();
        cantidadDivs++;
    }
});


function crearDiv() {

    let box = document.createElement('box');
    box.setAttribute('data', "-1");

    box.addEventListener('click', function() {
        cambiarEstado(this);
    });

    container.appendChild(box);
}


function cambiarEstado(box) {

    console.log(box);

    let estadoCelda = box.getAttribute('data');
    console.log(estadoCelda)

    switch (estadoCelda) {
        case "-1":
            box.classList = "evoluciona";
            box.setAttribute('data', "0");
            break;
        case "0":
            box.classList = "desevoluciona";
            box.setAttribute('data', "1");
            break;
        case "1":
            box.classList = "ultimate";
            box.setAttribute('data', "2");
            break;
        case "2":
            box.setAttribute('data', "3");
            break;
        case "3":
            box.setAttribute('data', "4");
            break;
        case "4":
            box.setAttribute('data', "5");
            break;
        case "5":

            break;

        default:
            break;
    }
}