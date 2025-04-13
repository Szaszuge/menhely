<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from "vue-router";
import { ApiService } from '@/service/api.service';
import { environment } from '../enviroments/testing';
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
import { useUserStore } from "@/stores/user";

const router = useRouter();
const api = new ApiService(environment);
const userStore = useUserStore();

const user = ref({
  name: '',
  pass: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

async function login() {
  if (!user.value.name || !user.value.pass) {
    errorMessage.value = 'Kérjük, adja meg a felhasználónevet és jelszót';
    return;
  }
  
  try {
    isLoading.value = true;
    errorMessage.value = '';
    const res = await api.userLogin(user.value.name, user.value.pass);
    
    if (!res.data.token) {
      errorMessage.value = "Hiányzó token!";
    } else {
      userStore.setToken(res.data.token);
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Bejelentkezési hiba. Kérjük ellenőrizze adatait.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="form-side">
        <div class="form-container">
          <div class="welcome-text">
            <h2>Üdvözöljük!</h2>
            <p>Jelentkezzen be fiókjába!</p>
          </div>
          
          <div class="alert error" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          
          <form @submit.prevent="login" class="login-form">
            <div class="form-group">
              <label for="username">Felhasználónév</label>
              <div class="input-container">
                <span class="input-icon user-icon"></span>
                <CustomInput 
                  id="username"
                  class="styled-input" 
                  v-model="user.name" 
                  placeholder="Adja meg felhasználónevét"
                />
              </div>
            </div>
            
            <div class="form-group">
              <div class="password-header">
                <label for="password">Jelszó</label>
              </div>
              <div class="input-container">
                <span class="input-icon lock-icon"></span>
                <CustomInput 
                  id="password"
                  class="styled-input" 
                  v-model="user.pass" 
                  type="password" 
                  placeholder="Adja meg jelszavát"
                />
              </div>
              <RouterLink to="/passwordrecovery" class="forgot-link">Elfelejtett jelszó?</RouterLink>
            </div>
            
            <Button 
              type="submit" 
              class="login-button"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Bejelentkezés...' : 'Bejelentkezés' }}
            </Button>
            
            <div class="register-link">
              Még nincs fiókja? <RouterLink to="/register" class="register-router-link">Regisztráció -></RouterLink>
            </div>
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
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 700px;
}

.login-card {
  display: flex;
  width: 100%;
  max-width: 1300px;
  min-height: 600px;
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


.illustration-side::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.overlay-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
}



.form-container {
  width: 100%;
  max-width: 380px;
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

.login-form {
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

.user-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E") no-repeat center center;
}

.lock-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' /%3E%3C/svg%3E") no-repeat center center;
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

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  font-size: 1rem;
  color: #E85B44;
  text-decoration: none;
  transition: color 0.2s;
  display: inline-block;
  margin-top: 4px;
  font-weight: 600;
}

.forgot-link:hover {
  color: #D85840;
  text-decoration: underline;
}

.login-button {
  height: 48px;
  border-radius: 10px;
  background: #E85B44;
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

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.login-button:active {
  transform: translateY(0);
}

.login-button:disabled {
  background: #ccc;
  transform: none;
  box-shadow: none;
}

.register-link {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.register-router-link {
  color: #E85B44;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.register-router-link:hover {
  color: #D85840;
  text-decoration: underline;
}

.alert {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
}

.alert.error {
  background-color: #FFF3F3;
  color: #E53935;
  border-left: 4px solid #E53935;
}


@media (max-width: 900px) {
  .login-card {
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
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }
  
  .login-card {
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
  
  .login-button {
    height: 45px;
  }
}

.footer-container {
  width: 100%;
  position: relative;
  z-index: 2;
}
</style>