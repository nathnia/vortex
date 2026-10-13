<script setup lang="ts">

const props = withDefaults(defineProps<{
  game: {
    slug: string
    title: string
    platforms: string[]
    tags?: string[]
    image?: string
    cover?: string 
  }
  variant?: 'wide' | 'poster'
  showTags?: boolean
  maxTags?: number
  posterRatio?: string
  wideHeight?: string
}>(), {
  variant: 'wide',
  showTags: true,
  maxTags: 3,
  posterRatio: 'aspect-2/3',
  wideHeight: 'h-44 md:h-48',
})

const image = computed(() => props.game.image ?? props.game.cover ?? '')
const tags = computed(() => (props.showTags ? (props.game.tags ?? []).slice(0, props.maxTags) : []))

const posterClass
  = 'outline-2 -outline-offset-2 outline-transparent hover:outline-pigment hover:shadow-[0_0_10px_0px] hover:shadow-pigment-400/40 focus-visible:outline-pigment-600 focus-visible:shadow-[0_0_10px_0px] focus-visible:shadow-pigment-400/40'
const wideClass
  = 'border-2 border-transparent hover:border-pigment-800 focus-visible:border-pigment-800'
</script>

<template>
  <NuxtLink
    :to="`/games/${game.slug}`"
    class="relative block overflow-hidden rounded-xl bg-card transition"
    :class="variant === 'poster' ? [posterRatio, posterClass] : [wideHeight, wideClass]"
  >
    <NuxtImg :src="image" :alt="game.title" class="absolute inset-0 size-full object-cover" />

    <div
      class="absolute inset-0 bg-linear-to-t from-surface to-transparent"
      :class="variant === 'poster' ? 'via-surface/50' : 'via-surface/30'"
    />

    <!-- POSTER -->
    <div v-if="variant === 'poster'" class="absolute inset-x-0 bottom-0 space-y-2 p-3">
      <h3 class="text-base font-medium leading-tight">
        {{ game.title }}
      </h3>
      <ul v-if="tags.length" class="flex flex-wrap gap-1.5">
        <li
          v-for="(tag, i) in tags"
          :key="`${tag}-${i}`"
          class="rounded-md border border-white/60 bg-tag/50 px-2 py-0.5 text-xs"
        >
          {{ tag }}
        </li>
      </ul>
      <ul class="flex items-center gap-2 pt-1">
        <li v-for="platform in game.platforms" :key="platform">
          <UIcon :name="platformIcons[platform] ?? ''" class="size-5" />
        </li>
      </ul>
    </div>

    <!-- WIDE -->
    <template v-else>
      <h3 class="absolute left-4 text-base font-medium" :class="tags.length ? 'bottom-12' : 'bottom-3'">
        {{ game.title }}
      </h3>
      <ul v-if="tags.length" class="absolute bottom-3 left-4 flex gap-2">
        <li
          v-for="(tag, i) in tags"
          :key="`${tag}-${i}`"
          class="rounded-md border border-white/60 bg-tag/50 px-2 py-0.5 text-xs"
        >
          {{ tag }}
        </li>
      </ul>
      <ul class="absolute inset-y-0 right-3 flex flex-col items-center justify-end gap-2 pb-3">
        <li v-for="platform in game.platforms" :key="platform">
          <UIcon :name="platformIcons[platform] ?? ''" class="size-5" />
        </li>
      </ul>
    </template>
  </NuxtLink>
</template>