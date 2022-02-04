import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'

import ZList, { props as zListProps } from './List'
import { ZCollapseGroup } from '../collapse'
import { props as zCollapseGroupProps } from '../collapse/Group'

const props = {
  ...zListProps,
  ...zCollapseGroupProps,
}

export type CollapseListProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    return () => (
      <ZList {...props}>
        <ZCollapseGroup {...props}>{slots.default?.()}</ZCollapseGroup>
      </ZList>
    )
  },
})
