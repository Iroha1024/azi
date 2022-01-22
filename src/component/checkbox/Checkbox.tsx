import { computed, defineComponent, inject } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool, number, oneOfType, string } from 'vue-types'
import { useVModels } from '@vueuse/core'

import { ripple } from '../../directive/ripple'

import { checkboxGroupInjectionKey } from './Group'
import { ClassName, injectStyle, injectClass } from './style'

const props = {
  checked: bool().def(false),
  indeterminate: bool().def(false),
  disabled: bool().def(false),
  value: oneOfType([string(), number()]),
}

export type CheckboxProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { ripple },
  props,
  setup(props, { slots }) {
    const { checked: checkedModel } = useVModels(props)
    const checkboxGroup = inject(checkboxGroupInjectionKey, null)
    const checked = computed(() =>
      checkboxGroup ? checkboxGroup.contains(props.value!) : props.checked
    )

    injectStyle({ props, checked })
    injectClass({ props, checked })

    const handleChange = () => {
      if (props.disabled) return
      if (checkboxGroup) {
        checkboxGroup.toggleCheckbox(props.value!)
      } else {
        checkedModel.value = !checkedModel.value
      }
    }

    return () => (
      <label class={ClassName.checkbox}>
        <input
          class={ClassName.checkboxInput}
          type="checkbox"
          disabled={props.disabled}
          checked={checked.value}
          onChange={handleChange}
        ></input>
        <div class={ClassName.checkboxRipple} v-ripple={props.disabled}>
          <div class={ClassName.checkboxCheckedBackground}>
            <div class={ClassName.checkboxStatus}></div>
          </div>
        </div>
        <span class={ClassName.checkboxText}>{slots.default?.()}</span>
      </label>
    )
  },
})
