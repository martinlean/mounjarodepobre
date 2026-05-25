<template>
  <div class="logo">
    <img
      v-if="!imgError"
      :src="'/images/logo.jpg'"
      alt="Mounjaro de Pobre"
      class="logo-img"
      @error="imgError = true"
    />
    <div v-else class="logo-fallback">
      <span class="logo-icon">🍵</span>
      <span class="logo-text">Mounjaro de Pobre</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const imgError = ref(false)
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px 8px;
}
.logo-img {
  height: 52px;
  width: auto;
  object-fit: contain;
}
.logo-fallback {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo-icon { font-size: 22px; }
.logo-text {
  font-size: 18px;
  font-weight: 800;
  color: #22c55e;
  letter-spacing: -0.3px;
}
</style>
