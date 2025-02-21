<script setup lang="ts">
import pawFooter from '../components/paw-footer.vue'
import homebar from '../components/Homebar.vue'
import homecard from '../components/Homecards.vue'
</script>

<template>
  <main>
    <homebar/>
    <h1>Szeretet, védelem, új esély</h1>
    <h3>Szerintünk minden kiskedvenc megérdemel egy szerető családot és célunk ezt megvalósítani.</h3>
    <div id="homecards">
      <homecard/>
      <homecard/>
      <homecard/>
    </div>
    <paw-footer/>
  </main>
</template>

<style scoped>
h1{
    font-size: 1.75rem;
    font-weight: 600;
    text-align: center;
    margin-top: 1.25rem;
}

h3{
  font-weight: 600;
  text-align: center;
}

#homecards{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin: 40px 0px 20px;

}
</style>
