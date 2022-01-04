import { computed, defineComponent, ExtractPropTypes } from 'vue'
import { number } from 'vue-types'
import classNames from 'classnames'

import { styles } from '../_util'

const props = {
  size: number().def(24),
}

export type IconProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const style = computed(() =>
      styles({
        fontSize: props.size + 'px',
        width: '1em',
        height: '1em',
      })
    )

    return () => (
      <i
        style={style.value}
        class={classNames('inline-block', 'text-center', 'leading-0')}
      >
        {slots.default?.()}
      </i>
    )
  },
})
