<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const imageUrl = ref("/api/image");
let timer = null;

const refreshImage = () => {
  imageUrl.value = `/api/image?t=${Date.now()}`;
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
    <img :src="imageUrl" alt="Scheduled image" class="display-image" />
  </main>
</template>
