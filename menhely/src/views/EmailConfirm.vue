<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from 'vue';
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';
import CustomInput from '@/components/CustomInput.vue';
import { ApiService } from "../service/api.service";
import AlertPopup from '../components/AlertPopup.vue';

const router = useRouter()
const api = new ApiService();

const alertPopup = ref(null)

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

function activate(event) {
    api.userActivate(id, confirm).then((res) =>{
        console.log(res.data.message);
        alertPopup.value.addAlert(res.data.message, res.data.message == 'Sikeres Aktiváció!' ? 'success' : 'error')

        if (res.data.message == "Sikeres Aktiváció!"){
            router.push("/");
        }
    })
}

let confirm = '';
</script>

<template>

    <div class="emailconfirm-page" :class="status" id="inactive">
        <div class="emailconfirm-card">
            <div class="form-side">
                <div class="form-container">
                    <div class="welcome-text">
                        <h2>Megerősítés</h2>
                        <p>A mezőbe kérjük azt a jelszót írja be, amellyel a fiókját regisztrálta.</p>
                    </div>
                    
                    <form @submit.prevent="activate" class="login-form">
                        <div class="form-group">
                            <label for="password">Jelszó</label>
                            <div class="input-container">
                                <span class="input-icon lock-icon"></span>
                                <CustomInput 
                                    id="password"
                                    class="styled-input" 
                                    v-model="confirm" 
                                    type="password" 
                                    placeholder="Adja meg jelszavát"
                                />
                            </div>
                        </div>
                        
                        <Button 
                            type="button" 
                            class="login-button"
                            @click="activate"
                        >
                            Aktiválás
                        </Button>
                        
                        <div hidden id="user_ID">{{ $route.params.id }}</div>
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

    <div class="emailconfirm-page" :class="status" id="activated">
        <div class="emailconfirm-card">
            <div class="form-side">
                <div class="form-container">
                    <div class="welcome-text">
                        <h2>Sajnáljuk</h2>
                        <p>Ez a fiók már aktiválva van.</p>
                    </div>
                </div>
            </div>
            
            <div class="illustration-side">
            </div>
        </div>
        
        <div class="footer-container">
            <PawFooter :is-sticky="true" />
        </div>
    </div>

    <div class="emailconfirm-page" :class="status" id="non-existent">
        <div class="emailconfirm-card">
            <div class="form-side">
                <div class="form-container">
                    <div class="welcome-text">
                        <h2>Hiba</h2>
                        <p>A fiók nem létezik.</p>
                    </div>
                </div>
            </div>
            
            <div class="illustration-side">
            </div>
        </div>
        
        <div class="footer-container">
            <PawFooter :is-sticky="true" />
        </div>
    </div>

    <div class="emailconfirm-page" :class="status" id="banned">
        <div class="emailconfirm-card">
            <div class="form-side">
                <div class="form-container">
                    <div class="welcome-text">
                        <h2>Sajnáljuk</h2>
                        <p>Ez a fiók le van tiltva.</p>
                    </div>
                </div>
            </div>
            
            <div class="illustration-side">
            </div>
        </div>
        
        <div class="footer-container">
            <PawFooter :is-sticky="true" />
        </div>
    </div>
    <AlertPopup ref="alertPopup" />
</template>

<style scoped>
div#non-existent.non-existent {
    display: flex !important;
}

div#inactive.inactive {
    display: flex !important;
}

div#activated.user, div#activated.moderator, div#activated.admin {
    display: flex !important;
}

div#banned.banned {
    display: flex !important;
}

.emailconfirm-page {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    min-height: 700px;
}

.emailconfirm-card {
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
    background-image: url('../assets/catinbed.jpg');
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

.footer-container {
    width: 100%;
    position: relative;
    z-index: 2;
}

@media (max-width: 900px) {
    .emailconfirm-card {
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
    .emailconfirm-page {
        padding: 1rem;
    }
    
    .emailconfirm-card {
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
</style>