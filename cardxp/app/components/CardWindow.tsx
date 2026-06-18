'use client';

import '../styles/card.css';
import { MusicPlayer } from './card/MusicPlayer';
import { ProfileDetails } from './card/ProfileDetails';
import { ProfileSidebar } from './card/ProfileSidebar';
import { socialLinks } from './card/data';
import { useCardWindowController } from '../hooks/useCardWindowController';

export default function CardWindow() {
  const {
    audioRef,
    barsContainerRef,
    cardWindowRef,
    playMusic,
    pauseMusic,
    toggleMaximize,
    handleMouseDown,
  } = useCardWindowController();

  const openExternalLink = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="window card-window" ref={cardWindowRef}>
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title-bar-text title-bar-text-custom">www.dopycat.com</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize" onClick={toggleMaximize}></button>
          <button aria-label="Close"></button>
        </div>
      </div>

      <div className="window-body">
        <ProfileSidebar links={socialLinks} onOpenLink={openExternalLink} />

        <div className="lado-direito">
          <ProfileDetails />
          <MusicPlayer
            onPlay={playMusic}
            onPause={pauseMusic}
            barsContainerRef={barsContainerRef}
            audioRef={audioRef}
          />
        </div>
      </div>
    </div>
  );
}
