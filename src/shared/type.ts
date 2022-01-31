export type MaybeArray<T> = T | Array<T>

export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer P) => any
  ? P
  : never

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
