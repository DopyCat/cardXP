'use client';

import { useDraggable } from '../../hooks/useDraggable';
import '../../styles/folder.css';

type DesktopFolderProps = {
  name: string;
  initialPosition: {
    x: number;
    y: number;
  };
  onOpen?: () => void;
};

export function DesktopFolder({ name, initialPosition, onOpen }: DesktopFolderProps) {
  const { elementRef, handleMouseDown, isDragging, position, zIndex, shouldSuppressClick } = useDraggable<HTMLDivElement>({
    initialPosition,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onOpen) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      ref={elementRef}
      className="desktop-folder"
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
      <span className="desktop-folder__icon" aria-hidden="true" />
      <span className="desktop-folder__name">{name}</span>
    </div>
  );
}