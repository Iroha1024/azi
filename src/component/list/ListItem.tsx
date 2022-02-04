import { defineComponent, inject } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool } from 'vue-types'

import { ClassName, injectClass, injectStyle } from './style/listItem'
import { ripple } from '../../directive'
import { ListInjectionKey } from './List'

export const props = {
  button: bool().def(false),
}

export type ListItemProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { ripple },
  props,
  setup(props, { slots }) {
    const list = inject(ListInjectionKey)

    injectStyle({ level: list!.level })
    injectClass(props)

    return () => (
      <button
        class={ClassName.listItem}
        disabled={!props.button}
        v-ripple={!props.button}
      >
        {slots.default?.()}
      </button>
    )
  },
})
