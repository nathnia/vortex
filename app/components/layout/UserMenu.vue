<script setup lang="ts">

withDefaults(defineProps<{ variant?: 'desktop' | 'mobile' }>(), { variant: 'desktop' })

const user = useCurrentUser()
</script>

<template>
  <button
    v-if="variant === 'mobile'"
    type="button"
    class="flex h-8 items-center gap-1 justify-self-end"
    aria-label="User menu"
  >
    <UAvatar :src="user.avatar" :alt="user.name" size="sm" :ui="{ root: 'rounded-lg' }" />
    <UIcon name="i-ph-caret-down" class="size-5 text-white" />
  </button>

  <div v-else class="flex items-center justify-end gap-4">
    <UButton
      icon="i-ph-bell-bold"
      color="neutral"
      variant="ghost"
      square
      aria-label="Notifications"
      class="bg-nav-active text-pigment-100 hover:bg-nav-active/80"
    />
    <span class="h-6 w-px bg-line" />
    <button type="button" class="flex items-center gap-2 text-base">
      <UAvatar :src="user.avatar" :alt="user.name" size="sm" :ui="{ root: 'rounded-lg' }" />
      <span>{{ user.name }}</span>
      <UIcon name="i-ph-caret-down-bold" class="size-4 text-neutral-400" />
    </button>
  </div>
</template>