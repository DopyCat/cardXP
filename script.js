const audio = document.getElementById("audio");
const bars = document.getElementById("bars");

function playMusic() {
    audio.play();
    bars.classList.add("playing");
}

function pauseMusic() {
    audio.pause();
    bars.classList.remove("playing");
}

const windowElement = document.querySelector(".card-window");
const titleBar = windowElement.querySelector(".title-bar");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    // calcula a diferença entre o clique e a posição da janela
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    windowElement.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    windowElement.classList.remove("dragging");
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    // atualiza a posição da janela enquanto arrasta
    windowElement.style.left = e.clientX - offsetX + "px";
    windowElement.style.top = e.clientY - offsetY + "px";
});