"use client";
import { useRef, useEffect, useCallback } from "react";
import { analyzeColor } from "@/lib/color";
import type { ItemColor } from "@/lib/types";

interface ColorWheelProps {
  value: string; // hex
  onChange: (color: ItemColor) => void;
  size?: number;
}

function drawWheel(
  ctx: CanvasRenderingContext2D,
  size: number,
  lightness: number,
) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.55;

  // Draw hue ring (saturation = 100% at outer edge)
  for (let angle = 0; angle < 360; angle++) {
    const rad = (angle * Math.PI) / 180;
    const x = cx + outerR * Math.cos(rad);
    const y = cy + outerR * Math.sin(rad);
    ctx.beginPath();
    ctx.moveTo(cx + innerR * Math.cos(rad), cy + innerR * Math.sin(rad));
    ctx.lineTo(x, y);
    ctx.strokeStyle = `hsl(${angle}, 100%, ${lightness}%)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Draw saturation/lightness interior using concentric circles
  for (let r = innerR; r >= 0; r -= 2) {
    const sat = (r / innerR) * 100;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(0, 0%, ${lightness}%)`;
    // Overlay with white to simulate decreasing saturation toward center
    const alpha = 1 - r / innerR;
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
    ctx.fill();
  }
}

function drawCursor(
  ctx: CanvasRenderingContext2D,
  size: number,
  hex: string,
) {
  const cx = size / 2;
  const cy = size / 2;

  // Convert hex to HSL to find position
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;

  let h = 0;
  if (max !== min) {
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    const outerR = size / 2 - 4;
    const innerR = outerR * 0.55;
    const rad = h * Math.PI * 2;
    const dist = innerR + (outerR - innerR) * s;
    const x = cx + dist * Math.cos(rad);
    const y = cy + dist * Math.sin(rad);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.strokeStyle = l > 0.6 ? "#333" : "#fff";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = hex;
    ctx.fill();
  }
}

function hexToHSL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, l * 100];
}

export function ColorWheel({
  value,
  onChange,
  size = 200,
}: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const luminosityRef = useRef(50);
  const cursorSize = size;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);
    drawWheel(ctx, size, luminosityRef.current);
    drawCursor(ctx, size, value);
  }, [size, value]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  function handlePick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const cx = size / 2;
    const cy = size / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const outerR = size / 2 - 4;
    const innerR = outerR * 0.55;

    // Clamp to wheel rings
    const clampedDist = Math.max(innerR, Math.min(outerR, dist));
    const angle = Math.atan2(dy, dx);
    const h = ((angle * 180) / Math.PI + 360) % 360;
    const s = dist < innerR
      ? ((innerR - dist) / innerR) * 100
      : Math.min(100, ((dist - innerR) / (outerR - innerR)) * 100);

    // Get current lightness
    const l = luminosityRef.current;

    // Convert HSL to RGB for color analysis
    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l / 100 - c / 2;
      let r1 = 0, g1 = 0, b1 = 0;
      if (h < 60) { r1 = c; g1 = x; } else if (h < 120) { r1 = x; g1 = c; }
      else if (h < 180) { g1 = c; b1 = x; } else if (h < 240) { g1 = x; b1 = c; }
      else if (h < 300) { r1 = x; b1 = c; } else { r1 = c; b1 = x; }
      return [
        Math.round((r1 + m) * 255),
        Math.round((g1 + m) * 255),
        Math.round((b1 + m) * 255),
      ];
    };

    const rgb = hslToRgb(h, s, l);
    const color = analyzeColor(rgb);
    onChange(color);
  }

  function handleRightClick(e: React.MouseEvent<HTMLCanvasElement>) {
    e.preventDefault();
    // Cycle lightness on right-click: 25, 50, 75
    luminosityRef.current = luminosityRef.current === 25 ? 50
      : luminosityRef.current === 50 ? 75
      : luminosityRef.current === 75 ? 65
      : 25;
    redraw();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground">
        Click to pick · Right-click to change brightness
        <span className="ml-2 rounded px-1.5 py-0.5 bg-surface border border-border">
          L: {Math.round(luminosityRef.current)}%
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onClick={handlePick}
        onContextMenu={handleRightClick}
        className="cursor-crosshair rounded-full"
        style={{ width: cursorSize, height: cursorSize }}
      />
    </div>
  );
}
