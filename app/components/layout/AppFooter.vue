<script setup lang="ts">
// Social icons use simple-icons: npm i @iconify-json/simple-icons
const socials = [
  { label: 'YouTube', icon: 'i-simple-icons-youtube', href: 'https://youtube.com' },
  { label: 'X', icon: 'i-simple-icons-x', href: 'https://x.com' },
  { label: 'Facebook', icon: 'i-simple-icons-facebook', href: 'https://facebook.com' },
]

const mainLinks = [
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact' },
]

const legalLinks = [
  { label: 'Disclaimer', to: '/disclaimer' },
  { label: 'Terms', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Cookies', to: '/cookies' },
]
</script>

<template>
  <footer class="bg-pigment-900 px-4 py-12 text-white md:py-8">
    <div class="flex flex-col items-center gap-8 md:gap-6">
      <!-- Group 1: socials + main links (mobile: stacked, desktop: one row) -->
      <div class="flex flex-col items-center gap-6 md:flex-row md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-4">
        <ul class="flex items-center gap-8 md:gap-7">
          <li v-for="social in socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="block transition hover:text-pigment-200"
            >
              <UIcon :name="social.icon" class="size-7 md:size-6" />
            </a>
          </li>
        </ul>

        <ul class="flex items-center gap-8 text-sm uppercase md:gap-10">
          <li v-for="link in mainLinks" :key="link.to">
            <NuxtLink :to="link.to" class="transition hover:text-pigment-200">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Group 2: legal links + copyright.
           Mobile: legal links first, copyright on its own line below.
           Desktop: copyright first, then legal links (same as before). -->
      <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs">
        <li class="order-last w-full text-center font-medium md:order-first md:flex md:w-auto md:items-center md:gap-6">
          Copyright @2025 Vortex
          <span class="hidden size-1 rounded-full bg-white md:block" aria-hidden="true" />
        </li>

        <li
          v-for="(link, i) in legalLinks"
          :key="link.to"
          class="flex items-center gap-6"
        >
          <NuxtLink :to="link.to" class="transition hover:text-pigment-200">
            {{ link.label }}
          </NuxtLink>
          <span
            v-if="i < legalLinks.length - 1"
            class="size-1 rounded-full bg-white"
            aria-hidden="true"
          />
        </li>
      </ul>
    </div>
  </footer>
</template>