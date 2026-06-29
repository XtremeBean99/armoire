'use client'

import type { ItemColor } from '@/lib/types'

const SWATCHES: Array<{
  hex: string
  name: string
  rgb: [number, number, number]
  lab: [number, number, number]
  hueFamily: string
  isNeutral: boolean
}> = [
  { hex: '#09090b', name: 'Black',        rgb: [9,   9,  11], lab: [1.8,   0.0,  -0.2], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#27272a', name: 'Charcoal',     rgb: [39,  39, 42], lab: [16.5,  0.1,  -0.6], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#71717a', name: 'Grey',         rgb: [113,113,122], lab: [47.2,  0.1,  -1.3], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#d4d4d8', name: 'Light grey',   rgb: [212,212,216], lab: [84.6,  0.0,  -0.8], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#fafafa', name: 'White',        rgb: [250,250,250], lab: [98.4,  0.0,   0.1], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#f5f5f0', name: 'Off-white',    rgb: [245,245,240], lab: [96.5, -0.3,   1.9], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#d4b896', name: 'Beige',        rgb: [212,184,150], lab: [75.8,  5.6,  17.1], hueFamily: 'neutral', isNeutral: true  },
  { hex: '#c4a882', name: 'Khaki',        rgb: [196,168,130], lab: [69.8,  5.5,  20.2], hueFamily: 'neutral', isNeutral: false },
  { hex: '#7c6d5e', name: 'Tan',          rgb: [124,109, 94], lab: [46.3,  3.9,  11.0], hueFamily: 'neutral', isNeutral: false },
  { hex: '#1e3a5f', name: 'Navy',         rgb: [30,  58, 95], lab: [23.3,  3.4, -24.8], hueFamily: 'blue',    isNeutral: false },
  { hex: '#1d4ed8', name: 'Royal blue',   rgb: [29,  78,216], lab: [36.0, 28.8, -68.4], hueFamily: 'blue',    isNeutral: false },
  { hex: '#60a5fa', name: 'Light blue',   rgb: [96, 165,250], lab: [67.3, 11.4, -39.6], hueFamily: 'blue',    isNeutral: false },
  { hex: '#15803d', name: 'Forest green', rgb: [21, 128, 61], lab: [48.0,-34.4,  22.1], hueFamily: 'green',   isNeutral: false },
  { hex: '#4ade80', name: 'Mint green',   rgb: [74, 222,128], lab: [82.4,-42.6,  28.2], hueFamily: 'green',   isNeutral: false },
  { hex: '#854d0e', name: 'Brown',        rgb: [133, 77, 14], lab: [37.2, 17.1,  36.5], hueFamily: 'orange',  isNeutral: false },
  { hex: '#c2410c', name: 'Rust',         rgb: [194, 65, 12], lab: [44.1, 43.2,  50.0], hueFamily: 'red',     isNeutral: false },
  { hex: '#991b1b', name: 'Burgundy',     rgb: [153, 27, 27], lab: [30.8, 37.0,  23.5], hueFamily: 'red',     isNeutral: false },
  { hex: '#7e22ce', name: 'Purple',       rgb: [126, 34,206], lab: [29.3, 54.9, -57.0], hueFamily: 'purple',  isNeutral: false },
  { hex: '#f59e0b', name: 'Mustard',      rgb: [245,158, 11], lab: [68.9, 12.9,  72.5], hueFamily: 'yellow',  isNeutral: false },
  { hex: '#e11d48', name: 'Crimson',      rgb: [225, 29, 72], lab: [43.0, 60.1,  28.3], hueFamily: 'red',     isNeutral: false },
]

export function ColorIndex({
  value,
  onChange,
}: {
  value: ItemColor | null
  onChange: (color: ItemColor) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {SWATCHES.map((s) => {
        const selected = value?.hex === s.hex
        return (
          <button
            key={s.hex}
            type="button"
            title={s.name}
            aria-label={s.name}
            aria-pressed={selected}
            onClick={() =>
              onChange({
                hex: s.hex,
                rgb: s.rgb,
                lab: s.lab,
                colorName: s.name,
                hueFamily: s.hueFamily,
                isNeutral: s.isNeutral,
              })
            }
            className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
              selected
                ? s.lab[0] > 85
                  ? 'border-gray-400 scale-110'
                  : 'border-white scale-110'
                : 'border-transparent'
            }`}
            style={{ backgroundColor: s.hex }}
          />
        )
      })}
    </div>
  )
}
