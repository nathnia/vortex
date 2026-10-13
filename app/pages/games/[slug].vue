<script setup lang="ts">
// Uses layouts/detail.vue (same sidebar, different topbar)
definePageMeta({ layout: 'detail' })

const route = useRoute()
const game = useGameDetail(String(route.params.slug))

// Slug not in app/data/games.json -> 404 page
if (!game) {
  throw createError({ statusCode: 404, statusMessage: 'Game not found', fatal: true })
}

useSeoMeta({ title: `${game.title} | Vortex` })
</script>

<template>
  <div>
    <GameDetailHero :game="game" />

    <!-- Below the hero: text column + sidebar. The sidebar is 20rem like the hero's right column.
         Mobile design not seen yet: one column, sidebar after the text. -->
    <div class="grid gap-8 px-4 pt-4 md:grid-cols-[1fr_20rem] md:px-8">
      <GameDetailAbout :game="game" />

      <aside class="space-y-6">
        <GameDetailQuickInfo :game="game" />
        <GameDetailStores :game="game" />
      </aside>
    </div>

    <GameMoreLikeThis :game="game" class="px-4 pt-10 md:px-8" />

    <!-- Community reviews (has its own padding and hides itself when the game has no reviews) -->
    <GameDetailReviews :game="game" />

    <!-- next sections go here -->
  </div>
</template>