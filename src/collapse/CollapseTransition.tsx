import { defineComponent, Transition } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const handleBeforeEnter = (el) => {
      el.classList.add('transition-height', 'overflow-hidden')
      Object.assign(el.style, {
        height: 0,
      })
    }

    const handleEnter = (el, done) => {
      ;(el as HTMLElement).ontransitionend = () => done()
      const child = el.firstChild
      const { height } = child.getBoundingClientRect()
      Object.assign(el.style, {
        height: height + 'px',
      })
    }

    const handleAfterEnter = (el) => {
      el.classList.remove('overflow-hidden')
      Object.assign(el.style, {
        height: '',
      })
    }

    const handleBeforeLeave = (el) => {
      el.classList.add('transition-height', 'overflow-hidden')
      const child = el.firstChild
      const { height } = child.getBoundingClientRect()
      Object.assign(el.style, {
        height: height + 'px',
      })
    }

    const handleLeave = (el, done) => {
      ;(el as HTMLElement).ontransitionend = () => done()
      setTimeout(() => {
        Object.assign(el.style, {
          height: 0,
        })
      })
    }

    return () => (
      <Transition
        css={false}
        onBeforeEnter={handleBeforeEnter}
        onEnter={handleEnter}
        onAfterEnter={handleAfterEnter}
        onBeforeLeave={handleBeforeLeave}
        onLeave={handleLeave}
      >
        {slots.default?.()}
      </Transition>
    )
  },
})
