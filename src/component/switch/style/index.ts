import { computed } from 'vue'

import type { SwitchProps } from '../Switch'
import { cssVar, getSize, style } from '../../../shared'
import classNames from 'classnames'
import {
  interactiveElement,
  interactivePseudoElement,
  relative,
} from '../../../style'

export const ClassName = {
  switch: 'switch',
  switchRipple: 'switchRipple',
  switchHandler: 'switchHandler',
}

const switchPadding = 0.125
const handlerSize = 1.25
const switchWidth = (handlerSize + switchPadding) * 2
const switchHeight = handlerSize + switchPadding * 2
const ripplePadding = 0.5
const handleRight = switchPadding - ripplePadding
const switchColor = '#E5E7EB' //theme('colors.gray.200')
const checkedSwitchColor = '#DDD6FE' //theme('colors.violet.200')
const disabledSwitchColor = '#D1D5DB' //theme('colors.gray.300')

export const injectStyle = (props: SwitchProps) => {
  return {
    [ClassName.switch]: computed(() =>
      style([
        {
          fontSize: getSize(props.size),
        },
        {
          width: `${switchWidth}em`,
          height: `${switchHeight}em`,
          color: props.checked ? checkedSwitchColor : switchColor,
        },
        {
          color: disabledSwitchColor,
          value: props.disabled,
        },
        {
          //@ts-ignore
          '--z-switch-inset-offset': props.inset
            ? '0'
            : `${(switchHeight - handlerSize) / 2 + handlerSize / 8}em`,
        },
      ])
    ),
    [ClassName.switchRipple]: computed(() =>
      style({
        color: props.checked ? cssVar('--z-primary-color') : '',
        padding: `${ripplePadding}em`,
        right: `${handleRight}em`,
        transform: props.checked
          ? 'translateX(0)'
          : `translateX(-${handlerSize}em)`,
      })
    ),
    [ClassName.switchHandler]: computed(() =>
      style([
        {
          width: `${handlerSize}em`,
          height: `${handlerSize}em`,
          backgroundColor: props.checked
            ? cssVar('--z-primary-color')
            : cssVar('--z-white-color'),
        },
        {
          backgroundColor: cssVar('--z-disabled-color'),
          value: props.disabled,
        },
      ])
    ),
  }
}

export const injectClass = (props: SwitchProps) => {
  return {
    [ClassName.switch]: computed(() =>
      classNames(
        relative,
        'group',
        'inline-flex items-center',
        'after:absolute after:rounded-full after:bg-current',
        'after:inset-[var(--z-switch-inset-offset)]',
        interactiveElement(props.disabled)
      )
    ),
    [ClassName.switchRipple]: computed(() =>
      classNames(
        'rounded-full',
        '!absolute',
        'transition-transform',
        'text-[color:var(--z-black-color)]',
        'dark:text-[color:var(--z-white-color)]',
        'z-[1]',
        interactivePseudoElement(props.disabled, {
          groupHover: true,
        })
      )
    ),
    [ClassName.switchHandler]: computed(() => classNames('rounded-full')),
  }
}
