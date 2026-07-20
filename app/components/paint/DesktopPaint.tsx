'use client';

import '../../styles/paint.css';

import { DesktopShortcut } from '../desktop/DesktopShortcut';

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
  return (
    <DesktopShortcut
      name={name}
      initialPosition={initialPosition}
      onOpen={onOpen}
      className="paint"
      iconClassName="paint__icon"
      nameClassName="paint__name"
    />
  );
}