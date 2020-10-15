<template>
  <div class="hm-input">
    <input :type="type" :class="{ success: status === 'success', fail: status === 'fail' }" :placeholder="placeholder" :value="value" @input="inputFn" />
    <div class="error" v-show="status === 'fail'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: '',
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入',
    },
    type: {
      type: String,
      default: 'text',
      required: true,
    },
    value: {
      type: String,
      default: '',
      required: true,
    },
    rule: {
      type: RegExp,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputFn(e) {
      this.$emit('input', e.target.value);
      if (!this.rule.test(this.value)) {
        this.status = 'fail';
      } else {
        this.status = 'success';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hm-input {
  margin: 0 40px;
  height: 120px;
  input {
    width: 100%;
    height: 80px;
    line-height: 80px;
    border: none;
    outline: none;
    border-bottom: 1px solid #cccccc;
    appearance: none;
    text-align: left;
    font-size: 32px;
    &.success {
      border-color: green;
    }
    &.fail {
      border-color: red;
    }
  }
  .error {
    color: red;
  }
}
</style>
