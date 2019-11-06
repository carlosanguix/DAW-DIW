let boton = document.querySelector('button');

boton.addEventListener('click', function() {
    transicionarImagenes();
});

function transicionarImagenes() {
    let divs = document.querySelectorAll('div');
    divs.forEach(div => {
        div.classList.toggle('caja');
    });
}