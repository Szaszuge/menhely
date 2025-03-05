<script setup lang="ts">
import { useRouter } from "vue-router";
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
import { ApiService } from '@/service/api.service';
import { Address } from '@/interfaces/address';

let router = useRouter()
let api = new ApiService();

let address:Address = {
    city: "",
    postal: "",
    street: "",
    number: "",
    floor: null,
    door: null
};

let user = {
    fullName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: address,
    permit: "inactive"
};

function register(event) {
    console.log(user);
    api.userRegister(user, address).then((res) => {
        console.log(res.data.message);
    });
    router.push("/emailsent");
}

</script>

<template>
<main>
    <div id="form">
        <h1>Regisztráció</h1>
        <h3 id="subtitle">A csillaggal jelölt mezők kitöltése kötelező!</h3>
        
        <div class="input-row">
            <div class="input-group">
                <h3>Teljes név*</h3>
                <CustomInput id="teljesNev" v-model="user.fullName"/>
            </div>
            <div class="input-group">
                <h3>Felhasználónév*</h3>
                <CustomInput id="felhasznaloNev" v-model="user.userName"/>
            </div>
        </div>

        <div class="input-full">
            <h3>E-mail cím*</h3>
            <CustomInput id="emailCim" v-model="user.email"/>
        </div>

        <div class="input-full">
            <h3>Telefonszám*</h3>
            <CustomInput id="telefon" v-model="user.phoneNumber"/>
        </div>

        <div class="input-row">
            <div class="input-group">
                <h3>Irányítószám</h3>
                <CustomInput id="iranyitoszam" v-model="address.postal" type=""/>
            </div>
            <div class="input-group">
                <h3>Település*</h3>
                <CustomInput id="telepules" v-model="address.city"/>
            </div>
        </div>

        <div class="input-row">
            <div class="input-group">
                <h3>Utca*</h3>
                <CustomInput id="utca" v-model="address.street"/>
            </div>
            <div class="input-group">
                <h3>Házszám*</h3>
                <CustomInput id="hazszam" v-model="address.number"/>
            </div>
        </div>

        <div class="input-row">
            <div class="input-group">
                <h3>Emelet</h3>
                <CustomInput id="emelet" v-model="address.floor"/>
            </div>
            <div class="input-group">
                <h3>Ajtó</h3>
                <CustomInput id="ajto" v-model="address.door"/>
            </div>
        </div>

        <div class="input-full">
            <h3>Jelszó*</h3>
            <CustomInput id="jelszo" v-model="user.password" type="password"/>
        </div>
        
        <div class="veg">
        <RouterLink to="/login">
            <h4>Már van fiókod?</h4>
        </RouterLink>
        <Button id="login" @click="register">Regisztráció</Button>
        </div>
    </div>
    <img src="../assets/Kutyamacska.png">
</main>
<PawFooter/>
</template>

<style scoped>
.veg{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    min-height: 80px;
    margin-bottom: 2rem;
}

h1 {
    font-size: 2.50rem;
}

h1, h3, h4 {
    font-weight: 600;
}
#subtitle{
    margin-top: -1rem;
}

h4 {
    color: var(--button-important);
}

main {
    display: flex;
    flex-flow: row wrap;
}

img {
    z-index: -1;
    position: absolute;
    width: calc(200px + 40vw);
    bottom: 0px;
    right: 50px;
}

#form {
    margin-left: 6rem;
    margin-top: 2rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    gap: 0.375rem;
}

.input-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.12rem;
}

.input-group {
    flex: 1;
}

.input-full {
display: flex;
flex-flow: column nowrap;
}

#login {
    height: 50px !important;
    width: 120px;
    align-self: flex-end;
}
</style>
