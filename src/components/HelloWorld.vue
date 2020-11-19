<template>
  <div class="app" ref="parentSidebar" id="parentx">
    <vs-navbar v-model="activeItem" class="nabarx">
      <div slot="title">
        <vs-navbar-title>
          TRACKS
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-input icon="search" placeholder="Search" v-model="search"/>
    </vs-navbar>
    <vs-button @click="active=!active" color="primary" type="filled">Open Sidebar</vs-button>
    <vs-sidebar :parent="$refs.parentSidebar" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data:()=>({
    active: false,
  })
}
</script>

<style>
  .app {
    position: relative;
    width: 100vw;
    height: 100vh;
  }

  .vs-sidebar--background {
    top: 0;
  }
</style>
