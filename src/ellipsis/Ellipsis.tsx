import { defineComponent, ExtractPropTypes } from 'vue'
import { number } from 'vue-types'

import { useStyles } from '../shared'

const props = {
  lineClamp: number().def(0),
}

export type EllipsisProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const ellipsis = useStyles(() => ({
      display: '-webkit-box',
      '-webkit-line-clamp': props.lineClamp,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      value: props.lineClamp !== 0,
    }))

    return () => <div style={ellipsis.value}>{slots.default?.()}</div>
  },
})
