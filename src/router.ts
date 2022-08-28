import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router'
import Menu from './pages/Menu.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/menu/home'
  },
  {
    path: '/:pathMatch(.*)',
    component: Menu
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
        path: 'solarSystem',
        component: () => import('./pages/SolarSystem.vue'),
      },
      {
        path: 'weather',
        component: () => import('./pages/Weather.vue')
      },
      {
        path: 'sky',
        component: () => import('./pages/Sky.vue')
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
        path: 'filter',
        component: () => import('./pages/Filter.vue')
      },
      {
        path: 'ccd',
        component: () => import('./pages/CCD.vue')
      },
      {
        path: 'guiding',
        component: () => import('./pages/Guiding.vue')
      },
      {
        path: 'settings',
        component: () => import('./pages/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;