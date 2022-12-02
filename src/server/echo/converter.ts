export type Content = {
  [key: string]: any
}
export type Converter = (input: Content) => Content

export const convert = (content: Content, converters: Converter[]): Content => {
  let editing = { ...content }
  for (const c of converters) {
    editing = c(editing)
  }
  return editing
}
