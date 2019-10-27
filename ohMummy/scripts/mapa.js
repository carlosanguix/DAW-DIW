/* -----------------------VARIABLES GLOBALES--------------------------- */
// Matriz bidimensional del mapa
var mapa = [];
// Indicamos la longitud en columnas de cada fila
for (let i = 0; i < 14; i++) {
    mapa[i] = new Array(21);
}
var copiaMapa;
// Array de posicion Y e X del personaje [Y][X]
var posPj = new Array();
/* Matriz de momias con arrays para los ejes Y, X de cada momia
Ej de 3 momias {momia1 - [Y][X], momia2 - [Y][X], momia3 - [Y][x]}*/
var cantidadMomias = 1;
var momiasPuestas = 0;
var momias = new Array();
/* Estado de los muros (compuestos por 6 casillas [3*2]) 
   0 No completado
   1 Rodeado*/
var estadoMuros = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var copiaEstadoMuros = JSON.parse(JSON.stringify(estadoMuros));
/* Contenido de los muros  
 0 Nada x5 
 1 Momias x2
 2 Cofres x10
 3 Pergamino x1
 4 Llave x1
 5 Urna*/
var contenidoMuros = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 0, 0, 0, 0, 0];
// Coleccionables para superar el nivel
var llaveEncontrada = false;
var urnaEncontrada = false;
// Pergamino para matar una momia
var pergaminoActivo = false;
// Vidas del PJ
var vidas = 5;
// Nivel en el que te encuentras
var level = 1;
// Elemento div class=mapa
var divMap = document.getElementsByClassName("mapa")[0];
var div = divMap.children;
// Elemento div class=divVidas
var divVidas = document.getElementsByClassName('divVidas')[0];

/* -----------------------FUNCIONES INICIALES--------------------------- */
// Llamamos a la función que nos crea el mapa
crearMapa(mapa);
// Movemos las momias con un intervalo de 3s para siempre
setInterval(moverMomias, 600);
console.log(contenidoMuros);

// Añadimos el total de vidas
var divVidas = document.getElementsByClassName('divVidas')[0];
for (let i = 0; i < vidas; i++) {
    let unaVida = document.createElement('div');
    unaVida.classList.add('vida');
    divVidas.appendChild(unaVida);
}

/*  0 - Camino sin pisar
    1 - Muro
    2 - Posición personaje
    3 - Posición momia
    4 - Camino pisado
    5 - Muro revelado*/
function crearMapa(mapa) {
    // Barajamos el Array para aleatorizar lo que habrá dentro de los pilares
    // aleatorizarContenidoMuros();

    // Creamos la fila superior
    for (let i = 0; i < 21; i++) {
        let divInterior = document.createElement('div');
        if (i != 8) {
            mapa[0][i] = 1;
            divInterior.classList.add('muro');
        } else {
            // Le indicamos la posición de inicio del personaje
            posPj = [0, 8];
            mapa[0][i] = 0;
            divInterior.classList.add('camino');
            divInterior.classList.add('personajeBottom');
        }
        divMap.appendChild(divInterior);
    }
    // Creamos el resto del mapa
    for (let fila = 0; fila < 13; fila++) {
        for (let columna = 0; columna < 21; columna++) {
            let divInterior = document.createElement('div');
            if (columna % 4 == 0 || columna == 0 || fila % 3 == 0 || fila == 0) {
                // var random = Math.floor(Math.random() * 5);
                if (fila >= 9 && fila % 3 == 0 && columna % 4 == 0 && momiasPuestas < cantidadMomias) {
                    mapa[fila + 1][columna] = 0;
                    momias.push(fila + 1, columna);
                    divInterior.classList.add('camino');
                    divInterior.classList.add('momia');
                    momiasPuestas++;
                    // cantidadMomias--;
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
    copiaMapa = JSON.parse(JSON.stringify(mapa));
}

function limpiarMapa() {
    let divVidas = document.getElementsByClassName('divVidas')[0];
    for (let i = 0; i < vidas; i++) {
        let unaVida = document.createElement('div');
        unaVida.classList.add('vida');
        divVidas.appendChild(unaVida);
    }
}

// Función con la que movemos todas las momias
function moverMomias() {
    let pjY = posPj[0];
    let pjX = posPj[1];
    for (let i = 0; i < momias.length; i += 2) {
        /*Comprobamos el valor absoluto de la distancia entre cada una de las momias y el Pj*/
        let momiaY = momias[i];
        let momiaX = momias[i + 1];
        let distanciaY = momiaY - pjY;
        let distanciaX = momiaX - pjX;
        let yMenos1 = false;
        let yMas1 = false;
        let xMenos1 = false;
        let xMas1 = false;
        // Momias en las casillas adyacentes?
        if (momiaY - 1 >= 0 && !(div.item((momiaY - 1) * 21 + momiaX).classList.contains('momia'))) {
            yMenos1 = true;
        }
        if (momiaY + 1 <= 13 && !(div.item((momiaY + 1) * 21 + momiaX).classList.contains('momia'))) {
            yMas1 = true;
        }
        if (momiaX - 1 >= 0 && !(div.item(momiaY * 21 + (momiaX - 1)).classList.contains('momia'))) {
            xMenos1 = true;
        }
        if (momiaX + 1 < 21 && !(div.item(momiaY * 21 + (momiaX + 1)).classList.contains('momia'))) {
            xMas1 = true;
        }
        // Borramos la imagen de la momia del paso anterior
        div.item(momiaY * 21 + momiaX).classList.remove('momia');
        // TODO Peta aquí muy a menudo
        if (Math.abs(distanciaY) > Math.abs(distanciaX) && mapa[momiaY - 1][momiaX] != 1 && mapa[momiaY + 1][momiaX] != 1 && yMenos1 && yMas1) {
            if (distanciaY < 0) {
                momiaY++;
            } else {
                momiaY--;
            }
        } else if (Math.abs(distanciaY) < Math.abs(distanciaX) && mapa[momiaY][momiaX - 1] != 1 && mapa[momiaY][momiaX + 1] != 1 && xMenos1 && xMas1) {
            if (distanciaX < 0) {
                momiaX++;
            } else {
                momiaX--;
            }
        } else {
            if (distanciaY == 0 && distanciaX == 0) {} else {
                if (distanciaY < 0 && mapa[momiaY + 1][momiaX] != 1 && yMas1) {
                    momiaY++;
                } else if (distanciaY > 0 && mapa[momiaY - 1][momiaX] != 1 && yMenos1) {
                    momiaY--;
                } else if (distanciaX < 0 && mapa[momiaY][momiaX + 1] != 1 && xMas1) {
                    momiaX++;
                } else if (distanciaX > 0 && mapa[momiaY][momiaX - 1] != 1 && xMenos1) {
                    momiaX--;
                } else if (distanciaX == distanciaY) {
                    let rnd = Math.floor(Math.random() * 2)
                    if (mapa[momiaY - 1][momiaX] != 1 && yMenos1) {
                        momiaY--;
                    } else if (mapa[momiaY + 1][momiaX] != 1 && yMas1) {
                        momiaY++;
                    } else if (mapa[momiaY][momiaX - 1] != 1 && xMenos1) {
                        momiaX--;
                    } else if (mapa[momiaY][momiaX + 1] != 1 && xMas1) {
                        momiaX++;
                    }
                }
            }
        }
        momias[i] = momiaY;
        momias[i + 1] = momiaX;
        // La posición de la momia coincide con la del pj, eliminamos la momia
        let divConPj = contienePersonaje(momiaY, momiaX);
        if (divConPj) {
            div.item(momiaY * 21 + momiaX).classList.add('momia');
            eliminarMomiaChocada();
            eliminarMomiaEnPj();
            cantidadMomias--;

        } else {
            // Dibujamos la momia en su siguiente paso
            div.item(momiaY * 21 + momiaX).classList.add('momia');
        }
        yMenos1 = false;
        yMas1 = false;
        xMenos1 = false;
        xMas1 = false;
    }
}

// Funcion con la que eliminamos la momia con la que nos hemos chocado y le quitamos una vida al personaje dependiendo de si tiene el pergamino o no.
function eliminarMomiaChocada() {
    let momiaEnPj = div.item(posPj[0] * 21 + posPj[1]).classList.contains('momia');
    if (momiaEnPj) {
        if (!pergaminoActivo) {
            if (vidas != 0) {
                let vida = document.querySelector('.vida');
                vida.parentNode.removeChild(vida);
            }
            vidas--;
        } else {
            pergaminoActivo = false;

        }
        div.item(posPj[0] * 21 + posPj[1]).classList.remove('momia');
        cantidadMomias--;
    }
    eliminarMomiaEnPj();
}

// Función con la que eliminamos la momia que ha chocado con el personaje
function eliminarMomiaEnPj() {
    for (let i = 0; i < momias.length; i += 2) {
        if (momias[i] == posPj[0] && momias[i + 1] == posPj[1]) {
            momias.splice(i, 2);
        }
    }
}

// Funcion con la que comprobamos el personaje está en la posición indicada
function contienePersonaje(momiaY, momiaX) {
    if (div.item(momiaY * 21 + momiaX).classList.contains('personajeTop') ||
        div.item(momiaY * 21 + momiaX).classList.contains('personajeRight') ||
        div.item(momiaY * 21 + momiaX).classList.contains('personajeBottom') ||
        div.item(momiaY * 21 + momiaX).classList.contains('personajeLeft')) {
        return true;
    } else {
        return false;
    }
}

// Función con la que desordenamos el array con el que sabemos que hay dentro de cada muro
function aleatorizarContenidoMuros() {
    let aux;
    for (let i = 0; i < contenidoMuros.length; i++) {
        let rnd = Math.floor(Math.random() * contenidoMuros.length);
        aux = contenidoMuros[rnd];
        contenidoMuros.splice(rnd, 1);
        contenidoMuros.push(aux);
    }
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
                let muroCompletado = true;
                for (let i = y - 1; i <= y + 2; i++) {
                    for (let j = x - 1; j <= x + 3; j++) {
                        if ((i == y - 1 || i == y + 2 || j == x - 1 || j == x + 3) && mapa[i][j] != 4) {
                            muroCompletado = false;
                            break;
                        }
                        if (!muroCompletado) {
                            break;
                        }
                    }
                }
                if (muroCompletado) {
                    // Pintamos el pilar en el que nos encontramos
                    pintarPilar(y, x, indexMuro);
                    // Le decimos que ese muro en el array ya está comprobado
                    estadoMuros[indexMuro] = 1;
                    accionarMuro(indexMuro, y - 1, x + 2);
                }
            }
            // Por cada iteración de las filas pasamos al siguiente muro
            indexMuro++;
        }
    }
}

// Función con la que le damos la propiedad que le corresponde a dicho muro
function accionarMuro(indexMuro, momiaY, momiaX) {
    switch (contenidoMuros[indexMuro]) {
        case 1: // Momia
            // Añadimos momia al array con las coordenadas nuevas
            setTimeout(function() {
                momias.push(momiaY, momiaX - 1);
                cantidadMomias++;
                div.item(momiaY * 21 + momiaX - 1).classList.add('momia');
            }, 700);
            break;
        case 2: // Puntos
            let score = document.getElementsByClassName("puntos")[0];
            score.innerHTML = parseInt(score.innerHTML) + 200;
            break;
        case 3: // Pergamino
            pergaminoActivo = true;
            let checkPergamino = document.getElementsByClassName('pergaminoEncontrado')[0];
            checkPergamino.classList.remove('pergaminoEncontrado');
            checkPergamino.classList.add('pergaminoEncontradoTrue');
            break;
        case 4: // Llave
            llaveEncontrada = true;
            let checkLlave = document.getElementsByClassName('llaveEncontrada')[0];
            checkLlave.classList.remove('llaveEncontrada');
            checkLlave.classList.add('llaveEncontradaTrue');
            console.log(checkLlave);
            break;
        case 5: // Urna
            urnaEncontrada = true;
            let checkUrna = document.getElementsByClassName('urnaEncontrada')[0];
            checkUrna.classList.remove('urnaEncontrada');
            checkUrna.classList.add('urnaEncontradaTrue');
            break;

        default:
            break;
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

        case 5:
            elemento = 'muroCentralUrna';
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

    // Si chcocamos con una momia la eliminamos
    eliminarMomiaChocada();

    // Actualizamos la posición del personaje en el mapa
    mapa[posPj[0]][posPj[1]] = 2;

    // Ajustamos los parámetros para el siguiente nivel
    if (mapa[0][8] == 2 && llaveEncontrada && urnaEncontrada) {
        estadoMuros = JSON.parse(JSON.stringify(copiaEstadoMuros));
        momias = [];
        mapa = JSON.parse(JSON.stringify(copiaMapa));
        llaveEncontrada = false;
        urnaEncontrada = false;
        divMap.innerHTML = "";
        cantidadMomias++;
        level++;
        let nivel = document.getElementsByClassName('level')[0];
        nivel.innerHTML = "Nivel " + level;
        momiasPuestas = 0;
        crearMapa(mapa);
    }
    // Si ya hemos pasado por ahí eliminamos la clase que oculta a nuestro personaje
    div.item(posPj[0] * 21 + posPj[1]).classList.remove('caminoPisado');
}