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
        path: 'page1',
        component: () => import('../views/Page1.vue')
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