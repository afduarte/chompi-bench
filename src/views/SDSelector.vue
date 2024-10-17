<template>
  <div class="welcome-screen">
    <h1>Welcome!</h1>
    <p>Please select your SD card to load the contents.</p>
    <button @click="openSDCard">Open SD Card</button>
  </div>
</template>

<script setup lang="ts">
import { useSDStore } from '@/stores/sd';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

// Access Pinia store and router
const sdStore = useSDStore();
const router = useRouter();

// Function to open the SD card selector and navigate
const openSDCard = async () => {
  await sdStore.listSDCardContents();  // Trigger the file picker and load contents
  router.push('/menu');                // Navigate to the '/menu' route
};
</script>

<style scoped>
.welcome-screen {
  text-align: center;
  padding: 20px;
}

button {
  background-color: var(--chompi);
  /* Green */
  color: white;
  padding: 15px 32px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: var(--chompi-darker);
}
</style>