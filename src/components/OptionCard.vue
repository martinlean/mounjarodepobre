<template>
  <button
    class="option-card"
    :class="{ selected, multi }"
    @click="$emit('select')"
    type="button"
  >
    <span v-if="icon" class="option-icon">{{ icon }}</span>
    <span class="option-content">
      <span class="option-title">{{ title }}</span>
      <span v-if="subtitle" class="option-subtitle">{{ subtitle }}</span>
    </span>
    <span v-if="multi" class="checkbox" :class="{ checked: selected }">
      <svg v-if="selected" viewBox="0 0 12 10" fill="none">
        <path d="M1 5l3.5 3.5L11 1" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  subtitle: String,
  selected: Boolean,
  multi: Boolean,
})
defineEmits(['select'])
</script>

<style scoped>
.option-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.18s ease;
  font-family: inherit;
}
.option-card:active { transform: scale(0.98); }
.option-card.selected {
  background: #dcfce7;
  border-color: #22c55e;
}
.option-icon { font-size: 22px; flex-shrink: 0; }
.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.option-title { font-size: 15px; font-weight: 500; color: #1a1a1a; }
.option-subtitle { font-size: 12px; color: #6b7280; }
.checkbox {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #bbf7d0;
  background: #fff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
}
.checkbox.checked {
  background: #22c55e;
  border-color: #22c55e;
}
.checkbox svg { width: 12px; height: 10px; }
</style>
