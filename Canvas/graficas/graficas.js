function selectGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    printCoordinatesLines();

<<<<<<< HEAD
=======
    let barWidth = 80;
    let barPositionX = 40;
>>>>>>> 79b523a24d529238c7aac7876893f63e149c9466

    ctx.font = '20px Arial';

    data.forEach(god => {
        ctx.fillStyle = randomHexColor();
        ctx.fillRect(barPositionX, canvas.height - god.value, barWidth, god.value);
        ctx.fillText(god.name, barPositionX, canvas.height - god.value);
        barPositionX += 150;
    });
}

function buildLineGraph() {

    buildCartesianCoordinates();

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;

    let pointPositionX = 0;
    let godValue = canvas.height;

    ctx.font = '20px Arial';

    ctx.moveTo(pointPositionX, godValue);

    data.forEach(god => {
        pointPositionX += 100;
        godValue = god.value;
        ctx.lineTo(pointPositionX, canvas.height - godValue);
        ctx.fillText(god.name, pointPositionX, canvas.height - god.value);
        ctx.moveTo(pointPositionX, canvas.height - godValue);

    });
    ctx.stroke();
}

function printCoordinatesLines() {

<<<<<<< HEAD
    let maxValue = getMaxValue();

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
=======
    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.lineWidth = 1;
>>>>>>> 79b523a24d529238c7aac7876893f63e149c9466

    for (let i = canvas.height - 100; i >= 100; i -= 100) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.fillText(canvas.height - i, 0, i)
    }

    ctx.stroke();

    ctx.closePath();
}

function buildPortionsGraph() {

    let total = data.reduce((max, god) => {
        return max + god.value;
    }, 0);

    let startAngle = -0.5 * Math.PI;
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

const a = document.querySelector('canvas');

function init() {

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    console.log(a);
    loadListeners();
}

let graphType;
let data;
let canvas;
let ctx;


window.onload = init;