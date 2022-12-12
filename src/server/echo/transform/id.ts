import { Transformer } from './transform'
import { generateUIKey } from '../../../utils/auto-id-gen'

// FORMAT:
// --id@@[T.B.D.]
// --id

export const idTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      if (components[0] === '--id') {
        // TODO: components[1] options
        return generateUIKey()
      }
    }
    return input
  },
}
