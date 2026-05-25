<template>
  <ScreenShell>
    <h1 class="title">Qual é a <strong>sua altura</strong>?</h1>
    <p class="subtitle">Isso nos ajudará a calcular a quantidade exata de Mounjaro de Pobre para seu corpo.</p>

    <div class="toggle-row">
      <button :class="['toggle-btn', unit === 'cm' && 'active']" @click="setUnit('cm')">cm</button>
      <button :class="['toggle-btn', unit === 'pol' && 'active']" @click="setUnit('pol')">pol</button>
    </div>

    <RulerSlider
      v-model="displayValue"
      :min="unitMin"
      :max="unitMax"
      :unit="unit"
    />

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
const unit = ref('cm')
const displayValue = ref(state.altura || 160)

const unitMin = computed(() => unit.value === 'cm' ? 140 : 55)
const unitMax = computed(() => unit.value === 'cm' ? 200 : 79)

function setUnit(u) {
  if (u === unit.value) return
  if (u === 'pol') displayValue.value = Math.round(displayValue.value / 2.54)
  else displayValue.value = Math.round(displayValue.value * 2.54)
  unit.value = u
}

function submit() {
  state.altura = unit.value === 'cm' ? displayValue.value : Math.round(displayValue.value * 2.54)
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
</style>
