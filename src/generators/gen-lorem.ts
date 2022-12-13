import { randomInt } from '../utils/random'

const _SEEDS = {
  first: ['hello', 'hi', 'hey'],
  second: ['world', 'there'],
}

const _PUNCTUATIONS = ['.', '?', '!']

export const genLorem = (length?: number, capacity?: boolean): string => {
  let text = ''
  do {
    const t =
      ['first', 'second']
        .map((s) => {
          const seed = _SEEDS[s]
          return seed[randomInt(0, seed.length - 1)]
        })
        .join(' ') + _PUNCTUATIONS[randomInt(0, _PUNCTUATIONS.length - 1)]

    const candidate = text.length > 0 ? `${text} ${t}` : t
    if (capacity) {
      if (length !== undefined && candidate.length > length) {
        break
      }
    }
    text = candidate
    if (length !== undefined && text.length > length) {
      text = text.substring(0, length)
      break
    }
  } while (length !== undefined)
  return text
}
