// Lista de fallasJSON
let fallasJSON;

// Todas las secciones
let todasSecciones;

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

		let selectSecciones = document.getElementById('seccion');

		// Las añadimos al DOM
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

		let botonUbicacion = document.createElement('button');
		botonUbicacion.classList.add('botonUbicacion');
		botonUbicacion.innerText = "Ubicación";

		divFalla.appendChild(nombreFalla);
		divFalla.appendChild(boceto);
		divFalla.appendChild(sector);
		divFalla.appendChild(botonUbicacion);
		document.getElementById('fallas').appendChild(divFalla);
	});

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