import { Question, YearGroup } from '@/types/game';

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleOptions = (options: string[], correctIndex: number): { options: string[]; newCorrectIndex: number } => {
  const optionsWithIndex = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex }));
  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }
  return {
    options: optionsWithIndex.map(o => o.opt),
    newCorrectIndex: optionsWithIndex.findIndex(o => o.isCorrect)
  };
};

const createQuestion = (
  topic: string,
  questionText: string,
  options: string[],
  correctIndex: number,
  difficulty: 'easy' | 'medium' | 'hard',
  yearGroup: YearGroup,
  points: number
): Question => {
  const shuffled = shuffleOptions(options, correctIndex);
  return {
    id: `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    topic,
    question: questionText,
    options: shuffled.options,
    correctAnswer: shuffled.newCorrectIndex,
    difficulty,
    yearGroup,
    points,
  };
};

// ============= ALGEBRA =============
const generateAlgebraQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'algebra';
  
  if (yearGroup <= 7) {
    const type = getRandomInt(0, 3);
    switch (type) {
      case 0: { // Simplify: ax + bx
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const answer = a + b;
        return createQuestion(topic, `Simplify: ${a}x + ${b}x`, [`${answer}x`, `${a * b}x`, `${answer}x²`, `${a + b + 1}x`], 0, 'easy', yearGroup, 10);
      }
      case 1: { // What is ax × b
        const a = getRandomInt(2, 5);
        const b = getRandomInt(2, 4);
        const answer = a * b;
        return createQuestion(topic, `What is ${a}a × ${b}?`, [`${answer}a`, `${a + b}a`, `${answer}`, `${a}a²`], 0, 'easy', yearGroup, 10);
      }
      case 2: { // If x = n, what is ax + b
        const x = getRandomInt(2, 6);
        const a = getRandomInt(2, 4);
        const b = getRandomInt(1, 5);
        const answer = a * x + b;
        return createQuestion(topic, `If x = ${x}, what is ${a}x + ${b}?`, [`${answer}`, `${a * x}`, `${answer + 1}`, `${a + b}`], 0, 'easy', yearGroup, 10);
      }
      default: { // Simplify: ax - bx + cx
        const a = getRandomInt(4, 8);
        const b = getRandomInt(1, 3);
        const c = getRandomInt(1, 3);
        const answer = a - b + c;
        return createQuestion(topic, `Simplify: ${a}y - ${b}y + ${c}y`, [`${answer}y`, `${a - b}y`, `${a + b + c}y`, `${answer}y²`], 0, 'medium', yearGroup, 15);
      }
    }
  } else if (yearGroup <= 9) {
    const type = getRandomInt(0, 3);
    switch (type) {
      case 0: { // Expand: a(bx + c)
        const a = getRandomInt(2, 4);
        const b = getRandomInt(1, 3);
        const c = getRandomInt(1, 5);
        return createQuestion(topic, `Expand: ${a}(${b}x + ${c})`, [`${a * b}x + ${a * c}`, `${a + b}x + ${c}`, `${a * b}x + ${c}`, `${b}x + ${a * c}`], 0, 'medium', yearGroup, 15);
      }
      case 1: { // Simplify: ax² + bx²
        const a = getRandomInt(2, 5);
        const b = getRandomInt(2, 5);
        const answer = a + b;
        return createQuestion(topic, `Simplify: ${a}x² + ${b}x²`, [`${answer}x²`, `${answer}x⁴`, `${a * b}x²`, `${answer}x`], 0, 'medium', yearGroup, 15);
      }
      case 2: { // Factorise: ax + ay
        const a = getRandomInt(2, 6);
        const b = getRandomInt(2, 5);
        const c = getRandomInt(2, 5);
        return createQuestion(topic, `Factorise: ${a * b}x + ${a * c}`, [`${a}(${b}x + ${c})`, `${b}(${a}x + ${c})`, `${a * b}(x + ${c})`, `${a}(x + ${b * c})`], 0, 'medium', yearGroup, 15);
      }
      default: { // Expand: (x + a)(x + b)
        const a = getRandomInt(1, 4);
        const b = getRandomInt(1, 4);
        return createQuestion(topic, `Expand: (x + ${a})(x + ${b})`, [`x² + ${a + b}x + ${a * b}`, `x² + ${a * b}x + ${a + b}`, `2x + ${a + b}`, `x² + ${a + b}`], 0, 'hard', yearGroup, 20);
      }
    }
  } else {
    const type = getRandomInt(0, 3);
    switch (type) {
      case 0: { // Factorise: x² + bx + c
        const r1 = getRandomInt(1, 5);
        const r2 = getRandomInt(1, 5);
        return createQuestion(topic, `Factorise: x² + ${r1 + r2}x + ${r1 * r2}`, [`(x + ${r1})(x + ${r2})`, `(x + ${r1 * r2})(x + 1)`, `(x - ${r1})(x - ${r2})`, `(x + ${r1 + r2})(x + 1)`], 0, 'hard', yearGroup, 20);
      }
      case 1: { // Simplify: (ax)²
        const a = getRandomInt(2, 4);
        const answer = a * a;
        return createQuestion(topic, `Simplify: (${a}x)²`, [`${answer}x²`, `${a * 2}x²`, `${a}x²`, `${answer}x`], 0, 'hard', yearGroup, 20);
      }
      case 2: { // Difference of squares: x² - a²
        const a = getRandomInt(2, 6);
        return createQuestion(topic, `Factorise: x² - ${a * a}`, [`(x - ${a})(x + ${a})`, `(x - ${a})²`, `(x + ${a})²`, `(x - ${a * a})(x + 1)`], 0, 'hard', yearGroup, 20);
      }
      default: { // Complete the square
        const b = getRandomInt(2, 6) * 2;
        const half = b / 2;
        return createQuestion(topic, `Complete the square: x² + ${b}x + ___`, [`${half * half}`, `${b}`, `${half}`, `${b * 2}`], 0, 'hard', yearGroup, 20);
      }
    }
  }
};

// ============= EQUATIONS =============
const generateEquationsQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'equations';
  
  if (yearGroup <= 7) {
    const type = getRandomInt(0, 3);
    switch (type) {
      case 0: { // x + a = b
        const a = getRandomInt(3, 10);
        const answer = getRandomInt(3, 12);
        const b = answer + a;
        return createQuestion(topic, `Solve: x + ${a} = ${b}`, [`x = ${answer}`, `x = ${b + a}`, `x = ${answer + 1}`, `x = ${a}`], 0, 'easy', yearGroup, 10);
      }
      case 1: { // ax = b
        const a = getRandomInt(2, 5);
        const answer = getRandomInt(2, 10);
        const b = a * answer;
        return createQuestion(topic, `Solve: ${a}x = ${b}`, [`x = ${answer}`, `x = ${b - a}`, `x = ${a * b}`, `x = ${answer + 1}`], 0, 'easy', yearGroup, 10);
      }
      case 2: { // x - a = b
        const a = getRandomInt(2, 8);
        const b = getRandomInt(3, 12);
        const answer = b + a;
        return createQuestion(topic, `Solve: x - ${a} = ${b}`, [`x = ${answer}`, `x = ${b - a}`, `x = ${a}`, `x = ${answer - 1}`], 0, 'easy', yearGroup, 10);
      }
      default: { // ax + b = c
        const a = getRandomInt(2, 4);
        const answer = getRandomInt(2, 8);
        const b = getRandomInt(1, 5);
        const c = a * answer + b;
        return createQuestion(topic, `Solve: ${a}x + ${b} = ${c}`, [`x = ${answer}`, `x = ${c - b}`, `x = ${answer + 1}`, `x = ${c / a}`], 0, 'medium', yearGroup, 15);
      }
    }
  } else if (yearGroup <= 9) {
    const type = getRandomInt(0, 3);
    switch (type) {
      case 0: { // a(x + b) = c
        const a = getRandomInt(2, 4);
        const answer = getRandomInt(1, 8);
        const b = getRandomInt(1, 5);
        const c = a * (answer + b);
        return createQuestion(topic, `Solve: ${a}(x + ${b}) = ${c}`, [`x = ${answer}`, `x = ${c / a}`, `x = ${answer + b}`, `x = ${c - b}`], 0, 'medium', yearGroup, 15);
      }
      case 1: { // ax + b = cx + d
        const a = getRandomInt(3, 6);
        const c = getRandomInt(1, a - 1);
        const answer = getRandomInt(2, 8);
        const b = getRandomInt(1, 10);
        const d = (a - c) * answer + b;
        return createQuestion(topic, `Solve: ${a}x + ${b} = ${c}x + ${d}`, [`x = ${answer}`, `x = ${d - b}`, `x = ${answer + 1}`, `x = ${(d - b) / 2}`], 0, 'hard', yearGroup, 20);
      }
      case 2: { // x² = a (perfect square)
        const answer = getRandomInt(2, 9);
        const a = answer * answer;
        return createQuestion(topic, `Solve: x² = ${a}`, [`x = ±${answer}`, `x = ${answer}`, `x = ${a / 2}`, `x = -${answer}`], 0, 'medium', yearGroup, 15);
      }
      default: { // Simultaneous: x + y = a, x - y = b
        const x = getRandomInt(2, 8);
        const y = getRandomInt(1, x - 1);
        return createQuestion(topic, `Solve: x + y = ${x + y}, x - y = ${x - y}`, [`x = ${x}, y = ${y}`, `x = ${y}, y = ${x}`, `x = ${x + 1}, y = ${y - 1}`, `x = ${x - y}, y = ${y + x}`], 0, 'hard', yearGroup, 20);
      }
    }
  } else {
    const type = getRandomInt(0, 2);
    switch (type) {
      case 0: { // Quadratic: x² - bx + c = 0
        const r1 = getRandomInt(1, 6);
        const r2 = getRandomInt(1, 6);
        return createQuestion(topic, `Solve: x² - ${r1 + r2}x + ${r1 * r2} = 0`, [`x = ${r1}, ${r2}`, `x = -${r1}, -${r2}`, `x = ${r1 + r2}, ${r1 * r2}`, `x = ${r1}, -${r2}`], 0, 'hard', yearGroup, 20);
      }
      case 1: { // (x - a)(x + b) = 0
        const a = getRandomInt(1, 6);
        const b = getRandomInt(1, 6);
        return createQuestion(topic, `Solve: (x - ${a})(x + ${b}) = 0`, [`x = ${a}, -${b}`, `x = -${a}, ${b}`, `x = ${a}, ${b}`, `x = -${a}, -${b}`], 0, 'medium', yearGroup, 15);
      }
      default: { // ax² + bx = 0
        const a = getRandomInt(2, 5);
        const b = getRandomInt(2, 8);
        return createQuestion(topic, `Solve: ${a}x² + ${b}x = 0`, [`x = 0, -${b / a}` , `x = 0, ${b / a}`, `x = ${b / a}`, `x = -${b}`].map(o => o.includes('.') ? o.split('.')[0] : o), 0, 'hard', yearGroup, 20);
      }
    }
  }
};

// ============= FRACTIONS =============
const generateFractionsQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'fractions';
  
  const type = getRandomInt(0, 4);
  switch (type) {
    case 0: { // Simplify fraction
      const factor = getRandomInt(2, 5);
      const num = getRandomInt(1, 4);
      const den = getRandomInt(num + 1, 6);
      return createQuestion(topic, `Simplify: ${num * factor}/${den * factor}`, [`${num}/${den}`, `${factor}/${den}`, `${num * factor}/${den}`, `${num}/${factor}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Add fractions same denominator
      const den = getRandomInt(3, 8);
      const a = getRandomInt(1, den - 2);
      const b = getRandomInt(1, den - a - 1);
      return createQuestion(topic, `Calculate: ${a}/${den} + ${b}/${den}`, [`${a + b}/${den}`, `${a * b}/${den}`, `${a + b}/${den * 2}`, `${a}/${b}`], 0, 'easy', yearGroup, 10);
    }
    case 2: { // Multiply fractions
      const n1 = getRandomInt(1, 4);
      const d1 = getRandomInt(2, 5);
      const n2 = getRandomInt(1, 4);
      const d2 = getRandomInt(2, 5);
      return createQuestion(topic, `Calculate: ${n1}/${d1} × ${n2}/${d2}`, [`${n1 * n2}/${d1 * d2}`, `${n1 + n2}/${d1 + d2}`, `${n1 * n2}/${d1 + d2}`, `${n1 + n2}/${d1 * d2}`], 0, 'medium', yearGroup, 15);
    }
    case 3: { // Decimal to fraction
      const decimals = ['0.25', '0.5', '0.75', '0.2', '0.4', '0.125'];
      const fractions = ['1/4', '1/2', '3/4', '1/5', '2/5', '1/8'];
      const idx = getRandomInt(0, decimals.length - 1);
      const wrongIdxs = [0, 1, 2, 3, 4, 5].filter(i => i !== idx).slice(0, 3);
      return createQuestion(topic, `Convert ${decimals[idx]} to a fraction`, [fractions[idx], ...wrongIdxs.map(i => fractions[i])], 0, 'medium', yearGroup, 15);
    }
    default: { // Fraction of amount
      const fraction = [[1, 4], [1, 2], [3, 4], [2, 5], [1, 3]][getRandomInt(0, 4)];
      const multiplier = getRandomInt(2, 5);
      const whole = fraction[1] * multiplier;
      const answer = fraction[0] * multiplier;
      return createQuestion(topic, `What is ${fraction[0]}/${fraction[1]} of ${whole}?`, [`${answer}`, `${whole / 2}`, `${answer + 1}`, `${fraction[1]}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= GEOMETRY =============
const generateGeometryQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'geometry';
  
  const type = getRandomInt(0, 4);
  switch (type) {
    case 0: { // Angles in triangle
      const a1 = getRandomInt(30, 80);
      const a2 = getRandomInt(30, 100 - a1);
      const answer = 180 - a1 - a2;
      return createQuestion(topic, `A triangle has angles ${a1}° and ${a2}°. What is the third angle?`, [`${answer}°`, `${answer + 10}°`, `${180 - a1}°`, `${a1 + a2}°`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Area of rectangle
      const l = getRandomInt(3, 12);
      const w = getRandomInt(2, 8);
      const answer = l * w;
      return createQuestion(topic, `Find the area of a rectangle: length = ${l}cm, width = ${w}cm`, [`${answer} cm²`, `${l + w} cm²`, `${2 * (l + w)} cm²`, `${answer + l} cm²`], 0, 'easy', yearGroup, 10);
    }
    case 2: { // Perimeter of rectangle
      const l = getRandomInt(4, 10);
      const w = getRandomInt(2, 6);
      const answer = 2 * (l + w);
      return createQuestion(topic, `Find the perimeter: length = ${l}cm, width = ${w}cm`, [`${answer} cm`, `${l * w} cm`, `${l + w} cm`, `${answer + 2} cm`], 0, 'easy', yearGroup, 10);
    }
    case 3: { // Area of triangle
      const b = getRandomInt(4, 12);
      const h = getRandomInt(3, 10);
      const answer = (b * h) / 2;
      return createQuestion(topic, `Area of triangle: base = ${b}cm, height = ${h}cm`, [`${answer} cm²`, `${b * h} cm²`, `${b + h} cm²`, `${answer + b} cm²`], 0, 'medium', yearGroup, 15);
    }
    default: { // Angles on straight line
      const a = getRandomInt(40, 130);
      const answer = 180 - a;
      return createQuestion(topic, `Two angles on a straight line: one is ${a}°. What is the other?`, [`${answer}°`, `${90 - a}°`, `${a}°`, `${360 - a}°`], 0, 'easy', yearGroup, 10);
    }
  }
};

// ============= PERCENTAGES =============
const generatePercentagesQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'percentages';
  
  const type = getRandomInt(0, 3);
  switch (type) {
    case 0: { // Find percentage of amount
      const percent = [10, 20, 25, 50, 75][getRandomInt(0, 4)];
      const base = getRandomInt(2, 10) * 20;
      const answer = (base * percent) / 100;
      return createQuestion(topic, `What is ${percent}% of ${base}?`, [`${answer}`, `${base / percent}`, `${answer + 10}`, `${base - percent}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Percentage increase
      const original = getRandomInt(5, 20) * 10;
      const percent = [10, 20, 25, 50][getRandomInt(0, 3)];
      const answer = original + (original * percent) / 100;
      return createQuestion(topic, `Increase ${original} by ${percent}%`, [`${answer}`, `${original + percent}`, `${original * 2}`, `${answer + original}`], 0, 'medium', yearGroup, 15);
    }
    case 2: { // Express as percentage
      const part = getRandomInt(1, 4) * 5;
      const whole = 100;
      return createQuestion(topic, `Express ${part} out of ${whole} as a percentage`, [`${part}%`, `${part / 10}%`, `${100 - part}%`, `${part * 2}%`], 0, 'easy', yearGroup, 10);
    }
    default: { // Percentage decrease
      const original = getRandomInt(5, 15) * 20;
      const percent = [10, 20, 25][getRandomInt(0, 2)];
      const answer = original - (original * percent) / 100;
      return createQuestion(topic, `Decrease ${original} by ${percent}%`, [`${answer}`, `${original - percent}`, `${original / 2}`, `${answer - 10}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= RATIOS =============
const generateRatiosQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'ratios';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // Simplify ratio
      const factor = getRandomInt(2, 5);
      const a = getRandomInt(1, 4);
      const b = getRandomInt(1, 4);
      return createQuestion(topic, `Simplify the ratio ${a * factor}:${b * factor}`, [`${a}:${b}`, `${factor}:${b}`, `${a * factor}:${b}`, `1:${b / a}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Share in ratio
      const a = getRandomInt(1, 3);
      const b = getRandomInt(1, 3);
      const total = (a + b) * getRandomInt(5, 15);
      const share1 = (total * a) / (a + b);
      return createQuestion(topic, `Share ${total} in ratio ${a}:${b}. What is the larger share?`, [`${Math.max(share1, total - share1)}`, `${total / 2}`, `${total - a}`, `${share1 + b}`], 0, 'medium', yearGroup, 15);
    }
    default: { // Find missing value
      const a = getRandomInt(2, 5);
      const b = getRandomInt(2, 5);
      const multiplier = getRandomInt(2, 6);
      return createQuestion(topic, `If ${a}:${b} = ${a * multiplier}:x, find x`, [`${b * multiplier}`, `${a * multiplier}`, `${b + multiplier}`, `${a * b}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= PROBABILITY =============
const generateProbabilityQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'probability';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // Simple probability
      const total = getRandomInt(5, 12);
      const favorable = getRandomInt(1, total - 1);
      return createQuestion(topic, `A bag has ${favorable} red and ${total - favorable} blue balls. P(red)?`, [`${favorable}/${total}`, `${total - favorable}/${total}`, `${favorable}/${total - favorable}`, `1/${total}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Dice probability
      const outcomes = [1, 2, 3, 6];
      const target = outcomes[getRandomInt(0, outcomes.length - 1)];
      return createQuestion(topic, `Roll a dice. P(number ≤ ${target})?`, [`${target}/6`, `${6 - target}/6`, `1/6`, `${target}/${target + 1}`], 0, 'medium', yearGroup, 15);
    }
    default: { // Complementary
      const total = getRandomInt(5, 10);
      const favorable = getRandomInt(1, total - 1);
      const notFavorable = total - favorable;
      return createQuestion(topic, `P(event) = ${favorable}/${total}. What is P(not event)?`, [`${notFavorable}/${total}`, `${favorable}/${total}`, `1 - ${favorable}`, `${total}/${favorable}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= SEQUENCES =============
const generateSequencesQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'sequences';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // Arithmetic sequence - find next
      const first = getRandomInt(1, 10);
      const diff = getRandomInt(2, 7);
      const seq = [first, first + diff, first + 2 * diff, first + 3 * diff];
      const answer = first + 4 * diff;
      return createQuestion(topic, `Find the next term: ${seq.join(', ')}, ...`, [`${answer}`, `${answer + diff}`, `${answer - 1}`, `${seq[3] + seq[2]}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Find nth term
      const first = getRandomInt(1, 5);
      const diff = getRandomInt(2, 5);
      const n = getRandomInt(5, 10);
      const answer = first + (n - 1) * diff;
      return createQuestion(topic, `Sequence: ${first}, ${first + diff}, ${first + 2 * diff}... Find the ${n}th term`, [`${answer}`, `${first + n * diff}`, `${answer + diff}`, `${n * diff}`], 0, 'medium', yearGroup, 15);
    }
    default: { // Find common difference
      const first = getRandomInt(1, 10);
      const diff = getRandomInt(2, 8);
      const seq = [first, first + diff, first + 2 * diff];
      return createQuestion(topic, `Find common difference: ${seq.join(', ')}...`, [`${diff}`, `${first}`, `${diff + 1}`, `${seq[1]}`], 0, 'easy', yearGroup, 10);
    }
  }
};

// ============= POWERS =============
const generatePowersQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'powers';
  
  const type = getRandomInt(0, 3);
  switch (type) {
    case 0: { // Simple power
      const base = getRandomInt(2, 6);
      const exp = getRandomInt(2, 3);
      const answer = Math.pow(base, exp);
      return createQuestion(topic, `Calculate: ${base}${exp === 2 ? '²' : '³'}`, [`${answer}`, `${base * exp}`, `${base + exp}`, `${answer + base}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Square root
      const answer = getRandomInt(2, 12);
      const square = answer * answer;
      return createQuestion(topic, `What is √${square}?`, [`${answer}`, `${square / 2}`, `${answer + 1}`, `${square / answer + 1}`], 0, 'easy', yearGroup, 10);
    }
    case 2: { // Power of power
      const base = getRandomInt(2, 4);
      const exp1 = getRandomInt(2, 3);
      const exp2 = 2;
      const answer = exp1 * exp2;
      return createQuestion(topic, `Simplify: (x${exp1 === 2 ? '²' : '³'})²`, [`x${answer === 4 ? '⁴' : answer === 6 ? '⁶' : answer}`, `x${exp1 + exp2}`, `2x${exp1}`, `x${exp1}`], 0, 'medium', yearGroup, 15);
    }
    default: { // Multiply powers
      const exp1 = getRandomInt(2, 4);
      const exp2 = getRandomInt(2, 4);
      const answer = exp1 + exp2;
      return createQuestion(topic, `Simplify: x${exp1 === 2 ? '²' : exp1 === 3 ? '³' : '⁴'} × x${exp2 === 2 ? '²' : exp2 === 3 ? '³' : '⁴'}`, [`x${answer > 4 ? answer : answer === 4 ? '⁴' : answer}`, `x${exp1 * exp2}`, `2x${exp1}`, `x${exp1}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= MENTAL MATHS =============
const generateMentalQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'mental';
  
  const type = getRandomInt(0, 4);
  switch (type) {
    case 0: { // Quick addition
      const a = getRandomInt(10, 99);
      const b = getRandomInt(10, 99);
      const answer = a + b;
      return createQuestion(topic, `${a} + ${b} = ?`, [`${answer}`, `${answer + 10}`, `${answer - 1}`, `${a * 2}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Quick subtraction
      const a = getRandomInt(50, 150);
      const b = getRandomInt(10, a - 10);
      const answer = a - b;
      return createQuestion(topic, `${a} - ${b} = ?`, [`${answer}`, `${answer + 5}`, `${a + b}`, `${answer - 2}`], 0, 'easy', yearGroup, 10);
    }
    case 2: { // Times tables
      const a = getRandomInt(2, 12);
      const b = getRandomInt(2, 12);
      const answer = a * b;
      return createQuestion(topic, `${a} × ${b} = ?`, [`${answer}`, `${a + b}`, `${answer + a}`, `${answer - b}`], 0, 'easy', yearGroup, 10);
    }
    case 3: { // Division
      const b = getRandomInt(2, 12);
      const answer = getRandomInt(2, 12);
      const a = b * answer;
      return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${answer}`, `${b}`, `${answer + 1}`, `${a - b}`], 0, 'easy', yearGroup, 10);
    }
    default: { // Order of operations
      const a = getRandomInt(2, 8);
      const b = getRandomInt(2, 5);
      const c = getRandomInt(1, 10);
      const answer = a + b * c;
      return createQuestion(topic, `${a} + ${b} × ${c} = ?`, [`${answer}`, `${(a + b) * c}`, `${a * b + c}`, `${answer + b}`], 0, 'medium', yearGroup, 15);
    }
  }
};

// ============= TRIGONOMETRY =============
const generateTrigonometryQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'trigonometry';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // SOH CAH TOA identify
      const ratios = [
        ['sin', 'opposite/hypotenuse'],
        ['cos', 'adjacent/hypotenuse'],
        ['tan', 'opposite/adjacent']
      ];
      const idx = getRandomInt(0, 2);
      const wrongIdxs = [0, 1, 2].filter(i => i !== idx);
      return createQuestion(topic, `What is ${ratios[idx][0]}(θ)?`, [ratios[idx][1], ratios[wrongIdxs[0]][1], ratios[wrongIdxs[1]][1], 'hypotenuse/opposite'], 0, 'medium', yearGroup, 15);
    }
    case 1: { // Find side using ratio (conceptual)
      const opp = getRandomInt(3, 8);
      const adj = getRandomInt(3, 8);
      return createQuestion(topic, `If opposite = ${opp}, adjacent = ${adj}, what is tan(θ)?`, [`${opp}/${adj}`, `${adj}/${opp}`, `${opp + adj}`, `${opp * adj}`], 0, 'medium', yearGroup, 15);
    }
    default: { // Pythagorean
      const a = getRandomInt(3, 8);
      const b = getRandomInt(3, 8);
      const c2 = a * a + b * b;
      return createQuestion(topic, `Right triangle: a=${a}, b=${b}. Find c² (c is hypotenuse)`, [`${c2}`, `${a + b}`, `${a * b}`, `${c2 + a}`], 0, 'hard', yearGroup, 20);
    }
  }
};

// ============= GRAPHS =============
const generateGraphsQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'graphs';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // Find gradient
      const m = getRandomInt(1, 5);
      const c = getRandomInt(-5, 5);
      return createQuestion(topic, `What is the gradient of y = ${m}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}?`, [`${m}`, `${c}`, `${m + c}`, `${-m}`], 0, 'medium', yearGroup, 15);
    }
    case 1: { // Find y-intercept
      const m = getRandomInt(1, 5);
      const c = getRandomInt(-5, 10);
      return createQuestion(topic, `What is the y-intercept of y = ${m}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)}?`, [`${c}`, `${m}`, `${m + c}`, `0`], 0, 'medium', yearGroup, 15);
    }
    default: { // Coordinates
      const m = getRandomInt(1, 4);
      const c = getRandomInt(0, 5);
      const x = getRandomInt(1, 5);
      const y = m * x + c;
      return createQuestion(topic, `On y = ${m}x + ${c}, if x = ${x}, what is y?`, [`${y}`, `${m + c}`, `${x + c}`, `${y + m}`], 0, 'easy', yearGroup, 10);
    }
  }
};

// ============= WORD PROBLEMS =============
const generateWordProblemsQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'wordproblems';
  
  const type = getRandomInt(0, 3);
  switch (type) {
    case 0: { // Age problem
      const age1 = getRandomInt(8, 15);
      const diff = getRandomInt(2, 5);
      return createQuestion(topic, `Tom is ${age1} years old. His brother is ${diff} years older. How old is his brother?`, [`${age1 + diff}`, `${age1 - diff}`, `${diff}`, `${age1 * 2}`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Money problem
      const price = getRandomInt(2, 10);
      const quantity = getRandomInt(2, 6);
      const total = price * quantity;
      return createQuestion(topic, `Apples cost £${price} each. How much for ${quantity} apples?`, [`£${total}`, `£${price + quantity}`, `£${total + price}`, `£${quantity}`], 0, 'easy', yearGroup, 10);
    }
    case 2: { // Distance/time
      const speed = getRandomInt(4, 12) * 5;
      const time = getRandomInt(2, 4);
      const distance = speed * time;
      return createQuestion(topic, `A car travels at ${speed} km/h for ${time} hours. Distance?`, [`${distance} km`, `${speed + time} km`, `${speed} km`, `${distance + speed} km`], 0, 'medium', yearGroup, 15);
    }
    default: { // Sharing
      const total = getRandomInt(3, 8) * 12;
      const people = [2, 3, 4, 6][getRandomInt(0, 3)];
      const share = total / people;
      return createQuestion(topic, `${total} sweets shared equally among ${people} children. Each gets?`, [`${share}`, `${total - people}`, `${share + 1}`, `${people}`], 0, 'easy', yearGroup, 10);
    }
  }
};

// ============= MEASUREMENT =============
const generateMeasurementQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'measurement';
  
  const type = getRandomInt(0, 2);
  switch (type) {
    case 0: { // Convert cm to m
      const cm = getRandomInt(1, 9) * 100;
      const m = cm / 100;
      return createQuestion(topic, `Convert ${cm} cm to metres`, [`${m} m`, `${cm * 100} m`, `${cm / 10} m`, `${m * 10} m`], 0, 'easy', yearGroup, 10);
    }
    case 1: { // Convert kg to g
      const kg = getRandomInt(1, 9);
      const g = kg * 1000;
      return createQuestion(topic, `Convert ${kg} kg to grams`, [`${g} g`, `${kg * 100} g`, `${kg * 10} g`, `${g + 100} g`], 0, 'easy', yearGroup, 10);
    }
    default: { // Time
      const hours = getRandomInt(1, 5);
      const minutes = hours * 60;
      return createQuestion(topic, `How many minutes in ${hours} hours?`, [`${minutes}`, `${hours * 100}`, `${minutes - 30}`, `${hours + 60}`], 0, 'easy', yearGroup, 10);
    }
  }
};

// ============= MAIN GENERATOR =============
// ============= PRIMARY SCHOOL: COUNTING =============
const generateCountingQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'counting';
  
  if (yearGroup <= 1) {
    const type = getRandomInt(0, 2);
    switch (type) {
      case 0: {
        const num = getRandomInt(1, 10);
        return createQuestion(topic, `What number comes after ${num}?`, [`${num + 1}`, `${num}`, `${num + 2}`, `${num - 1}`], 0, 'easy', yearGroup, 1);
      }
      case 1: {
        const num = getRandomInt(2, 10);
        return createQuestion(topic, `What number comes before ${num}?`, [`${num - 1}`, `${num}`, `${num + 1}`, `${num - 2}`], 0, 'easy', yearGroup, 1);
      }
      default: {
        const num = getRandomInt(1, 5);
        const emoji = ['🍎', '⭐', '🎈', '🌟', '🍪'][getRandomInt(0, 4)];
        return createQuestion(topic, `Count: ${emoji.repeat(num)}`, [`${num}`, `${num + 1}`, `${num - 1}`, `${num + 2}`], 0, 'easy', yearGroup, 1);
      }
    }
  }
  
  if (yearGroup <= 2) {
    const type = getRandomInt(0, 2);
    switch (type) {
      case 0: {
        const num = getRandomInt(10, 50);
        return createQuestion(topic, `What number comes after ${num}?`, [`${num + 1}`, `${num}`, `${num + 10}`, `${num - 1}`], 0, 'easy', yearGroup, 1);
      }
      case 1: {
        const num = getRandomInt(2, 10) * 2;
        return createQuestion(topic, `Count by 2s: 2, 4, 6, 8, __`, [`${10}`, `${9}`, `${12}`, `${11}`], 0, 'easy', yearGroup, 1);
      }
      default: {
        const num = getRandomInt(5, 20) * 5;
        return createQuestion(topic, `Count by 5s: 5, 10, 15, 20, __`, [`${25}`, `${21}`, `${30}`, `${24}`], 0, 'easy', yearGroup, 1);
      }
    }
  }
  
  const num = getRandomInt(100, 500);
  return createQuestion(topic, `What number comes after ${num}?`, [`${num + 1}`, `${num + 10}`, `${num}`, `${num + 100}`], 0, 'easy', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: ADDITION =============
const generateAdditionQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'addition';
  
  if (yearGroup <= 1) {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 1}`, `${a + b - 1}`, `${a + b + 2}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 2) {
    const a = getRandomInt(5, 15);
    const b = getRandomInt(1, 10);
    return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 1}`, `${a + b - 1}`, `${a + b + 2}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 3) {
    const a = getRandomInt(10, 50);
    const b = getRandomInt(10, 50);
    return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 10}`, `${a + b - 10}`, `${a + b + 1}`], 0, 'medium', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const a = getRandomInt(100, 500);
    const b = getRandomInt(100, 500);
    return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 10}`, `${a + b - 10}`, `${a + b + 100}`], 0, 'medium', yearGroup, 1);
  }
  
  if (yearGroup <= 5) {
    const a = getRandomInt(1000, 5000);
    const b = getRandomInt(1000, 5000);
    return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 100}`, `${a + b - 100}`, `${a + b + 1000}`], 0, 'medium', yearGroup, 1);
  }
  
  const a = getRandomInt(10000, 50000);
  const b = getRandomInt(10000, 50000);
  return createQuestion(topic, `${a} + ${b} = ?`, [`${a + b}`, `${a + b + 1000}`, `${a + b - 1000}`, `${a + b + 100}`], 0, 'hard', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: SUBTRACTION =============
const generateSubtractionQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'subtraction';
  
  if (yearGroup <= 1) {
    const a = getRandomInt(5, 10);
    const b = getRandomInt(1, a - 1);
    return createQuestion(topic, `${a} - ${b} = ?`, [`${a - b}`, `${a - b + 1}`, `${a - b - 1}`, `${a + b}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 2) {
    const a = getRandomInt(10, 20);
    const b = getRandomInt(1, 10);
    return createQuestion(topic, `${a} - ${b} = ?`, [`${a - b}`, `${a - b + 1}`, `${a - b - 1}`, `${a + b}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 3) {
    const a = getRandomInt(50, 100);
    const b = getRandomInt(10, 50);
    return createQuestion(topic, `${a} - ${b} = ?`, [`${a - b}`, `${a - b + 10}`, `${a - b - 10}`, `${a + b}`], 0, 'medium', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const a = getRandomInt(500, 1000);
    const b = getRandomInt(100, 500);
    return createQuestion(topic, `${a} - ${b} = ?`, [`${a - b}`, `${a - b + 10}`, `${a - b - 10}`, `${a + b}`], 0, 'medium', yearGroup, 1);
  }
  
  const a = getRandomInt(5000, 10000);
  const b = getRandomInt(1000, 5000);
  return createQuestion(topic, `${a} - ${b} = ?`, [`${a - b}`, `${a - b + 100}`, `${a - b - 100}`, `${a + b}`], 0, 'hard', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: MULTIPLICATION =============
const generateMultiplicationQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'multiplication';
  
  if (yearGroup <= 2) {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    return createQuestion(topic, `${a} × ${b} = ?`, [`${a * b}`, `${a * b + 1}`, `${a + b}`, `${a * b - 1}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 3) {
    const a = getRandomInt(2, 10);
    const b = getRandomInt(2, 5);
    return createQuestion(topic, `${a} × ${b} = ?`, [`${a * b}`, `${a * b + a}`, `${a + b}`, `${a * b - b}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const a = getRandomInt(2, 12);
    const b = getRandomInt(2, 12);
    return createQuestion(topic, `${a} × ${b} = ?`, [`${a * b}`, `${a * b + a}`, `${a * b - b}`, `${a + b}`], 0, 'medium', yearGroup, 1);
  }
  
  if (yearGroup <= 5) {
    const a = getRandomInt(10, 50);
    const b = getRandomInt(2, 10);
    return createQuestion(topic, `${a} × ${b} = ?`, [`${a * b}`, `${a * b + 10}`, `${a * b - 10}`, `${a + b}`], 0, 'medium', yearGroup, 1);
  }
  
  const a = getRandomInt(50, 100);
  const b = getRandomInt(10, 50);
  return createQuestion(topic, `${a} × ${b} = ?`, [`${a * b}`, `${a * b + 100}`, `${a * b - 100}`, `${a * b + 50}`], 0, 'hard', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: DIVISION =============
const generateDivisionQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'division';
  
  if (yearGroup <= 2) {
    const b = getRandomInt(1, 5);
    const a = b * getRandomInt(1, 5);
    return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${a / b}`, `${a / b + 1}`, `${a - b}`, `${b}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 3) {
    const b = getRandomInt(2, 5);
    const a = b * getRandomInt(2, 10);
    return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${a / b}`, `${a / b + 1}`, `${a / b - 1}`, `${b}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const b = getRandomInt(2, 10);
    const a = b * getRandomInt(2, 12);
    return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${a / b}`, `${a / b + 1}`, `${a / b - 1}`, `${a - b}`], 0, 'medium', yearGroup, 1);
  }
  
  if (yearGroup <= 5) {
    const b = getRandomInt(5, 12);
    const a = b * getRandomInt(10, 20);
    return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${a / b}`, `${a / b + 1}`, `${a / b - 1}`, `${b}`], 0, 'medium', yearGroup, 1);
  }
  
  const b = getRandomInt(10, 25);
  const a = b * getRandomInt(10, 50);
  return createQuestion(topic, `${a} ÷ ${b} = ?`, [`${a / b}`, `${a / b + 5}`, `${a / b - 5}`, `${b}`], 0, 'hard', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: SHAPES =============
const generateShapesQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'shapes';
  
  if (yearGroup <= 2) {
    const questions = [
      { q: 'How many sides does a triangle have?', opts: ['3', '4', '5', '2'], correct: 0 },
      { q: 'How many sides does a square have?', opts: ['4', '3', '5', '6'], correct: 0 },
      { q: 'What shape is a ball?', opts: ['Sphere', 'Circle', 'Square', 'Cube'], correct: 0 },
      { q: 'How many corners does a rectangle have?', opts: ['4', '2', '3', '6'], correct: 0 },
      { q: 'What shape has no corners?', opts: ['Circle', 'Square', 'Triangle', 'Rectangle'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const questions = [
      { q: 'How many sides does a pentagon have?', opts: ['5', '6', '4', '8'], correct: 0 },
      { q: 'How many sides does a hexagon have?', opts: ['6', '5', '7', '8'], correct: 0 },
      { q: 'What shape has 8 sides?', opts: ['Octagon', 'Hexagon', 'Pentagon', 'Heptagon'], correct: 0 },
      { q: 'How many faces does a cube have?', opts: ['6', '4', '8', '12'], correct: 0 },
      { q: 'A 3D rectangle shape is called a...', opts: ['Cuboid', 'Square', 'Prism', 'Cube'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'medium', yearGroup, 1);
  }
  
  const questions = [
    { q: 'How many edges does a cube have?', opts: ['12', '6', '8', '10'], correct: 0 },
    { q: 'How many vertices does a cube have?', opts: ['8', '6', '12', '4'], correct: 0 },
    { q: 'What is the sum of angles in a triangle?', opts: ['180°', '360°', '90°', '270°'], correct: 0 },
    { q: 'How many lines of symmetry does a square have?', opts: ['4', '2', '1', '8'], correct: 0 },
  ];
  const selected = questions[getRandomInt(0, questions.length - 1)];
  return createQuestion(topic, selected.q, selected.opts, selected.correct, 'medium', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: TELLING TIME =============
const generateTellingTimeQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'telling-time';
  
  if (yearGroup <= 1) {
    const questions = [
      { q: 'How many hours in a day?', opts: ['24', '12', '60', '100'], correct: 0 },
      { q: 'The short hand shows...', opts: ['Hours', 'Minutes', 'Seconds', 'Days'], correct: 0 },
      { q: 'If the short hand is on 3, what time is it?', opts: ['3 o\'clock', '12 o\'clock', '6 o\'clock', '9 o\'clock'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 2) {
    const questions = [
      { q: 'How many minutes in an hour?', opts: ['60', '30', '100', '24'], correct: 0 },
      { q: 'Half past 2 is the same as...', opts: ['2:30', '2:00', '2:15', '2:45'], correct: 0 },
      { q: 'Quarter past 5 is the same as...', opts: ['5:15', '5:30', '5:45', '5:00'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 3) {
    const questions = [
      { q: 'What is 25 minutes after 3:00?', opts: ['3:25', '3:35', '3:15', '3:30'], correct: 0 },
      { q: 'How many seconds in a minute?', opts: ['60', '100', '30', '120'], correct: 0 },
      { q: 'What time is 15 minutes before 4:00?', opts: ['3:45', '4:15', '3:30', '3:55'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'medium', yearGroup, 1);
  }
  
  const hour = getRandomInt(1, 12);
  const min = getRandomInt(1, 11) * 5;
  const answer = min >= 60 ? `${hour + 1}:${(min - 60).toString().padStart(2, '0')}` : `${hour}:${min.toString().padStart(2, '0')}`;
  return createQuestion(topic, `What is ${20} minutes after ${hour}:${min.toString().padStart(2, '0')}?`, 
    [`${hour}:${(min + 20).toString().padStart(2, '0')}`, `${hour + 1}:${min.toString().padStart(2, '0')}`, `${hour}:${(min + 10).toString().padStart(2, '0')}`, `${hour}:${(min + 30).toString().padStart(2, '0')}`], 
    0, 'medium', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: MONEY =============
const generateMoneyQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'money';
  
  if (yearGroup <= 2) {
    const questions = [
      { q: 'How many pennies make 10p?', opts: ['10', '5', '100', '1'], correct: 0 },
      { q: 'What coins make 5p?', opts: ['5 × 1p', '1 × 10p', '2 × 5p', '5 × 10p'], correct: 0 },
      { q: 'How many 10p coins make £1?', opts: ['10', '5', '100', '20'], correct: 0 },
    ];
    const selected = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion(topic, selected.q, selected.opts, selected.correct, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const a = getRandomInt(1, 5);
    const b = getRandomInt(1, 5);
    return createQuestion(topic, `£${a}.50 + £${b}.50 = ?`, [`£${a + b + 1}.00`, `£${a + b}.00`, `£${a + b}.50`, `£${a + b + 2}.00`], 0, 'medium', yearGroup, 1);
  }
  
  const price = getRandomInt(2, 9);
  const paid = 10;
  return createQuestion(topic, `You buy something for £${price}. You pay with £10. What is your change?`, 
    [`£${paid - price}`, `£${paid - price + 1}`, `£${paid - price - 1}`, `£${price}`], 0, 'medium', yearGroup, 1);
};

// ============= PRIMARY SCHOOL: PLACE VALUE =============
const generatePlaceValueQuestion = (yearGroup: YearGroup): Question => {
  const topic = 'place-value';
  
  if (yearGroup <= 3) {
    const num = getRandomInt(10, 99);
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    const type = getRandomInt(0, 1);
    if (type === 0) {
      return createQuestion(topic, `What is the tens digit in ${num}?`, [`${tens}`, `${ones}`, `${num}`, `${tens + ones}`], 0, 'easy', yearGroup, 1);
    }
    return createQuestion(topic, `What is the ones digit in ${num}?`, [`${ones}`, `${tens}`, `${num}`, `${tens + ones}`], 0, 'easy', yearGroup, 1);
  }
  
  if (yearGroup <= 4) {
    const num = getRandomInt(100, 999);
    const hundreds = Math.floor(num / 100);
    return createQuestion(topic, `What is the hundreds digit in ${num}?`, [`${hundreds}`, `${Math.floor((num % 100) / 10)}`, `${num % 10}`, `${num}`], 0, 'medium', yearGroup, 1);
  }
  
  const num = getRandomInt(1000, 9999);
  const thousands = Math.floor(num / 1000);
  return createQuestion(topic, `What is the thousands digit in ${num}?`, [`${thousands}`, `${Math.floor((num % 1000) / 100)}`, `${num % 10}`, `${num}`], 0, 'medium', yearGroup, 1);
};

export const generateRandomQuestion = (topic: string, yearGroup: YearGroup): Question => {
  switch (topic) {
    // Primary school topics
    case 'counting': return generateCountingQuestion(yearGroup);
    case 'addition': return generateAdditionQuestion(yearGroup);
    case 'subtraction': return generateSubtractionQuestion(yearGroup);
    case 'multiplication': return generateMultiplicationQuestion(yearGroup);
    case 'division': return generateDivisionQuestion(yearGroup);
    case 'shapes': return generateShapesQuestion(yearGroup);
    case 'telling-time': return generateTellingTimeQuestion(yearGroup);
    case 'money': return generateMoneyQuestion(yearGroup);
    case 'place-value': return generatePlaceValueQuestion(yearGroup);
    // Secondary school topics
    case 'algebra': return generateAlgebraQuestion(yearGroup);
    case 'equations': return generateEquationsQuestion(yearGroup);
    case 'fractions': return generateFractionsQuestion(yearGroup);
    case 'geometry': return generateGeometryQuestion(yearGroup);
    case 'percentages': return generatePercentagesQuestion(yearGroup);
    case 'ratios': return generateRatiosQuestion(yearGroup);
    case 'probability': return generateProbabilityQuestion(yearGroup);
    case 'sequences': return generateSequencesQuestion(yearGroup);
    case 'powers': return generatePowersQuestion(yearGroup);
    case 'mental': return generateMentalQuestion(yearGroup);
    case 'trigonometry': return generateTrigonometryQuestion(yearGroup);
    case 'graphs': return generateGraphsQuestion(yearGroup);
    case 'wordproblems': return generateWordProblemsQuestion(yearGroup);
    case 'measurement': return generateMeasurementQuestion(yearGroup);
    default: return generateMentalQuestion(yearGroup);
  }
};

export const generateQuestionBatch = (topic: string, yearGroup: YearGroup, count: number): Question[] => {
  return Array.from({ length: count }, () => generateRandomQuestion(topic, yearGroup));
};
