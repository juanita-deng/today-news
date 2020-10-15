<template>
  <div class="container">
    <button @click="$emit('clickFn')"><slot /></button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    outline: none;
    font-size: 32px;
    width: 52vw;
    height: 13vw;
    border-radius: 6.5vw;
    color: #ffffff;
    border: none;
    background: linear-gradient(-90deg, #009c64, #29c38c);
  }
}
</style>
