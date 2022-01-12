import {
  computed,
  defineComponent,
  ExtractPropTypes,
  getCurrentInstance,
  inject,
  watch,
} from 'vue'
import classNames from 'classnames'
import { bool } from 'vue-types'
import { useVModels } from '@vueuse/core'

import { CollapseGroupInjectionKey } from './Group'

import CollapseTransition from './CollapseTransition'

const props = {
  expanded: bool().def(false),
  destroyInactive: bool().def(false),
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

    const toggleExpand = () => {
      if (collapseGroup) {
        collapseGroup.setActiveKey(key!)
      } else {
        expandedModel.value = !expandedModel.value
      }
    }

    let isMounted = false

    const stop = watch(
      expanded,
      (v) => {
        if (v) {
          isMounted = true
          stop()
        }
      },
      { immediate: true }
    )

    return () => {
      const collapseContent = (
        <div class={classNames('p-4')}>{slots.default?.()}</div>
      )

      return (
        <div>
          <div>
            {slots.header?.({
              expanded: expanded.value,
              toggleExpand,
            })}
          </div>
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
