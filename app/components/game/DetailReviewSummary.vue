<script setup lang="ts">
import type { GameReviewSummary } from '~/types/review'

const props = defineProps<{ summary: GameReviewSummary }>()

// 187210 -> "187k", 16211 -> "16k"
function compact(count: number) {
  return count >= 1000 ? `${Math.round(count / 1000)}k` : String(count)
}

const stats = computed(() => [
  {
    key: 'up',
    icon: 'i-ph-thumbs-up-bold',
    box: 'bg-nav-active text-white',
    value: compact(props.summary.recommended),
    label: 'Recommend this game',
  },
  {
    key: 'down',
    icon: 'i-ph-thumbs-down-bold',
    box: 'bg-red-900 text-red-200',
    value: compact(props.summary.notRecommended),
    label: 'Not recommend this game',
  },
])

// DetailReviews listens to this and opens the "Write a Review" popup
const emit = defineEmits<{ (e: 'add-review'): void }>()

function addReview() {
  emit('add-review')
}
</script>

<template>
  <aside class="space-y-6 md:space-y-4">
    <section class="rounded-2xl bg-sidebar p-5">
      <h2 class="text-lg font-semibold">
        Add Your Review
      </h2>
      <p class="mt-1 text-xs text-neutral-300">
        Share your experience about this game.
      </p>
      <button
        type="button"
        class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-nav-active py-3 text-base font-medium text-pigment-100 transition hover:bg-pigment-800 focus-visible:outline-2 focus-visible:outline-pigment-400"
        @click="addReview"
      >
        <UIcon name="i-ph-plus-bold" class="size-5" />
        Add Review
      </button>
    </section>

    <section class="rounded-2xl bg-sidebar p-5">
      <h2 class="text-lg font-semibold">
        Review Summary
      </h2>
      <p class="mt-1 text-xs text-neutral-300">
        Total reviews received in the last year.
      </p>

      <div class="mt-4 grid grid-cols-2 gap-4">
        <div v-for="stat in stats" :key="stat.key" class="space-y-2">
          <span class="grid size-12 place-items-center rounded-lg" :class="stat.box">
            <UIcon :name="stat.icon" class="size-6" />
          </span>
          <p class="font-semibold">
            {{ stat.value }} Player
          </p>
          <p class="text-xs text-neutral-300">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </section>
  </aside>
</template>