<template>
  <div class="headers">
    <div class="left" @click="$router.go(-1)">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="titile">
      <slot />
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'hm-headers',
  props: {
    // title: {
    //   type: String,
    //   default: '',
    // },
  },
};
</script>

<style lang="scss" scoped>
.headers {
  display: flex;
  justify-content: space-between;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  border-bottom: 1px solid #cccccc;
  padding: 0 10px;
  .title {
    font-weight: 700;
  }
  .iconfont {
    font-size: 32px;
  }
}
</style>
