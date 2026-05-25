<template>
  <ScreenShell>
    <h1 class="title">Como você classificaria seu <strong>corpo hoje</strong>?</h1>
    <div class="options">
      <button
        v-for="opt in options"
        :key="opt.label"
        class="body-card"
        :class="{ selected: state.corpoAtual === opt.label }"
        @click="pick(opt.label)"
      >
        <span class="body-emoji">{{ opt.emoji }}</span>
        <span class="body-label">{{ opt.label }}</span>
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
  { label: 'Regular', emoji: '🧘‍♀️' },
  { label: 'Flácido', emoji: '😔' },
  { label: 'Sobrepeso', emoji: '🪑' },
]

function pick(label) {
  state.corpoAtual = label
  setTimeout(next, 300)
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; line-height: 1.3; }
.title strong { color: #22c55e; }
.options { display: flex; flex-direction: column; gap: 10px; }
.body-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 16px;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.18s;
}
.body-card.selected { background: #dcfce7; border-color: #22c55e; }
.body-emoji { font-size: 36px; }
.body-label { font-size: 16px; font-weight: 600; color: #1a1a1a; }
</style>
