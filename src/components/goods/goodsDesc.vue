<template>
  <div class="goods-desc">
    <h3>{{info.title}}</h3>
    <hr>
    <div class="content">
      <p v-html="info.content"></p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {}
      }
    },
    created() {
      this.getGoodsDesc()
    },
    methods: {
      getGoodsDesc() {
        const url = '/api/goods/getdesc/' + this.$route.params.id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.info = res.data.message[0]
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .goods-desc{
    padding: 4px;
    h3{
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
    .content{
      img{
        width: 100%;
      }
    }
  }
</style>