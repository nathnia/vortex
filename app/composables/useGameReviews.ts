import reviews from '~/data/reviews.json'
import type { GameReviews } from '~/types/review'

const bySlug = reviews as Record<string, GameReviews>

export function useGameReviews(slug: string): GameReviews | undefined {
  return bySlug[slug]
}