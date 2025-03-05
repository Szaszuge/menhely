<script setup lang="ts">
import { defineEmits } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    search: {
        type: Boolean,
        required: false,
        default: false,
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
        v-bind:class="(search)? 'kereso' : ''"
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
    .kereso{
        background-image: url('../assets/Search.png');
        background-repeat: no-repeat;
        background-position: right 5px top 2px;
        background-size: 32px 32px;


    }
</style>