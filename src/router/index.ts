import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppsView from "../views/AppsView.vue";
import SettingsView from "@/views/SettingsView.vue";
import ConnectView from "@/views/ConnectView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/apps',
            name: 'apps',
            component: AppsView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView
        },
        {
            path: '/connect',
            name: 'connect',
            component: ConnectView
        },
    ]
})

export default router
