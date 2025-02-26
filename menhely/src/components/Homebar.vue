<script setup lang="ts">
import Button from './Button.vue';
</script>


<template>
    <div id="main">
        <div id="sub" class="bg-orange-300">
            <h1>Egy kis segítség is életeket menthet!</h1>
            <p>Oldalunk minden bajai kóbor kutyának és macskának ideiglenes otthont kíván, valamint szeretnénk megadni a lehetőséget hogy minden állat egy szerető gazdához kerüljön miharamabb.</p>
            <div class="buttonigazitas">
                <RouterLink to="/login">
                <Button>
                    Bejelentkezés
                </Button>
                </RouterLink>

                <RouterLink to="/register">
                <Button>
                    Regisztráció
                </Button>
                </RouterLink>
            </div>
        </div>
        <div class="kep"></div>
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
    text-align: center;
}
p{
    font-weight: 600;
    text-align: center;
}
.buttonigazitas{
    margin-top: 3rem;
    gap: 8rem;
}
.kep{
    background-image: url('../assets/welcome.png');
    background-size: cover;
    min-width: calc(425px + 45vw);
    height: 500px;
}
</style>