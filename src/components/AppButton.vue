<template>
  <button
    class="app-btn"
    :class="{ disabled }"
    :disabled="disabled"
    @click="$emit('click')"
    type="button"
  >
    <slot>Continuar</slot>
  </button>
</template>

<script setup>
defineProps({ disabled: Boolean })
defineEmits(['click'])
</script>

<style scoped>
.app-btn {
  width: 100%;
  height: 52px;
  background: #22c55e;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s, transform 0.1s;
}
.app-btn:active { transform: scale(0.98); }
.app-btn:hover:not(.disabled) { background: #16a34a; }
.app-btn.disabled {
  background: #d1fae5;
  color: #86efac;
  cursor: not-allowed;
}
</style>
