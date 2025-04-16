<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  activeTab: string
}>();

const emit = defineEmits(['update:activeTab']);

function setActiveTab(tab: string) {
  emit('update:activeTab', tab);
}
</script>

<template>
  <div class="navigation-container">
    <div class="navigation-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'Felhasználók'}"
        @click="setActiveTab('Felhasználók')"
      >
        Felhasználók
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'Kérések'}"
        @click="setActiveTab('Kérések')"
      >
        Kérések
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'Állatok'}"
        @click="setActiveTab('Állatok')"
      >
        Állatok
      </button>
    </div>
  </div>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .navigation-tabs {
    width: 100%;
  }
  
  .nav-tab {
    padding: 10px 16px;
    font-size: 1rem;
    flex: 1;
    text-align: center;
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
}
</style>