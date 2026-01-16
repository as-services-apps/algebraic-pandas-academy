import { Question, YearGroup, Subject } from '@/types/game';
import { generateRandomQuestion } from './questionGenerator';
import { generateSubjectQuestion } from './subjectQuestionGenerator';

/**
 * Session-based question manager that prevents ANY question from repeating
 * within a single game session, across ALL topics.
 */
class QuestionSessionManager {
  private askedQuestions: Set<string> = new Set();
  private sessionId: string = '';

  /**
   * Start a new game session - clears all tracked questions
   */
  startNewSession(): void {
    this.askedQuestions.clear();
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Check if a question has already been asked in this session
   */
  hasBeenAsked(questionText: string): boolean {
    return this.askedQuestions.has(this.normalizeQuestion(questionText));
  }

  /**
   * Mark a question as asked
   */
  markAsAsked(questionText: string): void {
    this.askedQuestions.add(this.normalizeQuestion(questionText));
  }

  /**
   * Get the count of questions asked this session
   */
  getAskedCount(): number {
    return this.askedQuestions.size;
  }

  /**
   * Normalize question text for comparison
   */
  private normalizeQuestion(text: string): string {
    return text.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /**
   * Generate a unique question that hasn't been asked in this session
   */
  getUniqueQuestion(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Question {
    const maxAttempts = 100;
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts++;
      
      const actualTopic = topic || this.getRandomTopic(subject);
      let question: Question;
      
      if (subject === 'maths') {
        question = generateRandomQuestion(actualTopic, yearGroup);
      } else {
        question = generateSubjectQuestion(subject, actualTopic, yearGroup);
      }

      if (!this.hasBeenAsked(question.question)) {
        this.markAsAsked(question.question);
        return question;
      }
    }

    // Fallback: return a question even if it might repeat (very unlikely)
    const fallbackTopic = topic || this.getRandomTopic(subject);
    const fallbackQuestion = subject === 'maths'
      ? generateRandomQuestion(fallbackTopic, yearGroup)
      : generateSubjectQuestion(subject, fallbackTopic, yearGroup);
    
    this.markAsAsked(fallbackQuestion.question);
    return fallbackQuestion;
  }

  /**
   * Get a random topic for a subject
   */
  private getRandomTopic(subject: Subject): string {
    const topicMap: Record<Subject, string[]> = {
      maths: ['mental', 'algebra', 'fractions', 'percentages', 'geometry', 'ratios', 'equations'],
      science: ['biology', 'chemistry', 'physics', 'space'],
      english: ['grammar', 'vocabulary', 'literature', 'reading'],
      french: ['vocabulary', 'numbers', 'phrases'],
      it: ['coding', 'internet', 'hardware'],
      history: ['ancient', 'medieval', 'modern', 'british'],
      geography: ['physical', 'human', 'climate', 'countries'],
      general: ['trivia', 'sports', 'nature', 'music'],
      quicklearn: ['funfacts', 'brainteasers', 'lifeskills'],
    };
    const topics = topicMap[subject] || ['trivia'];
    return topics[Math.floor(Math.random() * topics.length)];
  }

  /**
   * Generate multiple unique questions at once
   */
  getUniqueQuestionBatch(
    subject: Subject,
    yearGroup: YearGroup,
    count: number,
    topic?: string
  ): Question[] {
    const questions: Question[] = [];
    for (let i = 0; i < count; i++) {
      questions.push(this.getUniqueQuestion(subject, yearGroup, topic));
    }
    return questions;
  }
}

// Global singleton instance for the current game session
export const questionSession = new QuestionSessionManager();

// Helper function to get a unique question (convenience wrapper)
export const getUniqueQuestion = (
  subject: Subject,
  yearGroup: YearGroup,
  topic?: string
): Question => {
  return questionSession.getUniqueQuestion(subject, yearGroup, topic);
};

// Helper function to start a new session
export const startNewQuestionSession = (): void => {
  questionSession.startNewSession();
};

// Helper function to get session stats
export const getSessionStats = (): { asked: number; sessionId: string } => {
  return {
    asked: questionSession.getAskedCount(),
    sessionId: questionSession.getSessionId(),
  };
};

export const QUIZ_QUESTION_COUNT = 10;
