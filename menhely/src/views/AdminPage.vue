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
import { AnimalService } from '../service/animal.service';
import { RequestService } from '../service/request.service'
import refusePopup from '../components/refusePopup.vue';
import AlertPopup from '../components/AlertPopup.vue';
import ActivityPopup from '../components/ActivityPopup.vue';

const activeTab = ref('');
const search = ref('');
const api = new ApiService();
const animSer = new AnimalService();
const reqSer = new RequestService();
const userStore = useUserStore();
const router = useRouter()

const alertPopup = ref(null)

const showRequestDetails = ref([false, '', '']);
const declineRequest = ref(false);
const selectedRequest = ref('');
const temp = ref('');

const showActivityDetails = ref([false, '', '']);

const activities = ref([]);

const filtered_activities = ref([]);

onMounted(() => {
  refresh();
});

function nagybetu(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function refresh() {
  await reqSer.getAllRequests().then((res) => {
    requests.value = res.data.requests;
  });
  await reqSer.getAllRequestsRaw().then((res) => {
    raw_requests.value = res.data.requests;
  });
  await api.getAllUsers().then((res) => {
    users.value = res.data.users;
  });
  await api.getAllAnimals().then((res) => {
    animals.value = res.data.animals;
  });
  await api.getAllActivities().then((res) => {
    activities.value = res.data.activities;
    activities.value.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
});
  })

  if (search.value == ""){
    filtered_requests.value = requests.value;
    filtered_users.value = users.value;
    filtered_animals.value = animals.value;
    filtered_activities.value = activities.value;
  }

  temp.value = activeTab.value;
  activeTab.value = '';
  activeTab.value = temp.value;
}

// Kérések
// TODO: Mivel a nezet az ugyan az, mint a sima csak tobb, ezert egyesiteni kell
const requests = ref([]);
const raw_requests = ref([]);
const filtered_requests = ref([]);

async function viewRequest(id:string, type:string) {
  showRequestDetails.value[1] = requests.value.find(x => x.id == id);
  showRequestDetails.value[0] = true; 
  showRequestDetails.value[2] = type;
}
function closeRequestPopup() {
  showRequestDetails.value[0] = false;
}
function closeRefusePopup() {
  declineRequest.value = false;
}
function closeActivityPopup() {
  showActivityDetails.value[0] = false;
}

async function acceptRequest(id:string, email:string, name:string) {
  let mailData = ref({});
  let current_request = undefined;
  await reqSer.RequestByID(id).then((res) => {
    current_request = res.data.request;
  })
  console.log(current_request);
  if (current_request == null) {
    return console.log("Bad request.");
  }
  switch (current_request.Type){
    case "Leadás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Állat leadás | elfogadva",
        content: {
          userName: name,
          year: current_request.details.year,
          month: current_request.details.month,
          day: current_request.details.day,
          animalname: (current_request.details.name == null ? '' :  current_request.details.name),
        },
        template: "request/AnimalAccept"
      }
      break;
    case "Önkéntes munka":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Önkéntes munka | elfogadva",
        content: {
          userName: name,
          year: current_request.details.date.year,
          month: current_request.details.date.month,
          day: current_request.details.date.day,
          from: current_request.details.fromTo[0],  
          to: current_request.details.fromTo[1]
        },
        template: "request/VoluntaryJobAccepted"
      }
      break;
    case "Látogatás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Látogatás | elfogadva",
        content: {
          userName: name,
          date: current_request.details.date,
          time: current_request.details.time,  
        },
        template: "request/MeglatogatasAccept"
      }
      break;
    case "Örökbefogadás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Örökbefogadás | elutasítva",
        content: {
          userName: name,
          date: current_request.details.date,
          time: current_request.details.time,
        },
        template: "request/OrokbefogadasAccept"
      }
      break;
    default:
      return console.log("TBA");
  }
  await reqSer.acceptRequest(id, mailData.value).then((res) => {
    alertPopup.value.addAlert(res.data.message == 'Sikeres törlés' ? "Sikeresen elfogadva!" : "Valami történt", res.data.message == 'Sikeres törlés' ? 'success' : 'error')
    
  });
  refresh();
}

async function showRequestDecline(id:string) {
  showRequestDetails.value[1] = requests.value.find(x => x.id == id);
  declineRequest.value = true;
  console.log(showRequestDetails.value[1])
}

async function refuseRequest(id:string, email:string, name:string, reason:string) {
  let mailData = ref({});
  let current_request = undefined;
  await reqSer.RequestByID(id).then((res) => {
    current_request = res.data.request;
  })
  console.log(current_request);
  if (current_request == null) {
    return console.log("Bad request.");
  }
  switch (current_request.Type){
    case "Leadás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Állat leadás | elutasítva",
        content: {
          userName: name,
          reason: reason,
        },
        template: "request/AnimalDecline"
      }
      break;
    case "Önkéntes munka":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Önkéntes munka | elutasítva",
        content: {
          userName: name,
          reason: reason,
        },
        template: "request/VoluntaryJobRejected"
      }
      break;
    case "Látogatás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Látogatás | elutasítva",
        content: {
          userName: name,
          reason: reason,
        },
        template: "request/MeglatogatasDecline"
      }
      break;
    case "Örökbefogadás":
      mailData.value = {
        to: email,
        subject: "GazdiRadar | Örökbefogadás | elutasítva",
        content: {
          userName: name,
          reason: reason,
        },
        template: "request/OrokbefogadasDecline"
      }
      break;
    default:
      return console.log("TBA");
  }
  await reqSer.refuseRequest(id, mailData.value).then((res) => {
    alertPopup.value.addAlert(res.data.message == 'Sikeres törlés' ? "Sikeresen törölve!" : "Valami történt", res.data.message == 'Sikeres törlés' ? 'success' : 'error')
  });
  declineRequest.value = false;
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
    let temp_activity = [];

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
    activities.value.forEach(element => {
      if (element.name.toLowerCase().includes(search.value.toLowerCase())) {
        temp_activity.push(element);
      }
    });
    filtered_requests.value = temp_request;
    filtered_users.value = temp_user;
    filtered_animals.value = temp_animal;
    filtered_activities.value = temp_activity;
  }
  else{
    filtered_requests.value = requests.value;
    filtered_users.value = users.value;
    filtered_animals.value = animals.value;
    filtered_activities.value = activities.value;
  }
} 

async function toggleAnimalPublicity(id:string) {
  await animSer.togglePublicStatus(id);
  refresh();
}

async function deleteAnimal(id:string) {
  await animSer.deleteAnimalByID(id);
  refresh();
}

function moveToPetEditor(ID:string) {
  router.push(`/peteditor/${ID}`);
}

// Állatok vége
// Aktivitások

async function viewActivity(id, type){
  showActivityDetails.value[0] = true;
  showActivityDetails.value[1] = filtered_activities.value.find(x => x.id == id);
  showActivityDetails.value[2] = type;
  console.log(id);
}
async function deleteActivity(id){
  console.log(id);

  // Kell ez egyáltalán?
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
                  <button class="action-button" aria-label="Elfogadás" @click="acceptRequest(request.id, request.targetEmail, request.name)">
                    <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Elutasítás" @click="showRequestDecline(request.id)">
                    <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon">
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
                  <button class="action-button" aria-label="Előléptetés" @click="PromoteUser(user.id)" v-if="user.role != 'admin' && user.role != 'moderator'">
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
              <td class="column-middle">{{ animal.species == 'dog' ? "Kutya" : "Macska" }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <button class="action-button" aria-label="Publikálás" @click="toggleAnimalPublicity(animal.id)" v-if="animal.isPublicable && !animal.isPublic">
                    <img src="../assets/view.png" alt="Publikálás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Publikálás" @click="toggleAnimalPublicity(animal.id)" v-else-if="animal.isPublic">
                    <img src="../assets/hide.png" alt="Publikálás" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Publikálás" v-else disabled>
                    <img src="../assets/view.png" alt="Publikálás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Törlés" @click="deleteAnimal(animal.id)">
                    <img src="../assets/close.png" alt="Törlés" class="action-icon">
                  </button>
                  <button class="disabled-action-button" aria-label="Módosítás" v-if="animal.isPublic" disabled>
                    <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Módosítás" @click="moveToPetEditor(animal.id)" v-else>
                    <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="activeTab === 'Aktivitások'" class="admin-table">
          <thead>
            <tr class="header-row">
              <th class="column-name">Név</th>
              <th class="column-middle">Típus</th>
              <th class="column-actions">Mikor</th>
              <th class="column-actions">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(activity, index) in activities" 
              :key="index" 
              :class="{ 
                'even-row': index % 2 !== 0, 
                'odd-row': index % 2 === 0,
                'last-row': index === activities.length - 1 
              }"
            >
              <td class="column-name">{{ activity.name }}</td>
              <td class="column-middle">{{ activity.type }}</td>
              <td class="column-end">{{ activity.date.split('T')[0] }}</td>
              <td class="column-actions">
                <div class="actions-container">
                  <button class="action-button" aria-label="Megtekintés" @click="viewActivity(activity.id, activity.type)">
                    <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Törlés" @click="deleteActivity(activity.id)">
                    <img src="../assets/close.png" alt="Törlés" class="action-icon">
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Fix for mobile view as well -->
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
              <button class="action-button" aria-label="Elfogadás" @click="acceptRequest(request.id, request.targetEmail, request.name)">
                <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Elutasítás" @click="showRequestDecline(request.id)">
                <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon">
              </button>
            </div>
          </div>
        </div>
        
        <!-- Fix for mobile Felhasználók view -->
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
        
        <!-- Fix for mobile Állatok view -->
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
                <span class="mobile-value">{{ animal.species == 'dog' ? "Kutya" : "Macska" }}</span>
              </div>
            </div>
            <div class="mobile-actions">
              <button class="action-button" aria-label="Publikálás" @click="toggleAnimalPublicity(animal.id)" v-if="animal.isPublicable && !animal.isPublic">
                <img src="../assets/view.png" alt="Publikálás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Publikálás" @click="toggleAnimalPublicity(animal.id)" v-else-if="animal.isPublic">
                <img src="../assets/hide.png" alt="Publikálás" class="action-icon">
              </button>
              <button class="disabled-action-button" aria-label="Publikálás" v-else disabled>
                <img src="../assets/view.png" alt="Publikálás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Törlés" @click="deleteAnimal(animal.id)">
                <img src="../assets/close.png" alt="Törlés" class="action-icon">
              </button>
              <button class="disabled-action-button" aria-label="Módosítás" v-if="animal.isPublic" disabled>
                <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Módosítás" @click="moveToPetEditor(animal.id)" v-else>
                <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
              </button>
            </div>
          </div>
        </div>
        
        <!-- Fix for mobile Aktivitások view -->
        <div v-if="activeTab === 'Aktivitások'" class="mobile-table">
          <div
            v-for="(activity, index) in activities"
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
                <span class="mobile-value">{{ activity.name }}</span>
              </div>
              <div class="mobile-field">
                <span class="mobile-label">Típus:</span>
                <span class="mobile-value">{{ activity.type }}</span>
              </div>
            </div>
            <div class="mobile-actions">
              TBA
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <PawFooter :is-sticky="true"/>

  <div v-if="showRequestDetails[0]" class="request-popup-overlay">
    <RequestPopup @close-popup="closeRequestPopup" :current-request="showRequestDetails[1]" :request-type="showRequestDetails[2]" />
  </div>
  <div v-if="declineRequest" class="request-popup-overlay">
    <refusePopup @close="closeRefusePopup" :current-request="selectedRequest" @send="refuseRequest"/>
  </div>
  <div v-if="showActivityDetails[0]" class="request-popup-overlay">
    <ActivityPopup @close-popup="closeActivityPopup" :current-activity="showActivityDetails[1]" :activity-type="showActivityDetails[2]"/>
  </div>
  <AlertPopup ref="alertPopup" />
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

.column-end {
  width: 20%;
  text-align: end;
}

.header-row {
  background-color: #FDBA74;
}

#activitytoright {
  text-align: right;
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