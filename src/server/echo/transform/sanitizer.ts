import { Transformer } from './transform'

// This is the last place to protect the app from something invalid values
export const sanitizer: Transformer = {
  transform: (input: string) => {
    return input
  },
}
