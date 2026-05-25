<template>
  <ScreenShell>
    <h1 class="title">
      Você está realmente <strong class="green">feliz</strong> com
      <strong class="red">sua aparência</strong>?
    </h1>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt.label"
        :icon="opt.icon"
        :title="opt.label"
        :selected="state.aparencia === opt.label"
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
  { icon: '🤡', label: 'Não, porque me sinto acima do peso' },
  { icon: '💔', label: 'Sim, mas sei que posso melhorar minha saúde' },
  { icon: '😔', label: 'Não, gostaria de perder peso para melhorar meu bem-estar' },
]

function pick(label) {
  state.aparencia = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.green { color: #22c55e; }
.red { color: #ef4444; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
