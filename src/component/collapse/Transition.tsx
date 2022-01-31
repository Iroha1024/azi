import { defineComponent, Transition } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const handleBeforeEnter = (el) => {
      el.classList.add('transition-[height]', 'overflow-hidden')
      Object.assign(el.style, {
        height: 0,
      })
      void el.offsetHeight
    }

    const handleEnter = (el, done) => {
      el.ontransitionend = (e) => {
        if (e.currentTarget === e.target) {
          done()
        }
      }
      const child = el.firstChild
      const { height } = child.getBoundingClientRect()
      Object.assign(el.style, {
        height: height + 'px',
      })
    }

    const handleAfterEnter = (el) => {
      Object.assign(el.style, {
        height: '',
      })
    }

    const handleBeforeLeave = (el) => {
      el.classList.add('transition-[height]', 'overflow-hidden')
      const child = el.firstChild
      const { height } = child.getBoundingClientRect()
      Object.assign(el.style, {
        height: height + 'px',
      })
      void el.offsetHeight
    }

    const handleLeave = (el, done) => {
      el.ontransitionend = (e) => {
        if (e.currentTarget === e.target) {
          done()
        }
      }
      Object.assign(el.style, {
        height: 0,
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
