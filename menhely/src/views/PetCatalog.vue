<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide, reactive } from 'vue';
import Allatcard from '@/components/Allatcard.vue';
import Filter from '@/components/Filter.vue';
import CustomInput from '@/components/CustomInput.vue';
import PawFooter from '@/components/PawFooter.vue';
import { ApiService } from '../service/api.service';

const api = new ApiService()

const animals = ref([]);
const filtered_animals = ref([]);

onMounted(() => {
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';

  api.getAllAnimalsRaw().then((res) => {
    console.log(res.data.animals)
    animals.value = res.data.animals;
    if (search.value == '') {
      filtered_animals.value = animals.value;
    }
  })
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
  { id: 1, label: 'Hím', checked: false },
  { id: 2, label: 'Nőstény', checked: false },
]);

const tulajdonsagOptions = ref([
  { id: 1, label: 'Chippeltetve', checked: false },
  { id: 2, label: 'Útlevél', checked: false },
  { id: 3, label: 'Ivartalanított', checked: false },
]);

const jellemvonasOptions = ref([
  { id: 1, label: 'Játékos', checked: false },
  { id: 2, label: 'Ragaszkodó', checked: false },
  { id: 3, label: 'Okos', checked: false },
  { id: 4, label: 'Független', checked: false },
  { id: 5, label: 'Barátságos', checked: false },
  { id: 6, label: 'Félénk', checked: false },
  { id: 7, label: 'Védelmező', checked: false },
  { id: 8, label: 'Nyugodt', checked: false },
  { id: 9, label: 'Hangos', checked: false }
]);

const updateFajOptions = (newOptions) => {
  fajOptions.value = newOptions;
  lookUp()
};

const updateNemOptions = (newOptions) => {
  nemOptions.value = newOptions;
  lookUp()
};

const updateTulajdonsagOptions = (newOptions) => {
  tulajdonsagOptions.value = newOptions;
  lookUp()
};

const updateJellemvonasOptions = (newOptions) => {
  jellemvonasOptions.value = newOptions;
  lookUp()
};

function lookUp() {
  // Név alapú szűrés
  if (search.value != "") {
    let temp_animal = [];

    animals.value.forEach(element => {
      if (element.name.toLowerCase().includes(search.value.toLowerCase())) {
        temp_animal.push(element);
      }
    });
    filtered_animals.value = temp_animal;
  }
  else{
    filtered_animals.value = animals.value;
  }
  // Faj alapú szűrés
  const typeFilter = fajOptions.value.find(x => x.checked);
  if (typeFilter != undefined) {
    filtered_animals.value = filtered_animals.value.filter(x => x.type == (typeFilter.label == "Macska" ? 'cat' : 'dog'));
  }
  // Nem alapú szűrés
  const genderFilter = nemOptions.value.find(x => x.checked);
  if (genderFilter != undefined) {
    filtered_animals.value = filtered_animals.value.filter(x => x.gender == (genderFilter.label == "Nőstény" ? 'female' : 'male'));
  }
  // Tulajdonság alapú szűrés
  const propertyFilter = tulajdonsagOptions.value;
  for (let index = 0; index < propertyFilter.length; index++) {
    if (propertyFilter[index].checked){
      switch (index) {
      case 0:
        filtered_animals.value = filtered_animals.value.filter(x => x.details.chipped);
        break; 
      case 1:
      filtered_animals.value = filtered_animals.value.filter(x => x.details.passported);
        break; 
      case 2:
      filtered_animals.value = filtered_animals.value.filter(x => x.details.neutered);
        break;
      default:
        break;  
        }
    }
  }
  // Jellemvonás alapú szűrés
  const personalityFilter = jellemvonasOptions.value;
  for (let index = 0; index < personalityFilter.filter(x => x.checked).length; index++) {
    filtered_animals.value = filtered_animals.value.filter(x => x.details.characteristics.includes(personalityFilter.filter(x => x.checked)[index].label));
  }

}
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
        <CustomInput v-model="search" search class="search-input" @input="lookUp()" />
      </div>
    </div>
    
    <div id="allatkartyak">
      <Allatcard v-for="animal in filtered_animals"
      :animal="animal"
       />
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