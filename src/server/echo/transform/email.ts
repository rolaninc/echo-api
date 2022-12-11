import { Content, Transformer } from './transform'
import { generateName } from '../../../utils/auto-name-gen'
import { isString } from '../../../utils/types'

// FORMAT:
// --email@@[ref key]@[example.com]
// --email@@[ref key]
// --email

const defaultDomain = 'example.com'

const transformValue = (src: any, key: string, instructions: string[]) => {
  if (instructions.length === 0) {
    return generateName(['first']) + '@' + defaultDomain
  }
  if (instructions.length > 0 && instructions.length < 3) {
    let referenceValue: string | undefined = undefined
    for (const [k, v] of Object.entries(src)) {
      if (k === instructions[0]) {
        // TODO: consider reference value has whitespaces other than space char?
        referenceValue = (v as string).split(' ')[0]
        break
      }
    }
    if (referenceValue) {
      let domain = instructions[1] ?? defaultDomain
      return `${referenceValue}@${domain}`
    }
  }
  return undefined
}

export const emailTransformer: Transformer = {
  post: (input: Content) => {
    // support multiple emails
    const symbol = '--email'
    for (const [k, v] of Object.entries(input)) {
      if (isString(v) && (v as string).startsWith(symbol)) {
        const components = (v as string).split('@@')
        if (components.length > 0 && components[0] === symbol) {
          const instructions = [] as string[]
          if (components.length === 2) {
            instructions.push(...components[1]!.split('@'))
          }
          const t = transformValue(input, k, instructions)
          if (t) {
            input[k] = t
          }
        }
      }
    }
    return input
  },
}
