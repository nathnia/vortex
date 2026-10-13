<script setup lang="ts">
import { carouselDotsUi, dotBarClass } from '~/utils/carousel'

const categories = useGameCategories()
const carousel = useTemplateRef('carousel')

const VISIBLE = 3
const start = ref(0)
const maxStart = computed(() => Math.max(0, categories.length - VISIBLE))
const visible = computed(() => categories.slice(start.value, start.value + VISIBLE))

function prev() {
  start.value = Math.max(0, start.value - 1)
  carousel.value?.emblaApi?.scrollPrev()
}
function next() {
  start.value = Math.min(maxStart.value, start.value + 1)
  carousel.value?.emblaApi?.scrollNext()
}
</script>

<template>
  <section class="px-4 pt-8 md:px-8">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-semibold">
        Search by Categories
      </h2>
      <div class="flex gap-2">
        <UButton icon="i-ph-caret-left-bold" color="primary" size="sm" square aria-label="Previous categories"
          @click="prev" />
        <UButton icon="i-ph-caret-right-bold" color="primary" size="sm" square aria-label="Next categories"
          @click="next" />
      </div>
    </div>

    <!-- MOBILE -->
    <div class="md:hidden">
      <div class="space-y-4">
        <NuxtLink v-for="item in visible" :key="item.slug" :to="{ path: '/discover', query: { category: item.slug } }"
          class="group relative block h-56 overflow-hidden rounded-2xl bg-card focus-visible:outline-2 focus-visible:outline-pigment-800">
          <NuxtImg :src="item.image" :alt="item.name" class="absolute inset-0 size-full object-cover" />
          <div
            class="absolute inset-0 bg-linear-to-t from-surface/95 from-5% via-surface/65 via-40% to-transparent to-80%" />
          <h3 class="absolute bottom-5 left-5 text-lg font-semibold">
            {{ item.name }}
          </h3>
        </NuxtLink>
      </div>

      <div class="flex justify-center gap-2 pt-6">
        <button v-for="n in maxStart + 1" :key="n" type="button" :aria-label="`Go to categories ${n}`"
          class="h-1 rounded-full transition-all" :class="dotBarClass(start === n - 1)" @click="start = n - 1" />
      </div>
    </div>

    <!-- DESKTOP -->
    <UCarousel ref="carousel" v-slot="{ item }" :items="categories" dots class="hidden pb-8 md:block" :ui="{
      ...carouselDotsUi,
      viewport: '-m-1 overflow-hidden p-1',
      container: '-ms-4',
      item: 'ps-4 basis-2/3 sm:basis-1/2 md:basis-1/3',
    }">
      <NuxtLink :to="{ path: '/discover', query: { category: item.slug } }"
        class="group relative block aspect-9/5 overflow-hidden rounded-2xl bg-card focus-visible:outline-2 focus-visible:outline-pigment-800">
        <NuxtImg :src="item.image" :alt="item.name"
          class="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-105" />
        <div
          class="absolute inset-0 bg-linear-to-t from-surface/95 from-5% via-surface/65 via-40% to-transparent to-80%" />
        <h3 class="absolute bottom-5 left-5 text-lg font-semibold">
          {{ item.name }}
        </h3>
      </NuxtLink>
    </UCarousel>
  </section>
</template>