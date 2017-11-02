<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="/">Jogo da memória</b-navbar-brand>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body {
    background-color: #e3e3e3;
  }
</style>
