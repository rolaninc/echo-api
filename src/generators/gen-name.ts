import { randomInt } from '../utils/random'

const _SEEDS = {
  first: [
    'mary',
    'james',
    'patricia',
    'robert',
    'jennifer',
    'john',
    'linda',
    'michael',
    'elizabeth',
    'david',
    'barbara',
    'william',
    'susan',
    'richard',
    'jessica',
    'joseph',
    'sarah',
    'thomas',
    'karen',
    'charles',
  ],
  last: [
    'smith',
    'johnson',
    'williams',
    'brown',
    'jones',
    'garcia',
    'miller',
    'davis',
    'rodriguez',
    'martinez',
    'hernandez',
    'lopez',
    'gonzalez',
    'wilson',
    'anderson',
    'thomas',
    'taylor',
    'moor',
    'jackson',
    'martin',
  ],
}

type Seed = keyof typeof _SEEDS

export const generateName = (
  seeds: Seed[] = ['first', 'last'],
  sep: string = ' '
): string =>
  seeds
    .map((s) => {
      const seed = _SEEDS[s]
      return seed[randomInt(0, seed.length - 1)]
    })
    .join(sep)
