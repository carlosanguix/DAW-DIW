// Lista de fallasJSON
let fallasJSON;

// Todas las secciones
let todasSecciones;

/*************************************/
/* Sección de peticiones al servidor */
/*************************************/
// VACIO


function listar() {

	// Accedemos a la API de monumentos falleros de datos abiertos de valencia
	fetch('http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON')
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			fallasJSON = json.features;
			rellenarCamposFiltros();
		})
		.catch(function (error) {
			console.log("error");
		});

	function rellenarCamposFiltros() {

		// Recogemos las secciones no repetidas y las metemos en un array
		for (let i = 0; i < fallasJSON.length; i++) {

			let seccion = fallasJSON[i].properties.seccion;

			if (!todasSecciones.includes(seccion)) {

				todasSecciones.push(fallasJSON[i].properties.seccion);
			}
		}

		// Lo ordenamos
		todasSecciones.sort();

		// Las añadimos al DOM
		let selectSecciones = document.getElementById('seccion');
		
		for (let i = 0; i < todasSecciones.length; i++) {

			let optionSeccion = document.createElement('option');
			optionSeccion.setAttribute('value', todasSecciones[i]);
			optionSeccion.innerText = todasSecciones[i];
			selectSecciones.appendChild(optionSeccion);
		}
	}
}

// Aplicamos los filtros recogiéndolos del DOM
function aplicarFiltros() {

	let select = document.getElementById('seccion');

	// Opción seleccionada del select -> options
	let seccion = select.options[select.selectedIndex].value;

	let anyoDesde = document.getElementById('anyoDesde').value;
	if (anyoDesde == "") {
		anyoDesde = 0;
	}

	let anyoHasta = document.getElementById('anyoHasta').value;
	if (anyoHasta == "") {
		anyoHasta = 9999;
	}

	let tamanyo = "none";
	if (document.getElementById('principal').checked) {
		tamanyo = document.getElementById('principal').value;
	} else if (document.getElementById('infantil').checked) {
		tamanyo = document.getElementById('infantil').value;
	}

	filtrarFallas(seccion, anyoDesde, anyoHasta, tamanyo);
}

function filtrarFallas(seccion, anyoDesde, anyoHasta, tamanyo) {

	// De la lista de fallasFiltradas, filtrar por cada falla:
	// - La que coincida en sección con la sección seleccionada, o en su ausencia, todas.
	// - Los años que estén en el rango "desde" > ____ < "hasta".
	let fallasFiltradas = fallasJSON.filter(falla => {
		return (seccion == "Todas" || falla.properties.seccion == seccion)
			&& anyoDesde <= falla.properties.anyo_fundacion
			&& anyoHasta >= falla.properties.anyo_fundacion;
	});

	pintarFallasFiltradas(fallasFiltradas, tamanyo);
}

function pintarFallasFiltradas(fallasFiltradas, tamanyo) {

	console.log(fallasFiltradas)
	document.getElementById('fallas').innerHTML = "";

	let idEstrella = 0;

	fallasFiltradas.forEach(falla => {

		let divFalla = document.createElement('div');
		divFalla.classList.add('divFalla');
		divFalla.setAttribute('idFalla', falla.properties.id);

		let boceto = document.createElement('img');

		let nombreFalla = document.createElement('span');
		nombreFalla.innerText = falla.properties.nombre;

		let sector = document.createElement('span');
		sector.setAttribute('id', "sectorFalla");
		sector.innerText = "Sector: " + falla.properties.sector;

		let src;
		if (tamanyo == "Principal") {
			src = falla.properties.boceto;
			boceto.src = src;
		} else {
			src = falla.properties.boceto_i;
			boceto.src = src;
		}

		/*
		<fieldset class="rating">
    		<form action="">
      			<p class="puntuacion">
        			<input type="radio" id="radio1" name="estrellas" value="5" />
        			<label for="radio1">★</label>
        			<input type="radio" id="radio2" name="estrellas" value="4" />
        			<label for="radio2">★</label>
        			<input type="radio" id="radio3" name="estrellas" value="3" />
        			<label for="radio3">★</label>
        			<input type="radio" id="radio4" name="estrellas" value="2" />
        			<label for="radio4">★</label>
        			<input type="radio" id="radio5" name="estrellas" value="1" />
        			<label for="radio5">★</label>
      			</p>
    		</form>
 		</fieldset>
		*/

		// ESTRELLAS
		// Creamos contenedores de estrellas
		let field = document.createElement('fieldset');
		field.classList.add('rating');

		let starsForm = document.createElement('form');

		let p = document.createElement('p');
		p.classList.add('puntuacion');

		for (let i = 5; i > 0; i-- , idEstrella++) {
			let radio = document.createElement('input');
			radio.setAttribute('type', "radio");
			radio.setAttribute('id', 'radio' + idEstrella);
			radio.setAttribute('name', 'estrellas');
			radio.setAttribute('value', '' + i);
			radio.classList.add('radioEstrellas');

			let label = document.createElement('label');
			label.setAttribute('for', 'radio' + idEstrella);
			label.setAttribute('value', i);
			label.innerText = '★';
			label.addEventListener('click', enviarPuntuacion);
			label.classList.add('labelEstrellas');

			p.appendChild(radio);
			p.appendChild(label);
		}

		let botonUbicacion = document.createElement('button');
		botonUbicacion.classList.add('botonUbicacion');
		botonUbicacion.innerText = "Ubicación";

		divFalla.appendChild(nombreFalla);
		divFalla.appendChild(boceto);
		divFalla.appendChild(sector);

		// ESTRELLAS
		starsForm.appendChild(p);
		field.appendChild(starsForm);
		divFalla.appendChild(field);

		divFalla.appendChild(botonUbicacion);
		document.getElementById('fallas').appendChild(divFalla);
	});
}

function enviarPuntuacion() {

	let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('idFalla');
	let puntuacion = this.getAttribute('value');
	let ip = "127.0.0.1";

	/*
	let puntos = {
		idFalla: id,
		ip: ip,
		puntuacion: puntuacion
	};*/

	// Enviar puntuación
	let data = new FormData();
	data.append('idFalla', id);
	data.append('puntuacion', puntuacion);
	data.append('ip', ip);

	data.forEach(el => {
		console.log(el);
	});

	fetch('/puntuaciones', {
		method: 'POST',
		body: data,
		
	}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));

}

function init() {

	// Inicializamos lo necesario
	todasSecciones = [];
	listar();

	// Añadimos los eventos
	// refrescarFallas(seccion, añoDesde, añoHasta)
	document.getElementById('seccion').addEventListener('change', aplicarFiltros);
	document.getElementById('anyoDesde').addEventListener('focusout', aplicarFiltros);
	document.getElementById('anyoHasta').addEventListener('focusout', aplicarFiltros);
	document.getElementById('principal').addEventListener('click', aplicarFiltros);
	document.getElementById('infantil').addEventListener('click', aplicarFiltros);
}

window.onload = init;