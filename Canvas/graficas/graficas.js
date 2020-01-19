function selectGraph() {

    colectData();


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

    buildCartesianCoordinates();

    let maxValue = getMaxValue();

    console.log("altura: " + canvas.height);
    console.log("anchura: " + canvas.width);

}

function buildLineGraph() {


}

function getMaxValue() {

    let max = 0;

    data.forEach(god => {
        if (god.value > max) {
            max = god.value;
        }
    });

    return max;
}

function buildCartesianCoordinates() {

    

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 2;



    /*
    // Linea vertical (value)
    ctx.moveTo(100, 310); // (x --, y |)
    ctx.lineTo(100, 90);

    // Linea horizontal (nombres)
    ctx.moveTo(90, 300);
    ctx.lineTo(500, 300);

    ctx.stroke();

    for (let i = 0; i <= 200; i += 50) {
        ctx.fillRect(93, 299 - i, 7, 2);
    }

    for (let i = 0; i <= 400; i += 50) {
        ctx.fillRect(499 - i, 300, 2, 7);
    }
    */

}

function buildPortionsGraph() {

    let total = data.reduce((max, god) => {
        return max + god.value;
    }, 0);

    let startAngle = 0;
    let radius = 120;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    data.forEach(god => {
        ctx.fillStyle = randomHexColor();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.beginPath();

        let endAngle = ((god.value / total) * Math.PI * 2) + startAngle;
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = '20px Helvetica, Calibri';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rebeccapurple';

        let textPosition = (startAngle + endAngle) / 2;
        let textPosY = Math.sin(textPosition) * 1.2 * radius;
        let textPosX = Math.cos(textPosition) * 1.2 * radius;

        ctx.fillText(god.name, textPosX + centerX, textPosY + centerY);
        ctx.closePath();

        startAngle = endAngle;


    });
}

function randomHexColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
};

function colectData() {

    data = [];

    let names = document.querySelectorAll("input[class='left']");
    let values = document.querySelectorAll("input[class='right']");

    for (let i = 0; i < names.length; i++) {
        let god = {
            name: names[i].value,
            value: parseInt(values[i].value)
        };
        data.push(god);
    }
}

function loadListeners() {

    document.querySelector("input[name='grafiqueame']").addEventListener("click", selectGraph);
}


function init() {

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    loadListeners();
}

let graphType;
let data;
let canvas;
let ctx;

window.onload = init;