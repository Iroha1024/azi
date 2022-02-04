import { computed } from 'vue'
import classNames from 'classnames'

import type { CollapseProps } from '../Collapse'

export const ClassName = {
  collapse: 'collapse',
  collapseContent: 'collapseContent',
}

export const injectClass = (props: CollapseProps) => {
  return {
    [ClassName.collapseContent]: computed(() =>
      classNames({
        'p-[1em]': !props.noPadding,
      })
    ),
  }
}
