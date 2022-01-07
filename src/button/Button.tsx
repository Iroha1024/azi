import { computed, defineComponent, ExtractPropTypes } from 'vue'
import { bool, string } from 'vue-types'
import classNames from 'classnames'

import { styles } from '../_util'
import { space, ripple } from '../directive'

import { ZIcon } from '../icon'
import { ZLoading } from '../loading'

import './index.css'

const props = {
  type: string<'normal' | 'primary' | 'error'>().def('normal'),
  block: bool().def(false),
  color: string(),
  tile: bool().def(false),
  circle: bool().def(false),
  icon: bool().def(false),
  outlined: bool().def(false),
  text: bool().def(false),
  depressed: bool().def(false),
  disabled: bool().def(false),
  loading: bool().def(false),
}

export type ButtonProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { space, ripple },
  props,
  setup(props, { slots }) {
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
          set() {
            this.color = this.backgroundColor
            this.backgroundColor = 'transparent'
          },
          value: props.outlined,
        },
        {
          set() {
            this.color = props.color || this.backgroundColor
            this.backgroundColor = 'transparent'
          },
          value: props.text,
        }
      )
    })

    const depressed = computed(
      () => props.text || props.outlined || props.depressed
    )

    const disabled = computed(() => props.disabled || props.loading)

    return () => (
      <button
        v-ripple={disabled.value}
        style={style.value}
        class={classNames(
          'z-btn',
          'px-6 py-2',
          'relative',
          'rounded',
          'border-current',
          'transition-shadow',
          'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
          'focus:after:opacity-10',
          {
            block: props.block,
            '!p-4': props.icon,
            'align-bottom': !props.block,
            'rounded-none': props.tile,
            'rounded-full': props.circle || props.icon,
            'border-transparent': !props.outlined,
            'border-solid': props.outlined,
            border: props.outlined,
            'opacity-60': disabled.value,
            'shadow-md': !depressed.value,
            'hover:shadow-lg': !depressed.value && !disabled.value,
            'hover:after:opacity-5': !disabled.value,
            'active:after:opacity-20': !disabled.value,
          },
          {
            'z-color-reverse': props.outlined || props.text,
          }
        )}
        disabled={disabled.value}
      >
        <div v-space class={classNames('flex items-center')}>
          {props.loading ? (
            slots.loader ? (
              slots.loader()
            ) : (
              <ZIcon>
                <ZLoading></ZLoading>
              </ZIcon>
            )
          ) : (
            slots.default?.()
          )}
        </div>
      </button>
    )
  },
})
