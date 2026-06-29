"use client";
import { useRef } from "react";
import { analyzeColor } from "@/lib/color";
import type { ItemColor } from "@/lib/types";

export function ColorPicker({ file, onPick }: { file: File; onPick: (c: ItemColor) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  async function draw(canvas: HTMLCanvasElement) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 320 / Math.max(bmp.width, bmp.height));
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  }
  function pick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const [r, g, b] = canvas.getContext("2d")!.getImageData(x, y, 1, 1).data;
    onPick(analyzeColor([r, g, b]));
  }
  return (
    <canvas
      ref={(el) => { if (el) void draw(el); }}
      onClick={pick}
      className="w-full cursor-crosshair rounded-md border border-border"
    />
  );
}
