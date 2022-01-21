import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import classNames from 'classnames'

import type { ButtonProps } from '../Button'
import { cssVar, style } from '../../../shared'
import {
  interactiveElement,
  interactivePseudoElement,
  relative,
} from '../../../style'

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
        relative,
        'px-6 py-2',
        'rounded',
        'border-current',
        'transition-shadow',
        interactiveElement(disabled.value),
        interactivePseudoElement(disabled.value),
        {
          block: props.block,
          '!p-4': props.icon,
          'align-bottom': !props.block,
          'rounded-none': props.tile,
          '!rounded-full': props.circle || props.icon,
          'border-transparent': !props.outlined,
          'border-solid': props.outlined,
          border: props.outlined,
          'shadow-md': !depressed.value,
          'hover:shadow-lg': !depressed.value && !disabled.value,
        }
      )
    ),
    [ClassName.buttonContent]: computed(() => classNames('flex items-center')),
  }
}
