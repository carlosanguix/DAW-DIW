let peliculas = ["el grinch", "titanic", "lo que el viento se llevo"];
let extremidadesNombre = ["cabeza", "cuerpo", "brazoIzq", "brazoDer", "manoizq", "manoDer", "piernaIzq", "piernaDer", "pieizq", "pieDer"];
let cantidadErrores = 0;
let pelicula = "";
let letrasUsadas = [];
let puntos = 0;

window.onload = init;


function init() {

    let ultLetr = document.getElementById("letra");
    let div = document.createElement('div');
    div.classList.add('ultLetr');
    div.id = "ultLetr";
    ultLetr.appendChild(div);

    limpiarPapaNoel();
    coleccionarTeclado();
    funcionalidadTeclasPantalla();
    elegirPelicula();


}

function limpiarPapaNoel() {
    let extremidades = document.querySelectorAll('.extremidad');
    extremidades.forEach(extremidad => {
        extremidad.style.visibility = "hidden";
    });
}

function funcionalidadTeclasPantalla() {
    let teclas = document.querySelectorAll('.tecla');
    teclas.forEach(tecla => {
        tecla.addEventListener('click', function() {

            let ultimaLetraUsada = document.querySelector('#letra');
            let letrasUtilizadas = document.querySelector('#letrasUsadas');

            let letra = this.innerText.toLowerCase();

            let punt = document.getElementById('score');

            if (pelicula.includes(letra)) {
                let titulo = document.querySelector('#titulo');
                let cajitas = document.querySelector('.cajita').children;
                puntos += 500;
                for (let i = 0; i < pelicula.length; i++) {
                    if (letra == pelicula.charAt(i)) {
                        cajitas[i].innerText = letra;
                        console.log(punt)
                        punt.firstChild.innerText = puntos;
                    }
                }

            } else {
                let ext = extremidadesNombre[cantidadErrores];
                extremidad2 = document.getElementById(ext);
                extremidad2.style.visibility = "visible";
                cantidadErrores++;
            }

            if (!letrasUsadas.includes(letra)) {
                let a = document.createElement('div');
                a.classList.add('letrUsa');
                a.innerText = letra;
                letrasUtilizadas.appendChild(a);

                // ultimaLetraUsada.innerText = "Última letra usada: ";
                // ultimaLetraUsada.innerText += letra;
            }

            let a = document.getElementById('ultLetr');
            a.innerText = letra;
            letrasUsadas.push(letra);
        });
    });
}

function ponerLetraEnTitulo(titulo, letra) {

    let divsLetras = titulo.querySelectorAll('.letra');


}

function pintarLetraLetrasUsadas(tecla) {

    // 

}

function coleccionarTeclado() {
    var teclado = document.getElementById("teclado");
    for (let teclaActual = 65; teclaActual <= 90; teclaActual++) {
        tecla = document.createElement("button");
        tecla.innerText = String.fromCharCode(teclaActual);
        tecla.classList.add("tecla");
        teclado.appendChild(tecla);
    }
}

function elegirPelicula() {

    let rnd = Math.floor(Math.random() * peliculas.length);
    pelicula = peliculas[rnd];

    let cajaTitulo = document.querySelector('#titulo');
    let cajita = document.createElement('div');
    cajita.classList.add('cajita');
    cajaTitulo.innerText += "\n";


    for (let i = 0; i < pelicula.length; i++) {
        let cuadrado = document.createElement('div');
        if (pelicula.charAt(i) == " ") {
            cuadrado.classList.add('letra');
            cuadrado.classList.add('espacio');
        } else {
            cuadrado.classList.add('letra');
        }
        cajita.appendChild(cuadrado);

    }

    cajaTitulo.appendChild(cajita);


}