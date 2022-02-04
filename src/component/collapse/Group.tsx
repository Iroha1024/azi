import { defineComponent, InjectionKey, provide, ref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool } from 'vue-types'

import { ClassName } from './style/group'

export const props = {
  accordion: bool().def(false),
}

export type CollapseGroupProps = ExtractPropTypes<typeof props>

export const CollapseGroupInjectionKey: InjectionKey<{
  contains: (value: string) => boolean
  setActiveKey: (key: string) => void
}> = Symbol()

export default defineComponent({
  props,
  setup(props, { slots }) {
    const active = props.accordion ? ref('') : ref<Array<string>>([])

    const contains = (value: string) =>
      props.accordion ? active.value === value : active.value.includes(value)

    const setActiveKey = (key: string) => {
      if (props.accordion) {
        ;(active.value as string) = active.value === key ? '' : key
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

    return () => <div class={ClassName.collapseGroup}>{slots.default?.()}</div>
  },
})
