import { Transformer } from './transform'
import { generateName } from '../../../generators/gen-name'

// FORMAT:
// --name@@full
// --name

export const nameTransformer: Transformer = {
  t: (input: string) => {
    const components = input.split('@@')
    if (components.length > 0 && components.length <= 2) {
      if (components[0] === '--name') {
        if (components[1] === 'full') {
          return generateName()
        }
        return generateName(['first'])
      }
    }
    return input
  },
}
