import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import home from '../views/home.vue'
import dormitoryMap from '../views/dormitoryMap.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: home,
    children: [
      {
        path: 'dormitoryMap',
        name: 'dormitoryMap',
        component: dormitoryMap
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
