import { Directive } from 'vue'
import classNames from 'classnames'

const createRipple = (size: number, x: number, y: number) => {
  const ripple = document.createElement('div')
  ripple.className = classNames(
    'z-ripple-effect',
    'absolute',
    'bg-current',
    'rounded-full',
    'opacity-20'
  )
  Object.assign(ripple.style, {
    width: size + 'px',
    height: size + 'px',
    left: x + 'px',
    top: y + 'px',
    transform: 'scale(0)',
  })
  return ripple
}

const handleMouseleave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const list = el.children
  for (let i = list.length - 1; i >= 0; i--) {
    const child = list[i]
    if (child.classList.contains('z-ripple-effect')) {
      el.removeChild(child)
    }
  }
}

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
}

const addClass = (el: HTMLElement) =>
  el.classList.add('relative', 'overflow-hidden')

export const ripple: Directive<
  HTMLElement,
  {
    disabled: boolean
  }
> = (el, binding) => {
  const disabled = binding.value
  addClass(el)
  if (disabled) {
    el.removeEventListener('mousedown', handleMousedown)
    el.removeEventListener('mouseleave', handleMouseleave)
  } else {
    el.addEventListener('mousedown', handleMousedown)
    el.addEventListener('mouseleave', handleMouseleave)
  }
}
