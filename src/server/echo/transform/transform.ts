import { Types } from '../../../utils/types'

export type Content = any
export type Input = string
export type Output = any
export type Transformer = (input: Input) => Output

export const transform = (content: Content, tools: Transformer[]): Content => {
  if (Types.isNumber(content)) {
    return content
  } else if (Types.isString(content)) {
    let e = content
    for (const s of tools) {
      e = s(e)
    }
    return e
  } else if (Types.isArray(content)) {
    return content.map((c) => transform(c, tools))
  } else if (Types.isObject(content)) {
    const e = {}
    for (const [k, v] of Object.entries(content)) {
      e[k] = transform(v, tools)
    }
    return e
  }
  return undefined
}
