'use client';

import { useDraggable } from '../../hooks/useDraggable';
import '../../styles/paint.css';

type DesktopPaintProps = {
  name: string;
  initialPosition: {
    x: number;
    y: number;
  };
  onOpen?: () => void;
};

export function DesktopPaint({
  name,
  initialPosition,
  onOpen,
}: DesktopPaintProps) {
  const {
    elementRef,
    handleMouseDown,
    isDragging,
    position,
    zIndex,
    shouldSuppressClick,
  } = useDraggable<HTMLDivElement>({
    initialPosition,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onOpen) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      ref={elementRef}
      className="paint"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
      onClick={(event) => {
        if (shouldSuppressClick()) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onOpen?.();
      }}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={name}
      data-dragging={isDragging}
    >
      <span className="paint__icon" aria-hidden="true" />
      <span className="paint__name">{name}</span>
    </div>
  );
}