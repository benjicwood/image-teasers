<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const imageUrl = ref(null);
let timer = null;

const refreshImage = async () => {
  const url = `/api/image?t=${Date.now()}`;

  try {
    const response = await fetch(url);

    imageUrl.value = response.ok ? url : null;
  } catch {
    imageUrl.value = null;
  }
};

onMounted(() => {
  refreshImage();
  timer = setInterval(refreshImage, 10_000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <main class="image-container">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Scheduled image"
      class="display-image"
    />

    <div v-else class="coming-soon">
      <h1>COMING SOON</h1>
      <p>24 NOVEMBER 2026 — 09:00</p>
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

.coming-soon p {
  font-size: clamp(0.75rem, 2vw, 1rem);
  letter-spacing: 0.2em;
  opacity: 0.6;
}
</style>
