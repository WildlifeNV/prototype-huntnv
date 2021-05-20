<template>
  <div>
    <h1>{{ msg }}</h1>
    <h5>This is a prototype project for the Hunt NV project</h5>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  msg: String
})
</script>

<style scoped>
h1, h5 {
  color: #fff;
}

div {
  background-color: #2c3e50;
  padding: 10px;
}
</style>