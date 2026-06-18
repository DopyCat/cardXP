'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/card.css';

export default function CardWindow() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const cardWindowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Música
  const playMusic = () => {
    audioRef.current?.play();
    setIsPlaying(true);
    gerarBarras();
    if (barsContainerRef.current) {
      barsContainerRef.current.classList.add('playing');
    }
    animarBarras();
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    if (barsContainerRef.current) {
      barsContainerRef.current.classList.remove('playing');
    }
  };

  // Gerar barras dinamicamente
  const gerarBarras = () => {
    if (!barsContainerRef.current) return;
    
    const containerWidth = barsContainerRef.current.clientWidth;
    const barWidth = 5;
    const gap = 2;
    const numBarras = Math.floor(containerWidth / (barWidth + gap));

    barsContainerRef.current.innerHTML = '';

    for (let i = 0; i < numBarras; i++) {
      const span = document.createElement('span');
      span.style.width = `${barWidth}px`;
      span.style.height = '3px';
      barsContainerRef.current.appendChild(span);
    }
  };

  // Animação das barras
  const animarBarras = () => {
    const spans = barsContainerRef.current?.querySelectorAll('span');
    if (!barsContainerRef.current?.classList.contains('playing')) return;

    spans?.forEach(span => {
      const altura = Math.random() * 40 + 3;
      (span as HTMLElement).style.height = `${altura}px`;
    });

    requestAnimationFrame(animarBarras);
  };

  // Maximizar/desmaximizar
  const toggleMaximize = () => {
    if (!cardWindowRef.current) return;
    
    cardWindowRef.current.classList.toggle('maximized');

    if (cardWindowRef.current.classList.contains('maximized')) {
      cardWindowRef.current.style.left = '';
      cardWindowRef.current.style.top = '';
    }

    requestAnimationFrame(() => {
      gerarBarras();
    });
  };

  // Drag da janela
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardWindowRef.current?.classList.contains('maximized')) return;
    
    isDragging = true;
    offsetX = e.clientX - (cardWindowRef.current?.offsetLeft || 0);
    offsetY = e.clientY - (cardWindowRef.current?.offsetTop || 0);
    cardWindowRef.current?.classList.add('dragging');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardWindowRef.current) return;
    
    cardWindowRef.current.style.left = e.clientX - offsetX + 'px';
    cardWindowRef.current.style.top = e.clientY - offsetY + 'px';
  };

  const handleMouseUp = () => {
    isDragging = false;
    cardWindowRef.current?.classList.remove('dragging');
  };

  useEffect(() => {
    window.addEventListener('load', gerarBarras);
    window.addEventListener('resize', gerarBarras);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    const resizeObserver = new ResizeObserver(() => {
      gerarBarras();
    });

    if (cardWindowRef.current) {
      resizeObserver.observe(cardWindowRef.current);
    }

    return () => {
      window.removeEventListener('load', gerarBarras);
      window.removeEventListener('resize', gerarBarras);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="window card-window" ref={cardWindowRef}>
      <div className="title-bar" ref={titleBarRef} onMouseDown={handleMouseDown}>
        <div className="title-bar-text title-bar-text-custom">www.dopycat.com</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize" onClick={toggleMaximize}></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      <div className="window-body">
        {/* Esquerda */}
        <div className="lado-esquerdo">
          <img src="/img/pfp.jpg" className="profile-img" alt="Profile" />
          <div className="sunken-panel panel-left">
            <p className="sidebar-note">
              <strong>scroll to read →</strong><br />
              welcome to my crd! <br />
              [ <span className="pink">she/her</span> ]
              • <strong> INTJ</strong> <br />
            </p>
          </div>
          <button className="default btn-icon" onClick={() => window.open('https://github.com/DopyCat')}>
            <img src="/img/icon-github.png" alt="GitHub" className="platform-icon" />
            GitHub
          </button>
          <button className="default btn-icon" onClick={() => window.open('https://www.instagram.com/dopy.cat/')}>
            <img src="/img/icon-instagram.png" alt="Instagram" className="platform-icon" />
            Instagram
          </button>
          <button className="default btn-icon" onClick={() => window.open('https://discord.gg/nVXC6GKd3n')}>
            <img src="/img/icon-discord.png" alt="Discord" className="platform-icon" />
            Discord
          </button>
          <button className="default btn-icon" onClick={() => window.open('https://www.tiktok.com/@dopy.cat')}>
            <img src="/img/icon-tiktok.png" alt="Tiktok" className="platform-icon" />
            Tiktok
          </button>
        </div>

        {/* Direita */}
        <div className="lado-direito">
          <div className="topo-perfil">
            <img src="/img/pfp.jpg" className="profile-img mobile-only" alt="Profile" />
            <div>
              <div className="table-view__row row-head">
                <strong className="pink">@DopyCat</strong>
              </div>
              <div className="table-view__row row-subtitle">
                last updated on 15/03/2026
              </div>
            </div>
          </div>

          <div className="sunken-panel panel-right">
            <div className="table-view__row">
              Hi, my name is <strong className="pink">DopyCat</strong> but you can call me <strong className="pink">D</strong>!
            </div>

            <div className="table-view__row">
              <strong className="titulo">About me</strong>
              Im 21y and currently studying <strong>Software Engineering</strong> at university. I enjoy learning about technology, programming, and creating digital projects.
            </div>

            <div className="table-view__row">
              <strong className="titulo">Interests & Hobbies</strong>
              <ul>
                <li>Cats;</li>
                <li>Playing games;</li>
                <li>Playing violin;</li>
                <li>Animes;</li>
                <li>Ogata from Golden Kamuy.</li><br />
              </ul>
              <img src="/img/ogata.jpg" className="fixed-picture" alt="Ogata" />
            </div>

            <div className="table-view__row">
              <strong className="titulo">Creative Projects</strong>
              Rn, Im working on my manga called <a href="https://www.instagram.com/xango.cmc/" target="_blank" rel="noopener noreferrer"><strong className="pink">XANGO</strong></a>, about a Brazilian boy chosen by Tupã to fight dark spirits and protect the balance between worlds.
            </div>

            <div className="table-view__row">
              <strong className="titulo">Languages</strong>
              <ul>
                <li>Portuguese (1º language);</li>
                <li>English.</li><br />
              </ul>
              I dont speak german, but i can if u like~
            </div>
          </div>

          {/* Player Retrô */}
          <div className="window music-window">
            <div className="title-bar">
              <div className="title-bar-text">music.mp3</div>
            </div>

            <div className="window-body">
              <div className="retro-player">
                <button onClick={playMusic}>▶</button>
                <button onClick={pauseMusic}>❚❚</button>

                <span className="mp3-label">MP3</span>

                <div className="bars" id="bars" ref={barsContainerRef}></div>

                <audio ref={audioRef}>
                  <source src="/songs/loveli.mp3" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
