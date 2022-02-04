import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  watch,
} from 'vue'
import type { ExtractPropTypes } from 'vue'
import { bool } from 'vue-types'
import { useVModels } from '@vueuse/core'

import { CollapseGroupInjectionKey } from './Group'

import CollapseTransition from './Transition'
import { ClassName, injectClass } from './style'

export const props = {
  expanded: bool().def(false),
  destroyInactive: bool().def(false),
  noPadding: bool().def(false),
}

export type CollapseProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const key = getCurrentInstance()?.vnode.key?.toString()
    const { expanded: expandedModel } = useVModels(props)
    const collapseGroup = inject(CollapseGroupInjectionKey, null)
    const expanded = computed(() =>
      collapseGroup ? collapseGroup.contains(key!) : props.expanded
    )

    injectClass(props)

    const toggleExpand = () => {
      if (collapseGroup) {
        collapseGroup.setActiveKey(key!)
      } else {
        expandedModel.value = !expandedModel.value
      }
    }

    let isMounted = expanded.value

    if (!isMounted) {
      const stop = watch(expanded, (v) => {
        if (v) {
          isMounted = true
          stop()
        }
      })
    }

    return () => {
      const collapseContent = (
        <div class={ClassName.collapseContent}>{slots.default?.()}</div>
      )

      return (
        <div class={ClassName.collapse}>
          {slots.header?.({
            expanded: expanded.value,
            toggleExpand,
          })}
          <CollapseTransition>
            {props.destroyInactive ? (
              expanded.value ? (
                <div>{collapseContent}</div>
              ) : null
            ) : (
              <div v-show={expanded.value}>
                {expanded.value || isMounted ? collapseContent : null}
              </div>
            )}
          </CollapseTransition>
        </div>
      )
    }
  },
})
