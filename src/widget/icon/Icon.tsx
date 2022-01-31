import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'

import { ClassName, injectStyle, injectClass } from './style'
import { size } from '../../shared'

const props = {
  size,
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
