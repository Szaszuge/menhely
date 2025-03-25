<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';

const emit = defineEmits(['submit']);
const honnan = ref('');
const allatNeve = ref('');
const telepules = ref('');
const kor = ref('');
const egyebInfo = ref('');
const ev = ref('');
const ho = ref('');
const nap = ref('');
</script>

<template>
  <div class="form-container">
    <div class="form-title-container">
      <h2>Állat leadása</h2>
    </div>
    <p class="info-text">A csillaggal jelölt mezők kitöltése kötelező!</p>


    <label for="honnan">Állat neve*</label>
    <CustomInput v-model="allatNeve" placeholder="Pl. Morzsi" />

    <label for="honnan">Honnan származik (otthon/talált)*</label>
    <select id="honnan" v-model="honnan" class="custom-select">
      <option value="">Válassz egy lehetőséget</option>
      <option value="otthonbol">Otthonból</option>
      <option value="talalt">Talált</option>
    </select>


    <label for="honnan">Kora*</label>
    <CustomInput v-model="kor" placeholder="Pl. 2" />

    <label for="honnan">Település neve*</label>
    <CustomInput v-model="telepules" placeholder="Pl. Bajaszentistván" />

    <label for="lead-idopont">Leadás időpontja*</label>
    <div class="date-container">
      <select v-model="ev" class="date-select">
        <option value="">Év</option>
        <option v-for="year in 5" :key="year" :value="2025 + year - 1">{{ 2025 + year - 1 }}</option>
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
    <CustomInput v-model="egyebInfo" placeholder="Pl. Más állatokkal jól kijön" />

    <div class="button-container">
      <Button class="submit-button">Leadás igénylése</Button>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background: #FED7AA;
  padding: 1.5rem;
  border-radius: 15px;
  max-width: 635px; 
  margin: auto;
  margin-top: 3.5rem;
}

.info-text {
  font-size: 0.8rem;
  font-weight: 600; 
  color: #b33;
  text-align: left; 
  margin-bottom: 1rem;
}

.form-title-container{
    font-weight: 600;
    text-align: center;
    font-size: 2rem;
    background-color: #FDBA74;

}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

.custom-select, .date-select {
  width: 100%;
  padding: 10px;
  border: 2px solid #aaa;
  border-radius: 10px;
  background: #f9f9f9;
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
  justify-content: flex-end; /* Button aligned to the right */
  margin-top: 15px;
}

.submit-button {
  background: #ff5722;
  color: white;
    width: 205px;
  font-size: 1.1rem;
  border-radius: 10px;
}
</style>