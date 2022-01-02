import { computed, Directive } from 'vue'
import {
  useDebounceFn,
  useElementBounding,
  useEventListener,
} from '@vueuse/core'
import classNames from 'classnames'

import { styles } from '../_util'

export const ripple: Directive<HTMLElement> = {
  beforeMount(el) {
    el.classList.add('relative', 'overflow-hidden')

    const {
      width: buttonWidth,
      height: buttonHeight,
      left: buttonLeft,
      top: buttonTop,
    } = useElementBounding(el)

    const rippleSize = computed(() =>
      buttonWidth.value > buttonHeight.value
        ? buttonWidth.value
        : buttonHeight.value
    )

    const createRipple = (left: number, top: number) => {
      const ripple = document.createElement('div')
      ripple.className = classNames(
        'z-ripple-effect',
        'absolute',
        'bg-current',
        'rounded-full',
        'opacity-20'
      )
      Object.assign(
        ripple.style,
        styles({
          width: rippleSize.value + 'px',
          height: rippleSize.value + 'px',
          left: left + 'px',
          top: top + 'px',
          transform: 'scale(0)',
        })
      )
      return ripple
    }

    const clearRipple = useDebounceFn(() => {
      const list = el.children
      for (let i = list.length - 1; i >= 0; i--) {
        const child = list[i]
        if (child.classList.contains('z-ripple-effect')) {
          el.removeChild(child)
        }
      }
    }, 1000)

    const handleMousedown = (e: MouseEvent) => {
      const offsetX = e.clientX - buttonLeft.value,
        offsetY = e.clientY - buttonTop.value
      const left = offsetX - rippleSize.value / 2,
        top = offsetY - rippleSize.value / 2
      const ripple = createRipple(left, top)
      el.appendChild(ripple)
      clearRipple()
    }

    useEventListener(el, 'mousedown', handleMousedown)
  },
}
