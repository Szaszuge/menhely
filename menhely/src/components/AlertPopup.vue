<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue';

interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error';
}

const alerts = ref<Alert[]>([]);
const nextId = ref(1);
const isVisible = computed(() => alerts.value.length > 0);


const addAlert = (message: string, type: 'success' | 'error' = 'success') => {
  const id = nextId.value++;
  alerts.value.push({ id, message, type });
  
  setTimeout(() => {
    closeAlert(id);
  }, 3000);
};


const closeAlert = (id: number) => {
  const index = alerts.value.findIndex(alert => alert.id === id);
  if (index !== -1) {
    alerts.value.splice(index, 1);
  }
};

const showSuccessAlert = (message) => {
  addAlert(message, 'success');
};

const showErrorAlert = (message) => {
  addAlert(message, 'error');
};

defineExpose({
  showSuccessAlert,
  showErrorAlert,
  addAlert
});
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <TransitionGroup name="slide-fade" tag="div" class="flex flex-col gap-4">
        <div 
          v-for="alert in alerts" 
          :key="alert.id" 
          :class="[
            'rounded-xl shadow-xl p-5 flex items-center min-w-80 max-w-md transition-all duration-500 transform',
            alert.type === 'success' ? 'bg-gradient-to-r from-green-200 to-green-300 border-l-4 border-green-500' : 
            'bg-gradient-to-r from-red-200 to-red-300 border-l-4 border-red-500'
          ]"
        >
          <div class="flex-shrink-0 mr-4">
            <div :class="[
              'rounded-full p-2 flex items-center justify-center',
              alert.type === 'success' ? 'bg-green-100' : 'bg-red-100'
            ]">
              <img 
                v-if="alert.type === 'success'" 
                src="../assets/checked.png" 
                alt="Success" 
                class="w-8 h-8"
              />
              <img 
                v-else 
                src="../assets/somethingwentwrong.png" 
                alt="Error" 
                class="w-8 h-8"
              />
            </div>
          </div>
          <div class="flex-grow">
            <div class="text-xl font-bold mb-1">{{ alert.type === 'success' ? "Siker!" : "Hiba!"}}</div>
            <div class="text-lg">{{ alert.message }}</div>
          </div>
          <button 
            @click="closeAlert(alert.id)" 
            class="flex-shrink-0 ml-3 text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000);
}

.slide-fade-enter-from {
  transform: translateX(100px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.slide-fade-move {
  transition: transform 0.5s ease;
}
</style>