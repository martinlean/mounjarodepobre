<template>
  <div class="ruler-wrap">
    <div class="big-value">{{ modelValue }} <span class="unit">{{ unit }}</span></div>

    <!-- Área da régua com indicador central fixo -->
    <div class="ruler-area">
      <div class="ruler-container" ref="rulerRef" @scroll="onScroll">
        <div class="ruler-inner" :style="{ width: totalWidth + 'px' }">
          <div
            v-for="tick in ticks"
            :key="tick.val"
            class="tick"
            :class="{ major: tick.major, active: tick.val === modelValue }"
            :style="{ left: tick.x + 'px' }"
          >
            <div class="tick-line" />
            <span v-if="tick.major" class="tick-label">{{ tick.val }}</span>
          </div>
        </div>
      </div>
      <!-- Indicador central fixo — posicionado relativo a ruler-area -->
      <div class="ruler-indicator" />
    </div>

    <p class="ruler-hint">← Arraste para selecionar →</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: Number,
  min: { type: Number, default: 40 },
  max: { type: Number, default: 200 },
  step: { type: Number, default: 1 },
  unit: { type: String, default: 'kg' },
})
const emit = defineEmits(['update:modelValue'])

const rulerRef = ref(null)
const PX_PER_UNIT = 8
const PADDING = 160

const totalWidth = computed(() => (props.max - props.min) * PX_PER_UNIT + PADDING * 2)

const ticks = computed(() => {
  const arr = []
  for (let v = props.min; v <= props.max; v++) {
    arr.push({
      val: v,
      x: PADDING + (v - props.min) * PX_PER_UNIT,
      major: v % 10 === 0,
    })
  }
  return arr
})

function valueToScroll(val) {
  return PADDING + (val - props.min) * PX_PER_UNIT - (rulerRef.value?.clientWidth ?? 320) / 2
}

function scrollToValue(val, smooth = false) {
  if (!rulerRef.value) return
  rulerRef.value.scrollTo({ left: valueToScroll(val), behavior: smooth ? 'smooth' : 'auto' })
}

function onScroll() {
  const el = rulerRef.value
  if (!el) return
  const center = el.scrollLeft + el.clientWidth / 2
  const raw = (center - PADDING) / PX_PER_UNIT + props.min
  const snapped = Math.round(raw / props.step) * props.step
  const clamped = Math.min(props.max, Math.max(props.min, snapped))
  if (clamped !== props.modelValue) emit('update:modelValue', clamped)
}

onMounted(() => scrollToValue(props.modelValue))

// Quando min/max mudam (troca de unidade), aguarda o DOM atualizar e reposiciona
watch([() => props.min, () => props.max], () => {
  nextTick(() => scrollToValue(props.modelValue))
})

// Quando o valor muda externamente (ex: digitação), reposiciona suavemente
watch(() => props.modelValue, (v) => {
  const el = rulerRef.value
  if (!el) return
  const expectedScroll = valueToScroll(v)
  if (Math.abs(el.scrollLeft - expectedScroll) > PX_PER_UNIT * 2) {
    scrollToValue(v, true)
  }
})
</script>

<style scoped>
.ruler-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  user-select: none;
  width: 100%;
}

.big-value {
  font-size: 52px;
  font-weight: 800;
  color: #22c55e;
  line-height: 1;
}
.unit { font-size: 22px; font-weight: 600; color: #6b7280; }

/* Wrapper que posiciona o indicador corretamente */
.ruler-area {
  position: relative;
  width: 100%;
}

.ruler-container {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 64px;
  scrollbar-width: none;
}
.ruler-container::-webkit-scrollbar { display: none; }

.ruler-inner { position: relative; height: 100%; }

.tick {
  position: absolute;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-50%);
}
.tick-line {
  width: 2px;
  height: 16px;
  background: #d1d5db;
  border-radius: 2px;
}
.tick.major .tick-line { height: 28px; background: #9ca3af; }
.tick.active .tick-line { background: #22c55e; width: 3px; }
.tick-label { font-size: 10px; color: #9ca3af; margin-top: 4px; }

/* Indicador central — absoluto sobre a régua, não interfere no layout */
.ruler-indicator {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 64px;
  background: #22c55e;
  border-radius: 2px;
  pointer-events: none;
  z-index: 2;
}

.ruler-hint { font-size: 12px; color: #9ca3af; }
</style>
