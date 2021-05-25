<template>
    <div id="navbar">
      <router-link to="/" class="navbar-link">Map</router-link>
      <br>
      <router-link to="/details" class="navbar-link">Details</router-link>
    </div>
    <router-view></router-view>
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
  color: #ffffff;
  height: 100vh;
  width: 100vw;
  display: inherit;
}

.navbar-link {
    text-align: center;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    margin: 10px;
}

body {
  background-color: black;
  margin: 0;
}

#navbar {
  display: inline-flex;
}
</style>
