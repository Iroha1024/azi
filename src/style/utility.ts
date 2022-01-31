import classNames from 'classnames'

export const absoluteCenter =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'

export const absoluteHidden = 'absolute scale-0'

export const relative = 'relative'

export const sizeX1 = 'w-x1 h-x1'

export const interactivePseudoElement = (
  disabled: boolean,
  {
    groupHover,
    groupFocus,
    peerFocus,
  }: { groupHover?: boolean; groupFocus?: boolean; peerFocus?: boolean } = {
    groupHover: false,
    groupFocus: false,
    peerFocus: false,
  }
) =>
  classNames(
    'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
    {
      'hover:after:opacity-10': !disabled,
      'group-hover:after:opacity-10': groupHover && !disabled,
      'active:after:opacity-30': !disabled,
      'focus:after:opacity-20': !disabled,
      'group-focus:after:opacity-20': groupFocus && !disabled,
      'peer-focus:after:opacity-20': peerFocus && !disabled,
    }
  )

export const interactiveElement = (disabled: boolean) =>
  classNames(disabled ? 'cursor-auto' : 'cursor-pointer', {
    'opacity-60': disabled,
  })
