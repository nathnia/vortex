<script setup lang="ts">
import { useIsMobile } from '~/composables/useIsMobile'

const route = useRoute()
const allGames = useDiscoverGames()

const query = computed(() => String(route.query.q ?? '').trim().toLowerCase())
const category = computed(() => String(route.query.category ?? '').trim().toLowerCase())

const platforms = ref<string[]>([])

type Order = 'relevance' | 'newest' | 'title'
const order = ref<Order>('relevance')
const orderOptions: { key: Order, label: string }[] = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'newest', label: 'Newest' },
  { key: 'title', label: 'Title A-Z' },
]
const orderLabel = computed(() => orderOptions.find(option => option.key === order.value)?.label)

// Display Options
const view = ref<'poster' | 'wide'>('wide')

// Mobile
const isMobile = useIsMobile('(max-width: 767px)')

// ---- filter + sort ----
function score(game: (typeof allGames)[number]) {
  const title = game.title.toLowerCase()
  if (title.startsWith(query.value)) return 2
  return title.includes(query.value) ? 1 : 0
}

const filtered = computed(() => {
  let list = allGames.filter((game) => {
    if (category.value && !game.tags.some(tag => tag.toLowerCase().includes(category.value))) return false
    if (query.value) {
      const hit = game.title.toLowerCase().includes(query.value)
        || game.tags.some(tag => tag.toLowerCase().includes(query.value))
      if (!hit) return false
    }
    if (platforms.value.length && !platforms.value.some(p => game.platforms.includes(p))) return false
    return true
  })

  if (order.value === 'title') {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title))
  }
  else if (order.value === 'newest') {
    list = [...list].sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
  }
  else if (query.value) {
    list = [...list].sort((a, b) => score(b) - score(a))
  }
  return list
})

const blockSize = computed(() => {
  if (isMobile.value) return view.value === 'poster' ? 4 : 3
  return view.value === 'poster' ? 8 : 7
})
const perPage = computed(() => blockSize.value * 2)
const page = ref(1)

watch([query, category, platforms, order, view, blockSize], () => {
  page.value = 1
}, { deep: true })

const pageItems = computed(() =>
  filtered.value.slice((page.value - 1) * perPage.value, page.value * perPage.value),
)
const blocks = computed(() => {
  const result = []
  for (let i = 0; i < pageItems.value.length; i += blockSize.value) {
    result.push(pageItems.value.slice(i, i + blockSize.value))
  }
  return result
})

// Wide view
const SPANS = [
  'md:col-span-3', 'md:col-span-3',
  'md:col-span-2', 'md:col-span-2', 'md:col-span-2',
  'md:col-span-3', 'md:col-span-3',
]

// ---- dropdowns ----
const orderItems = computed(() =>
  orderOptions.map(option => ({
    label: option.label,
    icon: order.value === option.key ? 'i-ph-check-bold' : undefined,
    onSelect: () => {
      order.value = option.key
    },
  })),
)

const platformItems = computed(() =>
  Object.keys(platformLabels).map(key => ({
    label: platformLabels[key],
    type: 'checkbox' as const,
    checked: platforms.value.includes(key),
    onUpdateChecked(checked: boolean) {
      platforms.value = checked
        ? [...platforms.value, key]
        : platforms.value.filter(p => p !== key)
    },
    onSelect(event: Event) {
      event.preventDefault()
    },
  })),
)

const controlButton = 'inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-neutral-900 transition hover:bg-primary/75'
const viewButton = 'grid size-9 place-items-center rounded-lg transition'
const viewActive = 'bg-[#6531a6] text-white'
const viewIdle = 'bg-primary text-neutral-900 hover:bg-primary/75'
</script>

<template>
  <section class="px-4 pt-10 md:px-8">
    <!-- controls -->
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <UDropdownMenu :items="orderItems" :content="{ align: 'start' }">
          <button type="button" :class="controlButton">
            <span>Order by: <strong class="font-semibold">{{ orderLabel }}</strong></span>
            <UIcon name="i-ph-caret-down-bold" class="size-4" />
          </button>
        </UDropdownMenu>

        <UDropdownMenu :items="platformItems" :content="{ align: 'start' }">
          <button type="button" :class="controlButton">
            <span>Platform<template v-if="platforms.length"> ({{ platforms.length }})</template></span>
            <UIcon name="i-ph-caret-down-bold" class="size-4" />
          </button>
        </UDropdownMenu>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm text-neutral-300">Display Options :</span>
        <button
          type="button"
          aria-label="Wide view"
          :aria-pressed="view === 'wide'"
          :class="[viewButton, view === 'wide' ? viewActive : viewIdle]"
          @click="view = 'wide'"
        >
          <UIcon name="i-ph-rows-bold" class="size-5" />
        </button>
        <button
          type="button"
          aria-label="Poster view"
          :aria-pressed="view === 'poster'"
          :class="[viewButton, view === 'poster' ? viewActive : viewIdle]"
          @click="view = 'poster'"
        >
          <UIcon name="i-ph-columns-bold" class="size-5" />
        </button>
      </div>
    </div>

    <p v-if="!filtered.length" class="py-16 text-center text-neutral-300">
      No games found. Try another search or filter.
    </p>

    <!-- cards -->
    <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
      <div class="grid gap-4" :class="view === 'poster' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-6'">
        <GameCard
          v-for="(game, index) in block"
          :key="game.id"
          :game="game"
          :variant="view"
          wide-height="h-52 md:h-48"
          :class="view === 'wide' && SPANS[index]"
        />
      </div>

      <DiscoverUpcoming v-if="blockIndex === 0 && blocks.length > 1" class="-mx-4 my-8 md:-mx-8" />
    </template>

    <!-- pagination -->
    <div v-if="filtered.length > perPage" class="mt-8 flex justify-center">
      <UPagination
        v-model:page="page"
        :total="filtered.length"
        :items-per-page="perPage"
        :sibling-count="1"
        color="neutral"
        variant="ghost"
        active-color="primary"
        active-variant="soft"
        prev-icon="i-ph-caret-left-bold"
        next-icon="i-ph-caret-right-bold"
        :ui="{
          first: 'hidden!',
          last: 'hidden!',
          item: 'data-[selected=true]:bg-nav-active data-[selected=true]:text-white data-[selected=true]:hover:bg-nav-active aria-[current=page]:bg-nav-active aria-[current=page]:text-white',
        }"
      />
    </div>
  </section>
</template>