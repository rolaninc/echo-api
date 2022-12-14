import { Transformer } from './transform'
import { genCUID, genUIKey, genUUID } from '../../../generators/gen-id'

// FORMAT:
// --id@@uuid
// --id@@cuid
// --id@@ui
// --id       ... equal to --id@@ui

const _INSTRUCTIONS = {
  ui: {
    generate: genUIKey,
  },
  cuid: {
    generate: genCUID,
  },
  uuid: {
    generate: genUUID,
  },
}

export const idTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      if (components[0] === '--id') {
        const ins = components[1]
        if (ins) {
          const g = _INSTRUCTIONS[ins]
          if (g) {
            return g.generate()
          }
        } else {
          return genUIKey()
        }
      }
    }
    return input
  },
}
