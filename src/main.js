import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import pop from '@/util/globle'
// 加载全局样式
import 'vant/lib/index.css'
import './style/index.less'
import "amfe-flexible"

Vue.use(Vant)
Vue.use(pop)
Vue.use(Toast)
Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
