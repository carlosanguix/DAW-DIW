/* -----------------------VARIABLES GLOBALES--------------------------- */
// Matriz bidimensional del mapa
var mapa = [];
// Indicamos la longitud en columnas de cada fila
for (let i = 0; i < 14; i++) {
    mapa[i] = new Array(21);
}
// Array de posicion Y e X del personaje [Y][X]
var posPj = new Array();
/* Matriz de momias con arrays para los ejes Y, X de cada momia
Ej de 3 momias {momia1 - [Y][X], momia2 - [Y][X], momia3 - [Y][x]}*/
var momias = new Array();
var posMomia = new Array();
/* Estado de los muros (compuestos por 6 casillas [3*2]) 
   0 No completado
   1 Rodeado*/
var estadoMuros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
/* Contenido de los muros  
 0 Nada x6 
 1 Momias x2
 2 Cofres x10
 3 Pergamino x1
 4 Llave x1*/
var contenidoMuros = [1, 0, 1, 0, 2, 3, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 4];
// Elemento div class=mapa
var divMap = document.getElementsByClassName("mapa")[0];
var div = divMap.children;

/* -----------------------FUNCIONES INICIALES--------------------------- */
// Llamamos a la función que nos crea el mapa
crearMapa(mapa);
// Movemos las momias con un intervalo de 3s para siempre
setInterval(moverMomias, 300);
// Barajamos el Array para aleatorizar lo que habrá dentro de los pilares
aleatorizarContenidoMuros();

// Función con la que desordenamos el array con el que sabemos que hay dentro de cada muro
function aleatorizarContenidoMuros() {
    let aux;
    for (let i = 0; i < contenidoMuros.length; i++) {
        let rnd = Math.floor(Math.random() * contenidoMuros.length);
        aux = contenidoMuros[rnd];
        contenidoMuros.splice(rnd, 1);
        contenidoMuros.push(aux);
    }
    console.log(contenidoMuros);
}

// Funcion con la que después de dar un paso comprobamos todos los muros siempre que no estén ya comprobados
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
                    pintarPilar(y, x, indexMuro);
                    // Le decimos que ese muro en el array ya está comprobado
                    estadoMuros[indexMuro] = 1;
                }
            }
            // Por cada iteración de las filas pasamos al siguiente muro
            indexMuro++;
        }
    }
}

// Funcion con la que recorremos el pilar por dentro
function pintarPilar(ejeY, ejeX, indexMuro) {
    for (let y = 0; y < 2; y++) { // Filas
        for (let x = 0; x < 3; x++) { // Columnas

            div.item((ejeY + y) * 21 + (ejeX + x)).classList.remove('muro');
            if (y == 0 && x == 1) {
                let elementoAPintar = elegirElemento(indexMuro);
                div.item((ejeY + y) * 21 + (ejeX + x)).classList.add('muroRevelado');
                div.item((ejeY + y) * 21 + (ejeX + x)).classList.add(elementoAPintar);
            } else {
                div.item((ejeY + y) * 21 + (ejeX + x)).classList.add('muroRevelado');
            }
        }
    }
}

// Función con la que elegimos el elemento que habrá dentro del segundo cuadrado del pilar revelado
function elegirElemento(indexMuro) {
    let valor = contenidoMuros[indexMuro];
    let elemento;
    switch (valor) {
        case 0:
            elemento = 'muroRevelado';
            break;
        case 1:
            elemento = 'muroCentralMomia';
            // TODO: (No se si aqui o donde) Con una transición hacer que la momia sale del cuadrado superior y echa a andar
            break;
        case 2:
            elemento = 'muroCentralCofre';
            break;
        case 3:
            elemento = 'muroCentralPergamino';
            break;
        case 4:
            elemento = 'muroCentralLlave';
            break;

        default:
            break;
    }
    return elemento;
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





// Función con la que cada vez que damos un paso eliminamos las clases que afectan al personaje en el paso dado anteriormente
function eliminarDivPj() {
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeTop');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeRight');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeBottom');
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('personajeLeft');
}

// Función con la que movemos al jugador según la tecla que hayamos apretado
function moverJugador(cursor) {
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

    // Si hay algún muro por descubrir (su valor es 0) entraremos a la función
    if (estadoMuros.includes(0)) {
        comprobarMuros();
    }

    // Actualizamos la posición del personaje en el mapa
    mapa[posPj[0]][posPj[1]] = 2;
    // Si ya hemos pasado por ahí eliminamos la clase que oculta a nuestro personaje
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('caminoPisado');

    // console.log(estadoMuros);
    // console.log(estadoMuros.length);
    // console.log(momias.length);
    // console.log("Momia: " + momias[0]);
    // console.log("Pj:    " + posPj);
    // console.table(mapa);
    // console.log(mapa[0].length)
}

function moverMomias() {
    let pjY = posPj[0];
    let pjX = posPj[1];
    for (let i = 0; i < momias.length; i++) {
        /*Comprobamos el valor absoluto de la distancia entre la momia[i] y el Pj*/
        let momiaY = momias[i][0];
        let momiaX = momias[i][1];

        div.item(momiaY * 21 + momiaX).classList.remove('momia');
        let distanciaY = momiaY - pjY;
        let distanciaX = momiaX - pjX;
        console.log("distancia Y: " + distanciaY + ",distanciaX: " + distanciaX);
        if (Math.abs(distanciaY) > Math.abs(distanciaX)) { // La momia esta mas lejos en el eje Y que en X
            if (distanciaY < 0 && mapa[momiaY + 1][momiaX] != 1) { // La momia está arriba del pj && no hay pilar debajo de ella
                momiaY++;
            } else if (distanciaY > 0 && mapa[momiaY - 1][momiaX] != 1) {
                momiaY--;
            } else {
                if (momiaX > pjX) {
                    momiaX--;
                } else {
                    momiaY++;
                }
            }
        } else if (Math.abs(distanciaY) < Math.abs(distanciaX)) { // Lo contrario
            if (distanciaX < 0 && mapa[momiaY][momiaX + 1] != 1) { // La momia está arriba del pj && no hay pilar debajo de ella
                momiaX++;
            } else if (distanciaY > 0 && mapa[momiaY][momiaX - 1] != 1) {
                momiaX--;
            } else {
                if (momiaY > pjY) {
                    momiaY--;
                } else {
                    momiaY++;
                }
            }
        } else { // La momia está a la misma distancia del eje X que del eje Y
            if (distanciaX == 0 && distanciaY == 0) { // Está en el mismo espacio que el pj

            } else { // Está a la misma distancia de Y, X pero no está en el mismo espacio
                let rnd = Math.floor(Math.random() * 2);
                if (mapa[momiaY - 1][momiaX] != 1) {
                    momiaY--;
                } else if (mapa[momiaY + 1][momiaX] != 1) {
                    momiaY++;
                } else if (mapa[momiaY][momiaX - 1] != 1) {
                    momiaX--;
                } else {
                    momiaX++;
                }
            }
        }

        // Borramos la imagen de la momia del paso anterior

        console.log(momiaY + ", " + momiaX);
        momias[i][0] = momiaY;
        momias[i][1] = momiaX;
        // Dibujamos la momia en su siguiente paso
        div.item(momiaY * 21 + momiaX).classList.add('momia');


        console.table(mapa);
        console.log("Momia: " + momias[i]);

    }
}

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
                    divInterior.classList.add('camino');
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