import { computed } from 'vue'
import classNames from 'classnames'

import type { ArrowProps } from '../Arrow'

export const ClassName = {
  arrow: 'arrow',
}

export const injectClass = (props: ArrowProps) => {
  return {
    [ClassName.arrow]: computed(() =>
      classNames('transition-transform rotate-0', {
        'rotate-180': props.reverse,
      })
    ),
  }
}
