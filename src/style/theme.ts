export const theme = {
  primaryColor: '#8B5CF6', //theme('colors.violet.500')
  errorColor: '#EF4444', //theme('colors.red.500'
  disabledColor: '#9CA3AF', //theme('colors.gray.400')
  fontWhiteColor: '#F9FAFB', //theme('colors.gray.50')
  fontBlackColor: '#111827', //theme('colors.gray.900')
}

const prefix = 'z'

export type Theme = typeof theme

export type ThemePreix<T extends string> = `--${typeof prefix}-${T}`

export type VarCase<T extends string> = T extends `${infer F}${infer R}`
  ? F extends Lowercase<F>
    ? `${F}${VarCase<R>}`
    : `-${Lowercase<F>}${VarCase<R>}`
  : ''

export type VarCaseObject<T extends Record<string, string>> = {
  [K in ThemePreix<VarCase<Extract<keyof T, string>>>]: string
}

export const varCase = <T extends Record<string, string>>(
  v: T
): VarCaseObject<T> => {
  const o = {}
  for (const k in v) {
    let key = `--${prefix}-`
    for (const char of k) {
      key +=
        char === char.toLocaleLowerCase()
          ? char
          : `-${char.toLocaleLowerCase()}`
    }
    o[key] = v[k]
  }
  return o as any
}
