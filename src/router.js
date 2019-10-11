import VueRouter from 'vue-router';
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import SearchContainer from "./components/tabbar/SearchContainer.vue";
import ShopCarContainer from "./components/tabbar/ShopCarContainer.vue";
import newslist from "./components/news/newslist.vue";
import newsInfo from "./components/news/newsInfo.vue";

var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeContainer},
    {path: '/member', component: MemberContainer},
    {path: '/shopcar', component: ShopCarContainer},
    {path: '/search', component: SearchContainer},
    {path: '/home/newslist', component: newslist},
    {path:'/home/newsinfo/:id',component:newsInfo}
  ],
  linkActiveClass: 'mui-active'
})


export default router