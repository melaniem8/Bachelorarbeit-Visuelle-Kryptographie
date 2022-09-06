<template>
  <div id="app">
    <v-app>
      <Toolbar></Toolbar>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Toolbar from "@/Navigation/Toolbar"

export default {
  name: 'App',
  components: {
    Toolbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
