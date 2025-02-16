/**
 * Represents a quiz question in the application.
 * Used for displaying questions in the swipeable card interface.
 */
export interface QuizQuestion {
  /** Unique identifier for the question */
  id: number;
  /** The actual question text to be displayed */
  question: string;
  /** Optional category/topic the question belongs to */
  category?: string;
}
