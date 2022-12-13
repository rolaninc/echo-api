import { randomInt } from '../utils/random'

const _SEEDS = {
  prefix: ['example', 'test', 'dummy', 'fake', 'foo', 'bar', 'hoge'],
  suffix: ['com', 'net', 'org', 'jp', 'us', 'bz', 'pub', 'co.jp'],
}

export const generateDomain = (): string =>
  ['prefix', 'suffix']
    .map((s) => {
      const seed = _SEEDS[s]
      return seed[randomInt(0, seed.length - 1)]
    })
    .join('.')
