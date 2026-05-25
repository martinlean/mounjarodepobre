<template>
  <ScreenShell>
    <h1 class="title">Como o seu peso <strong>impacta sua vida</strong>?</h1>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.label"
        :icon="opt.icon"
        :title="opt.label"
        :selected="state.impactoVida === opt.label"
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
  { icon: '📷', label: 'Evito tirar fotos porque tenho vergonha' },
  { icon: '💔', label: 'Meu parceiro não me olha mais com desejo como antes' },
  { icon: '😔', label: 'Evito encontros sociais porque não me sinto bem comigo mesma.' },
  { icon: '👋', label: 'Nenhuma das opções.' },
]

function pick(label) {
  state.impactoVida = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
