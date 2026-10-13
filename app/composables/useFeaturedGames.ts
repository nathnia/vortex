// Data for the featured carousel on the homepage.
// Auto-imported by Nuxt, so just call useFeaturedGames() anywhere.
//
// Images live in /public/images/banners/
//   <slug>-bg.webp    -> background art (no text)
//   <slug>-logo.webp  -> game title logo (transparent background, use PNG/WebP)
//
// To add a slide, copy the object below and change the values.
export function useFeaturedGames() {
  return [
    {
      slug: 'league-of-legends',
      title: 'League of Legends',
      description:
        'A fast-paced, competitive online game where two teams of five powerful champions battle to destroy each other’s base.',
      tags: ['Moba', '5v5', 'Competitive', 'Team-based'],
      background: '/images/banners/league-of-legends-bg.webp',
      logo: '/images/banners/league-of-legends-logo.svg',
    },
  ]
}