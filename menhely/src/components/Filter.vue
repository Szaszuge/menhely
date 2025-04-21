<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, inject, Ref, computed } from 'vue';

const props = defineProps<{
  label: string;
  primary?: boolean;
  options?: Array<{id: string | number, label: string, checked?: boolean}>;
  id: string;
  singleSelect?: boolean;
}>();

const emit = defineEmits(['update:options']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const activeDropdown = inject<Ref<string | null>>('activeDropdown');
const setActiveDropdown = inject<(id: string | null) => void>('setActiveDropdown');
const localOptions = ref<Array<{id: string | number, label: string, checked: boolean}>>([]);

const selectedText = computed(() => {
  const selected = localOptions.value.filter(option => option.checked);
  if (selected.length === 0) {
    return "Válasszon lehetőséget";
  } else if (selected.length === 1) {
    return selected[0].label;
  } else {
    return `${selected.length} kiválasztva`;
  }
});


watch(() => props.options, (newOptions) => {
  if (newOptions) {
    localOptions.value = newOptions.map(option => ({
      ...option,
      checked: option.checked || false
    }));
  }
}, { immediate: true, deep: true });

const toggleDropdown = () => {
  if (isOpen.value) {
    isOpen.value = false;
    if (setActiveDropdown) setActiveDropdown(null);
  } else {
    if (setActiveDropdown) setActiveDropdown(props.id);
  }
};

if (activeDropdown) {
  watch(activeDropdown, (newActiveDropdown) => {
    isOpen.value = newActiveDropdown === props.id;
  });
}

const toggleOption = (optionId: string | number) => {
  if (props.singleSelect) {
    const clickedOption = localOptions.value.find(opt => opt.id === optionId);
    
    if (clickedOption && clickedOption.checked) {
      localOptions.value.forEach(option => {
        option.checked = false;
      });
    } else {
      localOptions.value.forEach(option => {
        option.checked = option.id === optionId;
      });
    }
  } else {

    const option = localOptions.value.find(opt => opt.id === optionId);
    if (option) {
      option.checked = !option.checked;
    }
  }
  
  emit('update:options', localOptions.value);
};

const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
    if (setActiveDropdown) setActiveDropdown(null);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="filter-container">
    <label class="filter-label">{{ label }}</label>
    <div class="filter-dropdown" ref="dropdownRef">
      <button
        :class="['filter-button', { 'primary-filter': primary, 'is-open': isOpen }]"
        @click.stop="toggleDropdown"
      >
        <span class="filter-text" :class="{ 'placeholder': selectedText === 'Válasszon lehetőséget' }">
          {{ selectedText }}
        </span>
        <svg class="chevron-icon" :class="{ 'rotated': isOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
     
      <transition name="dropdown">
        <div v-if="isOpen" class="dropdown-content">
          <div v-if="localOptions && localOptions.length" class="dropdown-options">
            <label v-for="option in localOptions" :key="option.id" class="option-item">
              <input
                type="checkbox"
                :checked="option.checked"
                @change="toggleOption(option.id)"
                class="option-checkbox"
              />
              <span class="option-label">{{ option.label }}</span>
            </label>
          </div>
          <div v-else class="no-options">No options available</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; 
}
.filter-label {
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
}
.filter-dropdown {
  position: relative;
  width: 100%;
}
.filter-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 42px; 
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f8f4f4;
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid transparent;
}
.filter-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  text-align: left;
}
.placeholder {
  color: gray;
}
.filter-button.is-open {
  border-color: #aaa;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.chevron-icon {
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 8px;
}
.chevron-icon.rotated {
  transform: rotate(180deg);
}
.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: #f8f4f4;
  width: 100%;
  min-width: 180px; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  z-index: 100;
  overflow: hidden;
}
.dropdown-options {
  max-height: 300px;
  overflow-y: auto;
  padding: 8px 0;
}
.option-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.option-item:hover {
  background-color: #f5f5f5;
}
.option-checkbox {
  margin-right: 10px;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}
.option-checkbox:checked {
  background-color: #e85b44;
  border-color: #e85b44;
}
.option-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.option-label {
  font-size: 14px;
}
.no-options {
  padding: 16px;
  text-align: center;
  font-size: 14px;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>