<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  max-width: 640px;
  min-width: 320px;
  margin: 0 auto;
  background-color: #f6f6f6;
}
</style>
