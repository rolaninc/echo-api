import { Transformer } from './transform'

// FORMAT:
// --img@@[width]/[height]/[hex_background_border_text].[format]
// --img

const urlPrefix = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const imageTransformer: Transformer = {
  transform: (input: string) => {
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
  },
}
