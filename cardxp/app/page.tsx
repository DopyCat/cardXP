'use client';

import { useState } from 'react';
import CardWindow from './components/CardWindow';
import PaintWindow from './components/PaintWindow';

import { DesktopFolder } from './components/folder/DesktopFolder';
import { DesktopPaint } from './components/paint/DesktopPaint';

export default function Home() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isPaintOpen, setIsPaintOpen] = useState(false);

  return (
    <main className="desktop-shell">
      {isCardOpen && (
        <CardWindow
          onClose={() => setIsCardOpen(false)}
          onMinimize={() => setIsCardOpen(false)}
        />
      )}

      {isPaintOpen && (
        <PaintWindow
          onClose={() => setIsPaintOpen(false)}
          onMinimize={() => setIsPaintOpen(false)}
        />
      )}

      <DesktopFolder
        name="Card"
        initialPosition={{ x: 70, y: 70 }}
        onOpen={() => setIsCardOpen(true)}
      />

      <DesktopPaint
        name="Paint"
        initialPosition={{ x: 70, y: 200 }}
        onOpen={() => setIsPaintOpen(true)}
      />
    </main>
  );
}