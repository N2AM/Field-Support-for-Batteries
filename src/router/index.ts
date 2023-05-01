import { BATTERY_SUPPORT } from './../modules/batteries-support/constants/paths';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: BATTERY_SUPPORT,
      component: () => import('../modules/batteries-support/views/HomeView.vue')
    }
  ]
})

export default router