import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { object } from 'vue-types'

import type { OriginalTheme } from '../../style'
import type { DeepPartial } from '../../shared/type'
import { injectStyle, ClassName, injectClass } from './style'

const props = {
  theme: object<DeepPartial<OriginalTheme>>().def(),
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
