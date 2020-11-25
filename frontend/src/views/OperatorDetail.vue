<template>
  <div class="content-wrapper">

    <nav class="breadcrumbs" aria-label="breadcrumbs">
      <router-link to="/">
        <vs-icon 
          icon-pack="mdi"
          icon="mdi-arrow-left"
        ></vs-icon>
        Back to Operators
      </router-link>
    </nav>

    <main>
      <header>
        <h1>{{name}}</h1>
      </header>
    </main>
  </div>
</template>

<script>
export default {
  name: 'OperatorDetail',

  data:()=>({
    name: 'Operator One'
  })
}
</script>