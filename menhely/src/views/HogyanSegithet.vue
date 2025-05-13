<script setup lang="ts">
import { ref, onMounted } from "vue";
import SupportCard from "@/components/SupportCard.vue";
import PawFooter from "@/components/PawFooter.vue";
import CustomInput from "@/components/CustomInput.vue";
import DualRangeSlider from "@/components/DualRangeSlider.vue";
import AlertPopup from '../components/AlertPopup.vue';
import { useUserStore } from '../stores/user';
import { ApiService } from "../service/api.service";
const userStore = useUserStore();
const api = new ApiService();

const alertPopup = ref(null)

// State management
const showVolunteerForm = ref(false);
const volunteerDate = ref({
  year: "",
  month: "",
  day: ""
});
const volunteerReason = ref("");

const values = ref([25, 75]);

function toggleForm() {
  showVolunteerForm.value = !showVolunteerForm.value;
}

// Form submission
function submitVolunteerForm() {
  const data = {
    type: 'volunteer',
    user: userStore.loggedUser().id,
    details: {
      date: volunteerDate.value,
      fromTo: values.value,
      reason: volunteerReason.value
    }
  }
  api.submitVolunteerRequest(data).then((res) => {
    alertPopup.value.addAlert(res.data.message, res.status == 200 ? "success" : "failure");
  });
}

const currentYear = new Date().getFullYear();
const availableYears = Array.from({ length: 3 }, (_, i) => currentYear + i);

const isMobile = ref(false);

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 1000;
}

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});
</script>

<template>
  <div class="content-wrapper">
    <div class="cards-container">
      <!-- Volunteer Card -->
      <SupportCard title="Jelentkezzen önkéntesnek!">
        <div class="card-content">
          <p class="intro-text">
            Menhelyünk meleg szívvel vár minden lelkes embert, aki segíteni szeretne 
            kiskedvenceink foglalkoztatásával, ezzel is a menhely működését segítve.
          </p>
          
          <ul class="feature-list">
            <li>Naptárunkban látható lesz melyik napokon tudnak segíteni menhelyünknek.</li>
            <li>Egy adott napra maximum 2 embert bírunk foglalkoztatni.</li>
            <li>A gombra nyomva a mezőket töltse ki adatainak megfelelően!</li>
            <li>Ha elküldte jelentkezését email-ben fogjuk jelezni önnek ha felvettük.</li>
          </ul>
          
          <div class="button-container">
            <button class="primary-button" @click="toggleForm">
              {{ showVolunteerForm ? "Vissza" : "Jelentkezem" }}
            </button>
          </div>
        </div>
      </SupportCard>


      <div class="image-container">
        <img src="@/assets/tamogatas.png" alt="Támogatás" class="support-image" />
      </div>

      <SupportCard :title="showVolunteerForm ? 'Jelentkezés' : 'Adományozzon!'">
        <div class="card-content">
          <template v-if="!showVolunteerForm">
            <p class="intro-text">
              Segítsen, hogy még több kutyának és cicának adhassunk esélyt egy új, 
              boldog életre! Minden adomány, legyen az egyszeri vagy rendszeres, 
              hozzájárul ahhoz, hogy folytathassuk munkánkat. Hogyan támogathat minket?
            </p>
            
            <ul class="feature-list">
              <li>Pénzbeli adomány: Adjon online vagy banki átutalással.</li>
              <li>Rendszeres adomány: Havi hozzájárulással hosszú távon segíthet.</li>
              <li>Az adója 1%-át felajánlhatja menhelyünknek.</li>
              <li>Adószámunk: 12345678-9-10</li>
            </ul>
            
            <p class="closing-text">
              Minden segítség számít! Köszönjük, hogy velünk tart, és támogatja a
              rászoruló állatokat!
            </p>
          </template>

          <template v-else>
            <div class="form-content">
              <p class="form-intro">
                Itt tudja leadni jelentkezését önkéntes munkára hozzánk! Jelentkezzenek bátran!
              </p>

              <!-- Date Selection -->
              <div class="date-selection">
                <div class="date-group">
                  <label>Év:</label>
                  <select v-model="volunteerDate.year" class="date-input">
                    <option value="">Év</option>
                    <option v-for="year in availableYears" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>

                <div class="date-group">
                  <label>Hónap:</label>
                  <select v-model="volunteerDate.month" class="date-input">
                    <option value="">Hó.</option>
                    <option v-for="month in 12" :key="month" :value="month < 10 ? `0${month}` : month">
                      {{ month }}
                    </option>
                  </select>
                </div>

                <div class="date-group">
                  <label>Nap:</label>
                  <select v-model="volunteerDate.day" class="date-input">
                    <option value="">Nap</option>
                    <option v-for="day in 31" :key="day" :value="day < 10 ? `0${day}` : day">
                      {{ day }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="time-selection">
                <label>Munka ideje (órában):</label>
                <DualRangeSlider v-model="values" />
              </div>

              <div class="reason-input">
                <label>Mit szeretnél nálunk dolgozni?</label>
                <CustomInput class="munka-input" 
                  type="text"
                  placeholder="Írja le, milyen munkát vállalna"
                  v-model="volunteerReason"
                />
              </div>

              <div class="button-container" v-if="userStore.isLoggedIn()">
                <button class="primary-button" @click="submitVolunteerForm()">
                  Küldés
                </button>
              </div>
              <div class="button-container" v-else>
                <button class="disabled-button" disabled>
                  Kérem jelentkezzen be!
                </button>
              </div>
            </div>
          </template>
        </div>
      </SupportCard>
    </div>


    <PawFooter v-if="!isMobile" :is-sticky="true" />
  </div>
  <AlertPopup ref="alertPopup" />
</template>

<style scoped>
.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.cards-container {
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 3.5rem;
  margin-top: 3rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.intro-text, .closing-text {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.feature-list {
  padding-left: 1.5rem;
  list-style-type: disc;

}

.feature-list li {
  margin : 1.35rem 0;

}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 1rem 0;
}

.primary-button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 16px;
  background: #E85B44;
  color: white;
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.disabled-button {
  background-color: var(--button-disabled);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(232, 91, 68, 0.3);
  background: #D85840;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.support-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}


.form-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-intro {
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.munka-input {
  width: 100%;
  padding: 0.6rem;

}
.date-selection {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.date-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.date-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.date-input {
  padding: 0.6rem;
  border: 2px solid #6a7282;
  border-radius: 0.5rem;
  background-color: #f8f4f4;
  font-size: 0.9rem;
}

.time-selection, .reason-input {
  margin-bottom: 0.5rem;
}

.time-selection label, .reason-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}


@media (max-width: 1000px) {
  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    width: 100%;
    max-width: 250px;
  }
.primary-button{
  margin-top: 1.5rem;
}
}
</style>