import { imageTransformer, urlPrefix } from '../image'

describe('image transformer', () => {
  it('without path', () => {
    const ret = imageTransformer.t!('--img')
    expect(ret).toBe(urlPrefix + '/images/512.jpeg')
  })
  it('without path', () => {
    const path = '/512/256/hex_f00_0f0_00f.png'
    const ret = imageTransformer.t!(`--img@@${path}`)
    expect(ret).toBe(urlPrefix + '/images' + path)
  })
  it('invalid format', () => {
    const invalid = '--img@/hello/world'
    const ret = imageTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = imageTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
