<template>
  <ScreenShell>
    <div class="transition-screen">
      <p class="small-label">Nosso protocolo</p>
      <h1 class="title">Resolve isso para você!</h1>

      <div class="cycle-diagram">
        <div class="cycle-center">
          <img src="/images/logo.jpeg" alt="Mounjaro de Pobre" class="cycle-logo" />
        </div>
        <div class="cycle-node node-top">Você</div>
        <div class="cycle-node node-right">Ativa Hormônio<br>Assassino de<br>Gordura</div>
        <div class="cycle-node node-bottom">Seu Objetivo ✅</div>
        <svg class="cycle-arrows" viewBox="0 0 200 200">
          <defs>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#22c55e"/>
            </marker>
          </defs>
          <path d="M100,30 A75,75 0 0,1 175,100" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4,3"/>
          <path d="M175,100 A75,75 0 0,1 100,175" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4,3"/>
          <path d="M100,175 A75,75 0 0,1 25,100" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4,3"/>
          <path d="M25,100 A75,75 0 0,1 100,30" fill="none" stroke="#22c55e" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4,3"/>
        </svg>
      </div>

      <div class="highlight-box">
        <p>
          O Mounjaro de Pobre age enquanto você dorme, ativando seu
          <strong>hormônio destruidor de gordura</strong> e
          <strong>perdendo peso de forma acelerada</strong>!
        </p>
      </div>
    </div>
    <template #footer>
      <AppButton @click="next">Continuar</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import AppButton from '../components/AppButton.vue'
import { inject } from 'vue'
const next = inject('next')
</script>

<style scoped>
.transition-screen { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; }
.small-label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }
.title { font-size: 26px; font-weight: 800; color: #22c55e; }
.cycle-diagram {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 8px auto;
}
.cycle-arrows { position: absolute; inset: 0; width: 100%; height: 100%; }
.cycle-center {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #f0fdf4;
  border: 2px solid #22c55e;
  border-radius: 50%;
  width: 80px; height: 80px;
  display: flex;
  align-items: center; justify-content: center;
  z-index: 2;
}
.cycle-logo { width: 60px; height: 60px; object-fit: contain; border-radius: 50%; }
.cycle-node {
  position: absolute;
  background: #22c55e;
  color: #fff;
  border-radius: 8px;
  padding: 6px 8px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
  z-index: 2;
}
.node-top { top: 0; left: 50%; transform: translateX(-50%); }
.node-right { top: 50%; right: 0; transform: translateY(-50%); }
.node-bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
.highlight-box {
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  border-radius: 8px;
  padding: 14px 16px;
  text-align: left;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
}
.highlight-box strong { color: #22c55e; }
</style>
