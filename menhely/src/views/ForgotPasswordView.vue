<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';
import CustomInput from '@/components/CustomInput.vue';
import { RouterLink } from 'vue-router';
import { ApiService } from '@/service/api.service';
import { MailService } from "@/service/mail.service";
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter()
let api = new ApiService();
let mail = new MailService();

const email = ref("");

function AskForPass() {

  if (!userStore.isLoggedIn()) {
    api.userPassRecover(email.value).then(() => {
      api.getMailDataByMail(email.value).then((res)=> {
        if (res.data.success){
          const maildata = res.data.maildata;
          const data = {
          "to": email.value ,
          "subject": "GazdiRadar Jelszó visszaállítás",
          "content": {
              "userName": maildata.userName,
              "accept": `http://localhost:5173/newpassword/${maildata.id}`,
              "refuse": `http://localhost:5173/revertpassword/${maildata.id}`,
              },
          "template": "PassRecovery"
          };
          console.log(data);
          mail.sendMail(data);
        }
      
      });
    })
  }
  else{
    router.push("/")
  }
}

</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="form-side">
        <div class="form-container">
          <div class="welcome-text">
            <h2>Jelszó visszaállítása</h2>
          </div>
          
          <div class="description">
            Elfelejtett jelszó esetén a megadott mezőbe írja be a fiókjához tartozó email címet
            és nyomja meg ezután a "Jelszó visszaállítása" gombot. Egy email-ben fog értesülni
            a további teendőkről.
          </div>
          
          <form class="login-form">
            <div class="form-group">
              <label for="email">E-mail cím</label>
              <div class="input-container">
                <span class="input-icon email-icon"></span>
                <CustomInput 
                  id="email"
                  class="styled-input"
                  placeholder="Adja meg email címét" 
                  v-model="email" 
                />
              </div>
            </div>
            
            <Button class="login-button" @click="AskForPass()" type="button">
              Visszaállítás
            </Button>
            
            <div class="register-link">
              <RouterLink to="login" class="register-router-link">Vissza a bejelentkezéshez -></RouterLink>
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
  background-image: url('../assets/sokkutyus.png');
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

.welcome-text {
  margin-bottom: 2.5rem;
}

.welcome-text h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.welcome-text p {
  font-size: 1.1rem;
}

.description {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  text-align: center;
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
  text-align: left;
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

.email-icon {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' /%3E%3C/svg%3E") no-repeat center center;
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