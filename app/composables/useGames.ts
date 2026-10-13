import games from '~/data/games.json'
import type { GameDetail } from '~/types/game'

const PLACEHOLDER_SLUG = /^(game|review)-\d+$/

const OTHER_COUNT = 24 
const SIMILAR_COUNT = 9 
const DISCOVER_COPIES = 5 

function repeat<T>(list: T[], count: number): T[] {
  if (!list.length) return []
  return Array.from({ length: count }, (_, i) => list[i % list.length]!)
}

function realGames() {
  return games.filter(game => !PLACEHOLDER_SLUG.test(game.slug))
}

export function useGames() {
  const all = realGames()

  const trending = all.map(game => ({
    slug: game.slug,
    title: game.title,
    tags: game.tags,
    platforms: game.platforms,
    cover: game.poster,
  }))

  const other = repeat(
    all.map(game => ({
      slug: game.slug,
      title: game.title,
      platforms: game.platforms,
      image: game.poster,
    })),
    OTHER_COUNT,
  )

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

  function bySlug(slug: string) {
    return games.find(game => game.slug === slug) as GameDetail | undefined
  }

  return { trending, other, discover, similar, bySlug }
}

export const useTrendingGames = () => useGames().trending
export const useOtherGames = () => useGames().other
export const useSimilarGames = (currentSlug: string) => useGames().similar(currentSlug)
export const useDiscoverGames = () => useGames().discover
export const useGameDetail = (slug: string) => useGames().bySlug(slug)