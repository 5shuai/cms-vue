<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(item, i) in list" :key="i" @click="getDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="box">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sold-num">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        pageIndex: 1
      }
    },
    created() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        const url = '/api/getgoods/?pageindex=' + this.pageIndex;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.list = this.list.concat(res.data.message);
          }
        })
      },
      getMore() {
        this.pageIndex++;
        this.getGoodsList();
      },
      getDetail(id) {
        this.$router.push({name: "goodsinfo", params: {id: id}})
      }
    }

  }
</script>

<style lang="scss" scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item {
      padding: 2px;
      width: 49%;
      border: 1px solid #ccc;
      box-shadow: 0 0 8px #ccc;
      margin: 3px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 293px;

      img {
        width: 100%;
      }

      .title {
        font-size: 14px;
      }

      .box {
        p {
          margin: 0;
          padding: 5px;
        }

        background-color: #eee;

        .price {
          .old {
            text-decoration: line-through;
            font-size: 12px;
            margin-left: 10px;
          }

          .now {
            color: red;
            font-weight: bold;
            font-size: 16px;
          }
        }

        .sold-num {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
      }
    }
  }
</style>