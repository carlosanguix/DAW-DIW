let cadenaBuscar;
let address;
let tabla;


function listar() {
	
	cadenaBuscar = this.value.toLowerCase();
	document.getElementById('tabla').innerHTML = "";

	fetch('http://mapas.valencia.es/lanzadera/opendata/res_aceite/JSON')
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			if (cadenaBuscar != "") {
				filtrarResultados(json);
			}
		})
		.catch(function (error) {
			console.log("error");
		});
}

function filtrarResultados(json) {
	
	console.log(json["features"].length);

	for (let i = 0; i < json["features"].length; i++) {

		address = json["features"][i].properties.direccion;
		address = address.toLowerCase();

		if (address.includes(cadenaBuscar)) {
			let calle = document.createElement('p');
			calle.innerText = address;
			tabla.appendChild(calle);
			console.log(address);
		}

	}
}

function init() {

	tabla = document.getElementById('tabla');
	document.getElementById('buscador').addEventListener('keyup', listar);
}

window.onload = init;