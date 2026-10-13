// Single source of game data: app/data/games.json (a mock "database").
// Auto-imported by Nuxt. Every list below is derived from the same JSON,
// so editing a game there updates Trending, Other Games, More Like This,
// Discover, and the detail page at once.
//
//   const { trending, other, discover } = useGames()
//   const similar = useGames().similar(slug)
//   const game = useGameDetail(slug)
//
// The old composable names (useTrendingGames, useOtherGames, useSimilarGames,
// useDiscoverGames, useGameDetail) are still exported at the bottom, so
// existing components keep working without any change.
//
// Images: /public/images/games/<slug>.webp (poster)
// Optional trailer + screenshots: /public/images/games/<slug>/media-1.webp, ...
// then list them in the "media" array of that game in the JSON.
//
// platforms: 'windows' | 'playstation' | 'xbox'
import games from '~/data/games.json'
import type { GameDetail } from '~/types/game'

// Placeholder entries in games.json (game-5, game-6, ...) stay out of every list.
// Delete this filter once the placeholders are removed from the JSON.
const PLACEHOLDER_SLUG = /^(game|review)-\d+$/

// DEMO: lists are repeated so the pagination has pages.
// Set these to match the real number of games (or remove repeat()) when you have enough.
const OTHER_COUNT = 24 // "Other Games" grid on the homepage
const SIMILAR_COUNT = 9 // "More Like This" on the detail page (3 pages)
const DISCOVER_COPIES = 5 // results list on the Discover page

// Repeat a list until it has `count` items (empty list stays empty).
function repeat<T>(list: T[], count: number): T[] {
  if (!list.length) return []
  return Array.from({ length: count }, (_, i) => list[i % list.length]!)
}

function realGames() {
  return games.filter(game => !PLACEHOLDER_SLUG.test(game.slug))
}

export function useGames() {
  const all = realGames()

  // "Trending Games" carousel on the homepage.
  const trending = all.map(game => ({
    slug: game.slug,
    title: game.title,
    tags: game.tags,
    platforms: game.platforms,
    cover: game.poster,
  }))

  // "Other Games" grid on the homepage.
  const other = repeat(
    all.map(game => ({
      slug: game.slug,
      title: game.title,
      platforms: game.platforms,
      image: game.poster,
    })),
    OTHER_COUNT,
  )

  // "More Like This" on the game detail page.
  // Which games are "similar" is the backend's job later.
  function similar(currentSlug: string) {
    return repeat(
      all
        .filter(game => game.slug !== currentSlug)
        .map(game => ({
          slug: game.slug,
          title: game.title,
          platforms: game.platforms,
          image: game.poster,
        })),
      SIMILAR_COUNT,
    )
  }

  // Results list on the Discover page.
  const discoverBase = all.map(game => ({
    slug: game.slug,
    title: game.title,
    tags: game.tags,
    platforms: game.platforms,
    releaseDate: game.releaseDate,
    image: game.poster,
  }))
  const discover = discoverBase.length
    ? Array.from({ length: discoverBase.length * DISCOVER_COPIES }, (_, index) => ({
        ...discoverBase[index % discoverBase.length]!,
        id: index,
      }))
    : []

  // Game detail page (/games/<slug>). Returns undefined when the slug is not
  // in the JSON (the page shows a 404).
  function bySlug(slug: string) {
    return games.find(game => game.slug === slug) as GameDetail | undefined
  }

  return { trending, other, discover, similar, bySlug }
}

// Backwards-compatible wrappers, so no component needs to change.
// Later you can replace these calls with useGames() and delete the wrappers.
export const useTrendingGames = () => useGames().trending
export const useOtherGames = () => useGames().other
export const useSimilarGames = (currentSlug: string) => useGames().similar(currentSlug)
export const useDiscoverGames = () => useGames().discover
export const useGameDetail = (slug: string) => useGames().bySlug(slug)