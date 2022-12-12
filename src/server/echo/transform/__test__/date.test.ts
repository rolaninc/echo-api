import { dateTransformer } from '../date'
import {
  approximate,
  dateFromIso8601,
  dateFromUnix,
} from '../../../../utils/date'

describe('date transformer', () => {
  const date = new Date()
  const secsOfWeek = 604800

  it('unix timestamp > current date', () => {
    const ret = dateTransformer.t!('--unix')
    expect(typeof ret).toBe('number')
    expect(approximate(dateFromUnix(+ret), date, 1000)).toBeTruthy()
  })
  it('unix timestamp > one week after', () => {
    const d = new Date(date.getTime() + secsOfWeek * 1000)
    const ret = dateTransformer.t!(`--unix@@${secsOfWeek}`)
    expect(typeof ret).toBe('number')
    expect(approximate(dateFromUnix(+ret), d, 1000)).toBeTruthy()
  })
  it('unix timestamp > one week before', () => {
    const d = new Date(date.getTime() - secsOfWeek * 1000)
    const ret = dateTransformer.t!(`--unix@@-${secsOfWeek}`)
    expect(typeof ret).toBe('number')
    expect(approximate(dateFromUnix(+ret), d, 1000)).toBeTruthy()
  })
  it('unix timestamp > invalid format', () => {
    const invalid = `--unix@${secsOfWeek}`
    const ret = dateTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })

  it('iso 8601 > current date', () => {
    const ret = dateTransformer.t!('--iso')
    expect(approximate(dateFromIso8601(ret), date, 1000)).toBeTruthy()
  })
  it('iso 8601 > one week after', () => {
    const d = new Date(date.getTime() + secsOfWeek * 1000)
    const ret = dateTransformer.t!(`--iso@@${secsOfWeek}`)
    expect(approximate(dateFromIso8601(ret), d, 1000)).toBeTruthy()
  })
  it('iso 8601 > one week before', () => {
    const d = new Date(date.getTime() - secsOfWeek * 1000)
    const ret = dateTransformer.t!(`--iso@@-${secsOfWeek}`)
    expect(approximate(dateFromIso8601(ret), d, 1000)).toBeTruthy()
  })
  it('iso 8601 > invalid format', () => {
    const invalid = `--iso@${secsOfWeek}`
    const ret = dateTransformer.t!(invalid)
    expect(ret).toBe(invalid)
  })
  it('uninteresting value', () => {
    const text = 'hello'
    const ret = dateTransformer.t!(text)
    expect(ret).toBe(text)
  })
})
