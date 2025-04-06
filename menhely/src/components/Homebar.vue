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
#main {
    display: flex;
    flex-flow: row nowrap;
    min-height: 500px;
}

#sub {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    padding: 3rem;
    width: 30%;
}

h1 {
    font-size: 1.75rem;
    font-weight: 600;
    padding-bottom: 3rem;
    text-align: center;
}

p {
    font-weight: 600;
    text-align: center;
}

.buttonigazitas {
    display: flex;
    margin-top: 5rem;
    gap: 4rem;
}

.kep {
    background-image: url('../assets/welcome.png');
    background-size: cover;
    background-position: center;
    width: 70%;
    min-width: calc(425px + 30vw);
    height: 100%;
    min-height: 500px;
}

/* 1300px korul kellett javitani, mert szétesett */
@media (max-width: 1300px) {
    .buttonigazitas {
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 3rem;
    }
    
    h1 {
        padding-bottom: 2rem;
    }
    
    #sub {
        padding: 2rem;
    }
}


@media (max-width: 1050px) {
    #main {
        flex-flow: column nowrap;
        min-height: unset;
    }
    
    .kep {
        width: 100%;
        min-width: 100%;
        order: -1; 
        height: 350px;
        min-height: 350px;
    }
    
    #sub {
        width: 100%;
        padding: 2rem 1.5rem;
    }

    .buttonigazitas {
        flex-direction: row;
        gap: 2.5rem;
        margin-top: 3rem;
    }
}

</style>