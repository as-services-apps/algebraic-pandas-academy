import { Question, YearGroup, Subject } from '@/types/game';
import { supabase } from '@/integrations/supabase/client';

// Extended topic list for each subject
export const SUBJECT_TOPICS: Record<Subject, string[]> = {
  maths: [
    'mental', 'algebra', 'fractions', 'percentages', 'geometry', 
    'ratios', 'equations', 'statistics', 'probability', 'measurement'
  ],
  science: [
    'biology', 'chemistry', 'physics', 'space', 'environment', 'evolution'
  ],
  english: [
    'grammar', 'vocabulary', 'literature', 'reading', 'spelling', 'writing'
  ],
  history: [
    'ancient', 'medieval', 'modern', 'british', 'world', 'inventions'
  ],
  geography: [
    'physical', 'human', 'climate', 'countries', 'environment', 'maps'
  ],
  french: [
    'vocabulary', 'numbers', 'phrases', 'grammar', 'culture'
  ],
  it: [
    'coding', 'internet', 'hardware', 'software', 'digital'
  ],
  general: [
    'trivia', 'sports', 'nature', 'music', 'art', 'food'
  ],
  quicklearn: [
    'funfacts', 'brainteasers', 'lifeskills', 'current'
  ],
  custom: [
    'general'
  ],
};

// Cache for AI-generated questions to reduce API calls
const questionCache = new Map<string, Question[]>();

/**
 * Generate questions using AI
 */
export async function generateAIQuestions(
  subject: Subject,
  topic: string,
  yearGroup: YearGroup,
  count: number = 5
): Promise<Question[]> {
  const cacheKey = `${subject}-${topic}-${yearGroup}-${Date.now().toString().slice(0, -4)}`; // Cache for ~10 seconds
  
  try {
    console.log(`Requesting AI questions: ${subject}/${topic} (Year ${yearGroup})`);
    
    const { data, error } = await supabase.functions.invoke('generate-questions', {
      body: { subject, topic, yearGroup, count }
    });

    if (error) {
      console.error('Error calling generate-questions:', error);
      throw error;
    }

    if (data?.error) {
      console.error('AI generation error:', data.error);
      throw new Error(data.error);
    }

    const questions: Question[] = (data.questions || []).map((q: any, index: number) => ({
      id: `ai-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      topic,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty || 'medium',
      yearGroup,
      points: 1,
    }));

    // Cache the questions
    if (questions.length > 0) {
      const existing = questionCache.get(cacheKey) || [];
      questionCache.set(cacheKey, [...existing, ...questions]);
    }

    console.log(`Generated ${questions.length} AI questions`);
    return questions;

  } catch (error) {
    console.error('Failed to generate AI questions:', error);
    throw error;
  }
}

/**
 * Get a random topic for a subject
 */
export function getRandomTopic(subject: Subject): string {
  const topics = SUBJECT_TOPICS[subject] || ['trivia'];
  return topics[Math.floor(Math.random() * topics.length)];
}

/**
 * Pre-fetch questions for smoother gameplay
 */
export async function prefetchQuestions(
  subject: Subject,
  yearGroup: YearGroup,
  count: number = 15
): Promise<Question[]> {
  const allQuestions: Question[] = [];
  const topics = SUBJECT_TOPICS[subject] || ['trivia'];
  
  // Generate questions from multiple topics
  const questionsPerTopic = Math.ceil(count / topics.length);
  
  const promises = topics.slice(0, 3).map(topic => 
    generateAIQuestions(subject, topic, yearGroup, questionsPerTopic)
      .catch(err => {
        console.error(`Failed to prefetch ${topic}:`, err);
        return [];
      })
  );

  const results = await Promise.all(promises);
  results.forEach(questions => allQuestions.push(...questions));

  return allQuestions;
}

/**
 * Clear the question cache
 */
export function clearQuestionCache(): void {
  questionCache.clear();
}
