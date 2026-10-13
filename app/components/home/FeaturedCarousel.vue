<script setup lang="ts">
import { carouselDotsUi } from '~/utils/carousel';

const items = useFeaturedGames()
const carousel = useTemplateRef('carousel')

function addToWishlist(slug: string) {
  // TODO: hook up wishlist later
  console.log('add to wishlist:', slug)
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-semibold md:text-lg md:font-medium">Featured &amp; Recommended</h2>
      <div class="flex gap-2 md:hidden">
        <UButton
          icon="i-ph-caret-left-bold"
          color="primary"
          size="lg"
          square
          aria-label="Previous"
          @click="carousel?.emblaApi?.scrollPrev()"
        />
        <UButton
          icon="i-ph-caret-right-bold"
          color="primary"
          size="lg"
          square
          aria-label="Next"
          @click="carousel?.emblaApi?.scrollNext()"
        />
      </div>
    </div>

    <UCarousel
      ref="carousel"
      v-slot="{ item, index }"
      :items="items"
      :loop="items.length > 1"
      :autoplay="items.length > 1 ? { delay: 5000 } : false"
      dots
      arrows
      prev-icon="i-ph-caret-left-bold"
      next-icon="i-ph-caret-right-bold"
      :prev="{ color: 'neutral', variant: 'ghost' }"
      :next="{ color: 'neutral', variant: 'ghost' }"
      class="pb-8"
      :ui="{
        ...carouselDotsUi,
        item: 'basis-full',
        prev: 'start-2 sm:start-2 max-md:hidden',
        next: 'end-2 sm:end-2 max-md:hidden',
      }"
    >
      <article class="relative h-44 w-full overflow-hidden rounded-2xl bg-card md:h-96">
        <NuxtImg
          :src="item.background"
          :alt="item.title"
          :loading="index === 0 ? 'eager' : 'lazy'"
          class="absolute inset-0 size-full object-cover"
        />

        <div class="absolute inset-0 bg-linear-to-t from-surface/95 via-surface/60 to-transparent" />

        <div
          class="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 py-4 md:flex-row md:items-end md:justify-between md:gap-4 md:px-12 md:py-8"
        >
          <div class="max-w-md space-y-2 md:space-y-3">
            <NuxtImg :src="item.logo" :alt="item.title" class="h-10 w-auto md:h-20" />

            <p class="text-xs text-neutral-100 md:text-base">
              {{ item.description }}
            </p>

            <ul class="hidden flex-wrap gap-2 md:flex">
              <li
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-md border border-white/60 px-2.5 py-1 text-xs bg-tag/50"
              >
                {{ tag }}
              </li>
            </ul>
          </div>

          <div class="hidden gap-3 md:flex">
            <UButton
              icon="i-ph-plus-bold"
              label="Add to Wishlist"
              color="primary"
              size="lg"
              @click="addToWishlist(item.slug)"
            />
            <UButton
              label="View Detail"
              color="primary"
              size="lg"
              :to="`/games/${item.slug}`"
            />
          </div>
        </div>
      </article>
    </UCarousel>
  </div>
</template>