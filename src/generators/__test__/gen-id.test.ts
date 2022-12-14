import { genCUID, genUIKey, genUUID } from '../gen-id'
import { stringify } from '../../utils/types'

describe('id generator', () => {
  it('ui key generator', () => {
    const id = stringify(genUIKey())
    expect(id).toBeDefined()
    for (let i = 0; i < 100; i++) {
      const test = genUIKey()
      expect(test).not.toEqual(id)
    }
  })

  it('cuid generator', () => {
    const id = stringify(genCUID())
    expect(id).toBeDefined()
    expect(id!.startsWith('c')).toBeTruthy()
    for (let i = 0; i < 100; i++) {
      const test = genCUID()
      expect(test).not.toEqual(id)
    }
  })

  it('uuid generator', () => {
    const id = stringify(genUUID())
    expect(id).toBeDefined()
    expect(id).toMatch(
      /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/
    )
    for (let i = 0; i < 100; i++) {
      const test = genUUID()
      expect(test).not.toEqual(id)
    }
  })
})
