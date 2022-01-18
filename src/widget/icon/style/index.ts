import { computed } from 'vue'
import classNames from 'classnames'

import type { IconProps } from '../Icon'
import { style } from '../../../shared'

export const ClassName = {
  icon: 'icon',
}

export const injectStyle = (props: IconProps) => {
  return {
    [ClassName.icon]: computed(() =>
      style({
        fontSize: props.size + 'px',
        width: '1em',
        height: '1em',
      })
    ),
  }
}

export const injectClass = () => {
  return {
    [ClassName.icon]: computed(() =>
      classNames('inline-block', 'text-center', 'leading-0')
    ),
  }
}
