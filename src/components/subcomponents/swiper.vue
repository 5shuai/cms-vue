<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, i) in lunbotuList" :key="i">
        <img :src="item.img" alt="" :class="{full:isFull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    props: ["lunbotuList", "isFull"]
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;
      img {
        height: 100%;
        /*width: 100%;*/
      }

    }
  }
  .full{
    width: 100%;
  }
</style>