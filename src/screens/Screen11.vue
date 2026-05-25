<template>
  <ScreenShell>
    <h1 class="title">Qual é o seu <strong>peso atual</strong>?</h1>
    <p class="subtitle">Estamos quase lá! Vamos ajustar seu plano de acordo com seu corpo.</p>

    <div class="toggle-row">
      <button :class="['toggle-btn', unit === 'kg' && 'active']" @click="setUnit('kg')">kg</button>
      <button :class="['toggle-btn', unit === 'lb' && 'active']" @click="setUnit('lb')">lb</button>
    </div>

    <RulerSlider
      v-model="displayValue"
      :min="unitMin"
      :max="unitMax"
      :unit="unit"
    />

    <p class="note">
      Com base nisso, ajustaremos a dosagem ideal para os melhores resultados!
    </p>
    <template #footer>
      <AppButton @click="submit">Continuar</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import AppButton from '../components/AppButton.vue'
import RulerSlider from '../components/RulerSlider.vue'
import { ref, computed, inject } from 'vue'

const state = inject('state')
const next = inject('next')
const unit = ref('kg')
const displayValue = ref(state.pesoAtual || 75)

const unitMin = computed(() => unit.value === 'kg' ? 40 : 88)
const unitMax = computed(() => unit.value === 'kg' ? 150 : 330)

function setUnit(u) {
  if (u === unit.value) return
  if (u === 'lb') displayValue.value = Math.round(displayValue.value * 2.205)
  else displayValue.value = Math.round(displayValue.value / 2.205)
  unit.value = u
}

function submit() {
  state.pesoAtual = unit.value === 'kg' ? displayValue.value : Math.round(displayValue.value / 2.205)
  next()
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.toggle-row { display: flex; gap: 8px; align-self: center; }
.toggle-btn {
  padding: 8px 28px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.18s;
}
.toggle-btn.active { background: #22c55e; border-color: #22c55e; color: #fff; }
.note { font-size: 13px; color: #6b7280; text-align: center; padding: 0 8px; line-height: 1.5; }
</style>
