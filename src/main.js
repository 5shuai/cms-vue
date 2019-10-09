import Vue from 'vue'
import app from "./app.vue";
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
var vm = new Vue({
  el: '#app',
  render: c => c(app)
})