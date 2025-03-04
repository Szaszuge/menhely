<script setup lang="ts">
import Allatcard from '@/components/Allatcard.vue';
import Filter from '@/components/Filter.vue';
import CustomInput from '@/components/CustomInput.vue';

let search = '';

</script>

<template>

    <div id="petcatalog">       
        <div id="searchID">
            <p>Keresés</p>
            <CustomInput v-model="search" />
            <Filter/>   
        </div>

        <div id="petcards">
            <allatcard/>
            <allatcard/>
            <allatcard/>
            <allatcard/>
            <allatcard/>
            <allatcard/>
        </div>

    </div>

</template>

<style scoped>

#petcards{
  display: flex;
  flex-flow: row wrap;
  max-width: 75vw;
  gap: 3rem;
  justify-content: center;
}
#petcatalog{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 3.5rem;
}
#searchID{
    align-self: flex-start;
}
</style>