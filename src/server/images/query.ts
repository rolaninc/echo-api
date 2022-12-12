import { BadRequest } from '../errors/bad-request'
import { isArray, isNumber } from '../../utils/types'

/*
  Query parameters of echo.images api
  see: https://github.com/tom-e-kid/echo-images
 */
type Query = {
  format?: string
  width?: number
  height?: number
  background_color?: string
  border_color?: string
  text_color?: string
  label?: string
  template?: string
}

// Create query parameters from image page's path components
export const buildQuery = (pathComponents: string[]): Query => {
  // TODO: look for more efficient way...
  let components = pathComponents
  if (
    !components ||
    !isArray(components) ||
    components.length === 0 ||
    components.length > 4
  ) {
    throw new BadRequest(`unexpected parameters`)
  }

  // get format
  const format = parseFormat(components[components.length - 1]!)
  if (format) {
    // cut format from last param
    const p = components[components.length - 1]!
    components[components.length - 1] = p.replace(/\.[^/.]+$/, '')
  }

  let height: number | undefined = undefined
  let label: string | undefined = undefined
  let colors: string[] = []

  // get width
  const width = parseSize(components[0]!)
  components = components.slice(1)

  // get height
  if (components.length > 0) {
    height = parseSize(components[0]!)
    if (height) {
      components = components.slice(1)
    }
  }

  // get color or label #1 ... these are unordered :(
  if (components.length > 0) {
    colors = parseHexColors(components[0]!)
    if (colors.length === 0) {
      label = parseLabel(components[0]!)
    }
    if (colors.length > 0 || label) {
      components = components.slice(1)
    }
  }
  // get color or label #2
  if (components.length > 0) {
    if (colors.length > 0) {
      label = parseLabel(components[0]!)
    } else if (label) {
      colors = parseHexColors(components[0]!)
    }
  }

  return {
    format,
    width,
    height,
    background_color: colors.length > 0 ? colors[0] : undefined,
    border_color: colors.length > 1 ? colors[1] : undefined,
    text_color: colors.length > 2 ? colors[2] : undefined,
    label,
    template: 'legacy',
  }
}

const parseFormat = (s: string) => {
  const components = s.split('.')
  if (components.length > 1) {
    let f = components[components.length - 1]!.toLowerCase()
    if (f === 'jpg') {
      f = 'jpeg'
    }
    return f
  }
  return undefined
}

const parseSize = (s: string) => {
  const n = +s
  if (isNumber(n) && n > 0 && n <= 2048) {
    return n
  }
  return undefined
}

const parseHexColors = (s: string) => {
  if (s.startsWith('hex_')) {
    return s.slice(4).split('_')
  }
  return []
}

const parseLabel = (s: string) => {
  if (s.length > 0) {
    return s.split('_').join(' ')
  }
  return undefined
}
