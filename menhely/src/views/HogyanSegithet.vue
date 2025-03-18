<script setup lang="ts">
import Supportcard from '@/components/Supportcard.vue';
import PawFooter from '@/components/PawFooter.vue';
</script>

<template>
<div class="kontent">
<Supportcard></Supportcard>
<img  src="../assets/tamogatas.png" alt="Tamogatas" id="Tamogass"> 
<Supportcard></Supportcard>
</div>
<PawFooter :is-sticky="true"/>
</template>

<style scoped>
    .kontent{
        width: 100vw;
        justify-content: space-evenly;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
    img{
        width: 12rem;
        height: 12rem;
    }
</style>