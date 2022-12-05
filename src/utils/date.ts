export const unix = (d: Date) => Math.floor(d.getTime() / 1000)
export const iso8601 = (d: Date) => d.toISOString()
