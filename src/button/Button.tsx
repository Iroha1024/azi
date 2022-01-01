import { computed, defineComponent, ExtractPropTypes, ref } from 'vue'
import { bool, string } from 'vue-types'
import classNames from 'classnames'
import { useElementBounding, useDebounceFn } from '@vueuse/core'

import { styles } from '../_util/'

import './index.css'

const props = {
  type: string<'normal' | 'primary' | 'error'>().def('normal'),
  block: bool().def(false),
  color: string(),
  tile: bool().def(false),
  circle: bool().def(false),
  outlined: bool().def(false),
  text: bool().def(false),
  depressed: bool().def(false),
  disabled: bool().def(false),
}

export type ButtonProps = ExtractPropTypes<typeof props>

export default defineComponent({
  props,
  setup(props, { slots }) {
    const el = ref<HTMLElement | null>(null)
    const { width: buttonWidth, height: buttonHeight } = useElementBounding(el)

    const rippleSize = computed(() =>
      buttonWidth.value > buttonHeight.value
        ? buttonWidth.value
        : buttonHeight.value
    )

    const rippleList = ref<
      Array<{
        left: number
        top: number
      }>
    >([])

    const clearRipple = useDebounceFn(() => {
      rippleList.value = []
    }, 1000)

    const handleMousedown = (e: MouseEvent) => {
      rippleList.value.push({
        left: e.offsetX - rippleSize.value / 2,
        top: e.offsetY - rippleSize.value / 2,
      })
      clearRipple()
    }

    const style = computed(() => {
      const type = props.color ? 'custom' : props.type
      return styles(
        {
          color: 'var(--z-text-normal)',
          backgroundColor: 'var(--z-bg-normal)',
          value: type === 'normal',
        },
        {
          color: 'var(--z-text-not-normal)',
          value: type !== 'normal',
        },
        {
          backgroundColor: 'var(--z-primary-color)',
          value: type === 'primary',
        },
        {
          backgroundColor: 'var(--z-error-color)',
          value: type === 'error',
        },
        {
          backgroundColor: props.color,
          value: type === 'custom',
        },
        {
          fn() {
            this.color = this.backgroundColor
            this.backgroundColor = 'transparent'
          },
          value: props.outlined,
        },
        {
          color: props.color,
          backgroundColor: 'transparent',
          value: props.text,
        }
      )
    })

    const depressed = computed(
      () => props.text || props.outlined || props.depressed
    )

    return () => (
      <button
        ref={el}
        style={style.value}
        class={classNames(
          'btn',
          'px-6 py-2',
          'relative',
          'rounded',
          'border-current',
          'overflow-hidden',
          'transition-shadow',
          'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
          'active:after:opacity-20',
          {
            block: props.block,
            'rounded-none': props.tile,
            'rounded-full': props.circle,
            'border-transparent': !props.outlined,
            'border-solid': props.outlined,
            border: props.outlined,
            'opacity-60': props.disabled,
            'shadow-md': !depressed.value,
            'hover:shadow-lg': !depressed.value && !props.disabled,
            'focus:after:opacity-10': depressed.value,
            'hover:after:opacity-5': !props.disabled,
          },
          {
            outlined: props.outlined,
          }
        )}
        disabled={props.disabled}
        onMousedown={handleMousedown}
      >
        {slots.default?.()}
        {rippleList.value.map(({ left, top }) => (
          <span
            style={styles({
              width: rippleSize.value + 'px',
              height: rippleSize.value + 'px',
              left: left + 'px',
              top: top + 'px',
              transform: 'scale(0)',
            })}
            class={classNames(
              'rippleEffect',
              'absolute',
              'bg-current',
              'rounded-full',
              'opacity-20',
              'pointer-events-none'
            )}
          ></span>
        ))}
      </button>
    )
  },
})
