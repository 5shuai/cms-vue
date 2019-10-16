<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
           class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id === 0 ?'mui-active':'']" v-for="item in cates" :key="item.id"
             @click="getImgListById(item.id)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.img_url" :to="'/home/photoInfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="title">{{item.title}}</h1>
          <div class="body" v-html="item.content">
          </div>
        </div>
      </router-link>
    </ul>
  </div>

</template>

<script>
  import '../../lib/mui/js/webviewGroup.js'
  import mui from '../../lib/mui/js/mui.min.js'

  export default {
    data() {
      return {
        cates: [],
        list: []
      }
    },
    created() {
      this.getAllCategory();
      this.getImgListById(0);
    },
    mounted() {
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      getAllCategory() {
        const url = '/api/getimgcategory';
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            res.data.message.unshift({title: '全部', id: 0});
            this.cates = res.data.message
          }
        });
      },
      getImgListById(id) {
        const url = '/api/getimages/' + id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.list = res.data.message
          }
        });
      }
    }
  };


</script>

<style lang="scss" scoped>
  * {
    touch-action: pan-y;
  }

  .photo-list {
    list-style: none;
    padding: 0 10px 0;

    .info {
      position: absolute;
      bottom: 0;
      color: white;
      text-align: left;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;

      .title {
        font-size: 14px;
      }

      .body {
        font-size: 13px;
      }
    }

    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 6px #999;
      position: relative;

      img {
        width: 100%;
        vertical-align: middle;
      }

      img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
  }
</style>