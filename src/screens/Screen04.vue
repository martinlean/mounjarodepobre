<template>
  <ScreenShell>
    <h1 class="title">Qual seu nome?</h1>
    <div class="input-wrap">
      <span class="input-icon">👤</span>
      <input
        v-model="localName"
        type="text"
        class="name-input"
        placeholder="Digite seu nome aqui"
        @keyup.enter="submit"
        autocomplete="given-name"
      />
    </div>
    <p class="privacy">
      Para montar seu plano personalizado, precisamos do seu nome.
      Fique tranquila, seus dados estão protegidos 🔒
    </p>
    <template #footer>
      <AppButton :disabled="!localName.trim()" @click="submit">Continuar</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import AppButton from '../components/AppButton.vue'
import { ref, inject } from 'vue'

const state = inject('state')
const next = inject('next')
const localName = ref(state.nome || '')

function submit() {
  if (!localName.value.trim()) return
  state.nome = localName.value.trim()
  next()
}
</script>

<style scoped>
.title { font-size: 22px; font-weight: 700; color: #1a1a1a; }
.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid #bbf7d0;
  border-radius: 12px;
  padding: 14px 16px;
  background: #f0fdf4;
}
.input-icon { font-size: 20px; }
.name-input {
  border: none;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
  flex: 1;
  outline: none;
  color: #1a1a1a;
}
.name-input::placeholder { color: #9ca3af; }
.privacy { font-size: 13px; color: #6b7280; line-height: 1.5; }
</style>
