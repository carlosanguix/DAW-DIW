window.addEventListener('keydown', function(event) {
    reproducir(event.keyCode);
    console.log(event);
});

let botones = document.querySelectorAll('.habilidad');

botones.forEach(boton => {
    boton.addEventListener('click', function(event) {
        reproducir(boton.getAttribute('data-key'));
    });
});

function reproducir(code) {

    let audio = document.querySelector(`audio[class="${code}"]`);
    if (!audio) {
        return;
    }
    audio.volume = 0.4;
    audio.currentTime = 0;
    audio.play();

}