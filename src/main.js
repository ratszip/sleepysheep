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
import waterfall from 'vue-waterfall2'
import { PullRefresh } from 'vant';
import { ActionSheet } from 'vant';
import VueScroller from 'vue-scroller'
import { Cell, CellGroup } from 'vant';
import { Pagination } from 'vant';
import { CountDown } from 'vant';
// 引入模块后自动生效
// import '@vant/touch-emulator';

Vue.use(CountDown);
Vue.use(Pagination);
Vue.use(Cell);
Vue.use(CellGroup)
Vue.use(VueScroller)
Vue.use(ActionSheet);
Vue.use(PullRefresh)
Vue.use(waterfall)
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
