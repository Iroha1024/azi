import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import classNames from 'classnames'

import type { RadioProps } from '../Radio'
import {
  absoluteCenter,
  absoluteHidden,
  interactiveElement,
  interactivePseudoElement,
  relative,
  sizeX1,
} from '../../../style'
import { cssVar, style } from '../../../shared'

export const ClassName = {
  radio: 'radio',
  radioInput: 'radioInput',
  radioRipple: 'radioRipple',
  radioCheckedBackground: 'radioCheckedBackground',
  radioStatus: 'radioStatus',
  radioText: 'radioText',
}

export const injectStyle = ({
  props,
  checked,
}: {
  props: RadioProps
  checked: ComputedRef<boolean>
}) => {
  return {
    [ClassName.radioCheckedBackground]: computed(() =>
      style([
        {
          color: cssVar('--z-primary-color'),
          value: checked.value,
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
  props: RadioProps
  checked: ComputedRef<boolean>
}) => {
  return {
    [ClassName.radio]: computed(() =>
      classNames('inline-flex items-center', interactiveElement(props.disabled))
    ),
    [ClassName.radioInput]: computed(() => classNames(absoluteHidden)),
    [ClassName.radioRipple]: computed(() =>
      classNames(
        relative,
        'p-2.5',
        'rounded-full',
        interactivePseudoElement(props.disabled)
      )
    ),
    [ClassName.radioCheckedBackground]: computed(() =>
      classNames(
        relative,
        sizeX1,
        'border-2 border-current border-solid',
        'rounded-full',
        'scale-125'
      )
    ),
    [ClassName.radioStatus]: computed(() =>
      classNames(
        absoluteCenter,
        'w-1/2 h-1/2',
        'rounded-full',
        'bg-current',
        'transition-transform scale-0',
        {
          'scale-100': checked.value,
        }
      )
    ),
    [ClassName.radioText]: computed(() => classNames('pr-2')),
  }
}
