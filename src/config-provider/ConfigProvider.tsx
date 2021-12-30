import { defineComponent, onMounted, ref, ExtractPropTypes, watch } from 'vue'
import { object } from 'vue-types'

import type { Theme } from './interface'

import './index.css'

const props = {
  theme: object<Partial<Theme>>().def(),
}

export type ConfigProviderProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const el = ref<HTMLElement | null>(null)

    const setCssVar = (theme: Record<string, string>) => {
      for (const key in theme) {
        el.value?.style.setProperty(key, theme[key])
      }
    }

    onMounted(() => setCssVar(props.theme))

    watch(props.theme, setCssVar)

    return () => (
      <div ref={el} class="config-provider">
        {slots.default?.()}
      </div>
    )
  },
})
