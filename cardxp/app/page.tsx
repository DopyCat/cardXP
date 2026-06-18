"use client";

import { useState } from 'react';
import CardWindow from './components/CardWindow';
import { DesktopFolder } from './components/folder/DesktopFolder';

export default function Home() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <main className="desktop-shell">
      {isCardOpen ? (
        <CardWindow
          onClose={() => setIsCardOpen(false)}
          onMinimize={() => setIsCardOpen(false)}
        />
      ) : null}
      <DesktopFolder
        name="Pasta"
        initialPosition={{ x: 70, y: 70 }}
        onOpen={() => setIsCardOpen(true)}
      />
    </main>
  );
}
