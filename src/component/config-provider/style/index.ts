import { computed } from 'vue'
import classNames from 'classnames'

import type { ConfigProviderProps } from '../ConfigProvider'
import { theme, transform } from '../../../style'
import { cssVariableCaseObject, style } from '../../../shared'

export const ClassName = {
  configProvider: 'configProvider',
}

export const injectStyle = (props: ConfigProviderProps) => {
  return {
    [ClassName.configProvider]: computed(() =>
      style([
        cssVariableCaseObject(transform(theme)),
        cssVariableCaseObject(transform(props.theme)),
      ])
    ),
  }
}

export const injectClass = () => {
  return {
    [ClassName.configProvider]: computed(() =>
      classNames(
        'text-[color:var(--z-black-color)]',
        'dark:text-[color:var(--z-white-color)]'
      )
    ),
  }
}
