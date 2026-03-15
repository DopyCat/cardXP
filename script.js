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
    animarBarras(); // inicia animação
}

function pauseMusic() {
    audio.pause();
    barsContainer.classList.remove("playing");
}

// ==========================
// Função para gerar barras dinamicamente
// ==========================
function gerarBarras() {
    // Usa clientWidth para pegar largura real do container
    const containerWidth = barsContainer.clientWidth;
    const barWidth = 5;
    const gap = 2;
    const numBarras = Math.floor(containerWidth / (barWidth + gap));

    barsContainer.innerHTML = ''; // limpa barras existentes

    for (let i = 0; i < numBarras; i++) {
        const span = document.createElement('span');
        span.style.width = `${barWidth}px`;
        span.style.height = '3px'; // altura inicial
        barsContainer.appendChild(span);
    }
}

// ==========================
// Animação das barras
// ==========================
function animarBarras() {
    const spans = barsContainer.querySelectorAll('span');
    if (!barsContainer.classList.contains("playing")) return;

    spans.forEach(span => {
        const altura = Math.random() * 40 + 3; // altura aleatória
        span.style.height = `${altura}px`;
    });

    requestAnimationFrame(animarBarras); // loop da animação
}

// ==========================
// Maximizar / desmaximizar janela
// ==========================
function toggleMaximize() {
    cardWindow.classList.toggle('maximized');

    if (cardWindow.classList.contains("maximized")) {

        // reseta posição do drag
        cardWindow.style.left = "";
        cardWindow.style.top = "";

        isDragging = false;

    }

    requestAnimationFrame(() => {
        gerarBarras();
    });
}

maximizeButton.addEventListener('click', toggleMaximize);

// ==========================
// Drag da janela
// ==========================
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

titleBar.addEventListener("mousedown", (e) => {

    if (cardWindow.classList.contains("maximized")) return;

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
window.addEventListener('load', gerarBarras);
window.addEventListener('resize', gerarBarras);