import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载全局样式
import './style/index.less'
import waterfall from 'vue-waterfall2'
import "amfe-flexible"
Vue.use(Vant)
Vue.use(waterfall)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
