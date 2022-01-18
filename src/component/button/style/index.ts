import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import classNames from 'classnames'

import type { ButtonProps } from '../Button'
import { cssVar, style } from '../../../shared'

export const ClassName = {
  button: 'button',
  buttonContent: 'buttonContent',
}

export const injectStyle = ({
  props,
  type,
}: {
  props: ButtonProps
  type: ComputedRef<string>
}) => {
  return {
    [ClassName.button]: computed(() =>
      style([
        {
          color: cssVar('--z-font-white-color'),
          value: type.value !== 'normal',
        },
        {
          backgroundColor: cssVar('--z-primary-color'),
          value: type.value === 'primary',
        },
        {
          backgroundColor: cssVar('--z-error-color'),
          value: type.value === 'error',
        },
        {
          backgroundColor: props.color,
          value: type.value === 'custom',
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
        },
      ])
    ),
  }
}

export const injectClass = ({
  props,
  disabled,
  depressed,
}: {
  props: ButtonProps
  disabled: ComputedRef<boolean>
  depressed: ComputedRef<boolean>
}) => {
  return {
    [ClassName.button]: computed(() =>
      classNames(
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
          '!rounded-full': props.circle || props.icon,
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
      )
    ),
    [ClassName.buttonContent]: computed(() => classNames('flex items-center')),
  }
}
