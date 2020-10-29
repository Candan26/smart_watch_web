import Vue from 'vue'
import App from './App.vue'
import BootstrapVue  from "bootstrap-vue";
import IconsPlugin  from "bootstrap-vue";
import VueApexCharts from 'vue-apexcharts'


import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.styles/wijmo.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'bootstrap'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
new Vue({
  render: h => h(App),
}).$mount('#app')
