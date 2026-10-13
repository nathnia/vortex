export interface GameMedia {
  type: 'video' | 'image'
  src: string
}

export interface GameRating {
  recommended: boolean
  reviews: string
}

export interface GameSpecs {
  intro?: string
  os?: string
  processor?: string
  memory?: string
  graphics?: string
  storage?: string
  notes?: string
}

export interface GameStore {
  type: string
  url: string
}

export interface GameDetail {
  slug: string
  title: string
  tags: string[]
  platforms: string[]
  releaseDate: string
  rating: GameRating
  poster: string
  media: GameMedia[]
  genres?: string[]
  developer?: string
  publisher?: string
  ageRating?: string
  about?: string
  keyFeatures?: string[]
  requirements?: { minimum: GameSpecs, recommended: GameSpecs }
  stores?: GameStore[]
}