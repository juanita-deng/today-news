import Vue from 'vue';
import App from './App.vue';
import './styles/base.css'; // 导入全局通用样式
import './styles/iconfont.css'; // 导入字体图标样式
import router from './router';
import VueRouter from 'vue-router';
import axios from 'axios';
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(VueRouter);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
// 解决路由重复报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
axios.interceptors.response.use((res) => {
  const { statusCode, message } = res.data;
  if (statusCode === 401 && message === '用户名或者密码错误') {
    router.push('/login');
    Toast.fail(message);
  }
  return res;
});
import HmHeaders from './components/hm-headers.vue';
import HmLogo from './components/hm-logo.vue';
import HmButton from './components/hm-button.vue';
import HmInput from './components/hm-input.vue';
Vue.component('HmHeaders', HmHeaders);
Vue.component('HmLogo', HmLogo);
Vue.component('HmButton', HmButton);
Vue.component('HmInput', HmInput);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
