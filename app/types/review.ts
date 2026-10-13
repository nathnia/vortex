// Shape of the community reviews in app/data/reviews.json (one entry per game slug)

export interface GameReviewAuthor {
  name: string
  /** optional: without it the avatar shows the initials */
  avatar?: string
}

export interface GameReview {
  id: string
  recommended: boolean
  /** ISO date, e.g. "2025-06-10". The card shows it as "Jun 10, 2025" */
  postedAt: string
  text: string
  author: GameReviewAuthor
  /** "N people found this helpful" */
  helpful: number
}

export interface GameReviewSummary {
  recommended: number
  notRecommended: number
  /** the number in "Browse all 203.421 reviews" */
  total: number
}

export interface GameReviews {
  summary: GameReviewSummary
  reviews: GameReview[]
}