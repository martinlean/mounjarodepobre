<template>
  <ScreenShell>
    <h1 class="title">
      Quantos quilos você <strong>deseja</strong>
      <em style="color:#22c55e"> perder</em>?
    </h1>
    <p class="subtitle">O protocolo Mounjaro de Pobre ajuda a eliminar gordura de forma acelerada.</p>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt"
        :title="opt"
        :selected="state.quilosPerder === opt"
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

const options = ['Até 5 kg', 'De 6 a 10 kg', 'De 11 a 15 kg', 'De 16 a 20 kg', 'Mais de 20 kg']

function pick(opt) {
  state.quilosPerder = opt
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; font-style: italic; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
