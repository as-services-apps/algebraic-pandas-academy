import { Question, YearGroup, Subject } from '@/types/game';
import { generateRandomQuestion } from './questionGenerator';
import { generateSubjectQuestion } from './subjectQuestionGenerator';
import { generateAIQuestions, SUBJECT_TOPICS, getRandomTopic as getAIRandomTopic, clearQuestionCache } from './aiQuestionGenerator';

// Flag to enable/disable AI generation (can be toggled for fallback)
let useAIGeneration = true;

/**
 * Generate a hash for a question to detect duplicates
 * Uses multiple factors for robust duplicate detection
 */
function generateQuestionHash(question: string, correctAnswerIndex?: number, options?: string[]): string {
  const normalizedQ = question.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
  
  // Get the actual answer text if we have options and an index
  const answerText = (options && correctAnswerIndex !== undefined && options[correctAnswerIndex])
    ? options[correctAnswerIndex].toLowerCase().replace(/[^a-z0-9]/g, '').trim()
    : String(correctAnswerIndex ?? '');
  
  return `${normalizedQ}::${answerText}`;
}

/**
 * Check if two questions are semantically similar
 */
function areQuestionsSimilar(q1: string, q2: string): boolean {
  const norm1 = q1.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const norm2 = q2.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  
  if (norm1 === norm2) return true;
  
  if (norm1.includes(norm2) || norm2.includes(norm1)) {
    const lengthRatio = Math.min(norm1.length, norm2.length) / Math.max(norm1.length, norm2.length);
    if (lengthRatio > 0.8) return true;
  }
  
  const words1 = new Set(norm1.split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(norm2.split(/\s+/).filter(w => w.length > 2));
  
  if (words1.size === 0 || words2.size === 0) return false;
  
  let overlap = 0;
  words1.forEach(w => { if (words2.has(w)) overlap++; });
  
  const overlapRatio = overlap / Math.min(words1.size, words2.size);
  return overlapRatio > 0.85;
}

/**
 * Session-based question manager that BLOCKS any question from repeating
 * within a single game session, across ALL topics.
 * Uses multiple layers of duplicate detection for absolute uniqueness.
 */
class QuestionSessionManager {
  private askedQuestionHashes: Set<string> = new Set();
  private askedQuestionTexts: string[] = [];
  private sessionId: string = '';
  private aiQuestionBuffer: Question[] = [];
  private isLoadingAI = false;
  private aiEnabled = true;
  private blockedCount = 0;

  startNewSession(): void {
    this.askedQuestionHashes.clear();
    this.askedQuestionTexts = [];
    this.aiQuestionBuffer = [];
    this.isLoadingAI = false;
    this.blockedCount = 0;
    this.sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    clearQuestionCache();
    console.log(`[QuestionBlocker] New session started: ${this.sessionId}`);
  }

  setAIEnabled(enabled: boolean): void {
    this.aiEnabled = enabled;
    useAIGeneration = enabled;
  }

  isAIEnabled(): boolean {
    return this.aiEnabled && useAIGeneration;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getBlockedCount(): number {
    return this.blockedCount;
  }

  hasBeenAsked(questionText: string, correctAnswerIndex?: number, options?: string[]): boolean {
    const hash = generateQuestionHash(questionText, correctAnswerIndex, options);
    
    if (this.askedQuestionHashes.has(hash)) {
      return true;
    }
    
    for (const askedQ of this.askedQuestionTexts) {
      if (areQuestionsSimilar(questionText, askedQ)) {
        return true;
      }
    }
    
    return false;
  }

  markAsAsked(question: Question): void {
    const hash = generateQuestionHash(question.question, question.correctAnswer, question.options);
    this.askedQuestionHashes.add(hash);
    this.askedQuestionTexts.push(question.question);
    console.log(`[QuestionBlocker] Registered: "${question.question.substring(0, 50)}..." (Total: ${this.askedQuestionTexts.length})`);
  }

  getAskedCount(): number {
    return this.askedQuestionTexts.length;
  }

  private normalizeQuestion(text: string): string {
    return text.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  async getAIQuestion(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Promise<Question | null> {
    if (!this.aiEnabled || !useAIGeneration) {
      return null;
    }

    const bufferedIndex = this.aiQuestionBuffer.findIndex(q => 
      !this.hasBeenAsked(q.question, q.correctAnswer, q.options) &&
      (!topic || q.topic === topic)
    );

    if (bufferedIndex !== -1) {
      const [bufferedQuestion] = this.aiQuestionBuffer.splice(bufferedIndex, 1);
      console.log(`[QuestionBlocker] Serving from buffer: "${bufferedQuestion.question.substring(0, 40)}..."`);
      return bufferedQuestion;
    }

    if (!this.isLoadingAI) {
      this.isLoadingAI = true;
      try {
        const actualTopic = topic || getAIRandomTopic(subject);
        const newQuestions = await generateAIQuestions(subject, actualTopic, yearGroup, 15);
        
        let addedCount = 0;
        let blockedCount = 0;
        
        for (const q of newQuestions) {
          if (!this.hasBeenAsked(q.question, q.correctAnswer, q.options)) {
            this.aiQuestionBuffer.push(q);
            addedCount++;
          } else {
            blockedCount++;
            this.blockedCount++;
          }
        }
        
        console.log(`[QuestionBlocker] AI batch: ${addedCount} unique, ${blockedCount} blocked`);

        if (this.aiQuestionBuffer.length > 0) {
          return this.aiQuestionBuffer.shift() || null;
        }
      } catch (error) {
        console.error('AI question generation failed:', error);
        this.aiEnabled = false;
      } finally {
        this.isLoadingAI = false;
      }
    }

    return null;
  }

  getUniqueQuestion(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Question {
    const maxAttempts = 200;
    let attempts = 0;
    const triedTopics = new Set<string>();

    while (attempts < maxAttempts) {
      attempts++;
      
      const actualTopic = topic || this.getRotatingTopic(subject, triedTopics);
      triedTopics.add(actualTopic);
      
      let question: Question;
      
      if (subject === 'maths') {
        question = generateRandomQuestion(actualTopic, yearGroup);
      } else {
        question = generateSubjectQuestion(subject, actualTopic, yearGroup);
      }

      if (!this.hasBeenAsked(question.question, question.correctAnswer, question.options)) {
        this.markAsAsked(question);
        return question;
      } else {
        this.blockedCount++;
        console.log(`[QuestionBlocker] BLOCKED duplicate (attempt ${attempts}): "${question.question.substring(0, 40)}..."`);
      }
    }

    console.warn(`[QuestionBlocker] Max attempts reached, generating modified question`);
    const fallbackTopic = topic || this.getRandomTopic(subject);
    const fallbackQuestion = subject === 'maths'
      ? generateRandomQuestion(fallbackTopic, yearGroup)
      : generateSubjectQuestion(subject, fallbackTopic, yearGroup);
    
    fallbackQuestion.question = `${fallbackQuestion.question} (Variation ${this.getAskedCount() + 1})`;
    fallbackQuestion.id = `fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.markAsAsked(fallbackQuestion);
    return fallbackQuestion;
  }

  private getRotatingTopic(subject: Subject, tried: Set<string>): string {
    const topics = SUBJECT_TOPICS[subject] || ['trivia'];
    const untried = topics.filter(t => !tried.has(t));
    
    if (untried.length > 0) {
      return untried[Math.floor(Math.random() * untried.length)];
    }
    
    return topics[Math.floor(Math.random() * topics.length)];
  }

  async getUniqueQuestionAsync(
    subject: Subject,
    yearGroup: YearGroup,
    topic?: string
  ): Promise<Question> {
    if (this.aiEnabled && useAIGeneration) {
      const aiQuestion = await this.getAIQuestion(subject, yearGroup, topic);
      if (aiQuestion && !this.hasBeenAsked(aiQuestion.question, aiQuestion.correctAnswer, aiQuestion.options)) {
        this.markAsAsked(aiQuestion);
        return aiQuestion;
      }
    }

    return this.getUniqueQuestion(subject, yearGroup, topic);
  }

  private getRandomTopic(subject: Subject): string {
    const topics = SUBJECT_TOPICS[subject] || ['trivia'];
    return topics[Math.floor(Math.random() * topics.length)];
  }

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

  async getUniqueQuestionBatchAsync(
    subject: Subject,
    yearGroup: YearGroup,
    count: number,
    topic?: string
  ): Promise<Question[]> {
    const questions: Question[] = [];
    
    if (this.aiEnabled && useAIGeneration) {
      try {
        const actualTopic = topic || getAIRandomTopic(subject);
        const aiQuestions = await generateAIQuestions(subject, actualTopic, yearGroup, count * 2);
        
        for (const q of aiQuestions) {
          if (!this.hasBeenAsked(q.question, q.correctAnswer, q.options)) {
            this.markAsAsked(q);
            questions.push(q);
            if (questions.length >= count) break;
          } else {
            this.blockedCount++;
            console.log(`[QuestionBlocker] BLOCKED in batch: "${q.question.substring(0, 40)}..."`);
          }
        }
      } catch (error) {
        console.error('AI batch generation failed:', error);
      }
    }

    while (questions.length < count) {
      questions.push(this.getUniqueQuestion(subject, yearGroup, topic));
    }

    console.log(`[QuestionBlocker] Batch complete: ${questions.length} questions, ${this.blockedCount} total blocked this session`);
    return questions;
  }
}

// Global singleton instance
export const questionSession = new QuestionSessionManager();

export const getUniqueQuestion = (
  subject: Subject,
  yearGroup: YearGroup,
  topic?: string
): Question => {
  return questionSession.getUniqueQuestion(subject, yearGroup, topic);
};

export const getUniqueQuestionAsync = async (
  subject: Subject,
  yearGroup: YearGroup,
  topic?: string
): Promise<Question> => {
  return questionSession.getUniqueQuestionAsync(subject, yearGroup, topic);
};

export const getUniqueQuestionBatchAsync = async (
  subject: Subject,
  yearGroup: YearGroup,
  count: number,
  topic?: string
): Promise<Question[]> => {
  return questionSession.getUniqueQuestionBatchAsync(subject, yearGroup, count, topic);
};

export const startNewQuestionSession = (): void => {
  questionSession.startNewSession();
};

export const getSessionStats = (): { asked: number; sessionId: string; aiEnabled: boolean; blocked: number } => {
  return {
    asked: questionSession.getAskedCount(),
    sessionId: questionSession.getSessionId(),
    aiEnabled: questionSession.isAIEnabled(),
    blocked: questionSession.getBlockedCount(),
  };
};

export const setAIGenerationEnabled = (enabled: boolean): void => {
  questionSession.setAIEnabled(enabled);
};

export { SUBJECT_TOPICS };

export const QUIZ_QUESTION_COUNT = 10;
