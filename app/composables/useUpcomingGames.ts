// Data for the "Upcoming Games" banner on the Discover page.
// Auto-imported by Nuxt, so just call useUpcomingGames() anywhere.
//
// Images live in /public/images/upcoming/<slug>.webp
// (wide art, about 16:10, export from Figma WITHOUT the fade)
//
// To add a slide, copy one object and change the values.
export function useUpcomingGames() {
  return [
    {
      slug: 'grand-theft-auto-vi',
      title: 'Grand Theft Auto VI',
      description:
        'Be ready to return to Vice City in the most ambitious Grand Theft Auto yet. Experience a living world with dual protagonists, dynamic missions, and the next evolution of open-world storytelling.',
      releaseDate: 'Nov 19, 2026', // check this date, it moved before
      developer: 'Rockstar Games',
      platforms: ['PlayStation 5', 'Xbox Series X|S'],
      genres: ['Action', 'Adventure', 'Open World'],
      image: '/images/upcoming/grand-theft-auto-vi.webp',
    },
    // PLACEHOLDERS so the banner can scroll and show 3 bars. Replace with real games.
    {
      slug: 'upcoming-2',
      title: 'Upcoming Game 2',
      description: 'Placeholder description. Replace me with the real game description.',
      releaseDate: 'Jan 1, 2027',
      developer: 'Placeholder Studio',
      platforms: ['PC'],
      genres: ['Genre 1', 'Genre 2'],
      image: '/images/upcoming/upcoming-2.webp',
    },
    {
      slug: 'upcoming-3',
      title: 'Upcoming Game 3',
      description: 'Placeholder description. Replace me with the real game description.',
      releaseDate: 'Feb 1, 2027',
      developer: 'Placeholder Studio',
      platforms: ['PC'],
      genres: ['Genre 1', 'Genre 2'],
      image: '/images/upcoming/upcoming-3.webp',
    },
  ]
}