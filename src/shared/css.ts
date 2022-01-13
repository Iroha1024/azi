import { computed, ComputedRef, CSSProperties } from 'vue'

import { hasOwnProperty, isObject } from './common'
import type { VarCase, Theme, ThemePreix, VarCaseObject } from '../style'
import type { Spread } from './type'

type Style = Spread<
  [
    CSSProperties,
    Partial<VarCaseObject<Theme>>,
    {
      set?: (this: Style) => void
      value?: boolean
    }
  ]
>

type MaybeArray<T> = T | Array<T>
type FnReturn<R> = () => R

type MixStyle = { [name: string]: MaybeArray<Style> }

function useStyle<O extends MaybeArray<Style>>(
  valueFn: FnReturn<O>
): ComputedRef<Omit<Style, 'set' | 'value'>>

function useStyle<O extends MixStyle>(
  valueFn: FnReturn<O>,
  key: string
): ComputedRef<Omit<Style, 'set' | 'value'>>

function useStyle(
  valueFn: FnReturn<MixStyle> | FnReturn<MaybeArray<Style>>,
  key?: string
) {
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

    return computed(() => {
      let list = (
        typeof key === 'string' ? valueFn()[key] : valueFn()
      ) as MaybeArray<Style>
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
    })
  }
}

export function useStyles<O extends MaybeArray<Style>>(
  valueFn: FnReturn<O>
): ReturnType<typeof useStyle>

export function useStyles<O extends MixStyle>(
  valueFn: FnReturn<O>
): { [K in keyof O]: ReturnType<typeof useStyle> }

export function useStyles(
  valueFn: FnReturn<MixStyle> | FnReturn<MaybeArray<Style>>
) {
  const value = valueFn()

  const isShallowObject = (obj: Record<string, unknown>) => {
    for (const key in obj) {
      if (isObject(obj[key])) {
        return false
      }
    }
    return true
  }

  if (Array.isArray(value) || isShallowObject({ ...value })) {
    return useStyle(valueFn as FnReturn<MaybeArray<Style>>)
  } else {
    const obj: any = {}
    for (const key in value) {
      obj[key] = useStyle(valueFn as FnReturn<MixStyle>, key)
    }
    return obj
  }
}

export const cssVar = <T extends Record<string, string> = Theme>(
  str: ThemePreix<VarCase<Extract<keyof Spread<[Theme, T]>, string>>>
): `var(${typeof str})` => `var(${str})`
