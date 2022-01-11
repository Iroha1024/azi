import { defineComponent, ExtractPropTypes } from 'vue'
import { number } from 'vue-types'
import classNames from 'classnames'

import { useStyles } from '../shared'

const props = {
  size: number().def(24),
}

export type IconProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const icon = useStyles(() => ({
      fontSize: props.size + 'px',
      width: '1em',
      height: '1em',
    }))

    return () => (
      <i
        style={icon.value}
        class={classNames('inline-block', 'text-center', 'leading-0')}
      >
        {slots.default?.()}
      </i>
    )
  },
})
