import Celda from "./celda.js";

export default class Tablero {
    constructor() {
        this.celdas = new Array(4);
        for (let i = 0; i < this.celdas.length; i++) {
            this.celdas[i] = new Array(5);
            for (let j = 0; j < 5; j++) {
                let celda = new Celda(-1);
                this.celdas[i][j] = celda;
            }
        }
    }
}