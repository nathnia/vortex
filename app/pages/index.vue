<script setup lang="ts">
useSeoMeta({ title: 'Home | Vortex' })
</script>

<template>
  <div class="space-y-10 pt-4">
    <section>
      <HomeFeaturedCarousel />
    </section>

    <HomeTrendingGames />

    <HomeLatestReviews />

    <HomeOtherGames />
  </div>
</template>