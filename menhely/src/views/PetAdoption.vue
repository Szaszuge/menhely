<script setup lang="ts">
import PawFooter from '@/components/PawFooter.vue';
import Button from '@/components/Button.vue';
import CustomInput from '@/components/CustomInput.vue';
import AdoptionPopup from '@/components/AdoptionPopup.vue'; 
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { AnimalService } from '../service/animal.service';

const id = useRoute().params.id;
const imageURL = ref("");

const router = useRouter()
const animSer = new AnimalService();
const animal = ref(null);

const select1 = ref('');
const select2 = ref('');
const select3 = ref('');
const select4 = ref('');
const select5 = ref('');
const textInput = ref('');

const showAdoptionPopup = ref(false);

onMounted(() => {

animSer.GetAnimalDataByID(id).then((res) => {
  console.log(res.data.animal)
  animal.value = res.data.animal; 
  imageURL.value = `http://localhost:3000/uploads/${!!animal.value.details.image ? animal.value.details.image : 'placeholder/animal.png'}`;

  if (res.data.animal == null || !animal.value.isPublic) {
  router.push('/')
  }

})
});

const openAdoptionPopup = () => {
  showAdoptionPopup.value = true;
};

const closeAdoptionPopup = () => {
  showAdoptionPopup.value = false;
};

const handleSubmit = () => {  
  openAdoptionPopup();
};
</script>

<template>
  <div class="form-container">
    <div class="form-title-container">
      <div class="title-content">
        <img v-bind:src="imageURL" alt="Állat kép" class="allatkep">
        <p>Kérjük, meséljenek kicsit magukról és a körülményekről, ahová a kisállat kerülne (pl. mivel foglalkoznak, miért szeretnének kisállatot, mennyi időt tudnak vele tölteni). Mivel minden kisállatnak saját személyisége van, segít, ha jobban megismerjük az önökét, hogy megtaláljuk a leginkább hozzá illőt.</p>
      </div>
    </div>
    <div class="form-content">
      <div class="form-grid">
        <div class="column">
          <div class="input-group">
            <label for="select1">Tudsz-e anyagilag megfelelően gondoskodni a kisállatról?</label>
            <select id="select1" v-model="select1" class="custom-select">
              <option value="" disabled selected>Válasszon egy lehetőséget</option>
              <option value="option1">Igen</option>
              <option value="option2">Nem</option>
              <option value="option3">Jelenleg nem, de hamarosan képes leszek rá</option>
            </select>
            <p class="small-note">(Pl.: a kisállat későbbi orvosi költségei egy vizsgálatnál 30-40ezer forintba is kerülhetnek, felszerelések, minőségi etetés)</p>
          </div>

          <div class="input-group">
            <label for="select2">Van-e kisgyermek a családban?</label>
            <select id="select2" v-model="select2" class="custom-select">
              <option value="" disabled selected>Válasszon egy lehetőséget</option>
              <option value="option1">Igen</option>
              <option value="option2">Nem</option>
              <option value="option3">Várandós vagyok</option>
            </select>
          </div>

          <div class="input-group">
            <label for="select3">Hogyan szeretnéd tartani az örökbefogadott kisállatot?</label>
            <select id="select3" v-model="select3" class="custom-select">
              <option value="" disabled selected>Válasszon egy lehetőséget</option>
              <option value="option1">Lakásban</option>
              <option value="option2">Udvaron</option>
              <option value="option3">Lakásban és udvaron egyaránt</option>
            </select>
          </div>
        </div>

        <div class="column">
          <div class="input-group">
            <label for="select4">Milyen típusú ingatlanban fog élni?</label>
            <select id="select4" v-model="select4" class="custom-select">
              <option value="" disabled selected>Válasszon egy lehetőséget</option>
              <option value="option1">Családi ház</option>
              <option value="option5">Albérlet</option>
              <option value="option3">Panel</option>
              <option value="option2">Tanya</option>
              <option value="option4">Kertesház</option>
            </select>
            <p class="small-note">(Pl.: Egy nagyobb méretű állatot nem ajánlatos kis helyen tartani, valamint nem is biztos, hogy az adott típusú lakásban tartható.)</p>
          </div>

          <div class="input-group">
            <label for="select5">Van-e más kisállat otthon a családban?</label>
            <select id="select5" v-model="select5" class="custom-select">
              <option value="" disabled selected>Válasszon egy lehetőséget</option>
              <option value="option1">Igen</option>
              <option value="option2">Nem</option>
              <option value="option3">Több állatot is szeretnék örökbefogadni</option>
            </select>
            
          </div>

          <div class="input-group">
            <label for="textInput">Mit gondol az ivartalanításról?</label>
            <CustomInput class="inputs" v-model="textInput" placeholder="Ide írhat további információt..." />
          </div>
        </div>
      </div>

      <div class="button-container">
        <Button class="submit-button" @click="handleSubmit">Időpontfoglalás</Button>
      </div>
    </div>
  </div>
  
  <AdoptionPopup 
    v-if="showAdoptionPopup" 
    :animal="animal" 
    @close="closeAdoptionPopup" 
  />
  
  <PawFooter :is-sticky="true"/>
</template>

<style scoped>
.form-container {
  background: #FED7AA;
  border-radius: 15px;
  width: 90%;
  max-width: 1000px; 
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.form-content {
  padding: 2rem;
}

.form-title-container {
  background-color: #FDBA74;
  padding: 1.5rem;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: row-reverse;
}

.title-content p {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.5;
  font-weight: 600;
  text-align: justify;
  flex-direction: row-reverse;
}

.allatkep {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid black;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.2rem;
  text-align: left;
}

.small-note {
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 0.5rem;
  color: #666;
  text-align: left;
}

.custom-select {
  width: 100%;
  padding: 10px;
  border: 3px solid #6a7282;
  border-radius: 15px;
  background: #f8f4f4;
  font-size: 1rem;
}

.inputs {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.submit-button {
  height: 70px;
  width: 150px;
  border-radius: 16px;
  background: #E85B44;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
  font-size: 1.1rem;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .title-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-content {
    padding: 1.5rem;
  }
}
</style>