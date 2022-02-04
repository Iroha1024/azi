import { computed, defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'

import { ClassName, injectClass } from './style'
import { bool } from 'vue-types'

const props = {
  top: bool().def(false),
  bottom: bool().def(true),
  left: bool().def(false),
  right: bool().def(false),
  reverse: bool().def(false),
}

export type ArrowProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props) {
    injectClass(props)

    const top = 'M13 30L25 18L37 30'
    const bottom = 'M37 18L25 30L13 18'
    const left = 'M31 36L19 24L31 12'
    const right = 'M19 12L31 24L19 36'
    const d = computed(() => {
      switch (true) {
        case props.top:
          return top
        case props.left:
          return left
        case props.right:
          return right
        default:
          return bottom
      }
    })

    return () => (
      <svg
        class={ClassName.arrow}
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" fill="none" fill-opacity="0.01" />
        <path
          d={d.value}
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  },
})
