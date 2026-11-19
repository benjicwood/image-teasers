<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const images = [
  "/images/image-1.jpg",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg",
  "/images/image-5.jpg",
  "/images/image-6.jpg",
  "/images/image-7.jpg",
  "/images/image-8.jpg",
  "/images/image-9.jpg",
  "/images/image-10.jpg",
  "/images/image-11.jpg",
];

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
