// Shape of the community reviews in app/data/reviews.json (one entry per game slug)

export interface GameReviewAuthor {
  name: string
  avatar?: string
}

export interface GameReview {
  id: string
  recommended: boolean
  postedAt: string
  text: string
  author: GameReviewAuthor
  helpful: number
}

export interface GameReviewSummary {
  recommended: number
  notRecommended: number
  total: number
}

export interface GameReviews {
  summary: GameReviewSummary
  reviews: GameReview[]
}