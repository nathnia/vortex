<script setup lang="ts">
import { carouselDotsUi } from '~/utils/carousel';

const reviews = useLatestReviews()
const carousel = useTemplateRef('carousel')
</script>

<template>
  <section>
    <!-- Header: title + purple arrow buttons -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-lg font-medium">Latest Reviews</h2>
      <div class="flex gap-2">
        <UButton
          icon="i-ph-caret-left-bold"
          color="primary"
          size="sm"
          square
          aria-label="Previous review"
          @click="carousel?.emblaApi?.scrollPrev()"
        />
        <UButton
          icon="i-ph-caret-right-bold"
          color="primary"
          size="sm"
          square
          aria-label="Next review"
          @click="carousel?.emblaApi?.scrollNext()"
        />
      </div>
    </div>

    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      :items="reviews"
      dots
      class="pb-8"
      :ui="carouselDotsUi"
    >
      <!-- mobile values first, md: values = desktop (unchanged) -->
      <article
        class="grid w-full items-center gap-4 rounded-3xl bg-sidebar p-4 md:grid-cols-[1.3fr_1fr] md:gap-6 md:p-4"
      >
        <!-- Left/top: game screenshot (mobile: almost square, desktop: 3:2) -->
        <div class="aspect-9/10 overflow-hidden rounded-xl bg-card md:aspect-3/2">
          <NuxtImg
            :src="item.image"
            :alt="item.game"
            class="size-full object-cover"
          />
        </div>

        <!-- Right/bottom: review -->
        <div class="flex flex-col justify-center gap-3 px-1 pb-2 md:gap-4 md:px-0 md:pb-0">
          <div class="flex items-center gap-3">
            <span class="flex size-8 items-center justify-center rounded-lg bg-nav-active text-white md:size-10">
              <UIcon
                :name="item.recommended ? 'i-ph-thumbs-up-bold' : 'i-ph-thumbs-down-bold'"
                class="size-5 md:size-6"
              />
            </span>
            <h3 class="text-lg font-medium md:text-2xl">
              {{ item.recommended ? 'Recommended' : 'Not Recommended' }}
            </h3>
          </div>

          <p class="line-clamp-5 text-xs text-neutral-100 md:line-clamp-4 md:text-base">
            {{ item.quote }}
          </p>

          <div class="flex items-center gap-3">
            <UAvatar
              :src="item.author.avatar"
              :alt="item.author.name"
              size="md"
              :ui="{ root: 'rounded-md size-6 md:size-8' }"
            />
            <div class="leading-tight">
              <p class="text-xs font-medium md:text-sm">{{ item.author.name }}</p>
              <p class="text-[10px] text-neutral-400 md:text-xs">
                {{ item.helpful }} people found this helpful
              </p>
            </div>
          </div>

          <!-- centered, like the design -->
          <NuxtLink
            :to="`/games/${item.slug}`"
            class="w-fit self-center text-xs text-pigment-200 hover:underline md:text-base"
          >
            View Detail
          </NuxtLink>
        </div>
      </article>
    </UCarousel>
  </section>
</template>