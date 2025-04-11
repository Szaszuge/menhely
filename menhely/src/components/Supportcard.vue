<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="support-card">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.support-card {
  display: flex;
  flex-direction: column;
  background-color: rgb(254, 215, 170);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 500px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.support-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  background-color: rgb(253, 186, 116);
  padding: 1.25rem 1rem;
  text-align: center;
}

.card-header h2 {
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

.card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5rem;
  font-size: 1.15rem;
}

@media (max-width: 768px) {
  .support-card {
    max-width: 500px;
    min-height: auto;
  }
}
</style>