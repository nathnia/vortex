<script setup lang="ts">
defineProps<{
  image: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="relative h-full min-h-[calc(100dvh-2rem)] overflow-hidden rounded-4xl bg-linear-to-br from-fuchsia-600 via-purple-700 to-surface">
    <NuxtImg :src="image" alt="" loading="eager" class="absolute inset-0 size-full object-cover" />
    <div class="absolute inset-0 bg-linear-to-t from-surface from-0% via-surface/60 via-25% to-transparent to-55%" />

    <span class="absolute right-4 top-4 z-10 rounded-full bg-white px-5 py-2.5 text-xl font-bold tracking-wide text-nav-active">
      VORTEX
    </span>

    <div class="absolute inset-x-6 bottom-9 z-10 space-y-2">
      <h2 class="text-3xl font-semibold xl:text-4xl">
        {{ title }}
      </h2>
      <p class="text-base xl:text-xl">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>