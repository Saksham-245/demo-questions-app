# Quiz App with Instagram-Style Swipes

A React Native Expo app that demonstrates Instagram-style swipeable cards for quiz questions. Built with TypeScript and React Native Reanimated for smooth animations.

## Features

- Instagram-style horizontal swipe gestures
- Smooth card transitions and animations
- Circular navigation (returns to first question after last)
- Preview of next question
- Cross-platform support (iOS, Android, Web)
- TypeScript implementation

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [CocoaPods](https://cocoapods.org/) (for iOS dependencies)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-questions-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running Development Build Locally

### Create Development Build

1. Generate the native code:
```bash
npx expo start --dev-client
```

### For Android:

1. Create debug build:
```bash
cd android
# Clean project (recommended)
./gradlew clean
# Create debug build
./gradlew assembleDebug
cd ..
```

2. Start the development server:
```bash
# Start Metro bundler
npx expo
```

3. Run on Android:
```bash
# In a new terminal
npm run android
```

### For iOS (macOS only):

1. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

2. Start the development server and run:
```bash
# Start Metro bundler and run iOS
npm run ios
```

### Development Server Options

When running `npm start`, you can use these options:
- Press `a` to run on Android
- Press `i` to run on iOS simulator
- Press `r` to reload the app
- Press `m` to toggle the menu
- Press `d` to open developer tools

## Troubleshooting Development Build

### Android Issues:

1. If build fails:
```bash
cd android
# Clean the project
./gradlew clean
# Clear gradle cache
rm -rf ~/.gradle/caches/
# Rebuild
./gradlew assembleDebug
```

2. If app crashes:
```bash
# Clear Metro cache
npm start -- --reset-cache
```

3. Check Android SDK location:
```bash
# Create local.properties if missing
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

### iOS Issues:

1. If pod install fails:
```bash
cd ios
# Deintegrate pods
pod deintegrate
# Clean pods cache
rm -rf Pods
rm -rf Podfile.lock
# Reinstall pods
pod install
cd ..
```

2. If build fails:
```bash
# Clean iOS build
cd ios
xcodebuild clean
cd ..
```

### General Development Tips:

1. Watch for common errors:
- Metro bundler port conflicts
- Missing Android SDK tools
- Incorrect path configurations

2. Development performance:
- Enable Fast Refresh in the developer menu
- Use physical devices for better performance
- Keep Metro bundler running

3. Debug tools:
- Use React Native Debugger
- Enable Chrome Developer Tools
- Check Metro bundler console

## Project Structure

```
demo-questions-app/
├── android/                # Android native files
├── ios/                   # iOS native files
├── src/
│   ├── components/
│   │   └── QuizCard.tsx  # Card component
│   ├── constants/
│   │   └── questions.ts  # Quiz questions
│   └── types/
│       └── quiz.ts       # TypeScript interfaces
├── App.tsx               # Main application
├── babel.config.js       # Babel configuration
└── package.json         # Dependencies
```

## Usage

- Swipe left to see the next question
- Swipe right to see the previous question
- When you reach the last question, swiping left will return you to the first question
- Quick swipes or long swipes past the threshold will trigger question changes

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request
