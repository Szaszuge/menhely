<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
const imageURL = computed(() => {
  return `http://localhost:3000/uploads/${props.animal.details.image ?? 'placeholder/animal.png'}`;
});
const props = defineProps({
  animal: {
    type: Object,
    required: true,
  },
  

})
</script>

<template>
    <div class="image-container">
      <img :src=imageURL alt="" class="allatkep">
      <div class="white-rectangle">
        <h2>{{props.animal.name}}</h2>
        <div class="igazitas">
            <p class="text-slate-500">{{props.animal.gender == 'male' ? (props.animal.type == "dog" ? "Kan" : "Kandúr") : (props.animal.type == "dog" ? "Szuka" : "Nőstény")}}, {{props.animal.age}}</p>
            <RouterLink :to="`/petdetails/${props.animal.id}`">
              <img src="../assets/forwardbutton.png" alt="" class="forwardbutton" id="forwardbutton">
        </RouterLink>

        </div>
      </div>
    </div>
  </template>
  
  <style scoped>

  #forwardbutton{
    cursor: pointer;
  }
  .image-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  
  .image-container img:first-child {
    display: block;
  }
  
  .white-rectangle {
    width: 440px;
    background-color: white;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.4);
  }
  
  .allatkep {
    width: 440px;
    height: 420px;
    border-radius: 40px 40px 0px 0px;
    object-fit: cover
  }
  
  .forwardbutton {
    position: relative;
    width: 90px;
    height: 90px;
    right: -20px;
  }
  h2 {
  font-weight: bold;
  font-size: 1.6rem;
  align-items: center;
  margin-bottom: 10px;
  }  
.igazitas{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 365px;
}
p{
    font-size: 1.4rem;
    font-weight: 600;
}
</style>