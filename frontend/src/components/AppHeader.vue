<template>
  <header>
    <nav aria-label="Main Navigation">
      <ul>
        <li>
          <router-link to="/">Operators</router-link>
        </li>
      </ul>
    </nav>    
</header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style lang="stylus" scoped>
  header
    padding 1rem
    color #fff
    background-color #003366
  
  nav
    ul
      list-style-type none 

    li
      display inline-block

      + li
        margin-left 1rem

    a
      color #fff
</style>