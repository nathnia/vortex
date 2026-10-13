<script setup lang="ts">
definePageMeta({ layout: 'detail' })

const route = useRoute()
const game = useGameDetail(String(route.params.slug))

if (!game) {
  throw createError({ statusCode: 404, statusMessage: 'Game not found', fatal: true })
}

useSeoMeta({ title: `${game.title} | Vortex` })
</script>

<template>
  <div>
    <GameDetailHero :game="game" />

    <div class="grid gap-8 px-4 pt-4 md:grid-cols-[1fr_20rem] md:px-8">
      <GameDetailAbout :game="game" />

      <aside class="space-y-6">
        <GameDetailQuickInfo :game="game" />
        <GameDetailStores :game="game" />
      </aside>
    </div>

    <GameMoreLikeThis :game="game" class="px-4 pt-10 md:px-8" />

    <GameDetailReviews :game="game" />

  </div>
</template>