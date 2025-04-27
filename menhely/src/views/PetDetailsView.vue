<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide, watch } from 'vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import VisitPopup from '@/components/VisitPopup.vue';
import { useRouter, useRoute } from "vue-router";
import { AnimalService } from '../service/animal.service';
import { useUserStore } from '../stores/user';

const id = useRoute().params.id;
const imageURL = ref("");

const router = useRouter()
const animSer = new AnimalService();
const animal = ref({
  name: "",
  gender: "",
  type: "",
  details: {
    color: '',
    chipped: false,
    neutered: false,
    passported: false,
    paragraphs: [],
    image: '',
  },
  isPublic: false
});

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

const showVisitPopup = ref(false);

const openVisitPopup = () => {
  showVisitPopup.value = true;
};

const closeVisitPopup = () => {
  showVisitPopup.value = false;
};
</script>

<template>
  <div class="pet-details">
    <div class="left-container">
      <div class="image-card">
        <img v-bind:src="imageURL" alt="Állat kép"/>
        <div class="specs">
          <div class="spec-row"><span>Fajtája</span> <span>{{ animal.gender == 'male' ? "Hím" : "Nőstény"}} {{ animal.type == 'dog' ? "kutya" : "macska"}}</span></div>
          <div class="spec-row"><span>Színe</span> <span>{{ animal.details.color }}</span></div>
          <div class="spec-row"><span>Chippeltetve?</span> <span>{{ animal.details.chipped ? "Igen" : "Nem"}}</span></div>
          <div class="spec-row"><span>Ivartalanított?</span> <span>{{ animal.details.neutered ? "Igen" : "Nem"}}</span></div>
          <div class="spec-row"><span>Útlevél?</span> <span>{{ animal.details.passported ? "Igen" : "Nem"}}</span></div>
        </div>
      </div>
    </div>

    <div class="right-container">
      <div class="info-card">
        <h2 class="pet-name">{{ animal.name }}</h2>
        
        <div class="info-content">
          <section v-for="paragraph in animal.details.paragraphs">
            <h3>{{ paragraph.title }}</h3>
            <p>{{ paragraph.description }}</p>
          </section>
        </div>

        <div class="action-buttons" v-if="useUserStore().isLoggedIn()" >
          <Button class="visit-btn" @click="openVisitPopup">Meglátogatás</Button>
          <Button class="adopt-btn" @click="router.push(`/petadoption/${id}`)">Örökbefogadás</Button>
        </div>
        <div class="action-buttons" v-else >
          <Button class="disabled-adopt-btn">Az időpontfoglaláshoz jelentkezzen be!</Button>
        </div>
      </div>
    </div>
  </div>

  <PawFooter :is-sticky="true"/>
  
  <VisitPopup v-if="showVisitPopup" @close="closeVisitPopup" :animal="animal" />
</template>

<style scoped>
.pet-details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1600px; 
  margin: 2rem auto;
  padding: 0 1rem;
}


.left-container {
  flex: 1;
  min-width: 280px;
  border: 1px solid black; 
  border-radius: 20px; 
}


.right-container {
  flex: 3;
  min-width: 320px;
}

.image-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-card img {
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.specs {
  border-radius: 12px 12px 20px 20px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0; 
  font-size: 1rem;
}

.spec-row:last-child {
  border-bottom: none;
}
.spec-row:nth-child(even) {
  background-color: #f8f9fa;
}

.spec-row span:first-child {
  font-weight: 600;
}

.info-card {
  background: #FED7AA;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-weight: 600;
  text-align: center;
  font-size: 1.8rem;
  background-color: #FDBA74;
  padding: 1rem;
  margin: 0;
  border-radius: 12px 12px 0 0;
}

.info-content {
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 550px;
}

section {
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
}

p, ul {
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
}

ul {
  padding-left: 1.25rem;
  list-style-type: disc;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
}

.visit-btn, .adopt-btn {
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  text-align: center; 
  display: flex;
  align-items: center;
  justify-content: center; 
  border-radius: 16px;
  background: var(--button-important);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.disabled-adopt-btn {
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  text-align: center; 
  display: flex;
  align-items: center;
  justify-content: center; 
  border-radius: 16px;
  background: var(--button-disabled);
  width: 350px;
  font-weight: 600;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}
.disabled-adopt-btn:hover {
  background: var(--button-disabled);
  cursor:default;
}

.visit-btn:hover, .adopt-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}


@media (max-width: 768px) {
  .pet-details {
    flex-direction: column;
  }
  
  .left-container, .right-container {
    flex: 1 1 100%;
    width: 100%;
  }

  .action-buttons {
    justify-content: center;
  }
}


@media (min-width: 1800px) {
  .pet-details {
    max-width: 85%; 
  }
}
</style>