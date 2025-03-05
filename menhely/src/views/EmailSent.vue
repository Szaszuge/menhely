<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';

onMounted(() => {
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflow = '';
});
</script>


<template>

  
    <div class="emailsent-container">
        <div id="korID" class="bg-orange-500"></div>
        <p>Küldtünk egy linket amellyel megerősítheted regisztációdat a következő emailre: [e-mail cím]!</p>
        
        <div class="actions-container">
          <Button id="ujrakuldesbutton">Újraküldés</Button>
          <RouterLink to="/">
            <p class="home-link">Vissza a főoldalra -></p>
        </RouterLink>
        </div>

        <img id="cicajobb" src="../assets/catpeek.png" alt="">
        <img id="kutyabal" src="../assets/dogpeek.png" alt="">

        <PawFooter :is-sticky="true"/>
    </div>
</template>

<style>
body {
    overflow: hidden !important;
}
</style>

<style scoped>


.emailsent-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    width: 100%;
}

#korID {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: auto;
  background-image: url(../assets/pendingemail.png);
  background-size: 180px;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 3rem;
}
p {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
}

img {
position: absolute;
}
#cicajobb{
  bottom: 50px;
  right: -45px;
  width: 430px;
  height: 490px;
  transform: rotate(10deg);
}
#kutyabal{
  bottom: 80px;
  left: -105px;
  width: 420px;
  height: 460px;
  opacity: 100%;
  transform: rotate(-36deg);
}


.actions-container {
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
  gap: 5rem;
  margin: 2rem 0;
}

.home-link {
  margin: 0; 
  cursor: pointer;
  color: #E85B44;
  font: 600;
}
#ujrakuldesbutton {
width: 170px;
height: 60px;
font-size: 1.2rem;
}
</style>