<script setup lang="ts">
import type { GameDetail } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

// Tags
const MAX_TAGS = 4
const visibleTags = computed(() => props.game.tags.slice(0, MAX_TAGS))
const hiddenTags = computed(() => Math.max(props.game.tags.length - MAX_TAGS, 0))

const items = computed(() => [
  { label: 'Platforms', value: props.game.platforms.map(p => platformLabels[p] ?? p).join(', ') },
  { label: 'Genre', value: props.game.genres?.join(', ') },
  { label: 'Release Date', value: props.game.releaseDate },
  { label: 'Developer', value: props.game.developer },
  { label: 'Publisher', value: props.game.publisher },
  { label: 'Age Rating', value: props.game.ageRating, accent: true },
].filter(item => item.value))
</script>

<template>
  <section class="rounded-2xl bg-sidebar p-5">
    <h2 class="mb-4 text-lg font-semibold">
      Quick Info
    </h2>

    <dl class="grid grid-cols-2 gap-x-4 gap-y-4">
      <div v-for="item in items" :key="item.label">
        <dt class="text-xs text-neutral-300">
          {{ item.label }}
        </dt>
        <dd class="mt-1 text-sm font-semibold" :class="item.accent && 'text-yellow-400'">
          {{ item.value }}
        </dd>
      </div>
    </dl>

    <div v-if="visibleTags.length" class="mt-4">
      <p class="mb-2 text-xs text-neutral-300">
        Tags
      </p>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tag in visibleTags"
          :key="tag"
          class="rounded-lg border border-white/30 px-3 py-1 text-xs"
        >
          {{ tag }}
        </li>
        <li
          v-if="hiddenTags"
          class="rounded-lg border border-white/30 px-3 py-1 text-xs"
        >
          + {{ hiddenTags }}
        </li>
      </ul>
    </div>
  </section>
</template>