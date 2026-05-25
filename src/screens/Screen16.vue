<template>
  <ScreenShell>
    <h1 class="title"><strong>Quantos copos de água</strong> você bebe por dia?</h1>
    <p class="subtitle">Seu nível de hidratação também influencia sua perda de peso.</p>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.label"
        :icon="opt.icon"
        :title="opt.label"
        :selected="state.agua === opt.label"
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
  { icon: '☕', label: 'Bebo apenas café ou chá' },
  { icon: '💧', label: '1-2 copos por dia' },
  { icon: '💧', label: '2-6 copos por dia' },
  { icon: '💧', label: 'Mais de 6 copos' },
]

function pick(label) {
  state.agua = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
