import { loremTransformer } from '../lorem'
import { stringify } from '../../../../utils/types'

describe('lorem transformer', () => {
  it('text without options', () => {
    const text = '--lorem'
    const ret = loremTransformer.t!(text)
    expect(ret).toMatch(/^\S.+[.?!]$/)
  })
  it('text with length', () => {
    const text = '--lorem@@1024!'
    const ret = loremTransformer.t!(text)
    expect(ret).toHaveLength(1024)
  })
  it('text with capacity', () => {
    const text = '--lorem@@1024'
    const ret = loremTransformer.t!(text)
    expect(ret).toMatch(/^\S.+[.?!]$/)
  })
  it('text with random length', () => {
    const text = '--lorem@@512:1024!'
    const ret = stringify(loremTransformer.t!(text)) ?? ''
    expect(ret.length >= 512 && ret.length <= 1024).toBeTruthy()
  })
  it('text with random capacity', () => {
    const text = '--lorem@@512:1024'
    const ret = stringify(loremTransformer.t!(text)) ?? ''
    expect(ret.length >= 512 && ret.length <= 1024).toBeTruthy()
    expect(ret).toMatch(/^\S.+[.?!]$/)
  })
  it('text with random capacity', () => {
    const text = '--lorem@@:1024'
    const ret = stringify(loremTransformer.t!(text)) ?? ''
    expect(ret.length >= 0 && ret.length <= 1024).toBeTruthy()
  })
  it('invalid format', () => {
    const invalid = '--lorem@@1024:'
    const ret = loremTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })

  it('uninteresting value', () => {
    const text = 'hello'
    const ret = loremTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
