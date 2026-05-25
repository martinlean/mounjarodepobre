<template>
  <ScreenShell>
    <h1 class="title"><strong>Quais benefícios</strong> você gostaria de ter?</h1>
    <p class="subtitle">👉 Vamos personalizar sua fórmula para maximizar os resultados.</p>
    <div class="options">
      <OptionCard
        v-for="opt in options"
        :key="opt"
        icon="➡️"
        :title="opt"
        :selected="state.beneficios.includes(opt)"
        :multi="true"
        @select="toggle(opt)"
      />
    </div>
    <template #footer>
      <AppButton :disabled="state.beneficios.length === 0" @click="next">Continuar</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import OptionCard from '../components/OptionCard.vue'
import AppButton from '../components/AppButton.vue'
import { inject } from 'vue'

const state = inject('state')
const next = inject('next')

const options = [
  'Emagrecer sem esforço e sem efeito sanfona',
  'Sono mais profundo',
  'Mais energia e disposição ao longo do dia',
  'Aumento da autoestima e confiança',
  'Redução do estresse e ansiedade',
]

function toggle(opt) {
  const idx = state.beneficios.indexOf(opt)
  if (idx === -1) state.beneficios.push(opt)
  else state.beneficios.splice(idx, 1)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.options { display: flex; flex-direction: column; gap: 10px; }
</style>
