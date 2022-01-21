import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import Menu from './pages/Menu.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/menu/home'
  },
  {
    path: '/:pathMathc(.*)*',
    redirect: '/menu/home'
  },
  {
    path: '/menu/',
    component: Menu,
    children: [
      {
        path: 'home',
        component: () => import('./pages/Home.vue'),
      },
      {
        path: 'weather',
        component: () => import('./pages/Weather.vue')
      },
      {
        path: 'optics',
        component: () => import('./pages/Optics.vue')
      },
      {
        path: 'magni',
        component: () => import('./pages/Magnification.vue')
      },
      {
        path: 'telescope',
        component: () => import('./pages/Telescope.vue')
      },
      {
        path: 'ccd',
        component: () => import('./pages/CCD.vue')
      },
      {
        path: 'settings',
        component: () => import('./pages/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;