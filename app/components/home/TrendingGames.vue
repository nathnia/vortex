<script setup lang="ts">
import { useCarouselDots } from '~/composables/useCarouselDots'
import { dotBarClass } from '~/utils/carousel'

const games = useTrendingGames()
const carousel = useTemplateRef<{
  emblaApi?: {
    scrollPrev: () => void
    scrollNext: () => void
    scrollSnapList: () => number[]
    selectedScrollSnap: () => number
    scrollTo: (index: number) => void
    on: (event: string, callback: () => void) => void
  }
}>('carousel')

const { dotCount, activeDot, goToDot } = useCarouselDots(carousel)
</script>

<template>
  <section>
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">
        Trending Games
      </h2>
      <div class="flex gap-2">
        <UButton
          icon="i-ph-caret-left-bold"
          color="primary"
          size="sm"
          square
          aria-label="Previous games"
          @click="carousel?.emblaApi?.scrollPrev()"
        />
        <UButton
          icon="i-ph-caret-right-bold"
          color="primary"
          size="sm"
          square
          aria-label="Next games"
          @click="carousel?.emblaApi?.scrollNext()"
        />
      </div>
    </div>

    <div class="relative">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="games"
        class="pb-8"
        :ui="{
          viewport: '-m-3 overflow-hidden p-3',
          container: '-ms-4',
          item: 'ps-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
        }"
      >
        <GameCard :game="item" variant="poster" />
      </UCarousel>

      <div class="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        <button
          v-for="n in dotCount"
          :key="n"
          type="button"
          :aria-label="`Go to part ${n}`"
          class="h-1 rounded-full transition-all"
          :class="dotBarClass(activeDot === n - 1)"
          @click="goToDot(n - 1)"
        />
      </div>
    </div>
  </section>
</template>