import { Types } from '../../../utils/types'

const url = process.env.IMAGES_URL ?? 'http://localhost:3000/images'

export const imageTransformer = (input: string) => {
  const components = input.split('@@')
  if (components.length > 0 && components.length <= 2) {
    const prefix = components[0]
    if (prefix === '--img') {
      const suffix = components[1]
      if (suffix) {
        return `${url}/${suffix}`
      }
      return `${url}/512.jpg`
    }
  }
  return input
}
