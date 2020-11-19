import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import App from './App.vue'

Vue.use(Vuesax, {
  theme:{
    colors:{
      primary:'#003366',
    }
  }
})

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
