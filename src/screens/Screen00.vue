<template>
  <div class="intro-wrap">
    <div class="video-container">
      <iframe
        ref="iframeRef"
        src="https://play.tynk.ai/p/551cee9b-e408-4068-921f-2b40f912d168"
        class="tynk-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
      />
    </div>

    <!-- Botão aparece somente após o vídeo terminar -->
    <Transition name="cta-pop">
      <div v-show="done" class="cta-area">
        <button class="cta-btn" @click="startQuiz">
          QUERO A RECEITA! 🌿
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const startQuiz = inject('startQuiz')
const done = ref(false)
const iframeRef = ref(null)

const VIDEO_DURATION = 7 * 60 + 20 // 7min 20s = 440s

let timer = null

onMounted(() => {
  timer = setTimeout(() => { done.value = true }, VIDEO_DURATION * 1000)
})

onUnmounted(() => clearTimeout(timer))
</script>

<style scoped>
.intro-wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #000;
}

.video-container {
  flex: 1;
  display: flex;
  align-items: stretch;
}

.tynk-iframe {
  width: 100%;
  aspect-ratio: 9 / 16;
  border: 0;
  display: block;
  flex: 1;
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

.cta-pop-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cta-pop-enter-from { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>
