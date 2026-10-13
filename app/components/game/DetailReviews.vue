<script setup lang="ts">
import type { GameDetail } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

const data = computed(() => useGameReviews(props.game.slug))

// "Write a Review" popup
const writeOpen = ref(false)

// 203421 -> "203.421" (same number format as the design)
const totalLabel = computed(() => data.value?.summary.total.toLocaleString('id-ID'))

function openFilter() {
  // TODO: hook up the filter later
  console.log('open filter')
}
</script>

<template>
  <!-- Whole Community Reviews block: reviews on the left, add + summary on the right.
       Same columns as the body in [slug].vue (md breakpoint, 20rem sidebar).
       Hidden when the game has no reviews in reviews.json. -->
  <section v-if="data" class="px-4 pt-10 md:px-8">
    <h2 class="mb-6 text-lg font-semibold md:mb-4">
      Community Reviews
    </h2>

    <div class="grid gap-10 md:grid-cols-[minmax(0,1fr)_20rem] md:items-start md:gap-8">
      <!-- left column. md:col-start-1 / row-start-1 keep it on the left on desktop,
           because on mobile the summary cards are moved in front of it. -->
      <div class="space-y-4 md:col-start-1 md:row-start-1">
        <!-- period + filter -->
        <div class="flex items-center gap-4">
          <p class="shrink-0 text-sm text-neutral-300">
            In the last 1 year
          </p>
          <span class="h-px flex-1 bg-line" />
          <button
            type="button"
            class="inline-flex shrink-0 items-center gap-2 rounded-lg bg-nav-active px-3.5 py-1.5 text-sm text-pigment-100 transition hover:bg-pigment-800 focus-visible:outline-2 focus-visible:outline-pigment-400"
            @click="openFilter"
          >
            <UIcon name="i-ph-funnel-bold" class="size-4" />
            Filter By
          </button>
        </div>

        <GameDetailReviewCard
          v-for="review in data.reviews"
          :key="review.id"
          :review="review"
        />

        <NuxtLink to="/reviews" class="block pt-2 text-center text-sm text-pigment-200 hover:underline">
          Browse all {{ totalLabel }} reviews
        </NuxtLink>
      </div>

      <!-- mobile: first (Add Your Review -> Review Summary -> reviews). Desktop: right column. -->
      <GameDetailReviewSummary
        :summary="data.summary"
        class="order-first md:order-0 md:col-start-2 md:row-start-1"
        @add-review="writeOpen = true"
      />
    </div>

    <GameDetailWriteReview v-model:open="writeOpen" :game="game" />
  </section>
</template>