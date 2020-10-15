<template>
  <div class="regis">
    <HmHeaders>注册</HmHeaders>
    <HmLogo />
    <HmInput placeholder="用户名/手机号码" type="text" v-model="userName" message="用户名错误" :rule="/^1\d{4,10}$/"></HmInput>
    <HmInput placeholder="昵称" type="text" v-model="nickName" message="请输入正确的昵称" :rule="/\w{4}/"></HmInput>
    <HmInput placeholder="密码" type="password" v-model="password" message="密码错误" :rule="/^\d{4,12}$/"></HmInput>
    <HmButton @clickFn="clickFn">注册</HmButton>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      userName: '',
      nickName: '',
      password: '',
    };
  },
  methods: {
    clickFn() {
      console.log('注册');
    },
  },
};
</script>

<style></style>
