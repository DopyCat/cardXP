'use client';

import '../../styles/folder.css';

import { DesktopShortcut } from '../desktop/DesktopShortcut';

type DesktopFolderProps = {
  name: string;
  initialPosition: {
    x: number;
    y: number;
  };
  onOpen?: () => void;
};

export function DesktopFolder({ name, initialPosition, onOpen }: DesktopFolderProps) {
  return (
    <DesktopShortcut
      name={name}
      initialPosition={initialPosition}
      onOpen={onOpen}
      className="desktop-folder"
      iconClassName="desktop-folder__icon"
      nameClassName="desktop-folder__name"
    />
  );
}