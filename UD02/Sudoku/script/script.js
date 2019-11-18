const tableroCompleto1 = [
    [9, 6, 3, 1, 7, 4, 2, 5, 8],
    [1, 7, 8, 3, 2, 5, 6, 4, 9],
    [2, 5, 4, 6, 8, 9, 7, 3, 1],
    [8, 2, 1, 4, 3, 7, 5, 9, 6],
    [4, 9, 6, 8, 5, 2, 3, 1, 7],
    [7, 3, 5, 9, 6, 1, 8, 2, 4],
    [5, 8, 9, 7, 1, 3, 4, 6, 2],
    [3, 1, 7, 2, 4, 6, 9, 8, 5],
    [6, 4, 2, 5, 9, 8, 1, 7, 3]
];

let tableroSR1 = [
    [0, 6, 0, 1, 0, 4, 0, 5, 0],
    [0, 0, 8, 3, 0, 5, 6, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 1],
    [8, 0, 0, 4, 0, 7, 0, 0, 6],
    [0, 0, 6, 0, 0, 0, 3, 0, 0],
    [7, 0, 0, 9, 0, 1, 0, 0, 4],
    [5, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 7, 2, 0, 6, 9, 0, 0],
    [0, 4, 0, 5, 0, 8, 0, 7, 0]
];


function init() {

    pintarTableroSinResolver();
    funcionalidadBoton();
}

function funcionalidadBoton() {
    let botonResolver = document.querySelector('button');
    botonResolver.style.visibility = "hidden";
    botonResolver.addEventListener('click', comprobarSudoku);
}

function comprobarSudoku() {
    let sudokuBien = true;
    let tablero = document.querySelector('.tablero');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let celda = document.getElementById(i + "" + j);
            if (tableroSR1[i][j] != tableroCompleto1[i][j] && tableroSR1[i][j] != 0) {
                celda.classList.add('celdaErronea');
                sudokuBien = false;
            }
            if (tableroSR1[i][j] == 0) {
                sudokuBien = false;
                celda.classList.remove('celdaErronea');
            }
        }
    }
    if (sudokuBien) {
        let cartelFinPartida = document.querySelector('.finPartida');
        cartelFinPartida.style.visibility = "visible";
    }
    setTimeout(() => {
        limpiarFondoCeldas();
    }, 2000);
}

function limpiarFondoCeldas() {

    let tablero = document.querySelector('.tablero');
    for (let i = 0; i < tableroSR1.length; i++) {
        for (let j = 0; j < tableroSR1[0].length; j++) {
            let celda = document.getElementById(i + "" + j);
            celda.classList.remove('celdaErronea');
        }
    }
}

function pintarTableroSinResolver() {

    let tablero = document.querySelector('.tablero');
    for (let i = 0; i < tableroSR1.length; i++) {
        for (let j = 0; j < tableroSR1[0].length; j++) {
            let celda = document.createElement('div');
            celda.setAttribute('id', i + "" + j);

            if (tableroSR1[i][j] != 0) {
                celda.innerText = tableroSR1[i][j];
            } else {

                celda.classList.add('editable');
                celda.contentEditable = true;
            }

            if ((i < 3 || i > 5) && (j < 3 || j > 5)) {
                celda.classList.add('celdaOscura');
            } else if ((i > 2 && i < 6) && (j > 2 && j < 6)) {
                celda.classList.add('celdaOscura');
            } else {
                celda.classList.add('celdaClara');
            }

            celda.classList.add('celda');

            celda.addEventListener('focusout', insertarNumero);
            tablero.appendChild(celda);
        }
    }
}

function insertarNumero() {

    let id = this.getAttribute('id');
    let i = parseInt(id / 10);
    let j = id % 10;

    if (!isNaN(this.innerText)) {
        if (this.innerText.length != 1 || this.innerText == 0) {
            this.innerText = "";
            tableroSR1[i][j] = 0;
        } else {
            tableroSR1[i][j] = parseInt(this.innerText);
        }
    } else {
        this.innerText = "";
        tableroSR1[i][j] = 0;
    }
    console.table(tableroSR1);
    comprobarTableroLleno();
}

function comprobarTableroLleno() {
    let sudokuTerminado = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (tableroSR1[i][j] == 0) {
                sudokuTerminado = false;
                break;
            }
        }
        if (sudokuTerminado == false) {
            break;
        }
    }
    console.log(sudokuTerminado);
    let botonResolver = document.querySelector('button');

    if (sudokuTerminado == true) {
        botonResolver.style.visibility = "visible";
    } else {
        botonResolver.style.visibility = "hidden";
    }
}

window.onload = init;