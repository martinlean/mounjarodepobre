import { createRouter, createWebHistory } from 'vue-router'

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

// Preserva UTMs ao navegar entre rotas
function keepUtms(to, from) {
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const missing = UTM_KEYS.some(k => !(k in to.query))
  const hasFromUtm = UTM_KEYS.some(k => k in from.query)
  if (missing && hasFromUtm) {
    const utms = {}
    UTM_KEYS.forEach(k => { if (from.query[k]) utms[k] = from.query[k] })
    return { ...to, query: { ...to.query, ...utms } }
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    { path: '/',          name: 'intro',     component: Screen00 },
    { path: '/quiz/1',    name: 'step-1',    component: Screen01 },
    { path: '/quiz/2',    name: 'step-2',    component: Screen02 },
    { path: '/quiz/3',    name: 'step-3',    component: Screen03 },
    { path: '/quiz/4',    name: 'step-4',    component: Screen04 },
    { path: '/quiz/5',    name: 'step-5',    component: Screen05 },
    { path: '/quiz/6',    name: 'step-6',    component: Screen06 },
    { path: '/quiz/7',    name: 'step-7',    component: Screen07 },
    { path: '/quiz/8',    name: 'step-8',    component: Screen08 },
    { path: '/quiz/9',    name: 'step-9',    component: Screen09 },
    { path: '/quiz/10',   name: 'step-10',   component: Screen10 },
    { path: '/quiz/11',   name: 'step-11',   component: Screen11 },
    { path: '/quiz/12',   name: 'step-12',   component: Screen12 },
    { path: '/quiz/13',   name: 'step-13',   component: Screen13 },
    { path: '/quiz/14',   name: 'step-14',   component: Screen14 },
    { path: '/quiz/15',   name: 'step-15',   component: Screen15 },
    { path: '/quiz/16',   name: 'step-16',   component: Screen16 },
    { path: '/quiz/17',   name: 'step-17',   component: Screen17 },
    { path: '/quiz/18',   name: 'step-18',   component: Screen18 },
    { path: '/quiz/19',   name: 'step-19',   component: Screen19 },
    { path: '/resultado', name: 'resultado',  component: Screen20 },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(keepUtms)

export default router
