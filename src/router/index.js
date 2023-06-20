import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import HomeSug from '../views/home/HomeSug.vue'

Vue.use(VueRouter)

// 路由表
const routes = [
    {path:'/login',name:'loginview',component:LoginView},
    {path:'/home',name:'homesug',component:HomeSug},
]

const router = new VueRouter({
    mode:'history',
    routes
})
// 重复跳转不报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router 