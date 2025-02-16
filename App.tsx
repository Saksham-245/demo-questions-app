import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, * as reactNativeReanimated from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { QuizCard } from './src/components/QuizCard';
import { QUIZ_QUESTIONS } from './src/constants/questions';

// Get device dimensions for responsive layout
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Minimum distance user needs to swipe for action to trigger (15% of screen width)
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.15;

// Spring animation configuration for natural-feeling movements
const SPRING_CONFIG = {
  damping: 40,      // Controls bounce effect (higher = less bounce)
  mass: 0.15,       // Controls animation weight (lower = faster movement)
  stiffness: 150,   // Controls spring tension (higher = snappier)
  overshootClamping: true,  // Prevents overshooting the target value
  restSpeedThreshold: 0.3,  // Speed at which animation is considered complete
  restDisplacementThreshold: 0.3,  // Distance from target at which animation is considered complete
};

/**
 * Main Quiz App Component
 *
 * Implements an Instagram-style swipeable quiz interface with:
 * - Smooth horizontal swipe gestures
 * - Card transition animations
 * - Circular navigation (returns to first question after last)
 * - Preview of next question
 */
export default function App() {
  // Track current question index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shared value for horizontal swipe animation
  const translateX = reactNativeReanimated.useSharedValue(0);

  /**
   * Handles the completion of a swipe gesture
   * - Left swipe: Move to next question (or first if at end)
   * - Right swipe: Move to previous question (if not at start)
   */
  const handleSwipeComplete = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (currentIndex === QUIZ_QUESTIONS.length - 1) {
        // Wrap around to first question
        setCurrentIndex(0);
      } else {
        // Move to next question
        setCurrentIndex(prev => prev + 1);
      }
    } else if (direction === 'right' && currentIndex > 0) {
      // Move to previous question
      setCurrentIndex(prev => prev - 1);
    }
    // Reset card position with spring animation
    translateX.value = reactNativeReanimated.withSpring(0, {
      ...SPRING_CONFIG,
      velocity: 0,
    });
  }, [currentIndex]);

  /**
   * Pan Gesture Handler Configuration
   * Manages touch interactions and swipe animations
   */
  const gesture = Gesture.Pan()
    .minDistance(0)           // Respond to even tiny movements
    .activeOffsetX([-5, 5])  // Start gesture after 5px movement
    .onBegin(() => {
      // Cancel any ongoing animations when touch starts
      reactNativeReanimated.cancelAnimation(translateX);
    })
    .onUpdate((event) => {
      // Update card position in real-time with finger movement
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const swipeDistance = Math.abs(translateX.value);
      const swipeVelocity = Math.abs(event.velocityX);
      const direction = translateX.value > 0 ? 'right' : 'left';

      // Determine if swipe is allowed in current direction
      const canSwipe = (direction === 'right' && currentIndex > 0) ||
                      (direction === 'left' && (currentIndex < QUIZ_QUESTIONS.length - 1 || currentIndex === QUIZ_QUESTIONS.length - 1));

      // Complete swipe if velocity or distance threshold is met
      if (canSwipe && (swipeVelocity > 300 || swipeDistance > SWIPE_THRESHOLD)) {
        // Animate card off screen
        translateX.value = reactNativeReanimated.withSpring(
          direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
          {
            ...SPRING_CONFIG,
            velocity: event.velocityX,
            damping: 30,
            stiffness: 200,
          }
        );
        reactNativeReanimated.runOnJS(handleSwipeComplete)(direction);
      } else {
        // Return card to center if swipe wasn't completed
        translateX.value = reactNativeReanimated.withSpring(0, {
          ...SPRING_CONFIG,
          velocity: event.velocityX,
          stiffness: 300,
        });
      }
    });

  /**
   * Animation style for the current card
   * Controls position and opacity based on swipe progress
   */
  const rStyle = reactNativeReanimated.useAnimatedStyle(() => {
    const progress = Math.abs(translateX.value) / SCREEN_WIDTH;

    return {
      transform: [
        { translateX: translateX.value }
      ],
      opacity: reactNativeReanimated.interpolate(
        progress,
        [0, 0.8],
        [1, 0.3],
        reactNativeReanimated.Extrapolate.CLAMP
      ),
    };
  });

  /**
   * Animation style for the next card preview
   * Controls scaling and opacity based on current card's position
   */
  const nextCardStyle = reactNativeReanimated.useAnimatedStyle(() => {
    const progress = Math.abs(translateX.value) / SCREEN_WIDTH;

    return {
      transform: [
        { scale: reactNativeReanimated.interpolate(
            progress,
            [0, 0.8],
            [0.98, 1],
            reactNativeReanimated.Extrapolate.CLAMP
          )
        }
      ],
      opacity: reactNativeReanimated.interpolate(
        progress,
        [0, 0.8],
        [0.7, 1],
        reactNativeReanimated.Extrapolate.CLAMP
      ),
    };
  });

  /**
   * Determines the index of the next question to show
   * Handles wrap-around case when at the last question
   */
  const getNextQuestionIndex = () => {
    if (currentIndex === QUIZ_QUESTIONS.length - 1) {
      return 0; // Show first question as next when at the end
    }
    return currentIndex + 1;
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.cardsContainer}>
        {/* Preview of next question (or first question if at end) */}
        <Animated.View style={[styles.cardContainer, styles.nextCard, nextCardStyle]}>
          <QuizCard question={QUIZ_QUESTIONS[getNextQuestionIndex()]} />
        </Animated.View>
        {/* Current question card with gesture handling */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.cardContainer, rStyle]}>
            <QuizCard question={QUIZ_QUESTIONS[currentIndex]} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

/**
 * Component Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardsContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  cardContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  nextCard: {
    zIndex: -1, // Place behind current card
  },
});
