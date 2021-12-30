import type { CSSProperties } from 'vue'

type Style = CSSProperties & {
  fn?: (this: Style) => void
  value?: boolean
}

export const styles = (...args: Style[]) => {
  const call = (acc: Style, curr: Style) => {
    curr.fn!.call(acc)
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
        ? curr.fn
          ? call(acc, curr)
          : merge(acc, curr)
        : acc,
    {}
  )
  delete style.fn
  delete style.value
  return style
}
