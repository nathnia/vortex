<script setup lang="ts">
// Shared page shell: desktop sidebar, mobile drawer, footer.
// layouts/default, detail and discover only pick the topbar (slot "topbar")
// and whether <main> has side padding (prop "padded").
withDefaults(defineProps<{ padded?: boolean }>(), { padded: true })

const mobileMenuOpen = ref(false)
const route = useRoute()

// Close the mobile drawer after navigating
watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false
})

function openMenu() {
  mobileMenuOpen.value = true
}
</script>

<template>
  <div class="min-h-screen bg-surface text-white">
    <!-- Desktop sidebar -->
    <aside class="fixed inset-y-0 left-0 z-40 hidden w-56 lg:block">
      <LayoutAppSidebar />
    </aside>

    <!-- Mobile drawer -->
    <USlideover
      v-model:open="mobileMenuOpen"
      side="left"
      title="Menu"
      description="Main navigation"
      :ui="{ content: 'max-w-64 bg-sidebar' }"
    >
      <template #content>
        <LayoutAppSidebar />
      </template>
    </USlideover>

    <!-- flex-col + flex-1 on main = footer always sits at the bottom -->
    <div class="flex min-h-screen flex-col lg:pl-56">
      <slot name="topbar" :open-menu="openMenu" />
      <main class="flex-1 pb-12" :class="padded && 'px-4 md:px-8'">
        <slot />
      </main>
      <LayoutAppFooter />
    </div>
  </div>
</template>