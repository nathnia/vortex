<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-menu'): void }>()
</script>

<template>
  <header class="sticky top-0 z-30 bg-sidebar lg:border-b lg:border-line">
    <!-- ================= MOBILE ================= -->
    <LayoutMobileBar @toggle-menu="emit('toggle-menu')" />

    <div class="bg-form px-5 py-4 md:px-8 lg:hidden">
      <LayoutSearchInput variant="mobile" />
    </div>

    <!-- ================= DESKTOP ================= -->
    <div class="hidden items-center gap-4 px-4 py-3 md:px-8 lg:flex">
      <LayoutSearchInput />
      <LayoutUserMenu class="ml-auto" />
    </div>
  </header>
</template>