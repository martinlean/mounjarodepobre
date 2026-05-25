<template>
  <div class="vp-wrap">
    <video
      ref="videoEl"
      class="vp-video"
      playsinline
      autoplay
      muted
      controls
      @timeupdate="onTime"
      @ended="onEnded"
      @loadedmetadata="onMeta"
    />

    <!-- Botão de ativar som (aparece enquanto estiver muted) -->
    <button v-if="isMuted && !finished" class="unmute-btn" @click="unmute">
      🔇 Toque para ativar o som
    </button>

    <!-- Badge progresso circular (acima dos controles nativos) -->
    <div v-if="!finished && duration > 0" class="vp-badge">
      <svg class="vp-ring" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3.5"/>
        <circle
          cx="20" cy="20" r="16" fill="none"
          stroke="#22c55e" stroke-width="3.5"
          stroke-dasharray="100.5"
          :stroke-dashoffset="100.5 * (1 - watchProgress)"
          stroke-linecap="round"
          transform="rotate(-90 20 20)"
          style="transition: stroke-dashoffset 0.5s linear"
        />
      </svg>
      <span class="vp-badge-text">{{ remainingLabel }}</span>
    </div>

    <div v-if="finished" class="vp-done">✅ Vídeo assistido!</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import mpegts from 'mpegts.js'

const props = defineProps({
  src: { type: String, required: true },
})
const emit = defineEmits(['complete'])

const videoEl     = ref(null)
const currentTime = ref(0)
const duration    = ref(0)
const finished    = ref(false)
const isMuted     = ref(true)

const isKnownDuration = computed(() =>
  duration.value > 0 && isFinite(duration.value)
)

const watchProgress = computed(() =>
  isKnownDuration.value ? Math.min(1, currentTime.value / duration.value) : 0
)

const remainingLabel = computed(() => {
  if (!isKnownDuration.value) {
    // Duração desconhecida (TS stream): mostra tempo assistido
    const t = Math.floor(currentTime.value)
    if (t >= 60) return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
    return `${t}s ▶`
  }
  const rem = Math.max(0, Math.ceil(duration.value - currentTime.value))
  if (rem >= 3600) return `${Math.floor(rem / 3600)}h${String(Math.floor((rem % 3600) / 60)).padStart(2, '0')}m`
  if (rem >= 60)   return `${Math.floor(rem / 60)}:${String(rem % 60).padStart(2, '0')}`
  return `${rem}s`
})

let player = null

onMounted(() => {
  const video = videoEl.value
  if (!video) return

  if (mpegts && mpegts.isSupported()) {
    player = mpegts.createPlayer(
      { type: 'mpegts', url: props.src, isLive: false },
      { enableWorker: false, lazyLoadMaxDuration: 180, seekType: 'range' }
    )
    player.attachMediaElement(video)
    player.load()
    player.play()
    player.on(mpegts.Events.ERROR, (errType, errDetail) => {
      console.warn('[VideoPlayer] mpegts error:', errType, errDetail)
      // fallback: src direto (Safari)
      video.src = props.src
      video.load()
      video.play()
    })
  } else {
    // Fallback nativo (Safari suporta video/mp2t diretamente)
    video.src = props.src
    video.load()
    video.play()
  }
})

onUnmounted(() => {
  if (player) { player.destroy(); player = null }
})

function onMeta() { duration.value = videoEl.value?.duration || 0 }
function onTime()  { currentTime.value = videoEl.value?.currentTime || 0 }
function onEnded() { finished.value = true; emit('complete') }

function unmute() {
  const video = videoEl.value
  if (!video) return
  video.muted = false
  isMuted.value = false
}
</script>

<style scoped>
.vp-wrap {
  position: relative;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
  background: #0a0a0a;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 9/16;
}
.vp-video {
  width: 100%; height: 100%;
  display: block; object-fit: cover;
}
.vp-badge {
  position: absolute; bottom: 48px; right: 10px;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: rgba(0,0,0,0.7); border-radius: 10px; padding: 5px 7px;
  z-index: 20; pointer-events: none;
}
.vp-ring { width: 34px; height: 34px; }
.vp-badge-text { font-size: 10px; font-weight: 700; color: #fff; }
.vp-done {
  position: absolute; bottom: 48px; right: 10px;
  background: #22c55e; color: #fff;
  font-size: 12px; font-weight: 700;
  padding: 5px 10px; border-radius: 8px;
  z-index: 20; pointer-events: none;
}

.unmute-btn {
  position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,0.75); color: #fff;
  font-size: 13px; font-weight: 700; font-family: inherit;
  border: 1px solid rgba(255,255,255,0.3); border-radius: 99px;
  padding: 8px 18px; cursor: pointer; z-index: 30;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  animation: pulse-unmute 2s ease-in-out infinite;
}
@keyframes pulse-unmute {
  0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
  50%       { opacity: 0.8; transform: translateX(-50%) scale(1.04); }
}
</style>
