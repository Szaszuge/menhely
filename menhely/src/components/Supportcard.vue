<script setup lang="ts">
import Button from './Button.vue';
</script>

<template>
<div id="supportCard" class="bg-orange-200">
    <div id="supportCim" class="bg-orange-300 font-bold text-3xl items-center">
        <h1>Jelentkezzen önkéntesnek!</h1>
    </div>
        <p>Menhelyünk meleg szívvel vár minden lelkes embert aki segíteni szeretne kiskedvenceink foglalkoztatásával, ezzel is a menhely működését segítve.</p>
        <ul style="list-style-type:disc">
            <li>Naptárunkban látható lesz melyik napokon tudnak segíteni menhelyünknek.</li>
            <li>Egy adott napra maximum 2 embert bírunk foglalkoztatni. </li>
            <li>A gombra nyomva a mezőket töltse ki adatainak megfelelően!</li>
            <li>Ha elküldte jelentkezését email-ben fogjuk jelezni önnek ha felvettük.</li>
        </ul> 
        <Button id="jelentkezes">Jelentkezem</Button>
</div>
</template>

<style scoped>
#supportCim{
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
#supportCard{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    min-width: 300px;
    width: 30vw;
    min-height: 40vh;
    min-height: 400px;
    margin: 5rem;
    align-items: center ;
    justify-content:space-between;
    border-radius: 20px;
}
p {
    padding: 20px;
}
ul{
    padding:0px 20px 20px 40px;
}
</style>