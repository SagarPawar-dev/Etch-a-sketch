const gridSize= document.querySelector("#gridSize");
const gridValue =document.querySelector("#gridValue");
const createBtn = document.querySelector("#createBtn");
const clearBtn = document.querySelector("#clearBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const randomBtn = document.querySelector("#randomBtn");
const colorPicker = document.querySelector("#colorPicker");
const drawingPad = document.querySelector(".drawing-pad");

let isDrawing = false;
let isRandom= false;
let currentColor = colorPicker.value;

gridSize.addEventListener("input", ()=>{
    gridValue.textContent = `${gridSize.value} x ${gridSize.value}`;
});

colorPicker.addEventListener("input", ()=>{
    currentColor = colorPicker.value;
    isRandom = false;
    randomBtn.textContent = "Random";
    randomBtn.style.outline = "none";
});

function createGrid(){

    drawingPad.innerHTML="";
    const size = Number(gridSize.value);

    for(let i = 0; i < size*size;i++ ){
        const box = document.createElement("div");
        box.classList.add("square");

        box.style.width = `calc(100% / ${size})`;
        box.style.height = `calc(100% / ${size})`;
        box.style.flex = `0 0 calc(100% / ${size})`;
        box.style.boxSizing = "border-box";
        box.style.outline = "1px solid #ccc";

        box.addEventListener("mouseover", draw);
        box.addEventListener("click", draw);
        box.addEventListener("touchmove", draw);

        drawingPad.appendChild(box);
    }
}

createBtn.addEventListener("click", createGrid);

eraserBtn.addEventListener("click", ()=>{
    currentColor = "white";
    isRandom =false;
    randomBtn.textContent = "random";
    randomBtn.style.outline = "none";
});

randomBtn.addEventListener("click", ()=>{
    isRandom = !isRandom;
    randomBtn.textContent = isRandom ? "Random On" : "Random";
    randomBtn.style.outline = isRandom ? "3px solid black" : "none";
});

clearBtn.addEventListener("click", ()=>{
    document.querySelectorAll(".square").forEach(square =>{
        square.style.backgroundColor = "white";
    });
});

// mouse tracking

drawingPad.addEventListener("mousedown", ()=> isDrawing=true);
drawingPad.addEventListener("mouseup", ()=> isDrawing=false);
drawingPad.addEventListener("mouseleave", ()=> isDrawing=false);

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function draw(e){
    if(e.type ==="mouseover" && !isDrawing) return;
    e.target.style.backgroundColor = isRandom ? getRandomColor() : currentColor;
}