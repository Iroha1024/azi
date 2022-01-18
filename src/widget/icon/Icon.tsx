import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { number } from 'vue-types'

import { ClassName, injectStyle, injectClass } from './style'

const props = {
  size: number().def(24),
}

export type IconProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    injectStyle(props)
    injectClass()

    return () => <i class={ClassName.icon}>{slots.default?.()}</i>
  },
})
