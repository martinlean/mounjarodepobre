<template>
  <div class="intro-wrap">
    <!-- Apenas o vídeo, sem texto -->
    <div class="video-container">
      <VideoPlayer
        src="/videos/intro.m2ts"
        @complete="onComplete"
      />
    </div>

    <!-- Botão aparece somente após o vídeo terminar -->
    <Transition name="cta-pop">
      <div v-show="done" class="cta-area">
        <button class="cta-btn" @click="$emit('start')">
          QUERO A RECEITA! 🌿
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from '../components/VideoPlayer.vue'

defineEmits(['start'])

const done = ref(false)
function onComplete() { done.value = true }
</script>

<style scoped>
.intro-wrap {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 70px);
  background: #000;
}

.video-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* Sobrescreve max-width do VideoPlayer para ocupar toda a tela */
.video-container :deep(.vp-wrap) {
  max-width: 100%;
  border-radius: 0;
  flex: 1;
  height: 100%;
}

.cta-area {
  padding: 16px 20px 32px;
  background: #000;
}

.cta-btn {
  width: 100%;
  height: 58px;
  background: #22c55e;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 24px rgba(34,197,94,0.5);
  transition: transform 0.15s, box-shadow 0.15s;
}
.cta-btn:active { transform: scale(0.98); }

/* Animação de entrada do botão */
.cta-pop-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cta-pop-enter-from { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>
