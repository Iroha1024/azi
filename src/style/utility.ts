import classNames from 'classnames'

export const absoluteCenter =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'

export const absoluteHidden = 'absolute scale-0'

export const relative = 'relative'

export const sizeX1 = 'w-x1 h-x1'

export const interactivePseudoElement = (disabled: boolean) =>
  classNames(
    'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
    {
      'hover:after:opacity-5': !disabled,
      'active:after:opacity-20': !disabled,
      'focus:after:opacity-10': !disabled,
      'peer-focus:after:opacity-10': !disabled,
    }
  )

export const interactiveElement = (disabled: boolean) =>
  classNames(disabled ? 'cursor-auto' : 'cursor-pointer', {
    'opacity-60': disabled,
  })
