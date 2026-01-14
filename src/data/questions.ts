import { Question, GameTopic, YearGroup } from '@/types/game';

export const gameTopics: GameTopic[] = [
  // Primary School Topics (Year 1-6)
  {
    id: 'counting',
    name: 'Counting & Numbers',
    icon: '🔢',
    description: 'Learn to count and recognize numbers!',
    yearGroups: [1, 2, 3],
    color: 'primary',
  },
  {
    id: 'addition',
    name: 'Addition',
    icon: '➕',
    description: 'Add numbers together to find the total!',
    yearGroups: [1, 2, 3, 4, 5, 6],
    color: 'secondary',
  },
  {
    id: 'subtraction',
    name: 'Subtraction',
    icon: '➖',
    description: 'Take away numbers and find the difference!',
    yearGroups: [1, 2, 3, 4, 5, 6],
    color: 'accent',
  },
  {
    id: 'multiplication',
    name: 'Multiplication',
    icon: '✖️',
    description: 'Times tables and multiplying numbers!',
    yearGroups: [2, 3, 4, 5, 6],
    color: 'success',
  },
  {
    id: 'division',
    name: 'Division',
    icon: '➗',
    description: 'Share and divide numbers equally!',
    yearGroups: [2, 3, 4, 5, 6],
    color: 'primary',
  },
  {
    id: 'shapes',
    name: 'Shapes & Patterns',
    icon: '🔷',
    description: 'Learn about 2D and 3D shapes!',
    yearGroups: [1, 2, 3, 4, 5, 6],
    color: 'secondary',
  },
  {
    id: 'telling-time',
    name: 'Telling Time',
    icon: '🕐',
    description: 'Read clocks and understand time!',
    yearGroups: [1, 2, 3, 4],
    color: 'accent',
  },
  {
    id: 'money',
    name: 'Money & Coins',
    icon: '💷',
    description: 'Count coins and work with money!',
    yearGroups: [1, 2, 3, 4, 5, 6],
    color: 'success',
  },
  {
    id: 'place-value',
    name: 'Place Value',
    icon: '🔟',
    description: 'Understand ones, tens, hundreds and more!',
    yearGroups: [2, 3, 4, 5, 6],
    color: 'primary',
  },
  // Secondary School Topics (Year 7+)
  {
    id: 'algebra',
    name: 'Algebraic Expressions',
    icon: '🔢',
    description: 'Simplify expressions, solve equations, and master algebra!',
    yearGroups: [7, 8, 9, 10, 11, 12],
    color: 'primary',
  },
  {
    id: 'equations',
    name: 'Solving Equations',
    icon: '⚖️',
    description: 'Balance equations and find unknown values!',
    yearGroups: [7, 8, 9, 10, 11, 12],
    color: 'secondary',
  },
  {
    id: 'fractions',
    name: 'Fractions & Decimals',
    icon: '🥧',
    description: 'Master fractions, decimals and percentages!',
    yearGroups: [7, 8, 9],
    color: 'accent',
  },
  {
    id: 'geometry',
    name: 'Geometry & Shapes',
    icon: '📐',
    description: 'Explore angles, areas, and geometric shapes!',
    yearGroups: [7, 8, 9, 10, 11],
    color: 'success',
  },
  {
    id: 'ratios',
    name: 'Ratios & Proportions',
    icon: '📊',
    description: 'Compare quantities and solve ratio problems!',
    yearGroups: [7, 8, 9, 10],
    color: 'primary',
  },
  {
    id: 'graphs',
    name: 'Graphs & Functions',
    icon: '📈',
    description: 'Plot, interpret, and analyze graphs!',
    yearGroups: [8, 9, 10, 11, 12],
    color: 'secondary',
  },
  {
    id: 'probability',
    name: 'Probability & Statistics',
    icon: '🎲',
    description: 'Calculate chances and analyze data!',
    yearGroups: [7, 8, 9, 10, 11, 12],
    color: 'accent',
  },
  {
    id: 'sequences',
    name: 'Number Sequences',
    icon: '🔄',
    description: 'Find patterns and predict the next numbers!',
    yearGroups: [7, 8, 9, 10, 11],
    color: 'success',
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    icon: '📏',
    description: 'Master sine, cosine, tangent and angle calculations!',
    yearGroups: [9, 10, 11, 12],
    color: 'primary',
  },
  {
    id: 'powers',
    name: 'Powers & Indices',
    icon: '⬆️',
    description: 'Work with exponents, roots, and scientific notation!',
    yearGroups: [7, 8, 9, 10, 11],
    color: 'secondary',
  },
  {
    id: 'percentages',
    name: 'Percentages',
    icon: '💯',
    description: 'Calculate percentages, discounts, and interest!',
    yearGroups: [7, 8, 9, 10],
    color: 'accent',
  },
  {
    id: 'measurement',
    name: 'Measurement & Units',
    icon: '📏',
    description: 'Convert units, calculate time, and measure!',
    yearGroups: [7, 8, 9],
    color: 'success',
  },
  {
    id: 'mental',
    name: 'Mental Maths',
    icon: '🧠',
    description: 'Quick mental calculations and number tricks!',
    yearGroups: [7, 8, 9, 10],
    color: 'primary',
  },
  {
    id: 'wordproblems',
    name: 'Word Problems',
    icon: '📝',
    description: 'Apply maths skills to real-world problems!',
    yearGroups: [7, 8, 9, 10, 11],
    color: 'secondary',
  },
];

// Utility function to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to randomize question options while keeping track of correct answer
const randomizeOptions = (question: Question): Question => {
  const optionsWithIndex = question.options.map((opt, idx) => ({
    option: opt,
    isCorrect: idx === question.correctAnswer
  }));
  
  const shuffled = shuffleArray(optionsWithIndex);
  const newCorrectIndex = shuffled.findIndex(o => o.isCorrect);
  
  return {
    ...question,
    options: shuffled.map(o => o.option),
    correctAnswer: newCorrectIndex
  };
};

export const generateQuestions = (topic: string, yearGroup: YearGroup): Question[] => {
  const questions: Record<string, Record<number, Question[]>> = {
    algebra: {
      7: [
        { id: 'alg7-1', topic: 'algebra', question: 'Simplify: 3x + 2x', options: ['5x', '6x', '5x²', '6'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'alg7-2', topic: 'algebra', question: 'What is 4a × 2?', options: ['6a', '8a', '8', '4a²'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'alg7-3', topic: 'algebra', question: 'Simplify: 7y - 3y + 2y', options: ['6y', '5y', '12y', '2y'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'alg7-4', topic: 'algebra', question: 'If x = 3, what is 2x + 5?', options: ['8', '11', '10', '15'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'alg7-5', topic: 'algebra', question: 'Simplify: 2(x + 4)', options: ['2x + 4', '2x + 8', 'x + 8', '2x + 6'], correctAnswer: 1, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'alg8-1', topic: 'algebra', question: 'Expand: 3(2x - 1)', options: ['6x - 3', '6x - 1', '5x - 3', '6x + 3'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'alg8-2', topic: 'algebra', question: 'Simplify: 2x² + 3x²', options: ['5x²', '5x⁴', '6x²', '5x'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'alg8-3', topic: 'algebra', question: 'Factorise: 6x + 9', options: ['3(2x + 3)', '2(3x + 9)', '6(x + 3)', '3(x + 3)'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'alg8-4', topic: 'algebra', question: 'Expand: (x + 2)(x + 3)', options: ['x² + 5x + 6', 'x² + 6x + 5', '2x + 5', 'x² + 5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'alg8-5', topic: 'algebra', question: 'Simplify: 4x × 3x', options: ['7x', '12x', '12x²', '7x²'], correctAnswer: 2, difficulty: 'medium', yearGroup: 8, points: 15 },
      ],
      9: [
        { id: 'alg9-1', topic: 'algebra', question: 'Expand: (x + 4)²', options: ['x² + 16', 'x² + 8x + 16', 'x² + 4x + 16', '2x + 8'], correctAnswer: 1, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'alg9-2', topic: 'algebra', question: 'Factorise: x² + 7x + 12', options: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x + 1)(x + 12)', '(x + 6)(x + 1)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'alg9-3', topic: 'algebra', question: 'Simplify: (3x²)²', options: ['6x²', '9x⁴', '6x⁴', '9x²'], correctAnswer: 1, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'alg9-4', topic: 'algebra', question: 'Expand: (2x - 3)(x + 5)', options: ['2x² + 7x - 15', '2x² - 7x - 15', '2x² + 10x - 15', '2x² + 7x + 15'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'alg9-5', topic: 'algebra', question: 'Factorise: x² - 9', options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', '(x + 9)(x - 1)'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
      ],
      10: [
        { id: 'alg10-1', topic: 'algebra', question: 'Solve: x² - 5x + 6 = 0', options: ['x = 2, 3', 'x = 1, 6', 'x = -2, -3', 'x = 2, -3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'alg10-2', topic: 'algebra', question: 'Simplify: (x³)² ÷ x²', options: ['x³', 'x⁴', 'x⁶', 'x⁸'], correctAnswer: 1, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'alg10-3', topic: 'algebra', question: 'Complete the square: x² + 6x + __', options: ['9', '12', '6', '36'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'alg10-4', topic: 'algebra', question: 'Factorise: 2x² + 5x + 2', options: ['(2x + 1)(x + 2)', '(2x + 2)(x + 1)', '(x + 1)(x + 2)', '2(x + 1)(x + 2)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'alg10-5', topic: 'algebra', question: 'Rationalise: 1/√2', options: ['√2/2', '2/√2', '√2', '2√2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'alg11-1', topic: 'algebra', question: 'Using the quadratic formula, solve: x² - 4x + 1 = 0', options: ['x = 2 ± √3', 'x = 4 ± √3', 'x = 2 ± √5', 'x = 1 ± √3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'alg11-2', topic: 'algebra', question: 'Simplify: (2x + 3)/(x² - 9) when factorised', options: ['(2x + 3)/((x-3)(x+3))', '2/(x-3)', '(2x+3)/(x-3)', '2x/(x²-9)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'alg11-3', topic: 'algebra', question: 'Solve simultaneously: y = x + 2 and y = x² - 2', options: ['x = -1, 2', 'x = 2, -2', 'x = 1, -2', 'x = 0, 2'], correctAnswer: 1, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'alg11-4', topic: 'algebra', question: 'Find the discriminant of: 2x² - 4x + 2', options: ['0', '4', '-4', '8'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'alg11-5', topic: 'algebra', question: 'Simplify: √50 + √18', options: ['8√2', '√68', '5√2 + 3√2', '4√2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
      12: [
        { id: 'alg12-1', topic: 'algebra', question: 'Differentiate: 3x⁴ - 2x² + 5', options: ['12x³ - 4x', '12x³ - 4x + 5', '3x³ - 2x', '12x⁴ - 4x²'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'alg12-2', topic: 'algebra', question: 'Integrate: ∫ 2x + 3 dx', options: ['x² + 3x + C', '2x² + 3x', 'x² + 3x', '2x² + 3x + C'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'alg12-3', topic: 'algebra', question: 'Find dy/dx when y = (2x + 1)³', options: ['6(2x + 1)²', '3(2x + 1)²', '(2x + 1)²', '6(2x + 1)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'alg12-4', topic: 'algebra', question: 'Solve: e^x = 5', options: ['x = ln(5)', 'x = 5', 'x = log(5)', 'x = 5e'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'alg12-5', topic: 'algebra', question: 'Find the binomial expansion coefficient for x² in (1 + x)⁵', options: ['10', '5', '20', '15'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
      ],
    },
    equations: {
      7: [
        { id: 'eq7-1', topic: 'equations', question: 'Solve: x + 5 = 12', options: ['x = 7', 'x = 17', 'x = 5', 'x = 8'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'eq7-2', topic: 'equations', question: 'Solve: 3x = 15', options: ['x = 12', 'x = 5', 'x = 45', 'x = 18'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'eq7-3', topic: 'equations', question: 'Solve: x - 4 = 9', options: ['x = 5', 'x = 13', 'x = 36', 'x = 4'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'eq7-4', topic: 'equations', question: 'Solve: 2x + 3 = 11', options: ['x = 4', 'x = 7', 'x = 5', 'x = 14'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'eq7-5', topic: 'equations', question: 'Solve: x/2 = 8', options: ['x = 4', 'x = 10', 'x = 16', 'x = 6'], correctAnswer: 2, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'eq8-1', topic: 'equations', question: 'Solve: 4x - 7 = 13', options: ['x = 5', 'x = 6', 'x = 20', 'x = 3'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'eq8-2', topic: 'equations', question: 'Solve: 3(x + 2) = 15', options: ['x = 5', 'x = 3', 'x = 4', 'x = 7'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'eq8-3', topic: 'equations', question: 'Solve: 2x + 5 = x + 9', options: ['x = 4', 'x = 14', 'x = 2', 'x = 7'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'eq8-4', topic: 'equations', question: 'Solve: 5x - 3 = 2x + 9', options: ['x = 2', 'x = 4', 'x = 6', 'x = 3'], correctAnswer: 1, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'eq8-5', topic: 'equations', question: 'Solve: (x + 3)/2 = 5', options: ['x = 13', 'x = 7', 'x = 10', 'x = 4'], correctAnswer: 1, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'eq9-1', topic: 'equations', question: 'Solve: 2(3x - 1) = 4x + 6', options: ['x = 4', 'x = 2', 'x = 3', 'x = 5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'eq9-2', topic: 'equations', question: 'Solve: x² = 49', options: ['x = 7', 'x = ±7', 'x = 24.5', 'x = -7'], correctAnswer: 1, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'eq9-3', topic: 'equations', question: 'Solve: x² + 5x = 0', options: ['x = 0, 5', 'x = 0, -5', 'x = 5', 'x = -5'], correctAnswer: 1, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'eq9-4', topic: 'equations', question: 'Solve: 4(x - 2) - 3(x + 1) = 5', options: ['x = 16', 'x = 8', 'x = 12', 'x = 14'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'eq9-5', topic: 'equations', question: 'Solve simultaneously: x + y = 7, x - y = 3', options: ['x = 5, y = 2', 'x = 4, y = 3', 'x = 6, y = 1', 'x = 3, y = 4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'eq10-1', topic: 'equations', question: 'Solve: x² - 7x + 10 = 0', options: ['x = 2, 5', 'x = -2, -5', 'x = 1, 10', 'x = 2, -5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'eq10-2', topic: 'equations', question: 'Solve: 2x² - 8 = 0', options: ['x = ±2', 'x = 4', 'x = ±4', 'x = 2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'eq10-3', topic: 'equations', question: 'Solve: (x - 3)(x + 2) = 0', options: ['x = 3, -2', 'x = -3, 2', 'x = 3, 2', 'x = -3, -2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'eq10-4', topic: 'equations', question: 'Solve: 3x² + 12x = 0', options: ['x = 0, -4', 'x = 0, 4', 'x = 4', 'x = -4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'eq10-5', topic: 'equations', question: 'Solve: x² - 2x - 15 = 0', options: ['x = 5, -3', 'x = -5, 3', 'x = 5, 3', 'x = -5, -3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'eq11-1', topic: 'equations', question: 'Solve: 2x² - 5x - 3 = 0', options: ['x = 3, -0.5', 'x = -3, 0.5', 'x = 3, 0.5', 'x = -3, -0.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'eq11-2', topic: 'equations', question: 'Solve using quadratic formula: x² + 4x + 1 = 0', options: ['x = -2 ± √3', 'x = 2 ± √3', 'x = -4 ± √3', 'x = 4 ± √3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'eq11-3', topic: 'equations', question: 'For 3x² + 6x + k = 0 to have equal roots, k = ?', options: ['k = 3', 'k = 6', 'k = 9', 'k = 12'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'eq11-4', topic: 'equations', question: 'Solve: |2x - 3| = 7', options: ['x = 5, -2', 'x = 5, 2', 'x = -5, 2', 'x = -5, -2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'eq11-5', topic: 'equations', question: 'Solve: √(x + 4) = x - 2', options: ['x = 5', 'x = 0', 'x = 4', 'x = -4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
      12: [
        { id: 'eq12-1', topic: 'equations', question: 'Solve: e^(2x) = 7', options: ['x = ln(7)/2', 'x = 2ln(7)', 'x = ln(7²)', 'x = 7/2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'eq12-2', topic: 'equations', question: 'Solve: ln(x) + ln(x-2) = ln(3)', options: ['x = 3', 'x = 5', 'x = 1', 'x = 6'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'eq12-3', topic: 'equations', question: 'Solve: 2^x = 5^(x-1)', options: ['x = ln(5)/(ln(5)-ln(2))', 'x = 5/2', 'x = ln(2)/ln(5)', 'x = 2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'eq12-4', topic: 'equations', question: 'Solve: sin(x) = 0.5 for 0 ≤ x ≤ 2π', options: ['x = π/6, 5π/6', 'x = π/3, 2π/3', 'x = π/6, π/3', 'x = π/4, 3π/4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'eq12-5', topic: 'equations', question: 'Solve: cos(2x) = 0.5 for 0 ≤ x ≤ π', options: ['x = π/6, 5π/6', 'x = π/3, 2π/3', 'x = π/6, π/2', 'x = π/6, 2π/3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
      ],
    },
    fractions: {
      7: [
        { id: 'fr7-1', topic: 'fractions', question: 'Simplify: 4/8', options: ['1/2', '2/4', '1/4', '2/8'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'fr7-2', topic: 'fractions', question: 'Calculate: 1/4 + 1/4', options: ['2/4', '1/2', '2/8', 'All of the above'], correctAnswer: 3, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'fr7-3', topic: 'fractions', question: 'Convert 0.25 to a fraction', options: ['1/4', '1/2', '2/5', '1/5'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'fr7-4', topic: 'fractions', question: 'Calculate: 2/3 + 1/6', options: ['5/6', '3/6', '3/9', '1/2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'fr7-5', topic: 'fractions', question: 'What is 3/4 of 20?', options: ['15', '12', '16', '14'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'fr8-1', topic: 'fractions', question: 'Calculate: 2/3 × 3/4', options: ['6/12', '1/2', '5/7', '6/7'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'fr8-2', topic: 'fractions', question: 'Calculate: 3/4 ÷ 1/2', options: ['3/8', '6/4', '3/2', '1/2'], correctAnswer: 2, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'fr8-3', topic: 'fractions', question: 'Convert 0.375 to a fraction', options: ['3/8', '3/7', '375/100', '37/100'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'fr8-4', topic: 'fractions', question: 'Calculate: 5/6 - 1/3', options: ['4/3', '1/2', '1/3', '2/6'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'fr8-5', topic: 'fractions', question: 'Express 7/20 as a percentage', options: ['35%', '70%', '3.5%', '14%'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
      ],
      9: [
        { id: 'fr9-1', topic: 'fractions', question: 'Calculate: (2/3)²', options: ['4/9', '4/6', '2/9', '4/3'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'fr9-2', topic: 'fractions', question: 'Simplify: 12/18 + 4/6', options: ['4/3', '16/24', '2/3', '1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'fr9-3', topic: 'fractions', question: 'Convert 0.333... to a fraction', options: ['1/3', '3/10', '33/100', '1/4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'fr9-4', topic: 'fractions', question: 'Calculate: 2 1/3 + 1 3/4', options: ['4 1/12', '3 4/7', '3 7/12', '4 7/12'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'fr9-5', topic: 'fractions', question: 'Find: 15% of 80', options: ['12', '15', '8', '10'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
      ],
    },
    geometry: {
      7: [
        { id: 'geo7-1', topic: 'geometry', question: 'What is the sum of angles in a triangle?', options: ['180°', '360°', '90°', '270°'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'geo7-2', topic: 'geometry', question: 'Find the area of a rectangle with length 5cm and width 3cm', options: ['8cm²', '15cm²', '16cm²', '10cm²'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'geo7-3', topic: 'geometry', question: 'What is the perimeter of a square with side 4cm?', options: ['8cm', '12cm', '16cm', '20cm'], correctAnswer: 2, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'geo7-4', topic: 'geometry', question: 'An angle of 90° is called a:', options: ['Right angle', 'Acute angle', 'Obtuse angle', 'Reflex angle'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'geo7-5', topic: 'geometry', question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, difficulty: 'easy', yearGroup: 7, points: 10 },
      ],
      8: [
        { id: 'geo8-1', topic: 'geometry', question: 'Find the area of a triangle with base 8cm and height 5cm', options: ['40cm²', '20cm²', '13cm²', '26cm²'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'geo8-2', topic: 'geometry', question: 'Calculate the circumference of a circle with radius 7cm (use π = 22/7)', options: ['44cm', '22cm', '154cm', '88cm'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'geo8-3', topic: 'geometry', question: 'What is the sum of interior angles in a quadrilateral?', options: ['180°', '360°', '540°', '720°'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'geo8-4', topic: 'geometry', question: 'Find angle x if angles on a straight line are 65° and x°', options: ['25°', '115°', '295°', '180°'], correctAnswer: 1, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'geo8-5', topic: 'geometry', question: 'Calculate the area of a circle with radius 5cm (use π = 3.14)', options: ['78.5cm²', '31.4cm²', '15.7cm²', '157cm²'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'geo9-1', topic: 'geometry', question: 'Using Pythagoras, find the hypotenuse when sides are 3cm and 4cm', options: ['5cm', '7cm', '12cm', '25cm'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'geo9-2', topic: 'geometry', question: 'Find the volume of a cuboid 4cm × 3cm × 2cm', options: ['24cm³', '9cm³', '18cm³', '48cm³'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'geo9-3', topic: 'geometry', question: 'Calculate the surface area of a cube with side 3cm', options: ['27cm²', '54cm²', '18cm²', '36cm²'], correctAnswer: 1, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'geo9-4', topic: 'geometry', question: 'Find the missing angle in a regular pentagon', options: ['72°', '108°', '120°', '90°'], correctAnswer: 1, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'geo9-5', topic: 'geometry', question: 'Volume of a cylinder with r=3cm and h=7cm (π=3.14)?', options: ['197.82cm³', '65.94cm³', '131.88cm³', '263.76cm³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'geo10-1', topic: 'geometry', question: 'Find sin(30°)', options: ['0.5', '0.866', '1', '0.707'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'geo10-2', topic: 'geometry', question: 'In a right triangle, if opposite = 6 and hypotenuse = 10, find sin(θ)', options: ['0.6', '0.8', '1.67', '0.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'geo10-3', topic: 'geometry', question: 'Calculate cos(60°)', options: ['0.866', '0.5', '1', '0'], correctAnswer: 1, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'geo10-4', topic: 'geometry', question: 'Find the area of a sector with radius 6cm and angle 60°', options: ['6πcm²', '12πcm²', '3πcm²', '18πcm²'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'geo10-5', topic: 'geometry', question: 'Volume of a cone with r=4cm and h=9cm (V=1/3πr²h)?', options: ['48πcm³', '144πcm³', '36πcm³', '16πcm³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'geo11-1', topic: 'geometry', question: 'Use sine rule: In triangle ABC, a=8, A=30°, B=45°, find b', options: ['8√2', '4√2', '16', '8'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'geo11-2', topic: 'geometry', question: 'Find arc length when radius=10cm and angle=72° (in terms of π)', options: ['4π cm', '2π cm', '8π cm', 'π cm'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'geo11-3', topic: 'geometry', question: 'Use cosine rule: Find c when a=5, b=7, C=60°', options: ['√39', '6', '√61', '8'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'geo11-4', topic: 'geometry', question: 'Volume of a sphere with radius 3cm (4/3πr³)?', options: ['36πcm³', '12πcm³', '27πcm³', '9πcm³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'geo11-5', topic: 'geometry', question: 'Surface area of a sphere with radius 4cm?', options: ['64πcm²', '32πcm²', '16πcm²', '256πcm²'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
    },
    ratios: {
      7: [
        { id: 'rat7-1', topic: 'ratios', question: 'Simplify the ratio 10:15', options: ['2:3', '5:7', '1:1.5', '10:15'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'rat7-2', topic: 'ratios', question: 'Share £20 in the ratio 1:3', options: ['£5 and £15', '£10 and £10', '£4 and £16', '£7 and £13'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'rat7-3', topic: 'ratios', question: 'If 3 apples cost £1.50, how much do 5 apples cost?', options: ['£2.50', '£2.00', '£3.00', '£2.25'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'rat7-4', topic: 'ratios', question: 'Express 40 as a ratio of 100', options: ['2:5', '4:10', '2:3', '4:6'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'rat7-5', topic: 'ratios', question: 'A map scale is 1:1000. If distance on map is 5cm, real distance is?', options: ['50m', '5m', '500m', '5000m'], correctAnswer: 0, difficulty: 'hard', yearGroup: 7, points: 20 },
      ],
      8: [
        { id: 'rat8-1', topic: 'ratios', question: 'Share £60 in ratio 2:3:5', options: ['£12, £18, £30', '£20, £20, £20', '£10, £20, £30', '£15, £20, £25'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'rat8-2', topic: 'ratios', question: 'If y is directly proportional to x, and y=12 when x=3, find y when x=5', options: ['20', '15', '18', '24'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'rat8-3', topic: 'ratios', question: 'A recipe for 4 people needs 200g flour. How much for 6 people?', options: ['300g', '250g', '350g', '400g'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'rat8-4', topic: 'ratios', question: 'Convert 3:4 to a fraction', options: ['3/4', '4/3', '3/7', '4/7'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'rat8-5', topic: 'ratios', question: 'If 8 workers take 6 days, how many days for 12 workers?', options: ['4 days', '9 days', '3 days', '5 days'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'rat9-1', topic: 'ratios', question: 'If y∝x² and y=18 when x=3, find y when x=2', options: ['8', '12', '6', '4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'rat9-2', topic: 'ratios', question: 'Increase £80 by 15%', options: ['£92', '£95', '£88', '£90'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'rat9-3', topic: 'ratios', question: 'Decrease 120 by 25%', options: ['90', '95', '85', '100'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'rat9-4', topic: 'ratios', question: 'If y∝1/x and y=6 when x=2, find y when x=4', options: ['3', '12', '4', '8'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'rat9-5', topic: 'ratios', question: 'After 20% discount, price is £48. Original price?', options: ['£60', '£58', '£56', '£64'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'rat10-1', topic: 'ratios', question: 'Compound interest: £1000 at 5% for 2 years?', options: ['£1102.50', '£1100', '£1105', '£1050'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'rat10-2', topic: 'ratios', question: 'If y=kx³ and y=24 when x=2, find k', options: ['3', '6', '12', '1.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'rat10-3', topic: 'ratios', question: 'Depreciation: £8000 car loses 15% yearly. Value after 2 years?', options: ['£5780', '£6800', '£5440', '£6120'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'rat10-4', topic: 'ratios', question: 'Reverse percentage: After 30% increase, value is £91. Original?', options: ['£70', '£65', '£75', '£63'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'rat10-5', topic: 'ratios', question: 'Simple interest: £500 at 4% for 3 years?', options: ['£60', '£40', '£80', '£120'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
      ],
    },
    graphs: {
      8: [
        { id: 'gr8-1', topic: 'graphs', question: 'What is the gradient of y = 2x + 3?', options: ['2', '3', '5', '2x'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'gr8-2', topic: 'graphs', question: 'Where does y = x + 5 cross the y-axis?', options: ['(0, 5)', '(5, 0)', '(0, 1)', '(1, 6)'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'gr8-3', topic: 'graphs', question: 'Find the gradient between (1, 2) and (3, 8)', options: ['3', '2', '6', '4'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'gr8-4', topic: 'graphs', question: 'Is y = -2x + 1 increasing or decreasing?', options: ['Decreasing', 'Increasing', 'Constant', 'Neither'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'gr8-5', topic: 'graphs', question: 'Find equation of line through (0,3) with gradient 2', options: ['y = 2x + 3', 'y = 3x + 2', 'y = 2x - 3', 'y = x + 3'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
      ],
      9: [
        { id: 'gr9-1', topic: 'graphs', question: 'Where do y = 2x + 1 and y = x + 4 intersect?', options: ['(3, 7)', '(4, 8)', '(2, 5)', '(1, 3)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'gr9-2', topic: 'graphs', question: 'What shape is the graph of y = x²?', options: ['Parabola', 'Line', 'Circle', 'Hyperbola'], correctAnswer: 0, difficulty: 'easy', yearGroup: 9, points: 10 },
        { id: 'gr9-3', topic: 'graphs', question: 'Find midpoint of (2, 4) and (6, 8)', options: ['(4, 6)', '(4, 4)', '(8, 12)', '(3, 5)'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'gr9-4', topic: 'graphs', question: 'Distance between (0, 0) and (3, 4)?', options: ['5', '7', '12', '3.5'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'gr9-5', topic: 'graphs', question: 'Perpendicular gradient to line with m = 2?', options: ['-1/2', '2', '-2', '1/2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'gr10-1', topic: 'graphs', question: 'Equation of line through (1, 5) and (3, 11)?', options: ['y = 3x + 2', 'y = 3x + 5', 'y = 2x + 3', 'y = 6x - 1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'gr10-2', topic: 'graphs', question: 'Minimum point of y = x² - 4x + 3?', options: ['(2, -1)', '(2, 3)', '(-2, 15)', '(4, 3)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'gr10-3', topic: 'graphs', question: 'Where does y = x² - 4 cross the x-axis?', options: ['x = ±2', 'x = 4', 'x = ±4', 'x = 2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'gr10-4', topic: 'graphs', question: 'Equation of circle center (0,0) radius 5?', options: ['x² + y² = 25', 'x² + y² = 5', 'x + y = 5', '(x-5)² + (y-5)² = 25'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'gr10-5', topic: 'graphs', question: 'Line y = 2x - 1 is parallel to:', options: ['y = 2x + 5', 'y = -2x + 1', 'y = x/2 - 1', 'y = x - 1'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
      ],
      11: [
        { id: 'gr11-1', topic: 'graphs', question: 'Find area under y = 3x² from x=0 to x=2', options: ['8', '6', '12', '4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'gr11-2', topic: 'graphs', question: 'Gradient of y = x³ at x = 2?', options: ['12', '8', '6', '4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'gr11-3', topic: 'graphs', question: 'Equation of tangent to y = x² at (3, 9)?', options: ['y = 6x - 9', 'y = 3x', 'y = 6x + 9', 'y = 2x + 3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'gr11-4', topic: 'graphs', question: 'For y = x³ - 3x, find stationary points', options: ['x = ±1', 'x = 0, 3', 'x = 0', 'x = 3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'gr11-5', topic: 'graphs', question: 'Nature of point at x = 1 for y = x² - 2x + 3?', options: ['Minimum', 'Maximum', 'Inflection', 'Saddle'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
      12: [
        { id: 'gr12-1', topic: 'graphs', question: 'Sketch feature of y = e^x at x = 0?', options: ['y = 1, gradient = 1', 'y = 0, gradient = 0', 'y = e, gradient = e', 'y = 1, gradient = 0'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'gr12-2', topic: 'graphs', question: 'Asymptote of y = ln(x)?', options: ['x = 0', 'y = 0', 'x = 1', 'y = 1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'gr12-3', topic: 'graphs', question: 'Period of y = sin(2x)?', options: ['π', '2π', 'π/2', '4π'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'gr12-4', topic: 'graphs', question: 'Transform y = x² to y = (x-2)² + 3:', options: ['Right 2, up 3', 'Left 2, up 3', 'Right 2, down 3', 'Left 2, down 3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'gr12-5', topic: 'graphs', question: 'Amplitude of y = 3sin(x) + 2?', options: ['3', '2', '5', '1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
      ],
    },
    probability: {
      7: [
        { id: 'prob7-1', topic: 'probability', question: 'Probability of getting heads on a coin?', options: ['1/2', '1/4', '1', '0'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'prob7-2', topic: 'probability', question: 'Rolling a 6 on a fair die, probability is:', options: ['1/6', '1/2', '6', '5/6'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'prob7-3', topic: 'probability', question: 'Bag has 3 red, 2 blue balls. P(red)?', options: ['3/5', '2/5', '3/2', '1/2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'prob7-4', topic: 'probability', question: 'What is an impossible probability?', options: ['0', '1', '0.5', '-1'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'prob7-5', topic: 'probability', question: 'P(not A) if P(A) = 0.3?', options: ['0.7', '0.3', '1.3', '0.03'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'prob8-1', topic: 'probability', question: 'Two coins flipped. P(2 heads)?', options: ['1/4', '1/2', '3/4', '1/3'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'prob8-2', topic: 'probability', question: 'Mean of: 4, 6, 8, 10, 12?', options: ['8', '10', '6', '7'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'prob8-3', topic: 'probability', question: 'Median of: 3, 7, 9, 15, 21?', options: ['9', '11', '7', '15'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'prob8-4', topic: 'probability', question: 'Mode of: 2, 3, 3, 5, 7, 3?', options: ['3', '5', '2', '7'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'prob8-5', topic: 'probability', question: 'Range of: 12, 5, 8, 20, 3?', options: ['17', '15', '20', '8'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
      ],
      9: [
        { id: 'prob9-1', topic: 'probability', question: 'A and B independent. P(A)=0.4, P(B)=0.5. P(A and B)?', options: ['0.2', '0.9', '0.45', '0.1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'prob9-2', topic: 'probability', question: 'P(A or B) if P(A)=0.3, P(B)=0.5, mutually exclusive?', options: ['0.8', '0.15', '0.2', '1.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'prob9-3', topic: 'probability', question: 'Two dice. P(sum = 7)?', options: ['1/6', '1/12', '7/36', '6/36'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'prob9-4', topic: 'probability', question: 'Relative frequency: 30 heads in 50 flips?', options: ['0.6', '0.5', '30', '20'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'prob9-5', topic: 'probability', question: 'Expected value: win £10 with P=0.2, lose £2 with P=0.8?', options: ['£0.40', '£2', '£8', '-£0.40'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'prob10-1', topic: 'probability', question: 'Calculate 5! (factorial)', options: ['120', '25', '15', '60'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'prob10-2', topic: 'probability', question: 'Ways to arrange 3 from 5 people (permutation)?', options: ['60', '10', '15', '125'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'prob10-3', topic: 'probability', question: 'Combinations: choose 2 from 6?', options: ['15', '30', '12', '36'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'prob10-4', topic: 'probability', question: 'Tree diagram: 2 bags, each P(red)=0.3. P(both red)?', options: ['0.09', '0.6', '0.3', '0.21'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'prob10-5', topic: 'probability', question: 'Conditional: P(A|B)=0.4, P(B)=0.5. P(A and B)?', options: ['0.2', '0.8', '0.45', '0.1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'prob11-1', topic: 'probability', question: 'Binomial: n=5, p=0.3. P(X=2)?', options: ['0.3087', '0.15', '0.6', '0.09'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'prob11-2', topic: 'probability', question: 'Standard deviation of: 2, 4, 4, 4, 5, 5, 7, 9?', options: ['2', '4', '5', '3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'prob11-3', topic: 'probability', question: 'Variance is 16. Standard deviation?', options: ['4', '8', '256', '2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 11, points: 15 },
        { id: 'prob11-4', topic: 'probability', question: 'Normal distribution: 95% data within how many σ of mean?', options: ['2', '1', '3', '1.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'prob11-5', topic: 'probability', question: 'Interquartile range of: 1,2,3,4,5,6,7,8,9?', options: ['4', '8', '5', '6'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
      12: [
        { id: 'prob12-1', topic: 'probability', question: 'Z-score for x=75, μ=70, σ=5?', options: ['1', '0.5', '2', '-1'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'prob12-2', topic: 'probability', question: 'P(Z < 1.5) from normal tables ≈?', options: ['0.9332', '0.5', '0.0668', '1.5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'prob12-3', topic: 'probability', question: 'Poisson: λ=3, find P(X=2)', options: ['0.224', '0.149', '0.3', '0.18'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'prob12-4', topic: 'probability', question: 'Hypothesis testing: Type I error is?', options: ['Rejecting true H₀', 'Accepting false H₀', 'Both', 'Neither'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'prob12-5', topic: 'probability', question: 'Product moment correlation r = 1 means?', options: ['Perfect positive linear', 'No correlation', 'Perfect negative', 'Curved relationship'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
      ],
    },
    sequences: {
      7: [
        { id: 'seq7-1', topic: 'sequences', question: 'Find the next term: 2, 4, 6, 8, ...', options: ['10', '12', '9', '16'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'seq7-2', topic: 'sequences', question: 'Find the next term: 1, 4, 9, 16, ...', options: ['25', '20', '24', '36'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'seq7-3', topic: 'sequences', question: 'Find the 10th term: 3, 6, 9, 12, ...', options: ['30', '27', '33', '36'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'seq7-4', topic: 'sequences', question: 'Find the next term: 1, 1, 2, 3, 5, 8, ...', options: ['13', '11', '10', '12'], correctAnswer: 0, difficulty: 'hard', yearGroup: 7, points: 20 },
        { id: 'seq7-5', topic: 'sequences', question: 'What type: 2, 4, 6, 8, 10?', options: ['Arithmetic', 'Geometric', 'Fibonacci', 'Square'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
      ],
      8: [
        { id: 'seq8-1', topic: 'sequences', question: 'Find the nth term: 5, 8, 11, 14, ...', options: ['3n + 2', '3n + 5', 'n + 3', '5n'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'seq8-2', topic: 'sequences', question: 'Find the next term: 2, 6, 18, 54, ...', options: ['162', '108', '72', '216'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'seq8-3', topic: 'sequences', question: 'Common difference of: 7, 12, 17, 22?', options: ['5', '4', '7', '3'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
        { id: 'seq8-4', topic: 'sequences', question: 'Common ratio of: 3, 12, 48, 192?', options: ['4', '3', '9', '12'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'seq8-5', topic: 'sequences', question: 'Find the 20th term: 4, 7, 10, 13, ... using 3n+1', options: ['61', '64', '58', '63'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'seq9-1', topic: 'sequences', question: 'Sum of first 10 terms: 2, 4, 6, 8, ...', options: ['110', '100', '90', '120'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'seq9-2', topic: 'sequences', question: 'Nth term of: 1, 4, 9, 16, 25, ...', options: ['n²', '2n', 'n+3', '4n'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'seq9-3', topic: 'sequences', question: 'Find term formula: 2, 8, 18, 32, 50, ...', options: ['2n²', 'n²+1', '4n', '2n+2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'seq9-4', topic: 'sequences', question: 'Triangular numbers: 1, 3, 6, 10, next?', options: ['15', '14', '16', '12'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'seq9-5', topic: 'sequences', question: 'Sum formula for arithmetic: S = n/2(2a + (n-1)d). Find S₅ if a=3, d=2', options: ['35', '30', '25', '40'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'seq10-1', topic: 'sequences', question: 'Sum of geometric: a=2, r=3, n=4', options: ['80', '54', '40', '66'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'seq10-2', topic: 'sequences', question: 'If a=5, d=3, find the 15th term', options: ['47', '50', '44', '42'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'seq10-3', topic: 'sequences', question: 'Geometric: a=4, r=0.5, find 5th term', options: ['0.25', '0.5', '1', '0.125'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'seq10-4', topic: 'sequences', question: 'Sum to infinity: a=10, r=0.5', options: ['20', '15', '10', '5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'seq10-5', topic: 'sequences', question: 'Quadratic sequence: 3, 8, 15, 24, 35. Next term?', options: ['48', '46', '50', '44'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'seq11-1', topic: 'sequences', question: 'Sum of arithmetic series: n=20, a=5, l=100', options: ['1050', '1000', '950', '1100'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'seq11-2', topic: 'sequences', question: 'Prove converges: |r| < 1 for r=0.8. Sum to infinity = 5. Find a', options: ['1', '4', '0.8', '2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'seq11-3', topic: 'sequences', question: 'Recurrence: uₙ₊₁ = 2uₙ - 1, u₁=3. Find u₃', options: ['9', '7', '11', '5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'seq11-4', topic: 'sequences', question: 'Sum: Σᵢ₌₁⁵ (2i + 1)', options: ['35', '30', '25', '40'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'seq11-5', topic: 'sequences', question: 'Arithmetic mean of 8 and 18?', options: ['13', '14', '12', '15'], correctAnswer: 0, difficulty: 'medium', yearGroup: 11, points: 15 },
      ],
    },
    trigonometry: {
      9: [
        { id: 'trig9-1', topic: 'trigonometry', question: 'SOH CAH TOA: sin is opposite over...?', options: ['Hypotenuse', 'Adjacent', 'Opposite', 'Base'], correctAnswer: 0, difficulty: 'easy', yearGroup: 9, points: 10 },
        { id: 'trig9-2', topic: 'trigonometry', question: 'Find sin(45°) exactly', options: ['√2/2', '1/2', '√3/2', '1'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'trig9-3', topic: 'trigonometry', question: 'In a right triangle, opp=3, hyp=5. Find sin(θ)', options: ['0.6', '0.8', '0.75', '1.67'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'trig9-4', topic: 'trigonometry', question: 'tan(θ) = opp/adj. If opp=4, adj=3, find tan(θ)', options: ['4/3', '3/4', '5/3', '3/5'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'trig9-5', topic: 'trigonometry', question: 'Find the angle if sin(θ)=0.5', options: ['30°', '45°', '60°', '90°'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
      ],
      10: [
        { id: 'trig10-1', topic: 'trigonometry', question: 'Find cos(30°) exactly', options: ['√3/2', '1/2', '√2/2', '1'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'trig10-2', topic: 'trigonometry', question: 'tan(45°) = ?', options: ['1', '0', '√2', '∞'], correctAnswer: 0, difficulty: 'easy', yearGroup: 10, points: 10 },
        { id: 'trig10-3', topic: 'trigonometry', question: 'Area of triangle = ½absinC. Find area if a=5, b=8, C=30°', options: ['10', '20', '40', '5'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'trig10-4', topic: 'trigonometry', question: 'Sine rule: a/sinA = b/sinB. Find b if a=10, A=30°, B=45°', options: ['10√2', '5√2', '20', '10'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'trig10-5', topic: 'trigonometry', question: 'If cos(θ) = 0.8, find sin(θ) using sin²θ + cos²θ = 1', options: ['0.6', '0.2', '0.36', '0.64'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'trig11-1', topic: 'trigonometry', question: 'Cosine rule: c² = a² + b² - 2abcosC. Find c if a=5, b=7, C=60°', options: ['√39', '6', '8', '√61'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'trig11-2', topic: 'trigonometry', question: 'sin(180° - x) = ?', options: ['sin(x)', '-sin(x)', 'cos(x)', '-cos(x)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'trig11-3', topic: 'trigonometry', question: 'cos(90° - x) = ?', options: ['sin(x)', 'cos(x)', '-sin(x)', '-cos(x)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'trig11-4', topic: 'trigonometry', question: 'Solve sin(x) = 0.5 for 0° ≤ x ≤ 360°', options: ['30°, 150°', '30°, 330°', '150°, 210°', '30° only'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'trig11-5', topic: 'trigonometry', question: 'Period of y = sin(2x)?', options: ['180°', '360°', '90°', '720°'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
      12: [
        { id: 'trig12-1', topic: 'trigonometry', question: 'sin(A+B) = ?', options: ['sinAcosB + cosAsinB', 'sinAsinB + cosAcosB', 'sinAcosB - cosAsinB', 'cosAcosB - sinAsinB'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'trig12-2', topic: 'trigonometry', question: 'cos(2x) = ?', options: ['cos²x - sin²x', '2sinxcosx', 'sin²x - cos²x', 'sinx + cosx'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'trig12-3', topic: 'trigonometry', question: 'Convert 60° to radians', options: ['π/3', 'π/6', 'π/4', '2π/3'], correctAnswer: 0, difficulty: 'medium', yearGroup: 12, points: 15 },
        { id: 'trig12-4', topic: 'trigonometry', question: 'd/dx[sin(x)] = ?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
        { id: 'trig12-5', topic: 'trigonometry', question: '∫cos(x)dx = ?', options: ['sin(x) + C', '-sin(x) + C', 'cos(x) + C', '-cos(x) + C'], correctAnswer: 0, difficulty: 'hard', yearGroup: 12, points: 30 },
      ],
    },
    powers: {
      7: [
        { id: 'pow7-1', topic: 'powers', question: 'Calculate: 2³', options: ['8', '6', '9', '5'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'pow7-2', topic: 'powers', question: 'Calculate: 5²', options: ['25', '10', '52', '7'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'pow7-3', topic: 'powers', question: 'What is √49?', options: ['7', '24.5', '8', '6'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'pow7-4', topic: 'powers', question: 'Calculate: 10⁰', options: ['1', '0', '10', '100'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'pow7-5', topic: 'powers', question: 'Calculate: √100', options: ['10', '50', '1000', '20'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
      ],
      8: [
        { id: 'pow8-1', topic: 'powers', question: 'Simplify: 2³ × 2²', options: ['2⁵', '2⁶', '4⁵', '2¹'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'pow8-2', topic: 'powers', question: 'Simplify: 3⁶ ÷ 3²', options: ['3⁴', '3³', '3⁸', '1⁴'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'pow8-3', topic: 'powers', question: 'Calculate: 4⁻¹', options: ['1/4', '-4', '4', '-1/4'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'pow8-4', topic: 'powers', question: 'Simplify: (2³)²', options: ['2⁶', '2⁵', '2⁹', '4³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'pow8-5', topic: 'powers', question: 'Calculate: ³√27', options: ['3', '9', '27', '81'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
      ],
      9: [
        { id: 'pow9-1', topic: 'powers', question: 'Express 8 as a power of 2', options: ['2³', '2⁴', '2²', '8¹'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'pow9-2', topic: 'powers', question: 'Simplify: x⁵ × x³', options: ['x⁸', 'x¹⁵', 'x²', '2x⁸'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'pow9-3', topic: 'powers', question: 'Calculate: 16^(1/2)', options: ['4', '8', '256', '2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'pow9-4', topic: 'powers', question: 'Simplify: (x²y³)²', options: ['x⁴y⁶', 'x⁴y⁵', '2x²y³', 'x²y⁶'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'pow9-5', topic: 'powers', question: 'Calculate: 27^(2/3)', options: ['9', '18', '3', '81'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'pow10-1', topic: 'powers', question: 'Write 0.00045 in standard form', options: ['4.5 × 10⁻⁴', '45 × 10⁻⁵', '4.5 × 10⁴', '0.45 × 10⁻³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'pow10-2', topic: 'powers', question: 'Calculate: (3 × 10⁴) × (2 × 10³)', options: ['6 × 10⁷', '5 × 10⁷', '6 × 10¹²', '5 × 10¹'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'pow10-3', topic: 'powers', question: 'Simplify: √50', options: ['5√2', '25√2', '10√5', '2√25'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'pow10-4', topic: 'powers', question: 'Rationalise: 1/√3', options: ['√3/3', '3/√3', '√3', '1/3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'pow10-5', topic: 'powers', question: 'Calculate: 8^(-2/3)', options: ['1/4', '4', '-4', '-1/4'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'pow11-1', topic: 'powers', question: 'Simplify: √18 + √8', options: ['5√2', '√26', '3√2 + 2√2', '6√2'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'pow11-2', topic: 'powers', question: 'Solve: 2^x = 32', options: ['5', '4', '6', '16'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'pow11-3', topic: 'powers', question: 'Expand: (√3 + 1)²', options: ['4 + 2√3', '4', '3 + √3', '2 + 2√3'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'pow11-4', topic: 'powers', question: 'Simplify: √12 × √3', options: ['6', '√36', '6√1', '√15'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'pow11-5', topic: 'powers', question: 'If log₂(x) = 5, find x', options: ['32', '10', '25', '64'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
    },
    percentages: {
      7: [
        { id: 'per7-1', topic: 'percentages', question: 'What is 50% of 80?', options: ['40', '30', '50', '45'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'per7-2', topic: 'percentages', question: 'Convert 1/4 to a percentage', options: ['25%', '50%', '75%', '20%'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'per7-3', topic: 'percentages', question: 'What is 10% of 150?', options: ['15', '150', '1.5', '10'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'per7-4', topic: 'percentages', question: 'Convert 0.75 to a percentage', options: ['75%', '7.5%', '0.75%', '750%'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'per7-5', topic: 'percentages', question: 'What is 25% of 60?', options: ['15', '20', '25', '12'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'per8-1', topic: 'percentages', question: 'Increase £80 by 10%', options: ['£88', '£90', '£8', '£72'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'per8-2', topic: 'percentages', question: 'Decrease 120 by 25%', options: ['90', '95', '30', '150'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'per8-3', topic: 'percentages', question: '30 out of 50 as a percentage?', options: ['60%', '30%', '50%', '80%'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'per8-4', topic: 'percentages', question: 'Find 15% of 200', options: ['30', '15', '3', '300'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'per8-5', topic: 'percentages', question: 'What percentage is 12 of 48?', options: ['25%', '50%', '12%', '4%'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'per9-1', topic: 'percentages', question: 'After 20% discount, find the new price of £50', options: ['£40', '£10', '£60', '£45'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'per9-2', topic: 'percentages', question: 'Price was £48 after 20% off. Original price?', options: ['£60', '£40', '£58', '£56'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'per9-3', topic: 'percentages', question: 'Percentage change from 80 to 100?', options: ['25%', '20%', '80%', '125%'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'per9-4', topic: 'percentages', question: 'VAT is 20%. Find price including VAT for £50 item', options: ['£60', '£70', '£10', '£40'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'per9-5', topic: 'percentages', question: 'Simple interest: £200 at 5% for 3 years', options: ['£30', '£15', '£35', '£50'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'per10-1', topic: 'percentages', question: 'Compound interest: £1000 at 5% for 2 years?', options: ['£1102.50', '£1100', '£100', '£1105'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'per10-2', topic: 'percentages', question: 'Depreciation: £5000 loses 10% yearly. Value after 2 years?', options: ['£4050', '£4000', '£4500', '£3500'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'per10-3', topic: 'percentages', question: 'After 30% increase, value is £130. Original?', options: ['£100', '£91', '£169', '£110'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'per10-4', topic: 'percentages', question: 'Multiplier for 8% increase?', options: ['1.08', '0.08', '1.8', '0.92'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'per10-5', topic: 'percentages', question: 'Multiplier for 15% decrease?', options: ['0.85', '1.15', '0.15', '1.85'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
      ],
    },
    measurement: {
      7: [
        { id: 'meas7-1', topic: 'measurement', question: 'How many cm in 1 metre?', options: ['100', '10', '1000', '50'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'meas7-2', topic: 'measurement', question: 'How many mm in 5 cm?', options: ['50', '5', '500', '0.5'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'meas7-3', topic: 'measurement', question: 'Convert 3 hours to minutes', options: ['180', '30', '300', '18'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'meas7-4', topic: 'measurement', question: 'How many grams in 2.5 kg?', options: ['2500', '250', '25', '25000'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'meas7-5', topic: 'measurement', question: 'Convert 4500m to km', options: ['4.5', '45', '0.45', '450'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'meas8-1', topic: 'measurement', question: 'Convert 2.5 litres to ml', options: ['2500', '250', '25', '25000'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'meas8-2', topic: 'measurement', question: 'How many seconds in 2.5 minutes?', options: ['150', '250', '25', '1500'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'meas8-3', topic: 'measurement', question: 'Convert 45 minutes to hours (as decimal)', options: ['0.75', '0.45', '0.5', '1.25'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'meas8-4', topic: 'measurement', question: 'Speed = 60 km/h. Distance in 2.5 hours?', options: ['150 km', '24 km', '62.5 km', '120 km'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'meas8-5', topic: 'measurement', question: 'Area of rectangle 8m × 5m in cm²?', options: ['400000', '4000', '40', '40000'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
      ],
      9: [
        { id: 'meas9-1', topic: 'measurement', question: 'Convert 2 m³ to litres', options: ['2000', '200', '20', '20000'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'meas9-2', topic: 'measurement', question: 'Speed = distance/time. D=120km, T=2h. Speed?', options: ['60 km/h', '240 km/h', '118 km/h', '122 km/h'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'meas9-3', topic: 'measurement', question: 'Time = distance/speed. D=300km, S=75km/h. Time?', options: ['4 hours', '375 hours', '225 hours', '3 hours'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'meas9-4', topic: 'measurement', question: 'Density = mass/volume. M=500g, V=100cm³. Density?', options: ['5 g/cm³', '50 g/cm³', '0.2 g/cm³', '500 g/cm³'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'meas9-5', topic: 'measurement', question: 'Convert 72 km/h to m/s', options: ['20 m/s', '72 m/s', '7.2 m/s', '200 m/s'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
    },
    mental: {
      7: [
        { id: 'men7-1', topic: 'mental', question: 'Calculate: 15 + 27', options: ['42', '32', '52', '41'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'men7-2', topic: 'mental', question: 'Calculate: 8 × 7', options: ['56', '54', '63', '48'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'men7-3', topic: 'mental', question: 'Calculate: 100 - 37', options: ['63', '73', '67', '53'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'men7-4', topic: 'mental', question: 'Calculate: 144 ÷ 12', options: ['12', '11', '13', '14'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'men7-5', topic: 'mental', question: 'Calculate: 25 × 4', options: ['100', '90', '110', '80'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
      ],
      8: [
        { id: 'men8-1', topic: 'mental', question: 'Calculate: 18 × 5', options: ['90', '85', '95', '80'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'men8-2', topic: 'mental', question: 'Calculate: 256 ÷ 8', options: ['32', '28', '36', '24'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'men8-3', topic: 'mental', question: 'Calculate: 99 × 6', options: ['594', '596', '584', '604'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'men8-4', topic: 'mental', question: 'Calculate: 15²', options: ['225', '215', '235', '150'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'men8-5', topic: 'mental', question: 'Calculate: 1000 - 287', options: ['713', '723', '717', '683'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
      ],
      9: [
        { id: 'men9-1', topic: 'mental', question: 'Calculate: 37 × 11', options: ['407', '397', '417', '377'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'men9-2', topic: 'mental', question: 'Calculate: 625 ÷ 25', options: ['25', '24', '26', '20'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'men9-3', topic: 'mental', question: 'Calculate: 12³', options: ['1728', '1628', '144', '1828'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'men9-4', topic: 'mental', question: 'Calculate: 0.5 × 0.4', options: ['0.2', '0.9', '2', '0.02'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'men9-5', topic: 'mental', question: 'Calculate: 7.5 + 3.8', options: ['11.3', '10.3', '11.8', '10.8'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
      ],
      10: [
        { id: 'men10-1', topic: 'mental', question: 'Calculate: 17² - 15²', options: ['64', '32', '4', '289'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'men10-2', topic: 'mental', question: 'Calculate: √196', options: ['14', '13', '15', '12'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'men10-3', topic: 'mental', question: 'Calculate: 0.125 × 80', options: ['10', '100', '1', '8'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'men10-4', topic: 'mental', question: 'Calculate: 3/8 + 1/4', options: ['5/8', '4/12', '4/8', '1/2'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'men10-5', topic: 'mental', question: 'Calculate: 2.5 × 2.5', options: ['6.25', '5', '5.25', '6.5'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
      ],
    },
    wordproblems: {
      7: [
        { id: 'wp7-1', topic: 'wordproblems', question: 'Tom has 15 sweets, gives 4 away. How many left?', options: ['11', '19', '10', '9'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'wp7-2', topic: 'wordproblems', question: 'Pencils cost 35p each. Cost of 4 pencils?', options: ['£1.40', '£1.20', '£1.75', '£0.39'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'wp7-3', topic: 'wordproblems', question: 'A book has 256 pages. I read 78. Pages left?', options: ['178', '334', '188', '168'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
        { id: 'wp7-4', topic: 'wordproblems', question: 'Share 24 sweets equally among 6 children. Each gets?', options: ['4', '18', '6', '30'], correctAnswer: 0, difficulty: 'easy', yearGroup: 7, points: 10 },
        { id: 'wp7-5', topic: 'wordproblems', question: 'Bus leaves at 14:35, arrives at 15:20. Journey time?', options: ['45 minutes', '55 minutes', '1 hour', '35 minutes'], correctAnswer: 0, difficulty: 'medium', yearGroup: 7, points: 15 },
      ],
      8: [
        { id: 'wp8-1', topic: 'wordproblems', question: 'Train travels 240km in 3 hours. Speed?', options: ['80 km/h', '720 km/h', '237 km/h', '243 km/h'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'wp8-2', topic: 'wordproblems', question: 'Shirt costs £25 with 20% off. Sale price?', options: ['£20', '£5', '£30', '£22'], correctAnswer: 0, difficulty: 'hard', yearGroup: 8, points: 20 },
        { id: 'wp8-3', topic: 'wordproblems', question: 'Recipe for 4 needs 200g flour. For 6 people?', options: ['300g', '400g', '200g', '250g'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'wp8-4', topic: 'wordproblems', question: 'Pool fills at 50L/min. Time for 2000L?', options: ['40 minutes', '100 minutes', '250 minutes', '4 minutes'], correctAnswer: 0, difficulty: 'medium', yearGroup: 8, points: 15 },
        { id: 'wp8-5', topic: 'wordproblems', question: 'Tom is 3 years older than Sara. Sara is 12. Tom\'s age?', options: ['15', '9', '36', '4'], correctAnswer: 0, difficulty: 'easy', yearGroup: 8, points: 10 },
      ],
      9: [
        { id: 'wp9-1', topic: 'wordproblems', question: 'Car depreciates 15% yearly from £12000. After 1 year?', options: ['£10200', '£1800', '£13800', '£10800'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'wp9-2', topic: 'wordproblems', question: '3 people share £120 in ratio 2:3:5. Largest share?', options: ['£60', '£36', '£24', '£40'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'wp9-3', topic: 'wordproblems', question: 'Fence for rectangular garden 12m×8m. Length needed?', options: ['40m', '96m', '20m', '32m'], correctAnswer: 0, difficulty: 'medium', yearGroup: 9, points: 15 },
        { id: 'wp9-4', topic: 'wordproblems', question: 'Compound interest: £500 at 10% for 2 years?', options: ['£605', '£600', '£550', '£610'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
        { id: 'wp9-5', topic: 'wordproblems', question: 'Map scale 1:50000. 4cm on map = real distance?', options: ['2km', '200km', '200m', '20km'], correctAnswer: 0, difficulty: 'hard', yearGroup: 9, points: 20 },
      ],
      10: [
        { id: 'wp10-1', topic: 'wordproblems', question: 'Ladder reaches 8m high, 6m from wall base. Ladder length?', options: ['10m', '14m', '2m', '48m'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'wp10-2', topic: 'wordproblems', question: 'Two trains leave same station, opposite directions at 60 and 80 km/h. Apart after 2 hours?', options: ['280km', '140km', '40km', '20km'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'wp10-3', topic: 'wordproblems', question: 'Probability of rain is 0.3. What\'s probability of no rain?', options: ['0.7', '0.3', '1.3', '0.03'], correctAnswer: 0, difficulty: 'medium', yearGroup: 10, points: 15 },
        { id: 'wp10-4', topic: 'wordproblems', question: 'Area of circular pond r=7m (π=22/7)?', options: ['154m²', '44m²', '22m²', '308m²'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
        { id: 'wp10-5', topic: 'wordproblems', question: 'Age problem: Sarah is twice as old as Tom. Sum of ages is 36. Sarah\'s age?', options: ['24', '12', '18', '36'], correctAnswer: 0, difficulty: 'hard', yearGroup: 10, points: 20 },
      ],
      11: [
        { id: 'wp11-1', topic: 'wordproblems', question: 'Ball dropped from 10m, bounces to 80% height each time. Height after 2 bounces?', options: ['6.4m', '8m', '5.12m', '16m'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'wp11-2', topic: 'wordproblems', question: 'Investment grows at 5% compound interest. Time to double (approx)?', options: ['14 years', '20 years', '10 years', '5 years'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'wp11-3', topic: 'wordproblems', question: 'Cone volume = 1/3πr²h. r=3, h=7. Volume (in terms of π)?', options: ['21π', '63π', '7π', '9π'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'wp11-4', topic: 'wordproblems', question: 'Population grows 2% yearly from 50000. After 3 years (nearest integer)?', options: ['53060', '53000', '56000', '50300'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
        { id: 'wp11-5', topic: 'wordproblems', question: 'Quadratic: path of ball h = -5t² + 20t. Max height reached?', options: ['20m', '25m', '15m', '40m'], correctAnswer: 0, difficulty: 'hard', yearGroup: 11, points: 25 },
      ],
    },
  };

  const topicQuestions = questions[topic];
  if (!topicQuestions) return [];

  const yearQuestions = topicQuestions[yearGroup];
  if (!yearQuestions) {
    // Fallback to nearest year group if exact match not found
    const availableYears = Object.keys(topicQuestions).map(Number);
    const nearestYear = availableYears.reduce((prev, curr) => 
      Math.abs(curr - yearGroup) < Math.abs(prev - yearGroup) ? curr : prev
    );
    const fallbackQuestions = topicQuestions[nearestYear] || [];
    // Randomize each question's options
    return fallbackQuestions.map(randomizeOptions);
  }

  // Randomize each question's options
  return yearQuestions.map(randomizeOptions);
};

// Generate harder versions of questions for hard mode
export const generateHardModeQuestions = (topic: string, yearGroup: YearGroup): Question[] => {
  const baseQuestions = generateQuestions(topic, yearGroup);
  
  return baseQuestions.map(q => ({
    ...q,
    id: `${q.id}-hard`,
    difficulty: 'hard' as const,
    points: q.points * 2, // Double points for hard mode
    // Remove options for manual entry (keep correctAnswer as reference)
  }));
};

// Get the correct answer text for a question
export const getCorrectAnswerText = (question: Question): string => {
  return question.options[question.correctAnswer];
};
