<template>
  <LayoutAppShell>
    <template #topbar="{ openMenu }">
      <LayoutAppTopbar @toggle-menu="openMenu" />
    </template>
    <slot />
  </LayoutAppShell>
</template>