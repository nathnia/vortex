<script setup lang="ts">
const emit = defineEmits<{ (e: 'toggle-menu'): void }>()

const router = useRouter()

function goBack() {
  if (import.meta.client && window.history.state?.back) {
    router.back()
  }
  else {
    navigateTo('/')
  }
}
</script>

<template>
  <header class="sticky top-0 z-30 bg-surface lg:border-b lg:border-line">
    <!-- ================= MOBILE ================= -->
    <LayoutMobileBar @toggle-menu="emit('toggle-menu')" />

    <div class="bg-form px-5 py-4 md:px-8 lg:hidden">
      <LayoutSearchInput variant="mobile" />
    </div>

    <!-- ================= DESKTOP ================= -->
    <div class="hidden grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 md:px-8 lg:grid">
      <div class="justify-self-start">
        <UButton
          icon="i-ph-caret-left-bold"
          color="neutral"
          variant="soft"
          square
          aria-label="Go back"
          class="bg-nav-active text-pigment-100 hover:bg-nav-active/80"
          @click="goBack"
        />
      </div>

      <LayoutSearchInput />

      <LayoutUserMenu />
    </div>
  </header>
</template>