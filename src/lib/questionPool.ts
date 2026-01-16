import { Question, YearGroup, Subject } from '@/types/game';
import { generateRandomQuestion } from './questionGenerator';
import { generateSubjectQuestion } from './subjectQuestionGenerator';
import { generateAIQuestions, SUBJECT_TOPICS, getRandomTopic as getAIRandomTopic, clearQuestionCache } from './aiQuestionGenerator';

// Flag to enable/disable AI generation (can be toggled for fallback)
let useAIGeneration = true;

/**
 * Session-based question manager that prevents ANY question from repeating
 * within a single game session, across ALL topics.
 * Now with AI-powered question generation for unlimited variety!
 */
class QuestionSessionManager {
  private askedQuestions: Set<string> = new Set();
  private sessionId: string = '';
  private aiQuestionBuffer: Question[] = [];
  private isLoadingAI = false;
  private aiEnabled = true;

  /**
   * Start a new game session - clears all tracked questions
   */
  startNewSession(): void {
    this.askedQuestions.clear();
    this.aiQuestionBuffer = [];
    this.isLoadingAI = false;
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    clearQuestionCache();
  }

  /**
   * Enable or disable AI question generation
   */
  setAIEnabled(enabled: boolean): void {
    this.aiEnabled = enabled;
    useAIGeneration = enabled;
  }

  /**
   * Check if AI generation is enabled
   */
  isAIEnabled(): boolean {
    return this.aiEnabled && useAIGeneration;
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
   * Try to get an AI-generated question
   */
  async getAIQuestion(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Promise<Question | null> {
    if (!this.aiEnabled || !useAIGeneration) {
      return null;
    }

    // Check buffer first
    const bufferedQuestion = this.aiQuestionBuffer.find(q => 
      !this.hasBeenAsked(q.question) &&
      (!topic || q.topic === topic)
    );

    if (bufferedQuestion) {
      this.aiQuestionBuffer = this.aiQuestionBuffer.filter(q => q !== bufferedQuestion);
      return bufferedQuestion;
    }

    // Load more AI questions
    if (!this.isLoadingAI) {
      this.isLoadingAI = true;
      try {
        const actualTopic = topic || getAIRandomTopic(subject);
        const newQuestions = await generateAIQuestions(subject, actualTopic, yearGroup, 10);
        
        // Add unique questions to buffer
        newQuestions.forEach(q => {
          if (!this.hasBeenAsked(q.question)) {
            this.aiQuestionBuffer.push(q);
          }
        });

        // Return first new question
        if (newQuestions.length > 0) {
          const first = newQuestions[0];
          this.aiQuestionBuffer = this.aiQuestionBuffer.filter(q => q !== first);
          return first;
        }
      } catch (error) {
        console.error('AI question generation failed:', error);
        // Disable AI for this session on repeated failures
        this.aiEnabled = false;
      } finally {
        this.isLoadingAI = false;
      }
    }

    return null;
  }

  /**
   * Generate a unique question that hasn't been asked in this session
   * Uses AI generation when available, falls back to static questions
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
   * Get a unique question - tries AI first, then falls back to static
   */
  async getUniqueQuestionAsync(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Promise<Question> {
    // Try AI first
    if (this.aiEnabled && useAIGeneration) {
      const aiQuestion = await this.getAIQuestion(subject, yearGroup, topic);
      if (aiQuestion && !this.hasBeenAsked(aiQuestion.question)) {
        this.markAsAsked(aiQuestion.question);
        return aiQuestion;
      }
    }

    // Fall back to static generation
    return this.getUniqueQuestion(subject, yearGroup, topic);
  }

  /**
   * Get a random topic for a subject (expanded list)
   */
  private getRandomTopic(subject: Subject): string {
    const topics = SUBJECT_TOPICS[subject] || ['trivia'];
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

  /**
   * Generate multiple unique questions at once with AI
   */
  async getUniqueQuestionBatchAsync(
    subject: Subject,
    yearGroup: YearGroup,
    count: number,
    topic?: string
  ): Promise<Question[]> {
    const questions: Question[] = [];
    
    // Try AI batch generation first
    if (this.aiEnabled && useAIGeneration) {
      try {
        const actualTopic = topic || getAIRandomTopic(subject);
        const aiQuestions = await generateAIQuestions(subject, actualTopic, yearGroup, count);
        
        for (const q of aiQuestions) {
          if (!this.hasBeenAsked(q.question)) {
            this.markAsAsked(q.question);
            questions.push(q);
            if (questions.length >= count) break;
          }
        }
      } catch (error) {
        console.error('AI batch generation failed:', error);
      }
    }

    // Fill remaining with static questions
    while (questions.length < count) {
      questions.push(this.getUniqueQuestion(subject, yearGroup, topic));
    }

    return questions;
  }
}

// Global singleton instance for the current game session
export const questionSession = new QuestionSessionManager();

// Helper function to get a unique question (convenience wrapper - synchronous)
export const getUniqueQuestion = (
  subject: Subject,
  yearGroup: YearGroup,
  topic?: string
): Question => {
  return questionSession.getUniqueQuestion(subject, yearGroup, topic);
};

// Helper function to get a unique question with AI (async)
export const getUniqueQuestionAsync = async (
  subject: Subject,
  yearGroup: YearGroup,
  topic?: string
): Promise<Question> => {
  return questionSession.getUniqueQuestionAsync(subject, yearGroup, topic);
};

// Helper function to get a batch of questions with AI (async)
export const getUniqueQuestionBatchAsync = async (
  subject: Subject,
  yearGroup: YearGroup,
  count: number,
  topic?: string
): Promise<Question[]> => {
  return questionSession.getUniqueQuestionBatchAsync(subject, yearGroup, count, topic);
};

// Helper function to start a new session
export const startNewQuestionSession = (): void => {
  questionSession.startNewSession();
};

// Helper function to get session stats
export const getSessionStats = (): { asked: number; sessionId: string; aiEnabled: boolean } => {
  return {
    asked: questionSession.getAskedCount(),
    sessionId: questionSession.getSessionId(),
    aiEnabled: questionSession.isAIEnabled(),
  };
};

// Toggle AI generation
export const setAIGenerationEnabled = (enabled: boolean): void => {
  questionSession.setAIEnabled(enabled);
};

// Re-export topics for UI
export { SUBJECT_TOPICS };

export const QUIZ_QUESTION_COUNT = 10;
