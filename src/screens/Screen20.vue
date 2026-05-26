<template>
  <div class="final-screen">

    <!-- Logo -->
    <div class="logo-wrap">
      <img :src="'/images/logo.jpeg'" alt="Mounjaro de Pobre" class="top-logo" />
    </div>

    <!-- Título -->
    <div class="hero-text">
      <h1 class="hero-title">
        <span class="name-hl">{{ state.nome || 'Você' }}</span>, seu protocolo foi gerado com sucesso!
      </h1>
      <p class="hero-sub">Por favor assista o vídeo abaixo para liberar</p>
    </div>

    <!-- Vídeo final -->
    <div class="video-wrap">
      <iframe
        ref="iframeRef"
        src="https://play.tynk.ai/p/a7aa1c33-ac68-4196-9c5a-8130c0195a81"
        class="tynk-iframe"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        frameborder="0"
      />
    </div>

    <!-- Aviso aguardando vídeo -->
    <div v-if="!ctaUnlocked" class="watch-hint">
      <div class="watch-bar">
        <div class="watch-fill" :style="{ width: videoProgress + '%' }" />
      </div>
      <p class="watch-txt">▶ Assista o vídeo completo para liberar o acesso</p>
    </div>

    <!-- ===================== CONTEÚDO DE VENDAS (só após timer) ===================== -->
    <template v-if="ctaUnlocked">

    <!-- CTA principal -->
    <Transition name="cta-pop" appear>
      <div class="cta-primary">
        <a :href="CTA_URL" target="_blank" class="cta-btn-main">QUERO A RECEITA!</a>
      </div>
    </Transition>

    <!-- Comparação SEM vs COM -->
    <div class="compare-section">
      <div class="compare-header">
        <span class="compare-bad">SEM O MOUNJARO DE POBRE</span>
        <span class="compare-good">COM O MOUNJARO DE POBRE</span>
      </div>
      <div class="compare-bodies">
        <div class="body-col">
          <div class="body-img-wrap bad">
            <img :src="'/images/final/sem_monjaro.webp'" class="body-img" alt="Sem Mounjaro" />
          </div>
          <p class="body-caption bad-txt">Metabolismo lento<br>Hormônios desregulados<br>Sem energia</p>
          <div class="energy-bar-wrap">
            <div class="energy-bar bad-bar" style="width:20%" />
          </div>
        </div>
        <div class="arrow-col"><span class="compare-arrow">›</span></div>
        <div class="body-col">
          <div class="body-img-wrap good">
            <img :src="'/images/final/com_monjaro.webp'" class="body-img" alt="Com Mounjaro" />
          </div>
          <p class="body-caption good-txt">Metabolismo acelerado<br>Hormônios ativos 24h<br>Muita energia</p>
          <div class="energy-bar-wrap">
            <div class="energy-bar good-bar" style="width:100%" />
          </div>
        </div>
      </div>
    </div>

    <!-- Análise do Metabolismo -->
    <div class="section-img-wrap">
      <img :src="'/images/final/analise_metabolismo.webp'" alt="Análise do Metabolismo" class="section-img" />
    </div>

    <!-- Plano Personalizado -->
    <div class="plan-card">
      <h3 class="plan-title">Seu Plano Personalizado <span class="green-hl">Mounjaro de Pobre</span></h3>
      <p class="plan-sub green-hl">
        Baseado nas suas informações pessoais, criamos um protocolo 100% personalizado para você perder de 5 a 20kg nas próximas 3 semanas!
      </p>
      <p class="plan-body">
        O plano contém as <strong>medidas exatas dos ingredientes</strong> para que você aja da melhor forma possível no seu corpo, respeitando sua rotina e o que você gosta de comer.
      </p>
    </div>

    <!-- Você vai receber hoje -->
    <div class="section-img-wrap">
      <img :src="'/images/final/tudo_que_voce_vai_receber.jpg'" alt="Tudo que você vai receber" class="section-img" />
    </div>

    <!-- Bônus Exclusivos -->
    <div class="bonus-card">
      <h3 class="bonus-title">Garantindo Hoje, Você Ainda Recebe <span class="green-hl">Vários Bônus Exclusivos de Presente!</span></h3>
      <p class="bonus-value">(Valor total dos bônus: R$ 347,00)</p>
      <h4 class="bonus-sub">🎁 BÔNUS EXCLUSIVOS:</h4>
      <ul class="bonus-list">
        <li v-for="b in bonusItems" :key="b">✨ {{ b }}</li>
      </ul>
    </div>

    <!-- Oferta especial -->
    <div class="section-img-wrap">
      <img :src="'/images/final/oferta_especial_apenas_hoje.webp'" alt="Oferta Especial Apenas Hoje" class="section-img" />
    </div>

    <!-- Comparativo de custos -->
    <div class="section-img-wrap">
      <img :src="'/images/final/compare_os_custos_para_emagrecer.webp'" alt="Compare os Custos" class="section-img" />
    </div>

    <!-- CTA intermediário -->
    <div class="cta-final">
      <a :href="CTA_URL" target="_blank" class="cta-btn-main">QUERO A RECEITA!</a>
    </div>

    <!-- Selos de confiança -->
    <div class="trust-badges">
      <div class="trust-badge"><span>✅</span><span>Compra<br>SEGURA</span></div>
      <div class="trust-badge"><span>🏅</span><span>Satisfação<br>GARANTIDA</span></div>
      <div class="trust-badge"><span>🔒</span><span>Privacidade<br>PROTEGIDA</span></div>
    </div>

    <!-- Fotos antes/depois -->
    <div class="extra-photos">
      <img :src="'/images/final/antes_depois1.webp'" alt="Antes e Depois 1" class="extra-photo" />
      <img :src="'/images/final/antes_depois2.webp'" alt="Antes e Depois 2" class="extra-photo" />
    </div>

    <!-- Garantia 30 dias -->
    <div class="section-img-wrap">
      <img :src="'/images/final/garantia_30d.webp'" alt="Garantia Total de 30 Dias" class="section-img" />
    </div>

    <!-- Depoimentos -->
    <div class="testimonials-section">
      <h3 class="testimonials-title">⭐ O que nossos clientes estão dizendo</h3>
      <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
        <div class="t-header">
          <div class="t-avatar">{{ t.initials }}</div>
          <div class="t-info">
            <p class="t-name">{{ t.name }}</p>
            <p class="t-city">{{ t.city }}</p>
          </div>
          <div class="t-stars">⭐⭐⭐⭐⭐</div>
        </div>
        <p class="t-text">{{ t.text }}</p>
      </div>
    </div>

    <!-- Jornada de Transformação -->
    <div class="journey-section">
      <h3 class="journey-title">Sua Jornada de Transformação</h3>
      <div v-for="week in journeyWeeks" :key="week.week" class="journey-week">
        <p class="week-label">{{ week.week }}</p>
        <p class="week-text">{{ week.text }}</p>
      </div>
    </div>

    <!-- CTA final -->
    <div class="cta-final cta-last">
      <a :href="CTA_URL" target="_blank" class="cta-btn-main">QUERO A RECEITA!</a>
    </div>

    </template><!-- /v-if="ctaUnlocked" -->

  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue'

const state = inject('state')

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

const CTA_URL = computed(() => {
  const base = 'https://www.hubpay.tech/c/acesso-vitalicio'
  const params = new URLSearchParams()
  UTM_KEYS.forEach(k => {
    const val = sessionStorage.getItem(k)
    if (val) params.set(k, val)
  })
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
})

const iframeRef     = ref(null)
const ctaUnlocked   = ref(false)
const videoProgress = ref(0)

const VIDEO_DURATION = 6 * 60 + 10 // 6min 10s = 370s

let unlockTimer = null
let progressInterval = null

onMounted(() => {
  const start = Date.now()

  // Barra de progresso atualiza a cada segundo
  progressInterval = setInterval(() => {
    const elapsed = (Date.now() - start) / 1000
    videoProgress.value = Math.min(100, (elapsed / VIDEO_DURATION) * 100)
  }, 1000)

  // Botão aparece ao fim do vídeo
  unlockTimer = setTimeout(() => {
    ctaUnlocked.value = true
    videoProgress.value = 100
    clearInterval(progressInterval)
  }, VIDEO_DURATION * 1000)
})

onUnmounted(() => {
  clearTimeout(unlockTimer)
  clearInterval(progressInterval)
})


const testimonials = [
  {
    initials: 'CF',
    name: 'Camila Ferreira, 32 anos',
    city: 'São Paulo, SP',
    text: 'Eu comia uns 10 chocolates por dia e meu apetite mudou completamente. Aquela vontade louca de comer doce à tarde desapareceu como num passe de mágica. Meu marido diz que eu tô pousando outra pessoa e a melhor parte: minha menos de 10 reais nos ingredientes.',
  },
  {
    initials: 'FC',
    name: 'Fernanda Costa, 38 anos',
    city: 'Belo Horizonte, MG',
    text: 'sou mãe de 2 e não tenho tempo para nada. Achei que era mais uma promessa do internet, mas acabei sendo a mais fiel. Meu trabalho ficaram pedindo a receita e meu marido não para de me elogiar: melhor decisão que fiz nessa vida.',
  },
  {
    initials: 'AS',
    name: 'Antônia Souza, 49 anos',
    city: 'Mato Grosso do Sul, MS',
    text: 'depois dos 45 eu desisti que nunca mais ia conseguir emagrecer. Já tinha uma fortuna com nutricionistas e suplementos e nada funcionava. Aí uma amiga me falou sobre o Mounjaro de Pobre, comecei a tomar pensei "lá vou eu de novo perder dinheiro", mas em duas semanas a barriga já tinha diminuído visível. Hoje já perdi mais 9kg ainda.',
  },
]

const journeyWeeks = [
  {
    week: 'Primeira Semana',
    text: 'Você acorda e sente sua calça jeans escorregando pela cintura. Seu apetite já diminuiu significativamente.',
  },
  {
    week: 'Segunda Semana',
    text: 'Seu marido te abraça por trás e sussurra: "Nossa, você é diferente..." com aquele olhar de quando vocês se apaixonaram.',
  },
  {
    week: 'Terceira Semana',
    text: 'Sua amiga converte a conversa quando você chega: "Gente, você fez isso? Isso é IRRECONHECÍVEL!"',
  },
  {
    week: 'Quarta Semana',
    text: 'Você postou aquela foto no biquíni que nunca teve coragem e recebeu MUITOS elogios! 💚',
  },
]
</script>

<style scoped>
.final-screen {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #fff;
  padding-bottom: 40px;
}

/* Logo topo */
.logo-wrap { display: flex; justify-content: center; padding: 16px 0 8px; }
.top-logo { height: 56px; object-fit: contain; }

/* Hero */
.hero-text { padding: 0 20px 12px; text-align: center; }
.hero-title { font-size: 20px; font-weight: 800; color: #1a1a1a; line-height: 1.3; }
.name-hl { color: #22c55e; }
.hero-sub { font-size: 14px; color: #22c55e; font-weight: 600; margin-top: 6px; }

/* Vídeo */
.video-wrap { padding: 0; }
.tynk-iframe {
  width: 100%;
  aspect-ratio: 9 / 16;
  border: 0;
  display: block;
}

/* CTA principal */
.cta-primary { padding: 4px 20px 12px; }
.cta-btn-main {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 58px;
  background: #22c55e;
  color: #fff;
  font-size: 18px; font-weight: 900; font-family: inherit;
  line-height: 1; text-align: center;
  border: none; border-radius: 14px; cursor: pointer;
  text-decoration: none; letter-spacing: 0.5px;
  box-shadow: 0 4px 20px rgba(34,197,94,0.4);
  transition: transform 0.15s, box-shadow 0.15s;
  padding: 0;
}
.cta-btn-main:active { transform: scale(0.98); }

/* Progress hint */
.watch-hint { padding: 4px 20px 16px; display: flex; flex-direction: column; gap: 6px; }
.watch-bar { height: 5px; background: #e5e7eb; border-radius: 99px; overflow: hidden; }
.watch-fill { height: 100%; background: #22c55e; border-radius: 99px; transition: width 1s linear; }
.watch-txt { font-size: 12px; color: #9ca3af; text-align: center; }

/* Comparação */
.compare-section { padding: 20px 16px 0; }
.compare-header {
  display: flex; justify-content: space-between;
  font-size: 11px; font-weight: 800; letter-spacing: 0.3px;
  margin-bottom: 10px;
}
.compare-bad { color: #ef4444; }
.compare-good { color: #22c55e; }
.compare-bodies { display: flex; align-items: flex-start; gap: 6px; }
.body-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.arrow-col { display: flex; align-items: center; padding-top: 60px; }
.compare-arrow { font-size: 32px; color: #d1d5db; font-weight: 900; }
.body-img-wrap {
  width: 100%; border-radius: 12px; overflow: hidden;
  aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center;
}
.body-img-wrap.bad { border: 2px solid #fecaca; background: #fff5f5; }
.body-img-wrap.good { border: 2px solid #bbf7d0; background: #f0fdf4; }
.body-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.body-placeholder { font-size: 56px; }
.body-caption { font-size: 10px; font-weight: 600; text-align: center; line-height: 1.4; }
.bad-txt { color: #ef4444; }
.good-txt { color: #22c55e; }
.energy-bar-wrap { width: 100%; background: #f3f4f6; height: 6px; border-radius: 99px; overflow: hidden; }
.energy-bar { height: 100%; border-radius: 99px; }
.bad-bar { background: #ef4444; }
.good-bar { background: #22c55e; }

/* Imagem de seção genérica */
.section-img-wrap { padding: 0 16px 0; }
.section-img { width: 100%; height: auto; display: block; border-radius: 14px; }

/* Plano */
.plan-card { margin: 0 16px 16px; padding: 16px; background: #f0fdf4; border-radius: 14px; border: 1px solid #bbf7d0; }
.plan-title { font-size: 16px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; line-height: 1.3; }
.plan-sub { font-size: 13px; font-weight: 700; margin-bottom: 8px; line-height: 1.5; }
.plan-body { font-size: 13px; color: #374151; line-height: 1.6; }
.green-hl { color: #22c55e; }

/* Receber */
.receive-card { margin: 0 16px 16px; padding: 16px; background: #f9fafb; border-radius: 14px; }
.receive-title { font-size: 16px; font-weight: 800; color: #1a1a1a; margin-bottom: 12px; }
.receive-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.receive-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: #374151; line-height: 1.5; }
.check-ico { font-size: 16px; flex-shrink: 0; }
.item-desc { color: #6b7280; }

/* Bônus */
.bonus-card { margin: 0 16px 16px; padding: 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 14px; }
.bonus-title { font-size: 15px; font-weight: 800; color: #1a1a1a; line-height: 1.4; margin-bottom: 4px; }
.bonus-value { font-size: 12px; color: #6b7280; margin-bottom: 10px; }
.bonus-sub { font-size: 14px; font-weight: 800; color: #1a1a1a; margin-bottom: 8px; }
.bonus-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.bonus-list li { font-size: 12px; color: #374151; line-height: 1.5; }


/* CTA final */
.cta-final { padding: 8px 16px; }
.cta-last { padding-bottom: 20px; }

/* Trust badges */
.trust-badges { display: flex; justify-content: center; gap: 16px; padding: 16px 16px 8px; }
.trust-badge { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #374151; text-align: center; }
.trust-badge span:first-child { font-size: 22px; }

/* Fotos extras */
.extra-photos { display: flex; flex-direction: column; gap: 12px; padding: 16px 16px 0; }
.extra-photo-wrap { border-radius: 12px; overflow: hidden; }
.extra-photo { width: 100%; height: auto; display: block; border-radius: 12px; }


/* ======= DEPOIMENTOS ======= */
.testimonials-section { padding: 20px 16px 8px; }
.testimonials-title {
  font-size: 17px; font-weight: 800; color: #1a1a1a;
  margin-bottom: 16px; text-align: center;
}
.testimonial-card {
  background: #f9fafb; border-radius: 14px; padding: 14px;
  display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 12px;
  border: 1px solid #e5e7eb;
}
.t-header { display: flex; align-items: center; gap: 10px; }
.t-avatar {
  width: 42px; height: 42px; background: #22c55e; color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 13px; flex-shrink: 0;
}
.t-info { flex: 1; }
.t-name { font-weight: 700; font-size: 13px; color: #1a1a1a; }
.t-city { font-size: 11px; color: #6b7280; }
.t-stars { font-size: 13px; }
.t-text { font-size: 13px; color: #374151; line-height: 1.6; font-style: italic; }

/* ======= JORNADA ======= */
.journey-section { padding: 20px 16px; background: #f0fdf4; margin: 0 16px 8px; border-radius: 16px; border: 1px solid #bbf7d0; }
.journey-title { font-size: 17px; font-weight: 800; color: #1a1a1a; text-align: center; margin-bottom: 16px; }
.journey-week { margin-bottom: 14px; }
.week-label { font-size: 13px; font-weight: 800; color: #16a34a; margin-bottom: 4px; }
.week-text { font-size: 13px; color: #374151; line-height: 1.6; }

/* Animação CTA pop */
.cta-pop-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cta-pop-enter-from { opacity: 0; transform: scale(0.85); }
</style>
