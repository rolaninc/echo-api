import { genLorem } from '../gen-lorem'

describe('lorem generator', () => {
  it('default', () => {
    const ret = genLorem()
    expect(ret).toMatch(/^\S.+[.?!]$/)
  })

  it('set length', () => {
    const ret = genLorem(500)
    expect(ret).toMatch(/^\S.+/)
    expect(ret).toHaveLength(500)
  })

  it('set capacity', () => {
    const ret = genLorem(1024, true)
    expect(ret).toMatch(/^\S.+[.?!]$/)
  })

  it('set length zero', () => {
    const ret = genLorem(0)
    expect(ret).toBe('')
  })

  it('set capacity zero', () => {
    const ret = genLorem(0)
    expect(ret).toBe('')
  })
})
