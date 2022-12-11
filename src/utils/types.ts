export const isObject = (v: unknown) => v?.constructor === Object

export const isArray = (v: unknown) => Array.isArray(v)

export const isString = (v: unknown) =>
  Object.prototype.toString.call(v) === '[object String]'

export const isNumber = (v: unknown) =>
  Object.prototype.toString.call(v) === '[object Number]' && !isNaN(v as number)

export const isDate = (v: unknown): boolean =>
  Object.prototype.toString.call(v) === '[object Date]'

export const objectify = (v: unknown): any | undefined =>
  isObject(v) ? v : undefined

export const arrayify = (v: unknown): unknown[] | undefined =>
  isArray(v) ? (v as unknown[]) : undefined

export const stringify = (v: unknown): string | undefined =>
  isString(v) ? (v as string) : undefined

export const numberify = (v: unknown): number | undefined =>
  isNumber(v) ? (v as number) : undefined

export const dateify = (v: unknown): Date | undefined =>
  isDate(v) ? (v as Date) : undefined
