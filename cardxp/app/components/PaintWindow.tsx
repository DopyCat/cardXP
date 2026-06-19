'use client';

import { useRef, useEffect, useState } from 'react';
import '../styles/paint-window.css';
import { useCardWindowController } from '../hooks/useCardWindowController';

type PaintWindowProps = {
  onClose: () => void;
  onMinimize: () => void;
};

export default function PaintWindow({
  onClose,
  onMinimize,
}: PaintWindowProps) {
  const {
    cardWindowRef,
    toggleMaximize,
    handleMouseDown,
  } = useCardWindowController();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [drawing, setDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [brushColor, setBrushColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    ctx.beginPath();

    ctx.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    setDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );

    ctx.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.fillStyle = '#ffffff';

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const saveImage = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement('a');

    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');

    link.click();
  };

  return (
    <div
      className="window paint-window"
      ref={cardWindowRef}
    >
      <div
        className="title-bar"
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar-text">
          Paint
        </div>

        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onClick={onMinimize}
          />

          <button
            aria-label="Maximize"
            onClick={toggleMaximize}
          />

          <button
            aria-label="Close"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="window-body">
        <div className="paint-toolbar">
          <button onClick={saveImage}>
            Salvar
          </button>

          <button onClick={clearCanvas}>
            Limpar
          </button>

          <label>
            Tamanho:
          </label>

          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) =>
              setBrushSize(Number(e.target.value))
            }
          />

          <span>{brushSize}px</span>

          <label>
            Cor:
          </label>

          <input
            type="color"
            value={brushColor}
            onChange={(e) =>
              setBrushColor(e.target.value)
            }
          />
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="paint-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
}