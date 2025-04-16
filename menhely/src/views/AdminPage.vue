<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import PawFooter from '@/components/PawFooter.vue';
import AdminNav from '@/components/AdminNav.vue';
import { ApiService } from "@/service/api.service";

const activeTab = ref('');
const search = ref('');
const api = new ApiService();

const showRequestDetails = ref(false);
const selectedRequestId = ref('');

onMounted(() => {
  refresh();
});

function refresh() {
  api.getAllRequests().then((res) => {
    requests = res.data.requests;
  });
  api.getAllUsers().then((res) => {
    users = res.data.users;
  });
  api.getAllAnimals().then((res) => {
    animals = res.data.animals;
  });
}

// Kérések
let requests = [];

async function viewRequest(id:string) {
  selectedRequestId.value = id;
  showRequestDetails.value = true; 
}

async function acceptRequest(id:string) {
  await api.acceptRequest(id).then((res) => {
    console.log(res.data);
  });
  refresh();
}

async function refuseRequest(id:string) {
  await console.log("TBA");
  refresh();
}

function closeRequestPopup() {
  showRequestDetails.value = false;
}

// Kérések vége
// Felhaszálók

let users = [];

let animals = [];
</script>

<template>
  <div class="admin-container">
    <div class="content-wrapper">
      <AdminNav v-model:activeTab="activeTab" />

      <div class="search-container">
        <CustomInput v-model="search" search class="search-input" />
      </div>

      <div class="table-container">
        <table v-if="activeTab === 'Kérések'" class="admin-table">
          <thead>
            <tr class="header-row">
              <th class="column-name">Név</th>
              <th class="column-middle">Típus</th>
              <th class="column-actions">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(request, index) in requests" 
              :key="index" 
              :class="{ 
                'even-row': index % 2 !== 0, 
                'odd-row': index % 2 === 0,
                'last-row': index === requests.length - 1 
              }"
            >
              <td class="column-name">{{ request.name }}</td>
              <td class="column-middle">{{ request.type }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <button class="action-button" aria-label="Megtekintés" @click="viewRequest(request.id)">
                    <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Elfogadás">
                    <img src="../assets/check.png" alt="Elfogadás" class="action-icon" @click="acceptRequest(request.id)">
                  </button>
                  <button class="action-button" aria-label="Elutasítás">
                    <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon" @click="refuseRequest(request.id)">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="activeTab === 'Felhasználók'" class="admin-table">
          <thead>
            <tr class="header-row">
              <th class="column-name">Név</th>
              <th class="column-middle">Jogosultság</th>
              <th class="column-actions">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(user, index) in users" 
              :key="index" 
              :class="{ 
                'even-row': index % 2 !== 0, 
                'odd-row': index % 2 === 0,
                'last-row': index === users.length - 1 
              }"
            >
              <td class="column-name">{{ user.name }}</td>
              <td class="column-middle">{{ user.role }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <button class="action-button" aria-label="Előléptetés">
                    <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Kitiltás">
                    <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="activeTab === 'Állatok'" class="admin-table">
          <thead>
            <tr class="header-row">
              <th class="column-name">Név</th>
              <th class="column-middle">Állatfaj</th>
              <th class="column-actions">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(animal, index) in animals" 
              :key="index" 
              :class="{ 
                'even-row': index % 2 !== 0, 
                'odd-row': index % 2 === 0,
                'last-row': index === animals.length - 1 
              }"
            >
              <td class="column-name">{{ animal.name }}</td>
              <td class="column-middle">{{ animal.species }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <button class="action-button" aria-label="Elrejtés">
                    <img src="../assets/hide.png" alt="Elrejtés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Törlés">
                    <img src="../assets/close.png" alt="Törlés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Módosítás">
                    <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="activeTab === 'Kérések'" class="mobile-table">
          <div
            v-for="(request, index) in requests"
            :key="`mobile-${index}`"
            class="mobile-card"
            :class="{
              'even-card': index % 2 !== 0,
              'odd-card': index % 2 === 0
            }"
          >
            <div class="mobile-card-info">
              <div class="mobile-field">
                <span class="mobile-label">Név:</span>
                <span class="mobile-value">{{ request.name }}</span>
              </div>
              <div class="mobile-field">
                <span class="mobile-label">Típus:</span>
                <span class="mobile-value">{{ request.type }}</span>
              </div>
            </div>
            <div class="mobile-actions">
              <button class="action-button" aria-label="Megtekintés" @click="viewRequest(request.id)">
                <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
              </button>
              <button class="action-button" aria-label="Elfogadás" @click="acceptRequest(request.id)">
                <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Elutasítás" @click="refuseRequest(request.id)">
                <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon">
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'Felhasználók'" class="mobile-table">
          <div
            v-for="(user, index) in users"
            :key="`mobile-${index}`"
            class="mobile-card"
            :class="{
              'even-card': index % 2 !== 0,
              'odd-card': index % 2 === 0
            }"
          >
            <div class="mobile-card-info">
              <div class="mobile-field">
                <span class="mobile-label">Név:</span>
                <span class="mobile-value">{{ user.name }}</span>
              </div>
              <div class="mobile-field">
                <span class="mobile-label">Jogosultság:</span>
                <span class="mobile-value">{{ user.role }}</span>
              </div>
            </div>
            <div class="mobile-actions">
              <button class="action-button" aria-label="Előléptetés">
                <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
              </button>
              <button class="action-button" aria-label="Kitiltás">
                <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'Állatok'" class="mobile-table">
          <div
            v-for="(animal, index) in animals"
            :key="`mobile-${index}`"
            class="mobile-card"
            :class="{
              'even-card': index % 2 !== 0,
              'odd-card': index % 2 === 0
            }"
          >
            <div class="mobile-card-info">
              <div class="mobile-field">
                <span class="mobile-label">Név:</span>
                <span class="mobile-value">{{ animal.name }}</span>
              </div>
              <div class="mobile-field">
                <span class="mobile-label">Állatfaj:</span>
                <span class="mobile-value">{{ animal.species }}</span>
              </div>
            </div>
            <div class="mobile-actions">
              <button class="action-button" aria-label="Elrejtés">
                <img src="../assets/hide.png" alt="Elrejtés" class="action-icon">
              </button>
              <button class="action-button" aria-label="Törlés">
                <img src="../assets/close.png" alt="Törlés" class="action-icon">
              </button>
              <button class="action-button" aria-label="Módosítás">
                <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PawFooter :is-sticky="true"/>

  <div v-if="showRequestDetails" class="request-popup-overlay">
    <div class="request-popup-container">
      <div class="request-popup-content">
        <div class="request-close-button-container">
          <img src="../assets/close-dark.png" alt="Bezárás" class="request-close-icon" @click="closeRequestPopup"/>
        </div>
        
        <div class="request-dog-details">
          <div class="request-image-container">
            <img src="../assets/allatkep.png" alt="Kutya" class="request-dog-image" />
          </div>
          
          <div class="request-details-content">
            <h2 class="request-dog-name">Sztárforsip terijer kiskutyus</h2>
            
            <div class="request-tags-container">
              <div class="request-tag">
                <img src="../assets/home_icon.png" alt="Otthon ikon" class="request-tag-icon" />
                <span>Otthonból</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/dog_icon.png" alt="Kutya ikon" class="request-tag-icon" />
                <span>Kutya</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/location_icon.png" alt="Hely ikon" class="request-tag-icon" />
                <span>Baja</span>
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Tervezett leadás időpontja:</p>
              <p class="request-info-value">2025-04-22</p>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Egyéb információ:</p>
              <div class="request-info-text">
                A híresebb sárga terrier kiskutya nagyon barátságos és játékos természetű. 
                Szereti a gyerekeket és jól kijön más kutyákkal is. Már be van oltva és 
                rendelkezik mikrochippel. Családi körülmények között nevelkedett, szobatiszta 
                és alapvető parancsokat ismer. Ideális egy aktív családnak, ahol sok figyelmet 
                és szeretetet kap.
                A híresebb sárga terrier kiskutya nagyon barátságos és játékos természetű. 
                Szereti a gyerekeket és jól kijön más kutyákkal is. Már be van oltva és 
                rendelkezik mikrochippel. Családi körülmények között nevelkedett, szobatiszta 
                és alapvető parancsokat ismer. Ideális egy aktív családnak, ahol sok figyelmet 
                és szeretetet kap.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.search-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-input {
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
}

.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.admin-table th {
  padding: 16px;
  font-weight: 600;
  font-size: 1.1rem;
  white-space: nowrap;
}

.admin-table td {
  padding: 14px 16px;
  vertical-align: middle;
  font-size: 1rem;
}

.column-name {
  width: 35%;
  text-align: left;
}

.column-middle {
  width: 35%;
  text-align: center;
}

.column-actions {
  width: 30%;
}

.header-row {
  background-color: #FDBA74;
}

.header-row th.column-name {
  text-align: left;
  padding-left: 24px;
}

.header-row th.column-middle {
  text-align: center;
}

.header-row th.column-actions {
  text-align: right;
  padding-right: 24px;
}

.odd-row {
  background-color: #FED7AA;
}

.even-row {
  background-color: #FDBA74;
}

.actions-container {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-button {
  width: 40px;
  height: 40px;
  background-color: #E85B44;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.action-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}


.mobile-table {
  display: none;
  width: 100%;
}

.mobile-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.mobile-card-info {
  padding: 16px;
}

.mobile-field {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}

.mobile-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.mobile-value {
  font-size: 1rem;
  margin-top: 2px;
}

.mobile-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  background-color: rgba(0, 0, 0, 0.03);
}

.odd-card {
  background-color: #FED7AA;
}

.even-card {
  background-color: #FDBA74;
}

.request-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

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

.request-tag-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

.request-info-section {
  margin-bottom: 1rem;
}

.request-info-label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.request-info-value {
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

.request-info-text {
  background-color: #FDBA74;
  padding: 0.5rem;
  border-radius: 8px;
  max-height: 200px;
  line-height: 1.5;
  overflow-y: auto;
}

.request-action-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
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
  .admin-container {
    padding: 12px;
  }
  
  .search-input {
    width: 70%; 
  }
  
  .admin-table {
    display: none;
  }
  
  .mobile-table {
    display: block;
  }
  
  .request-tags-container {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .request-dog-image {
    margin-top: 1rem;
  }
  
}

@media (max-width: 480px) {
  .mobile-actions {
    gap: 6px;
  }
  
  .action-button {
    width: 36px;
    height: 36px;
  }
  
  .action-icon {
    width: 22px;
    height: 22px;
  }
  
  .search-input {
    width: 90%; 
  }
}
</style>