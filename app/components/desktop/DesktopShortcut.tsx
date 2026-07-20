'use client';

import { useDraggable } from '../../hooks/useDraggable';

type DesktopShortcutProps = {
  name: string;
  initialPosition: {
    x: number;
    y: number;
  };
  className: string;
  iconClassName: string;
  nameClassName: string;
  onOpen?: () => void;
};

export function DesktopShortcut({
  name,
  initialPosition,
  className,
  iconClassName,
  nameClassName,
  onOpen,
}: DesktopShortcutProps) {
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
      className={className}
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
      <span className={iconClassName} aria-hidden="true" />
      <span className={nameClassName}>{name}</span>
    </div>
  );
}