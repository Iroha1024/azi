import classNames from 'classnames'

export const absoluteCenter =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'

export const absoluteHidden = 'absolute scale-0'

export const relative = 'relative'

export const sizeX1 = 'w-[1em] h-[1em]'

export const interactivePseudoElement = (
  disabled: boolean,
  { groupHover, groupFocus }: { groupHover?: boolean; groupFocus?: boolean } = {
    groupHover: false,
    groupFocus: false,
  }
) =>
  classNames(
    'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-[inherit] after:pointer-events-none after:z-[-1]',
    {
      'hover:after:opacity-20': !disabled,
      'group-hover:after:opacity-20': groupHover && !disabled,
      'active:after:opacity-30': !disabled,
      'focus:after:opacity-20': !disabled,
      'group-focus:after:opacity-20': groupFocus && !disabled,
    }
  )

export const interactiveElement = (disabled: boolean) =>
  classNames(disabled ? 'cursor-auto' : 'cursor-pointer', {
    'opacity-60': disabled,
  })
