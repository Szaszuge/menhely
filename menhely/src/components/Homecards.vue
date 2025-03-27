<script setup lang="ts">
const props = defineProps({
    format: {
        type: String,
        required: false, 
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
        <p v-if="props.format == 'health' ? true : false" >Segíts te is! Fogadj örökbe egy kutyát vagy macskát, és adj nekik új esélyt egy boldog életre. Menhelyünkön szeretettel várunk minden mentett állatot!</p>
    
        <img v-if="props.format == 'care' ? true : false" src="../assets/card2.png">
        <p v-if="props.format == 'care' ? true : false" >Változtass egy életen! Segíts, hogy a menhelyünkön élő állatok biztonságos új otthont találjanak. Minden segítség számít!</p>
        
        <img v-if="props.format == 'food' ? true : false" src="../assets/card3.png">
        <p v-if="props.format == 'food' ? true : false" >Támogasd menhelyünket! Minden adomány és segítség számít, hogy jobb körülményeket tudjunk biztosítani a rászoruló állatoknak. Együtt életeken változtathatunk!</p>
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
    margin-bottom: 2rem;
}

img{
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
}


</style>