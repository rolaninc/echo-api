export const Types = {
  isObject(v: any): boolean {
    return v?.constructor === Object
  },

  isArray(v: any): boolean {
    return Array.isArray(v)
  },

  isString(v: any): boolean {
    return Object.prototype.toString.call(v) === '[object String]'
  },

  isNumber(v: any): boolean {
    return Object.prototype.toString.call(v) === '[object Number]' && !isNaN(v)
  },

  isDate(v: any): boolean {
    return Object.prototype.toString.call(v) === '[object Date]'
  },
}
