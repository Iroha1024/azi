import { useDark as _useDark, useToggle } from '@vueuse/core'

export const useDark = () => {
  const isDark = _useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
