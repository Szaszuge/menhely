<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from 'vue';
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
import { ApiService } from "@/service/api.service";
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter()
const api = new ApiService();

const id = useRoute().params.id; // sír de ez jó
let status = ref('loading');

const password = ref('');
const confirmPassword = ref('');

onMounted(() => {
  if (userStore.isLoggedIn()){
    router.push("/");
  }
    console.log(id);
    let api = new ApiService();
    api.userDataByID(id).then((res) => {
        if (res.data.status != "recovering"){
          router.push("/");
        }
        status.value = res.data.status;
    })
    
});
function resetPassword() {
  api.resetPassByID(id, password.value, confirmPassword.value).then((res) => {
    if(res.data.message == "A fiók jelszava sikeresen frissült."){
      router.push("/")
    }
  })
}
</script>

<template>
  <div class="reset-page" v-if="status == 'recovering'">
    <div class="reset-card">
      <div class="form-side">
        <div class="form-container">
          <div class="title-text">
            <h2>Jelszó visszaállítása</h2>
          </div>
          
          <div class="instruction-text">
            <p>Az új jelszónak, csakúgy mint az előzőnek, meg kell felelnie a kritériumoknak ahhoz, hogy érvényes legyen. Mindkét mezőbe azonos jelszót adjon meg</p>
          </div>
          
          <form class="reset-form">
            <div class="form-group">
              <label for="password">Új jelszó:</label>
              <div class="input-container">
                <span class="input-icon lock-icon"></span>
                <CustomInput 
                  id="password"
                  class="styled-input" 
                  v-model="password" 
                  type="password"
                  placeholder="Adja meg új jelszavát"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Jelszó megerősítése:</label>
              <div class="input-container">
                <span class="input-icon repeat-icon"></span>
                <CustomInput 
                  id="confirmPassword"
                  class="styled-input" 
                  v-model="confirmPassword" 
                  type="password"
                  placeholder="Adja meg újra a jelszavát"
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              class="reset-button"
              @click="resetPassword()"
            >
              Visszaállítás
            </Button>
          </form>
        </div>
      </div>
      
      <div class="illustration-side">
      </div>
    </div>
    
    <div class="footer-container">
      <PawFooter :is-sticky="true" />
    </div>
  </div>
</template>

<style scoped>
.reset-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 700px;
}

.reset-card {
  display: flex;
  width: 100%;
  max-width: 1300px;
  min-height: 600px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  background-color: #FDECDC;
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
  background-image: url('../assets/sokkiskutyus.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-side::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.form-container {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.title-text {
  margin-bottom: 1rem;
  text-align: center;
}

.title-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.instruction-text {
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  opacity: 0.6;
}

.lock-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' /%3E%3C/svg%3E") no-repeat center center;
}

.repeat-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /%3E%3C/svg%3E") no-repeat center center;
}

.styled-input {
  height: 50px;
  width: 100%;
  padding: 0 1rem 0 3rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.styled-input:focus {
  border-color: #E85B44;
  box-shadow: 0 0 0 2px rgba(232, 91, 68, 0.2);
  background-color: white;
}

.reset-button {
  height: 48px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 1rem 0;
  align-self: center;
  width: 170px;
}

.reset-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.reset-button:active {
  transform: translateY(0);
}

@media (max-width: 900px) {
  .reset-card {
    flex-direction: column-reverse;
    max-width: 500px;
  }
  
  .illustration-side {
    min-height: 240px;
  }
  
  .form-side {
    padding: 2rem 1.5rem;
  }
  
  .title-text h2 {
    font-size: 1.8rem;
  }
  
  .footer-container {
    display: none;
  }
}

@media (max-width: 480px) {
  .reset-page {
    padding: 1rem;
  }
  
  .reset-card {
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
  
  .reset-button {
    height: 45px;
  }
}

.footer-container {
  width: 100%;
  position: relative;
  z-index: 2;
}
</style>