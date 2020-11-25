<template>
  <div id="app">
    <AppHeader class="app-header"></AppHeader>
    <div class="app-body">
      <router-view></router-view>
      <!-- <Home /> -->
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
// import Home from './views/index.vue'


export default {
  name: 'App',
  components: {
    AppHeader,
  }
}
</script>

<style lang="stylus">
  @import './assets/styl/base.styl'
  @import './assets/styl/layout.styl'

#app {
  position relative
  display flex
  flex-direction column
  height: 100vh
}

.app-header
  position sticky
  top 0
  z-index 3

.app-body
  padding 3rem
</style>
