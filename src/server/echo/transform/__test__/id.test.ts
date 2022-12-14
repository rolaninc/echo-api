import { idTransformer } from '../id'
import { stringify } from '../../../../utils/types'

describe('id transformer', () => {
  it('input without instruction', () => {
    const input = '--id'
    const id = stringify(idTransformer.t!(input))
    expect(id).toBeDefined()
    expect(id).not.toEqual(input)
  })

  it('input with ui key', () => {
    const input = '--id@@ui'
    const id = stringify(idTransformer.t!(input))
    expect(id).toBeDefined()
    expect(id).not.toEqual(input)
  })

  it('input with cuid', () => {
    const input = '--id@@cuid'
    const id = stringify(idTransformer.t!(input))
    expect(id).toBeDefined()
    expect(id).not.toEqual(input)
    expect(id!.startsWith('c')).toBeTruthy()
  })

  it('input with uuid', () => {
    const input = '--id@@uuid'
    const id = stringify(idTransformer.t!(input))
    expect(id).toBeDefined()
    expect(id).not.toEqual(input)
    expect(id).toMatch(
      /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/
    )
  })

  it('input invalid instruction', () => {
    const input = '--id@@uid' // oops not uuid or ui
    const id = stringify(idTransformer.t!(input))
    expect(id).toBe(input)
  })

  it('input uninteresting value', () => {
    const input = 'hello'
    const id = stringify(idTransformer.t!(input))
    expect(id).toBe(input)
  })
})
