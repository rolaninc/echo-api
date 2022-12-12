import { sanitizer } from '../sanitizer'

describe('sanitizer transformer', () => {
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = sanitizer.t!(text)
    expect(ret).toBe(text)
  })
})
