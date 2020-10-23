<template>
  <div class="user">
    <hm-headers>个人中心</hm-headers>
    <div class="title">
      <!-- <img :src="$axios.defaults.baseURL + userInfo.head_img" alt="" /> -->
      <div
        class="avotar"
        @click="$router.push({ path: '/edit' })"
        :style="{ background: `url(${$axios.defaults.baseURL + userInfo.head_img}) no-repeat center 100%/100% `, width: '80px', height: '80px', borderRadius: '50%' }"
      ></div>
      <div class="info">
        <span class="iconfont" :class="{ 'iconxingbienv female': userInfo.gender === 0, 'iconxingbienan male': userInfo.gender === 1 }"></span>
        <span>{{ userInfo.nickname }}</span>
        <div>{{ userInfo.create_date | data }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1" />
      </div>
    </div>
    <HmNavbar title="我的关注" content="关注的用户"></HmNavbar>
    <HmNavbar title="我的跟帖" content="跟帖/回复"></HmNavbar>
    <HmNavbar title="我的收藏" content="文章/视频"></HmNavbar>
    <HmNavbar title="设置" @click="$router.push({ path: '/edit' })"></HmNavbar>
    <HmNavbar title="退出" @click="layOut"></HmNavbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const id = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      const res = await this.$axios({
        methods: 'get',
        url: `/user/${id}`,
        headers: {
          Authorization: token,
        },
      });
      this.userInfo = res.data.data || [];
      console.log('getuserInfo===>res', res);
    },
    // 退出
    layOut() {
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '确认退出吗?',
        })
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          this.$router.push('/login');
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  font-size: 32px;
  color: #333333;
  .iconfont {
    font-size: 32px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 20px;
    border-bottom: 10px solid #dddddd;
    .avotar {
      margin: 10px 20px;
    }
    .info {
      flex: 1;
      margin-left: 20px;
      .male {
        color: blue;
      }
      .female {
        color: pink;
      }
      div {
        color: #666666;
        font-size: 28px;
        margin: 10px 0;
      }
    }
  }
}
</style>
