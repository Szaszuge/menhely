<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import { useUserStore } from '../stores/user';
import { AnimalService } from '../service/animal.service';
import { MailService } from "../service/mail.service";
import AlertPopup from '../components/AlertPopup.vue';

const auth = useUserStore();
const animal = new AnimalService();
let mail = new MailService();

const alertPopup = ref(null)

const emit = defineEmits(['submit']);

const allatNeve = ref('');
const honnan = ref('');
const faj = ref('');
const telepules = ref('');
const ev = ref('');
const ho = ref('');
const nap = ref('');
const egyebInfo = ref('');
let kep = null;
const visszajelzes = ref('A csillaggal jelölt mezők kitöltése kötelező!');

const fileName = ref("")

function changeFileName(event) {
   if (event.target.files[0] != null) {
    fileName.value = event.target.files[0].name;
   } else  fileName.value = "";
}

function uploadImage(event){
  document.getElementById("image-file-input").click()
}
function imageAdded(event){
  kep = event.target.files[0] ?? null;
}
function send(event:Event) {
  const info = {
    type: 'surrender',
    user: auth.loggedUser().id,
    details: {
      name: allatNeve.value,
      from: honnan.value,
      type: faj.value,
      city: telepules.value,
      year: ev.value,
      month: ho.value,
      day: nap.value,
      other: egyebInfo.value,
    }
  }
  const formData = new FormData();
  formData.append("file", kep);
  formData.append("data", JSON.stringify(info));

  const formDataEntries = Array.from(formData.entries());
  console.log(formDataEntries);

  animal.requestSurrender(formData).then((res) => {
    alertPopup.value.addAlert(res.data.message, res.status == 200 ? "success" : "failure")

    const data = {
      "to": auth.loggedUser().email,
        "subject": "GazdiRadar | Állat leadás",
        "content": {
            "userName": auth.loggedUser().name,
            "animalname": allatNeve.value,
            },
        "template": "request/AnimalSent"
    };
    if(res.status == 200) {
      mail.sendMail(data);
    }
  }); // Jegyzet: SOHA NE KÓDÓLJ BETEGEN!
  
}
</script>

<template>
  <div class="surrender-page">
    <div class="surrender-card">
      <div class="form-side">
        <div class="form-container">
          <div class="welcome-text">
            <h2>Állat leadása</h2>
            <p class="info-text" v-if="visszajelzes">{{ visszajelzes }}</p>
          </div>
          
          <form @submit.prevent="send" class="surrender-form">
            <div class="form-group">
              <label for="allatNeve">Állat neve</label>
              <div class="input-container">
                <span class="input-icon pet-icon"></span>
                <CustomInput 
                  id="allatNeve"
                  class="styled-input" 
                  v-model="allatNeve" 
                  placeholder="Pl. Morzsi"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="faj">Állat fajtája*</label>
              <div class="input-container">
                <span class="input-icon cat-icon"></span>
                <select id="faj" v-model="faj" class="styled-select">
                  <option value="">Válassz egy lehetőséget</option>
                  <option value="dog">Kutya</option>
                  <option value="cat">Macska</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="honnan">Honnan származik (otthon/talált)*</label>
              <div class="input-container">
                <span class="input-icon home-icon"></span>
                <select id="honnan" v-model="honnan" class="styled-select">
                  <option value="">Válassz egy lehetőséget</option>
                  <option value="home">Otthonból</option>
                  <option value="found">Talált</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="telepules">Település neve*</label>
              <div class="input-container">
                <span class="input-icon location-icon"></span>
                <CustomInput 
                  id="telepules"
                  class="styled-input" 
                  v-model="telepules" 
                  placeholder="Pl. Bajaszentistván"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="lead-idopont">Leadás időpontja*</label>
              <div class="date-container">
                <select v-model="ev" class="date-select year-select">
                  <option value="">Év</option>
                  <option v-for="year in 3" :key="year" :value="2025 + year - 1">{{ 2025 + year - 1 }}</option>
                </select>
                
                <select v-model="ho" class="date-select month-select">
                  <option value="">Hónap</option>
                  <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
                </select>
                
                <select v-model="nap" class="date-select day-select">
                  <option value="">Nap</option>
                  <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="egyebInfo">Egyéb információ</label>
              <div class="input-container">
                <span class="input-icon info-icon"></span>
                <CustomInput 
                  id="egyebInfo"
                  class="styled-input" 
                  v-model="egyebInfo" 
                  placeholder="Pl. Más állatokkal jól kijön"
                />
              </div>
            </div>
            
            <div class="form-group file-upload-group">
              <label for="image-file-input">Feltöltött kép</label>
              <div class="file-input-container">
                <div class="input-container filename-container" :class="{'has-file': fileName}">
                  <span class="input-icon image-icon"></span>
                  <span v-if="fileName" class="file-name">{{ fileName }}</span>
                  <span v-else class="file-placeholder">Nincs kiválasztott fájl</span>
                </div>
                <Button class="upload-button" @click="uploadImage" type="button">
                  Kép feltöltése
                </Button>
                <input 
                  hidden 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  id="image-file-input" 
                  v-on:change="imageAdded" 
                  @change="changeFileName"
                >
              </div>
            </div>
            
            <div class="submit-container">
              <Button 
                class="submit-button" 
                v-if="auth.isLoggedIn()" 
                @click="send"
                type="button"
              >
                Leadás
              </Button>
              <Button 
                class="submit-button-disabled" 
                v-if="!auth.isLoggedIn()" 
                disabled
              >
                Jelentkezzen be!
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div class="illustration-side"></div>
    </div>
    <PawFooter :is-sticky="true" />
  </div>
  <AlertPopup ref="alertPopup" />
</template>

<style scoped>
.surrender-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.surrender-card {
  display: flex;
  width: 100%;
  max-width: 1100px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin-top: -1rem;
}

.form-side {
  flex: 1;
  background-color: #FDBA74;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.illustration-side {
  flex: 1.2;
  background-color: #FDBA74;
  background-image: url('../assets/catinshelter.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.welcome-text {
  margin-bottom: 1rem;
  text-align: center;
}

.welcome-text h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.info-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #833;
  margin-top: 0.25rem;
}

.surrender-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  opacity: 0.6;
}

.pet-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E") no-repeat center center;
}

.cat-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6M14 9l-2-2m0 0L10 9m2-2v8' /%3E%3C/svg%3E") no-repeat center center;
}

.home-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' /%3E%3C/svg%3E") no-repeat center center;
}

.location-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /%3E%3C/svg%3E") no-repeat center center;
}

.info-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /%3E%3C/svg%3E") no-repeat center center;
}

.image-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' /%3E%3C/svg%3E") no-repeat center center;
}

.styled-input {
  height: 42px;
  width: 100%;
  padding: 0 1rem 0 3rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 2px solid #CBD5E0;
  border-radius: 10px;
}

.styled-input:focus {
  border-color: #E85B44;
  box-shadow: 0 0 0 2px rgba(232, 91, 68, 0.2);
  background-color: white;
}

.styled-select {
  height: 42px;
  width: 100%;
  padding: 0 1rem 0 3rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 2px solid #CBD5E0;
  border-radius: 10px;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.styled-select:focus {
  border-color: #E85B44;
  box-shadow: 0 0 0 2px rgba(232, 91, 68, 0.2);
}

.date-container {
  display: flex;
  gap: 0.5rem;
}

.date-select {
  height: 42px;
  padding: 0 0.5rem;
  font-size: 0.9rem;
  border: 2px solid #CBD5E0;
  border-radius: 10px;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}

.year-select {
  width: 33%;
}

.month-select {
  width: 33%;
}

.day-select {
  width: 33%;
}

.date-select:focus {
  border-color: #E85B44;
  box-shadow: 0 0 0 2px rgba(232, 91, 68, 0.2);
}

.file-upload-group {
  margin-top: 0.5rem;
}

.file-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filename-container {
  flex: 1;
  min-height: 42px;
  border-radius: 10px;
  border: 2px solid #CBD5E0;
  padding: 0 1rem 0 3rem;
  display: flex;
  align-items: center;
  background-color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
}

.file-placeholder {
  color: #A0AEC0;
  font-size: 0.9rem;
}

.upload-button {
  height: 50px;
  border-radius: 16px;
  background: #E85B44;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.upload-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.submit-button {
  height: 50px;
  border-radius: 16px;
  background: #E85B44;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 0 1.5rem;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.submit-button-disabled {
  height: 42px;
  border-radius: 10px;
  background-color: var(--button-disabled);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  padding: 0 1.5rem;
  min-width: 220px; /* Wider button to fit text better */
}

.submit-button-disabled:hover {
  transform: none;
  box-shadow: none;
  background-color: var(--button-disabled);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
}

@media (max-width: 768px) {
  .surrender-page {
    padding: 1rem;
  }
  
  .surrender-card {
    flex-direction: column-reverse;
    max-width: 500px;
  }
  
  .illustration-side {
    min-height: 240px;
  }
  
  .form-side {
    padding: 1.5rem 1rem;
  }
  
  .file-input-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .upload-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .surrender-page {
    padding: 0.5rem;
  }
  
  .surrender-card {
    border-radius: 15px;
  }
  
  .form-side {
    padding: 1rem 0.75rem;
  }
  
  .welcome-text h2 {
    font-size: 1.5rem;
  }
  
  .styled-input, .styled-select, .date-select {
    height: 40px;
  }
  
  .submit-container {
    flex-direction: column;
    align-items: center;
  }
  
  .submit-button, .submit-button-disabled {
    width: 100%;
  }
}
</style>