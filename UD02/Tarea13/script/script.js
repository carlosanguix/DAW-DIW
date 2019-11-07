/* 
 
    ^(;,;)^ : Fragmento perdido

*/
window.onload = init;

function init() {

    let permiteGirar = false;
    let permiteMoverse = false;

    let cantidadDivs = 0;

    let kjchujlju = false;
    const header = document.querySelector('header');
    const boton = document.querySelector('button');
    const container = document.querySelector('container');

    let div1 = document.createElement('div');
    div1.setAttribute('data', "Gira");
    div1.classList.add('boton', 'botonGirarFalse');
    div1.addEventListener('click', function(div1) {
        darPermiso(this);
    });
    header.appendChild(div1);

    function darPermiso(div) {

        console.log(kjchujlju);
        console.log(div);
        console.log(div.getAttribute('data'))
        let attr = div.getAttribute('data');

        if (attr == "Gira" && kjchujlju) {
            if (permiteGirar) {
                div1.classList.toggle('botonGirarTrue');
                permiteGirar = false;
            } else {
                div1.classList.toggle('botonGirarTrue');
                div2.classList.remove('botonMoverseTrue');
                permiteGirar = true;
                permiteMoverse = false;
            }
            console.log("girar: " + permiteGirar + ",moverse: " + permiteMoverse)

        } else if (attr == "seMueve" && kjchujlju) {
            if (permiteMoverse) {
                div2.classList.toggle('botonMoverseTrue');
                permiteMoverse = false;
            } else {
                div2.classList.toggle('botonMoverseTrue');

                div1.classList.remove('botonGirarTrue');

                permiteMoverse = true;
                permiteGirar = false;
            }
            console.log("girar: " + permiteGirar + ",moverse: " + permiteMoverse)
        }

    }

    let div2 = document.createElement('div');
    div2.setAttribute('data', "seMueve");
    div2.classList.add('boton', 'botonMoverseFalse');
    div2.addEventListener('click', function() {
        darPermiso(this);
    });
    header.appendChild(div2);

    boton.addEventListener('click', function() {
        if (cantidadDivs < 20) {
            crearDiv();
            cantidadDivs++;
        }
    });


    function crearDiv() {

        let box = document.createElement('box');
        box.setAttribute('data', "-1");

        box.addEventListener('click', function() {
            cambiarEstado(this);
        });

        container.appendChild(box);
    }


    function cambiarEstado(box) {


        let estadoCelda = box.getAttribute('data');

        switch (estadoCelda) {
            case "-1":
                box.classList = "evoluciona";
                box.setAttribute('data', "0");
                break;
            case "0":
                box.classList = "desevoluciona";
                box.setAttribute('data', "1");
                break;
            case "1":
                box.classList = "ultimate";
                kjchujlju = true;
                box.setAttribute('data', "2");
                break;
            case "2":
                if (permiteGirar) {
                    box.classList.add("girando");
                    box.setAttribute('data', "3");
                } else if (permiteMoverse) {
                    box.classList.add('moviendose');
                    box.setAttribute('data', "4");
                }
                break;
            case "3":
                if (permiteGirar) {
                    box.classList.remove('girando');
                    box.setAttribute('data', "2");
                }
                break;
            case "4":
                if (permiteMoverse) {
                    box.classList.remove('moviendose');
                    box.setAttribute('data', "2");
                }
                break;

            default:
                break;
        }
    }

}