<template>
  <ScreenShell>
    <h1 class="title">
      O que mais te <strong class="green">impede</strong> de
      <strong class="red">emagrecer</strong>?
    </h1>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.title"
        :icon="opt.icon"
        :title="opt.title"
        :subtitle="opt.subtitle"
        :selected="state.impedimento === opt.title"
        @select="pick(opt.title)"
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
  { icon: '🕐', title: 'Falta de tempo', subtitle: 'Rotina agitada.' },
  { icon: '😤', title: 'Autocontrole', subtitle: 'Dificuldade em resistir a tentativas alimentares.' },
  { icon: '💵', title: 'Financeiro', subtitle: 'Encontrar opções saudáveis mais caras do que alimentos processados.' },
]

function pick(title) {
  state.impedimento = title
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.green { color: #22c55e; }
.red { color: #ef4444; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
