<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, provide } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { AnimalService } from '../service/animal.service';
import CustomInput from '../components/CustomInput.vue';
import Button from '../components/Button.vue';
import PawFooter from '../components/PawFooter.vue';

const router = useRouter()
const animSer = new AnimalService();

const personalityOptions = ref([
  { id: 1, label: 'Játékos', selected: false },
  { id: 2, label: 'Ragaszkodó', selected: false },
  { id: 3, label: 'Okos', selected: false },
  { id: 4, label: 'Független', selected: false },
  { id: 5, label: 'Barátságos', selected: false },
  { id: 6, label: 'Félénk', selected: false },
  { id: 7, label: 'Védelmező', selected: false },
  { id: 8, label: 'Nyugodt', selected: false },
  { id: 9, label: 'Hangos', selected: false }
]);

const characteristics = ref([]);

const breedOptions = ref([
  { id: 1, label: 'Kutya', selected: false },
  { id: 2, label: 'Macska', selected: false }
]);

const genderOptions = ref([
  { id: 1, label: 'Kan', selected: false },
  { id: 2, label: 'Szuka', selected: false }
]);

const admissionOptions = ref([
  { id: 1, label: 'Talált', selected: false },
  { id: 2, label: 'Leadott', selected: false }
]);

const id = useRoute().params.id;

const imageURL = ref("");
const admissionDate = ref('');
const details = ref('');

let kep = null;
const file = ref("")

function changeFileName(event) {
   if (event.target.files[0] != null) {
    imageURL.value = `http://localhost:3000/uploads/placeholder/animal.png`
   }
  imageURL.value = URL.createObjectURL(event.target.files[0])
}

function uploadImage(event){
  document.getElementById("image-file-input").click()
}
function imageAdded(event){
  kep = event.target.files[0] ?? null;
}

const name = ref('');
const breed = ref('');
const color = ref('');
const age = ref('');
const gender = ref('');

const paragraphs = ref([]);

const isChipped = ref(false);
const isNeutered = ref(false);
const hasPassport = ref(false);

onMounted(() => {
    document.addEventListener('click', handleClickOutside);

    animSer.GetAnimalDataByID(id).then((res) => {
      console.log(res.data.animal)
      const animal = res.data.animal;

      imageURL.value = `http://localhost:3000/uploads/${!!animal.details.image ? animal.details.image : 'placeholder/animal.png'}`;
      admissionDate.value = animal.arrival; 

      name.value = animal.name;
      breed.value = (animal.details.type == 'dog' ? 'Kutya' : 'Macska');
      color.value = (animal.details.color ?? '');
      age.value = (animal.age ?? '');
      
      details.value = (animal.details.description ?? '');

      if (animal.gender == 'male') {
        genderOptions.value.find(x => x.label === 'Kan').selected = true;
      } else if (animal.gender == 'female') {
        genderOptions.value.find(x => x.label === 'Szuka').selected = true;
      }

      isChipped.value = animal.details.chipped ?? false;
      isNeutered.value = animal.details.neutered ?? false;
      hasPassport.value = animal.details.passported ?? false;

      if (animal.type == "dog"){
        breedOptions.value.find(x => x.label == 'Kutya').selected = true;
      }
      else {
        breedOptions.value.find(x => x.label == 'Macska').selected = true;
      }

      
      if (animal.from == "home"){
        admissionOptions.value.find(x => x.label == 'Leadott').selected = true;
      }
      else {
        admissionOptions.value.find(x => x.label == 'Talált').selected = true;
      }

      if (animal.details.characteristics && Array.isArray(animal.details.characteristics)) {
        animal.details.characteristics.forEach(char => {
          const matchingOption = personalityOptions.value.find(opt => opt.label === char);
          if (matchingOption) {
            matchingOption.selected = true;
            characteristics.value.push({
              id: matchingOption.id,
              label: matchingOption.label,
              selected: true
            });
          }
        });
      }

      animal.details.paragraphs.forEach(paragraph => {
        paragraphs.value.push({id:graphID.value++,title:paragraph.title,description:paragraph.description});
      })

    })
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const graphID = ref(0);
const addParagraph = () => {
  paragraphs.value.push({id:graphID.value++,title:'',description:''});
}
const removeParagraph = (id) => {
  paragraphs.value = paragraphs.value.filter(paragraph => paragraph.id != id)
}
const updateParagraphTitle = (id, value) => {
  paragraphs.value.find(x => x.id == id).title = value;
}
const updateParagraphDescription = (id, value) => {
  paragraphs.value.find(x => x.id == id).description = value;
}

const activeDropdown = ref<string | null>(null);
const setActiveDropdown = (id: string | null) => {
  activeDropdown.value = id;
};

provide('activeDropdown', activeDropdown);
provide('setActiveDropdown', setActiveDropdown);

const breedDropdownRef = ref<HTMLElement | null>(null);
const personalityDropdownRef = ref<HTMLElement | null>(null); 
const admissionDropdownRef = ref<HTMLElement | null>(null);
const genderDropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  
  if (activeDropdown.value === 'breed' && 
      breedDropdownRef.value && 
      !breedDropdownRef.value.contains(target)) {
    setActiveDropdown(null);
  }
  
  if (activeDropdown.value === 'personality' && 
      personalityDropdownRef.value && 
      !personalityDropdownRef.value.contains(target)) {
    setActiveDropdown(null);
  }
  
  if (activeDropdown.value === 'admission' && 
      admissionDropdownRef.value && 
      !admissionDropdownRef.value.contains(target)) {
    setActiveDropdown(null);
  }

  if (activeDropdown.value === 'gender' && 
      genderDropdownRef.value && 
      !genderDropdownRef.value.contains(target)) {
    setActiveDropdown(null);
  }
};

const selectedBreed = computed(() => {
  const selected = breedOptions.value.find(item => item.selected);
  return selected ? selected.label : '';
});

const selectedGender = computed(() => {
  const selected = genderOptions.value.find(item => item.selected);
  return selected ? selected.label : '';
});

const selectedAdmission = computed(() => {
  const selected = admissionOptions.value.find(item => item.selected);
  return selected ? selected.label : '';
});

const personalityDisplayText = computed(() => {
  const selectedCount = personalityOptions.value.filter(option => option.selected).length;
  if (selectedCount === 0) return 'Input';
  if (selectedCount === 1) {
    return personalityOptions.value.find(option => option.selected)?.label || '';
  }
  return `${selectedCount} kiválasztva`;
});

const togglePersonalityOption = (optionId) => {
  const index = personalityOptions.value.findIndex(item => item.id === optionId);
  if (index !== -1) {
    personalityOptions.value[index].selected = !personalityOptions.value[index].selected;
    
    if (personalityOptions.value[index].selected) {
      if (!characteristics.value.some(char => char.id === optionId)) {
        characteristics.value.push({
          id: optionId,
          label: personalityOptions.value[index].label,
          selected: true
        });
      }
    } else {
      const charIndex = characteristics.value.findIndex(char => char.id === optionId);
      if (charIndex !== -1) {
        characteristics.value.splice(charIndex, 1);
      }
    }
  }
};

const removeCharacteristic = (charId) => {
  const index = characteristics.value.findIndex(item => item.id === charId);
  if (index !== -1) {
    characteristics.value.splice(index, 1);
  }
  
  const optionIndex = personalityOptions.value.findIndex(item => item.id === charId);
  if (optionIndex !== -1) {
    personalityOptions.value[optionIndex].selected = false;
  }
};

const toggleBreedOption = (optionId) => {
  const option = breedOptions.value.find(item => item.id === optionId);
  
  if (option && option.selected) {
    breedOptions.value.forEach(item => {
      item.selected = false;
    });
    breed.value = '';
  } 
  else {
    breedOptions.value.forEach(item => {
      item.selected = item.id === optionId;
    });
    breed.value = option?.label || '';
  }
  
  setActiveDropdown(null);
};

const toggleGenderOption = (optionId) => {
  const option = genderOptions.value.find(item => item.id === optionId);
  
  if (option && option.selected) {
    genderOptions.value.forEach(item => {
      item.selected = false;
    });
    gender.value = '';
  } 
  else {
    genderOptions.value.forEach(item => {
      item.selected = item.id === optionId;
    });
    gender.value = option?.label || '';
  }
  
  setActiveDropdown(null);
};

const toggleAdmissionOption = (optionId) => {
  const option = admissionOptions.value.find(item => item.id === optionId);
  
  if (option && option.selected) {
    admissionOptions.value.forEach(item => {
      item.selected = false;
    });
  } else {
    // Otherwise select only this option
    admissionOptions.value.forEach(item => {
      item.selected = item.id === optionId;
    });
  }
  
  setActiveDropdown(null);
};

const toggleCheckbox = (type: 'chip' | 'neuter' | 'passport') => {
  if (type === 'chip') isChipped.value = !isChipped.value;
  if (type === 'neuter') isNeutered.value = !isNeutered.value;
  if (type === 'passport') hasPassport.value = !hasPassport.value;
};

const savePet = (id) => {
  let paragraph_copy = paragraphs.value;
  paragraph_copy.forEach(paragraph => {
    delete paragraph.id;
  })  
  let data = {
    id: id,
    name: name.value,
    type: breedOptions.value.find(x => x.label == 'Kutya').selected ? 'dog' : 'cat',
    age: age.value,
    gender: genderOptions.value.find(x => x.label == 'Kan').selected ? 'male' : 'female',
    details: {
      color: color.value,
      chipped: isChipped.value,
      neutered: isNeutered.value,
      passported: hasPassport.value,  
      characteristics: characteristics.value.map(char => char.label),
      paragraphs: paragraph_copy,
      image: null
    },
    from: admissionOptions.value.find(x => x.label == 'Talált').selected ? 'found' : 'home',
    isPublicable: false,
  };
  console.log("Saving animal:", data);
  
  const formData = new FormData();
  formData.append("file", kep);
  formData.append("data", JSON.stringify(data));
  
  const formDataEntries = Array.from(formData.entries());
  console.log(formDataEntries);

  animSer.updateAnimal(formData).then((res) => {
    console.log(res.data.message);
  })
  // Call API to save the data
}

</script>

<template>
  <div class="pet-modification-container">
    <div class="modification-card">
      <div class="card-header">
        <h1>Állat módosítás adatlap</h1>
      </div>
      
      <div class="card-content">
        <div class="pet-info-section">
          <div class="image-section">
            <img v-bind:src="imageURL" alt="Pet photo" class="pet-image"  @click="uploadImage"/>
            <div class="image-modify-text" @click="uploadImage">Kép módosítása</div>
                <input 
                  hidden 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  id="image-file-input" 
                  v-on:change="imageAdded" 
                  @change="changeFileName"
                >
          </div>
          
          <div class="admission-info">
            <div class="admission-label">Menhelyre kerülés dátuma:</div>
            <div class="admission-date">{{ admissionDate }}</div>
            <div class="admission-description">{{ details }}</div>
          </div>
        </div>
        
        <div class="characteristics-section" v-if="characteristics.length > 0">
          <div class="section-label">Jellemzők:</div>
          <div class="tag-container">
            <transition-group name="tag">
              <div v-for="char in characteristics" :key="char.id" class="tag">
                {{ char.label }}
                <span class="tag-remove" @click="removeCharacteristic(char.id)">×</span>
              </div>
            </transition-group>
          </div>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <div class="label">Neve*</div>
            <CustomInput v-model="name" placeholder="Input" class="form-input" />
          </div>
          
          <!-- Breed dropdown -->
          <div class="form-group dropdown-container">
            <div class="label">Fajtája*</div>
            <div 
              class="custom-dropdown" 
              :class="{ 'active': activeDropdown === 'breed' }"
              @click.stop="setActiveDropdown(activeDropdown === 'breed' ? null : 'breed')"
              ref="breedDropdownRef"
            >
              <div class="dropdown-value">{{ selectedBreed || 'Input' }}</div>
              <svg class="chevron-icon" :class="{ 'rotated': activeDropdown === 'breed' }" 
                width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
              <transition name="dropdown">
                <div v-if="activeDropdown === 'breed'" class="dropdown-menu">
                  <div 
                    v-for="option in breedOptions" 
                    :key="option.id" 
                    class="dropdown-item"
                    :class="{ 'selected': option.selected }"
                    @click.stop="toggleBreedOption(option.id)"
                  >
                    <div class="checkbox">
                      <div v-if="option.selected" class="checkbox-checked"></div>
                    </div>
                    <span>{{ option.label }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <div class="form-group">
            <div class="label">Kora*</div>
            <CustomInput v-model="age" placeholder="Input" class="form-input" />
          </div>
        </div>
        
        <div class="form-grid second-row">
          <div class="form-group dropdown-container">
            <div class="label">Neme*</div>
            <div 
              class="custom-dropdown" 
              :class="{ 'active': activeDropdown === 'gender' }"
              @click.stop="setActiveDropdown(activeDropdown === 'gender' ? null : 'gender')"
              ref="genderDropdownRef"
            >
              <div class="dropdown-value">{{ selectedGender || 'Input' }}</div>
              <svg class="chevron-icon" :class="{ 'rotated': activeDropdown === 'gender' }" 
                width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
              <transition name="dropdown">
                <div v-if="activeDropdown === 'gender'" class="dropdown-menu">
                  <div 
                    v-for="option in genderOptions" 
                    :key="option.id" 
                    class="dropdown-item"
                    :class="{ 'selected': option.selected }"
                    @click.stop="toggleGenderOption(option.id)"
                  >
                    <div class="checkbox">
                      <div v-if="option.selected" class="checkbox-checked"></div>
                    </div>
                    <span>{{ option.label }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <div class="form-group">
            <div class="label">Színe</div>
            <CustomInput v-model="color" placeholder="Input" class="form-input" />
          </div>
        </div>
        
        <div class="checkbox-section">
          <div class="checkbox-group">
            <div 
              class="radio-button" 
              :class="{ 'selected': isChipped }"
              @click="toggleCheckbox('chip')"
            ></div>
            <span class="checkbox-label">Chippeltetve</span>
          </div>
          
          <div class="checkbox-group">
            <div 
              class="radio-button" 
              :class="{ 'selected': isNeutered }"
              @click="toggleCheckbox('neuter')"
            ></div>
            <span class="checkbox-label">Ivartalanított</span>
          </div>
          
          <div class="checkbox-group">
            <div 
              class="radio-button" 
              :class="{ 'selected': hasPassport }"
              @click="toggleCheckbox('passport')"
            ></div>
            <span class="checkbox-label">Útlevél</span>
          </div>
        </div>
        
        <div class="dropdown-row">
          <div class="dropdown-container half-width">
            <div class="label">Jellemvonások</div>
            <div 
              class="custom-dropdown"
              :class="{ 'active': activeDropdown === 'personality' }"
              @click.stop="setActiveDropdown(activeDropdown === 'personality' ? null : 'personality')"
              ref="personalityDropdownRef"
            >
              <div class="dropdown-value">{{ personalityDisplayText }}</div>
              <svg class="chevron-icon" :class="{ 'rotated': activeDropdown === 'personality' }" 
                width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
              <transition name="dropdown">
                <div v-if="activeDropdown === 'personality'" class="dropdown-menu">
                  <div 
                    v-for="option in personalityOptions" 
                    :key="option.id" 
                    class="dropdown-item"
                    :class="{ 'selected': option.selected }"
                    @click.stop="togglePersonalityOption(option.id)"
                  >
                    <div class="checkbox">
                      <div v-if="option.selected" class="checkbox-checked"></div>
                    </div>
                    <span>{{ option.label }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <div class="dropdown-container half-width">
            <div class="label">Bekerülés körülménye</div>
            <div class="custom-dropdown" :class="{ 'active': activeDropdown === 'admission' }" @click.stop="setActiveDropdown(activeDropdown === 'admission' ? null : 'admission')" ref="admissionDropdownRef">
              <div class="dropdown-value">{{ selectedAdmission || 'Input' }}</div>
              <svg class="chevron-icon" :class="{ 'rotated': activeDropdown === 'admission' }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
              <transition name="dropdown">
                <div v-if="activeDropdown === 'admission'" class="dropdown-menu">
                  <div v-for="option in admissionOptions"  :key="option.id" class="dropdown-item" :class="{ 'selected': option.selected }" @click.stop="toggleAdmissionOption(option.id)">
                    <div class="checkbox">
                      <div v-if="option.selected" class="checkbox-checked"></div>
                    </div>
                    <span>{{ option.label }}</span>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        

        <div class="paragraphs">
          <div class="add-paragraph-row">
            <p class="add-paragraph-text">Új paragrafus hozzáadása</p>
            <img src="../assets/add.png" class="add-paragraph-button" @click="addParagraph()" />
          </div>
          <div class="paragraph-list">
            <div v-for="(paragraph, index) in paragraphs">
              <div class="form-group">

                <div class="paragraph-top-row">
                  <input type="text" 
                          placeholder="Cím" 
                          class="border-3 border-gray-500 text-gray-500 bg-gray-100 p-2 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-base"
                          style="height: 44px;font-weight: 600;border-radius: 15px; flex-grow: 5;"
                          :value=paragraph.title
                          @input="updateParagraphTitle(paragraph.id, ($event.target as HTMLInputElement).value)">
                  </input>
                  <img src="../assets/close-dark.png" class="add-paragraph-button" style="flex-grow: 1;" @click="removeParagraph(paragraph.id)" />
                </div>
                <textarea class="border-3 border-gray-500 text-gray-500 bg-gray-100 p-2 focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-base"
                        style="height: 220px;font-size: 1rem;font-weight: 600;border-radius: 15px; min-height: 220px; resize: none;"
                        :value=paragraph.description
                        placeholder="Leírás"
                        @input="updateParagraphDescription(paragraph.id, ($event.target as HTMLInputElement).value)">
                </textarea>

                <hr class="paragraph-line" v-if="index != paragraphs.length-1"></hr>
              </div>
            </div>
          </div>
        </div>


        <div class="nav-buttons">
          <RouterLink to="/adminpage" class="back-link">
            Vissza az admin felületre →
          </RouterLink>
          <Button class="save-button" @click="savePet(id)">Mentés</Button>
        </div>
      </div>
    </div>
    
    <PawFooter :is-sticky="true" />
  </div>
</template>

<style scoped>
.paragraph-line {
  border-color: var(--button-important);
  border-width: 2px;
  border-radius: 2px;
  margin: 1rem 0rem;
}
.paragraph-top-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
}
.add-paragraph-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 1.2rem 1rem 0.5rem;
}

.add-paragraph-text {
  font-size: 1.5rem;
  font-weight: 600;
}

.add-paragraph-button {
  width: 25px;
  height: 25px;
  max-width: 30px;
  max-height: 30px;
  cursor: pointer;
}

.pet-modification-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
  user-select: none; 
}

.modification-card {
  width: 100%;
  max-width: 800px;
  background-color: #FED7AA;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
}

.card-header {
  background-color: #FDBA74;
  padding: 12px 20px;
  text-align: center;
}

.card-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card-content {
  padding: 20px;
}

.pet-info-section {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  margin: 0rem 4rem;
}

.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.pet-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 24px;
  border: 1px solid black;
}

.image-modify-text {
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.image-modify-text:hover {
  color: #ff6600;
}

.image-modify-text::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 3px;
  background-color: #ff6600;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease-in-out;
}

.image-modify-text:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}



.admission-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  padding: 20px;
}

.admission-label {
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

.admission-date {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}
.admission-description {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  font-style: italic;
  overflow-wrap: anywhere;
}
.characteristics-section {
  margin-bottom: 20px;
}

.section-label {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: flex;
  align-items: center;
  background-color: #FDBA74;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.tag-remove {
  cursor: pointer;
  margin-left: 6px;
  font-weight: bold;
  font-size: 1.2rem;
}

.tag-enter-active, .tag-leave-active {
  transition: all 0.3s ease;
}
.tag-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.tag-leave-to {
  opacity: 0;
  transform: scale(0.75);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.second-row {
  grid-template-columns: repeat(2, 1fr);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-bottom: 3px;
}

.form-input {
  height: 40px;
  width: 100%;
}

.checkbox-section {
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  gap: 8rem;
  margin-left: 5rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-button {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  margin-top: 0.9rem;
}

.radio-button.selected::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #E85B44;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-label {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
}

.dropdown-row {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.half-width {
  width: 50%;
}

.full-width {
  width: 100%;
}

.custom-dropdown {
  height: 40px;
  border: 3px solid gray;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
  position: relative;
  background-color: white;
}

.custom-dropdown.active {
  border-color: #FDBA74;
}

.dropdown-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron-icon {
  transition: transform 0.3s ease;
  color: #000000;
  margin-left: 8px;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-checked {
  position: relative;
}

.checkbox-checked::after {
  content: '';
  position: absolute;
  left: -3px;
  top: -5px;
  width: 5px;
  height: 10px;
  border: solid #E85B44;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.dropdown-container {
  position: relative;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.back-link {
  cursor: pointer;
  font-weight: 600;
}

.save-button {
  background-color: #E85B44;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .pet-info-section {
    flex-direction: column;
  }
    .admission-date {
      margin-left: 0;
  }

  .admission-label {
    margin-left: 0;
  }

  .pet-info-section {
    margin-left: 4rem;
  }

  .admission-info {
    margin-left: 0;
    margin-top: 15px;
    text-align: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .dropdown-row {
    flex-direction: column;
  }
  
  .half-width {
    width: 100%;
  }

  .checkbox-section {
    gap: 15px;
    margin-left: 5rem;
  }
}

@media (max-width: 480px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .second-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-section {
    flex-direction: column;
    gap: 10px;
    margin-left: 0;
  }
  
  .nav-buttons {
    flex-direction: column-reverse;
    gap: 15px;
  }
  
  .save-button {
    width: 100%;
  }
  
  .back-link {
    align-self: center;
  }

  .admission-date {
      margin-left: 0;
  }

  .admission-label {
    margin-left: 0;
  }

  .pet-info-section {
    margin-left: 4rem;
  }
}
</style>