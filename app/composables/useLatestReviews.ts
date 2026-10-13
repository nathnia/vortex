// Data for the "Latest Reviews" carousel on the homepage.
// Auto-imported by Nuxt, so just call useLatestReviews() anywhere.
//
// Images:
//   /public/images/reviews/<slug>.webp      -> game screenshot (the big picture)
//   /public/images/avatars/<name>.webp      -> reviewer photo
export function useLatestReviews() {
  return [
    {
      slug: 'subnautica',
      game: 'Subnautica',
      image: '/images/games/subnautica.webp',
      recommended: true,
      // Design text is cut off at "(and...", the ending here is my placeholder.
      quote:
        '"Crash-landed on an alien ocean planet, Subnautica challenges players to survive in a vast, mysterious underwater world. Explore vibrant coral reefs, treacherous deep-sea trenches, and discover fascinating (and dangerous) creatures lurking below."',
      author: { name: 'Stefan Arnold', avatar: '/images/stefan.webp' },
      helpful: 34,
    },
    // PLACEHOLDERS so the carousel can scroll and show 3 dots. Replace with real reviews.
    {
      slug: 'review-2',
      game: 'Game 2',
      image: '/images/reviews/review-2.webp',
      recommended: true,
      quote: '"Placeholder review text. Replace me with a real review."',
      author: { name: 'Reviewer Two', avatar: '/images/avatars/reviewer-2.webp' },
      helpful: 12,
    },
    {
      slug: 'review-3',
      game: 'Game 3',
      image: '/images/reviews/review-3.webp',
      recommended: false,
      quote: '"Placeholder review text. Replace me with a real review."',
      author: { name: 'Reviewer Three', avatar: '/images/avatars/reviewer-3.webp' },
      helpful: 5,
    },
  ]
}