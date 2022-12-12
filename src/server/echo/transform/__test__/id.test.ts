import { idTransformer } from '../id'

describe('id transformer', () => {
  it('generate id', () => {
    const ret1 = idTransformer.t!('--id')
    const ret2 = idTransformer.t!('--id')
    expect(ret1).toBeTruthy()
    expect(ret2).toBeTruthy()
    expect(ret1).not.toEqual(ret2)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = idTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
