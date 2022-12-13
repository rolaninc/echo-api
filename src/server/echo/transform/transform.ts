import {
  arrayify,
  isString,
  numberify,
  objectify,
  stringify,
} from '../../../utils/types'

export type Content =
  | string
  | string[]
  | number
  | number[]
  | { [key: string]: any }
  | { [key: string]: any }[]

export type Transformer = {
  t?: (input: string) => Content
  pre?: (input: Content) => Content
  post?: (input: Content) => Content
}

export const transform = (content: Content, tools: Transformer[]) => {
  // number
  const num = numberify(content)
  if (num) {
    return num
  }
  // array
  const array = arrayify(content)
  if (array) {
    return array.map((c) => transform(c as Content, tools))
  }
  // string
  const str = stringify(content)
  if (str) {
    let mutated = str
    for (const t of tools) {
      if (t.t) {
        const out = t.t(mutated)
        if (isString(out)) {
          mutated = out as string
        } else {
          return out
        }
      }
    }
    return mutated
  }
  // object
  const obj = objectify(content)
  if (obj) {
    // pre process
    let preprocessed = obj
    for (const t of tools) {
      if (t.pre) {
        preprocessed = t.pre(preprocessed)
      }
    }
    // transform object
    let mutated = {}
    for (const [k, v] of Object.entries(preprocessed)) {
      mutated[k] = transform(v as Content, tools)
    }
    // post process
    for (const t of tools) {
      if (t.post) {
        mutated = t.post(mutated)
      }
    }
    return mutated
  }
  return undefined
}
