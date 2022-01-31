import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool } from 'vue-types'
import { useVModels } from '@vueuse/core'

import { ClassName, injectClass, injectStyle } from './style'
import { ripple } from '../../directive/ripple'

const props = {
  checked: bool().def(false),
  disabled: bool().def(false),
  inset: bool().def(false),
}

export type SwitchProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { ripple },
  props,
  setup(props) {
    const { checked } = useVModels(props)

    injectStyle(props)
    injectClass(props)

    const toggleHandle = () =>
      !props.disabled && (checked.value = !checked.value)

    return () => (
      <button class={ClassName.switch} onClick={toggleHandle}>
        <div class={ClassName.switchRipple} v-ripple={props.disabled}>
          <div class={ClassName.switchHandler}></div>
        </div>
      </button>
    )
  },
})
