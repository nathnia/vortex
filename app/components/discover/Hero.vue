<script setup lang="ts">
const route = useRoute()

const query = ref(String(route.query.q ?? ''))

function submitSearch() {
  const q = query.value.trim()
  navigateTo({ path: '/discover', query: q ? { q } : {} })
}

function openFilter() {
  // TODO: hook up the filter later
  console.log('open filter')
}
</script>

<template>
  <section class="relative isolate overflow-hidden rounded-b-2xl bg-black">
    <NuxtImg
      src="/images/discover-hero.webp"
      alt=""
      loading="eager"
      fetchpriority="high"
      class="absolute inset-0 -z-10 size-full object-cover object-right"
    />
    <div class="absolute inset-0 -z-10 bg-black/25" />

    <div class="mx-auto flex min-h-88 max-w-4xl flex-col items-center justify-center gap-1.5 px-4 py-12 text-center max-md:min-h-136 md:min-h-104">
      <h1 class="text-[2.75rem] font-semibold">
        Discover Your Next Favorite Game
      </h1>
      <p class="max-w-2xl text-[1.35rem]">
        Browse thousands of games across genres, developers, and platforms<br class="hidden md:block">
        find your next adventure today.
      </p>

      <div class="mt-2 flex w-full max-w-164 items-center justify-center gap-3">
        <UInput
          v-model="query"
          icon="i-ph-magnifying-glass"
          placeholder="Search by title, genre, or developer"
          size="xl"
          variant="none"
          class="w-100 max-w-md "
          :ui="{ base: 'bg-form rounded-lg border-2 border-neutral-600 text-white placeholder:text-neutral-300', leadingIcon: 'text-neutral-300' }"
          @keyup.enter="submitSearch"
        />
        <UButton
          icon="i-ph-funnel"
          label="Filter by"
          color="primary"
          size="xl"
          class="shrink-0 max-md:size-11 max-md:justify-center max-md:p-0"
          :ui="{ label: 'max-md:hidden' }"
          @click="openFilter"
        />
      </div>
    </div>
  </section>
</template>