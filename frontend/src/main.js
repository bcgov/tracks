import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import '@mdi/font/css/materialdesignicons.min.css' // icon library (https://materialdesignicons.com/)

import App from './App.vue'

import CreateOperator from './views/CreateOperator.vue'
import Operators from './views/Operators.vue'
import OperatorDetail from './views/OperatorDetail.vue'

// Vuesax Config
Vue.use(Vuesax, {
  theme:{
    colors:{
      primary:'#003366',
    }
  }
})

// Routes
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', component: Operators },
    { path: '/create-operator', component: CreateOperator},
    { path: '/operator-detail', component: OperatorDetail}
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
