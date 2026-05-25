<template>
  <ScreenShell>
    <h1 class="title">Como é <strong>o seu dia a dia</strong>?</h1>
    <p class="subtitle">Sua rotina diária também faz diferença!</p>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.label"
        :icon="opt.icon"
        :title="opt.label"
        :selected="state.rotina === opt.label"
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
  { icon: '😤', label: 'Trabalho fora e tenho uma rotina agitada' },
  { icon: '🤔', label: 'Trabalhar em casa e ter uma rotina flexível' },
  { icon: '🥰', label: 'Fico em casa cuidando da família' },
  { icon: '😐', label: 'Outro' },
]

function pick(label) {
  state.rotina = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
