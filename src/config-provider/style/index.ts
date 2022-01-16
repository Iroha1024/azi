import type { ConfigProviderProps } from '../ConfigProvider'
import { theme } from '../../style'
import { prefixCaseObject, style } from '../../shared'
import { computed } from 'vue'

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
