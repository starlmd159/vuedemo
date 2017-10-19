// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.min.css'
import mintUI from 'mint-ui'
import '../static/mui/css/mui.css'
import '../static/css/site.css'
import moment from 'moment'
import axios from './axios'
import VuePreview from 'vue-preview'

Vue.config.productionTip = false
Vue.use(mintUI)
Vue.use(VuePreview)
Vue.prototype.$axios = axios
Vue.filter('datefmt',function(input,fmtstring){
  return moment(input).format(fmtstring)
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
