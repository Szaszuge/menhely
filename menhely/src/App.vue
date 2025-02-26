<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import PawFooter from './components/PawFooter.vue'
</script>

<template>
  <Navbar/>
  <RouterView />
  <PawFooter/>
</template>

<style scoped>

</style>
