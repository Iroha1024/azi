import type { CSSProperties } from 'vue'

type Style = CSSProperties & {
  set?: (this: Style) => void
  value?: boolean
}

export const styles = (...args: Style[]) => {
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
  const style = args.reduce(
    (acc, curr) =>
      curr.value !== false
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
