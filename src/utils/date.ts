export const unix = (d: Date) => Math.floor(d.getTime() / 1000)
export const dateFromUnix = (unix: number) => new Date(unix * 1000)
export const iso8601 = (d: Date) => d.toISOString()
export const dateFromIso8601 = (iso: string) => new Date(Date.parse(iso))

export const approximate = (d: Date, t: Date, msecs: number) => {
  const begin = new Date(t.getTime() - msecs)
  const end = new Date(t.getTime() + msecs)
  return d >= begin && d <= end
}
