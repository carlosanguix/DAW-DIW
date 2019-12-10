function listar() {

	fetch('http://mapas.valencia.es/lanzadera/opendata/res_aceite/JSON')
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			// Aquí tenemos el json
		})
		.catch(function (error) {
			console.log("error");
		});
}

function init() {

}

window.onload = init;