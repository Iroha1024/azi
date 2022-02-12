import type { DeepPartial, UnionToIntersection } from '../shared'

export const theme = {
  color: {
    primary: '#8B5CF6', //theme('colors.violet.500')
    error: '#EF4444', //theme('colors.red.500'
    disabled: '#9CA3AF', //theme('colors.gray.400')
    white: '#F9FAFB', //theme('colors.gray.50')
    black: '#111827', //theme('colors.gray.900')
  },
  size: {
    small: '12px',
    medium: '16px',
    large: '20px',
    xLarge: '24px',
    xxLarge: '28px',
    xxxLarge: '32px',
  },
}

export const prefix = 'z'

export type OriginalTheme = typeof theme

export type Theme = UnionToIntersection<
  {
    [K in keyof OriginalTheme]: {
      [T in keyof OriginalTheme[K] as CombineKey<Extract<T, string>, K>]: string
    }
  }[keyof OriginalTheme]
>

type CombineKey<L extends string, R extends string> = `${L}${Capitalize<R>}`

export const transform = (theme: DeepPartial<OriginalTheme>): Theme => {
  const obj = {} as any
  for (const scope in theme) {
    for (const key in theme[scope]) {
      const [f, ...r] = scope
      const k = key + f.toUpperCase() + r.join('')
      obj[k] = theme[scope][key]
    }
  }
  return obj
}
