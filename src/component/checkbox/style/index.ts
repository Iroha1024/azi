import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import classNames from 'classnames'

import type { CheckboxProps } from '../Checkbox'
import { cssVar, style } from '../../../shared'
import {
  absoluteCenter,
  absoluteHidden,
  interactiveElement,
  interactivePseudoElement,
  relative,
  sizeX1,
} from '../../../style'

export const ClassName = {
  checkbox: 'checkbox',
  checkboxInput: 'checkboxInput',
  checkboxRipple: 'checkboxRipple',
  checkboxCheckedBackground: 'checkboxCheckedBackground',
  checkboxStatus: 'checkboxStatus',
  checkboxText: 'checkboxText',
}

export const injectStyle = ({
  props,
  checked,
}: {
  props: CheckboxProps
  checked: ComputedRef<boolean>
}) => {
  return {
    [ClassName.checkboxCheckedBackground]: computed(() =>
      style([
        {
          backgroundColor: cssVar('--z-primary-color'),
          borderColor: cssVar('--z-primary-color'),
          value: checked.value || props.indeterminate,
        },
        {
          borderColor: cssVar('--z-disabled-color'),
          value: props.disabled,
        },
        {
          backgroundColor: cssVar('--z-disabled-color'),
          value: props.disabled && (checked.value || props.indeterminate),
        },
      ])
    ),
  }
}

export const injectClass = ({
  props,
  checked,
}: {
  props: CheckboxProps
  checked: ComputedRef<boolean>
}) => {
  return {
    [ClassName.checkbox]: computed(() =>
      classNames('inline-flex items-center', interactiveElement(props.disabled))
    ),
    [ClassName.checkboxInput]: computed(() =>
      classNames(absoluteHidden, 'peer')
    ),
    [ClassName.checkboxRipple]: computed(() =>
      classNames(
        relative,
        'p-2.5',
        'rounded-full',
        interactivePseudoElement(props.disabled)
      )
    ),
    [ClassName.checkboxCheckedBackground]: computed(() =>
      classNames(
        relative,
        sizeX1,
        'border-2 border-current border-solid',
        'rounded'
      )
    ),
    [ClassName.checkboxStatus]: computed(() =>
      classNames(
        'text-[color:var(--z-font-white-color)]',
        'dark:text-[color:var(--z-font-black-color)]',
        {
          'z-checked': checked.value,
          [`${absoluteCenter} bg-current w-4/5 h-1/5`]:
            !checked.value && props.indeterminate,
        }
      )
    ),
    [ClassName.checkboxText]: computed(() => classNames('pr-2')),
  }
}
