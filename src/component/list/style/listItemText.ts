import classNames from 'classnames'
import { computed } from 'vue'

import type { ListItemTextProps } from '../ListItemText'

export const ClassName = {
  listItemText: 'listItemText',
}

export const injectClass = (props: ListItemTextProps) => {
  return {
    [ClassName.listItemText]: computed(() => {
      return classNames(
        'flex-1',
        props.right ? 'text-right' : props.center ? 'text-center' : 'text-left'
      )
    }),
  }
}
