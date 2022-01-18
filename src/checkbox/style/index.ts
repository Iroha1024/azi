import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import classNames from 'classnames'

import type { CheckboxProps } from '../Checkbox'
import { cssVar, style } from '../../shared'
import { absoluteCenter } from '../../style'

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
          width: '1em',
          height: '1em',
        },
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
      classNames('inline-flex items-center', {
        'opacity-60': props.disabled,
      })
    ),
    [ClassName.checkboxInput]: computed(() =>
      classNames('absolute', 'scale-0', 'peer')
    ),
    [ClassName.checkboxRipple]: computed(() =>
      classNames(
        'p-2.5',
        'rounded-full',
        'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
        'peer-focus:after:opacity-10',
        props.disabled ? 'cursor-auto' : 'cursor-pointer',
        {
          'hover:after:opacity-5': !props.disabled,
          'active:after:opacity-20': !props.disabled,
        }
      )
    ),
    [ClassName.checkboxCheckedBackground]: computed(() =>
      classNames('relative', 'border-2 border-current border-solid', 'rounded')
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
    [ClassName.checkboxText]: computed(() =>
      classNames(
        'select-none',
        'pr-2',
        props.disabled ? 'cursor-auto' : 'cursor-pointer'
      )
    ),
  }
}
