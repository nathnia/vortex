<script setup lang="ts">
withDefaults(defineProps<{
  image?: string
  title?: string
  subtitle?: string
}>(), {
  image: '/images/auth/sign-up.webp',
  title: 'Explore Epic Worlds',
  subtitle: 'From pixel classics to next-gen adventures.',
})
</script>

<template>
  <div class="min-h-screen lg:grid lg:grid-cols-2 lg:gap-4 lg:p-4">
    <div class="sticky top-4 hidden h-[calc(100dvh-2rem)] lg:block">
      <AuthPanel :image="image" :title="title" :subtitle="subtitle" />
    </div>

    <main class="relative isolate flex justify-center px-6 pb-6 pt-24 lg:items-center lg:px-2 lg:py-10">
      <div class="absolute inset-x-0 top-0 -z-10 h-63 lg:hidden">
        <NuxtImg :src="image" alt="" class="size-full object-cover object-[50%_35%]" />
        <div class="absolute inset-0 bg-linear-to-t from-surface from-0% via-surface/40 via-50% to-transparent" />
      </div>
      <NuxtLink to="/" class="absolute inset-x-0 top-5 text-center text-xl font-bold tracking-wider lg:hidden">
        VORTEX
      </NuxtLink>

      <div class="w-full max-w-[24rem]">
        <slot />
      </div>
    </main>
  </div>
</template>