<script setup lang="ts">
import type { GameDetail } from '~/types/game'

const props = defineProps<{ game: GameDetail }>()

// v-model:open from the parent (DetailReviews opens it from the "Add Review" button)
const open = defineModel<boolean>('open', { default: false })

const verdict = ref<'recommended' | 'not-recommended' | null>(null)
const text = ref('')
const showUsername = ref(false)

// Banner on top: the first trailer thumbnail, or the poster when the game has no media
const banner = computed(() => props.game.media[0]?.src ?? props.game.poster)

// Submit stays disabled until a verdict is picked and something is written
const canSubmit = computed(() => verdict.value !== null && text.value.trim().length > 0)

// Start fresh every time the popup is closed
watch(open, (isOpen) => {
  if (isOpen) return
  verdict.value = null
  text.value = ''
  showUsername.value = false
})

const toast = useToast()

function submit() {
  if (!canSubmit.value) return
  // TODO: send the review to the backend later
  console.log('new review:', {
    slug: props.game.slug,
    recommended: verdict.value === 'recommended',
    text: text.value.trim(),
    showUsername: showUsername.value,
  })
  toast.add({ title: 'Review submitted', description: `Thanks for reviewing ${props.game.title}!` })
  open.value = false
}
</script>

<template>
  <!-- title/description props are for screen readers only (same pattern as the mobile menu).
       The visible heading is inside the content slot. -->
  <UModal
    v-model:open="open"
    title="Write a Review"
    :description="`Share your experience about ${game.title}`"
    :ui="{ content: 'sm:max-w-md overflow-hidden rounded-2xl bg-card ring-0' }"
  >
    <template #content>
      <div>
        <!-- banner + close -->
        <div class="relative aspect-2/1 bg-black">
          <NuxtImg :src="banner" :alt="game.title" class="size-full object-cover" />
          <button
            type="button"
            aria-label="Close"
            class="absolute right-3 top-3 grid size-8 place-items-center rounded-lg bg-nav-active text-white transition hover:bg-pigment-800"
            @click="open = false"
          >
            <UIcon name="i-ph-x-bold" class="size-4" />
          </button>
        </div>

        <div class="space-y-4 p-5">
          <div class="space-y-1">
            <h2 class="text-lg font-semibold">
              Write a Review
            </h2>
            <p class="text-xs text-neutral-300">
              Tell us what you think about <strong class="font-semibold text-white">{{ game.title }}.</strong>
            </p>
          </div>

          <hr class="border-line">

          <!-- rating -->
          <div class="space-y-2">
            <p id="rate-label" class="text-xs text-neutral-300">
              How would you rate this game?
            </p>
            <div role="radiogroup" aria-labelledby="rate-label" class="grid grid-cols-1 gap-2 rounded-2xl bg-black p-2 sm:grid-cols-2 sm:gap-2.5 sm:p-2.5">
              <button
                type="button"
                role="radio"
                :aria-checked="verdict === 'recommended'"
                class="flex items-center justify-center gap-2 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-800 transition sm:py-2 sm:text-sm"
                :class="verdict === 'recommended' ? 'ring-2 ring-green-400' : verdict && 'opacity-50 hover:opacity-80'"
                @click="verdict = 'recommended'"
              >
                <UIcon name="i-ph-thumbs-up-bold" class="size-3.5 sm:size-4" />
                Recommended
              </button>
              <button
                type="button"
                role="radio"
                :aria-checked="verdict === 'not-recommended'"
                class="flex items-center justify-center gap-2 rounded-lg bg-red-200 px-3 py-1.5 text-xs font-medium text-red-800 transition sm:py-2 sm:text-sm"
                :class="verdict === 'not-recommended' ? 'ring-2 ring-red-400' : verdict && 'opacity-50 hover:opacity-80'"
                @click="verdict = 'not-recommended'"
              >
                <UIcon name="i-ph-thumbs-down-bold" class="size-3.5 sm:size-4" />
                Not Recommended
              </button>
            </div>
          </div>

          <!-- text -->
          <textarea
            v-model="text"
            rows="4"
            maxlength="1000"
            aria-label="Your review"
            placeholder="Describe your experience while playing the game..."
            class="min-h-28 w-full resize-none rounded-xl border border-neutral-600 bg-form p-3 text-sm text-white placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-pigment-400"
          />

          <UCheckbox
            v-model="showUsername"
            label="Show my username on this review"
            size="sm"
            :ui="{ label: 'text-xs text-neutral-200' }"
          />

          <UButton
            label="Submit"
            color="primary"
            size="lg"
            block
            :disabled="!canSubmit"
            @click="submit"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>