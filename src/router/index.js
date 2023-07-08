import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login/LoginView.vue'
import Home from '../views/home/Home.vue'
import Post from '@/views/post/Post.vue'
import User from '@/views/user/User.vue'
import WaterFall from '@/views/home/WaterFall.vue'

Vue.use(VueRouter)

// 路由表
const routes = [
    {path:'/login',name:'loginview',component:LoginView},
    {path:'/home',name:'home',component:Home},
    {path:'/user',name:'user',component:User},
    {path:'/post',name:'post',component:Post},
    {path:'/wt',name:'water',component:WaterFall},
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login'|| to.path === '/home') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router 