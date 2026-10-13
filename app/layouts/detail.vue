<!-- Same shell as layouts/default.vue. Only 2 things differ: the topbar, and <main>
     has NO side padding so the game hero can go edge to edge. The page adds its own padding. -->
<template>
  <LayoutAppShell :padded="false">
    <template #topbar="{ openMenu }">
      <LayoutAppDetailTopbar @toggle-menu="openMenu" />
    </template>
    <slot />
  </LayoutAppShell>
</template>