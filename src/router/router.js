import Vue from "vue"
import VueRouter from "vue-router"
import Homepage from "@/components/Homepage/Homepage";
import OneTimePad from "@/components/Encryption/One Time Pad";
import VisualCryptography from "@/components/Encryption/Visual Cryptography";

// Do not install a router in tests, since that prevents $route and $router to be mocked.
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '',
        component: Homepage
    },
    {
        path: '/classicEncryption',
        name: 'classicEncryption',
        component: VisualCryptography,
    },
    {
        path: '/oneTimePadEncryption',
        name: 'oneTimePadEncryption',
        component: OneTimePad,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router