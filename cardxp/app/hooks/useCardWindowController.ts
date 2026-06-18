import { useCallback, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';

const BAR_WIDTH = 5;
const BAR_GAP = 2;
const MIN_BAR_HEIGHT = 3;
const BAR_VARIATION = 40;

type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
};

export function useCardWindowController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const cardWindowRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });
  const animationFrameRef = useRef<number | null>(null);

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
    const cardWindow = cardWindowRef.current;

    if (!cardWindow) {
      return;
    }

    cardWindow.classList.toggle('maximized');

    if (cardWindow.classList.contains('maximized')) {
      cardWindow.style.left = '';
      cardWindow.style.top = '';
      dragStateRef.current.isDragging = false;
    }

    requestAnimationFrame(generateBars);
  }, [generateBars]);

  const handleMouseDown = useCallback((event: ReactMouseEvent) => {
    const cardWindow = cardWindowRef.current;

    if (!cardWindow || cardWindow.classList.contains('maximized')) {
      return;
    }

    dragStateRef.current.isDragging = true;
    dragStateRef.current.offsetX = event.clientX - cardWindow.offsetLeft;
    dragStateRef.current.offsetY = event.clientY - cardWindow.offsetTop;
    cardWindow.classList.add('dragging');
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const cardWindow = cardWindowRef.current;
      const dragState = dragStateRef.current;

      if (!cardWindow || !dragState.isDragging) {
        return;
      }

      cardWindow.style.left = `${event.clientX - dragState.offsetX}px`;
      cardWindow.style.top = `${event.clientY - dragState.offsetY}px`;
    };

    const handleMouseUp = () => {
      const cardWindow = cardWindowRef.current;
      dragStateRef.current.isDragging = false;
      cardWindow?.classList.remove('dragging');
    };

    window.addEventListener('load', generateBars);
    window.addEventListener('resize', generateBars);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    const resizeObserver = new ResizeObserver(generateBars);

    if (cardWindowRef.current) {
      resizeObserver.observe(cardWindowRef.current);
    }

    generateBars();

    return () => {
      window.removeEventListener('load', generateBars);
      window.removeEventListener('resize', generateBars);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
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
