let canvas
let ctx
let currColor;
let isDraw = false;
let currElement = 'triangle'

function changeEl(elName) {
    currElement = elName;
}


function onColorChange(color) {
    currColor = color;
}

function init() {
    canvas = document.querySelector('#my-canvas');
    ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth - 80;
    canvas.height = window.innerHeight - 200;
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
    isDraw =true;
}

function onMouseUp(ev) {
    isDraw =false;
}
var a;
var prevEvent;
var currEvent;
function onMouseMove(ev) {
    currEvent=ev
        if(isDraw){
            a = setInterval(function(){
                if(prevEvent && currEvent){
                    var movementX = Math.abs(currEvent.screenX - prevEvent.screenX);
                }
                console.log(movementX);
                prevEvent = currEvent;
            },100);
        }else clearInterval(a);
    if(isDraw) draw(ev);
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
    ctx.font = "40px Arial";
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
