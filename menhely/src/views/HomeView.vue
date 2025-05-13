<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide } from 'vue';
import homebar from '../components/Homebar.vue'
import homecard from '../components/Homecards.vue'
import Allatcard from '../components/Allatcard.vue';
import PawFooter from '@/components/PawFooter.vue';
import { ApiService } from '../service/api.service';

const api = new ApiService()

const animals = ref([]);

onMounted(() => {

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';

    api.getHomePageAnimals().then((res) => {
    console.log(res.data.animals);

    animals.value = res.data.animals.filter(x => x.isPublic == true);
  })
});

onUnmounted(() => {

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
});
</script>

<template>
  <main>
    <homebar/>
    <h1>Szeretet, védelem, új esély</h1>
    <h3>Szerintünk minden kiskedvenc megérdemel egy szerető családot és célunk ezt megvalósítani.</h3>
    <div id="homecards">
      <homecard/>
      <homecard format="care"/>
      <homecard format="food"/>
    </div>
    <h1>Tekintse meg a nemrég hozzánk került állatokat!</h1>
    <br>
    <div id="petcards"> 
      <Allatcard v-for="animal in animals"
      :animal="animal"
       />
    </div>
    <PawFooter/>
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
#petcards{
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  justify-content: center;
}
</style>
