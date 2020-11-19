<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './views/index.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="stylus">
 @import './assets/styl/base.styl'; 

#app {
  position: relative;
  display: flex;
  height: 100vh;
}
</style>
