import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import login from '../views/login.vue';
import register from '../views/register.vue';
import user from '../views/user.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login', //命名路由,使用params路由传参时必须要使用命名路由
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/user',
    name: 'user',
    component: user,
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
