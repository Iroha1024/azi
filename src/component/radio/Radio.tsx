import { computed, defineComponent, inject } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool, number, oneOfType, string } from 'vue-types'

import { ClassName, injectClass, injectStyle } from './style'
import { ripple } from '../../directive'
import { RadioGroupInjectionKey } from './Group'

const props = {
  checked: bool().def(false),
  disabled: bool().def(false),
  value: oneOfType([string(), number()]),
}

export type RadioProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { ripple },
  props,
  setup(props, { slots }) {
    const radioGroup = inject(RadioGroupInjectionKey, null)
    const checked = computed(() =>
      radioGroup ? radioGroup.equals(props.value!) : props.checked
    )

    injectStyle({ props, checked })
    injectClass({ props, checked })

    const handleChange = () => {
      if (props.disabled) return
      if (radioGroup) {
        radioGroup.toggleRadio(props.value!)
      }
    }

    return () => (
      <label class={ClassName.radio}>
        <input
          class={ClassName.radioInput}
          type="radio"
          disabled={props.disabled}
          onChange={handleChange}
          checked={checked.value}
        ></input>
        <div class={ClassName.radioRipple} v-ripple={props.disabled}>
          <div class={ClassName.radioCheckedBackground}>
            <div class={ClassName.radioStatus}></div>
          </div>
        </div>
        <span class={ClassName.radioText}>{slots.default?.()}</span>
      </label>
    )
  },
})
