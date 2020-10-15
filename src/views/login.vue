<template>
  <div class="login">
    <hm-headers>登录</hm-headers>
    <hm-logo />
    <HmInput placeholder="用户名/手机号码" type="text" message="用户名错误" v-model="userName" :rule="/^1\d{4,10}$/"></HmInput>
    <HmInput placeholder="密码" type="password" message="密码错误" :rule="/^\d{4,12}$/" v-model="password"></HmInput>
    <HmButton @clickFn="clickFn">登录</HmButton>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
    };
  },
  methods: {
    clickFn() {
      console.log('登陆');
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
}
</style>
