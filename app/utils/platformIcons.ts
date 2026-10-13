// Shared platform icon names. Auto-imported by Nuxt (app/utils).
// Windows = Phosphor, PlayStation = simple-icons, Xbox = Remix Icon
//   npm i @iconify-json/ph @iconify-json/simple-icons @iconify-json/ri
//
// Why Xbox is from another set: the simple-icons Xbox logo fills its whole
// box, so it looked bigger than the others. The Remix one is drawn with
// padding inside the box, so it looks smaller everywhere, with no change
// needed where platformIcons is used.
// Too small / not nice? Try another one-line swap:
//   'i-mdi-microsoft-xbox' (npm i @iconify-json/mdi)
//   'i-bi-xbox'            (npm i @iconify-json/bi)
export const platformIcons: Record<string, string> = {
  windows: 'i-ph-windows-logo-fill',
  playstation: 'i-simple-icons-playstation',
  xbox: 'i-ri-xbox-fill',
}