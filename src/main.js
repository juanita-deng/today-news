import Vue from 'vue';
import App from './App.vue';
import './styles/base.css'; // 导入全局通用样式
import './styles/iconfont.css'; // 导入字体图标样式
import router from './router';

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
