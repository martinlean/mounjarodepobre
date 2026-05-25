<template>
  <ScreenShell>
    <h1 class="title">Quantas <strong>horas de sono</strong> você tem por noite?</h1>
    <p class="subtitle">A qualidade do seu sono impacta diretamente no seu emagrecimento!</p>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.label"
        :icon="opt.icon"
        :title="opt.label"
        :selected="state.sono === opt.label"
        @select="pick(opt.label)"
      />
    </div>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import OptionCard from '../components/OptionCard.vue'
import { inject } from 'vue'

const state = inject('state')
const next = inject('next')

const options = [
  { icon: '😟', label: 'Menos de 5 horas' },
  { icon: '🤔', label: 'Entre 5 e 7 horas' },
  { icon: '🥰', label: 'Entre 7 e 9 horas' },
  { icon: '😐', label: 'Mais de 9 horas' },
]

function pick(label) {
  state.sono = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
