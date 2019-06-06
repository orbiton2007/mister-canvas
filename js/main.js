let canvas
let ctx
let currColor;
let isDraw = false;
let currElement = 'triangle'
let prevEvent;
let currEvent;
let speedMouseInterval;
let speed = 100;
let px = 10;


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
                if (speed < Math.round(movement)){
                    if (px > 300) return;
                    px+=6;
                }else {
                    if (px < 5) return;
                    px-=15;
                }
            }else px = 10;
            document.querySelector('.speed').innerText = Math.round(movement);
        }
        prevEvent = currEvent;
    }, 100);

    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;
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
        case currElement:
            drawText(currElement, offsetX, offsetY)
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
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawText(txt, x, y) {
    // ctx.fillStyle = currColor;
    ctx.strokeStyle = currColor
    ctx.lineWidth = 1;
    ctx.font = `${px}px Arial`;
    // ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}


function drawArc(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, px+10, 0, 2 * Math.PI);
    // ctx.fillStyle = currColor;
    ctx.strokeStyle = currColor;
    // ctx.fill();
    ctx.stroke();
}

function drawRect(x, y) {
    console.log('drawing');
    ctx.beginPath()
    ctx.rect(x, y, px, px)
    // ctx.fillStyle = currColor;
    ctx.strokeStyle = currColor;
    // ctx.fillRect(x, y, px, px)
    ctx.stroke()
    // ctx.fill()
    // ctx.closePath()
}



function drawTriangle(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + px + 20, y -px - 10);
    ctx.lineTo(x + 30, y + px + 10);
    ctx.closePath()

    ctx.lineWidth = 1;
    ctx.strokeStyle = currColor;
    // ctx.fillStyle = currColor;

    ctx.stroke();
    // ctx.fill()

}


function onShowModal(){
    document.querySelector('.modal').style.display = "block";
    document.querySelector('.close').onclick = function(){
        document.querySelector('.modal').style.display = "none";
    }
}

function onSubmit(ev){
    ev.preventDefault();
    var elName = document.querySelector('.input-text').value;
    console.log(elName);
    
    changeEl(elName);
    document.querySelector('.modal').style.display = "none";
}