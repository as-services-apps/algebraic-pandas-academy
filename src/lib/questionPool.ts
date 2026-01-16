import { Question, YearGroup, Subject } from '@/types/game';
import { generateRandomQuestion } from './questionGenerator';
import { generateSubjectQuestion } from './subjectQuestionGenerator';

const QUESTIONS_PER_QUIZ = 10;
const POOL_SIZE = 50; // Generate a large pool to pick from

/**
 * Generates a pool of unique questions for a quiz session.
 * Uses a set to track question text and ensure no duplicates.
 */
export const generateQuestionPool = (
  subject: Subject,
  topic: string,
  yearGroup: YearGroup,
  count: number = QUESTIONS_PER_QUIZ
): Question[] => {
  const questions: Question[] = [];
  const questionTexts = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops
  
  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    
    let question: Question;
    if (subject === 'maths') {
      question = generateRandomQuestion(topic, yearGroup);
    } else {
      question = generateSubjectQuestion(subject, topic, yearGroup);
    }
    
    // Only add if we haven't seen this question text before
    if (!questionTexts.has(question.question)) {
      questionTexts.add(question.question);
      questions.push(question);
    }
  }
  
  return questions;
};

/**
 * Generates a mixed pool of questions from multiple topics
 */
export const generateMixedQuestionPool = (
  subject: Subject,
  yearGroup: YearGroup,
  count: number = QUESTIONS_PER_QUIZ
): Question[] => {
  const topicMap: Record<Subject, string[]> = {
    maths: ['mental', 'algebra', 'fractions', 'percentages', 'geometry', 'ratios', 'equations'],
    science: ['biology', 'chemistry', 'physics', 'space'],
    english: ['grammar', 'vocabulary', 'literature', 'reading'],
    french: ['vocabulary', 'numbers', 'phrases', 'grammar'],
    it: ['coding', 'internet', 'hardware', 'software'],
    history: ['ancient', 'medieval', 'modern', 'british'],
    geography: ['physical', 'human', 'climate', 'countries'],
    general: ['trivia', 'sports', 'nature', 'entertainment'],
    quicklearn: ['funfacts', 'brainteasers', 'lifeskills'],
  };

  const topics = topicMap[subject] || ['trivia'];
  const questions: Question[] = [];
  const questionTexts = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = count * 15;
  
  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    let question: Question;
    if (subject === 'maths') {
      question = generateRandomQuestion(topic, yearGroup);
    } else {
      question = generateSubjectQuestion(subject, topic, yearGroup);
    }
    
    if (!questionTexts.has(question.question)) {
      questionTexts.add(question.question);
      questions.push(question);
    }
  }
  
  return shuffleArray(questions);
};

/**
 * Fisher-Yates shuffle algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const QUIZ_QUESTION_COUNT = QUESTIONS_PER_QUIZ;
