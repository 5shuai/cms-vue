<template>
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChange"
           ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from "../../lib/mui/js/mui.min"

  export default {
    data() {
      return {}
    },
    mounted() {
      mui(".mui-numbox").numbox();
    },
    methods: {
      countChange() {
        const goodsinfo = {id: this.goodsId, count: this.$refs.numbox.value};
        console.log(goodsinfo);
        this.$store.commit('updateGoodsInfo', goodsinfo)
      }
    },
    props: ["initcount", "goodsId"]
  }
</script>

<style lang="scss" scoped>

</style>