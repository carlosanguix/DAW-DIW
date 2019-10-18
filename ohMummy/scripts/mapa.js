/* -----------------------VARIABLES GLOBALES--------------------------- */
// Matriz bidimensional del mapa
var mapa = [];
// Indicamos la longitud en columnas de cada fila
for (let i = 0; i < 14; i++) {
    mapa[i] = new Array(21);
}
// Array de posicion Y e X del personaje [Y][X]
var posPj = new Array();
/* Matriz de momias con arrays para los ejes X e Y de cada momia
Ej de 3 momias {momia1 - [Y][X], momia2 - [Y][X], momia3 - [Y][x]}*/
var momias = new Array();
var posMomia = new Array();
// Estado de los muros (compuestos por 6 casillas [3*2]) 
// 0 No completado
// 1 Completado
var estadoMuros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// Elemento div class=mapa
var divMap = document.getElementsByClassName("mapa")[0];

/* -----------------------FUNCIONES INICIALES--------------------------- */
// Llamamos a la función que nos crea el mapa
crearMapa(mapa);
// Movemos las momias con un intervalo de 3s para siempre
setInterval(moverMomias, 2000);

/* 1- */

/*  0 - Camino sin pisar
    1 - Muro
    2 - Posición personaje
    3 - Posición momia
    4 - Camino pisado
    5 - Muro revelado*/
function crearMapa(mapa) {

    let momiaEnMapa = false;
    // Creamos la fila superior
    for (let i = 0; i < 21; i++) {
        let divInterior = document.createElement('div');
        if (i != 8) {
            mapa[0][i] = 1;
            divInterior.classList.add('muro');
        } else {
            // Le indicamos la posición de inicio del personaje
            posPj.push(0, 8);
            mapa[0][i] = 0;
            divInterior.classList.add('personajeBottom');
        }
        divMap.appendChild(divInterior);
    }
    // Creamos el resto del mapa
    for (let fila = 0; fila < 13; fila++) {
        for (let columna = 0; columna < 21; columna++) {
            let divInterior = document.createElement('div');
            if (columna % 4 == 0 || columna == 0 || fila % 3 == 0 || fila == 0) {
                var random = Math.floor(Math.random() * 5);
                // Colocamos la primera momia en una posición random a partir de la segunda mitad del tablero ejeX o ejeY
                // ESTA MAL (a veces no aparece la momia)
                if (fila > 6 && columna > 8 && ((momiaEnMapa == false && random == 0) || (momiaEnMapa == false && columna > 19 && fila > 12))) {
                    // Indicamos un 3 en esa posición de la matriz e indicamos que ya se ha colocado la momia en el mapa
                    mapa[fila + 1][columna] = 3;
                    momiaEnMapa = true;
                    // Nos quedamos con las posiciones de la momia y la añadimos al array de momias
                    posMomia.push(fila + 1, columna);
                    momias.push(posMomia);
                    divInterior.classList.add('momia');
                } else {
                    mapa[fila + 1][columna] = 0;
                    divInterior.classList.add('camino');
                }
            } else {
                mapa[fila + 1][columna] = 1;
                divInterior.classList.add('muro');
            }
            divMap.appendChild(divInterior);
        }
    }
}

// Nos quedamos con la tecla solo si hemos pulsado alguna flecha o (WASD)
window.addEventListener("keydown", function(key) {
    let cursor = key.key;
    if (cursor == "w") {
        cursor = "ArrowUp";
    } else if (cursor == "d") {
        cursor = "ArrowRight";
    } else if (cursor == "s") {
        cursor = "ArrowDown";
    } else if (cursor == "a") {
        cursor = "ArrowLeft";
    }
    if (cursor == "ArrowUp" || cursor == "ArrowLeft" || cursor == "ArrowRight" || cursor == "ArrowDown") {
        moverJugador(cursor);
    }

});

// Funcion con la que comprobamos todos los muros siempre que no estén ya comprobados
function comprobarMuros() {
    // Nº de muro en el que nosencontramos de los 20 que hay
    let indexMuro = 0;
    // Recorremos filas
    for (let y = 2; y < mapa.length; y += 3) {
        // Recorremos columnas
        for (let x = 1; x < mapa[0].length; x += 4) {
            if (estadoMuros[indexMuro] == 0) {
                // Comprobamos los laterales de la caja(muro), si son camino pisado...
                if (mapa[y][x - 1] == 4 && mapa[y - 1][x] == 4 &&
                    mapa[y - 1][x + 1] == 4 && mapa[y - 1][x + 2] == 4 &&
                    mapa[y][x + 3] == 4 && mapa[y + 1][x + 3] == 4 &&
                    mapa[y + 2][x + 2] == 4 && mapa[y + 2][x + 1] == 4 &&
                    mapa[y + 2][x] == 4 && mapa[y + 1][x - 1] == 4) {
                    // Pintamos el pilar en el que nos encontramos
                    pintarPilar(y, x);
                    // Le decimos que ese muro en el array ya está comprobado
                    estadoMuros[indexMuro] = 1;
                }
            }
            // Por cada iteración de las filas pasamos al siguiente muro
            indexMuro++;
        }
    }
}

function pintarPilar(ejeY, ejeX) {
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 3; x++) {
            let map = document.getElementsByClassName("mapa")[0];
            let div = divMap.children;
            div.item((ejeY + y) * 21 + (ejeX + x)).classList.remove('muro');
            div.item((ejeY + y) * 21 + (ejeX + x)).classList.add('muroRevelado');
        }
    }
}

function moverMomias() {
    for (let i = 0; i < momias.length; i++) {
        /*Comprobamos el valor absoluto de la distancia entre la momia y el Pj*/
        let momiaY = momias[i][0];
        let momiaX = momias[i][1];
        let distanciaY = momiaY - posPj[0];
        let distanciaX = momiaX - posPj[1];
        console.log("Y: " + Math.abs(distanciaY) + ", X: " + Math.abs(distanciaX));
        if (Math.abs(distanciaY) > Math.abs(distanciaX) && (mapa[momiaY - 1][momiaX] != 1 || mapa[momiaY + 1][momiaX] != 1)) {
            console.log("Y");
            if (distanciaY < 0) {
                momias[i][0]++;
            } else if (distanciaY > 0) {
                momias[i][0]--;
            }
        } else if (Math.abs(distanciaX) > Math.abs(distanciaY) && (mapa[momiaY][momiaX - 1] != 1 || mapa[momiaY][momiaX + 1] != 1)) {
            console.log("X");
            if (distanciaX < 0) {
                momias[i][1]++;
            } else if (distanciaX > 0) {
                momias[i][1]--;
            }
        }

        console.table(mapa);
        console.log("Momia: " + momias[0]);
        /*Si los dos movimientos son posibles (encrucijada), 
        tendremos que elegir entre ir hacia arriba/abajo o ir derecha/izquierda
        (con un random o comparando las distancias X/Y),
        sino elegiremos el movimiento disponible*/

    }
}

function eliminarDivPj() {
    let div = divMap.children;
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeTop');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeRight');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeBottom');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeLeft');
}

function moverJugador(cursor) {
    let map = document.getElementsByClassName("mapa")[0];
    let div = divMap.children;
    div.item(posPj[0] * 21 + posPj[1]).classList.add('caminoPisado'); // Perdemos la momia en la matriz del mapa (la conservamos en el array de momias)
    // Modificamos la posicion anterior del PJ para que sea camino pisado
    mapa[posPj[0]][posPj[1]] = 4;
    switch (cursor) {
        case "ArrowUp":
            if (posPj[0] - 1 >= 0 && mapa[posPj[0] - 1][posPj[1]] != 1) {
                // Modificamos su coordenada (Y-1 Arriba, Y+1 Abajo, X+1 Derecha, X-1 Izq)
                eliminarDivPj();
                posPj[0] = posPj[0] - 1;
                div.item(posPj[0] * 21 + posPj[1]).classList.add('personajeTop');
            }
            break;
        case "ArrowRight":
            if (posPj[1] + 1 <= 20 && mapa[posPj[0]][posPj[1] + 1] != 1) {
                eliminarDivPj();
                posPj[1] = posPj[1] + 1;
                div.item(posPj[0] * 21 + posPj[1]).classList.add('personajeRight');
            }
            break;
        case "ArrowDown":
            if (posPj[0] + 1 <= 13 && mapa[posPj[0] + 1][posPj[1]] != 1) {
                eliminarDivPj();
                posPj[0] = posPj[0] + 1;
                div.item(posPj[0] * 21 + posPj[1]).classList.add('personajeBottom');
            }
            break;
        case "ArrowLeft":
            if (posPj[1] - 1 >= 0 && mapa[posPj[0]][posPj[1] - 1] != 1) {
                eliminarDivPj();
                posPj[1] = posPj[1] - 1;
                div.item(posPj[0] * 21 + posPj[1]).classList.add('personajeLeft');
            }
            break;
    }

    if (estadoMuros.includes(0)) {
        comprobarMuros();
    }

    mapa[posPj[0]][posPj[1]] = 2;
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('caminoPisado');

    // console.log(estadoMuros);
    // console.log(estadoMuros.length);
    // console.log(momias.length);
    // console.log("Momia: " + momias[0]);
    // console.log("Pj:    " + posPj);
    // console.table(mapa);
    // console.log(mapa[0].length)
}