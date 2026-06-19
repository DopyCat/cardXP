'use client';

import { useState } from 'react';

import CardWindow from './components/CardWindow';
import PaintWindow from './components/PaintWindow';

import { DesktopFolder } from './components/folder/DesktopFolder';
import { DesktopPaint } from './components/paint/DesktopPaint';

export default function Home() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPaintOpen, setIsPaintOpen] = useState(false);

  const [highestZIndex, setHighestZIndex] = useState(1000);

  const [cardZIndex, setCardZIndex] = useState(1000);
  const [paintZIndex, setPaintZIndex] = useState(1001);

  const bringToFront = (
    setWindowZIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setHighestZIndex((prev) => {
      const next = prev + 1;
      setWindowZIndex(next);
      return next;
    });
  };

  return (
    <main className="desktop-shell">
      {isCardOpen && (
        <CardWindow
          zIndex={cardZIndex}
          onFocus={() => bringToFront(setCardZIndex)}
          onClose={() => setIsCardOpen(false)}
          onMinimize={() => setIsCardOpen(false)}
        />
      )}

      {isPaintOpen && (
        <PaintWindow
          zIndex={paintZIndex}
          onFocus={() => bringToFront(setPaintZIndex)}
          onClose={() => setIsPaintOpen(false)}
          onMinimize={() => setIsPaintOpen(false)}
        />
      )}

      <DesktopFolder
        name="Card"
        initialPosition={{ x: 70, y: 70 }}
        onOpen={() => {
          setIsCardOpen(true);
          bringToFront(setCardZIndex);
        }}
      />

      <DesktopPaint
        name="Paint"
        initialPosition={{ x: 70, y: 200 }}
        onOpen={() => {
          setIsPaintOpen(true);
          bringToFront(setPaintZIndex);
        }}
      />
    </main>
  );
}