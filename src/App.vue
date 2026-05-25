<template>
  <div class="app-wrapper">
    <div class="app-container">

      <!-- Tela de intro: sem logo, fundo escuro, só vídeo -->
      <Transition name="slide" mode="out-in">
        <Screen00 v-if="showIntro" key="intro" @start="startQuiz" />

        <!-- Quiz + Tela final -->
        <div v-else key="quiz" class="quiz-wrap">
          <!-- Logo e barra de progresso apenas nas telas 1-19 -->
          <template v-if="currentScreen < TOTAL_SCREENS">
            <AppLogo />
            <ProgressBar
              :current="currentScreen"
              :total="TOTAL_SCREENS - 2"
            />
          </template>

          <Transition name="slide" mode="out-in">
            <component :is="screens[currentScreen - 1]" :key="currentScreen" />
          </Transition>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide } from 'vue'
import AppLogo from './components/AppLogo.vue'
import ProgressBar from './components/ProgressBar.vue'

import Screen00 from './screens/Screen00.vue'
import Screen01 from './screens/Screen01.vue'
import Screen02 from './screens/Screen02.vue'
import Screen03 from './screens/Screen03.vue'
import Screen04 from './screens/Screen04.vue'
import Screen05 from './screens/Screen05.vue'
import Screen06 from './screens/Screen06.vue'
import Screen07 from './screens/Screen07.vue'
import Screen08 from './screens/Screen08.vue'
import Screen09 from './screens/Screen09.vue'
import Screen10 from './screens/Screen10.vue'
import Screen11 from './screens/Screen11.vue'
import Screen12 from './screens/Screen12.vue'
import Screen13 from './screens/Screen13.vue'
import Screen14 from './screens/Screen14.vue'
import Screen15 from './screens/Screen15.vue'
import Screen16 from './screens/Screen16.vue'
import Screen17 from './screens/Screen17.vue'
import Screen18 from './screens/Screen18.vue'
import Screen19 from './screens/Screen19.vue'
import Screen20 from './screens/Screen20.vue'

const screens = [
  Screen01, Screen02, Screen03, Screen04, Screen05,
  Screen06, Screen07, Screen08, Screen09, Screen10,
  Screen11, Screen12, Screen13, Screen14, Screen15,
  Screen16, Screen17, Screen18, Screen19, Screen20,
]

const TOTAL_SCREENS = screens.length
const showIntro = ref(true)
const currentScreen = ref(1)

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

function startQuiz() { showIntro.value = false }

function next() {
  if (currentScreen.value < TOTAL_SCREENS) currentScreen.value++
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

provide('state', state)
provide('next', next)
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
.quiz-wrap { display: flex; flex-direction: column; flex: 1; }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from { opacity: 0; transform: translateX(30px); }
.slide-leave-to { opacity: 0; transform: translateX(-30px); }
</style>
