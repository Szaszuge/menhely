<script setup lang="ts">
import { useRouter } from "vue-router";
import { ApiService } from '@/service/api.service';
import { environment } from '../enviroments/testing';
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';

let router = useRouter()
let api = new ApiService();
let tokenName = environment.tokenName;

let user = {
    name: "",
    pass: "",
};
function login(event) {
    api.userLogin(user.name, user.pass).then((res) => {
        console.log(res.data.token);
        localStorage.setItem(tokenName, res.data.token);
    })
}

</script>

<template>
<main>
<div id="form">
    <h1>Bejelentkezés</h1>

    <h3>Felhasználónév</h3>
    <CustomInput v-model="user.name"/>

    <h3>Jelszó</h3>
    <CustomInput v-model="user.pass" type="password"/>

    <div id="smalltext">
    <h4>Elfelejtetted a jelszavad?</h4>
    <RouterLink to="/register">
        <h4>Még nincs fiókod?</h4>
    </RouterLink>
    </div>

    <Button id="login" @click="login">Bejelentkezés</Button>
</div>
<img src="../assets/Kutyamacska.png">
</main>
<PawFooter  :is-sticky="true"/>
</template>

<style scoped>
h1{
    font-size: 2.50rem;
    margin-top: 2.50rem;
}

h1, h3, h4{
    font-weight: 600;
}

h4{
    color: #E85B44;
    font-weight: 800;
}

main{
    display: flex;
    flex-flow: row wrap;
}

img{
    z-index: -1;
    position: absolute;
    width: calc(200px + 40vw);
    bottom: 0px;
    right: 50px;
}

#form{
    width: 400px;
    margin-left: 6rem;
    margin-top: 5rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    gap: 0.375rem;
}
#smalltext{
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
}
#login{
    margin: 10px 0px 10px 10px;
    height: 50px !important; 
    width: 120px;
    align-self: flex-end;
}
</style>