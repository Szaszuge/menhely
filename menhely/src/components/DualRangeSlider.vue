<template>
  <div class="range-container">
    <div class="time-labels">
      <div class="time-label start-label">8:00</div>
      <div class="time-label end-label">20:00</div>
    </div>
    <div class="slider-container">
      <div class="slider-track"></div>
      <div
        class="slider-range"
        :style="{
          left: (fromValue / 100) * 100 + '%',
          width: ((toValue - fromValue) / 100) * 100 + '%'
        }"
      ></div>
      <input
        id="fromSlider"
        type="range"
        v-model="fromValue"
        min="0"
        max="100"
        @input="updateFromSlider"
        class="slider from-slider"
      />
      <input
        id="toSlider"
        type="range"
        v-model="toValue"
        min="0"
        max="100"
        @input="updateToSlider"
        class="slider to-slider"
      />
    </div>
    <div class="selected-time-range">{{ fromTime }}-{{ toTime }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromValue: 25, // Set to 25% of the slider by default
      toValue: 45, // Set to 45% of the slider by default
      fromTime: "",
      toTime: "",
      totalMinutes: 12 * 60 // Total minutes between 8:00 and 20:00
    };
  },
  methods: {
    updateFromSlider() {
      // Ensure fromValue doesn't exceed toValue
      if (parseInt(this.fromValue) > parseInt(this.toValue)) {
        this.fromValue = this.toValue;
      }
      this.fromTime = this.formatTime(this.fromValue);
    },
    updateToSlider() {
      // Ensure toValue doesn't go below fromValue
      if (parseInt(this.toValue) < parseInt(this.fromValue)) {
        this.toValue = this.fromValue;
      }
      this.toTime = this.formatTime(this.toValue);
    },
    formatTime(value) {
      // Convert slider value (0-100) to time (8:00-20:00) in 15-minute increments
      const minutesTotal = (value / 100) * this.totalMinutes;
      
      // Round to nearest 15 minutes
      const roundedMinutes = Math.round(minutesTotal / 15) * 15;
      
      const hours = Math.floor(roundedMinutes / 60) + 8;
      const minutes = roundedMinutes % 60;
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }
  },
  mounted() {
    // Initialize with default values
    this.fromTime = this.formatTime(this.fromValue);
    this.toTime = this.formatTime(this.toValue);
  }
};
</script>

<style scoped>
.range-container {
  width: 90%;
  max-width: 500px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 8px;
}
.time-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.time-label {
  color: #E85B44;
  font-weight: bold;
}
.slider-container {
  position: relative;
  height: 30px;
  margin-bottom: 10px;
}
.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: #FFFFFF;
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
  appearance: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background: transparent;
  border: none;
  pointer-events: none;
  z-index: 2;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #E85B44;
  cursor: pointer;
  pointer-events: auto;
  margin-top: -7px;
}
.slider::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #E85B44;
  cursor: pointer;
  pointer-events: auto;
  border: none;
}
.slider:focus {
  outline: none;
}
.selected-time-range {
  text-align: center;
  color: #E85B44;
  font-weight: bold;
  font-size: 16px;
}
</style>