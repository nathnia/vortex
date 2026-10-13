// Data for the "Search by Categories" carousel on the Discover page.
// Auto-imported by Nuxt, so just call useGameCategories() anywhere.
//
// Images live in /public/images/categories/<slug>.webp
// (export the card art from Figma WITHOUT the label and the fade)
//
// To add a category, copy one object and change the values.
export function useGameCategories() {
  return [
    { slug: 'racing', name: 'Racing', image: '/images/categories/racing.webp' },
    { slug: 'anime', name: 'Anime', image: '/images/categories/anime.webp' },
    { slug: 'action', name: 'Action', image: '/images/discover-hero.webp' },
    { slug: 'rpg', name: 'RPG', image: '/images/categories/rpg.webp' },
    { slug: 'shooter', name: 'Shooter', image: '/images/categories/shooter.webp' },
    { slug: 'strategy', name: 'Strategy', image: '/images/categories/strategy.webp' },
  ]
}