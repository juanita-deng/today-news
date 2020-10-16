<template>
  <div class="regis">
    <HmHeaders>注册</HmHeaders>
    <HmLogo />
    <HmInput placeholder="用户名/手机号码" type="text" ref="userName" v-model="userName" message="用户名错误" :rule="/^1\d{4,10}$/"></HmInput>
    <HmInput placeholder="昵称" type="text" ref="nickName" v-model="nickName" message="请输入正确的昵称" :rule="/\w{4}/"></HmInput>
    <HmInput placeholder="密码" type="password" ref="password" v-model="password" message="密码错误" :rule="/^\d{4,12}$/"></HmInput>
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
    async clickFn() {
      const re1 = this.$refs.userName.validate(this.userName);
      const re2 = this.$refs.nickName.validate(this.nickName);
      const re3 = this.$refs.password.validate(this.password);
      if (!re1 || !re2 || !re3) {
        return;
      }
      const parm = {
        username: this.userName,
        password: this.password,
        nickname: this.nickName,
      };
      const res = await this.$axios.post('/register', parm);
      console.log('注册==>res', res);
      if (res.data.statusCode === 200) {
        this.$router.push({
          path: '/login',
          name: 'login',
          // params传参必须是命名路由(query传参会在路由上展示)
          params: {
            username: this.userName,
            password: this.password,
          },
        });
      } else {
        this.$toast.fail(res.data.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
