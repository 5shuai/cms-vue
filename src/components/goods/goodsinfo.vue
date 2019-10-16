<template>
  <div class="goodsinfo-container">
    <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotu-list="list" :isFull="false"></swiper>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span
                  class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getCount="getSelectCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}} 件</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goComment(id)">商品评论</mt-button>

      </div>
    </div>
  </div>
</template>

<script>
  import swiper from "../subcomponents/swiper.vue";
  import numbox from "../subcomponents/goodsinfo_numbox.vue";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        list: [],
        goodsinfo: {},
        ballFlag: false,
        selectedCount:1
      }
    },
    created() {
      this.getLunboTuList();
      this.getGoodsInfo()
    },
    methods: {
      getLunboTuList() {
        const url = '/api/getthumimages/' + this.id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            res.data.message.forEach(item => {
              item['img'] = item['src']
            });
            this.list = res.data.message;
          }
        });
      },
      getGoodsInfo() {
        const url = '/api/goods/getinfo/' + this.id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.goodsinfo = res.data.message[0];
          }
        });
      },
      goDesc(id) {
        this.$router.push({name: 'goodsDesc', params: {id: id}})
      },
      goComment(id) {
        this.$router.push({name: 'goodsComment', params: {id: id}})
      },
      addToCart() {
        this.ballFlag = true

      },
      beforeEnter(el) {
        el.style.transform = "translate(0,0)"
      },
      enter(el, done) {
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById("badge").getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;
        el.offsetWidth;
        el.style.transform = "translate(88px,210px)";
        el.style.transform = `translate(${xDist}px,${yDist}px`;

        el.style.transition = 'all 1s cubic-bezier(0.4,-0.8,0.5,.68)';
        done()
      },
      afterEnter(el) {
        this.ballFlag = !this.ballFlag
      },
      getSelectCount(count){
        this.selectedCount = count;
      }
    },
    components: {
      swiper,
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .goodsinfo-container {
    .ball {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: red;
      position: absolute;
      z-index: 99;
      top: 408px;
      left: 150px;

    }

    background-color: #eee;
    overflow: hidden;

    .now_price {
      font-size: 16px;
      font-weight: bold;
      color: red;
    }

    .mui-card-footer {
      display: block;

      button {
        margin-bottom: 15px;
      }
    }
  }
</style>