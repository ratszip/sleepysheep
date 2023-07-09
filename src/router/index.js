import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register/Register.vue'
import Home from '../views/home/Home.vue'
import Post from '@/views/post/Post.vue'
import User from '@/views/user/User.vue'
import Pop from '@/views/Pop.vue'

Vue.use(VueRouter)

// 路由表
const routes = [
    {path:'/register',name:'register',component:Register},
    {path:'/home',name:'home',component:Home},
    {path: '/', redirect: '/home'},
    {path:'/user',name:'user',component:User},
    {path:'/post',name:'post',component:Post},
    {path:'/wt',name:'pop',component:Pop},
]

const router = new VueRouter({
    mode:'history',
    // mode:'hash',
    routes
})
// 重复跳转不报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// const whiteList=['/','/home','user']
// router.beforeEach((to, from, next) => {
//   if (to.path === '/'|| to.path === '/home') {
//     next();
//   //   Pop.open();
//   } else {
//     let token = localStorage.getItem('token');
//     if(token==null){
//       next(false)
//     }
//   }
// });

export default router 