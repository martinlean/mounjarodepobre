<template>
  <ScreenShell>
    <h1 class="title">
      Baseado nas suas respostas, identificamos sinais de desaceleração metabólica — veja o
      diagnóstico do seu corpo e como o
      <strong>Mounjaro de Pobre</strong> está transformando vidas!
    </h1>

    <!-- IMC Card redesenhado -->
    <div class="imc-card">
      <p class="imc-heading">Índice de Massa Corporal (IMC)</p>
      <div class="imc-top-row">
        <span class="imc-val-text">Seu IMC é <strong>{{ imc }}</strong></span>
        <span class="zona-badge">⚠️ Zona de Alerta</span>
      </div>

      <div class="imc-bar-wrap">
        <div class="imc-bar">
          <div class="imc-zone" style="background:#93c5fd;flex:1" />
          <div class="imc-zone" style="background:#86efac;flex:1.4" />
          <div class="imc-zone" style="background:#fbbf24;flex:1" />
          <div class="imc-zone" style="background:#f87171;flex:1" />
        </div>
        <!-- marcador -->
        <div class="imc-marker-wrap" :style="{ left: markerPos + '%' }">
          <div class="imc-tooltip">Você está<br>aqui!</div>
          <div class="imc-marker-pin" />
        </div>
      </div>

      <div class="imc-labels">
        <span>Abaixo do Peso</span>
        <span>Normal</span>
        <span>Sobrepeso</span>
        <span>Obesidade</span>
      </div>
    </div>

    <!-- Alerta -->
    <div class="alert-card">
      <p class="alert-title">Com base nas suas respostas, seu corpo revela que está entrando na <strong>zona de desaceleração metabólica!</strong></p>
      <p class="alert-body">
        Isso significa que, mesmo comendo pouco, você pode estar acumulando gordura nas áreas
        mais teimosas (barriga, braços e coxas)
      </p>
    </div>

    <!-- Sinais -->
    <div class="signals-card">
      <p class="signals-title">Alguns sinais de alerta:</p>
      <ul class="signals-list">
        <li v-for="s in signals" :key="s">
          <span class="sx">❌</span><span>{{ s }}</span>
        </li>
      </ul>
    </div>

    <!-- Solução -->
    <div class="solution-card">
      <p class="solution-title">Com a receita Personalizada do <strong>Mounjaro de Pobre</strong> para você:</p>
      <p class="solution-body">
        Seu corpo irá acelerar a queima de gordura naturalmente ativando o
        <strong>Hormônio Destruidor de Gordura!</strong><br><br>
        A combinação ideal de ingredientes vai ativar seu metabolismo, "acordando" o hormônio
        responsável pela queima de gordura, fazendo seu corpo <strong>derreter gordura no automático
        mesmo enquanto você dorme.</strong><br><br>
        O Mounjaro de Pobre tem transformado vidas de milhares de mulheres e a sua será a próxima!
      </p>
    </div>

    <!-- Depoimento / Transformação -->
    <div class="transformation-card">
      <p class="transf-title">Veja a transformação! 🔥</p>
      <div class="before-after-gallery">
        <img :src="'/images/final/antes_depois1.webp'" alt="Antes e Depois 1" class="ba-img" />
        <img :src="'/images/final/antes_depois2.webp'" alt="Antes e Depois 2" class="ba-img" />
      </div>
      <div class="testimonial">
        <div class="t-header">
          <div class="t-avatar">JO</div>
          <div>
            <p class="t-name">Jéssica Oliveira</p>
            <p class="t-city">São Paulo, SP</p>
          </div>
          <div class="t-stars">⭐⭐⭐⭐⭐</div>
        </div>
        <p class="t-text">
          "Não acreditava que ia funcionar, mas em 3 semanas já vi diferença na barriga!
          Perdi 9kg usando o Mounjaro de Pobre direitinho, me sinto uma nova pessoa! 🌿"
        </p>
      </div>
    </div>

    <template #footer>
      <AppButton @click="next">Continuar →</AppButton>
    </template>
  </ScreenShell>
</template>

<script setup>
import ScreenShell from '../components/ScreenShell.vue'
import AppButton from '../components/AppButton.vue'
import { inject, computed } from 'vue'

const state = inject('state')
const next = inject('next')

const imc = computed(() => {
  const h = (state.altura || 160) / 100
  const w = state.pesoAtual || 75
  return (w / (h * h)).toFixed(1)
})

// Mapeia IMC 15-40 para 0-100% na barra
const markerPos = computed(() => {
  const v = parseFloat(imc.value)
  const min = 15, max = 40
  return Math.min(96, Math.max(4, ((v - min) / (max - min)) * 100))
})

const signals = [
  'Metabolismo lento e difícil para emagrecer mesmo comendo pouco. (Hormônio Destruidor de gordura desligado)',
  'Cansaço constante e sensação de inchaço.',
  'Acúmulo de gordura em áreas específicas do corpo, principalmente na barriga.',
]
</script>

<style scoped>
.title { font-size: 15px; color: #374151; line-height: 1.6; }
.title strong { color: #22c55e; }

/* IMC */
.imc-card {
  background: #fff; border: 1px solid #e5e7eb;
  border-radius: 16px; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.imc-heading { font-size: 15px; font-weight: 700; color: #1a1a1a; text-align: center; }
.imc-top-row { display: flex; align-items: center; justify-content: space-between; }
.imc-val-text { font-size: 14px; color: #374151; }
.imc-val-text strong { font-size: 16px; color: #1a1a1a; }
.zona-badge {
  background: #fffbeb; border: 1px solid #fbbf24;
  color: #b45309; font-size: 12px; font-weight: 700;
  padding: 4px 10px; border-radius: 20px;
}

.imc-bar-wrap { position: relative; padding-top: 44px; padding-bottom: 0; }
.imc-bar {
  display: flex; height: 20px; border-radius: 10px; overflow: hidden;
}
.imc-zone { height: 100%; }

.imc-marker-wrap {
  position: absolute; top: 0;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0;
}
.imc-tooltip {
  background: #1a1a1a; color: #fff;
  font-size: 11px; font-weight: 700; text-align: center; line-height: 1.3;
  padding: 5px 10px; border-radius: 8px;
  white-space: nowrap;
  position: relative;
}
.imc-tooltip::after {
  content: '';
  position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1a1a1a;
  border-bottom: none;
}
.imc-marker-pin {
  width: 3px; height: 28px;
  background: #1a1a1a;
  border-radius: 2px;
  margin-top: 2px;
}

.imc-labels {
  display: flex; justify-content: space-between;
  font-size: 10px; color: #6b7280; padding: 0 2px;
  margin-top: 4px;
}

/* Alert */
.alert-card {
  background: #fffbeb; border: 1px solid #fbbf24;
  border-radius: 12px; padding: 14px;
  display: flex; flex-direction: column; gap: 8px;
}
.alert-title { font-size: 14px; color: #92400e; line-height: 1.5; }
.alert-title strong { color: #b45309; }
.alert-body { font-size: 13px; color: #78350f; line-height: 1.5; }

/* Signals */
.signals-card {
  background: #fff5f5; border: 1px solid #fecaca;
  border-radius: 12px; padding: 14px;
}
.signals-title { font-size: 14px; font-weight: 700; color: #dc2626; margin-bottom: 10px; }
.signals-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.signals-list li { display: flex; gap: 8px; font-size: 13px; color: #374151; line-height: 1.4; }
.sx { flex-shrink: 0; }

/* Solution */
.solution-card {
  background: #f0fdf4; border: 1px solid #bbf7d0;
  border-radius: 12px; padding: 14px;
}
.solution-title { font-size: 14px; font-weight: 700; color: #22c55e; margin-bottom: 8px; }
.solution-title strong { color: #16a34a; }
.solution-body { font-size: 13px; color: #374151; line-height: 1.7; }
.solution-body strong { color: #16a34a; }

/* Transformation */
.transformation-card {
  background: #f9fafb; border-radius: 16px; padding: 16px;
  display: flex; flex-direction: column; gap: 14px;
}
.transf-title { font-size: 16px; font-weight: 800; color: #1a1a1a; text-align: center; }

.before-after-gallery { display: flex; flex-direction: column; gap: 10px; }
.ba-img { width: 100%; height: auto; display: block; border-radius: 12px; }

.testimonial { display: flex; flex-direction: column; gap: 10px; }
.t-header { display: flex; align-items: center; gap: 10px; }
.t-avatar {
  width: 42px; height: 42px; background: #22c55e; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; flex-shrink: 0;
}
.t-name { font-weight: 700; font-size: 14px; }
.t-city { font-size: 12px; color: #6b7280; }
.t-stars { margin-left: auto; font-size: 14px; }
.t-text { font-size: 13px; color: #374151; line-height: 1.6; font-style: italic; }
</style>
