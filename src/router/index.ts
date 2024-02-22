import { createRouter, createWebHistory } from 'vue-router'

export const HomeView = {
  path: '/',
  name: 'home',
  component: () => import('../views/HomeView.vue')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeView,
  ]
})

export default router
