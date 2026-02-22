<template>
  <div class="app-container" style="padding: 20px; font-family: system-ui, sans-serif;">
    <h1>Vue.js Application with DEMO-SCORE</h1>
    <p>Using the Native Web Component in Vue 3.</p>
    
    <div class="scores" style="display: flex; gap: 20px; margin-top: 20px;">
      <!-- Use standard attribute binding for Vue -->
      <demo-score :level="currentLevel" version="v1.0.0" lang="fr"></demo-score>
      <demo-score level="S" version="v3.1.4" lang="en"></demo-score>
    </div>

    <button @click="changeLevel" style="margin-top: 20px; padding: 8px 16px;">
      Change Dynamic Level
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import '@hand-e/demo-score'; // In your real app, import the module

const currentLevel = ref('E');
const changeLevel = () => {
  const levels = ['D', 'E', 'M', 'O', 'S'];
  const nextIndex = (levels.indexOf(currentLevel.value) + 1) % levels.length;
  currentLevel.value = levels[nextIndex];
};
</script>
