import { defineComponent, ExtractPropTypes } from 'vue'
import { number } from 'vue-types'

import { ClassName, injectStyle } from './style'

const props = {
  lineClamp: number().def(0),
}

export type EllipsisProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    injectStyle(props)

    return () => <div class={ClassName.ellipsis}>{slots.default?.()}</div>
  },
})
