import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import Menu from '../views/Menu.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/menu/home'
  },
  {
    path: '/menu/',
    component: Menu,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: 'weather',
        component: () => import('../views/Weather.vue')
      },
      {
        path: 'optics',
        component: () => import('../views/Optics.vue')
      },
      {
        path: 'magni',
        component: () => import('../views/Magnification.vue')
      },
      {
        path: 'telescope',
        component: () => import('../views/Telescope.vue')
      },
      {
        path: 'ccd',
        component: () => import('../views/CCD.vue')
      },
      {
        path: 'settings',
        component: () => import('../views/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  // @ts-ignore
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;