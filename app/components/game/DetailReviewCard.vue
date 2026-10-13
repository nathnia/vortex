<script setup lang="ts">
import type { GameReview } from '~/types/review'

const props = defineProps<{ review: GameReview }>()

const postedOn = computed(() =>
  new Date(`${props.review.postedAt}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }),
)

const LONG_TEXT = 260
const isLong = computed(() => props.review.text.length > LONG_TEXT)
const expanded = ref(false)

const vote = ref<'up' | 'down' | null>(null)
const helpfulCount = computed(() => props.review.helpful + (vote.value === 'up' ? 1 : 0))

function toggleVote(type: 'up' | 'down') {
  // TODO: hook up to the backend later
  vote.value = vote.value === type ? null : type
}
</script>

<template>
  <article class="rounded-3xl bg-sidebar p-5">
    <header class="flex items-start gap-3">
      <span
        class="grid size-10 shrink-0 place-items-center rounded-lg"
        :class="review.recommended ? 'bg-nav-active text-white' : 'bg-red-900 text-red-200'"
      >
        <UIcon
          :name="review.recommended ? 'i-ph-thumbs-up-bold' : 'i-ph-thumbs-down-bold'"
          class="size-6"
        />
      </span>

      <div class="min-w-0 flex-1">
        <h3 class="font-semibold">
          {{ review.recommended ? 'Recommended' : 'Not Recommended' }}
        </h3>
        <p class="text-xs text-neutral-300">
          Posted on {{ postedOn }}
        </p>
      </div>

      <button type="button" aria-label="More options" class="text-neutral-300 transition hover:text-white">
        <UIcon name="i-ph-dots-three-vertical-bold" class="size-5" />
      </button>
    </header>

    <p
      class="mt-4 text-xs leading-relaxed text-neutral-100 md:text-sm"
      :class="isLong && !expanded && 'line-clamp-3'"
    >
      {{ review.text }}
    </p>
    <button
      v-if="isLong"
      type="button"
      class="mx-auto mt-2 flex items-center gap-1 text-xs text-pigment-200 hover:underline"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show Less' : 'Show More' }}
      <UIcon
        name="i-ph-caret-down-bold"
        class="size-3 transition"
        :class="expanded && 'rotate-180'"
      />
    </button>

    <footer class="mt-4 flex items-end justify-between gap-4 border-t border-line pt-4">
      <div class="flex min-w-0 items-center gap-3">
        <UAvatar
          :src="review.author.avatar"
          :alt="review.author.name"
          size="md"
          :ui="{ root: 'rounded-md size-8 md:size-9' }"
        />
        <div class="min-w-0 leading-tight">
          <p class="truncate text-xs font-medium md:text-sm">
            {{ review.author.name }}
          </p>
          <p class="text-[10px] text-neutral-400 md:text-xs">
            {{ helpfulCount }} people found this helpful
          </p>
        </div>
      </div>

      <div class="shrink-0 text-right">
        <p class="text-[10px] text-neutral-300">
          Was this review helpful?
        </p>
        <div class="mt-2 flex justify-end gap-2">
          <UButton
            icon="i-ph-thumbs-up-bold"
            color="primary"
            :variant="vote === 'down' ? 'soft' : 'solid'"
            size="sm"
            square
            aria-label="Helpful"
            :aria-pressed="vote === 'up'"
            @click="toggleVote('up')"
          />
          <UButton
            icon="i-ph-thumbs-down-bold"
            color="primary"
            :variant="vote === 'up' ? 'soft' : 'solid'"
            size="sm"
            square
            aria-label="Not helpful"
            :aria-pressed="vote === 'down'"
            @click="toggleVote('down')"
          />
        </div>
      </div>
    </footer>
  </article>
</template>