// Store buttons in "Where to Get". Auto-imported by Nuxt (app/utils).
// The keys are what a game uses in "stores" -> "type" in app/data/games.json.
// Xbox icon is the Remix one for the same reason as in platformIcons.
export const gameStores: Record<string, { label: string, icon: string }> = {
  steam: { label: 'Steam', icon: 'i-simple-icons-steam' },
  epic: { label: 'Epic Games Store', icon: 'i-simple-icons-epicgames' },
  playstation: { label: 'PlayStation Store', icon: 'i-simple-icons-playstation' },
  xbox: { label: 'Xbox Store', icon: 'i-ri-xbox-fill' },
}