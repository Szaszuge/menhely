<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide, reactive } from 'vue';
import Allatcard from '@/components/Allatcard.vue';
import Filter from '@/components/Filter.vue';
import CustomInput from '@/components/CustomInput.vue';
import PawFooter from '@/components/PawFooter.vue';

onMounted(() => {
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
});

onUnmounted(() => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  document.body.style.position = '';
});

const activeDropdown = ref<string | null>(null);
const setActiveDropdown = (id: string | null) => {
  activeDropdown.value = id;
};
provide('activeDropdown', activeDropdown);
provide('setActiveDropdown', setActiveDropdown);

const search = ref('');

const fajOptions = ref([
  { id: 1, label: 'Kutya', checked: false },
  { id: 2, label: 'Macska', checked: false },
]);

const nemOptions = ref([
  { id: 1, label: 'Kan', checked: false },
  { id: 2, label: 'Szuka', checked: false },
]);

const tulajdonsagOptions = ref([
  { id: 1, label: 'Chippeltetve', checked: false },
  { id: 2, label: 'Útlevél', checked: false },
  { id: 3, label: 'Oltás', checked: false },
  { id: 4, label: 'Ivartalanított', checked: false },
  { id: 5, label: 'Beteg', checked: false },
]);

const jellemvonasOptions = ref([
  { id: 1, label: 'Barátságos', checked: false },
  { id: 2, label: 'Játékos', checked: false },
  { id: 3, label: 'Félénk', checked: false },
  { id: 4, label: 'Független', checked: false },
  { id: 5, label: 'Bújós', checked: false },
]);

const updateFajOptions = (newOptions) => {
  fajOptions.value = newOptions;
};

const updateNemOptions = (newOptions) => {
  nemOptions.value = newOptions;
};

const updateTulajdonsagOptions = (newOptions) => {
  tulajdonsagOptions.value = newOptions;
};

const updateJellemvonasOptions = (newOptions) => {
  jellemvonasOptions.value = newOptions;
};
</script>

<template>
  <div class="pet-catalog">
    <div class="filter-bar-container">
      <div class="filter-bar">
        <Filter
          id="fajtaja"
          label="Fajtája"
          primary
          :options="fajOptions"
          @update:options="updateFajOptions"
          singleSelect
        />
        <Filter
          id="neme"
          label="Neme"
          :options="nemOptions"
          @update:options="updateNemOptions"
          singleSelect
        />
        <Filter
          id="tulajdonsagok"
          label="Tulajdonságok"
          :options="tulajdonsagOptions"
          @update:options="updateTulajdonsagOptions"
        />
        <Filter
          id="jellemvonasok"
          label="Jellemvonások"
          :options="jellemvonasOptions"
          @update:options="updateJellemvonasOptions"
        />
      </div>
    </div>
   
    <div class="search-container">
      <div class="search-wrapper">
        <label class="search-label">Keresés név alapján</label>
        <CustomInput v-model="search" search class="search-input" />
      </div>
    </div>
    
    <div id="allatkartyak">
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
      <allatcard />
    </div>
  </div>
  <PawFooter />
</template>

<style scoped>
.pet-catalog {
  width: 100%;
}
.filter-bar-container {
  width: 100%;
  padding: 12px 24px;
  background-color: #FDBA74;
}
.filter-bar {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
.search-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
}
.search-wrapper {
  width: 50%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.search-label {
  font-size: 1.2rem;
  font-weight: 600;
  align-self: flex-start;
}
.search-input {
  width: 100%;
}
#allatkartyak{
    display: flex;
    flex-flow: row wrap;
    margin-top: 2rem;
    gap: 3rem;
    justify-content: center;
}
p{
    font-size: 1.5rem;
    font-weight: 600;
}
#petcatalog{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 3.5rem;
}
@media (max-width: 900px) {
  .filter-bar {
    gap: 16px;
  }
}
@media (max-width: 768px) {
  .filter-bar {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .filter-bar-container {
    padding: 12px 16px;
  }
  
  .search-wrapper {
    width: 90%;
  }
}
@media (max-width: 640px) {
  .filter-bar {
    gap: 10px;
  }
  
  .filter-bar > * {
    flex-basis: 100%;
    margin-bottom: 8px;
  }
}
</style>