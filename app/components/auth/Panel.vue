<script setup lang="ts">
// Big picture card on the left of the sign up / verify / sign in pages (desktop only).
// Art: /public/images/auth/<name>.webp (export from Figma WITHOUT the text and the VORTEX pill).
// Not sure the file is in the right place? Open http://localhost:3000/images/auth/sign-up.webp
// in the browser. If the picture opens, the path is right.
defineProps<{
  image: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <!-- The pink/purple gradient is only a stand-in under the picture (you see it if the picture file is missing). -->
  <div class="relative h-full min-h-[calc(100dvh-2rem)] overflow-hidden rounded-4xl bg-linear-to-br from-fuchsia-600 via-purple-700 to-surface">
    <NuxtImg :src="image" alt="" loading="eager" class="absolute inset-0 size-full object-cover" />
    <!-- dark fade at the bottom so the text is easy to read. Delete this line if your image already has it. -->
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