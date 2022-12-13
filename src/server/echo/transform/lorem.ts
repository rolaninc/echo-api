import { Transformer } from './transform'
import { genLorem } from '../../../generators/gen-lorem'
import { numberify } from '../../../utils/types'
import { randomInt } from '../../../utils/random'

// FORMAT:
// --lorem@@LENGTH!  ... text length will be equal to LENGTH
// --lorem@@LENGTH   ... text may not have its size LENGTH, but it will end with punctuation
// --lorem@@MIN:MAX! ... text length will be between MIN and MAX
// --lorem@@MIN:MAX  ... text length will be between MIN and MAX, and it also ends with punctuation
// --lorem

const parseInstructions = (i: string) => {
  let ins = i
  let capacity = true
  if (ins.endsWith('!')) {
    capacity = false
    ins = ins.slice(0, -1)
  }
  if (ins.includes(':')) {
    const range = ins.split(':')
    if (range.length === 2) {
      const min = numberify(+range[0]!)
      const max = numberify(+range[1]!)
      if (min !== undefined && max !== undefined && max >= min) {
        return { len: randomInt(min, max), capacity }
      }
    }
  } else {
    const len = numberify(+ins)
    if (len) {
      return { len, capacity }
    }
  }
  return undefined
}

export const loremTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      if (components[0] === '--lorem') {
        let ins = components[1]
        if (ins) {
          const params = parseInstructions(ins)
          if (params) {
            return genLorem(params.len, params.capacity)
          }
        } else {
          return genLorem()
        }
      }
    }
    return input
  },
}
