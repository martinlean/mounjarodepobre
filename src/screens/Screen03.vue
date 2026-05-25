<template>
  <ScreenShell>
    <h1 class="title">Em que área do seu corpo você gostaria de <strong>reduzir mais gordura</strong>?</h1>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt"
        :title="opt"
        :selected="state.areaGordura === opt"
        @select="pick(opt)"
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
  'Região dos Culotes',
  'Região das Coxas',
  'Região do Abdômen (barriga)',
  'Região dos Glúteos',
  'Região dos Braços',
]

function pick(opt) {
  state.areaGordura = opt
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
