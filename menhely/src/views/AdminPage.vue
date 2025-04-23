<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import PawFooter from '@/components/PawFooter.vue';
import AdminNav from '@/components/AdminNav.vue';
import { ApiService } from "../service/api.service";
import { useUserStore } from '../stores/user';
import RequestPopup from '../components/RequestPopup.vue';
import { useRouter } from 'vue-router';

const activeTab = ref('');
const search = ref('');
const api = new ApiService();
const userStore = useUserStore();
const router = useRouter()

const showRequestDetails = ref([false, '']);
const selectedRequest = ref('');
const temp = ref('');
const reasonGiven = ref('');

onMounted(() => {
  refresh();
});

function nagybetu(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function refresh() {
  await api.getAllRequests().then((res) => {
    requests.value = res.data.requests;
  });
  await api.getAllRequestsRaw().then((res) => {
    raw_requests.value = res.data.requests;
  });
  await api.getAllUsers().then((res) => {
    users.value = res.data.users;
  });
  await api.getAllAnimals().then((res) => {
    animals.value = res.data.animals;
  });
  if (search.value == ""){
    filtered_requests.value = requests.value;
    filtered_users.value = users.value;
    filtered_animals.value = animals.value;
  }

  temp.value = activeTab.value;
  activeTab.value = '';
  activeTab.value = temp.value;

}

// Kérések
const requests = ref([]);
const raw_requests = ref([]);
const filtered_requests = ref([]);

async function viewRequest(id:string, type:string) {
  selectedRequest.value = raw_requests.value.find(x => x.id == id);
  showRequestDetails.value[0] = true; 
  showRequestDetails.value[1] = type;
}
function closeRequestPopup() {
  showRequestDetails.value[0] = false;
}

async function acceptRequest(id:string) {
  let  mailData = ref({});
  let current_request = undefined;
  await api.RequestByID(id).then((res) => {
    current_request = res.data.request;
  })
  console.log(current_request);
  if (current_request == null) {
    return console.log("Bad request.");
  }
  switch (current_request.Type){
    case "Leadás":
      mailData.value = {
        to: userStore.loggedUser().email,
        subject: "GazdiRadar | Állat leadás elfogadva",
        content: {
          userName: userStore.loggedUser().name,
          year: current_request.details.year,
          month: current_request.details.month,
          day: current_request.details.day,
          animalname: (current_request.details.name == null ? '' :  current_request.details.name),
        },
        template: "request/AnimalAccept"
      }
      break;
    default:
      return console.log("TBA");
  }
  await api.acceptRequest(id, mailData.value);
  refresh();
}
async function refuseRequest(id:string) {
  let  mailData = ref({});
  let current_request = undefined;
  await api.RequestByID(id).then((res) => {
    current_request = res.data.request;
  })
  console.log(current_request);
  if (current_request == null) {
    return console.log("Bad request.");
  }
  switch (current_request.Type){
    case "Leadás":
      mailData.value = {
        to: userStore.loggedUser().email,
        subject: "GazdiRadar | Állat leadás elutasítva",
        content: {
          userName: userStore.loggedUser().name,
          reason: reasonGiven.value,
        },
        template: "request/AnimalDecline"
      }
      break;
    default:
      return console.log("TBA");
  }
  await api.refuseRequest(id, mailData.value);
  refresh();
}


// Kérések vége
// Felhaszálók

let users = ref([]);
let filtered_users = ref([]);

async function PromoteUser(id:string) {
  await api.PromoteUser(id);
  refresh();
  
}

async function DemoteUser(id:string) {
  await api.DemoteUser(id);
  refresh();
}

// Felhaszálók vége
// Állatok

let animals = ref([]);
let filtered_animals = ref([]);

// Állatok vége
function lookUp() {
  if (search.value != "") {
    let temp_request = [];
    let temp_user = [];
    let temp_animal = [];

    animals.value.forEach(element => {
      if (element.name.toLowerCase().includes(search.value.toLowerCase())) {
        temp_animal.push(element);
      }
    });
    users.value.forEach(element => {
      if (element.name.toLowerCase().includes(search.value.toLowerCase())) {
        temp_user.push(element);
      }
    });
    requests.value.forEach(element => {
      if (element.name.toLowerCase().includes(search.value.toLowerCase())) {
        temp_request.push(element);
      }
    });
    filtered_requests.value = temp_request;
    filtered_users.value = temp_user;
    filtered_animals.value = temp_animal;
  }
  else{
    filtered_requests.value = requests.value;
    filtered_users.value = users.value;
    filtered_animals.value = animals.value;
  }
} 

function moveToPetEditor(ID:string) {
  router.push(`/peteditor/${ID}`);
}
</script>

<template>
  <div class="admin-container">
    <div class="content-wrapper">
      <AdminNav v-model:activeTab="activeTab" />

      <div class="search-container">
        <CustomInput v-model="search" search class="search-input" @input="lookUp()"/>
      </div>

      <div class="table-container">
        <!-- Kérések tábla-->
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
              v-for="(request, index) in filtered_requests" 
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
                  <button class="action-button" aria-label="Megtekintés" @click="viewRequest(request.id, request.type)">
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
        <!-- Felhasználók tábla-->
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
              v-for="(user, index) in filtered_users" 
              :key="index" 
              :class="{ 
                'even-row': index % 2 !== 0, 
                'odd-row': index % 2 === 0,
                'last-row': index === users.length - 1 
              }"
            >
              <td class="column-name">{{ userStore.loggedUser().id == user.id ? '🜲 ' : '' }}{{ user.name }}</td>
              <td class="column-middle">{{ user.role == "recovering" ? "User" : nagybetu(user.role) }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <!-- 
                  Feltételek, hogy mi mikor jelenjen meg.
                  Esetleg késöbb v-binding-al meg lehet oldani hogy jobb legyen.
                   -->
                  <button class="action-button"  aria-label="Előléptetés" @click="PromoteUser(user.id)" v-if="user.role != 'admin' && user.role != 'moderator'">
                    <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Előléptetés" disabled v-else>
                    <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Lefokozás" @click="DemoteUser(user.id)" v-if="(user.role == 'moderator' || user.role == 'admin') && userStore.loggedUser().name != user.name">
                    <img src="../assets/user_demote.png" alt="Lefokozás" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Lefokozás" disabled v-else>
                    <img src="../assets/user_demote.png" alt="Lefokozás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Kitiltás" @click="DemoteUser(user.id)" v-if="user.role != 'admin' && user.role != 'moderator' && user.role != 'banned'">
                    <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Kitiltás" disabled v-else>
                    <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Állatok tábla-->
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
              v-for="(animal, index) in filtered_animals" 
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
                  <button class="action-button" aria-label="Módosítás" @click="moveToPetEditor(animal.id)">
                    <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Kérés -->
        <div v-if="activeTab === 'Kérések'" class="mobile-table">
          <div
            v-for="(request, index) in filtered_requests"
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
              <button class="action-button" aria-label="Megtekintés" @click="viewRequest(request.id, request.type)">
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
        <!-- Felhasználó -->
        <div v-if="activeTab === 'Felhasználók'" class="mobile-table">
          <div
            v-for="(user, index) in filtered_users"
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
              


              <button class="action-button"  aria-label="Előléptetés" @click="PromoteUser(user.id)" v-if="user.role != 'admin' && user.role != 'moderator'">
                    <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Előléptetés" disabled v-else>
                    <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Lefokozás" @click="DemoteUser(user.id)" v-if="(user.role == 'moderator' || user.role == 'admin') && userStore.loggedUser().name != user.name">
                    <img src="../assets/user_demote.png" alt="Lefokozás" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Lefokozás" disabled v-else>
                    <img src="../assets/user_demote.png" alt="Lefokozás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Kitiltás" @click="DemoteUser(user.id)" v-if="user.role != 'admin' && user.role != 'moderator' && user.role != 'banned'">
                    <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Kitiltás" disabled v-else>
                    <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                  </button>
              


            </div>
          </div>
        </div>
        <!-- Állat -->
        <div v-if="activeTab === 'Állatok'" class="mobile-table">
          <div
            v-for="(animal, index) in filtered_animals"
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

  <div v-if="showRequestDetails[0]" class="request-popup-overlay">
    <RequestPopup @close-popup="closeRequestPopup" :request-type="showRequestDetails[1]" :current-request="selectedRequest" />
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

.disabled-action-button {
  width: 40px;
  height: 40px;
  background-color: var(--button-disabled);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-button:hover, .disabled-action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.action-button:active, .disabled-action-button:active {
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


.request-action-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 8px;
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