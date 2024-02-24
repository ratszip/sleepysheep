import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/register/Register.vue'
import Home from '../views/home/Home.vue'
import Post from '@/views/post/Post.vue'
import User from '@/views/user/User.vue'
import Pop from '@/views/Pop.vue'
import FoFans from '@/views/user/Fofan.vue'
import EditUser from '@/views/user/EditUser.vue'
import Topic from '@/views/post/Topic.vue' 
import Setting from '@/views/user/Settings.vue' 
import password from '@/views/user/modify.vue' 
import NotFound from '@/views/NotFound.vue'
import ManaLogin from '@/views/manage/ManaLogin.vue'
import ManaHome from '@/views/manage/ManaHome.vue'
Vue.use(VueRouter)

// 路由表
const routes = [
    {path:'/register',name:'register',component:Register},
    {path:'/home',name:'home',component:Home},
    {path: '/', redirect: '/home'},
    {path:'/user/:uid',name:'user',component:User},
    {path:'/post',name:'post',component:Post},
    {path:'/wt',name:'pop',component:Pop},
    {path:'/fans/:id/:act',name:'fans',component:FoFans},
    {path:'/edit',name:'edit',component:EditUser},
    {path:'/topic/:id',name:'topic',component:Topic},
    {path:'/settings',name:'set',component:Setting},
    {path:'/404',name:'404',component:NotFound},
    {path:'/password',name:'pwd',component:password},
    { path: '*',redirect: '404' },
    {path:'/admin/login',name:'mlogin',component:ManaLogin},
    {
      path:'/admin/home',
      name:'mhome',
      component:ManaHome,
    },
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