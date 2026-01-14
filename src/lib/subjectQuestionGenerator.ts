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
    // Year 1-3: Very simple
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What do plants need to grow?', opts: ['Water and sunlight', 'Just water', 'Just soil', 'Nothing'], correct: 0 },
        { q: 'What body part do we use to smell?', opts: ['Nose', 'Ears', 'Eyes', 'Mouth'], correct: 0 },
        { q: 'What do we breathe in?', opts: ['Air', 'Water', 'Food', 'Light'], correct: 0 },
        { q: 'How many legs does a dog have?', opts: ['4', '2', '6', '8'], correct: 0 },
        { q: 'What do caterpillars turn into?', opts: ['Butterflies', 'Bees', 'Birds', 'Spiders'], correct: 0 },
        { q: 'What part of the plant is underground?', opts: ['Roots', 'Leaves', 'Flower', 'Stem'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('biology', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    // Year 4-6: Intermediate
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is the largest organ in the human body?', opts: ['Skin', 'Heart', 'Brain', 'Lungs'], correct: 0 },
        { q: 'What do plants release during photosynthesis?', opts: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Water'], correct: 0 },
        { q: 'How many bones does an adult human have?', opts: ['206', '100', '150', '300'], correct: 0 },
        { q: 'What type of animal is a frog?', opts: ['Amphibian', 'Reptile', 'Fish', 'Mammal'], correct: 0 },
        { q: 'What part of the body pumps blood?', opts: ['Heart', 'Lungs', 'Brain', 'Stomach'], correct: 0 },
        { q: 'What gas do we breathe out?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('biology', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    // Year 7+: Advanced
    const questions = [
      { q: 'What is the powerhouse of the cell?', opts: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi body'], correct: 0 },
      { q: 'What gas do plants absorb during photosynthesis?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct: 0 },
      { q: 'What type of blood cells fight infection?', opts: ['White blood cells', 'Red blood cells', 'Platelets', 'Plasma'], correct: 0 },
      { q: 'What is the process by which plants make food?', opts: ['Photosynthesis', 'Respiration', 'Digestion', 'Fermentation'], correct: 0 },
      { q: 'Which organelle contains genetic material?', opts: ['Nucleus', 'Cytoplasm', 'Cell membrane', 'Vacuole'], correct: 0 },
      { q: 'What is the basic unit of life?', opts: ['Cell', 'Atom', 'Molecule', 'Organ'], correct: 0 },
      { q: 'What carries oxygen in the blood?', opts: ['Haemoglobin', 'Plasma', 'Antibodies', 'Platelets'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('biology', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  chemistry: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is water made of?', opts: ['Hydrogen and oxygen', 'Salt', 'Sugar', 'Air'], correct: 0 },
        { q: 'What happens when ice melts?', opts: ['It becomes water', 'It disappears', 'It becomes gas', 'It gets bigger'], correct: 0 },
        { q: 'What state of matter is steam?', opts: ['Gas', 'Liquid', 'Solid', 'Powder'], correct: 0 },
        { q: 'What happens when you mix red and blue?', opts: ['Purple', 'Green', 'Orange', 'Yellow'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('chemistry', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What are the three states of matter?', opts: ['Solid, liquid, gas', 'Hot, cold, warm', 'Big, medium, small', 'Hard, soft, squishy'], correct: 0 },
        { q: 'What happens when water boils?', opts: ['It turns to steam', 'It freezes', 'It disappears', 'Nothing'], correct: 0 },
        { q: 'What is CO2?', opts: ['Carbon dioxide', 'Oxygen', 'Water', 'Nitrogen'], correct: 0 },
        { q: 'What is a mixture?', opts: ['Two or more substances combined', 'A pure element', 'A single chemical', 'Nothing'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('chemistry', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the chemical symbol for water?', opts: ['H₂O', 'CO₂', 'NaCl', 'O₂'], correct: 0 },
      { q: 'What is the pH of a neutral solution?', opts: ['7', '0', '14', '1'], correct: 0 },
      { q: 'What is the atomic number of carbon?', opts: ['6', '12', '8', '14'], correct: 0 },
      { q: 'Which gas is produced when acids react with metals?', opts: ['Hydrogen', 'Oxygen', 'Carbon dioxide', 'Nitrogen'], correct: 0 },
      { q: 'What type of bond forms between sodium and chlorine?', opts: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'], correct: 0 },
      { q: 'What is the chemical formula for table salt?', opts: ['NaCl', 'KCl', 'CaCl₂', 'MgCl₂'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('chemistry', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  physics: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What makes things fall down?', opts: ['Gravity', 'Wind', 'Magic', 'Sound'], correct: 0 },
        { q: 'What gives us light during the day?', opts: ['The Sun', 'The Moon', 'Stars', 'Lamps'], correct: 0 },
        { q: 'What do magnets do?', opts: ['Attract metal', 'Make water', 'Create fire', 'Make sound'], correct: 0 },
        { q: 'What do we need to make a shadow?', opts: ['Light', 'Water', 'Air', 'Nothing'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('physics', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What type of energy does a battery store?', opts: ['Electrical', 'Light', 'Sound', 'Heat'], correct: 0 },
        { q: 'What is friction?', opts: ['Force that slows things down', 'Force that speeds things up', 'A type of light', 'A type of sound'], correct: 0 },
        { q: 'What travels faster: light or sound?', opts: ['Light', 'Sound', 'They are equal', 'Neither travels'], correct: 0 },
        { q: 'What do we measure temperature with?', opts: ['Thermometer', 'Ruler', 'Clock', 'Scale'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('physics', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the unit of force?', opts: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 0 },
      { q: 'What is the speed of light approximately?', opts: ['300,000 km/s', '300 km/s', '30,000 km/s', '3,000 km/s'], correct: 0 },
      { q: 'What type of energy does a moving object have?', opts: ['Kinetic', 'Potential', 'Thermal', 'Chemical'], correct: 0 },
      { q: 'What is the formula for speed?', opts: ['Distance ÷ Time', 'Time × Distance', 'Force × Mass', 'Mass ÷ Volume'], correct: 0 },
      { q: 'What is the unit of electrical resistance?', opts: ['Ohm', 'Volt', 'Ampere', 'Watt'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('physics', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  space: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is the biggest thing in our solar system?', opts: ['The Sun', 'Earth', 'The Moon', 'Mars'], correct: 0 },
        { q: 'What planet do we live on?', opts: ['Earth', 'Mars', 'Moon', 'Sun'], correct: 0 },
        { q: 'What do we see in the sky at night?', opts: ['Stars and Moon', 'Just clouds', 'The Sun', 'Nothing'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('space', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'How many planets are in our solar system?', opts: ['8', '9', '7', '10'], correct: 0 },
        { q: 'What is the red planet called?', opts: ['Mars', 'Venus', 'Jupiter', 'Mercury'], correct: 0 },
        { q: 'What causes day and night?', opts: ['Earth spinning', 'Sun moving', 'Moon moving', 'Clouds'], correct: 0 },
        { q: 'Which is the largest planet?', opts: ['Jupiter', 'Saturn', 'Earth', 'Neptune'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('space', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is a light year?', opts: ['Distance light travels in a year', 'A very bright year', '365 days', 'Speed of light'], correct: 0 },
      { q: 'What is the closest star to Earth?', opts: ['The Sun', 'Proxima Centauri', 'Sirius', 'Alpha Centauri'], correct: 0 },
      { q: 'What is a black hole?', opts: ['Region with extreme gravity', 'A dark planet', 'An empty space', 'A type of star'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('space', q.q, q.opts, q.correct, 'hard', yearGroup, 1);
  },
};

// ============= ENGLISH QUESTIONS =============
const englishQuestions = {
  grammar: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'Which is a naming word (noun)?', opts: ['Cat', 'Run', 'Big', 'Quickly'], correct: 0 },
        { q: 'What letter does "apple" start with?', opts: ['a', 'b', 'c', 'p'], correct: 0 },
        { q: 'Which word rhymes with "cat"?', opts: ['Hat', 'Dog', 'Sun', 'Tree'], correct: 0 },
        { q: 'How many letters are in "dog"?', opts: ['3', '4', '2', '5'], correct: 0 },
        { q: 'Which is a doing word (verb)?', opts: ['Jump', 'Happy', 'Blue', 'Table'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('grammar', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'Which word is an adjective?', opts: ['Beautiful', 'Quickly', 'Run', 'Table'], correct: 0 },
        { q: 'What is the plural of "mouse"?', opts: ['Mice', 'Mouses', 'Mices', 'Mouse'], correct: 0 },
        { q: 'Which is a conjunction?', opts: ['And', 'Big', 'Run', 'Happy'], correct: 0 },
        { q: 'What is the past tense of "run"?', opts: ['Ran', 'Runned', 'Running', 'Runs'], correct: 0 },
        { q: 'Which word is spelled correctly?', opts: ['Because', 'Becuse', 'Becouse', 'Becos'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('grammar', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'Which word is a noun?', opts: ['Happiness', 'Quickly', 'Beautiful', 'Run'], correct: 0 },
      { q: 'What is the past tense of "go"?', opts: ['Went', 'Goed', 'Gone', 'Going'], correct: 0 },
      { q: 'Which sentence uses correct grammar?', opts: ['She and I went to the park.', 'Me and her went to the park.', 'Her and me went to the park.', 'Me and she went to the park.'], correct: 0 },
      { q: 'What type of word describes a verb?', opts: ['Adverb', 'Adjective', 'Noun', 'Pronoun'], correct: 0 },
      { q: 'Which is the correct spelling?', opts: ['Necessary', 'Neccessary', 'Necesary', 'Neccesary'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('grammar', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  vocabulary: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is the opposite of "hot"?', opts: ['Cold', 'Warm', 'Big', 'Fast'], correct: 0 },
        { q: 'What is another word for "big"?', opts: ['Large', 'Small', 'Tiny', 'Short'], correct: 0 },
        { q: 'What is the opposite of "happy"?', opts: ['Sad', 'Angry', 'Tired', 'Hungry'], correct: 0 },
        { q: 'Which word means "very small"?', opts: ['Tiny', 'Huge', 'Giant', 'Tall'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('vocabulary', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What does "ancient" mean?', opts: ['Very old', 'Very new', 'Very big', 'Very small'], correct: 0 },
        { q: 'What is a synonym for "brave"?', opts: ['Courageous', 'Scared', 'Weak', 'Lazy'], correct: 0 },
        { q: 'What is the opposite of "expensive"?', opts: ['Cheap', 'Costly', 'Rich', 'Valuable'], correct: 0 },
        { q: 'What does "enormous" mean?', opts: ['Very large', 'Very small', 'Very fast', 'Very slow'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('vocabulary', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What does "benevolent" mean?', opts: ['Kind and generous', 'Evil', 'Confused', 'Tired'], correct: 0 },
      { q: 'What is an antonym of "ancient"?', opts: ['Modern', 'Old', 'Historic', 'Aged'], correct: 0 },
      { q: 'What does "ambiguous" mean?', opts: ['Unclear', 'Certain', 'Bright', 'Loud'], correct: 0 },
      { q: 'What does "meticulous" mean?', opts: ['Very careful', 'Careless', 'Fast', 'Lazy'], correct: 0 },
      { q: 'What does "eloquent" mean?', opts: ['Well-spoken', 'Silent', 'Rude', 'Confused'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('vocabulary', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  literature: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is a story with a lesson called?', opts: ['Fable', 'Dictionary', 'Recipe', 'Map'], correct: 0 },
        { q: 'Who writes books?', opts: ['Author', 'Doctor', 'Teacher', 'Farmer'], correct: 0 },
        { q: 'What do you find in a library?', opts: ['Books', 'Food', 'Toys', 'Cars'], correct: 0 },
        { q: 'What is the name of the person telling a story?', opts: ['Narrator', 'Listener', 'Reader', 'Writer'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('literature', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is a fairy tale?', opts: ['A magical story', 'A true story', 'A news report', 'A recipe'], correct: 0 },
        { q: 'Who wrote "Charlie and the Chocolate Factory"?', opts: ['Roald Dahl', 'J.K. Rowling', 'Enid Blyton', 'Dr. Seuss'], correct: 0 },
        { q: 'What is the setting of a story?', opts: ['Where it takes place', 'Who is in it', 'What happens', 'How it ends'], correct: 0 },
        { q: 'What is a poem that rhymes called?', opts: ['Rhyming poem', 'Silent poem', 'Picture poem', 'Music poem'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('literature', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'Who wrote "Romeo and Juliet"?', opts: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'], correct: 0 },
      { q: 'What is a metaphor?', opts: ['A comparison without using like or as', 'A comparison using like or as', 'An exaggeration', 'A sound word'], correct: 0 },
      { q: 'What literary device is "The wind whispered"?', opts: ['Personification', 'Simile', 'Alliteration', 'Hyperbole'], correct: 0 },
      { q: 'What is the main character in a story called?', opts: ['Protagonist', 'Antagonist', 'Narrator', 'Author'], correct: 0 },
      { q: 'What is alliteration?', opts: ['Repetition of initial sounds', 'Exaggeration', 'Comparison', 'Contradiction'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('literature', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  reading: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What comes at the end of a sentence?', opts: ['Full stop', 'Comma', 'Letter', 'Number'], correct: 0 },
        { q: 'What is the title of a book?', opts: ['Its name', 'Its color', 'Its size', 'Its weight'], correct: 0 },
        { q: 'Where do you start reading on a page?', opts: ['Top left', 'Bottom right', 'Middle', 'Anywhere'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('reading', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is a chapter?', opts: ['A section of a book', 'A type of book', 'The cover', 'The index'], correct: 0 },
        { q: 'What is the beginning of a story called?', opts: ['Introduction', 'Climax', 'Ending', 'Index'], correct: 0 },
        { q: 'What are characters in a story?', opts: ['People or animals in the story', 'Pictures', 'Page numbers', 'Chapters'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('reading', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is inference in reading?', opts: ['Drawing conclusions from clues', 'Reading aloud', 'Skipping pages', 'Reading fast'], correct: 0 },
      { q: 'What is the theme of a story?', opts: ['The main message', 'The setting', 'The characters', 'The title'], correct: 0 },
      { q: 'What is foreshadowing?', opts: ['Hints about future events', 'Looking back', 'The ending', 'The beginning'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('reading', q.q, q.opts, q.correct, 'hard', yearGroup, 1);
  },
};

// ============= HISTORY QUESTIONS =============
const historyQuestions = {
  ancient: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What did Ancient Egyptians build?', opts: ['Pyramids', 'Skyscrapers', 'Bridges', 'Cars'], correct: 0 },
        { q: 'What were dinosaurs?', opts: ['Ancient reptiles', 'Fish', 'Birds', 'Insects'], correct: 0 },
        { q: 'Who were gladiators?', opts: ['Roman fighters', 'Teachers', 'Farmers', 'Doctors'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('ancient', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What river was Ancient Egypt built around?', opts: ['The Nile', 'The Amazon', 'The Thames', 'The Ganges'], correct: 0 },
        { q: 'What were Egyptian kings called?', opts: ['Pharaohs', 'Emperors', 'Kings', 'Chiefs'], correct: 0 },
        { q: 'What did Romans use to fight?', opts: ['Swords and shields', 'Guns', 'Tanks', 'Planes'], correct: 0 },
        { q: 'What is a mummy?', opts: ['A preserved body', 'A type of food', 'A building', 'A weapon'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('ancient', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'Who built the Great Pyramid of Giza?', opts: ['Ancient Egyptians', 'Romans', 'Greeks', 'Persians'], correct: 0 },
      { q: 'What civilization invented democracy?', opts: ['Ancient Greeks', 'Romans', 'Egyptians', 'Persians'], correct: 0 },
      { q: 'Who was the first Roman Emperor?', opts: ['Augustus', 'Julius Caesar', 'Nero', 'Caligula'], correct: 0 },
      { q: 'What language did Ancient Romans speak?', opts: ['Latin', 'Greek', 'Italian', 'English'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('ancient', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  medieval: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'Where did kings and queens live?', opts: ['Castles', 'Tents', 'Caves', 'Boats'], correct: 0 },
        { q: 'What did knights wear?', opts: ['Armour', 'Jeans', 'Swimsuits', 'Pyjamas'], correct: 0 },
        { q: 'What animal did knights ride?', opts: ['Horses', 'Elephants', 'Cars', 'Bikes'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('medieval', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is a moat?', opts: ['Water around a castle', 'A type of boat', 'A weapon', 'A flag'], correct: 0 },
        { q: 'Who ruled in castles?', opts: ['Lords and Ladies', 'Teachers', 'Farmers', 'Doctors'], correct: 0 },
        { q: 'What was a jousting tournament?', opts: ['A knight competition', 'A cooking show', 'A race', 'A dance'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('medieval', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What year did the Battle of Hastings occur?', opts: ['1066', '1166', '1266', '966'], correct: 0 },
      { q: 'Who was the first Norman King of England?', opts: ['William the Conqueror', 'Henry VIII', 'Richard I', 'Edward I'], correct: 0 },
      { q: 'What was the Black Death?', opts: ['A plague pandemic', 'A war', 'A famine', 'An earthquake'], correct: 0 },
      { q: 'What was the Magna Carta?', opts: ['A charter of rights', 'A peace treaty', 'A map', 'A religious text'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('medieval', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  modern: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What do we celebrate on Remembrance Day?', opts: ['Soldiers who fought in wars', 'Birthdays', 'Christmas', 'Easter'], correct: 0 },
        { q: 'What is a museum?', opts: ['A place with old things', 'A playground', 'A shop', 'A school'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('modern', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'Who was Queen Victoria?', opts: ['A British Queen', 'A Roman Emperor', 'A Greek Goddess', 'An Egyptian Pharaoh'], correct: 0 },
        { q: 'What was the Blitz?', opts: ['Bombing of British cities', 'A type of food', 'A game', 'A celebration'], correct: 0 },
        { q: 'When was the Great Fire of London?', opts: ['1666', '1066', '1966', '1766'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('modern', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What year did World War I begin?', opts: ['1914', '1918', '1939', '1945'], correct: 0 },
      { q: 'What year did World War II end?', opts: ['1945', '1939', '1918', '1950'], correct: 0 },
      { q: 'Who was the British Prime Minister during WWII?', opts: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee', 'Harold Wilson'], correct: 0 },
      { q: 'When did the Berlin Wall fall?', opts: ['1989', '1979', '1991', '1969'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('modern', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  british: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 6) {
      const questions = [
        { q: 'Who is the King of England?', opts: ['King Charles III', 'King Henry', 'King George', 'King William'], correct: 0 },
        { q: 'What is Big Ben?', opts: ['A famous clock', 'A person', 'A bridge', 'A castle'], correct: 0 },
        { q: 'What colours are the Union Jack?', opts: ['Red, white and blue', 'Red and yellow', 'Green and white', 'Orange and black'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('british', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    const questions = [
      { q: 'How many wives did Henry VIII have?', opts: ['6', '4', '8', '3'], correct: 0 },
      { q: 'Who was the longest reigning British monarch?', opts: ['Queen Elizabeth II', 'Queen Victoria', 'King George III', 'King Henry VIII'], correct: 0 },
      { q: 'What year did the Gunpowder Plot happen?', opts: ['1605', '1666', '1066', '1805'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('british', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
};

// ============= GEOGRAPHY QUESTIONS =============
const geographyQuestions = {
  physical: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is the biggest ocean?', opts: ['Pacific Ocean', 'Atlantic Ocean', 'A lake', 'A river'], correct: 0 },
        { q: 'What is a mountain?', opts: ['Very high land', 'Flat land', 'Water', 'A building'], correct: 0 },
        { q: 'What is a river?', opts: ['Flowing water', 'A road', 'A mountain', 'A city'], correct: 0 },
        { q: 'What is a volcano?', opts: ['A mountain that erupts', 'A lake', 'A river', 'A forest'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('physical', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is the highest mountain in the world?', opts: ['Mount Everest', 'Ben Nevis', 'Snowdon', 'Mont Blanc'], correct: 0 },
        { q: 'What is the longest river in the UK?', opts: ['River Severn', 'River Thames', 'River Nile', 'River Amazon'], correct: 0 },
        { q: 'How many oceans are there?', opts: ['5', '3', '7', '10'], correct: 0 },
        { q: 'What is an island?', opts: ['Land surrounded by water', 'A type of mountain', 'A desert', 'A forest'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('physical', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the largest ocean on Earth?', opts: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], correct: 0 },
      { q: 'What causes earthquakes?', opts: ['Tectonic plate movement', 'Volcanic activity', 'Wind', 'Ocean currents'], correct: 0 },
      { q: 'What type of rock is formed from cooled lava?', opts: ['Igneous', 'Sedimentary', 'Metamorphic', 'Calcium'], correct: 0 },
      { q: 'What is the largest desert in the world?', opts: ['Antarctic Desert', 'Sahara', 'Gobi', 'Arabian'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('physical', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  human: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is the capital of England?', opts: ['London', 'Paris', 'New York', 'Tokyo'], correct: 0 },
        { q: 'Where do people live in a city?', opts: ['Houses and flats', 'Forests', 'Mountains', 'Oceans'], correct: 0 },
        { q: 'What country do we live in?', opts: ['United Kingdom', 'France', 'Spain', 'Germany'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('human', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'How many countries are in the UK?', opts: ['4', '3', '5', '2'], correct: 0 },
        { q: 'What is the capital of France?', opts: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 0 },
        { q: 'What is the capital of Scotland?', opts: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'], correct: 0 },
        { q: 'What continent is Egypt in?', opts: ['Africa', 'Europe', 'Asia', 'Australia'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('human', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the most populated country?', opts: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
      { q: 'What is urbanisation?', opts: ['Movement to cities', 'Movement to countryside', 'Building roads', 'Farming'], correct: 0 },
      { q: 'What is the capital of Australia?', opts: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], correct: 0 },
      { q: 'What is the smallest country in the world?', opts: ['Vatican City', 'Monaco', 'San Marino', 'Luxembourg'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('human', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  climate: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What falls from clouds when it rains?', opts: ['Water', 'Snow', 'Leaves', 'Sand'], correct: 0 },
        { q: 'What season comes after summer?', opts: ['Autumn', 'Winter', 'Spring', 'Summer again'], correct: 0 },
        { q: 'What keeps us warm from the sky?', opts: ['The Sun', 'The Moon', 'Stars', 'Clouds'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('climate', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'How many seasons are there?', opts: ['4', '3', '5', '2'], correct: 0 },
        { q: 'What is the hottest continent?', opts: ['Africa', 'Europe', 'Asia', 'Australia'], correct: 0 },
        { q: 'What makes a rainbow appear?', opts: ['Sun and rain', 'Just rain', 'Just sun', 'Wind'], correct: 0 },
        { q: 'What is weather?', opts: ['What happens in the sky each day', 'A type of food', 'A game', 'A book'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('climate', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What gas is causing global warming?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correct: 0 },
      { q: 'What is the greenhouse effect?', opts: ['Trapping of heat by gases', 'Plant growth', 'Cooling effect', 'Rain formation'], correct: 0 },
      { q: 'What is a renewable energy source?', opts: ['Solar power', 'Coal', 'Oil', 'Natural gas'], correct: 0 },
      { q: 'What causes seasons on Earth?', opts: ["Earth's tilt", 'Distance from sun', 'Moon phases', 'Ocean currents'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('climate', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  countries: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What is the biggest country by area?', opts: ['Russia', 'Canada', 'USA', 'China'], correct: 0 },
      { q: 'What continent is Brazil in?', opts: ['South America', 'Africa', 'Europe', 'Asia'], correct: 0 },
      { q: 'What is the capital of Italy?', opts: ['Rome', 'Paris', 'Madrid', 'Berlin'], correct: 0 },
      { q: 'What ocean is between Europe and America?', opts: ['Atlantic', 'Pacific', 'Indian', 'Arctic'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('countries', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
};

// ============= GENERAL KNOWLEDGE QUESTIONS =============
const generalQuestions = {
  trivia: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'How many days are in a week?', opts: ['7', '5', '6', '10'], correct: 0 },
        { q: 'What colour is a banana?', opts: ['Yellow', 'Red', 'Blue', 'Green'], correct: 0 },
        { q: 'How many fingers do you have?', opts: ['10', '8', '5', '12'], correct: 0 },
        { q: 'What animal says "moo"?', opts: ['Cow', 'Dog', 'Cat', 'Bird'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('trivia', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'How many months are in a year?', opts: ['12', '10', '14', '8'], correct: 0 },
        { q: 'How many colours are in a rainbow?', opts: ['7', '6', '8', '5'], correct: 0 },
        { q: 'What is the largest planet?', opts: ['Jupiter', 'Earth', 'Mars', 'Venus'], correct: 0 },
        { q: 'How many continents are there?', opts: ['7', '5', '6', '8'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('trivia', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'How many days are in a leap year?', opts: ['366', '365', '364', '367'], correct: 0 },
      { q: 'What is the fastest land animal?', opts: ['Cheetah', 'Lion', 'Horse', 'Leopard'], correct: 0 },
      { q: 'What year did the Titanic sink?', opts: ['1912', '1920', '1905', '1918'], correct: 0 },
      { q: 'What is the hardest natural substance?', opts: ['Diamond', 'Gold', 'Iron', 'Platinum'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('trivia', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
  sports: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What do you kick in football?', opts: ['A ball', 'A bat', 'A net', 'A stick'], correct: 0 },
        { q: 'What do you wear on your feet to run?', opts: ['Trainers', 'Gloves', 'Hats', 'Glasses'], correct: 0 },
        { q: 'What colour is a football pitch?', opts: ['Green', 'Blue', 'Red', 'Yellow'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('sports', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'How many players are on a football team?', opts: ['11', '10', '12', '9'], correct: 0 },
        { q: 'What sport uses a bat and ball?', opts: ['Cricket', 'Football', 'Swimming', 'Running'], correct: 0 },
        { q: 'What do you hit in tennis?', opts: ['A ball', 'A shuttlecock', 'A puck', 'A disc'], correct: 0 },
        { q: 'How many Olympics rings are there?', opts: ['5', '4', '6', '7'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('sports', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What sport uses a shuttlecock?', opts: ['Badminton', 'Tennis', 'Squash', 'Table tennis'], correct: 0 },
      { q: 'How many points is a try worth in rugby?', opts: ['5', '3', '6', '7'], correct: 0 },
      { q: 'How long is an Olympic swimming pool?', opts: ['50 metres', '25 metres', '100 metres', '75 metres'], correct: 0 },
      { q: 'How many holes are on a golf course?', opts: ['18', '9', '12', '21'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('sports', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
  nature: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What animal has stripes?', opts: ['Zebra', 'Elephant', 'Giraffe', 'Bear'], correct: 0 },
        { q: 'What do fish live in?', opts: ['Water', 'Trees', 'Sand', 'Caves'], correct: 0 },
        { q: 'How many legs does a cat have?', opts: ['4', '2', '6', '8'], correct: 0 },
        { q: 'What does a bird use to fly?', opts: ['Wings', 'Legs', 'Tail', 'Beak'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('nature', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is the tallest animal?', opts: ['Giraffe', 'Elephant', 'Horse', 'Camel'], correct: 0 },
        { q: 'How many legs does a spider have?', opts: ['8', '6', '10', '4'], correct: 0 },
        { q: 'What do bees make?', opts: ['Honey', 'Milk', 'Silk', 'Wax'], correct: 0 },
        { q: 'What type of animal is a dolphin?', opts: ['Mammal', 'Fish', 'Reptile', 'Bird'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('nature', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is a baby frog called?', opts: ['Tadpole', 'Froglet', 'Spawn', 'Larvae'], correct: 0 },
      { q: 'What is the largest species of bear?', opts: ['Polar bear', 'Grizzly bear', 'Black bear', 'Panda'], correct: 0 },
      { q: 'What bird cannot fly?', opts: ['Penguin', 'Eagle', 'Sparrow', 'Robin'], correct: 0 },
      { q: 'How many wings does a butterfly have?', opts: ['4', '2', '6', '8'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('nature', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
  music: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'How many strings does a guitar have?', opts: ['6', '4', '8', '5'], correct: 0 },
      { q: 'What instrument has black and white keys?', opts: ['Piano', 'Drums', 'Guitar', 'Flute'], correct: 0 },
      { q: 'What do you hit to play drums?', opts: ['Drum sticks', 'Your hands only', 'A bow', 'A pick'], correct: 0 },
      { q: 'How many notes are in a musical scale?', opts: ['8', '6', '10', '5'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('music', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
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
