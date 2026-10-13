<template>
  <LayoutAppShell :padded="false">
    <template #topbar="{ openMenu }">
      <LayoutAppDiscoverTopbar @toggle-menu="openMenu" />
    </template>
    <slot />
  </LayoutAppShell>
</template>