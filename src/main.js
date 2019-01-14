// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import Vant from 'vant';
import 'vant/lib/index.css';

import '../static/css/reset.css'
import '../src/assets/iconfont/iconfont.css'
import '../src/assets/iconfont/iconfont.js'


import router from './router'
Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Mint)
Vue.use(Vant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
