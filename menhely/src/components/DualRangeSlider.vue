<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const minValue = ref(25);
const maxValue = ref(75);


const minTimeLabel = computed(() => formatTimeFromPercent(minValue.value));
const maxTimeLabel = computed(() => formatTimeFromPercent(maxValue.value));


const TOTAL_MINUTES = 12 * 60;
const START_HOUR = 8;

function formatTimeFromPercent(percent: number): string {
  const minutesSinceMidnight = Math.round(START_HOUR * 60 + (percent / 100) * TOTAL_MINUTES);
  
  const roundedMinutes = Math.round(minutesSinceMidnight / 15) * 15;
  
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function updateMinSlider() {
  if (minValue.value > maxValue.value) {
    minValue.value = maxValue.value;
  }
}

function updateMaxSlider() {
  if (maxValue.value < minValue.value) {
    maxValue.value = minValue.value;
  }
}

onMounted(() => {
  updateMinSlider();
  updateMaxSlider();
});
</script>

<template>
  <div class="dual-range-slider">

    <div class="time-labels">
      <div class="time-label">8:00</div>
      <div class="time-label">20:00</div>
    </div>
    
    <div class="slider-container">
      <div class="slider-track"></div>
      
      <div 
        class="slider-range"
        :style="{
          left: `${minValue}%`,
          width: `${maxValue - minValue}%`
        }"
      ></div>
      
      <input
        type="range"
        class="slider min-slider"
        v-model="minValue"
        min="0"
        max="100"
        step="1"
        @input="updateMinSlider"
      />
      
      <input
        type="range"
        class="slider max-slider"
        v-model="maxValue"
        min="0"
        max="100"
        step="1"
        @input="updateMaxSlider"
      />
    </div>
    
    <div class="selected-time">
      {{ minTimeLabel }} - {{ maxTimeLabel }}
    </div>
  </div>
</template>

<style scoped>
.dual-range-slider {
  width: 100%;
  padding: 8px 0;
}

.time-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
}

.slider-container {
  position: relative;
  height: 36px;
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: white;
  border-radius: 2px;
}

.slider-range {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background-color: #E85B44;
  border-radius: 2px;
}

.slider {
  -webkit-appearance: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background: transparent;
  border: none;
  pointer-events: none;
  margin: 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #E85B44;
  cursor: pointer;
  pointer-events: auto;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #E85B44;
  cursor: pointer;
  pointer-events: auto;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider:focus {
  outline: none;
}

.selected-time {
  text-align: center;
  margin-top: 12px;
  font-weight: 600;
  color: #E85B44;
  font-size: 1rem;
}
</style>