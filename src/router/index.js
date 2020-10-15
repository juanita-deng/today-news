import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import login from '../views/login.vue';
import register from '../views/register.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
