import { Types } from '../../../utils/types'

const urlPrefix = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const imageTransformer = (input: string) => {
  const components = input.split('@@')
  if (components.length > 0 && components.length <= 2) {
    const prefix = components[0]
    if (prefix === '--img') {
      const suffix = components[1]
      if (suffix) {
        return `${urlPrefix}/images/${suffix}`
      }
      return `${urlPrefix}/images/512.jpg`
    }
  }
  return input
}
