<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
      <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsInfo.content">

    </div>
    <comment-box></comment-box>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import comment from "../subcomponents/comment.vue";

  export default {
    data() {
      return {
        id: this.$route.params.id,
        newsInfo: {}
      }
    },
    created() {
      this.getNewsInfo(this.id)
    },
    methods: {
      getNewsInfo(id) {
        const url = '/api/getnew/' + id;
        this.$http.get(url).then(result => {
          if (result.data.status === 0) {
            this.newsInfo = result.data.message[0]
          } else {
            Toast('获取新闻资讯失败');
          }
        })
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
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      color: red;
    }

    .subtitle {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }

    .content {
      img {
        width: 100%;
      }
    }
  }

</style>