window.onload = init;




function init() {

    let contenedor = document.querySelector('.container');
    let element = document.querySelector('.fila');
    const FILA = element.cloneNode(true);
    contenedor.removeChild(element);

    let nuevoCampo = document.querySelector('.nuevoCampo');
    nuevoCampo.addEventListener('click', function() {
        let fila = FILA.cloneNode(true);
        fila.querySelector('input[name="dni"]').disabled = true;
        fila.querySelector('input[name="nombre"]').disabled = true;
        fila.querySelector('input[name="apellidos"]').disabled = true;
        fila.querySelector('.eliminar').addEventListener('click', function() {
            let a = fila.querySelector('input[name="dni"]').value;
            let b = fila.querySelector('input[name="nombre"]').value;
            let c = fila.querySelector('input[name="apellidos"]').value;
            if (a != "" && b != "" && c != "") {
                fila.parentNode.removeChild(fila);
            }
        });
        fila.querySelector('.editar').addEventListener('click', function() {
            fila.querySelector('input[name="dni"]').disabled = false;
            fila.querySelector('input[name="nombre"]').disabled = false;
            fila.querySelector('input[name="apellidos"]').disabled = false;
        });
        contenedor.appendChild(fila);
    });


}