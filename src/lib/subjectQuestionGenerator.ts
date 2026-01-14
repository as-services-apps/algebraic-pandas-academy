import { Question, YearGroup, Subject } from '@/types/game';

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

// ============= SCIENCE QUESTIONS =============
const scienceQuestions = {
  biology: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the powerhouse of the cell?', opts: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi body'], correct: 0 },
      { q: 'What gas do plants absorb during photosynthesis?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct: 0 },
      { q: 'What is the largest organ in the human body?', opts: ['Skin', 'Liver', 'Brain', 'Heart'], correct: 0 },
      { q: 'What type of blood cells fight infection?', opts: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], correct: 0 },
      { q: 'What is the process by which plants make food?', opts: ['Photosynthesis', 'Respiration', 'Digestion', 'Fermentation'], correct: 0 },
      { q: 'Which organelle contains genetic material?', opts: ['Nucleus', 'Cytoplasm', 'Cell membrane', 'Vacuole'], correct: 0 },
      { q: 'What is the basic unit of life?', opts: ['Cell', 'Atom', 'Molecule', 'Organ'], correct: 0 },
      { q: 'What carries oxygen in the blood?', opts: ['Haemoglobin', 'Plasma', 'Antibodies', 'Platelets'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('biology', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  chemistry: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the chemical symbol for water?', opts: ['H₂O', 'CO₂', 'NaCl', 'O₂'], correct: 0 },
      { q: 'What is the pH of a neutral solution?', opts: ['7', '0', '14', '1'], correct: 0 },
      { q: 'What is the atomic number of carbon?', opts: ['6', '12', '8', '14'], correct: 0 },
      { q: 'Which gas is produced when acids react with metals?', opts: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Nitrogen'], correct: 0 },
      { q: 'What type of bond forms between sodium and chlorine?', opts: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correct: 0 },
      { q: 'What is the chemical formula for table salt?', opts: ['NaCl', 'KCl', 'CaCl₂', 'MgCl₂'], correct: 0 },
      { q: 'How many electrons are in the outer shell of carbon?', opts: ['4', '2', '6', '8'], correct: 0 },
      { q: 'What is an exothermic reaction?', opts: ['Releases heat', 'Absorbs heat', 'No heat change', 'Produces light only'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('chemistry', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  physics: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the unit of force?', opts: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 0 },
      { q: 'What is the speed of light approximately?', opts: ['300,000 km/s', '300 km/s', '30,000 km/s', '3,000 km/s'], correct: 0 },
      { q: 'What type of energy does a moving object have?', opts: ['Kinetic', 'Potential', 'Thermal', 'Chemical'], correct: 0 },
      { q: 'What is the formula for speed?', opts: ['Distance ÷ Time', 'Time × Distance', 'Force × Mass', 'Mass ÷ Volume'], correct: 0 },
      { q: 'What is measured in Hertz?', opts: ['Frequency', 'Wavelength', 'Amplitude', 'Speed'], correct: 0 },
      { q: 'What type of circuit has only one path for current?', opts: ['Series', 'Parallel', 'Complex', 'Simple'], correct: 0 },
      { q: 'What is the unit of electrical resistance?', opts: ['Ohm', 'Volt', 'Ampere', 'Watt'], correct: 0 },
      { q: 'What force pulls objects towards Earth?', opts: ['Gravity', 'Friction', 'Magnetism', 'Tension'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('physics', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
};

// ============= ENGLISH QUESTIONS =============
const englishQuestions = {
  grammar: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'Which word is a noun?', opts: ['Happiness', 'Quickly', 'Beautiful', 'Run'], correct: 0 },
      { q: 'What is the past tense of "go"?', opts: ['Went', 'Goed', 'Gone', 'Going'], correct: 0 },
      { q: 'Which is a conjunction?', opts: ['And', 'Quickly', 'Beautiful', 'Tree'], correct: 0 },
      { q: 'What is the plural of "child"?', opts: ['Children', 'Childs', 'Childes', 'Childern'], correct: 0 },
      { q: 'Which sentence uses correct grammar?', opts: ['She and I went to the park.', 'Me and her went to the park.', 'Her and me went to the park.', 'Me and she went to the park.'], correct: 0 },
      { q: 'What type of word describes a verb?', opts: ['Adverb', 'Adjective', 'Noun', 'Pronoun'], correct: 0 },
      { q: 'Which is the correct spelling?', opts: ['Necessary', 'Neccessary', 'Necesary', 'Neccesary'], correct: 0 },
      { q: 'What is a synonym for "happy"?', opts: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('grammar', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  vocabulary: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What does "benevolent" mean?', opts: ['Kind and generous', 'Evil', 'Confused', 'Tired'], correct: 0 },
      { q: 'What is an antonym of "ancient"?', opts: ['Modern', 'Old', 'Historic', 'Aged'], correct: 0 },
      { q: 'What does "ambiguous" mean?', opts: ['Unclear', 'Certain', 'Bright', 'Loud'], correct: 0 },
      { q: 'What is a synonym for "enormous"?', opts: ['Huge', 'Tiny', 'Average', 'Normal'], correct: 0 },
      { q: 'What does "meticulous" mean?', opts: ['Very careful', 'Careless', 'Fast', 'Lazy'], correct: 0 },
      { q: 'What is the meaning of "reluctant"?', opts: ['Unwilling', 'Eager', 'Happy', 'Confused'], correct: 0 },
      { q: 'What does "eloquent" mean?', opts: ['Well-spoken', 'Silent', 'Rude', 'Confused'], correct: 0 },
      { q: 'What is an antonym of "generous"?', opts: ['Selfish', 'Kind', 'Giving', 'Helpful'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('vocabulary', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  literature: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'Who wrote "Romeo and Juliet"?', opts: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'], correct: 0 },
      { q: 'What is a metaphor?', opts: ['A comparison without using like or as', 'A comparison using like or as', 'An exaggeration', 'A sound word'], correct: 0 },
      { q: 'What literary device is "The wind whispered"?', opts: ['Personification', 'Simile', 'Alliteration', 'Hyperbole'], correct: 0 },
      { q: 'What is the main character in a story called?', opts: ['Protagonist', 'Antagonist', 'Narrator', 'Author'], correct: 0 },
      { q: 'What is alliteration?', opts: ['Repetition of initial sounds', 'Exaggeration', 'Comparison', 'Contradiction'], correct: 0 },
      { q: 'What is the climax of a story?', opts: ['The turning point', 'The beginning', 'The end', 'The setting'], correct: 0 },
      { q: 'Who wrote "Oliver Twist"?', opts: ['Charles Dickens', 'Shakespeare', 'Jane Austen', 'J.K. Rowling'], correct: 0 },
      { q: 'What is a simile?', opts: ['Comparison using like or as', 'Direct comparison', 'Exaggeration', 'Sound words'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('literature', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
};

// ============= HISTORY QUESTIONS =============
const historyQuestions = {
  ancient: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'Who built the Great Pyramid of Giza?', opts: ['Ancient Egyptians', 'Romans', 'Greeks', 'Persians'], correct: 0 },
      { q: 'What civilization invented democracy?', opts: ['Ancient Greeks', 'Romans', 'Egyptians', 'Persians'], correct: 0 },
      { q: 'Who was the first Roman Emperor?', opts: ['Augustus', 'Julius Caesar', 'Nero', 'Caligula'], correct: 0 },
      { q: 'What was the Roman Colosseum used for?', opts: ['Gladiator fights', 'Senate meetings', 'Religious ceremonies', 'Markets'], correct: 0 },
      { q: 'What river was Ancient Egypt built around?', opts: ['The Nile', 'The Amazon', 'The Thames', 'The Tigris'], correct: 0 },
      { q: 'Who was Cleopatra?', opts: ['Egyptian Queen', 'Roman Emperor', 'Greek Goddess', 'Persian King'], correct: 0 },
      { q: 'What were Egyptian mummies wrapped in?', opts: ['Linen bandages', 'Silk', 'Cotton', 'Wool'], correct: 0 },
      { q: 'What language did Ancient Romans speak?', opts: ['Latin', 'Greek', 'Italian', 'English'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('ancient', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  medieval: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What year did the Battle of Hastings occur?', opts: ['1066', '1166', '1266', '966'], correct: 0 },
      { q: 'Who was the first Norman King of England?', opts: ['William the Conqueror', 'Henry VIII', 'Richard I', 'Edward I'], correct: 0 },
      { q: 'What was the Black Death?', opts: ['A plague pandemic', 'A war', 'A famine', 'An earthquake'], correct: 0 },
      { q: 'What was the Magna Carta?', opts: ['A charter of rights', 'A peace treaty', 'A map', 'A religious text'], correct: 0 },
      { q: 'Who fought in the Crusades?', opts: ['Christians and Muslims', 'Romans and Greeks', 'French and English', 'Vikings and Saxons'], correct: 0 },
      { q: 'What was a medieval knight\'s code of conduct called?', opts: ['Chivalry', 'Honor', 'Loyalty', 'Bravery'], correct: 0 },
      { q: 'What was a feudal lord\'s land called?', opts: ['Manor', 'Castle', 'Kingdom', 'Village'], correct: 0 },
      { q: 'What weapon was typically used by English archers?', opts: ['Longbow', 'Crossbow', 'Sword', 'Spear'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('medieval', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  modern: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What year did World War I begin?', opts: ['1914', '1918', '1939', '1945'], correct: 0 },
      { q: 'What year did World War II end?', opts: ['1945', '1939', '1918', '1950'], correct: 0 },
      { q: 'Who was the British Prime Minister during WWII?', opts: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee', 'Harold Wilson'], correct: 0 },
      { q: 'What was the Cold War?', opts: ['A political rivalry', 'A frozen conflict', 'A winter battle', 'An ice age war'], correct: 0 },
      { q: 'When did the Berlin Wall fall?', opts: ['1989', '1979', '1991', '1969'], correct: 0 },
      { q: 'Who was the first man on the moon?', opts: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn'], correct: 0 },
      { q: 'What was the Industrial Revolution?', opts: ['A shift to machine manufacturing', 'A political change', 'A war', 'A religious movement'], correct: 0 },
      { q: 'What year did Queen Victoria die?', opts: ['1901', '1837', '1900', '1910'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('modern', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
};

// ============= GEOGRAPHY QUESTIONS =============
const geographyQuestions = {
  physical: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the largest ocean on Earth?', opts: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], correct: 0 },
      { q: 'What is the longest river in the world?', opts: ['River Nile', 'Amazon', 'Mississippi', 'Yangtze'], correct: 0 },
      { q: 'What is the highest mountain in the world?', opts: ['Mount Everest', 'K2', 'Kilimanjaro', 'Mont Blanc'], correct: 0 },
      { q: 'What causes earthquakes?', opts: ['Tectonic plate movement', 'Volcanic activity', 'Wind', 'Ocean currents'], correct: 0 },
      { q: 'What type of rock is formed from cooled lava?', opts: ['Igneous', 'Sedimentary', 'Metamorphic', 'Calcium'], correct: 0 },
      { q: 'What is the largest desert in the world?', opts: ['Antarctic Desert', 'Sahara', 'Gobi', 'Arabian'], correct: 0 },
      { q: 'What is erosion?', opts: ['Wearing away of rock', 'Building up of rock', 'Melting of ice', 'Volcanic activity'], correct: 0 },
      { q: 'What is the water cycle?', opts: ['Movement of water on Earth', 'Ocean currents', 'River flow', 'Rain only'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('physical', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  human: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the most populated country?', opts: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
      { q: 'What is the capital of France?', opts: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 0 },
      { q: 'What is urbanisation?', opts: ['Movement to cities', 'Movement to countryside', 'Building roads', 'Farming'], correct: 0 },
      { q: 'What continent has the most countries?', opts: ['Africa', 'Asia', 'Europe', 'South America'], correct: 0 },
      { q: 'What is the capital of Japan?', opts: ['Tokyo', 'Kyoto', 'Osaka', 'Beijing'], correct: 0 },
      { q: 'What is the smallest country in the world?', opts: ['Vatican City', 'Monaco', 'San Marino', 'Luxembourg'], correct: 0 },
      { q: 'What is the capital of Australia?', opts: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], correct: 0 },
      { q: 'What is migration?', opts: ['Movement of people', 'Movement of animals', 'Building cities', 'Trading goods'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('human', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
  climate: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What gas is causing global warming?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correct: 0 },
      { q: 'What is the greenhouse effect?', opts: ['Trapping of heat by gases', 'Plant growth', 'Cooling effect', 'Rain formation'], correct: 0 },
      { q: 'What climate zone is the UK in?', opts: ['Temperate', 'Tropical', 'Arctic', 'Desert'], correct: 0 },
      { q: 'What is deforestation?', opts: ['Cutting down forests', 'Planting trees', 'Forest fires', 'Tree growth'], correct: 0 },
      { q: 'What is a renewable energy source?', opts: ['Solar power', 'Coal', 'Oil', 'Natural gas'], correct: 0 },
      { q: 'What causes seasons on Earth?', opts: ['Earth\'s tilt', 'Distance from sun', 'Moon phases', 'Ocean currents'], correct: 0 },
      { q: 'What is a tropical rainforest?', opts: ['Hot, wet forest near equator', 'Cold forest', 'Desert', 'Grassland'], correct: 0 },
      { q: 'What is climate change?', opts: ['Long-term weather pattern change', 'Daily weather', 'Storms', 'Seasons'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('climate', q.q, q.opts, q.correct, 'medium', yearGroup, 15);
  },
};

// ============= GENERAL KNOWLEDGE QUESTIONS =============
const generalQuestions = {
  trivia: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'How many continents are there?', opts: ['7', '5', '6', '8'], correct: 0 },
      { q: 'What is the largest planet in our solar system?', opts: ['Jupiter', 'Saturn', 'Earth', 'Mars'], correct: 0 },
      { q: 'How many days are in a leap year?', opts: ['366', '365', '364', '367'], correct: 0 },
      { q: 'What is the capital of England?', opts: ['London', 'Manchester', 'Birmingham', 'Liverpool'], correct: 0 },
      { q: 'How many colours are in a rainbow?', opts: ['7', '6', '8', '5'], correct: 0 },
      { q: 'What is the fastest land animal?', opts: ['Cheetah', 'Lion', 'Horse', 'Leopard'], correct: 0 },
      { q: 'How many sides does a hexagon have?', opts: ['6', '5', '7', '8'], correct: 0 },
      { q: 'What year did the Titanic sink?', opts: ['1912', '1920', '1905', '1918'], correct: 0 },
      { q: 'What is the largest mammal?', opts: ['Blue whale', 'Elephant', 'Giraffe', 'Hippo'], correct: 0 },
      { q: 'What is the hardest natural substance?', opts: ['Diamond', 'Gold', 'Iron', 'Platinum'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('trivia', q.q, q.opts, q.correct, 'easy', yearGroup, 10);
  },
  sports: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'How many players are on a football team?', opts: ['11', '10', '12', '9'], correct: 0 },
      { q: 'What sport uses a shuttlecock?', opts: ['Badminton', 'Tennis', 'Squash', 'Table tennis'], correct: 0 },
      { q: 'How many points is a try worth in rugby?', opts: ['5', '3', '6', '7'], correct: 0 },
      { q: 'What is the national sport of Japan?', opts: ['Sumo wrestling', 'Baseball', 'Football', 'Cricket'], correct: 0 },
      { q: 'How long is an Olympic swimming pool?', opts: ['50 metres', '25 metres', '100 metres', '75 metres'], correct: 0 },
      { q: 'What sport is played at Wimbledon?', opts: ['Tennis', 'Cricket', 'Football', 'Golf'], correct: 0 },
      { q: 'How many holes are on a golf course?', opts: ['18', '9', '12', '21'], correct: 0 },
      { q: 'What country invented cricket?', opts: ['England', 'India', 'Australia', 'Pakistan'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('sports', q.q, q.opts, q.correct, 'easy', yearGroup, 10);
  },
  nature: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the tallest animal?', opts: ['Giraffe', 'Elephant', 'Ostrich', 'Camel'], correct: 0 },
      { q: 'How many legs does a spider have?', opts: ['8', '6', '10', '4'], correct: 0 },
      { q: 'What do bees make?', opts: ['Honey', 'Milk', 'Silk', 'Wax only'], correct: 0 },
      { q: 'What is a baby frog called?', opts: ['Tadpole', 'Froglet', 'Spawn', 'Larvae'], correct: 0 },
      { q: 'What type of animal is a dolphin?', opts: ['Mammal', 'Fish', 'Reptile', 'Amphibian'], correct: 0 },
      { q: 'How many wings does a butterfly have?', opts: ['4', '2', '6', '8'], correct: 0 },
      { q: 'What is the largest species of bear?', opts: ['Polar bear', 'Grizzly bear', 'Black bear', 'Panda'], correct: 0 },
      { q: 'What bird cannot fly?', opts: ['Penguin', 'Eagle', 'Sparrow', 'Robin'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('nature', q.q, q.opts, q.correct, 'easy', yearGroup, 10);
  },
};

// Main generator function
export const generateSubjectQuestion = (subject: Subject, topic: string, yearGroup: YearGroup): Question => {
  switch (subject) {
    case 'science':
      if (topic === 'biology' || topic === 'cells' || topic === 'body') return scienceQuestions.biology(yearGroup);
      if (topic === 'chemistry' || topic === 'atoms' || topic === 'reactions') return scienceQuestions.chemistry(yearGroup);
      if (topic === 'physics' || topic === 'forces' || topic === 'energy') return scienceQuestions.physics(yearGroup);
      // Default to random science topic
      const sciTopics = [scienceQuestions.biology, scienceQuestions.chemistry, scienceQuestions.physics];
      return sciTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'english':
      if (topic === 'grammar' || topic === 'spelling') return englishQuestions.grammar(yearGroup);
      if (topic === 'vocabulary' || topic === 'words') return englishQuestions.vocabulary(yearGroup);
      if (topic === 'literature' || topic === 'reading') return englishQuestions.literature(yearGroup);
      const engTopics = [englishQuestions.grammar, englishQuestions.vocabulary, englishQuestions.literature];
      return engTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'history':
      if (topic === 'ancient' || topic === 'romans' || topic === 'egyptians') return historyQuestions.ancient(yearGroup);
      if (topic === 'medieval' || topic === 'tudors' || topic === 'normans') return historyQuestions.medieval(yearGroup);
      if (topic === 'modern' || topic === 'worldwars' || topic === 'victorians') return historyQuestions.modern(yearGroup);
      const histTopics = [historyQuestions.ancient, historyQuestions.medieval, historyQuestions.modern];
      return histTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'geography':
      if (topic === 'physical' || topic === 'rivers' || topic === 'mountains') return geographyQuestions.physical(yearGroup);
      if (topic === 'human' || topic === 'cities' || topic === 'population') return geographyQuestions.human(yearGroup);
      if (topic === 'climate' || topic === 'weather' || topic === 'environment') return geographyQuestions.climate(yearGroup);
      const geoTopics = [geographyQuestions.physical, geographyQuestions.human, geographyQuestions.climate];
      return geoTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'general':
      if (topic === 'trivia' || topic === 'general') return generalQuestions.trivia(yearGroup);
      if (topic === 'sports') return generalQuestions.sports(yearGroup);
      if (topic === 'nature' || topic === 'animals') return generalQuestions.nature(yearGroup);
      const genTopics = [generalQuestions.trivia, generalQuestions.sports, generalQuestions.nature];
      return genTopics[getRandomInt(0, 2)](yearGroup);
      
    default:
      return generalQuestions.trivia(yearGroup);
  }
};

// Get topics for a subject
export const getSubjectTopics = (subject: Subject): { id: string; name: string; icon: string; description: string }[] => {
  switch (subject) {
    case 'maths':
      return [
        { id: 'algebra', name: 'Algebraic Expressions', icon: '🔢', description: 'Simplify expressions and solve equations!' },
        { id: 'equations', name: 'Solving Equations', icon: '⚖️', description: 'Balance equations and find unknowns!' },
        { id: 'fractions', name: 'Fractions & Decimals', icon: '🥧', description: 'Master fractions and decimals!' },
        { id: 'geometry', name: 'Geometry & Shapes', icon: '📐', description: 'Explore angles and shapes!' },
        { id: 'percentages', name: 'Percentages', icon: '💯', description: 'Calculate percentages!' },
        { id: 'mental', name: 'Mental Maths', icon: '🧠', description: 'Quick mental calculations!' },
      ];
    case 'science':
      return [
        { id: 'biology', name: 'Biology', icon: '🧬', description: 'Learn about living things and the human body!' },
        { id: 'chemistry', name: 'Chemistry', icon: '⚗️', description: 'Explore atoms, elements and reactions!' },
        { id: 'physics', name: 'Physics', icon: '⚡', description: 'Discover forces, energy and motion!' },
      ];
    case 'english':
      return [
        { id: 'grammar', name: 'Grammar & Spelling', icon: '📝', description: 'Master grammar rules and spelling!' },
        { id: 'vocabulary', name: 'Vocabulary', icon: '📖', description: 'Expand your word knowledge!' },
        { id: 'literature', name: 'Literature', icon: '📚', description: 'Explore famous authors and literary devices!' },
      ];
    case 'history':
      return [
        { id: 'ancient', name: 'Ancient History', icon: '🏛️', description: 'Explore Romans, Greeks and Egyptians!' },
        { id: 'medieval', name: 'Medieval History', icon: '⚔️', description: 'Discover knights, castles and kings!' },
        { id: 'modern', name: 'Modern History', icon: '🌍', description: 'Learn about world wars and recent events!' },
      ];
    case 'geography':
      return [
        { id: 'physical', name: 'Physical Geography', icon: '🏔️', description: 'Mountains, rivers and natural features!' },
        { id: 'human', name: 'Human Geography', icon: '🏙️', description: 'Cities, population and cultures!' },
        { id: 'climate', name: 'Climate & Environment', icon: '🌡️', description: 'Weather, climate change and ecosystems!' },
      ];
    case 'general':
      return [
        { id: 'trivia', name: 'General Trivia', icon: '❓', description: 'Random fun facts and knowledge!' },
        { id: 'sports', name: 'Sports', icon: '⚽', description: 'Test your sports knowledge!' },
        { id: 'nature', name: 'Nature & Animals', icon: '🦁', description: 'Learn about wildlife and nature!' },
      ];
    default:
      return [];
  }
};
