import { Question, YearGroup } from '@/types/game';

type Operation = '+' | '-' | '*' | '/';

interface GeneratorConfig {
  operations: Operation[];
  minNum: number;
  maxNum: number;
  allowNegatives: boolean;
  allowDecimals: boolean;
  complexity: 'simple' | 'medium' | 'complex';
}

const yearConfigs: Record<YearGroup, GeneratorConfig> = {
  7: {
    operations: ['+', '-', '*'],
    minNum: 1,
    maxNum: 20,
    allowNegatives: false,
    allowDecimals: false,
    complexity: 'simple',
  },
  8: {
    operations: ['+', '-', '*', '/'],
    minNum: 1,
    maxNum: 50,
    allowNegatives: false,
    allowDecimals: false,
    complexity: 'simple',
  },
  9: {
    operations: ['+', '-', '*', '/'],
    minNum: 1,
    maxNum: 100,
    allowNegatives: true,
    allowDecimals: false,
    complexity: 'medium',
  },
  10: {
    operations: ['+', '-', '*', '/'],
    minNum: -50,
    maxNum: 100,
    allowNegatives: true,
    allowDecimals: true,
    complexity: 'medium',
  },
  11: {
    operations: ['+', '-', '*', '/'],
    minNum: -100,
    maxNum: 200,
    allowNegatives: true,
    allowDecimals: true,
    complexity: 'complex',
  },
  12: {
    operations: ['+', '-', '*', '/'],
    minNum: -200,
    maxNum: 500,
    allowNegatives: true,
    allowDecimals: true,
    complexity: 'complex',
  },
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomOperation = (operations: Operation[]): Operation => {
  return operations[Math.floor(Math.random() * operations.length)];
};

const operationSymbols: Record<Operation, string> = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
};

const generateSimpleQuestion = (config: GeneratorConfig, topic: string, yearGroup: YearGroup): Question => {
  const op = getRandomOperation(config.operations);
  let a: number, b: number, answer: number;

  // Generate numbers that make sense for the operation
  switch (op) {
    case '+':
      a = getRandomInt(config.minNum, config.maxNum);
      b = getRandomInt(config.minNum, config.maxNum);
      answer = a + b;
      break;
    case '-':
      a = getRandomInt(config.minNum, config.maxNum);
      b = getRandomInt(config.minNum, Math.min(a, config.maxNum)); // Ensure non-negative result for younger years
      if (!config.allowNegatives && a < b) [a, b] = [b, a];
      answer = a - b;
      break;
    case '*':
      a = getRandomInt(1, Math.min(12, config.maxNum / 2));
      b = getRandomInt(1, Math.min(12, config.maxNum / 2));
      answer = a * b;
      break;
    case '/':
      b = getRandomInt(2, 12);
      answer = getRandomInt(1, Math.min(12, config.maxNum / b));
      a = b * answer; // Ensure clean division
      break;
    default:
      a = b = answer = 0;
  }

  const questionText = `What is ${a} ${operationSymbols[op]} ${b}?`;
  
  return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'easy', 10);
};

const generateMediumQuestion = (config: GeneratorConfig, topic: string, yearGroup: YearGroup): Question => {
  const type = Math.random();
  
  if (type < 0.4) {
    // Two-step operation: a + b * c
    const a = getRandomInt(1, 20);
    const b = getRandomInt(1, 10);
    const c = getRandomInt(1, 10);
    const answer = a + b * c;
    const questionText = `Calculate: ${a} + ${b} × ${c}`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'medium', 15);
  } else if (type < 0.7) {
    // Bracketed expression: (a + b) * c
    const a = getRandomInt(1, 15);
    const b = getRandomInt(1, 15);
    const c = getRandomInt(2, 8);
    const answer = (a + b) * c;
    const questionText = `Calculate: (${a} + ${b}) × ${c}`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'medium', 15);
  } else {
    // Finding x: a * x = b (where b is divisible by a)
    const a = getRandomInt(2, 12);
    const answer = getRandomInt(1, 15);
    const b = a * answer;
    const questionText = `Solve: ${a} × x = ${b}`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'medium', 15);
  }
};

const generateComplexQuestion = (config: GeneratorConfig, topic: string, yearGroup: YearGroup): Question => {
  const type = Math.random();
  
  if (type < 0.25) {
    // Square numbers
    const base = getRandomInt(2, 15);
    const answer = base * base;
    const questionText = `What is ${base}²?`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'hard', 20);
  } else if (type < 0.5) {
    // Percentage
    const whole = getRandomInt(2, 20) * 10;
    const percent = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
    const answer = (whole * percent) / 100;
    const questionText = `What is ${percent}% of ${whole}?`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'hard', 20);
  } else if (type < 0.75) {
    // Three-step calculation
    const a = getRandomInt(2, 10);
    const b = getRandomInt(2, 10);
    const c = getRandomInt(2, 10);
    const answer = a * b + c * c;
    const questionText = `Calculate: ${a} × ${b} + ${c}²`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'hard', 20);
  } else {
    // Cube roots (simple ones)
    const bases = [2, 3, 4, 5];
    const base = bases[Math.floor(Math.random() * bases.length)];
    const answer = base * base * base;
    const questionText = `What is ${base}³?`;
    return createQuestionWithOptions(questionText, answer, topic, yearGroup, 'hard', 20);
  }
};

const createQuestionWithOptions = (
  questionText: string,
  correctAnswer: number,
  topic: string,
  yearGroup: YearGroup,
  difficulty: 'easy' | 'medium' | 'hard',
  points: number
): Question => {
  // Generate wrong options that are plausible
  const wrongOptions = new Set<number>();
  
  while (wrongOptions.size < 3) {
    let wrong: number;
    const variance = Math.random();
    
    if (variance < 0.3) {
      // Close to correct answer
      wrong = correctAnswer + getRandomInt(-3, 3);
    } else if (variance < 0.6) {
      // Off by a factor
      wrong = correctAnswer + getRandomInt(-10, 10);
    } else {
      // Common mistake (e.g., forgetting order of operations)
      wrong = correctAnswer + getRandomInt(-20, 20);
    }
    
    // Make sure wrong answer is different and reasonable
    if (wrong !== correctAnswer && wrong >= 0 && !wrongOptions.has(wrong)) {
      wrongOptions.add(wrong);
    }
  }
  
  const options = [correctAnswer, ...Array.from(wrongOptions)];
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  const correctIndex = options.indexOf(correctAnswer);
  
  return {
    id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    topic,
    question: questionText,
    options: options.map(String),
    correctAnswer: correctIndex,
    difficulty,
    yearGroup,
    points,
  };
};

export const generateRandomQuestion = (topic: string, yearGroup: YearGroup): Question => {
  const config = yearConfigs[yearGroup];
  const roll = Math.random();
  
  // Adjust difficulty distribution based on year group
  if (yearGroup <= 8) {
    if (roll < 0.7) return generateSimpleQuestion(config, topic, yearGroup);
    return generateMediumQuestion(config, topic, yearGroup);
  } else if (yearGroup <= 10) {
    if (roll < 0.3) return generateSimpleQuestion(config, topic, yearGroup);
    if (roll < 0.7) return generateMediumQuestion(config, topic, yearGroup);
    return generateComplexQuestion(config, topic, yearGroup);
  } else {
    if (roll < 0.2) return generateMediumQuestion(config, topic, yearGroup);
    return generateComplexQuestion(config, topic, yearGroup);
  }
};

// Export for games that need a batch of questions
export const generateQuestionBatch = (topic: string, yearGroup: YearGroup, count: number): Question[] => {
  return Array.from({ length: count }, () => generateRandomQuestion(topic, yearGroup));
};
