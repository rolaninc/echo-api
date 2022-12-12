import { Transformer } from './transform'
import { iso8601, unix } from '../../../utils/date'
import { isNumber } from '../../../utils/types'

// FORMAT:
// --unix@@[offset from server current date]
// --unix
// --iso@@[offset from server current date]
// --iso
// TODO: want to be able to parse various offset formats such as '1d'

const _SYMBOLS = {
  '--unix': {
    transform: unix,
  },
  '--iso': {
    transform: iso8601,
  },
}

export const dateTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      const prefix = components[0]
      if (prefix && Object.keys(_SYMBOLS).includes(prefix)) {
        let offset = 0
        const suffix = components[1]
        if (suffix && isNumber(+suffix)) {
          offset = +suffix * 1000
        }
        const d = new Date()
        d.setTime(d.getTime() + offset)
        return _SYMBOLS[prefix].transform(d)
      }
    }
    return input
  },
}
