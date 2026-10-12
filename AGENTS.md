# Project
SyunikApp: React Native 0.86 (bare CLI, no Expo), React 19, TypeScript strict.
Tourism app with maps, push notifications, and voice AI.

# Stack (use these, don't add alternatives)
- Navigation: React Navigation 7. Use `native-stack` for stacks, `bottom-tabs` for tabs.
- State: Zustand. Keep stores small and split by feature. Select slices, never the whole store.
- UI: react-native-paper + StyleSheet. Icons: lucide-react-native.
- Animation: Reanimated 4 + react-native-worklets. Gestures: gesture-handler 3.
- Bottom sheets: @gorhom/bottom-sheet. Maps: react-native-maps.
- Storage: AsyncStorage. Push: Firebase messaging.
- Voice AI: @elevenlabs/react-native and LiveKit. Keep each SDK behind its own module.

# Commands
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test one file: `npx jest <path>` (never run the full suite unless asked)
- Do NOT run `npm run android`, `npm run ios`, or `npm start`. I run the app myself.

# Code rules
- No `any`, no `@ts-ignore`. Use `unknown` and narrow.
- Function components, named exports, `type Props = {...}`.
- Always use `StyleSheet.create`. No inline style objects for static styles.
- Use `FlatList`/`FlashList` for lists, never `ScrollView` + `map` for long lists.
- Wrap handlers passed to list items in `useCallback`; memoize heavy rows.
- Reanimated: animate with shared values and worklets, not `setState`.
- Respect safe areas on every screen.
- Handle loading, error, empty, and offline states in every data-driven screen.
- Accessibility: `accessibilityLabel` and `accessibilityRole` on touchables and icons.
- Platform differences go through `Platform.select`.
- Never hardcode API keys or tokens. Use env config.
- Follow the patterns of neighboring files before inventing new ones.

# Native code rules
- Don't edit `ios/Pods`, build folders, or generated native files.
- After adding a native dependency, tell me to run `pod install` and rebuild. Don't run it yourself.
- Don't touch `google-services.json`, `GoogleService-Info.plist`, or signing configs.

# Workflow
- Smallest possible diff. No unrelated refactors.
- Don't add dependencies without asking.
- After changes, run typecheck and lint and fix errors before finishing.
- If the request is ambiguous, ask one short question instead of guessing.