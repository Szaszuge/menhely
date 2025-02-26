<script setup lang="ts">

</script>

<template>
    <button class="button">
        <slot>

        </slot>
    </button>
    
</template>


<style scoped>
.button{
    background-color: var(--button-important);
    height: 60px;
    width: 120px;
    border-radius: 15px;
    color: white;
    font-weight: 600;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.4);
    cursor:pointer;
}
</style>