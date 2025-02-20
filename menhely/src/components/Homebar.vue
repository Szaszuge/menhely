<script setup lang="ts"></script>


<template>
    <div id="main">
        <div id="sub" class="bg-orange-300">
            <h1>Egy kis segítség is életeket menthet!</h1>
            <p>Oldalunk minden bajai kóbor kutyának és macskának ideiglenes otthont kíván, valamint szeretnénk megadni a lehetőséget hogy minden állat egy szerető gazdához kerüljön miharamabb.</p>
        </div>
        <img src="../assets/welcome.png" alt="">
    </div>


</template>


<style scoped>
div{
    display: flex;
}
#main{
flex-flow: row nowrap;
}

#sub{
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-flow: column nowrap;
    padding: 3rem;
}
img{
    width: calc(225px + 55vw);
    flex-grow: 2;
}

h1{
    font-size: 1.75rem;
    font-weight: 600;
    padding-bottom: 5rem;
}
p{
    font-weight: 600;
    text-align: center;
}
</style>