<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';
import { useUserStore } from "../stores/user";

onMounted(() => {
    const router = useRouter();
    const useUser = useUserStore();
    useUser.setToken("");
    router.push("/");
});
</script>


<template>

</template>
