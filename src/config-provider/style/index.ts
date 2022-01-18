import type { ConfigProviderProps } from '../ConfigProvider'
import { theme } from '../../style'
import { prefixCaseObject, style } from '../../shared'
import { computed } from 'vue'
import classNames from 'classnames'

export const ClassName = {
  configProvider: 'configProvider',
}

export const injectStyle = (props: ConfigProviderProps) => {
  return {
    [ClassName.configProvider]: computed(() =>
      style([prefixCaseObject(theme), prefixCaseObject(props.theme)])
    ),
  }
}

export const injectClass = () => {
  return {
    [ClassName.configProvider]: computed(() =>
      classNames(
        'text-[color:var(--z-font-black-color)]',
        'dark:text-[color:var(--z-font-white-color)]'
      )
    ),
  }
}
