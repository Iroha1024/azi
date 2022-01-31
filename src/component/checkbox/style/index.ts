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
          backgroundColor: 'transparent',
          value: !(checked.value || props.indeterminate),
        },
        {
          color: cssVar('--z-primary-color'),
          value: checked.value || props.indeterminate,
        },
        {
          color: cssVar('--z-disabled-color'),
          value: props.disabled,
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
    [ClassName.checkboxInput]: computed(() => classNames(absoluteHidden)),
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
        'rounded',
        'bg-current'
      )
    ),
    [ClassName.checkboxStatus]: computed(() =>
      classNames(
        'text-[color:var(--z-white-color)]',
        'dark:text-[color:var(--z-black-color)]',
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
