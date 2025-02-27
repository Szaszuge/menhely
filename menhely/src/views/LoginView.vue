<script setup lang="ts">
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
</script>

<template>
<main>
<div id="form">
    <h1>Bejelentkezés</h1>

    <h3>Felhasználónév</h3>
    <CustomInput class="w-75"/>

    <br>

    <h3>Jelszó</h3>
    <CustomInput class="w-75"/>

    <h4>Elfelejtetted a jelszavad?</h4>
    <RouterLink to="/register">
        <h4>Még nincs fiókod?</h4>
    </RouterLink>

    <Button id="login">Bejelentkezés</Button>
</div>
<img src="../assets/Kutyamacska.png">
</main>
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
    margin-left: 6rem;
    margin-top: 5rem;
}

#login{
    margin: 10px;
    margin-left: 180px;
    height: 50px !important; 
    width: 120px;
}
</style>