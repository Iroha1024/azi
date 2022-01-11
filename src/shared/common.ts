const toString = (obj: any) => Object.prototype.toString.call(obj)

export const hasOwnProperty = (val: any, k: PropertyKey) =>
  Object.prototype.hasOwnProperty.call(val, k)

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPlainObject = (val: unknown): val is object =>
  toString(val) === '[object Object]'
