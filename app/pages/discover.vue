<script setup lang="ts">
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