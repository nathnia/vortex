<script setup lang="ts">
import type { GameDetail } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

const stores = computed(() =>
  (props.game.stores ?? []).map(store => ({
    ...store,
    label: gameStores[store.type]?.label ?? store.type,
    icon: gameStores[store.type]?.icon ?? '',
  })),
)
</script>

<template>
  <section v-if="stores.length" class="rounded-2xl bg-sidebar p-5">
    <h2 class="mb-4 text-lg font-semibold">
      Where to Get
    </h2>
    <ul class="flex flex-wrap gap-3">
      <li v-for="store in stores" :key="store.type">
        <a
          :href="store.url"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Get on ${store.label}`"
          class="grid size-12 place-items-center rounded-xl bg-card transition hover:bg-form"
        >
          <UIcon :name="store.icon" class="size-6" />
        </a>
      </li>
    </ul>
  </section>
</template>