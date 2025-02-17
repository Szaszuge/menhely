<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
<div id="main">
    <div id="left">
        <!-- TODO: SVG ikon betöltése -->
    </div>
    <div id="right">
        <RouterLink to="/" class="link">Állatkatalógus</RouterLink>
        <RouterLink to="/" class="link">Állat leadása</RouterLink>
        <RouterLink to="/" class="link">Hogyan segíthet</RouterLink>
        <RouterLink to="/" class="link">Bejelentkezés</RouterLink>
    </div>
</div>
</template>

<style scoped>
#main {

    background-color: var(--bg-color-weak);

    max-height: 130px;
    height: calc(50px + 10vh);
    min-height: 70px;
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

#right {
    font-weight: 600;
    font-size: 29px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

#right:last-child{
    margin-right: 35px;
}

.link{
    margin: 0px 30px;
}
</style>