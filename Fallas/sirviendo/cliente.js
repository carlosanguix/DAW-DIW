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

// Recogemos los filtros del DOM
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

		// ESTRELLAS
		// Creamos contenedores de estrellas
		let starsfield = document.createElement('fieldset');
		starsfield.classList.add('rating');

		let starsForm = document.createElement('form');

		let starsP = document.createElement('p');
		starsP.classList.add('puntuacion');

		// Creamos dichas estrellas (radioButton, label)
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

			starsP.appendChild(radio);
			starsP.appendChild(label);
		}

		let botonUbicacion = document.createElement('button');
		botonUbicacion.classList.add('botonUbicacion');
		botonUbicacion.innerText = "Ubicación";

		divFalla.appendChild(nombreFalla);
		divFalla.appendChild(boceto);
		divFalla.appendChild(sector);

		// ESTRELLAS
		starsForm.appendChild(starsP);
		starsfield.appendChild(starsForm);
		divFalla.appendChild(starsfield);

		divFalla.appendChild(botonUbicacion);
		document.getElementById('fallas').appendChild(divFalla);
	});
}

// Enviamos la puntuación al servidor para validarla
async function enviarPuntuacion() {

	// Nos quedamos con los parámetros de la nueva puntuación introducida
	let id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('idFalla');
	let puntuacion = this.getAttribute('value');
	let ip = "127.0.0.1";

	// Creamos el objeto con esos parámetros
	let data = {
		idFalla: id,
		ip: ip,
		puntuacion: puntuacion
	};

	// Comprobamos si ya existe la puntuacion
	let existe = await buscarCoincidencia(id, ip);

	if (existe) { // Si existe la modificamos

		// Obtenemos el id de la puntuación que coincide con nuestra ip y el id de la falla,
		// Nos devuelve una lista de objetos json, ya que en controllers hacemos un .find()
		// (Si hiciéramos un .findOne() nos devolvería un objeto con la primera coincidencia)
		let idPuntuacion = await buscarIdPuntuacion(id, ip);

		// Realizamos una petición al servidor con el id de la puntuación encontrada
		// pasándole por el body la nueva puntuación
		fetch('/puntuaciones/' + idPuntuacion[0]._id, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));

	} else { // Si no existe introducimos la nueva puntuación

		// Realizamos una petición al servidor pasándole en el body la nueva puntuacion
		fetch('/puntuaciones', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));
	}
}

// Hacemos una consulta buscando la puntuación introducida
function buscarIdPuntuacion(id, ip) {

	return fetch('/puntuaciones/comprueba/' + id + '/' + ip)
		.then(res => res.json())
		.then(json => {
			// Si se encuentra una coincidencia, devolvemos el objeto
			return json;
		})
		.catch(error => {
			console.error('Error:', error);
			return false
		})
}

// Hacemos una consulta para comprobar si existe la puntuación
function buscarCoincidencia(id, ip) {

	return fetch('/puntuaciones/comprueba/' + id + '/' + ip)
		.then(res => res.json())
		.then(json => {
			// Devolvemos true o false si se ha encontrado alguna coincidencia
			if (json.length != 0) {
				return true;
			} else {
				return false;
			}
		})
		.catch(error => {
			console.error('Error:', error);
			return false
		})
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