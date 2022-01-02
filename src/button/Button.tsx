import { computed, defineComponent, ExtractPropTypes } from 'vue'
import { bool, string } from 'vue-types'
import classNames from 'classnames'

import { styles } from '../_util'
import { wrapTextNode, ripple } from '../directive'

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
}

export type ButtonProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { wrap: wrapTextNode, ripple },
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

    return () => (
      <button
        v-ripple
        style={style.value}
        class={classNames(
          'z-btn',
          'px-6 py-2',
          'relative',
          'rounded',
          'border-current',
          'transition-shadow',
          'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
          {
            block: props.block,
            '!p-4': props.icon,
            'align-bottom': !props.block,
            'rounded-none': props.tile,
            'rounded-full': props.circle || props.icon,
            'border-transparent': !props.outlined,
            'border-solid': props.outlined,
            border: props.outlined,
            'opacity-60': props.disabled,
            'shadow-md': !depressed.value,
            'hover:shadow-lg': !depressed.value && !props.disabled,
            'hover:after:opacity-5': !props.disabled,
            'active:after:opacity-20': !props.disabled,
            'focus:after:opacity-10': depressed.value,
          },
          {
            'z-color-reverse': props.outlined || props.text,
          }
        )}
        disabled={props.disabled}
      >
        <div v-wrap class={classNames('flex items-center', 'space-x-2')}>
          {slots.default?.()}
        </div>
      </button>
    )
  },
})
