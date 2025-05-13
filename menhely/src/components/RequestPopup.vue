<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { AnimalService } from '../service/animal.service';

const animSer = new AnimalService();

const parsed_request = ref({id: 0, Type: "", details: {}})
const imageURL = ref("");

const animal = ref({ "isPublicable": undefined,
  "isPublic": undefined,
  "id": undefined,
  "name": undefined,
  "age": undefined,
  "type": undefined,
  "from": undefined,
  "gender": undefined,
  "arrival": undefined,
  "details": {
    "color": undefined,
    "chipped": undefined,
    "neutered": undefined,
    "passported": undefined,
    "characteristics": [],
    "paragraphs": [],
    "image": undefined },
  "created_at": undefined });

const props = defineProps({
    requestType: {
        type: String,
        required: false, 
    },
    currentRequest: {
        type: Object,
        required: false,
        default: '',
    }
})

watch(() => animal, (value) => {
  imageURL.value = `http://localhost:3000/uploads/${value.value.details.image ? value.value.details.image : 'placeholder/animal.png'}`;
}, {immediate: true})
watch(() => props.requestType, async (value) => {
  console.log(value);
  if (value == 'Örökbefogadás' || value ==  'Látogatás') {
    await animSer.GetAnimalDataByID(props.currentRequest.details.animal).then((res) => {
      imageURL.value = `http://localhost:3000/uploads/${res.data.animal.details.image ? res.data.animal.details.image : 'placeholder/animal.png'}`;
      animal.value = res.data.animal;
    })
  }
}, {deep: true, immediate: true})
watch(() => props.currentRequest, (value) => {
  console.log(value);
}, {immediate: true})
const name = ref('Szárforsíp terijer kiskutyuska')

</script>

<template>
<div class="request-popup-container">
      <div class="request-popup-content">
        <div class="request-close-button-container">
          <img src="../assets/close-dark.png" alt="Bezárás" class="request-close-icon" @click="$emit('closePopup')"/>
        </div>
        
        <div class="request-dog-details" v-if="props.requestType == 'Leadás'">
          <div class="request-image-container"  id="petvisitimage">
            <img v-bind:src="imageURL" alt="Kutya" class="request-dog-image" />
          </div>
          
          <div class="request-details-content">
            <h2 class="request-dog-name">{{ currentRequest.details.name ? currentRequest.details.name : "Névtelen" }}</h2>
            
            <div class="request-tags-container">
              <div class="request-tag">
                <img src="../assets/home_icon.png" alt="Otthon ikon" class="request-tag-icon" v-if="currentRequest.details.from == 'home'" />
                <img src="../assets/glass_icon.png" alt="Otthon ikon" class="request-tag-icon" v-else />
                <span>{{ currentRequest.details.from == "home" ? "Otthonból" : "Talált" }}</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/cat_icon.png" alt="Macska ikon" class="request-tag-icon" v-if="currentRequest.details.type == 'cat'" />
                <img src="../assets/dog_icon.png" alt="Kutya ikon" class="request-tag-icon" v-else />
                <span>{{ currentRequest.details.type == "cat" ? "Macska" : "Kutya" }}</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/location_icon.png" alt="Hely ikon" class="request-tag-icon" />
                <span>{{ currentRequest.details.city }}</span>
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Tervezett leadás időpontja:</p>
              <p class="request-info-value">{{ currentRequest.details.year }}-{{ currentRequest.details.month }}-{{ currentRequest.details.day }}</p>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Egyéb információ:</p>
              <div class="request-info-text">
                {{ currentRequest.details.other == '' ? "Ehhez az állathoz nem írtak leírást." : currentRequest.details.other }}
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="props.requestType == 'Önkéntes munka'">
          <div class="request-volunteer-details">
            <h2 class="request-title">Önkéntes munka jelentkezés adatai</h2>
            
            <div class="volunteer-info-row">
              <div class="volunteer-info-item">
                <p class="request-info-label">Jelentkező neve:</p>
                <p class="request-info-value">{{currentRequest.realname}}</p>
              </div>
              
              <div class="volunteer-info-item">
                <p class="request-info-label">Munka dátuma:</p>
                <p class="request-info-value">{{currentRequest.details.date.year}}-{{currentRequest.details.date.month}}-{{currentRequest.details.date.day}}</p>
              </div>
              
              <div class="volunteer-info-item">
                <p class="request-info-label">Munka ideje:</p>
                <p class="request-info-value">{{currentRequest.details.fromTo[0]}}-{{currentRequest.details.fromTo[1]}}</p>
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Miért jelentkezett munkára:</p>
              <div class="request-info-text">
                {{currentRequest.details.reason == '' ? 'A felhasználó nem adott hozzá leírást.' : currentRequest.details.reason}}
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="props.requestType == 'Látogatás'">
          <div class="request-dog-details">
            <div class="request-image-container" id="petvisitimage">
              <img :src=imageURL alt="Kutya" class="request-dog-image" />
            </div>
            
            <div class="request-details-content" id="petvisit">
              <h2 class="request-dog-name">{{animal.name}}</h2>
              
              <div class="request-info-section">
                <p class="request-info-label">Látogatást kérelmező neve:</p>
                <p class="request-info-value pet-visit-value">{{currentRequest.realname}}</p>
              </div>
              
              <div class="request-info-section">
                <p class="request-info-label">Meglátogatás dátuma:</p>
                <p class="request-info-value pet-visit-value">{{currentRequest.details.date}}</p>
              </div>
              
              <div class="request-info-section">
                <p class="request-info-label">Meglátogatás ideje pontosan (óra:perc):</p>
                <p class="request-info-value pet-visit-value">{{currentRequest.details.time}}</p>
              </div>
            </div>
          </div>
        </div>
        


        <div v-else-if="props.requestType == 'Örökbefogadás'">
          <div class="adoption-container">
            <h2 class="adoption-title">Állat örökbefogadása</h2>
            <div class="adoption-image-container">
              <img :src=imageURL alt="Állat" class="adoption-animal-image" />
            </div>
            <h3 class="adoption-animal-name">{{animal.name}}</h3>
            <div class="volunteer-info-row">
              <div class="volunteer-info-item">
                <p class="request-info-label">Örökbefogadó neve:</p>
                <p class="request-info-value">{{currentRequest.realname}}</p>
              </div>
              
              <div class="volunteer-info-item">
                <p class="request-info-label">Dátuma:</p>
                <p class="request-info-value">{{currentRequest.details.date}}</p>
              </div>
              
              <div class="volunteer-info-item">
                <p class="request-info-label">Időpont (óra:perc)</p>
                <p class="request-info-value">{{currentRequest.details.time}}</p>
              </div>
            </div>

            <div class="request-info-section">
              <p class="request-info-label">Tudsz-e anyagilag megfelelően gondoskodni a kisállatról?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[0]}}
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Van-e kisgyermek a családban?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[1]}}
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Hogyan szeretnéd tartani az örökbefogadott kisállatot?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[2]}}
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Milyen típusú ingatlanban fog élni?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[3]}}
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Van-e más kisállat otthon a családban?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[4]}}
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Mit gondol az ivartalanításról?</p>
              <div class="request-info-text">
                {{currentRequest.details.answers[5]}}
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>

</template>

<style lang="css" scoped>

.request-popup-container {
  background: #FED7AA;
  border-radius: 15px;
  width: calc(100vw - 25px);
  max-width: 800px;  
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 95vh;  
  overflow-y: auto;
}

.request-popup-content {
  padding: 1.5rem;
  position: relative;
}

.request-close-button-container {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
}

.request-close-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
}

.request-dog-details {
  display: flex;
  flex-direction: column;
}

.request-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.request-dog-image {
  width: 240px;
  height: 260px;
  object-fit: cover;
  border: 3px solid #E85B44;
  border-radius: 8px;
  margin-top: 6.5rem;
}

.request-details-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.request-dog-name {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#petvisitimage{
  margin-top: -3rem;
}

.request-info-section {
  margin-bottom: 1rem;
}

.request-info-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.pet-visit-value {
  text-align: left !important;
}

.request-info-value {
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
  text-align: left !important;
}

#petvisit{
  margin-top: 1rem;
}

.request-info-text {
  background-color: #FDBA74;
  padding: 0.5rem;
  border-radius: 8px;
  max-height: 200px;
  line-height: 1.5;
  overflow-y: auto;
  overflow-wrap: anywhere;
}

.request-tags-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.request-tag {
  display: flex;
  align-items: center;
  background-color: #FDBA74;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.adoption-container {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.adoption-title {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.adoption-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.adoption-animal-image {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border: 3px solid #E85B44;
  border-radius: 8px;
}

.adoption-animal-name {
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}


.request-tag-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

.request-volunteer-details {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.request-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
}

.volunteer-info-value {
  text-align: left !important;
  margin-left: 1.5rem;
}

.volunteer-info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 4rem;
  margin-top: 1rem;
}

.volunteer-info-item {
  flex: 1;
  min-width: 200px;
  margin-bottom: 1rem;
}

.volunteer-info-item .request-info-label {
  margin-bottom: 0.25rem;
}

.volunteer-info-item .request-info-value {
  font-weight: 600;
}

@media (min-width: 768px) {
  .request-dog-details {
    flex-direction: row;
    gap: 2rem;
  }
  
  .request-image-container {
    flex: 0 0 250px;
    margin-bottom: 0;
  }
  
  .request-dog-name {
    text-align: left;
  }
  
  .request-info-value {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .volunteer-info-row {
    flex-direction: column;
    margin-left: 0;
  }
  
  .volunteer-info-item {
    width: 100%;
  }
  
  .request-tags-container {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .request-dog-image {
    margin-top: 1rem;
  }

  #petvisitimage{
    margin-top: 0;
  }

  #petvisit{
    margin-top: 0;
  } 

  .adoption-animal-image {
    width: 200px;
    height: 220px;
  }
}
</style>