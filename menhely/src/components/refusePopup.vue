<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import { RequestService } from '../service/request.service';
import { useUserStore } from '../stores/user';
import CustomInput from './CustomInput.vue';

const reqSer = new RequestService();
const userStore = useUserStore();

const props = defineProps({
    currentRequest: {
        type: Object,
        required: false,
        default: '',
    }
})

const reason = ref('')

</script>

<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <div class="popup-title-container">
        <h2>Kérelem elutasítása</h2>
        <img src="../assets/close.png" alt="Bezárás" class="close-icon" @click="$emit('close')" />
      </div>
      <div class="popup-content">
        <p class="description-text">
          Írjuk meg a felhasználónak, hogy miért volt a kérelme elutasítva!
        </p>
          
        <div class="input-group">
            <div class="label">Indok</div>
         <CustomInput v-model="reason" placeholder="Input" class="form-input" />
        </div>
       </div>
        
        <div class="button-container">
          <Button class="submit-button" @click="$emit('send', props.currentRequest.id, props.currentRequest.targetEmail, props.currentRequest.realname, reason)">Küldés</Button>
        </div>
    </div>      
</div>
</template>

<style scoped>

.label {
  font-weight: 600;
  margin-bottom: 3px;
}

.form-input {
  height: 40px;
  width: 100%;
}
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
  color: white;
  width: 130px; 
  font-size: 1.1rem; 
  padding: 0px 12px; 
  border-radius: 16px;
  background: #E85B44;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
  margin-bottom: 1rem;
}
.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
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