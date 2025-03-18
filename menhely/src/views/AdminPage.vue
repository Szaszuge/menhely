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
    
    const requests = [
      { name: 'zikizoki121', type: 'Örökbefogadás' },
      { name: 'zikizoki121', type: 'Leadás' },
      { name: 'zikizoki121', type: 'Látogatás' },
      { name: 'zikizoki121', type: 'Önkéntes munka' },
      { name: 'zikizoki121', type: 'Örökbefogadás' },
      { name: 'zikizoki121', type: 'Leadás' },
    ];
    
    return {
      activeTab,
      search,
      requests
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
      <table class="admin-table">
        <thead>
          <tr class="header-row">
            <th class="align-left">Név</th>
            <th>Típus</th>
            <th class="align-right">Műveletek</th>
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
            <td class="align-left">{{ request.name }}</td>
            <td>{{ request.type }}</td>
            <td class="actions-cell align-right">
              <div class="action-button">
                <img src="../assets/view.png" alt="Megtekintés" class="action-icon">
              </div>
              <div class="action-button">
                <img src="../assets/check.png" alt="Elfogadás" class="action-icon">
              </div>
              <div class="action-button">
                <img src="../assets/restriction.png" alt="Elutasítás" class="action-icon">
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
}

.admin-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
}

.admin-table th {
  padding: 16px 20px;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
}

.admin-table td {
  padding: 12px 15px;
  text-align: center;
  vertical-align: middle;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.header-row {
  background-color: #FDBA74;

}

.odd-row {
  background-color: #FED7AA;

}

.even-row {
  background-color: #FDBA74;

}

.actions-cell {
  display: flex;
  justify-content: center;
  gap: 10px;
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

.action-icon {
  width: 39px;
  height: 39px;
  object-fit: contain;
}
</style>