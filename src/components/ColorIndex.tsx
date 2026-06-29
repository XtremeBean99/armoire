'use client'

import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { analyzeColor } from '@/lib/color'
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
  { hex: '#be123c', name: 'Rose',         rgb: [190, 18, 60], lab: [36.9, 55.2,  20.7], hueFamily: 'red',     isNeutral: false },
  { hex: '#047857', name: 'Emerald',      rgb: [4,  120, 87], lab: [44.8,-37.7,  12.2], hueFamily: 'green',   isNeutral: false },
  { hex: '#0369a1', name: 'Sky',          rgb: [3,  105,161], lab: [41.5, -8.4, -35.2], hueFamily: 'blue',    isNeutral: false },
  { hex: '#a16207', name: 'Amber',        rgb: [161, 98,  7], lab: [47.0, 17.0,  52.8], hueFamily: 'yellow',  isNeutral: false },
  { hex: '#b91c1c', name: 'Red',          rgb: [185, 28, 28], lab: [35.0, 51.2,  34.0], hueFamily: 'red',     isNeutral: false },
  { hex: '#fdba74', name: 'Peach',        rgb: [253,186,116], lab: [79.0, 13.5,  38.7], hueFamily: 'orange',  isNeutral: false },
  { hex: '#fcd34d', name: 'Gold',         rgb: [252,211, 77], lab: [84.8,  0.7,  63.9], hueFamily: 'yellow',  isNeutral: false },
  { hex: '#6d28d9', name: 'Violet',       rgb: [109, 40,217], lab: [32.5, 52.4, -65.8], hueFamily: 'purple',  isNeutral: false },
  { hex: '#65a30d', name: 'Lime',         rgb: [101,163, 13], lab: [62.9,-43.2,  56.4], hueFamily: 'green',   isNeutral: false },
  { hex: '#0d9488', name: 'Teal',         rgb: [13, 148,136], lab: [55.2,-34.3,  -2.0], hueFamily: 'teal',    isNeutral: false },
]

function SwatchButton({
  swatch,
  selected,
  onClick,
}: {
  swatch: typeof SWATCHES[0]
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      title={swatch.name}
      aria-label={swatch.name}
      aria-pressed={selected}
      onClick={onClick}
      className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
        selected
          ? swatch.lab[0] > 85
            ? 'border-gray-400 scale-110'
            : 'border-white scale-110'
          : 'border-transparent'
      }`}
      style={{ backgroundColor: swatch.hex }}
    />
  )
}

export function ColorIndex({
  value,
  onChange,
  label = 'Colour',
}: {
  value: ItemColor | null
  onChange: (color: ItemColor) => void
  label?: string
}) {
  const [showWheel, setShowWheel] = useState(false)

  function emitSwatch(s: typeof SWATCHES[0]) {
    onChange({
      hex: s.hex,
      rgb: s.rgb,
      lab: s.lab,
      colorName: s.name,
      hueFamily: s.hueFamily,
      isNeutral: s.isNeutral,
    })
  }

  function handlePickerChange(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    onChange(analyzeColor([r, g, b]))
  }

  return (
    <div className="space-y-4">
      {/* Picker toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowWheel(!showWheel)}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 decoration-dotted"
        >
          {showWheel ? 'Hide colour picker' : 'Show colour picker'}
        </button>
        {value && (
          <span className="flex items-center gap-1.5 text-sm text-foreground">
            <span
              className="inline-block h-4 w-4 rounded-full border border-white/10"
              style={{ backgroundColor: value.hex }}
            />
            {value.colorName || value.hex}
          </span>
        )}
      </div>

      {/* react-colorful HexColorPicker */}
      {showWheel && (
        <div className="flex justify-center">
          <div className="rounded-lg border border-border bg-surface p-3">
            <HexColorPicker
              color={value?.hex ?? '#808080'}
              onChange={handlePickerChange}
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
      )}

      {/* Preset swatches */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">{label} presets</p>
        <div className="flex flex-wrap gap-2">
          {SWATCHES.map((s) => {
            const selected = value?.hex === s.hex
            return (
              <SwatchButton
                key={s.hex}
                swatch={s}
                selected={selected}
                onClick={() => emitSwatch(s)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
