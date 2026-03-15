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