<template>
    <Map class="map" id="map" style="height: 100%, width:100%"/>
    <!-- <SideBar class="side-bar" style="width:15%" /> -->
</template>

<script setup>
import Map from './components/Map.vue'
import SideBar from './components/SideBar.vue'
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  display: flex;
}

body {
  background-color: black;
  margin: 0;
}
</style>
