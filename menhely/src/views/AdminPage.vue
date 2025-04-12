<script setup lang="ts">
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import PawFooter from '@/components/PawFooter.vue';

const activeTab = ref('Kérések');
const search = ref('');

const requests = [
  { name: 'zikizoki121', type: 'Örökbefogadás' },
  { name: 'zikizoki121', type: 'Leadás' },
  { name: 'zikizoki121', type: 'Látogatás' },
  { name: 'zikizoki121', type: 'Önkéntes munka' },
  { name: 'zikizoki121', type: 'Örökbefogadás' },
  { name: 'zikizoki121', type: 'Leadás' },
];

const users = [
  { name: 'user1', role: 'Felhasználó' },
  { name: 'user2', role: 'Admin' },
  { name: 'user3', role: 'Moderátor' },
  { name: 'user4', role: 'Tiltott' },
  { name: 'user5', role: 'Felhasználó' },
];

const animals = [
  { name: 'Bodri', species: 'Kutya' },
  { name: 'Cirmi', species: 'Macska' },
  { name: 'Rex', species: 'Kutya' },
  { name: 'Morzsi', species: 'Kutya' },
  { name: 'Foltos', species: 'Macska' },
];
</script>

<template>
  <div class="admin-container">
    <div class="content-wrapper">
      <div class="navigation-container">
        <div class="navigation-tabs">
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'Felhasználók'}"
            @click="activeTab = 'Felhasználók'"
          >
            Felhasználók
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'Kérések'}"
            @click="activeTab = 'Kérések'"
          >
            Kérések
          </button>
          <button 
            class="nav-tab" 
            :class="{ active: activeTab === 'Állatok'}"
            @click="activeTab = 'Állatok'"
          >
            Állatok
          </button>
        </div>
      </div>

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
                  <button class="action-button" aria-label="Megtekintés">
                    <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Elfogadás">
                    <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
                  </button>
                  <button class="action-button" aria-label="Elutasítás">
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

        <!-- Mobile view tables -->
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
              <button class="action-button" aria-label="Megtekintés">
                <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
              </button>
              <button class="action-button" aria-label="Elfogadás">
                <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
              </button>
              <button class="action-button" aria-label="Elutasítás">
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

.navigation-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.navigation-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid #FED7AA;
  flex-wrap: wrap;
}

.nav-tab {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 1.1rem;
  position: relative;
  background: transparent;
  border: none;
  transition: all 0.2s ease-in-out;
  margin: 0 4px;
}

.nav-tab:hover {
  font-weight: 600;
}

.nav-tab::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 3px;
  background-color: #E85B44;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease-in-out;
}

.nav-tab:hover::after {
  transform: scaleX(0.8);
}

.nav-tab.active {
  font-weight: 700;
  background-color: #FED7AA;
  border-radius: 8px 8px 0 0;
}

.nav-tab.active::after {
  content: '';
  transform: scaleX(1);
  height: 4px;
  background-color: #E85B44;
}

.search-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-input {
  width: 100%;
  max-width: 100%;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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


@media (max-width: 768px) {
  .admin-container {
    padding: 12px;
  }
  
  .navigation-tabs {
    width: 100%;
  }
  
  .nav-tab {
    padding: 10px 16px;
    font-size: 1rem;
    flex: 1;
    text-align: center;
  }
  
  .admin-table {
    display: none;
  }
  
  .mobile-table {
    display: block;
  }
}

@media (max-width: 480px) {
  .navigation-tabs {
    gap: 4px;
  }
  
  .nav-tab {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  
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
}
</style>