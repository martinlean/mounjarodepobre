<template>
  <div class="progress-wrap">
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: percent + '%' }" />
    </div>
    <span class="progress-label">{{ current }} de {{ total }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ current: Number, total: Number })
const percent = computed(() => Math.round((props.current / props.total) * 100))
</script>

<style scoped>
.progress-wrap {
  padding: 0 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.progress-track {
  height: 6px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #22c55e;
  border-radius: 99px;
  transition: width 0.4s cubic-bezier(.4,0,.2,1);
}
.progress-label {
  font-size: 11px;
  color: #9ca3af;
  text-align: right;
}
</style>
