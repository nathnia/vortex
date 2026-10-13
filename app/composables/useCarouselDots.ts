// "Exactly N indicator bars" for a UCarousel, no matter how many scroll steps it has.
// Auto-imported by Nuxt. Used by TrendingGames and DetailHero.
//
//   const carousel = useTemplateRef('carousel')
//   const { dotCount, activeDot, goToDot } = useCarouselDots(carousel)
interface EmblaLike {
  scrollSnapList: () => number[]
  selectedScrollSnap: () => number
  scrollTo: (index: number) => void
  on: (event: 'select' | 'reInit', callback: () => void) => unknown
}

export function useCarouselDots(carousel: { readonly value: { emblaApi?: EmblaLike } | null }, dotCount = 3) {
  const activeDot = ref(0)

  function updateDot() {
    const api = carousel.value?.emblaApi
    if (!api) return
    const total = api.scrollSnapList().length
    activeDot.value = total <= 1
      ? 0
      : Math.round((api.selectedScrollSnap() * (dotCount - 1)) / (total - 1))
  }

  function goToDot(dot: number) {
    const api = carousel.value?.emblaApi
    if (!api) return
    const total = api.scrollSnapList().length
    api.scrollTo(Math.round((dot * (total - 1)) / (dotCount - 1)))
  }

  watch(
    () => carousel.value?.emblaApi,
    (api) => {
      if (!api) return
      updateDot()
      api.on('select', updateDot)
      api.on('reInit', updateDot)
    },
    { immediate: true },
  )

  return { dotCount, activeDot, goToDot }
}