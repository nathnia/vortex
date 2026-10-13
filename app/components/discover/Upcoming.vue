<script setup lang="ts">
import { carouselDotsUi } from '~/utils/carousel';

const upcoming = useUpcomingGames()
const carousel = useTemplateRef('carousel')

function watchTrailer() {
  // TODO: hook up the trailer later
  console.log('watch trailer')
}
</script>

<template>
  <section class="relative bg-nav-active px-4 py-10 md:px-16">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold max-md:text-2xl">
        Upcoming Games
      </h2>
      <p class="mt-1 text-xs text-neutral-300 max-md:text-sm">
        Be the first to know the next big thing's opening.
      </p>

      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="upcoming"
        dots
        class="mt-6 pb-10"
        :ui="carouselDotsUi"
      >
        <article class="grid w-full items-center gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div class="relative aspect-16/10 max-md:aspect-4/5 overflow-hidden rounded-2xl bg-black/30">
            <NuxtImg :src="item.image" :alt="item.title" class="absolute inset-0 size-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-semibold">
              {{ item.title }}
            </h3>
            <p class="line-clamp-4 text-xs leading-relaxed text-neutral-200 max-md:line-clamp-none max-md:text-sm md:text-sm">
              {{ item.description }}
            </p>

            <dl class="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt class="text-xs text-neutral-300">Release Date</dt>
                <dd class="mt-0.5 text-xs font-semibold max-md:text-sm md:text-sm">{{ item.releaseDate }}</dd>
              </div>
              <div>
                <dt class="text-xs text-neutral-300">Developer</dt>
                <dd class="mt-0.5 text-xs font-semibold max-md:text-sm md:text-sm">{{ item.developer }}</dd>
              </div>
              <div>
                <dt class="text-xs text-neutral-300">Platforms</dt>
                <dd class="mt-0.5 text-xs font-semibold max-md:text-sm md:text-sm">{{ item.platforms.join(', ') }}</dd>
              </div>
              <div>
                <dt class="text-xs text-neutral-300">Genre</dt>
                <dd class="mt-0.5 text-xs font-semibold max-md:text-sm md:text-sm">{{ item.genres.join(', ') }}</dd>
              </div>
            </dl>

            <UButton icon="i-ph-play" label="Watch Trailer" color="primary" @click="watchTrailer" />
          </div>
        </article>
      </UCarousel>
    </div>

    <button
      type="button"
      aria-label="Previous game"
      class="absolute left-2 top-1/2 max-md:hidden -translate-y-1/2 text-neutral-300 transition hover:text-white md:left-5"
      @click="carousel?.emblaApi?.scrollPrev()"
    >
      <UIcon name="i-ph-caret-left-bold" class="size-5" />
    </button>
    <button
      type="button"
      aria-label="Next game"
      class="absolute right-2 top-1/2 max-md:hidden -translate-y-1/2 text-neutral-300 transition hover:text-white md:right-5"
      @click="carousel?.emblaApi?.scrollNext()"
    >
      <UIcon name="i-ph-caret-right-bold" class="size-5" />
    </button>
  </section>
</template>