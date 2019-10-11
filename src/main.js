import Vue from 'vue'
import app from "./app.vue";
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router';
import router from "./router.js";
import Axios from "axios";
import moment from "moment";

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

Vue.filter('dateFormat', function (datestr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(datestr).format(pattern)
})

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router
})

