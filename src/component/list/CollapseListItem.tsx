import { defineComponent, getCurrentInstance } from 'vue'
import type { ExtractPropTypes } from 'vue'

import ZListItem, { props as zListItemProps } from './ListItem'
import { ZCollapse } from '../collapse'
import { props as zCollapseProps } from '../collapse/Collapse'
import { ZArrow } from '../../widget'

const props = {
  ...zListItemProps,
  ...zCollapseProps,
}

export type CollapseListItemProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const key = getCurrentInstance()?.vnode.key?.toString()

    return () => {
      const collapseSlots = {
        header: ({ expanded, toggleExpand }) => (
          <ZListItem {...props} button {...{ onClick: toggleExpand }}>
            {slots.header?.()}
            <ZArrow reverse={expanded}></ZArrow>
          </ZListItem>
        ),
      }

      return (
        <ZCollapse key={key} {...props} noPadding v-slots={collapseSlots}>
          {slots.default?.()}
        </ZCollapse>
      )
    }
  },
})
