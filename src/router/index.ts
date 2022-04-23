import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import home from '@/views/home.vue'
import dormitoryMap from '@/views/dormitoryMap.vue'
import test from '@/views/test.vue'
import fengMap from '@/views/fengMap.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/fengMap'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: 'dormitoryMap',
        name: 'dormitoryMap',
        component: dormitoryMap
      },
      {
        path: 'test',
        name: 'test',
        component: test
      },
      {
        path: 'fengMap',
        name: 'fengMap',
        component: fengMap
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
