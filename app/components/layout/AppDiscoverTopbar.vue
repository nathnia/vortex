<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-menu'): void }>()
</script>

<template>
  <header class="sticky top-0 z-30 bg-sidebar lg:border-b lg:border-line">
    <!-- MOBILE -->
    <LayoutMobileBar @toggle-menu="emit('toggle-menu')" />

    <!-- DESKTOP -->
    <div class="hidden justify-end px-4 py-3 md:px-8 lg:flex">
      <LayoutUserMenu />
    </div>
  </header>
</template>