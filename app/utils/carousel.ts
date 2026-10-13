// Look of the carousel indicator bars. Auto-imported by Nuxt (app/utils).
//   UCarousel dots:  :ui="carouselDotsUi"   (or { ...carouselDotsUi, item: '...' } to add more)
//   custom bars:     :class="dotBarClass(isActive)"
export const carouselDotsUi = {
  dots: 'bottom-2 gap-2',
  dot: 'h-1 w-10 rounded-full bg-neutral-600 transition-all data-[state=active]:w-20 data-[state=active]:bg-white',
}

export function dotBarClass(active: boolean) {
  return active ? 'w-20 bg-white' : 'w-10 bg-neutral-600'
}