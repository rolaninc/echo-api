import { Types } from '../../../utils/types'
import { iso8601, unix } from '../../../utils/date'

// FORMAT: symbol*offset(sec) ex: '--unix*-86400'
// TODO: want to be able to parse various offset formats such as '1d'

const _SYMBOLS = {
  '--unix': {
    transform: unix,
  },
  '--iso': {
    transform: iso8601,
  },
}

export const dateTransformer = (input: string) => {
  const components = input.split('@@')
  if (components.length > 0 && components.length <= 2) {
    const prefix = components[0]
    if (prefix && Object.keys(_SYMBOLS).includes(prefix)) {
      let offset = 0
      const suffix = components[1]
      if (suffix && Types.isNumber(+suffix)) {
        offset = +suffix * 1000
      }
      const d = new Date()
      d.setTime(d.getTime() + offset)
      return _SYMBOLS[prefix].transform(d)
    }
  }
  return input
}
