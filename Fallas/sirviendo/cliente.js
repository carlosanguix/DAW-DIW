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

function refrescarFallas() {

	let select = document.getElementById('seccion');
	
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

	mostrarFallasFiltradas(seccion, anyoDesde, anyoHasta, tamanyo);
}

function mostrarFallasFiltradas(seccion, anyoDesde, anyoHasta, tamanyo) {

	console.log(seccion);
	console.log(anyoDesde);
	console.log(anyoHasta);
	console.log(tamanyo);

	let fallasFiltradas = fallasJSON.filter(falla => {
		return (seccion == "Todas" || falla.properties.seccion == seccion)
		&& anyoDesde <= falla.properties.anyo_fundacion
		&& anyoHasta >= falla.properties.anyo_fundacion;
	});

	console.log(fallasFiltradas);

}

function init() {

	// Inicializamos lo necesario
	todasSecciones = [];
	listar();

	// Añadimos los eventos
	// refrescarFallas(seccion, añoDesde, añoHasta)
	document.getElementById('seccion').addEventListener('change', refrescarFallas);
	document.getElementById('anyoDesde').addEventListener('focusout', refrescarFallas);
	document.getElementById('anyoHasta').addEventListener('focusout', refrescarFallas);
	document.getElementById('principal').addEventListener('click', refrescarFallas);
	document.getElementById('infantil').addEventListener('click', refrescarFallas);

}

window.onload = init;