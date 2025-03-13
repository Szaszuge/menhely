<script setup lang="ts">
import {useRoute} from "vue-router";
import { onMounted, onUnmounted, ref } from 'vue';
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';
import CustomInput from '@/components/CustomInput.vue';
import { ApiService } from "@/service/api.service";

let id;
let status = ref('loading');
onMounted(() => {
    document.body.style.overflow = 'hidden';
    id = document.getElementById("user_ID").innerHTML;

    let api = new ApiService();
    api.userDataByID(id).then((res) => {
        console.log(res.data.status);
        status.value = res.data.status;
    })
    
});

onUnmounted(() => {
    document.body.style.overflow = '';
});


let confirm = '';

</script>


<template>

    <!-- Ha a fiók inaktív -->
    <div class="emailconfirm-container" :class="status" id="inactive">

        <div class="content-container bg-orange-200">
            <div class="titlerow bg-orange-300 rounded-t-[20px]">
                <h1>Megerősítés</h1>
            </div>
            <div class="content-wrapper">
                <p class="text-left">A mezőbe kérjük azt a jelszót írja be, amellyel a fiókját regisztrálta, majd menjen az "OK" gombra. Ezután a bejelentkezés oldalra visszamenve be tud lépni fiókjába.</p>
                
                <div class="input-group">
                    <span class="label">Jelszó:</span>
                    <CustomInput v-model="confirm"/>
                    <Button id="ujrakuldesbutton">Aktiválás</Button>
                    <div hidden id="user_ID">{{ $route.params.id }}</div>
                </div>
            </div>
        </div>

        <img id="cicajobb" src="../assets/catpeek.png" alt="">
        <img id="kutyabal" src="../assets/dogpeek.png" alt="">

        <PawFooter :is-sticky="true"/>
    </div>


    <div class="emailconfirm-container" :class="status" id="active">

    <!-- Ha a fiók aktív -->
        <div class="content-container bg-orange-200">
            <div class="titlerow bg-orange-300 rounded-t-[20px]">
                <h1>Megerősítés</h1>
            </div>
            <div class="content-wrapper">
                <p class="text-left">Ez a fiók már aktiválva van.</p>
                
            </div>
        </div>

        <img id="cicajobb" src="../assets/catpeek.png" alt="">
        <img id="kutyabal" src="../assets/dogpeek.png" alt="">

        <PawFooter :is-sticky="true"/>
    </div>

    <div class="emailconfirm-container" :class="status" id="non-existent">

    <!-- Ha a nem lézetik -->
        <div class="content-container bg-orange-200">
            <div class="titlerow bg-orange-300 rounded-t-[20px]">
                <h1>Hiba</h1>
            </div>
            <div class="content-wrapper wide">
                <p class="text-center">A fiók nem létezik.</p>
            </div>
        </div>

        <img id="cicajobb" src="../assets/catpeek.png" alt="">
        <img id="kutyabal" src="../assets/dogpeek.png" alt="">

        <PawFooter :is-sticky="true"/>
    </div>

</template>


<style scoped>
#test{
    font-size: 24px;
}

div#non-existent.non-existent{
    display: flex !important;
}

div#inactive.inactive{
    display: flex !important;
}

div#active.active{
    display: flex !important;
}

.wide{
    min-width: 400px;
}

.emailconfirm-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    width: 100%;
    display: none;
    justify-content: center;
    align-items: center;
}

.content-container {
    max-width: 800px;
    border-radius: 20px;
    margin-top: -20rem;
    overflow: hidden;
}

.content-wrapper {
    padding: 2rem;
    display: flex;
    flex-direction: column;
  
}

.titlerow {
    width: 100%;
    padding: 1rem;
}

.input-group {
    display: flex;
    align-items: center;
    gap: 3rem;
    justify-content: center;
    width: fit-content;
    align-self: center;


}

.label {
    font-weight: 600;
    font-size: 1.2rem;
}

h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
}

p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    max-width: 90%;

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
</style>