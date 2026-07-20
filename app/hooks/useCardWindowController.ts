import { useCallback, useEffect, useRef } from 'react';

import { useWindowFrame } from './useWindowFrame';

const BAR_WIDTH = 5;
const BAR_GAP = 2;
const MIN_BAR_HEIGHT = 3;
const BAR_VARIATION = 40;

export function useCardWindowController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const cardWindowRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const {
    handleMouseDown,
    toggleMaximize: toggleWindowMaximize,
  } = useWindowFrame({ windowRef: cardWindowRef });

  const generateBars = useCallback(() => {
    const barsContainer = barsContainerRef.current;

    if (!barsContainer) {
      return;
    }

    const containerWidth = barsContainer.clientWidth;
    const totalBarWidth = BAR_WIDTH + BAR_GAP;
    const totalBars = Math.floor(containerWidth / totalBarWidth);

    barsContainer.innerHTML = '';

    for (let i = 0; i < totalBars; i += 1) {
      const bar = document.createElement('span');
      bar.style.width = `${BAR_WIDTH}px`;
      bar.style.height = `${MIN_BAR_HEIGHT}px`;
      barsContainer.appendChild(bar);
    }
  }, []);

  const animateBars = useCallback(() => {
    const barsContainer = barsContainerRef.current;

    if (!barsContainer?.classList.contains('playing')) {
      return;
    }

    const bars = barsContainer.querySelectorAll('span');

    bars.forEach((bar) => {
      const nextHeight = Math.random() * BAR_VARIATION + MIN_BAR_HEIGHT;
      (bar as HTMLElement).style.height = `${nextHeight}px`;
    });

    animationFrameRef.current = requestAnimationFrame(animateBars);
  }, []);

  const playMusic = useCallback(() => {
    audioRef.current?.play();
    generateBars();
    barsContainerRef.current?.classList.add('playing');

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animateBars();
  }, [animateBars, generateBars]);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    barsContainerRef.current?.classList.remove('playing');

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const toggleMaximize = useCallback(() => {
    toggleWindowMaximize();
    requestAnimationFrame(generateBars);
  }, [generateBars, toggleWindowMaximize]);

  useEffect(() => {
    window.addEventListener('load', generateBars);
    window.addEventListener('resize', generateBars);

    const resizeObserver = new ResizeObserver(generateBars);

    if (cardWindowRef.current) {
      resizeObserver.observe(cardWindowRef.current);
    }

    generateBars();

    return () => {
      window.removeEventListener('load', generateBars);
      window.removeEventListener('resize', generateBars);
      resizeObserver.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [generateBars]);

  return {
    audioRef,
    barsContainerRef,
    cardWindowRef,
    playMusic,
    pauseMusic,
    toggleMaximize,
    handleMouseDown,
  };
}
