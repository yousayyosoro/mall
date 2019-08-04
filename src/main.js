import 'babel-polyfill';

import Vue from 'vue';
import App from './App';
import router from './router';
import './config/rem';
// main.js要把第三方插件加载全,下面是第三方插件
import fastclick from 'fastclick';
import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';
import VueLazyload from 'vue-lazyload';

fastclick.attach(document.body);

Vue.config.productionTip = false;
// vue-lazyload使用前需要先使用一次
Vue.use(VueLazyload, {
  preLoad: 1.2, // 预加载参数,1表示整个屏幕
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1 // 尝试次数
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
