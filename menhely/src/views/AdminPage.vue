<script>
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  components: {
    CustomInput,
    Button
  },
  setup() {
    const activeTab = ref('Kérések');
    const search = ref('');
    
    // Sample data for requests
    const requests = [
      { name: 'zikizoki121', type: 'Örökbefogadás' },
      { name: 'zikizoki121', type: 'Leadás' },
      { name: 'zikizoki121', type: 'Látogatás' },
      { name: 'zikizoki121', type: 'Önkéntes munka' },
      { name: 'zikizoki121', type: 'Örökbefogadás' },
      { name: 'zikizoki121', type: 'Leadás' },
    ];

    // Sample data for users
    const users = [
      { name: 'user1', role: 'Felhasználó' },
      { name: 'user2', role: 'Admin' },
      { name: 'user3', role: 'Moderátor' },
      { name: 'user4', role: 'Tiltott' },
      { name: 'user5', role: 'Felhasználó' },
    ];

    // Sample data for animals
    const animals = [
      { name: 'Bodri', species: 'kutya' },
      { name: 'Cirmi', species: 'macska' },
      { name: 'Rex', species: 'kutya' },
      { name: 'Morzsi', species: 'kutya' },
      { name: 'Foltos', species: 'macska' },
    ];
    
    return {
      activeTab,
      search,
      requests,
      users,
      animals
    };
  }
}
</script>

<template>
  <div class="admin-container">
    <div class="navigation-container">
      <div class="navigation-tabs">
        <div 
          class="nav-tab" 
          :class="{ active: activeTab === 'Felhasználók' }"
          @click="activeTab = 'Felhasználók'"
        >
          Felhasználók
        </div>
        <div 
          class="nav-tab" 
          :class="{ active: activeTab === 'Kérések' }"
          @click="activeTab = 'Kérések'"
        >
          Kérések
        </div>
        <div 
          class="nav-tab" 
          :class="{ active: activeTab === 'Állatok' }"
          @click="activeTab = 'Állatok'"
        >
          Állatok
        </div>
      </div>
    </div>

    <div class="search-container">
      <CustomInput v-model="search" search />
    </div>

    <div class="table-container">
      <!-- Requests Table -->
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
                <div class="action-button">
                  <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
                </div>
                <div class="action-button">
                  <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
                </div>
                <div class="action-button">
                  <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Users Table -->
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
              <div class="actions-container actions-container-2">
                <div class="action-button">
                  <img src="../assets/user_promote.png" alt="Előléptetés" class="action-icon">
                </div>
                <div class="action-button">
                  <img src="../assets/ban_user.png" alt="Kitiltás" class="action-icon">
                </div>
                <div class="action-button invisible"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Animals Table -->
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
                <div class="action-button">
                  <img src="../assets/hide.png" alt="Elrejtés" class="action-icon">
                </div>
                <div class="action-button">
                  <img src="../assets/close.png" alt="Törlés" class="action-icon">
                </div>
                <div class="action-button">
                  <img src="../assets/modify.png" alt="Módosítás" class="action-icon">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 20px;
}

.navigation-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.navigation-tabs {
  display: flex;
  justify-content: space-between;
  width: 70%;
  border-bottom: 2px solid #FED7AA;
}

.nav-tab {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  transition: font-weight 0.3s ease-in-out;
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
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
}

.nav-tab:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-tab.active {
  font-weight: 700;
  background-color: #FED7AA;
  border-radius: 20px 20px 0 0;
}

.nav-tab.active::after {
  content: '';
  transform: scaleX(1);
  height: 4px;
  background-color: #E85B44;
}

.search-container {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.table-container {
  overflow-x: auto;
  padding: 0 15px; /* Add padding to the table container */
}

.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;
}

.admin-table th {
  padding: 16px 20px;
  font-weight: bold;
  font-size: 1.2rem;
}

.admin-table td {
  padding: 12px 15px;
  vertical-align: middle;
  font-size: 1.1rem;
}

.column-name {
  width: 30%;
  text-align: left;
  padding-left: 20px; /* Consistent padding for name column */
}

.column-middle {
  width: 30%;
  text-align: center;
}


.header-row {
  background-color: #FDBA74;
}

.header-row th.column-name {
  text-align: left;
  padding-left: 40px; 
}

.header-row th.column-middle {
  text-align: center;
}

.header-row th.column-actions {
  text-align: right;
  padding-right: 40px; /* Increased padding for better spacing */
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
  gap: 10px;
  min-width: 170px;
  padding-right: 20px; /* Increased padding to move buttons away from edge */
}

.actions-container-2 {
  justify-content: flex-end;
}

.action-button {
  width: 48px;
  height: 48px;
  background-color: #E85B44;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.invisible {
  visibility: hidden;
}

.action-icon {
  width: 39px;
  height: 39px;
  object-fit: contain;
}

/* Add padding to first and last cells in each row for better spacing */
.admin-table tr td:first-child {
  padding-left: 25px;
}

.admin-table tr td:last-child {
  padding-right: 25px;
}
</style>