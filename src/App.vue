<template>
  <div class="app-wrapper">
    <div class="app-container">

      <!-- Logo e progresso apenas nas telas do quiz (1-19) -->
      <template v-if="isQuizStep">
        <AppLogo />
        <ProgressBar :current="currentStep" :total="TOTAL_QUIZ_STEPS" />
      </template>

      <Transition name="slide" mode="out-in">
        <RouterView :key="route.path" />
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLogo from './components/AppLogo.vue'
import ProgressBar from './components/ProgressBar.vue'

const router = useRouter()
const route  = useRoute()

const TOTAL_QUIZ_STEPS = 19  // telas 1-19 (screen20 = resultado)

// Passo atual baseado no nome da rota (ex: 'step-5' → 5)
const currentStep = computed(() => {
  const name = route.name ?? ''
  if (!name.startsWith('step-')) return 0
  return parseInt(name.replace('step-', '')) || 0
})

// Exibe logo/barra apenas em /quiz/1 … /quiz/19
const isQuizStep = computed(() =>
  route.name?.startsWith('step-')
)

// Estado global do quiz
const state = reactive({
  nome: '',
  quilosPerder: '',
  corpoAtual: '',
  areaGordura: '',
  impactoVida: '',
  aparencia: '',
  impedimento: '',
  beneficios: [],
  pesoAtual: 75,
  altura: 160,
  pesoObjetivo: 65,
  rotina: '',
  sono: '',
  agua: '',
  corpoSonhos: '',
})

// Navega para a próxima etapa preservando UTMs
function next() {
  const utms = getUtms()
  const step = currentStep.value

  if (step >= 1 && step < TOTAL_QUIZ_STEPS) {
    router.push({ name: `step-${step + 1}`, query: utms })
  } else if (step === TOTAL_QUIZ_STEPS) {
    router.push({ name: 'resultado', query: utms })
  } else {
    // fallback: intro → quiz/1
    router.push({ name: 'step-1', query: utms })
  }
}

// Captura UTMs da URL atual (ou sessionStorage como fallback)
function getUtms() {
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const stored = {}
  UTM_KEYS.forEach(k => {
    const val = route.query[k] || sessionStorage.getItem(k)
    if (val) {
      stored[k] = val
      sessionStorage.setItem(k, val)
    }
  })
  return stored
}

// Função chamada pelo Screen00 ao clicar "QUERO A RECEITA!"
function startQuiz() {
  const utms = getUtms()
  router.push({ name: 'step-1', query: utms })
}

provide('state', state)
provide('next', next)
provide('startQuiz', startQuiz)
</script>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #app { height: 100%; }
body { font-family: 'Inter', system-ui, sans-serif; background: #f5f5f5; color: #1a1a1a; }

.app-wrapper {
  min-height: 100%;
  display: flex;
  justify-content: center;
  background: #f0f0f0;
}
.app-container {
  width: 100%;
  max-width: 480px;
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 60px rgba(0,0,0,0.12);
  position: relative;
}

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
