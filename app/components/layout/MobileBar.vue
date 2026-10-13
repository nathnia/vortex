<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-menu'): void }>()
</script>

<template>
  <!-- MOBILE (below lg): hamburger / logo (centered) / user. Every item h-8 + flex = same vertical center -->
  <div class="grid grid-cols-3 items-center border-b border-line px-5 py-3 md:px-9 lg:hidden">
    <button
      type="button"
      aria-label="Open menu"
      class="flex h-8 items-center justify-self-start text-white"
      @click="emit('toggle-menu')"
    >
      <UIcon name="i-ph-list" class="size-6" />
    </button>
    <NuxtLink to="/" class="flex h-8 items-center justify-self-center text-lg font-bold leading-none tracking-wider">
      VORTEX
    </NuxtLink>
    <LayoutUserMenu variant="mobile" />
  </div>
</template>