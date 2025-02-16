import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { QuizQuestion } from '../types/quiz';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Props interface for the QuizCard component
 */
interface QuizCardProps {
  /** The question object to be displayed in the card */
  question: QuizQuestion;
}

/**
 * QuizCard Component
 *
 * Displays a single quiz question in a card format with styling for:
 * - Category label
 * - Question text
 * - Swipe hint
 *
 * The component is designed to be used within a swipeable container
 * and maintains a consistent layout across different screen sizes.
 *
 * @param {QuizCardProps} props - Component props containing the question object
 * @returns {JSX.Element} Rendered card component
 */
export const QuizCard: React.FC<QuizCardProps> = ({ question }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.category}>{question.category}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        <Text style={styles.hint}>Swipe for next question</Text>
      </View>
    </View>
  );
};

/**
 * Styles for the QuizCard component
 *
 * Uses a card-based design with:
 * - Shadow effects for depth
 * - Responsive width
 * - Consistent spacing
 * - Typography hierarchy
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  questionText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  hint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    position: 'absolute',
    bottom: 60,
    width: '100%',
  },
});
