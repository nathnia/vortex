<script setup lang="ts">
// Uses layouts/discover.vue (same sidebar, topbar with only bell + user)
definePageMeta({ layout: 'discover' })

useSeoMeta({ title: 'Discover | Vortex' })
</script>

<template>
  <div>
    <DiscoverHero />

    <DiscoverCategories />

    <DiscoverResults />

  </div>
</template>