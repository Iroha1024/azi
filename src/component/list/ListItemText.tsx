import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool } from 'vue-types'

import { ClassName, injectClass } from './style/listItemText'

const props = {
  left: bool().def(true),
  center: bool().def(false),
  right: bool().def(false),
}

export type ListItemTextProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    injectClass(props)

    return () => <div class={ClassName.listItemText}>{slots.default?.()}</div>
  },
})
