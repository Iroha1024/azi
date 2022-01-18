import { defineComponent, computed, InjectionKey, provide } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { arrayOf, oneOfType, string } from 'vue-types'
import { useVModels } from '@vueuse/core'

const props = {
  active: oneOfType([string(), arrayOf(string())]).isRequired,
  name: string(),
}

export type CollapseGroupProps = ExtractPropTypes<typeof props>

export const CollapseGroupInjectionKey: InjectionKey<{
  contains: (value: string) => boolean
  setActiveKey: (key: string) => void
}> = Symbol('collapseGroup')

export default defineComponent({
  props,
  setup(props, { slots }) {
    const { active } = useVModels(props)
    const accordion = computed(() => !Array.isArray(active.value))

    const contains = (value: string) =>
      accordion.value ? active.value === value : active.value.includes(value)

    const setActiveKey = (key: string) => {
      if (accordion.value) {
        active.value = active.value === key ? '' : key
      } else {
        const list = active.value as string[]
        if (list.includes(key)) {
          list.splice(list.indexOf(key), 1)
        } else {
          list.push(key)
        }
      }
    }

    provide(CollapseGroupInjectionKey, {
      contains,
      setActiveKey,
    })

    return () => <div>{slots.default?.()}</div>
  },
})
