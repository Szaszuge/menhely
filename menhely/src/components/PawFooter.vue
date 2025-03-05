<script setup lang="ts">
defineProps<{
  isSticky?: boolean
}>()
</script>

<template>
  <div :class="{ 'sticky-footer': isSticky }">
  </div>
</template>


<style scoped>
div{
    
    background-image: url("../assets/paws.png");
    z-index: -2;
    background-repeat: repeat-x;
    height: 200px;
    margin-top: 1.5rem;
}

.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 0;
}
</style>