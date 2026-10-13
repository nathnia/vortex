<script setup lang="ts">
import type { GameDetail } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

const PER_PAGE = 3
const page = ref(1)

const allGames = computed(() => useSimilarGames(props.game.slug))
const games = computed(() =>
  allGames.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)

watch(() => props.game.slug, () => {
  page.value = 1
})
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">
        More Like This
      </h2>
      <NuxtLink
        to="/discover"
        class="rounded-lg bg-nav-active px-4 py-2 text-sm text-pigment-100 transition hover:bg-pigment-800"
      >
        View All
      </NuxtLink>
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <NuxtLink
        v-for="(item, index) in games"
        :key="`${page}-${index}`"
        :to="`/games/${item.slug}`"
        class="relative block h-48 overflow-hidden rounded-xl border-2 border-transparent bg-card transition hover:border-pigment-800 focus-visible:border-pigment-800 sm:h-36 md:h-40"
      >
        <NuxtImg
          :src="item.image"
          :alt="item.title"
          class="absolute inset-0 size-full object-cover"
        />

        <div class="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent" />

        <h3 class="absolute bottom-3 left-4 text-base font-medium">
          {{ item.title }}
        </h3>

        <ul class="absolute inset-y-0 right-3 flex flex-col items-center justify-end gap-2 pb-3">
          <li v-for="platform in item.platforms" :key="platform">
            <UIcon :name="platformIcons[platform] ?? ''" class="size-5" />
          </li>
        </ul>
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div v-if="allGames.length > PER_PAGE" class="mt-6 flex justify-center">
      <UPagination
        v-model:page="page"
        :total="allGames.length"
        :items-per-page="PER_PAGE"
        :sibling-count="1"
        color="neutral"
        variant="ghost"
        active-color="primary"
        active-variant="soft"
        prev-icon="i-ph-caret-left-bold"
        next-icon="i-ph-caret-right-bold"
        :ui="{
          first: 'hidden!',
          last: 'hidden!',
          item: 'data-[selected=true]:bg-nav-active data-[selected=true]:text-white data-[selected=true]:hover:bg-nav-active aria-[current=page]:bg-nav-active aria-[current=page]:text-white',
        }"
      />
    </div>
  </section>
</template>