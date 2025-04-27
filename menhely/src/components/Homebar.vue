<script setup lang="ts">
import Button from './Button.vue';
import { useUserStore } from '@/stores/user';

const auth = useUserStore();
</script>
<template>
    <div id="main">
        <div id="sub" class="bg-orange-300">
            <h1>Egy kis segítség is életeket menthet!</h1>
            <p>Oldalunk minden Baja és környékén lévő kóbor kutyának és macskának ideiglenes otthont kíván, valamint szeretnénk megadni a lehetőséget hogy minden állat egy szerető gazdához kerüljön miharamabb.</p>
            <div class="buttonigazitas">

                <RouterLink to="/login" v-if="!auth.isLoggedIn()">
                <Button class="homebar-button">
                    Bejelentkezés
                </Button>
                </RouterLink>

                <RouterLink to="/register" v-if="!auth.isLoggedIn()">
                <Button class="homebar-button">
                    Regisztráció
                </Button>
                </RouterLink>

                <RouterLink to="/petsurrender" v-if="auth.isLoggedIn()">
                <Button class="homebar-button">
                    Leadok állatot
                </Button>
                </RouterLink>

                <RouterLink to="/hogyansegithet" v-if="auth.isLoggedIn()">
                <Button class="homebar-button">
                    Önkéntesség
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
    font-weight: 500;
    text-align: center;
    font-size: 1.1rem;
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

.homebar-button {
  border-radius: 16px;
  background: #E85B44;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.homebar-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
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