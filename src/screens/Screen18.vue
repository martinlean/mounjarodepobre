<template>
  <ScreenShell>
    <div class="loading-screen">
      <h1 class="title"><strong>Aguarde</strong> enquanto preparamos o seu Mounjaro de Pobre......</h1>

      <div class="progress-section">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }" />
        </div>
        <p class="progress-label">{{ progress }}% — Carregando...</p>
      </div>

      <ul class="checklist">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="check-item"
          :class="{ visible: visibleItems > i }"
        >
          <span class="check-icon">✅</span>
          <span v-if="i === 3">{{ item.replace('[USER_NAME]', state.nome || 'você') }}</span>
          <span v-else>{{ item }}</span>
        </li>
      </ul>

      <!-- Carrossel com imagens reais -->
      <div class="carousel">
        <div class="carousel-track" :style="{ transform: `translateX(-${carouselIndex * 100}%)` }">
          <div class="carousel-slide">
            <img :src="'/images/final/antes_depois1.webp'" class="carousel-img" alt="Antes e Depois 1" />
          </div>
          <div class="carousel-slide">
            <img :src="'/images/final/antes_depois2.webp'" class="carousel-img" alt="Antes e Depois 2" />
          </div>
          <div class="carousel-slide">
            <img :src="'/images/final/antes_depois1.webp'" class="carousel-img" alt="Antes e Depois 3" />
          </div>
        </div>
        <div class="dots">
          <span v-for="n in 3" :key="n" class="dot" :class="{ active: carouselIndex === n - 1 }" />
        </div>
      </div>
    </div>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import { ref, inject, onMounted, onUnmounted } from 'vue'

const state = inject('state')
const next = inject('next')

const progress = ref(0)
const visibleItems = ref(0)
const carouselIndex = ref(0)

const items = [
  'Analisando bloqueios hormonais...',
  'Identificando a área de maior acúmulo de gordura...',
  'Calculando a dose ideal da receita...',
  '🔒 Criando protocolo exclusivo para: [USER_NAME]',
]

let timers = []

onMounted(() => {
  const duration = 4000
  const interval = 50
  const steps = duration / interval

  const t1 = setInterval(() => {
    progress.value = Math.min(100, progress.value + 100 / steps)
    if (progress.value >= 100) {
      clearInterval(t1)
      setTimeout(next, 600)
    }
  }, interval)
  timers.push(t1)

  items.forEach((_, i) => {
    const t = setTimeout(() => visibleItems.value++, 600 + i * 900)
    timers.push(t)
  })

  const t2 = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % 3
  }, 1500)
  timers.push(t2)
})

onUnmounted(() => timers.forEach(clearInterval))
</script>

<style scoped>
.loading-screen { display: flex; flex-direction: column; gap: 20px; }
.title { font-size: 20px; font-weight: 700; color: #1a1a1a; line-height: 1.4; text-align: center; }
.title strong { color: #22c55e; }
.progress-section { display: flex; flex-direction: column; gap: 8px; }
.progress-track { height: 10px; background: #e5e7eb; border-radius: 99px; overflow: hidden; }
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 99px;
  transition: width 0.05s linear;
}
.progress-label { font-size: 13px; color: #6b7280; text-align: center; }
.checklist { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.check-item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; color: #374151;
  opacity: 0; transform: translateY(6px);
  transition: all 0.4s ease;
}
.check-item.visible { opacity: 1; transform: translateY(0); }
.check-icon { font-size: 16px; flex-shrink: 0; }

.carousel { overflow: hidden; border-radius: 16px; }
.carousel-track { display: flex; transition: transform 0.5s ease; }
.carousel-slide { min-width: 100%; }
.carousel-img { width: 100%; height: auto; display: block; border-radius: 12px; }
.dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; transition: background 0.3s; }
.dot.active { background: #22c55e; }
</style>
