<template>
  <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChange" ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  import mui from "../../lib/mui/js/mui.min"

  export default {
    data() {
      return {
        num: ''
      }
    },
    mounted() {
      mui(".mui-numbox").numbox();
    },
    methods: {
      countChange() {
        this.$emit('getCount', parseInt(this.$refs.numbox.value))
      }
    },
    watch: {
      'max': function (newVal, oldVal) {
        mui(".mui-numbox").numbox().setOption("max", newVal)
      }
    },
    props: ['max']
  }
</script>

<style lang="scss" scoped>

</style>