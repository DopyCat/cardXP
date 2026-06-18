import type { RefObject } from 'react';

type MusicPlayerProps = {
  onPlay: () => void;
  onPause: () => void;
  barsContainerRef: RefObject<HTMLDivElement | null>;
  audioRef: RefObject<HTMLAudioElement | null>;
};

export function MusicPlayer({ onPlay, onPause, barsContainerRef, audioRef }: MusicPlayerProps) {
  return (
    <div className="window music-window">
      <div className="title-bar">
        <div className="title-bar-text">music.mp3</div>
      </div>

      <div className="window-body">
        <div className="retro-player">
          <button onClick={onPlay}>▶</button>
          <button onClick={onPause}>❚❚</button>

          <span className="mp3-label">MP3</span>

          <div className="bars" id="bars" ref={barsContainerRef}></div>

          <audio ref={audioRef}>
            <source src="/songs/loveli.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}
