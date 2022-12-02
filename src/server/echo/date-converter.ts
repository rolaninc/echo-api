import { Content } from './converter'

const DateStyle = {
  Timestamp: '__TS__',
  Unix: '__UNIX__',
  Iso8601: '__ISO__',
} as const
export type DateStyle = typeof DateStyle[keyof typeof DateStyle]

export const dateConverter = (input: Content) => {
  // TODO: implement it!
  return { ...input }
}
