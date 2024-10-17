import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SDSelector from '../views/SDSelector.vue'
import { useSDStore } from '@/stores/sd'
import { useOptionsStore } from '@/stores/options'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: SDSelector
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/MenuView.vue'),
    beforeEnter: async (to, from, next) => {
      const sdStore = useSDStore()
      // Check if files are loaded
      if (sdStore.isReady) {
        next() // Allow navigation
      } else {
        next('/') // Redirect to home or another route if files are not loaded
      }
    }
  },
  {
    path: '/options',
    name: 'Options Editor',
    component: () => import('../views/OptionsView.vue'),
    beforeEnter: async (to, from, next) => {
      const sdStore = useSDStore()
      const optionsStore = useOptionsStore()
      // Check if files are loaded
      if (sdStore.isReady) {
        await optionsStore.readFile()
        next() // Allow navigation
      } else {
        next('/') // Redirect to home or another route if files are not loaded
      }
    }
  },
  // {
  //   path: '/banks',
  //   name: 'Banks',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/OptionsView.vue')
  // },
  {
    path: '/settings',
    name: 'App Settings',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/SettingsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const menuRoutes = routes.filter((r) => r.path != '/' && r.path != '/menu')

export default router
