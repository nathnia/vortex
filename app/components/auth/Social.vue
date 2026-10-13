<script setup lang="ts">
defineProps<{ label: string }>()

function connect(provider: 'google' | 'facebook') {
  // TODO: hook up social login later
  console.log('social login:', provider)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3 text-sm lg:text-xs">
      <span class="h-px flex-1 bg-white/80" />
      <span>{{ label }}</span>
      <span class="h-px flex-1 bg-white/80" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        type="button"
        aria-label="Google"
        class="grid h-10 place-items-center rounded-xl border lg:h-12 border-white/80 transition hover:bg-white/5"
        @click="connect('google')"
      >
        <UIcon name="i-simple-icons-google" class="size-5 lg:size-6" />
      </button>
      <button
        type="button"
        aria-label="Facebook"
        class="grid h-10 place-items-center rounded-xl border lg:h-12 border-white/80 transition hover:bg-white/5"
        @click="connect('facebook')"
      >
        <UIcon name="i-simple-icons-facebook" class="size-5 lg:size-6" />
      </button>
    </div>
  </div>
</template>