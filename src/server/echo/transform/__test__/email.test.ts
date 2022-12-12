import { emailTransformer } from '../email'

describe('email transformer', () => {
  it('generate email using random name and domain', () => {
    const ret = emailTransformer.post!({
      email: '--email',
    }) as any
    const email = ret.email
    expect(email).toBeDefined()
    expect(email).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  })
  it('generate email using specified name and random domain', () => {
    const name = 'john'
    const ret = emailTransformer.post!({
      email: '--email@@name',
      name,
    }) as any
    const email = ret.email
    expect(email).toBeDefined()
    expect(email).toMatch(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    expect(email.startsWith(name)).toBeTruthy()
  })
  it('generate email using specified name and domain', () => {
    const ret = emailTransformer.post!({
      email: '--email@@name@test.com',
      name: 'john',
    }) as any
    const email = ret.email
    expect(email).toBeDefined()
    expect(email).toBe('john@test.com')
  })
  it('invalid format', () => {
    const invalid = '--email@test.com'
    const ret = emailTransformer.post!({
      email: invalid,
    }) as any
    expect(ret.email).toBe(invalid)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = emailTransformer.post!({
      email: text,
    }) as any
    expect(ret.email).toBe(text)
  })
})
