import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        component: DefaultLayout, 
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('../views/about/About.vue')
            }
        ]
    },
    {
       
        path: '/login',
        name: 'login',
        component: Login

    },
    {
        path: '/:catchAll(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue')
    },
    // {
    //     path: '/login',
    // }
  ]
})

export default router