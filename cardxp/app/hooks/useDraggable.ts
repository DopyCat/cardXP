'use client';

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';

type Point = {
  x: number;
  y: number;
};

type UseDraggableOptions = {
  initialPosition: Point;
};

let nextZIndex = 1;

export function useDraggable<T extends HTMLElement>({ initialPosition }: UseDraggableOptions) {
  const elementRef = useRef<T>(null);
  const dragOffsetRef = useRef<Point>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Point>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(1);

  const handleMouseDown = useCallback((event: ReactMouseEvent<T>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    const element = elementRef.current;

    if (!element) {
      return;
    }

    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    setZIndex(() => {
      nextZIndex += 1;
      return nextZIndex;
    });
    setIsDragging(true);
  }, [position.x, position.y]);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - dragOffsetRef.current.x,
        y: event.clientY - dragOffsetRef.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return {
    elementRef,
    isDragging,
    position,
    zIndex,
    handleMouseDown,
  };
}