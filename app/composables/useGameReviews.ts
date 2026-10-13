// Community reviews for the game detail page (/games/<slug>).
// Auto-imported by Nuxt: const data = useGameReviews('peak')
// Returns undefined when the game has no entry in app/data/reviews.json
// (the Community Reviews section is then hidden).
//
// To add or edit reviews, just edit app/data/reviews.json. No code change needed.
import reviews from '~/data/reviews.json'
import type { GameReviews } from '~/types/review'

const bySlug = reviews as Record<string, GameReviews>

export function useGameReviews(slug: string): GameReviews | undefined {
  return bySlug[slug]
}