import Vue from 'vue'
import app from "./app.vue";
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router';
import VuePreview from 'vue-preview';
import vuex from 'vuex'
import router from "./router.js";
import Axios from "axios";
import moment from "moment";

Vue.use(vuex);
Vue.use(VuePreview);
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = 'http://www.liulongbin.top:3005';

Vue.filter('dateFormat', function (datestr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(datestr).format(pattern)
});
let car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new vuex.Store({
  state: {
    car: car
  },
  mutations: {
    addCount(state, obj) {
      let flag = false;
      state.car.some(item => {
        if (item.id === obj.id) {
          item.count += parseInt(obj.count);
          flag = true;
          return true
        }
      });
      if (!flag) {
        state.car.push(obj);
      }

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsInfo) {
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item['count'] = parseInt(goodsInfo.count);
          return true
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1);
          return true
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateSelectedStatus(state, statusObj) {
      state.car.some(item => {
        if (item.id === statusObj.id) {
          item.selected = statusObj.status;
          return true;
        }
      });
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      let num = 0;
      state.car.forEach(item => {
        num += item.count
      });
      return num;
    },
    getGoodsCount(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count
      });
      return o
    },
    getGoodsSelected(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndPrice(state) {
      let obj = {count: 0, price: 0};
      state.car.forEach(item => {
        if (item.selected === true) {
          obj.count += item.count;
          obj.price += item.price * item.count
        }
      });
      return obj;
    }
  }
});

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
});

