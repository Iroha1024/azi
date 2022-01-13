import { defineComponent, ExtractPropTypes } from 'vue'
import { object } from 'vue-types'

import { theme, varCase } from '../style'
import type { Theme } from '../style'
import { useStyles } from '../shared'

const props = {
  theme: object<Partial<Theme>>().def(),
}

export type ConfigProviderProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const style = useStyles(() => [varCase(theme), varCase(props.theme)])

    return () => (
      <div style={style.value} class="z-config-provider">
        {slots.default?.()}
      </div>
    )
  },
})
