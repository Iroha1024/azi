import { computed } from 'vue'
import classNames from 'classnames'

import type { IconProps } from '../Icon'
import { style } from '../../../shared'
import { sizeX1 } from '../../../style'

export const ClassName = {
  icon: 'icon',
}

export const injectStyle = (props: IconProps) => {
  return {
    [ClassName.icon]: computed(() =>
      style({
        fontSize: props.size + 'px',
      })
    ),
  }
}

export const injectClass = () => {
  return {
    [ClassName.icon]: computed(() =>
      classNames(sizeX1, 'inline-block', 'text-center', 'leading-[0]')
    ),
  }
}
