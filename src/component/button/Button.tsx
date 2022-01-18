import { computed, defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool, string } from 'vue-types'

import { space, ripple } from '../../directive'
import { ClassName, injectClass, injectStyle } from './style'

import { ZIcon, ZLoading } from '../../widget'

const props = {
  type: string<'normal' | 'primary' | 'error'>().def('normal'),
  block: bool().def(false),
  color: string(),
  tile: bool().def(false),
  circle: bool().def(false),
  icon: bool().def(false),
  outlined: bool().def(false),
  text: bool().def(false),
  depressed: bool().def(false),
  disabled: bool().def(false),
  loading: bool().def(false),
}

export type ButtonProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { space, ripple },
  props,
  setup(props, { slots }) {
    const type = computed(() => (props.color ? 'custom' : props.type))

    const depressed = computed(
      () => props.text || props.outlined || props.depressed
    )

    const disabled = computed(() => props.disabled || props.loading)

    injectStyle({ props, type })
    injectClass({ props, disabled, depressed })

    return () => (
      <button
        class={ClassName.button}
        v-ripple={disabled.value}
        disabled={disabled.value}
      >
        <div v-space class={ClassName.buttonContent}>
          {props.loading ? (
            slots.loader ? (
              slots.loader()
            ) : (
              <ZIcon>
                <ZLoading></ZLoading>
              </ZIcon>
            )
          ) : (
            slots.default?.()
          )}
        </div>
      </button>
    )
  },
})
