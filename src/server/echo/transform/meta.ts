import { Content, Transformer } from './transform'
import { isObject } from '../../../utils/types'

type Instruction = {
  l?: {
    count?: number
    page?: boolean | 'last'
  }
}

const mutate = (src: any, k: string, i: Instruction) => {
  if (i?.l?.count && i.l.count > 0) {
    const obj = src[k]
    src[k] = new Array(i.l.count).fill(obj)
  }
}

export const metaTransformer: Transformer = {
  pre: (input: Content) => {
    // support multiple emails
    const symbol = '__meta__'
    for (const [k, v] of Object.entries(input)) {
      if (k === symbol) {
        if (isObject(v)) {
          const keys = Object.keys(input)
          for (const [mk, mv] of Object.entries(v as any)) {
            if (keys.includes(mk)) {
              mutate(input, mk, mv as Instruction)
            }
          }
        }
        delete input[k]
      }
    }
    return input
  },
}
