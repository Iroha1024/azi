import { computed } from 'vue'

import type { ListProps } from '../List'
import { cssVar, style } from '../../../shared'

export const ClassName = {
  list: 'list',
}

export type Variable = 'listPadding'

export const injectStyle = (props: ListProps) => {
  return {
    [ClassName.list]: computed(() =>
      style([
        {
          width: `${props.width}px`,
          '--z-list-padding': '0.5em',
        },
        {
          padding: `${cssVar('--z-list-padding')} 0`,
          value: !props.noPadding,
        },
      ])
    ),
  }
}
