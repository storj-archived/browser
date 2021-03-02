import Vue from 'vue'
import VueRouter from 'vue-router'

import FileBrowser from '../components/FileBrowser.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: FileBrowser,
        children: [
            {
                path: "*",
                component: FileBrowser
            }
        ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
