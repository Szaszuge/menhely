<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    }
})

const emit = defineEmits(
    ['update:modelValue']
)

</script>

<template>
<input  type="text" 
        placeholder="Input" 
        class="border-3 border-gray-500 text-gray-500 bg-gray-100 p-2 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-base"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</input>
</template>


<style scoped>
    input{
        height: 44px;
        font-weight: 600;
        border-radius: 15px;
    }
</style>