# Task: Redesign First Screen (HomeScreen) UI

## Steps
- [x] 0. Analyze current HomeScreen and app design language
- [x] 1. Explore data (CITIES, citiesData), components (AppHeader, BottomNav, Sidebar), App shell
- [x] 2. Create plan for modern travel-app style HomeScreen
- [x] 3. Create reusable `SectionHeader` component
- [x] 4. Rewrite `HomeScreen.tsx` with:
  - [x] Hero section (full-bleed image, scrim, title, subtitle, CTA buttons)
  - [x] Search bar (live city filter)
  - [x] Stats row (cities, attractions, history)
  - [x] "Explore Cities" grid (improved cards with cover images)
  - [x] "Popular Attractions" horizontal cards
  - [x] "Why Syunik?" highlight card + footer
- [x] 5. Verify TypeScript compiles (`npx tsc --noEmit`)
- [x] 6. Run lint/tests to confirm no new regressions
  - Note: `App.test.tsx` fails on a **pre-existing** jest/`react-native-reanimated-carousel` ESM transform config issue unrelated to these changes (was failing before edits).

