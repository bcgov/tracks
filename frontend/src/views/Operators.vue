<template>
  <div class="content-wrapper">
    <main>
      <header>
        <h1>Operators</h1>
        <router-link to="/create-operator">
          <vs-icon 
            icon-pack="mdi"
            icon="mdi-plus"
          ></vs-icon>
          Create Operator
        </router-link>
      </header>

      <vs-table hoverFlat :data="operators">

        <template slot="thead">
          <vs-th>
            Name
          </vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="data[indextr].name">
              <router-link
                to="/operator-detail"
                class="operator-link"
              >
                {{data[indextr].name}}
              </router-link>
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>

    </main>
  </div>
</template>

<script>
export default {
  name: 'Operators',

  data:()=>({
    operators: [
      {
        name: 'Operator One',
      },
      {
        name: 'Operator Two'
      }
    ]
  })
}
</script>

<style lang="stylus" scoped>
  header 
    display flex
    align-items center
    margin-bottom 2rem
  
  header a 
    margin-left auto

  thead tr 
    border-bottom 1px solid #999999 !important

  tr 
    border-top 1px solid #999999 !important

  .vs-table--tbody-table .tr-values td,
  th
    padding 1rem

  .operator-link 
    text-decoration: underline
</style>