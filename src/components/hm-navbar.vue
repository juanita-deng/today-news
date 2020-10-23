<template>
  <div class="navbar">
    <div class="left">{{ title }}</div>
    <div class="right" @click="$emit('click')">
      {{ content }}
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  margin: 0 40px;
  height: 100px;
  line-height: 100px;
  border-bottom: 1px solid #ccc;
  .iconfont {
    font-size: 32px;
  }
  .right {
    color: #ccc;
  }
}
</style>
