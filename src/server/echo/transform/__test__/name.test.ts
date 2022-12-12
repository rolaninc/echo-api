import { nameTransformer } from '../name'
import { dateTransformer } from '../date'

describe('name transformer', () => {
  it('first name only', () => {
    const ret = nameTransformer.t!('--name')
    expect(ret).toMatch(/^\S+$/)
  })
  it('full name', () => {
    const ret = nameTransformer.t!('--name@@full')
    expect(ret).toMatch(/^\S+ \S+$/)
  })
  it('invalid format', () => {
    const invalid = `--name@full`
    const ret = dateTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = nameTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
