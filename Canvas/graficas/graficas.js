function selectGraph() {

    let select = document.querySelector("select[name='select']");
    graphType = select.options[select.selectedIndex].value;

    if (graphType == 'lines') {
        buildLineGraph();
    } else if (graphType == 'bars') {
        buildBarsGraph();
    } else if (graphType == 'portions') {
        buildPortionsGraph();
    }
}

function buildBarsGraph() {

}

function buildLineGraph() {

}

function buildPortionsGraph() {

    console.log(data);
}

function colectData() {

    data = [];

    let names = document.querySelectorAll("input[class='left']");
    let values = document.querySelectorAll("input[class='right']");

    for (let i = 0; i < names.length; i++) {
        let dios = {
            name: names[i].value,
            value: values[i].value
        };
        data.push(dios);
    }
}

function loadListeners() {

    document.querySelector("input[name='grafiqueame']").addEventListener("click", selectGraph);
}


function init() {

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    loadListeners();
    colectData();
}

let graphType;
let data;
let canvas;
let ctx;

window.onload = init;