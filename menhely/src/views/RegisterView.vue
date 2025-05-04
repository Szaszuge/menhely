<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
import { ApiService } from '../service/api.service';
import { Address } from '../interfaces/address';
import { MailService } from "../service/mail.service";
import AlertPopup from '../components/AlertPopup.vue';
import successImage from '../assets/success.png';
import failedImage from '../assets/failed.png';

const router = useRouter();
const api = new ApiService();
const mail = new MailService();

const alertPopup = ref(null)

const address = reactive<Address>({
  city: "",
  postal: "",
  street: "",
  number: "",
  floor: null,
  door: null
});

const user = reactive({
  fullName: "",
  userName: "",
  password: "",
  email: "",
  phoneNumber: "",
  address: address,
  permit: "inactive"
});

const currentStep = ref(1);
const totalSteps = 3;
const isLoading = ref(false);
const registrationSuccess = ref(true);
const processingRegistration = ref(false);

const stepTitles = [
  "Regisztrációs adatok",
  "Lakcím adatok",
  "Regisztráció vége"
];

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
    
    if (currentStep.value === 3) {
      processingRegistration.value = true;
      setTimeout(() => {
        register();
      }, 2500);
    }
  }
}

// Previous page
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

async function register() {
  try {
    isLoading.value = true;
    
    const res = await api.userRegister(user, address);
    alertPopup.value.addAlert(res.data.message, res.data.message == 'Sikeres Feljegyzés' ? 'success' : 'error')
    if (res.data.message == "Sikeres Feljegyzés") {
      registrationSuccess.value = true;
      
      const data = {
        "to": user.email,
        "subject": "GazdiRadar Regisztráció",
        "content": {
          "userName": user.userName,
          "link": `http://localhost:5173/emailconfirm/${res.data.user}`,
        },
        "template": "Register"
      };
      
      await mail.sendMail(data);

    } else {
      registrationSuccess.value = false;

      setTimeout(() => {
        currentStep.value = 1;
      }, 3000);
    }
  } catch (error) {
    registrationSuccess.value = false;

    setTimeout(() => {
      currentStep.value = 1;
    }, 3000);
  } finally {
    isLoading.value = false;
    processingRegistration.value = false;
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">
      <div class="form-side">
        <div class="form-container">
          <div class="welcome-text">
            <h2>Üdvözöljük!</h2>
            <p>Kérjük regisztráljon oldalunkra!</p>
          </div>

          <div class="progress-bar">
            <div class="progress-step" 
                 v-for="step in totalSteps" 
                 :key="step"
                 :class="{ 'active': step <= currentStep }">
              <div class="step-marker"></div>
              <div class="step-label">{{ stepTitles[step-1] }}</div>
            </div>
          </div>

          <div v-if="currentStep === 1" class="registration-form">
            <div class="form-row">
              <div class="form-group half-width">
                <label for="username">Felhasználónév*</label>
                <div class="input-container">
                  <span class="input-icon user-icon"></span>
                  <CustomInput 
                    id="username"
                    class="styled-input" 
                    v-model="user.userName" 
                    placeholder="Pl. kovacsjanos"
                  />
                </div>
              </div>
              
              <div class="form-group half-width">
                <label for="fullName">Teljes név*</label>
                <div class="input-container">
                  <span class="input-icon user-icon"></span>
                  <CustomInput 
                    id="fullName"
                    class="styled-input" 
                    v-model="user.fullName" 
                    placeholder="Pl. Kovács János"
                  />
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group half-width">
                <label for="email">E-mail cím*</label>
                <div class="input-container">
                  <span class="input-icon email-icon"></span>
                  <CustomInput 
                    id="email"
                    class="styled-input" 
                    v-model="user.email" 
                    placeholder="Pl. felhasznalo@gmail.com"
                  />
                </div>
              </div>
              
              <div class="form-group half-width">
                <label for="phone">Telefonszám*</label>
                <div class="input-container">
                  <span class="input-icon phone-icon"></span>
                  <CustomInput 
                    id="phone"
                    class="styled-input" 
                    v-model="user.phoneNumber" 
                    placeholder="Pl. 06706239879"
                  />
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">Jelszó*</label>
              <div class="input-container">
                <span class="input-icon lock-icon"></span>
                <CustomInput 
                  id="password"
                  class="styled-input" 
                  v-model="user.password" 
                  type="password" 
                  placeholder="Pl. nemtalalodki_123"
                />
              </div>
            </div>
            
            <div class="button-group first-step-buttons">
              <Button 
                @click="nextStep"
                class="action-button next-button"
                :disabled="isLoading"
              >
                Tovább
              </Button>
            </div>
            
            <div class="login-link">
              Már van fiókja? <RouterLink to="/login" class="login-router-link">Bejelentkezés -></RouterLink>
            </div>
          </div>
          
          <div v-if="currentStep === 2" class="registration-form">
            <div class="form-row">
              <div class="form-group half-width">
                <label for="postal">Irányítószám*</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="postal"
                    class="styled-input" 
                    v-model="address.postal" 
                    placeholder="Pl. 6500"
                  />
                </div>
              </div>
              
              <div class="form-group half-width">
                <label for="city">Település neve*</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="city"
                    class="styled-input" 
                    v-model="address.city" 
                    placeholder="Pl. Bajaszentistván"
                  />
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group half-width">
                <label for="street">Utca neve*</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="street"
                    class="styled-input" 
                    v-model="address.street" 
                    placeholder="Pl. Bem Apó"
                  />
                </div>
              </div>
              
              <div class="form-group half-width">
                <label for="number">Házszám*</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="number"
                    class="styled-input" 
                    v-model="address.number" 
                    placeholder="Pl. 12/A"
                  />
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group half-width">
                <label for="floor">Emelet</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="floor"
                    class="styled-input" 
                    v-model="address.floor" 
                    placeholder="Pl. 2"
                  />
                </div>
              </div>
              
              <div class="form-group half-width">
                <label for="door">Ajtó</label>
                <div class="input-container">
                  <span class="input-icon location-icon"></span>
                  <CustomInput 
                    id="door"
                    class="styled-input" 
                    v-model="address.door" 
                    placeholder="Pl. 12"
                  />
                </div>
              </div>
            </div>
            
            <div class="button-group">
              <Button 
                @click="prevStep"
                class="action-button back-button"
                :disabled="isLoading"
              >
                Vissza
              </Button>
              
              <Button 
                @click="nextStep"
                class="action-button next-button"
                :disabled="isLoading"
              >
                Tovább
              </Button>
            </div>
          </div>
          
          <div v-if="currentStep === 3" class="registration-form">
            <div class="confirmation-container">
              <div v-if="processingRegistration" class="processing-animation">
                <div class="loader"></div>
                <h3>Adatok feldolgozás alatt!</h3>
                <p>Kérjük várjon...</p>
              </div>
              
              <div v-else class="status-container">
                <div class="status-icon-container">
                  <img :src="registrationSuccess ? successImage : failedImage" 
                       :alt="registrationSuccess ? 'Sikeres' : 'Sikertelen'" 
                       class="status-icon">
                </div>
                <h3>{{ registrationSuccess ? 'Minden adat rendben van!' : 'Hiba a regisztráció során!' }}</h3>
                <p>{{ registrationSuccess ? 'Az e-mail címre küldtünk egy levelet az aktivációhoz' : 'Visszatérés az első oldalra...' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="illustration-side">
      </div>
    </div>
    <PawFooter :is-sticky="true" />
  </div>
  <AlertPopup ref="alertPopup" />
</template>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 700px;
}

.register-card {
  display: flex;
  width: 100%;
  max-width: 1300px;
  min-height: 720px;  
  height: auto;       
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
}

.form-side {
  flex: 1;
  background-color: #FDBA74;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.illustration-side {
  flex: 1.2;
  background-color: #FDBA74;
  background-image: url('../assets/cic.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.welcome-text {
  margin-bottom: 1rem;
  text-align: left;
}

.welcome-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  font-size: 1.1rem;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
  z-index: 1;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
}

.step-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.progress-step.active .step-marker {
  background-color: #E85B44;
}

.step-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.progress-step.active .step-label {
  color: #E85B44;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.half-width {
  flex: 1;
}

.form-group label {
  font-size: 1rem;
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
}

.user-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E") no-repeat center center;
}

.lock-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' /%3E%3C/svg%3E") no-repeat center center;
}

.email-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /%3E%3C/svg%3E") no-repeat center center;
}

.phone-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' /%3E%3C/svg%3E") no-repeat center center;
}

.location-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' /%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' /%3E%3C/svg%3E") no-repeat center center;
}

.styled-input {
  height: 50px;
  width: 100%;
  padding: 0 1rem 0 3rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.styled-input::placeholder {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.styled-input:focus {
  border-color: #E85B44;
  box-shadow: 0 0 0 2px rgba(232, 91, 68, 0.2);
  background-color: white;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.first-step-buttons {
  justify-content: center;
}

.action-button {
  height: 48px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 120px;
}

.next-button, .register-button {
  background: #E85B44;
  color: white;
}

.back-button {
  background: #f3f3f3;
  color: #333;
}

.next-button:hover, .register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #e5e5e5;
}

.action-button:active {
  transform: translateY(0);
}

.action-button:disabled {
  background: #ccc;
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
}

.confirmation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
}

.status-icon-container {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.status-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.status-icon {
  width: 100%;
  height: 100%;
}

.confirmation-container h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-link {
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 600;
}

.login-router-link {
  color: #E85B44;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.login-router-link:hover {
  color: #D85840;
  text-decoration: underline;
}

@media (max-width: 900px) {
  .register-card {
    flex-direction: column-reverse; 
    max-width: 500px;
  }
  
  .illustration-side {
    min-height: 240px;
  }
  
  .form-side {
    padding: 2rem 1.5rem;
  }
  
  .welcome-text h2 {
    font-size: 1.8rem;
  }
  
  .footer-container {
    display: none;
  }
  
  .form-row {
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .half-width {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .register-page {
    padding: 1rem;
  }
  
  .register-card {
    min-height: auto;
  }
  
  .illustration-side {
    min-height: 180px;
  }
  
  .form-side {
    padding: 1.5rem 1rem;
  }
  
  .styled-input {
    height: 45px;
  }
  
  .action-button {
    height: 45px;
  }
  
  .step-label {
    font-size: 0.75rem;
  }
}
.processing-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  width: 100%;
}

.loader {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 5px solid #E85B44;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>