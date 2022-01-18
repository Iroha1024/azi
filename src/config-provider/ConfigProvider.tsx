import { defineComponent, ExtractPropTypes } from 'vue'
import { object } from 'vue-types'

import type { Theme } from '../style'
import { injectStyle, ClassName, injectClass } from './style'

const props = {
  theme: object<Partial<Theme>>().def(),
}

export type ConfigProviderProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    injectStyle(props)
    injectClass()

    return () => <div class={ClassName.configProvider}>{slots.default?.()}</div>
  },
})
