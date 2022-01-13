import { computed, defineComponent, ExtractPropTypes, inject } from 'vue'
import { bool, number, oneOfType, string } from 'vue-types'
import classNames from 'classnames'
import { useVModels } from '@vueuse/core'

import { cssVar, useStyles } from '../shared'
import { ripple } from '../directive/ripple'

import { checkboxGroupInjectionKey } from './Group'

import './index.css'

const props = {
  checked: bool(),
  indeterminate: bool().def(false),
  disabled: bool().def(false),
  value: oneOfType([string(), number()]),
}

export type CheckboxProps = ExtractPropTypes<typeof props>

export default defineComponent({
  directives: { ripple },
  props,
  setup(props, { slots }) {
    const { checked: checkedModel } = useVModels(props)
    const checkboxGroup = inject(checkboxGroupInjectionKey, null)
    const checked = computed(() =>
      checkboxGroup ? checkboxGroup.contains(props.value!) : props.checked
    )

    const background = useStyles(() => [
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

    const handleChange = () => {
      if (checkboxGroup) {
        checkboxGroup.toggleCheckbox(props.value!)
      } else {
        checkedModel.value = !checkedModel.value
      }
    }

    return () => (
      <label
        class={classNames('z-checkbox', 'inline-flex items-center', {
          'opacity-60': props.disabled,
        })}
      >
        <input
          type="checkbox"
          disabled={props.disabled}
          onChange={handleChange}
          class={classNames('absolute', 'scale-0', 'peer')}
        ></input>
        <div
          v-ripple={props.disabled}
          class={classNames(
            'p-2.5',
            'rounded-full',
            'after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:bg-current after:rounded-inherit after:pointer-events-none',
            'peer-focus:after:opacity-10',
            props.disabled ? 'cursor-auto' : 'cursor-pointer',
            {
              'hover:after:opacity-5': !props.disabled,
              'active:after:opacity-20': !props.disabled,
            }
          )}
        >
          <div
            style={background.value}
            class={classNames(
              'relative',
              'border-2 border-current border-solid',
              'rounded'
            )}
          >
            <div
              class={classNames({
                'z-checked': checked.value,
                'z-indeterminate': !checked.value && props.indeterminate,
              })}
            ></div>
          </div>
        </div>

        <span
          class={classNames(
            'select-none',
            'pr-2',
            props.disabled ? 'cursor-auto' : 'cursor-pointer'
          )}
        >
          {slots.default?.()}
        </span>
      </label>
    )
  },
})
