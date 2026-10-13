// true while the screen matches the media query (default: below md).
// Auto-imported by Nuxt. Removes its listener when the component goes away.
// On the server it is false, then it updates after mount (the server cannot know the screen size).
export function useIsMobile(query = '(max-width: 767px)') {
  const matches = ref(false)
  let mq: MediaQueryList | undefined

  function update(event: MediaQueryList | MediaQueryListEvent) {
    matches.value = event.matches
  }

  onMounted(() => {
    mq = window.matchMedia(query)
    update(mq)
    mq.addEventListener('change', update)
  })

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', update)
  })

  return matches
}