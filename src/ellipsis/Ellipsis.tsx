import { defineComponent, computed, ExtractPropTypes } from 'vue'
import { number } from 'vue-types'

import { styles } from '../_util'

const props = {
  lineClamp: number().def(0),
}

export type EllipsisProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const style = computed(() =>
      styles({
        display: '-webkit-box',
        '-webkit-line-clamp': props.lineClamp,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        value: props.lineClamp !== 0,
      })
    )

    return () => <div style={style.value}>{slots.default?.()}</div>
  },
})
