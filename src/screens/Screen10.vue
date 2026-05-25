<template>
  <ScreenShell>
    <h1 class="title">🔥 <strong>Histórias Reais de Transformação!</strong></h1>
    <p class="location">📍 Depoimento: Fernanda – Porto Alegre-RS</p>

    <div class="before-after-imgs">
      <img :src="'/images/final/antes_depois1.webp'" alt="Antes e Depois 1" class="ba-img" />
      <img :src="'/images/final/antes_depois2.webp'" alt="Antes e Depois 2" class="ba-img" />
    </div>

    <div class="testimonial-card">
      <div class="testimonial-header">
        <div class="avatar">FO</div>
        <div>
          <p class="t-name">Fernanda Oliveira</p>
          <p class="t-city">Porto Alegre, RS</p>
        </div>
        <div class="stars">⭐⭐⭐⭐⭐</div>
      </div>
      <p class="t-text">
        "Tentei de tudo para emagrecer e nada funcionava. Com Mounjaro de Pobre, em apenas
        3 semanas já notei diferença! Perdi 7kg sem passar fome, minha energia voltou e
        me sinto uma nova pessoa. Recomendo demais! 🌿"
      </p>
    </div>

    <template #footer>
      <AppButton @click="next">Continuar</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import AppButton from '../components/AppButton.vue'
import { inject } from 'vue'
const next = inject('next')
</script>

<style scoped>
.title { font-size: 20px; font-weight: 800; color: #22c55e; }
.location { font-size: 13px; color: #6b7280; }

.before-after-imgs { display: flex; flex-direction: column; gap: 10px; }
.ba-img { width: 100%; height: auto; display: block; border-radius: 12px; }

.testimonial-card {
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.testimonial-header { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 44px; height: 44px;
  background: #22c55e; color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 14px;
  flex-shrink: 0;
}
.t-name { font-weight: 700; font-size: 14px; }
.t-city { font-size: 12px; color: #6b7280; }
.stars { margin-left: auto; font-size: 14px; }
.t-text { font-size: 14px; color: #374151; line-height: 1.6; font-style: italic; }
</style>
