export type RGB = {
  red: number
  green: number
  blue: number
}

export const rgbToHex = ({ red, green, blue }: RGB) =>
  '#' + [red, green, blue].map((v) => v.toString(16).padStart(2, '0')).join('')

export const hexToRGB = (hex: string) => {
  const components = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (t, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((v) => parseInt(v, 16))
  if (components && components.length === 3) {
    return {
      red: components[0]!,
      green: components[1]!,
      blue: components[2]!,
    }
  }
  return undefined
}

export const getContrastRGB = ({ red, green, blue }: RGB) => {
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255
  if (luminance > 0.5) {
    return { red: 0, green: 0, blue: 0 }
  }
  return { red: 255, green: 255, blue: 255 }
}

export const getContrastHex = (hex: string) => {
  const pre = hexToRGB(hex)
  if (pre) {
    return rgbToHex(getContrastRGB(pre))
  }
  return undefined
}

// thanks to:
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
// https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
