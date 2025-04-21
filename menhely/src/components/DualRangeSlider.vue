<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, ComputedRef } from 'vue';

const minValue = computed(() => model.value[0]);
const maxValue = computed(() => model.value[1]);

const model = defineModel<[number, number]>();

const minSliderRef = ref<HTMLInputElement | null>(null);
const maxSliderRef = ref<HTMLInputElement | null>(null);

const TOTAL_MINUTES = 12 * 60; 
const START_HOUR = 8;
const MIN_GAP_HOURS = 2; 
const MIN_GAP_PERCENT = (MIN_GAP_HOURS * 60 / TOTAL_MINUTES) * 100; 

const minTimeLabel = computed(() => formatTimeFromPercent(minValue.value));
const maxTimeLabel = computed(() => formatTimeFromPercent(maxValue.value));

function formatTimeFromPercent(percent: number): string {
  const minutesSinceMidnight = Math.round(START_HOUR * 60 + (percent / 100) * TOTAL_MINUTES);
  
  // Round to nearest 15 minutes
  const roundedMinutes = Math.round(minutesSinceMidnight / 15) * 15;
  
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function updateMinSlider(event: Event) {
  const newValue = Number((event.target as HTMLInputElement).value);
  

  if (maxValue.value - newValue < MIN_GAP_PERCENT) {
    model.value[0] = maxValue.value - MIN_GAP_PERCENT;
    
    if (minSliderRef.value) {
      minSliderRef.value.value = minValue.value.toString();
    }
  } else {
    model.value[0] = newValue;
  }
}

function updateMaxSlider(event: Event) {
  const newValue = Number((event.target as HTMLInputElement).value);
  
  if (newValue - minValue.value < MIN_GAP_PERCENT) {
    model.value[1] = minValue.value + MIN_GAP_PERCENT;
    
    if (maxSliderRef.value) {
      maxSliderRef.value.value = maxValue.value.toString();
    }
  } else {
    model.value[1] = newValue;
  }
}

onMounted(() => {
  if (maxValue.value - minValue.value < MIN_GAP_PERCENT) {
    const midPoint = (maxValue.value + minValue.value) / 2;
    model.value[0] = Math.max(0, midPoint - MIN_GAP_PERCENT / 2);
    model.value[1] = Math.min(100, midPoint + MIN_GAP_PERCENT / 2);
  }
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
        ref="minSliderRef"
        type="range"
        class="slider min-slider"
        :value="minValue"
        min="0"
        max="100"
        step="1"
        @input="updateMinSlider"
      />
      
      <input
        ref="maxSliderRef"
        type="range"
        class="slider max-slider"
        :value="maxValue"
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
  z-index: 1;
}
.min-slider {
  z-index: 2;
}
.max-slider {
  z-index: 2;
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