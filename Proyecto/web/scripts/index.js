function init() {
    funcionalidadHambMenu();
}

function funcionalidadHambMenu() {
    let burger = document.getElementById('burger');
    burger.addEventListener('click', function() {
        this.classList.toggle('change');
        let nav = document.getElementById('navigation');
        nav.classList.toggle('showNav');
    });


}

window.onload = init;