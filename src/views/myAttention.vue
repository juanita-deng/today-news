<template>
  <div class="my-attention">
    <hm-headers>我的关注</hm-headers>
    <div class="attention-info" v-for="(item, index) in myAttentionList" :key="index">
      <div class="attention-info__left">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        <div class="attention-info__left__info">
          <p class="attention-info__left__info__news">{{ item.nickname }}</p>
          <p class="attention-info__left__info__times">{{ item.create_date | data }}</p>
        </div>
      </div>
      <div class="attention-info__right" @click="cancelAttention(item.id)">
        <button>取消关注</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myAttentionList: [],
    };
  },
  created() {
    this.attentionList();
  },
  methods: {
    async attentionList() {
      const res = await this.$axios.get('/user_follows');
      // console.log('attentionList====>res', res);
      const { statusCode, data } = res.data;
      if (statusCode === 200) {
        this.myAttentionList = data || [];
      }
    },
    async cancelAttention(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要取消关注嘛?',
        });
        const res = await this.$axios.get(`/user_unfollow/${id}`);
        console.log('cancelAttention====>res', res);
        const { statusCode, message } = res.data;
        if (statusCode === 200) {
          this.$toast.success(message);
          this.attentionList();
        }
      } catch {
        this.$toast.success('操作取消');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-attention {
  .attention-info {
    @extend .flex-center;
    padding: 30px;
    border-bottom: 1px solid #dddddd;
    &__left {
      @extend .flex-center;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
      &__info {
        padding-left: 30px;
        &__news {
          font-size: 36px;
          color: #333333;
        }
        &__times {
          font-size: 28px;
          color: #666666;
        }
      }
    }
    &__right {
      button {
        padding: 15px 30px;
        font-size: 28px;
        color: #666666;
        border: none;
        border-radius: 60px;
      }
    }
  }
}
</style>
