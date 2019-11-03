// Capturamos en la ventana cualquier tecla pulsada
window.addEventListener('keydown', function(event) {
    reproducir(event.keyCode);
});

// Recogemos todos los elementos que contengan la clase .habilidad
let botones = document.querySelectorAll('.habilidad');

/* De todos los elementos capturados, por cada uno, le añadimos un evento de escucha a la espera de un click
y del fin de la transición que está indicada en el estilo de su clase del CSS*/
botones.forEach(boton => {
    boton.addEventListener('click', function() {
        reproducir(boton.getAttribute('data-key'));
    });

    boton.addEventListener('transitionend', function() {
        removeTransition(boton.getAttribute('data-key'));
    });
});

/* Función en la que eliminamos la clase que le aplica un borde al pulsar ese elemento, pasándole un parámetro
que es el atributo del elemento al que le hemos añadido el evento de escucha*/
function removeTransition(code) {
    let divHabilidad = document.querySelector(`div[data-key="${code}"]`);
    divHabilidad.classList.remove('bordeHabilidad');
}

// Lo mismo que la anterior, pero en este caso relacionamos el código de la tecla o elemento pulsad con el audio del HTML
function reproducir(code) {

    let divHabilidad = document.querySelector(`div[data-key="${code}"]`);
    divHabilidad.classList.add('bordeHabilidad');

    let audio = document.querySelector(`audio[class="${code}"]`);
    if (!audio) {
        return;
    }
    audio.volume = 0.4;
    audio.currentTime = 0;
    audio.play();

}