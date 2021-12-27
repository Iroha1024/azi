import { defineComponent, CSSProperties, computed } from 'vue'
import { number } from 'vue-types'

const props = {
  lineClamp: number().def(0),
}

export default defineComponent({
  props,
  setup(props, { slots }) {
    const style = computed<CSSProperties>(() =>
      props.lineClamp == 0
        ? {}
        : {
            display: '-webkit-box',
            '-webkit-line-clamp': props.lineClamp,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
          }
    )

    return () => <div style={style.value}>{slots.default?.()}</div>
  },
})
