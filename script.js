const gridSize = document.querySelector("#gridSize");
const gridValue = document.querySelector("#gridValue");

gridSize.addEventListener("input", ()=>{
    gridValue.textContent = `${gridSize.value} x ${gridSize.value}`;
});