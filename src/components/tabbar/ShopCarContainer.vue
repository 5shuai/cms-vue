<template>
  <div class="shopcar-container">
    <div class="goodslist" v-for="(item, i) in list" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                       @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="box">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <box_num :initcount="$store.getters.getGoodsCount[item.id]" :goods-id="item.id"></box_num>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计运费</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndPrice.count}}</span> 件， 总价 <span class="red">￥{{$store.getters.getGoodsCountAndPrice.price}}</span> 元</p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shopcar_numberbox from "../subcomponents/shopcar_numberbox.vue";

  export default {
    data() {
      return {
        value: false,
        list: []
      }
    },
    created() {
      this.getShopCart()
    },
    methods: {
      show() {
        console.log(this.value)
      },
      getShopCart() {
        let list = [];

        this.$store.state.car.forEach(item => {
          list.push(item.id)
        });
        if (list.length <= 0) {
          return
        }
        const url = '/api/goods/getshopcarlist/' + list.join(',');
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.list = res.data.message;
          }
        })
      },
      remove(id, index) {
        this.list.splice(index, 1);
        this.$store.commit('removeFormCar', id)
      },
      selectedChange(id, status) {
        const obj = {id: id, status: status};
        this.$store.commit('updateSelectedStatus', obj)
      }
    },
    components: {
      'box_num': shopcar_numberbox
    }
  }
</script>

<style lang="scss" scoped>
  .shopcar-container {
    background-color: #eeeeee;
    overflow: hidden;

    .goodslist {
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }

      img {
        margin-left: 5px;
        width: 60px;
        height: 60px;
      }

      h1 {
        font-size: 13px;
      }

      .box {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .price {
          color: red;
          font-weight: bold;
        }
      }

    }

    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .red {
        color: red;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
</style>