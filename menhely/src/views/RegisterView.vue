<script setup lang="ts">
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';
//w-79 , w-37.5
//x2
//
</script>

<template>
<main>
    <div id="form">
        <h1>Regisztráció</h1>
        <h3>A csillaggal jelölt mezők kitöltése kötelező</h3>
        
        <div class="input-row">
            <div class="input-group">
                <h3>Teljes név*</h3>
                <CustomInput class="w-75" />
            </div>
            <div class="input-group">
                <h3>Felhasználónév*</h3>
                <CustomInput class="w-75" />
            </div>
        </div>

        <div class="input-full">
            <h3>E-mail cím*</h3>
            <CustomInput class="w-154" />
        </div>

        <div class="input-row">
            <div class="input-group">
                <h3>Irányítószám</h3>
                <CustomInput class="w-75" />
            </div>
            <div class="input-group">
                <h3>Település*</h3>
                <CustomInput class="w-75" />
            </div>
        </div>

        <div class="input-full">
            <h3>Utca, házszám*</h3>
            <CustomInput class="w-154" />
        </div>

        <div class="input-row">
            <div class="input-group">
                <h3>Emelet</h3>
                <CustomInput class="w-75" />
            </div>
            <div class="input-group">
                <h3>Ajtó</h3>
                <CustomInput class="w-75" />
            </div>
        </div>

        <div class="input-full">
            <h3>Jelszó*</h3>
            <CustomInput class="w-154" />
        </div>
        
        <RouterLink to="/login">
            <h4>Már van fiókod?</h4>
        </RouterLink>
        <Button id="login">Bejelentkezés</Button>
    </div>
    <img src="../assets/Kutyamacska.png">
</main>
</template>

<style scoped>
h1 {
    font-size: 2.50rem;
    margin-top: 2.50rem;
}

h1, h3, h4 {
    font-weight: 600;
}

h4 {
    color: #E85B44;
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
    margin-top: 5rem;
}

.input-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.input-group {
    flex: 1;
}

.input-full {
    margin-bottom: 1rem;
}

#login {
    margin: 10px;
    margin-left: 180px;
    height: 50px !important;
    width: 120px;
}
</style>
