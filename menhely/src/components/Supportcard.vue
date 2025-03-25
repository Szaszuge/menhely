<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps(['title']);
</script>

<template>
  <div id="supportCard" class="bg-orange-200">
    <div id="supportCim" class="bg-orange-300 font-bold text-3xl items-center">
      <h1>{{ props.title }}</h1>
    </div>
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
#supportCim {
  padding: 20px;
  text-align: center;
  min-width: 30vw;
  border: 0px black dotted;
  border-radius: 20px 20px 0px 0px;
}

h1 {
  font-size: 2vw;
}

#jelentkezes {
  margin-bottom: 30px;
}

#supportCard {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  width: 30vw;
  min-height: 40vh;
  min-height: 400px;
  margin: 5rem;
  border-radius: 20px;
}

#content {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

</style>
