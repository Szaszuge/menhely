<script setup lang="ts">
import { ref, watch } from 'vue';

const fromValue = ref(10);
const toValue = ref(40);

const fromTime = ref("8:00");
const toTime = ref("20:00");

const totalMinutes = 12 * 60; // Total minutes between 8:00 and 20:00

// Function to format the slider value to time in hours:minutes
const formatTime = (value: number) => {
  const minutes = (value / 100) * totalMinutes;
  const hours = Math.floor(minutes / 60) + 8;
  const minutesDisplay = Math.floor(minutes % 60);
  return `${hours}:${minutesDisplay < 10 ? '0' : ''}${minutesDisplay}`;
};

// Watch the 'fromValue' and 'toValue' to ensure the first slider never exceeds the second one
watch(fromValue, (newValue) => {
  if (newValue > toValue.value) {
    toValue.value = newValue; // Adjust 'to' slider to 'from' value
  }
  fromTime.value = formatTime(newValue);
});

watch(toValue, (newValue) => {
  if (newValue < fromValue.value) {
    fromValue.value = newValue; // Adjust 'from' slider to 'to' value
  }
  toTime.value = formatTime(newValue);
});
</script>

<template>
  <div class="range_container">
    <div class="sliders_control">
      <input
        id="fromSlider"
        type="range"
        v-model="fromValue"
        min="0"
        max="100"
        step="1"
      />
      <input
        id="toSlider"
        type="range"
        v-model="toValue"
        min="0"
        max="100"
        step="1"
      />
    </div>
    <div class="form_control">
      <div class="form_control_container">
        <div class="form_control_container__time">{{ fromTime }}</div>
      </div>
      <div class="form_control_container">
        <div class="form_control_container__time">{{ toTime }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.range_container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10% auto;
}

.sliders_control {
  position: relative;
  min-height: 20px;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #635a5a;
}

input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;
}

input[type=range]::-webkit-slider-thumb,
input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type=range]:focus {
  outline: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}

.form_control_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form_control_container__time {
  color: #E85B44;
  font-size: 24px;
  font-weight: bold;
}

input[type="number"] {
  color: #8a8383;
  width: 50px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
