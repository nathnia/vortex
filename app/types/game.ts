// Shape of one game in app/data/games.json (what /api/games/<slug> returns)

export interface GameMedia {
  type: 'video' | 'image'
  src: string
}

export interface GameRating {
  recommended: boolean
  /** shown under the verdict, e.g. "200k+ Reviews" */
  reviews: string
}

export interface GameSpecs {
  /** plain first line, e.g. "Requires a 64-bit processor and operating system" */
  intro?: string
  os?: string
  processor?: string
  memory?: string
  graphics?: string
  storage?: string
  notes?: string
}

export interface GameStore {
  /** 'steam' | 'epic' | 'playstation' | 'xbox' (same keys as gameStores) */
  type: string
  url: string
}

export interface GameDetail {
  slug: string
  title: string
  /** all tags. The page shows the first 4 and a "+ N" chip for the rest */
  tags: string[]
  /** 'windows' | 'playstation' | 'xbox' (same keys as platformIcons) */
  platforms: string[]
  releaseDate: string
  rating: GameRating
  /** tall cover (2:3) */
  poster: string
  /** trailer + screenshots. Empty = page falls back to a trailer thumbnail made from the poster */
  media: GameMedia[]
  // Everything below is optional: a missing value just hides that block on the page
  /** shown in Quick Info. Different from tags (tags are the free-form chips) */
  genres?: string[]
  developer?: string
  publisher?: string
  /** e.g. "17+ Mature" */
  ageRating?: string
  about?: string
  keyFeatures?: string[]
  requirements?: { minimum: GameSpecs, recommended: GameSpecs }
  stores?: GameStore[]
}