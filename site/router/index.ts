import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'button',
      path: '/button',
      component: () => import('../component/Button.vue'),
    },
    {
      name: 'checkbox',
      path: '/checkbox',
      component: () => import('../component/Checkbox.vue'),
    },
    {
      name: 'collapse',
      path: '/collapse',
      component: () => import('../component/Collapse.vue'),
    },
    {
      name: 'ellipsis',
      path: '/ellipsis',
      component: () => import('../component/Ellipsis.vue'),
    },
    {
      path: '/',
      redirect: '/button',
    },
  ],
})
