import { defineComponent, InjectionKey, provide } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { number, oneOfType, string } from 'vue-types'
import { useVModels } from '@vueuse/core'

const props = {
  active: oneOfType([string(), number()]).isRequired,
}

export type RadioGroupProps = ExtractPropTypes<typeof props>

export const RadioGroupInjectionKey: InjectionKey<{
  equals: (value: string | number) => boolean
  toggleRadio: (value: string | number) => void
}> = Symbol()

export default defineComponent({
  props,
  setup(props, { slots }) {
    const { active } = useVModels(props)

    const equals = (value: string | number) => active.value === value

    const toggleRadio = (value: string | number) => (active.value = value)

    provide(RadioGroupInjectionKey, {
      equals,
      toggleRadio,
    })

    return () => <div>{slots.default?.()}</div>
  },
})
