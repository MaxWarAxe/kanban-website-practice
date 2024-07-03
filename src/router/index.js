import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/tasks/:id', component: () => import('@/components/TaskEdit.vue')}
  ]
})

export default router
