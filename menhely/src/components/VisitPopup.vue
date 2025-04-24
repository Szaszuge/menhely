<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';

const emit = defineEmits(['close']);

const ev = ref('');
const ho = ref('');
const nap = ref('');
const time = ref(''); 

const closePopup = () => {
  emit('close');
};
</script>

<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <div class="popup-title-container">
        <h2>Állat meglátogatása</h2>
        <img src="../assets/close.png" alt="Bezárás" class="close-icon" @click="closePopup" />
      </div>
      
      <div class="popup-content">
        <p class="description-text">
          Kérem az alábbi mezőket töltse ki az alábbi formátum alapján, majd nyomjon a küldés gombra!
          Nem helyes formátumot nem fogadunk el!
        </p>

        <div class="date-time-grid">
          <div class="input-group">
            <label for="ev">Év</label>
            <select v-model="ev" id="ev" class="date-select">
              <option value="">Év</option>
              <option v-for="year in 5" :key="year" :value="2025 + year - 1">{{ 2025 + year - 1 }}</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="ho">Hónap</label>
            <select v-model="ho" id="ho" class="date-select">
              <option value="">Hó.</option>
              <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="nap">Nap</label>
            <select v-model="nap" id="nap" class="date-select">
              <option value="">Nap</option>
              <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>
          
          <div class="input-group">
            <label for="time">Időpont (óra:perc)</label>
            <input 
              type="time" 
              v-model="time" 
              id="time"
              class="time-input"
              placeholder="00:00"
            />
          </div>
        </div>
        
        <div class="button-container">
          <Button class="submit-button">Küldés</Button>
        </div>
      </div>      
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 10px;
}

.popup-container {
  background: #FED7AA;
  border-radius: 15px;
  width: 100%;
  max-width: 650px;  
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 95vh;  
  overflow-y: auto;
  position: relative; 
}

.popup-title-container {
  font-weight: 600;
  text-align: center;
  font-size: 1.5rem;
  background-color: #FDBA74;
  padding: 0.7rem 1rem; 
  border-radius: 15px 15px 0 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-title-container h2 {
  margin: 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.close-icon {
  position: absolute;
  right: 15px; 
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.popup-content {
  padding: 1.5rem; 
  flex-grow: 1;
}

.description-text {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem; 
  font-weight: 600;
}

.date-time-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem; 
  padding: 0 0.5rem; 
}

@media (max-width: 600px) {
  .date-time-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .popup-title-container h2 {
    font-size: 1.5rem;
  }
  
  .description-text {
    font-size: 1rem;
  }
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px; 
  font-size: 1.05rem; 
}

.date-select, .time-input {
  width: 100%;
  padding: 12px; 
  border: 3px solid #6a7282;
  border-radius: 15px;
  background: #f8f4f4;
  font-size: 1rem;
}

.time-input {
  display: block;
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem; 
}

.submit-button {
  background: #ff5722;
  color: white;
  width: 230px; 
  font-size: 1.2rem; 
  padding: 12px; 
}

@media (max-width: 400px) {
  .submit-button {
    width: 100%;
  }
  
  .popup-content {
    padding: 1rem;
  }
}
</style>