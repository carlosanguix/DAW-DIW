export default class Celda {
    constructor(estado) {
        /*
        -1  - Nada
        0   - Caja recién creada
        1   - Caja movida a la derecha
        2   - Caja de vuelta al sitio original
        3   - Cthulhu revelado*/
        this.estado = estado;
    }
}