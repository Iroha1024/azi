import { computed } from 'vue'

import type { EllipsisProps } from '../Ellipsis'
import { style } from '../../../shared'

export const ClassName = {
  ellipsis: 'ellipsis',
}

export const injectStyle = (props: EllipsisProps) => {
  return {
    [ClassName.ellipsis]: computed(() =>
      style({
        display: '-webkit-box',
        '-webkit-line-clamp': props.lineClamp,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        value: props.lineClamp !== 0,
      })
    ),
  }
}
