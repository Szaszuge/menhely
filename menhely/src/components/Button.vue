<script setup lang="ts">

</script>

<template>
    <button class="button shadow-md rounded-2xl text-white cursor-pointer font-bold h-14 w-32">
        <slot>

        </slot>
    </button>
    
</template>


<style scoped>
.button{
    background-color: var(--button-important);
}

.button:hover {
    background-color: ;
}
</style>