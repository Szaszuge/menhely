<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import { useUserStore } from '@/stores/user';

const auth = useUserStore();

const emit = defineEmits(['submit']);

const allatNeve = ref('');
const honnan = ref('');
const faj = ref('');
const telepules = ref('');
const ev = ref('');
const ho = ref('');
const nap = ref('');
const egyebInfo = ref('');

function send(event) {
  console.log(`${allatNeve.value}\n${faj.value}\n${honnan.value}\n${telepules.value}\n${ev.value}\n${ho.value}\n${nap.value}\n${egyebInfo.value}`);
}
</script>

<template>
  <div class="form-container">
    <div class="form-title-container">
      <h2>Állat leadása</h2>
    </div>
    <div class="form-content">
    <p class="info-text">A csillaggal jelölt mezők kitöltése kötelező!</p>
      <label for="honnan">Állat neve</label>
    <CustomInput class="inputs" v-model="allatNeve" placeholder="Pl. Morzsi" />

    <label for="honnan">Állat fajtája*</label>
    <select id="faj" v-model="faj" class="custom-select">
      <option value="">Válassz egy lehetőséget</option>
      <option value="dog">Kutya</option>
      <option value="cat">Macska</option>
    </select>

    <label for="honnan">Honnan származik (otthon/talált)*</label>
    <select id="honnan" v-model="honnan" class="custom-select">
      <option value="">Válassz egy lehetőséget</option>
      <option value="home">Otthonból</option>
      <option value="found">Talált</option>
    </select>

    <label for="honnan">Település neve*</label>
    <CustomInput class="inputs" v-model="telepules" placeholder="Pl. Bajaszentistván" />

    <label for="lead-idopont">Leadás időpontja*</label>
    <div class="date-container">
      <select v-model="ev" class="date-select">
        <option value="">Év</option>
        <option v-for="year in 3" :key="year" :value="2025 + year - 1">{{ 2025 + year - 1 }}</option>
      </select>
      <select v-model="ho" class="date-select">
        <option value="">Hó.</option>
        <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
      </select>
      <select v-model="nap" class="date-select">
        <option value="">Nap</option>
        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
      </select>
    </div>

    <label for="honnan">Egyéb információ</label>
    <CustomInput class="inputs" v-model="egyebInfo" placeholder="Pl. Más állatokkal jól kijön" />

    <div class="button-container">
      <Button class="submit-button" v-if="auth.isLoggedIn()" @click="send">Leadás igénylése</Button>
      <Button class="submit-button-disabled " v-if="!auth.isLoggedIn()" disabled>Jelentkezzen be!</Button>
    </div>
    </div> 

    
  </div>
  <PawFooter :is-sticky="true"/>
</template>

<style scoped>
.form-container {
  background: #FED7AA;
  border-radius: 15px;
  width: calc(100vw - 25px);
  max-width: 635px; 
  margin: auto;
  margin-top: 3rem;
}
.form-content{
  padding: 1.5rem;
}

.info-text {
  font-size: 0.9rem;
  font-weight: 600; 
  color: #b33;
  text-align: left; 
  margin-bottom: 0.5rem;
}

.form-title-container{
    font-weight: 600;
    text-align: center;
    font-size: 2rem;
    background-color: #FDBA74;
    padding: 0.5rem;
    border-radius: 15px 15px 0 0;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

.custom-select, .date-select {
  width: 100%;
  padding: 10px;
  border: 3px solid #6a7282;
  border-radius: 15px;
  background: #f8f4f4;
  font-size: 1rem;
  margin-top: 5px;
}

.date-container {
  display: flex;
  justify-content: space-between;
}

.date-select {
  width: 30%;
}

.button-container {
  display: flex;
  justify-content: flex-end; 
  margin-top: 15px;
}

.submit-button {
  background: #ff5722;
  color: white;
    width: 205px;
  font-size: 1.1rem;
  border-radius: 10px;
}
.submit-button-disabled {
  background-color: #6a7282;
  color: white;
    width: 205px;
  font-size: 1.1rem;
  border-radius: 10px;
}
.submit-button-disabled:hover {
  background-color: #6a7282;
  cursor: default;
}
.inputs{
  width: calc(100vw - 65px);
  max-width: 587px;
}
</style>