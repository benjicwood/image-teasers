<script setup>
import { ref } from "vue";

const imageUrl = `/api/image?t=${Date.now()}`;
const imageAvailable = ref(true);

const handleImageError = () => {
  imageAvailable.value = false;
};
</script>

<template>
  <main class="image-container">
    <img
      v-if="imageAvailable"
      :src="imageUrl"
      alt="Scheduled image"
      class="display-image"
      @error="handleImageError"
    />

    <div v-else class="coming-soon">
      <h1>COMING SOON</h1>
    </div>
  </main>
</template>

<style scoped>
.coming-soon {
  color: #fff;
  text-align: center;
  padding: 2rem;
}

.coming-soon h1 {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}
</style>
