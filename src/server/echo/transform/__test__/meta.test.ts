import { metaTransformer } from '../meta'

describe('meta transformer', () => {
  it('meta > users', () => {
    const data = {
      __meta__: {
        users: {
          l: {
            count: 10,
          },
        },
      },
      users: 'users',
    }
    const ret = metaTransformer.pre!(data) as any
    expect(ret.users).toHaveLength(10)
    expect(ret.__meta__).toBeUndefined()
  })
  it('meta > invalid target', () => {
    const data = {
      __meta__: {
        invalid: {
          l: {
            count: 10,
          },
        },
      },
      users: 'users',
    }
    const ret = metaTransformer.pre!(data) as any
    expect(Object.entries(ret)).toHaveLength(1)
    expect(ret.users).toBe('users')
    expect(ret.__meta__).toBeUndefined()
  })
  it('meta > invalid format', () => {
    const data = {
      __meta__: 'meta',
      users: 'users',
    }
    const ret = metaTransformer.pre!(data) as any
    expect(Object.entries(ret)).toHaveLength(1)
    expect(ret.users).toBe('users')
    expect(ret.__meta__).toBeUndefined()
  })
  it('uninteresting value', () => {
    const data = {
      users: 'users',
    }
    const ret = metaTransformer.pre!(data) as any
    expect(ret.users).toBe('users')
  })
})
