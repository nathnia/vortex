<script setup lang="ts">
import type { UCarousel } from '#components'
import { useCarouselDots } from '~/composables/useCarouselDots';
import type { GameDetail, GameMedia } from '~/types/game'
import { dotBarClass } from '~/utils/carousel';

const props = defineProps<{ game: GameDetail }>()

// Tags: show the first 4, the rest become the "+ N" chip
const MAX_TAGS = 4
const visibleTags = computed(() => props.game.tags.slice(0, MAX_TAGS))
const hiddenTags = computed(() => Math.max(props.game.tags.length - MAX_TAGS, 0))

// Games with no trailer/screenshots in the JSON still get one trailer thumbnail
// (made from the poster), so the play button and the gallery always show.
const hasMedia = computed(() => props.game.media.length > 0)
const media = computed<GameMedia[]>(() =>
  hasMedia.value ? props.game.media : [{ type: 'video', src: props.game.poster }],
)

// Which media (trailer / screenshot) is showing in the big stage
const activeIndex = ref(0)
const activeMedia = computed(() => media.value[activeIndex.value])

const carousel = useTemplateRef('carousel')

// Always exactly 3 indicator bars (same idea as TrendingGames)
const { dotCount, activeDot, goToDot } = useCarouselDots(carousel)

function playTrailer() {
  // TODO: hook up the trailer video later
  console.log('play trailer:', props.game.slug)
}

function addToWishlist() {
  // TODO: hook up wishlist later
  console.log('add to wishlist:', props.game.slug)
}

function share() {
  // TODO: hook up share later
  console.log('share:', props.game.slug)
}
</script>

<template>
  <article class="relative isolate">
    <!-- 1. media stage (behind everything, edge to edge) -->
    <div class="absolute inset-x-0 top-0 -z-10 h-136 overflow-hidden bg-black md:h-96">
      <NuxtImg
        v-if="activeMedia"
        :src="activeMedia.src"
        :alt="game.title"
        loading="eager"
        fetchpriority="high"
        class="size-full object-cover"
        :class="hasMedia ? 'opacity-50' : 'scale-110 opacity-40 blur-2xl'"
      />
      <!-- fade into the page background -->
      <div class="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
    </div>

    <!-- play button: its own element above the content so it stays clickable -->
    <button
      v-if="activeMedia?.type === 'video'"
      type="button"
      aria-label="Play trailer"
      class="absolute left-1/2 top-48 z-10 hidden size-8 -translate-x-1/2 place-items-center rounded-full bg-white text-neutral-900 transition hover:scale-105 md:grid"
      @click="playTrailer"
    >
      <UIcon name="i-ph-play-fill" class="size-4" />
    </button>

    <!-- 2. info -->
    <div class="px-4 pt-40 md:px-8 md:pt-30">
      <div class="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-6">
        <!-- left: poster, breadcrumb, title, tags -->
        <div class="space-y-4">
          <NuxtImg
            :src="game.poster"
            :alt="`${game.title} poster`"
            class="aspect-2/3 w-56 rounded-xl bg-card object-cover md:w-44"
          />

          <div class="space-y-3">
            <nav aria-label="Breadcrumb" class="text-xs text-neutral-300">
              <ol class="flex flex-wrap items-center gap-1.5">
                <li>
                  <NuxtLink to="/" class="hover:text-white">
                    Homepage
                  </NuxtLink>
                </li>
                <li aria-hidden="true">/</li>
                <!-- TODO: link this to the trending page when it exists -->
                <li>Trending Games</li>
                <li aria-hidden="true">/</li>
                <li class="font-medium text-white" aria-current="page">
                  {{ game.title }}
                </li>
              </ol>
            </nav>

            <h1 class="text-2xl font-semibold md:text-3xl">
              {{ game.title }}
            </h1>

            <ul v-if="visibleTags.length" class="flex flex-wrap gap-2">
              <li
                v-for="tag in visibleTags"
                :key="tag"
                class="rounded-md border border-white/60 bg-tag/50 px-2.5 py-1 text-xs"
              >
                {{ tag }}
              </li>
              <li
                v-if="hiddenTags"
                class="rounded-md border border-white/60 bg-tag/50 px-2.5 py-1 text-xs"
              >
                + {{ hiddenTags }}
              </li>
            </ul>
          </div>
        </div>

        <!-- right: platforms + date, rating card, buttons -->
        <div class="w-full space-y-4 md:w-80">
          <!-- platformIcons = the same icon map your TrendingGames cards use -->
          <div class="flex items-center gap-3 md:justify-end">
            <span class="order-2 flex items-center gap-3 md:order-1">
              <UIcon
                v-for="platform in game.platforms"
                :key="platform"
                :name="platformIcons[platform] ?? ''"
                class="size-6"
              />
            </span>
            <span class="order-1 rounded-md bg-white px-3 py-1 text-xs font-medium text-neutral-900 md:order-2">
              {{ game.releaseDate }}
            </span>
          </div>

          <div class="rounded-2xl border border-line bg-card p-4">
            <div class="flex items-center gap-3">
              <span class="grid size-10 place-items-center rounded-lg bg-primary/20 text-primary">
                <UIcon
                  :name="game.rating.recommended ? 'i-ph-thumbs-up-bold' : 'i-ph-thumbs-down-bold'"
                  class="size-6"
                />
              </span>
              <div>
                <p class="font-semibold">
                  {{ game.rating.recommended ? 'Recommended' : 'Not Recommended' }}
                </p>
                <p class="text-xs text-neutral-300">
                  {{ game.rating.reviews }}
                </p>
              </div>
            </div>
            <NuxtLink to="/reviews" class="mt-3 block text-center text-xs text-neutral-300 hover:text-white">
              View All Review
            </NuxtLink>
          </div>

          <div class="flex justify-start gap-3 md:justify-end">
            <UButton
              icon="i-ph-plus-bold"
              label="Add to Wishlist"
              color="primary"
              size="lg"
              class="px-2.5 py-1.5 text-sm md:px-3 md:py-2 md:text-base"
              @click="addToWishlist"
            />
            <UButton
              icon="i-ph-share-network-bold"
              label="Share"
              color="primary"
              size="lg"
              class="px-2.5 py-1.5 text-sm md:px-3 md:py-2 md:text-base"
              @click="share"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 3. media gallery: click a thumbnail to show it in the stage.
         Cards use a FIXED width (basis-80 in :ui item), not a %, so they
         keep their size when the screen gets narrow. -->
    <div class="relative mt-8 px-4 md:px-8">
      <!-- mobile only: title + left/right buttons -->
      <div class="mb-4 flex items-center justify-between md:hidden">
        <h2 class="text-lg font-semibold">
          Gallery
        </h2>
        <div class="flex gap-2">
          <UButton
            icon="i-ph-caret-left-bold"
            color="primary"
            size="lg"
            square
            aria-label="Previous media"
            @click="carousel?.emblaApi?.scrollPrev()"
          />
          <UButton
            icon="i-ph-caret-right-bold"
            color="primary"
            size="lg"
            square
            aria-label="Next media"
            @click="carousel?.emblaApi?.scrollNext()"
          />
        </div>
      </div>

      <UCarousel
        ref="carousel"
        v-slot="{ item, index }"
        :items="media"
        class="pb-8 md:pe-14"
        :ui="{
          viewport: '-m-3 overflow-hidden p-3',
          container: '-ms-4',
          item: 'ps-4 basis-full md:basis-80',
        }"
      >
        <button
          type="button"
          :aria-label="`Show ${item.type === 'video' ? 'trailer' : 'screenshot'} ${index + 1}`"
          class="relative block aspect-17/10 w-full overflow-hidden rounded-3xl bg-card outline-3 md:rounded-2xl outline-offset-0 transition"
          :class="index === activeIndex
            ? 'outline-pigment-800'
            : 'outline-transparent hover:outline-pigment-800/60'"
          @click="activeIndex = index"
        >
          <NuxtImg :src="item.src" alt="" class="absolute inset-0 size-full object-cover" />
          <span v-if="item.type === 'video'" class="absolute inset-0 grid place-items-center">
            <span class="grid size-9 place-items-center rounded-full bg-white text-neutral-900 md:size-7">
              <UIcon name="i-ph-play-fill" class="size-4 md:size-3.5" />
            </span>
          </span>
        </button>
      </UCarousel>

      <!-- purple arrow on the right (vertically centered on the thumbnails, not the bars) -->
      <UButton
        icon="i-ph-caret-right-bold"
        color="primary"
        size="lg"
        square
        aria-label="Next media"
        class="absolute right-4 top-[calc(50%-1rem)] hidden -translate-y-1/2 md:right-8 md:inline-flex"
        @click="carousel?.emblaApi?.scrollNext()"
      />

      <!-- exactly 3 indicator bars -->
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
  </article>
</template>