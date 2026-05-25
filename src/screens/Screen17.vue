<template>
  <ScreenShell>
    <h1 class="title">Qual o <strong>corpo</strong> dos <strong>sonhos</strong>?</h1>
    <p class="subtitle">Escolha a opção abaixo:</p>
    <div class="body-grid">
      <button
        v-for="opt in options"
        :key="opt.label"
        class="body-choice"
        :class="{ selected: state.corpoSonhos === opt.label }"
        @click="pick(opt.label)"
      >
        <div class="body-visual">{{ opt.emoji }}</div>
        <span class="body-choice-label">{{ opt.label }}</span>
      </button>
    </div>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import { inject } from 'vue'

const state = inject('state')
const next = inject('next')

const options = [
  { label: 'Em forma', emoji: '🏃‍♀️' },
  { label: 'Natural', emoji: '🧘‍♀️' },
]

function pick(label) {
  state.corpoSonhos = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.subtitle { font-size: 14px; color: #6b7280; }
.body-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.body-choice {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px 12px;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 16px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.18s;
}
.body-choice.selected { background: #dcfce7; border-color: #22c55e; }
.body-visual { font-size: 64px; line-height: 1; }
.body-choice-label { font-size: 15px; font-weight: 600; color: #1a1a1a; }
</style>
