export default class Celda {
    constructor(estado) {
        /*
        -1  - Nada
        0   - (box)             Caja recién creada
        1   - (.evoluciona)     Caja movida a la derecha
        2   - (.desevoluciona)  Caja de vuelta al sitio original
        3   - (.ultimate)       Cthulhu revelado
        4   - ()                Poder nº1
        5   - Poder nº2*/
        this.estado = estado;
    }
}

function cambiarEstado(params) {

}