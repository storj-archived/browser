import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from "../views/Dashboard.vue";
import FileBrowser from '../views/FileBrowser.vue';
import Buckets from '../views/Buckets.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Dashboard,
        children: [
            {
                path: "/buckets",
                component: Buckets
            },
            {
                path: "/files",
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
