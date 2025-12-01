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
    const size = strokeWidthInput.value;

    cursorPreview.style.width = size + "px";
    cursorPreview.style.height = size + "px";

    cursorPreview.style.left = e.pageX + "px";
    cursorPreview.style.top = e.pageY + "px";

    cursorPreview.style.display = "block";
    
    cursorPreview.style.boxShadow = "none";  // reset shadow

    // Pen: show colored border
    if (currentTool === "pen") {
        cursorPreview.style.borderColor = colorInput.value;
    }

    // Eraser: white border + neon glow
    if (currentTool === "eraser") {
        cursorPreview.style.borderColor = "#ffffff";
        cursorPreview.style.boxShadow = "0 0 8px #EC4899";
    }
}

canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointerleave', stopDrawing);
canvas.addEventListener('pointercancel', stopDrawing);
canvas.addEventListener("pointermove", updateCursorPreview);
