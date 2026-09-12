# Syunik Dreams

Syunik Dreams is a React Native travel companion for exploring Syunik, Armenia. The app brings together destination guides, local history, tourism routes, restaurants, regional products, and an AI voice guide in one mobile experience.

## Features

- Welcome and onboarding flow for first-time visitors.
- Home screen with featured Syunik destinations.
- City and village detail pages for places such as Goris, Kapan, Sisian, Meghri, and Qajaran.
- Tourism and historical information for planning a trip.
- Road and route information for exploring the region.
- Restaurant directory with addresses, phone numbers, ratings, and local dining tips.
- Regional products and shopping content.
- About and contact pages.
- Map support through `react-native-maps`.
- ElevenLabs-powered voice assistant for destination questions and in-app navigation.
- Native Android and iOS launcher icons generated from `src/assets/logo-syunik.png`.

## Technology

- React Native `0.86`
- React `19`
- TypeScript
- React Navigation
- React Native Maps
- React Native Paper
- Zustand
- Reanimated and Gesture Handler
- ElevenLabs and LiveKit React Native integrations

## Requirements

Install the React Native development prerequisites for your platform before continuing:

- Node.js `>= 22.11.0`
- npm
- Android Studio and an Android SDK/emulator for Android development
- Xcode and CocoaPods for iOS development on macOS
- Ruby Bundler for the repository's CocoaPods setup

See the official [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment) for platform-specific SDK requirements.

## Installation

Clone the repository, install JavaScript dependencies, and install iOS native dependencies:

```sh
npm install

cd ios
bundle install
bundle exec pod install
cd ..
```

The CocoaPods commands are required on the first iOS setup and after native dependency changes.

## Running the app

Start Metro in the project root:

```sh
npm start
```

In a second terminal, launch the Android or iOS application:

```sh
# Android
npm run android

# iOS
npm run ios
```

The app opens on the onboarding screen and then navigates to the Home screen. It can also be built from Android Studio or Xcode after the native dependencies are installed.

## Voice assistant setup

The voice assistant opens from the microphone button in the app header.

1. Set the public ElevenLabs Agent ID in [`src/config/elevenLabs.ts`](src/config/elevenLabs.ts).
2. In the ElevenLabs Agent dashboard, add these client tools with the exact names:

   - `get_current_page_context` - takes no parameters and returns the current app page.
   - `navigate_to_syunik_location` - accepts a `destination` string for cities, villages, roads, landmarks, and historical locations.

Suggested agent instruction:

> You are the Syunik Dreams tourist guide. Answer naturally and concisely about Syunik. Before discussing a supported place, road, landmark, route, or historical destination, call `navigate_to_syunik_location` with its name. Use `get_current_page_context` for follow-up questions about the current page.

Microphone permissions are declared for Android and iOS. Re-run `bundle exec pod install` from `ios` after installing or updating native voice dependencies.

## Project structure

```text
src/
  App.tsx                 Application entry point and navigation shell
  components/             Header, navigation, sidebar, and voice assistant UI
  config/                 Runtime configuration such as the ElevenLabs Agent ID
  data/                   Cities, historical places, and assistant destinations
  features/               Bookings, cart, destinations, and shop features
  navigation/             Navigation types and navigator implementations
  view/                   Main application screens
android/                  Android native project and launcher resources
ios/                      iOS native project and AppIcon asset catalog
scripts/                  Native asset generation helpers
```

## Quality checks

Run linting and tests from the project root:

```sh
npm run lint
npm test
```

For a single test run without watch mode:

```sh
npm test -- --runInBand
```

## App icons

The source logo is stored at [`src/assets/logo-syunik.png`](src/assets/logo-syunik.png). Generated Android icons live under `android/app/src/main/res/mipmap-*`, and iOS icons live in [`ios/SyunikApp/Images.xcassets/AppIcon.appiconset`](ios/SyunikApp/Images.xcassets/AppIcon.appiconset).

The icon renderer is available at [`scripts/render-icon.swift`](scripts/render-icon.swift).

## Resources

- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation documentation](https://reactnavigation.org/docs/getting-started)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [ElevenLabs Conversational AI](https://elevenlabs.io/docs/conversational-ai)
