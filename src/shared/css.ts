import type { CSSProperties } from 'vue'

import type { Theme, Variable } from '../style'
import type { MaybeArray } from './type'
import { hasOwnProperty } from './common'
import { prefix } from '../style'

type Style = CSSProperties &
  Partial<CssVariableCaseObject<Theme & Record<Variable, string>>> & {
    set?: (this: Style) => void
    value?: boolean
  }

export const style = (
  value: MaybeArray<Style>
): Omit<Style, 'set' | 'value'> => {
  {
    const call = (acc: Style, curr: Style) => {
      curr.set!.call(acc)
      return acc
    }
    const merge = (acc: Style, curr: Style) => {
      for (const key in curr) {
        if (curr[key] !== undefined) {
          acc[key] = curr[key]
        }
      }
      return acc
    }

    let list = value
    if (!Array.isArray(list)) {
      list = [list]
    }
    const style = list.reduce(
      (acc, curr) =>
        !hasOwnProperty(curr, 'value') || curr.value
          ? curr.set
            ? call(acc, curr)
            : merge(acc, curr)
          : acc,
      {}
    )
    delete style.set
    delete style.value
    return style
  }
}

export type Preix<T extends string> = `${typeof prefix}-${T}`
export type CssVariable<T extends string> = `--${Preix<T>}`

export const cssVar = (
  str: CssVariableCase<keyof Theme | Variable>
): `var(${typeof str})` => `var(${str})`

export type KebabCase<T extends string> = T extends `${infer F}${infer R}`
  ? F extends Lowercase<F>
    ? `${F}${KebabCase<R>}`
    : `-${Lowercase<F>}${KebabCase<R>}`
  : ''

export const kebabCase = <T extends string>(v: T): KebabCase<T> => {
  let str = ''
  for (const char of v) {
    str +=
      char === char.toLocaleLowerCase() ? char : `-${char.toLocaleLowerCase()}`
  }
  return str as any
}

type CssVariableCase<T extends string> = CssVariable<KebabCase<T>>

//babel-auto-bind-style use
export const prefixCase = (key: string): Preix<KebabCase<typeof key>> =>
  `${prefix}-${kebabCase(key)}`

export type CssVariableCaseObject<T extends Record<string, string>> = {
  [K in keyof T as CssVariableCase<Extract<K, string>>]: string
}

export const cssVariableCaseObject = <T extends Record<string, string>>(
  v: T
): CssVariableCaseObject<T> => {
  const o: any = {}
  for (const key in v) {
    o[`--${prefixCase(key)}`] = v[key]
  }
  return o
}
