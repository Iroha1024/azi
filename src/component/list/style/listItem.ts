import { computed } from 'vue'
import classNames from 'classnames'

import type { ListItemProps } from '../ListItem'
import { style } from '../../../shared'
import { interactivePseudoElement } from '../../../style'

export const ClassName = {
  listItem: 'listItem',
}

export const injectStyle = ({ level }: { level: number }) => {
  return {
    [ClassName.listItem]: computed(() =>
      style({
        paddingLeft: `${0.6 + 0.8 * level}em`,
      })
    ),
  }
}

export const injectClass = (props: ListItemProps) => {
  return {
    [ClassName.listItem]: computed(() =>
      classNames(
        'flex items-center',
        'w-full',
        'pr-[0.6em] py-[0.6em]',
        'space-x-[1em]',
        interactivePseudoElement(!props.button)
      )
    ),
  }
}
