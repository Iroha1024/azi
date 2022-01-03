import { Directive } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import classNames from 'classnames'

import { styles } from '../_util'

const createRipple = (size: number, x: number, y: number) => {
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
      width: size + 'px',
      height: size + 'px',
      left: x + 'px',
      top: y + 'px',
      transform: 'scale(0)',
    })
  )
  return ripple
}

const clearRipple = useDebounceFn((el: HTMLElement) => {
  const list = el.children
  for (let i = list.length - 1; i >= 0; i--) {
    const child = list[i]
    if (child.classList.contains('z-ripple-effect')) {
      el.removeChild(child)
    }
  }
}, 1000)

const handleMousedown = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const { width, height, left, top } = el.getBoundingClientRect()
  const size = width > height ? width : height
  const offsetX = e.clientX - left,
    offsetY = e.clientY - top
  const x = offsetX - size / 2,
    y = offsetY - size / 2
  const ripple = createRipple(size, x, y)
  el.appendChild(ripple)
  clearRipple(el)
}

const addClass = (el: HTMLElement) =>
  el.classList.add('relative', 'overflow-hidden')

export const ripple: Directive<HTMLElement> = {
  mounted(el) {
    addClass(el)
    el.addEventListener('mousedown', handleMousedown)
  },
  updated: addClass,
}
