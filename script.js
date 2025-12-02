const colorInput = document.getElementById('strokeColor');
const strokeWidthInput = document.getElementById('brushSize');
const pen=document.getElementById('pen');
const eraser=document.getElementById('eraser');
const sqBtn=document.getElementById('draw');
const clearBtn=document.getElementById('clear');
const downloadBtn=document.getElementById('download');
const cursorPreview = document.getElementById("cursorPreview");
const canvas = document.getElementById('canvas');

canvas.width = 1000;
canvas.height = 450;

const ctx = canvas.getContext('2d');

let startX=0, startY=0;
let currentTool = 'pen';
let isDrawing = false;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000';

pen.addEventListener('click', () => {
    currentTool = 'pen';
    setActive(pen)    
    });

eraser.addEventListener('click', () => {
    currentTool = 'eraser';
    setActive(eraser)
});

sqBtn.addEventListener('click', () => {
    currentTool = 'square';

    setActive(sqBtn)
})


function setActive(tool){
    pen.classList.remove("active");
    eraser.classList.remove("active");
    sqBtn.classList.remove("active");

    tool.classList.add("active");
}

function startDrawing(e) {
    isDrawing = true;
    
    startX=e.offsetX
    startY=e.offsetY

    if(currentTool=="square"){
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    if(currentTool=="square") return;
    ctx.strokeStyle=currentTool === 'eraser' ? '#FFFFFF' : colorInput.value;    
    ctx.lineWidth=strokeWidthInput.value;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing(e) {
    if(isDrawing && currentTool=="square"){
        const width=e.offsetX-startX;
        const height=e.offsetY-startY
        ctx.lineWidth=strokeWidthInput.value;
        ctx.strokeStyle=colorInput.value
        
        ctx.strokeRect(startX,startY,width,height)
    }
    isDrawing = false;
    cursorPreview.style.display = "none";

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


function updateCursorPreview(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const size = strokeWidthInput.value;

    cursorPreview.style.width = size + "px";
    cursorPreview.style.height = size + "px";

    cursorPreview.style.left = x + "px";
    cursorPreview.style.top = y + "px";

    cursorPreview.style.display = "block";
}


canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerleave', stopDrawing);
canvas.addEventListener('pointercancel', stopDrawing);
canvas.addEventListener("pointermove", updateCursorPreview);


drawBtn.addEventListener("click", () => {
    // Remove active class from all tools (optional)
    pen.classList.remove("active");
    eraser.classList.remove("active");
    drawBtn.classList.add("active");

    currentTool = "draw";

    // Make the cursor crosshair
    canvas.classList.add("draw");

    // Remove the crosshair if coming from pen/eraser
    canvas.classList.remove("pen");
    canvas.classList.remove("eraser");
});
