// ==========================
// Seleção de elementos
// ==========================
const audio = document.getElementById("audio");
const barsContainer = document.getElementById("bars");
const cardWindow = document.querySelector('.card-window');
const titleBar = cardWindow.querySelector(".title-bar");
const maximizeButton = cardWindow.querySelector('[aria-label="Maximize"]');

// ==========================
// Funções de música
// ==========================
function playMusic() {
    audio.play();
    gerarBarras(); // garante que as barras existam antes de animar
    barsContainer.classList.add("playing");
}

function pauseMusic() {
    audio.pause();
    barsContainer.classList.remove("playing");
}

// ==========================
// Função para gerar barras dinamicamente
// ==========================
function gerarBarras() {
    const containerWidth = barsContainer.offsetWidth;
    const barWidth = 5; // largura de cada barra + gap
    const numBarras = Math.floor(containerWidth / barWidth);

    barsContainer.innerHTML = ''; // limpa barras existentes

    for (let i = 0; i < numBarras; i++) {
        const span = document.createElement('span');
        span.style.height = '3px'; // altura inicial
        barsContainer.appendChild(span);
    }
}

// ==========================
// Maximizar / desmaximizar janela
// ==========================
function toggleMaximize() {
    cardWindow.classList.toggle('maximized');
    // não precisa mais do setTimeout ou requestAnimationFrame
}

// conectar botão de maximizar
maximizeButton.addEventListener('click', toggleMaximize);

// ==========================
// Drag da janela
// ==========================
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - cardWindow.offsetLeft;
    offsetY = e.clientY - cardWindow.offsetTop;
    cardWindow.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cardWindow.classList.remove("dragging");
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    cardWindow.style.left = e.clientX - offsetX + "px";
    cardWindow.style.top = e.clientY - offsetY + "px";
});

// ==========================
// Observador de resize do cardWindow
// ==========================
const resizeObserver = new ResizeObserver(() => {
    gerarBarras();
});
resizeObserver.observe(cardWindow);

// ==========================
// Inicialização das barras
// ==========================
window.addEventListener('load', gerarBarras);      // ao carregar página
window.addEventListener('resize', gerarBarras);    // ao redimensionar janela