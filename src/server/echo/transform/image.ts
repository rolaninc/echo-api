import { Transformer } from './transform'
import { rgbToHex } from '../../../utils/color'
import { randomInt } from '../../../utils/random'
import { numberify } from '../../../utils/types'

// FORMAT:
// --image@@/[width]/[height]/[hex_background_border_text]/[label].[format]
// --image@@[width]:[height]
// --image

export const urlPrefix = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

const randomHexComponent = () => {
  const hex = rgbToHex({
    red: randomInt(0, 255),
    green: randomInt(0, 255),
    blue: randomInt(0, 255),
  }).slice(1)
  return `hex_${hex}_${hex}`
}

const parseInstruction = (i: string) => {
  if (i.startsWith('/')) {
    return i
  }
  const size = i.split(':')
  const hex = randomHexComponent()
  if (size.length === 1) {
    const width = numberify(+(size[0] ?? 'nan'))
    if (width !== undefined) {
      return `/${width}/${hex}.jpeg`
    }
  } else if (size.length === 2) {
    const width = numberify(+(size[0] ?? 'nan'))
    const height = numberify(+(size[1] ?? 'nan'))
    if (width !== undefined && height !== undefined) {
      return `/${width}/${height}/${hex}.jpeg`
    }
  }
  return undefined
}

export const imageTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      if (components[0] === '--image') {
        const ins = components[1]
        if (ins) {
          const path = parseInstruction(ins)
          if (path) {
            return `${urlPrefix}/images${path}`
          }
        } else {
          return `${urlPrefix}/images/512/${randomHexComponent()}.jpeg`
        }
      }
    }
    return input
  },
}
