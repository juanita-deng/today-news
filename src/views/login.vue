<template>
  <div class="login">
    <hm-headers>登录</hm-headers>
    <hm-logo />
    <HmInput ref="username" placeholder="用户名/手机号码" type="text" message="用户名错误" v-model="userName" :rule="/^1\d{4,10}$/"></HmInput>
    <HmInput ref="password" placeholder="密码" type="password" message="密码错误" :rule="/^\d{3,12}$/" v-model="password"></HmInput>
    <HmButton @clickFn="clickFn">登录</HmButton>
    <div class="bottom">
      没有账号?去
      <span @click="$router.push('/register')">注册</span>
    </div>
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
  created() {
    this.userName = this.$route.params.username || '';
    this.password = this.$route.params.password || '';
  },
  methods: {
    async clickFn() {
      const res1 = this.$refs.username.validate(this.userName);
      const res2 = this.$refs.password.validate(this.password);
      if (!res1 || !res2) {
        return;
      }
      const parm = {
        username: this.userName,
        password: this.password,
      };
      const res = await this.$axios.post('/login', parm);
      console.log('登陆==>res', res);
      const { statusCode, message, data } = res.data;
      if (statusCode === 200) {
        this.$toast.success(message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        this.$router.push('/user');
      } else {
        this.$toast.fail(message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .bottom {
    text-align: right;
    font-size: 24px;
    margin-top: 50px;
    margin-right: 20px;
    span {
      color: red;
    }
  }
}
</style>
