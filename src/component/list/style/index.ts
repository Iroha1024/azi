import { computed } from 'vue'
import classNames from 'classnames'

import type { ListProps } from '../List'
import { style } from '../../../shared'

export const ClassName = {
  list: 'list',
}

export const injectStyle = (props: ListProps) => {
  return {
    [ClassName.list]: computed(() =>
      style({
        width: `${props.width}px`,
      })
    ),
  }
}

export const injectClass = (props: ListProps) => {
  return {
    [ClassName.list]: computed(() =>
      classNames({
        'py-[0.5em]': !props.noPadding,
      })
    ),
  }
}
