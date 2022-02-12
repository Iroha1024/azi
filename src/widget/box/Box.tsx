import { computed, defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool, string } from 'vue-types'

const props = {
  tag: string<keyof HTMLElementTagNameMap>().def('div'),
  focusable: bool().def(false),
}

export type BoxProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const tabIndex = computed(() => (props.focusable ? 0 : null))

    return () => {
      const tag = props.tag
      return <tag tabindex={tabIndex.value}>{slots.default?.()}</tag>
    }
  },
})
