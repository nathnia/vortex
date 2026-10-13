<script setup lang="ts">

withDefaults(defineProps<{ variant?: 'desktop' | 'mobile' }>(), { variant: 'desktop' })

const query = ref('')

function submitSearch() {
  const q = query.value.trim()
  navigateTo({ path: '/discover', query: q ? { q } : {} })
}
</script>

<template>
  <UInput
    v-if="variant === 'mobile'"
    v-model="query"
    icon="i-ph-magnifying-glass-bold"
    placeholder="Search by title, genre, or developer"
    size="lg"
    variant="none"
    class="w-full"
    :ui="{ base: 'bg-form rounded-lg border-2 border-neutral-600 text-white placeholder:text-neutral-400' }"
    @keyup.enter="submitSearch"
  />
  <UInput
    v-else
    v-model="query"
    icon="i-ph-magnifying-glass"
    placeholder="Search by title, genre, or developer"
    size="lg"
    variant="none"
    class="w-100 max-w-md"
    :ui="{ base: 'bg-form rounded-lg border-2 border-neutral-600 text-white placeholder:text-neutral-300', leadingIcon: 'text-neutral-300' }"
    @keyup.enter="submitSearch"
  />
</template>