<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ApiService } from '../service/api.service';
import { useUserStore } from '../stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const api = new ApiService();
const router = useRouter()

const id:string = useRoute().params.id; // sír de ez jó
const text = ref('');
onMounted(() => {
    if (userStore.isLoggedIn()){
        router.push('/') // Ha kell debug, ezt kommenteld ki
    }
    api.revertPassword(id).then((res) => {
        if (res.data.success){
            setTimeout(() => {}, 2000);
        }
    })
    router.push('/') // Ha kell debug, ezt kommenteld ki
})
    
</script>

<template>

</template>

<style scoped lang="css">

</style>