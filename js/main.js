let canvas
let ctx
let currColor;
let isDraw = false;
let currElement = 'triangle'
let prevEvent;
let currEvent;
let speedMouseInterval;
let speed = 50;
let px = 20;


function init() {
    clearInterval(speedMouseInterval);
    document.documentElement.onmousemove = function (event) {
        currEvent = event
    }
    speedMouseInterval = setInterval(function () {
        if (prevEvent && currEvent) {
            var movementX = Math.abs(currEvent.screenX - prevEvent.screenX);
            var movementY = Math.abs(currEvent.screenY - prevEvent.screenY);
            var movement = Math.sqrt(movementX * movementX + movementY * movementY);
            if (isDraw) {
                if (speed < Math.round(movement)) px++;
                else {
                    if (px < 15) return;
                    --px;
                }
            }
            document.querySelector('.speed').innerText = Math.round(movement);
        }
        prevEvent = currEvent;
    }, 100);

    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight - 200;
}

function changeEl(elName) {
    currElement = elName;
}

function onColorChange(color) {
    currColor = color;
}

function draw(ev) {
    // if (isDraw) {
    // console.log(ev)
    // ctx.save();
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const { offsetX, offsetY } = ev
    switch (currElement) {
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break;
        case 'rect':
            drawRect(offsetX, offsetY)
            break;
        case 'arc':
            drawArc(offsetX, offsetY)
            break;
        case 'text':
            drawText('test', offsetX, offsetY)
            break;
    }
    // ctx.restore()
    // }
}

function onMouseDown(ev) {
    isDraw = true;
}

function onMouseUp(ev) {
    isDraw = false;
}

function onMouseMove(ev) {
    if (isDraw) draw(ev);
}


function clearCanvas() {
    // ctx.fillStyle = 'yellow'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawText(txt, x, y) {
    // ctx.fillStyle = currColor;
    ctx.strokeStyle = currColor
    ctx.font = `${px}px Arial`;
    // ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}


function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fillStyle = currColor;
    ctx.fill();
    ctx.stroke();
}

function drawRect(x, y) {
    ctx.rect(x, y, 150, 150)
    ctx.fillStyle = currColor;
    ctx.fillRect(x, y, 150, 150)
    ctx.stroke()
    ctx.fill()
}



function drawTriangle(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 300, y + 150);
    ctx.lineTo(x + 100, y + 100);
    ctx.closePath()

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = currColor;

    ctx.stroke();
    ctx.fill()

}
