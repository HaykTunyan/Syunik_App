Follow the rules in AGENTS.md. Key points:
- React Native 0.86 bare CLI (no Expo), TypeScript strict, no `any`.
- React Navigation 7 (native-stack), Zustand, react-native-paper, lucide-react-native.
- Function components, named exports, `StyleSheet.create`.
- Animations with Reanimated shared values, not `setState`.
- Never edit `ios/Pods`, native build output, or Firebase config files.
- Smallest possible diff; no new dependencies; no unrelated refactors.