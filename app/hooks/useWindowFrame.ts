'use client';

import { useCallback, useEffect, useRef, type MouseEvent as ReactMouseEvent, type RefObject } from 'react';

type DragState = {
  isDragging: boolean;
  offsetX: number;
  offsetY: number;
};

type UseWindowFrameOptions<T extends HTMLElement> = {
  windowRef: RefObject<T | null>;
};

export function useWindowFrame<T extends HTMLElement>({ windowRef }: UseWindowFrameOptions<T>) {
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const toggleMaximize = useCallback(() => {
    const windowElement = windowRef.current;

    if (!windowElement) {
      return;
    }

    windowElement.classList.toggle('maximized');

    if (windowElement.classList.contains('maximized')) {
      windowElement.style.left = '';
      windowElement.style.top = '';
      dragStateRef.current.isDragging = false;
      windowElement.classList.remove('dragging');
    }
  }, [windowRef]);

  const handleMouseDown = useCallback((event: ReactMouseEvent<T>) => {
    const windowElement = windowRef.current;
    const target = event.target as HTMLElement | null;

    if (!windowElement || windowElement.classList.contains('maximized') || target?.closest('button')) {
      return;
    }

    dragStateRef.current.isDragging = true;
    dragStateRef.current.offsetX = event.clientX - windowElement.offsetLeft;
    dragStateRef.current.offsetY = event.clientY - windowElement.offsetTop;
    windowElement.classList.add('dragging');
  }, [windowRef]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowElement = windowRef.current;
      const dragState = dragStateRef.current;

      if (!windowElement || !dragState.isDragging) {
        return;
      }

      windowElement.style.left = `${event.clientX - dragState.offsetX}px`;
      windowElement.style.top = `${event.clientY - dragState.offsetY}px`;
    };

    const handleMouseUp = () => {
      const windowElement = windowRef.current;

      dragStateRef.current.isDragging = false;
      windowElement?.classList.remove('dragging');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [windowRef]);

  return {
    handleMouseDown,
    toggleMaximize,
  };
}