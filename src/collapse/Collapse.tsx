import {
  computed,
  defineComponent,
  ExtractPropTypes,
  getCurrentInstance,
  inject,
  nextTick,
  ref,
} from 'vue'
import classNames from 'classnames'
import { bool } from 'vue-types'
import { useElementBounding, useVModels } from '@vueuse/core'

import { CollapseGroupInjectionKey } from './Group'
import { useStyles } from '../shared'

const props = {
  expanded: bool().def(false),
  forceRender: bool().def(false),
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

    const reRender = ref(true)

    const handleClick = async (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).hasAttribute('trigger')
      if (!trigger) return
      reRender.value = false
      await nextTick()
      setTimeout(() => {
        if (collapseGroup) {
          collapseGroup.setActiveKey(key!)
        } else {
          expandedModel.value = !expandedModel.value
        }
      })
    }

    const handleTransitionend = () =>
      props.forceRender && (reRender.value = !expanded.value)

    const el = ref<HTMLElement | null>(null)
    const { height } = useElementBounding(el)

    const collapseContent = useStyles(() => ({
      height: height.value + 'px',
      value: expanded.value,
    }))

    return () => (
      <div>
        <div onClick={handleClick}>
          {slots.header?.({
            expanded: expanded.value,
          })}
        </div>
        {reRender.value ? null : (
          <div
            style={collapseContent.value}
            class={classNames('transition-height h-0 overflow-hidden')}
            onTransitionend={handleTransitionend}
          >
            <div ref={el} class={classNames('p-4')}>
              {slots.default?.()}
            </div>
          </div>
        )}
      </div>
    )
  },
})
