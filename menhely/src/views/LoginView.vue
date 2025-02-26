<script setup lang="ts">
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
</script>

<template>
<main>
<div id="form">
<h1>Bejelentkezés</h1>
<h3>Felhasználónév</h3>
<Input/>
<br>
<h3>Jelszó</h3>
<Input/>
<h4>Elfelejtetted a jelszavad?</h4>
<h4>Még nincs fiókod?</h4>
<Button id="fasz">Bejelentkezés</Button>
</div>
</main>
</template>

<style scoped>
h1{
    font-size: 2.50rem;
    font-weight: 600;
    margin-top: 2.50rem;
}

h3{
    font-weight: 600;
}

h4{
    font-weight: 600;
    color: #E85B44;
}

#form{
    margin-left: 6rem;
    margin-top: 5rem;
}

#fasz{
    margin: 10px;
    margin-left: 180px;
}
</style>