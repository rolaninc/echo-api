import { arrayify, numberify, objectify, stringify } from '../../../utils/types'

export type Content =
  | string
  | string[]
  | number
  | number[]
  | { [key: string]: any }
  | { [key: string]: any }[]

export type Transformer = {
  transform?: (input: string) => string
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
      if (t.transform) {
        mutated = t.transform(mutated)
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

  // if (Types.isNumber(content)) {
  //   return content
  // } else if (Types.isString(content)) {
  //   let str = stringify(content)
  //   for (const t of tools) {
  //     if (t.transform) {
  //       str = t.transform(str)
  //     }
  //   }
  //   return str
  // } else if (Types.isArray(content)) {
  //   return (content as unknown[]).map((c) => transform(c, tools))
  // } else if (Types.isObject(content)) {
  //   // pre object transform
  //   let m = content
  //   for (const t of tools.filter((t) => t.t === 'pre')) {
  //     m = t.transform(m)
  //   }
  //   let e = {}
  //   for (const [k, v] of Object.entries(m)) {
  //     e[k] = transform(v, tools)
  //   }
  //   // post object transform
  //   for (const t of tools.filter((t) => t.t === 'post')) {
  //     e = t.transform(e)
  //   }
  //   return e
  // }
  // return undefined
}
