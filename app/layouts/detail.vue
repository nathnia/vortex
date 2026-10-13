<template>
  <LayoutAppShell :padded="false">
    <template #topbar="{ openMenu }">
      <LayoutAppDetailTopbar @toggle-menu="openMenu" />
    </template>
    <slot />
  </LayoutAppShell>
</template>