<script setup lang="ts">
const props = defineProps({
    format: {
        type: String,
        required: true, 
        default: "health",
        validator(value:string, props) {
            return ["health","care","food"].includes(value)
        }
    }
})
</script>

<template>
    <div id="sub" class="bg-orange-300">
        <img v-if="props.format == 'health' ? true : false" src="../assets/card1.png">
        <p v-if="props.format == 'health' ? true : false" >Inter, semibold.. 16..... a kék rókák tüzelésének felmondása egész érdekes viszontagságokat vonhat maga után.. A zöld ebibékák halálának feje orángután pótlék.</p>
    
        <img v-if="props.format == 'care' ? true : false" src="../assets/card2.png">
        <p v-if="props.format == 'care' ? true : false" >There wasn't a bird in the sky, but that was not what caught s, but came with these. She knew what was  coming and she hoped she was prepared. Krumpli hálózsák.</p>
        
        <img v-if="props.format == 'food' ? true : false" src="../assets/card3.png">
        <p v-if="props.format == 'food' ? true : false" >Kicsikét a zöld teknősök tetőjének háza kitinrétegek kitágulásának köszönhetően haza kell vinni a trófeát ahhoz, hogy a kellő értékeket képviseljék a csigák.</p>
    </div>
</template>

<style scoped>
div{
    display: flex;
    font-weight: 600;
}

#sub{
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-flow: column nowrap;
    padding: 3rem;
    max-width: 350px;
    border: 1.5px black solid;
    border-radius: 10px;
    max-height: 18rem;
}

img{
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
}


</style>