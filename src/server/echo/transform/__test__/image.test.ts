import { imageTransformer, urlPrefix } from '../image'

describe('image transformer', () => {
  it('image without options', () => {
    const ret = imageTransformer.t!('--image')
    expect(ret).toMatch(
      /^https?:\/\/\S+\/images\/512\/hex_([0-9a-f]{3}|[0-9a-f]{6})_([0-9a-f]{3}|[0-9a-f]{6}).jpeg$/
    )
  })
  it('image with size options', () => {
    const ret = imageTransformer.t!('--image@@256:128')
    expect(ret).toMatch(
      /^https?:\/\/\S+\/images\/256\/128\/hex_([0-9a-f]{3}|[0-9a-f]{6})_([0-9a-f]{3}|[0-9a-f]{6}).jpeg$/
    )
  })
  it('image with path options', () => {
    const path = '/512/256/hex_f00_0f0_00f.png'
    const ret = imageTransformer.t!(`--image@@${path}`)
    expect(ret).toBe(urlPrefix + '/images' + path)
  })
  it('invalid format', () => {
    const invalid = '--image@@hello:world'
    const ret = imageTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = imageTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
