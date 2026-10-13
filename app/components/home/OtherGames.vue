<script setup lang="ts">
import { useIsMobile } from '~/composables/useIsMobile'

const allGames = useOtherGames()

const isMobile = useIsMobile('(max-width: 639px)')

const perPage = computed(() => (isMobile.value ? 3 : 8))
const page = ref(1)
watch(perPage, () => {
  page.value = 1
})

const games = computed(() =>
  allGames.slice((page.value - 1) * perPage.value, page.value * perPage.value),
)

const spans = [2, 2, 2, 3, 3, 2, 2, 2]
function spanClass(index: number) {
  return spans[index] === 3 ? 'sm:col-span-3' : 'sm:col-span-2'
}
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-medium">Other Games</h2>
      <NuxtLink
        to="/discover"
        class="rounded-lg bg-nav-active px-4 py-2 text-sm text-pigment-100 transition hover:bg-pigment-800"
      >
        View More Games
      </NuxtLink>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-6">
      <GameCard
        v-for="(game, index) in games"
        :key="`${page}-${index}`"
        :game="game"
        variant="wide"
        :show-tags="false"
        wide-height="h-48 sm:h-36 md:h-40"
        :class="spanClass(index)"
      />
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <UPagination
        v-model:page="page"
        :total="allGames.length"
        :items-per-page="perPage"
        :sibling-count="1"
        color="neutral"
        variant="ghost"
        active-color="primary"
        active-variant="soft"
        prev-icon="i-ph-caret-left-bold"
        next-icon="i-ph-caret-right-bold"
      />
    </div>
  </section>
</template>