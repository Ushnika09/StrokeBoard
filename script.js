const colorInput = document.getElementById('strokeColor');
const strokeWidthInput = document.getElementById('brushSize');
const pen=document.getElementById('pen');
const eraser=document.getElementById('eraser');
const drawSqBtn=document.getElementById('draw');
const clearBtn=document.getElementById('clear');
const downloadBtn=document.getElementById('download');

const canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 400;

let startX, startY=0;

const ctx = canvas.getContext('2d');

let currentTool = 'pen';

pen.addEventListener('click', () => {
    currentTool = 'pen';
        
    });
eraser.addEventListener('click', () => {
    currentTool = 'eraser';
});



ctx.lineCap = 'round';
ctx.lineWidth = 5;
ctx.strokeStyle = '#000000';

let isDrawing = false;
// console.log(ctx);

function startDrawing(e) {
    isDrawing = true;
    // console.log(e);
    
    if (currentTool === 'square') {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        return
    }
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    console.log(e);
    if (!isDrawing) return;
    ctx.strokeStyle=currentTool === 'eraser' ? '#FFFFFF' : colorInput.value; // Assuming white background for erasing
    ctx.lineWidth=strokeWidthInput.value;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}
function stopDrawing() {
    isDrawing = false;
}


clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
});

drawSqBtn.addEventListener('click', () => {
    currentTool = 'square';

})


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
