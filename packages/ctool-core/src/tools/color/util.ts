import { RgbColor } from 'colord'

const ensure = (v: number, min: number = 0, max: number = 255) => {
  if (Number.isNaN(v)) v = 0
  return Math.max(min, Math.min(max, v))
}

const normalizeRGB = (color: RgbColor) => {
  const { r, g, b } = color
  return  {
    r: Number(ensure(r) / 255).toFixed(5),
    g: Number(ensure(g) / 255).toFixed(5),
    b: Number(ensure(b) / 255).toFixed(5),
  }
}

export const normalized2RGB = (color: string) => {
  const [r, g, b] = color.split(',').map(v => ensure(Number(v), 0, 1))
  return { 
    r: r * 255,
    g: g * 255,
    b: b * 255,
  }  
}

export const normalizeRGBStringify = (color: RgbColor) => {
  const { r, g, b } = normalizeRGB(color)
  return `${r}, ${g}, ${b}`
}