<template>
  <div class="screen">
    <div class="content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 110px);
}
.content {
  flex: 1;
  padding: 8px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.footer {
  padding: 12px 20px 24px;
  background: #fff;
  border-top: 1px solid #f3f4f6;
  position: sticky;
  bottom: 0;
}
</style>
