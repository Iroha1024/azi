import { defineComponent, ExtractPropTypes, InjectionKey, provide } from 'vue'
import { arrayOf, number, oneOfType, string } from 'vue-types'
import { useVModels } from '@vueuse/core'

const props = {
  active: arrayOf(oneOfType([string(), number()])).isRequired,
}

export type CheckBoxGroupProps = ExtractPropTypes<typeof props>

export const checkboxGroupInjectionKey: InjectionKey<{
  contains: (value: string | number) => boolean
  toggleCheckbox: (value: string | number) => void
}> = Symbol('checkboxGroup')

export default defineComponent({
  props,
  setup(props, { slots }) {
    const { active } = useVModels(props)

    const contains = (value: string | number) => active.value.includes(value)

    const toggleCheckbox = (value: string | number) => {
      const list = active.value
      if (list.includes(value)) {
        list.splice(list.indexOf(value), 1)
      } else {
        list.push(value)
      }
    }
    provide(checkboxGroupInjectionKey, {
      contains,
      toggleCheckbox,
    })

    return () => <div>{slots.default?.()}</div>
  },
})
