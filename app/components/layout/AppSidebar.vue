<script setup lang="ts">
// Phosphor icons. Inactive = "bold", active = "fill" (as in the design).
// Only house-line confirmed from Figma. Check the other names.
interface NavItem {
  label: string
  to: string
  icon: string
  /** other route prefixes where this item should also look active */
  alsoActive?: string[]
}

const mainNav: NavItem[] = [
  // Homepage stays lit on game detail pages (/games/<slug>)
  { label: 'Homepage', to: '/', icon: 'house-line', alsoActive: ['/games'] },
  { label: 'Discover', to: '/discover', icon: 'magnifying-glass' },
  { label: 'Reviews', to: '/reviews', icon: 'star' },
  { label: 'Wishlist', to: '/wishlist', icon: 'heart' },
]

const footerNav: NavItem[] = [
  { label: 'Settings', to: '/settings', icon: 'gear' },
  { label: 'Help & Supports', to: '/help', icon: 'question' },
]

const route = useRoute()

function matches(base: string) {
  return base === '/' ? route.path === '/' : route.path.startsWith(base)
}

function isActive(item: NavItem) {
  return matches(item.to) || (item.alsoActive?.some(matches) ?? false)
}

function iconName(item: NavItem) {
  return `i-ph-${item.icon}-${isActive(item) ? 'fill' : 'bold'}`
}

function signOut() {
  // TODO: hook up auth later
  navigateTo('/')
}

// Text: weight 400, size from Figma "Font/Size/XS" (me use 16px, check variable in Figma)
const linkBase = 'flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-normal text-neutral-300 transition hover:bg-white/5 hover:text-white'
const linkActive = 'bg-nav-active text-white'
</script>

<template>
  <nav class="flex h-full flex-col border-r border-line bg-sidebar px-4 py-6" aria-label="Main navigation">
    <NuxtLink to="/" class="mb-10 block px-3 text-xl font-bold tracking-wider text-center ">
      VORTEX
    </NuxtLink>

    <ul class="space-y-1">
      <li v-for="item in mainNav" :key="item.to">
        <NuxtLink :to="item.to" :class="[linkBase, isActive(item) && linkActive]">
          <UIcon :name="iconName(item)" class="size-6" />
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>

    <ul class="mt-auto space-y-1">
      <li v-for="item in footerNav" :key="item.to">
        <NuxtLink :to="item.to" :class="[linkBase, isActive(item) && linkActive]">
          <UIcon :name="iconName(item)" class="size-6" />
          {{ item.label }}
        </NuxtLink>
      </li>
      <li>
        <button type="button" :class="[linkBase, 'w-full']" @click="signOut">
          <UIcon name="i-ph-sign-out-bold" class="size-6" />
          Sign Out
        </button>
      </li>
    </ul>
  </nav>
</template>