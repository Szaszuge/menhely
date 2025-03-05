<script setup lang="ts">
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';

</script>


<template>
    <div>
        <div id="korID" class="bg-orange-500"></div>
        <p>Küldtünk egy linket amellyel megerősítheted regisztációdat a következő emailre: [e-mail cím]!</p>
        <Button>Újraküldés</Button>
        <p>Vissza a főoldalra -></p>
    </div>

<PawFooter/>
</template>


<style scoped>
#korID {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin: auto;
  background-image: url(../assets/pendingemail.png);
  background-size: 180px;
  background-repeat: no-repeat;
  background-position: center;
}
p {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
}
</style>