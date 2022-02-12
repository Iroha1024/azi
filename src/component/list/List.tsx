import { defineComponent, inject, InjectionKey, provide } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool, number } from 'vue-types'

import { ClassName, injectStyle } from './style'

export const props = {
  width: number().def(300),
  noPadding: bool().def(false),
}

export type ListProps = ExtractPropTypes<typeof props>

export const ListInjectionKey: InjectionKey<{
  level: number
}> = Symbol()

export default defineComponent({
  props,
  setup(props, { slots }) {
    const list = inject(ListInjectionKey, {
      level: 0,
    })

    injectStyle(props)

    provide(ListInjectionKey, {
      level: list.level + 1,
    })

    return () => <ul class={ClassName.list}>{slots.default?.()}</ul>
  },
})
