const _SEEDS = {
  prefix: ['example', 'test', 'dummy', 'fake', 'foo', 'bar', 'hoge'],
  suffix: ['com', 'net', 'org', 'jp', 'us', 'bz', 'pub', 'co.jp'],
}

type Seed = keyof typeof _SEEDS

export const generateDomain = (): string =>
  ['prefix', 'suffix']
    .map((s) => {
      const seed = _SEEDS[s]
      return seed[Math.floor(Math.random() * (seed.length - 1))]
    })
    .join('.')
