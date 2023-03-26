import Vue from 'vue'
import VueRouter from 'vue-router'
import Loginview from '../views/login/login.vue'

Vue.use(VueRouter)

// 路由表
const routes = [
    {path:'/login',name:'loginview',component:Loginview}
]

const router = new VueRouter({
    routes
})

export default router 