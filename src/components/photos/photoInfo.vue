<template>
  <div>
    <div class="newsinfo-container">
      <h3 class="title">{{photoInfo.title}}</h3>
      <p class="subtitle">
        <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
        <span>点击：{{photoInfo.click}}次</span>
      </p>
      <hr>
      <!--      <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100"-->
      <!--           @click="$preview.open(index,list)" :key="index">-->
      <div class="small-image">
        <vue-preview :slides="list"></vue-preview>
      </div>
      <div class="content" v-html="photoInfo.content">
      </div>
      <comment-box :id="this.id"></comment-box>
    </div>
  </div>
</template>

<script>
  import comment from "../subcomponents/comment.vue";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: {},
        list: []
      }
    },
    created() {
      this.getPhotoInfo();
      this.getPhotoList()
    },
    methods: {
      getPhotoInfo() {
        const url = '/api/getimageInfo/' + this.id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {
            this.photoInfo = res.data.message[0]
          }
        });
      },
      getPhotoList() {
        const url = '/api/getthumimages/' + this.id;
        this.$http.get(url).then(res => {
          if (res.data.status === 0) {

            res.data.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src
            });
            this.list = res.data.message;
          }
        });
      }
    },
    components: {
      'comment-box': comment
    }
  }
</script>

<style lang="scss" scoped>
  .newsinfo-container {
    padding: 0 4px;


    .title {
      text-align: center;
      margin: 15px 0;
      color: #26A2FF;
      font-size: 15px;
    }

    .subtitle {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }

    .content {
      font-size: 14px;
      line-height: 30px;
    }
  }
</style>