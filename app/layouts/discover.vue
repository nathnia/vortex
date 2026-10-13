<!-- Same shell as layouts/default.vue. Differences: topbar with only bell + user,
     and <main> has NO side padding (hero is edge to edge, sections add their own padding). -->
<template>
  <LayoutAppShell :padded="false">
    <template #topbar="{ openMenu }">
      <LayoutAppDiscoverTopbar @toggle-menu="openMenu" />
    </template>
    <slot />
  </LayoutAppShell>
</template>