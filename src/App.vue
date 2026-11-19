<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const images = [
  "image-1.jpg",
  "image-2.jpg",
  "image-3.jpg",
  "image-4.jpg",
  "image-5.jpg",
  "image-6.jpg",
  "image-7.jpg",
  "image-8.jpg",
  "image-9.jpg",
  "image-10.jpg",
  "image-11.jpg",
].map((filename) => `${import.meta.env.BASE_URL}images/${filename}`);

const intervalSeconds = 3;

const currentIndex = ref(0);

let timer = null;

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

onMounted(() => {
  timer = setInterval(nextImage, intervalSeconds * 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <main class="image-container">
    <img
      :src="images[currentIndex]"
      alt="Scheduled image"
      class="display-image"
    />
  </main>
</template>
