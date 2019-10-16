import VueRouter from 'vue-router';
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopCarContainer from "./components/tabbar/ShopCarContainer.vue";
import newslist from "./components/news/newslist.vue";
import newsInfo from "./components/news/newsInfo.vue";
import PhotoList from "./components/photos/PhotoList.vue";
import photoInfo from "./components/photos/photoInfo.vue";
import goodsList from "./components/goods/goodsList.vue";
import goodsinfo from "./components/goods/goodsinfo.vue";
import goodsDesc from "./components/goods/goodsDesc.vue";
import goodsComment from "./components/goods/goodsComment.vue";

var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcar', component: ShopCarContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newslist', component: newslist},
    {path: '/home/newsinfo/:id', component: newsInfo},
    {path: '/home/photoList', component: PhotoList},
    {path: '/home/photoInfo/:id', component: photoInfo},
    {path: '/home/goodslist', component: goodsList},
    {path: '/home/goodsinfo/:id', component: goodsinfo, name: "goodsinfo"},
    {path: '/home/goodsdesc/:id', component: goodsDesc, name: "goodsDesc"},
    {path: '/home/goodscomment/:id', component: goodsComment, name: "goodsComment"}
  ],
  linkActiveClass: 'mui-active'
})


export default router