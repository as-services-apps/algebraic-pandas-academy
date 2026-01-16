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
        { q: 'What body part do we use to hear?', opts: ['Ears', 'Nose', 'Eyes', 'Fingers'], correct: 0 },
        { q: 'What do we use to see?', opts: ['Eyes', 'Ears', 'Nose', 'Mouth'], correct: 0 },
        { q: 'What do we taste with?', opts: ['Tongue', 'Fingers', 'Nose', 'Ears'], correct: 0 },
        { q: 'What do fish breathe through?', opts: ['Gills', 'Nose', 'Mouth', 'Skin'], correct: 0 },
        { q: 'What do birds have that help them fly?', opts: ['Wings', 'Legs', 'Tail', 'Beak'], correct: 0 },
        { q: 'What is a baby cat called?', opts: ['Kitten', 'Puppy', 'Cub', 'Chick'], correct: 0 },
        { q: 'What is a baby dog called?', opts: ['Puppy', 'Kitten', 'Calf', 'Lamb'], correct: 0 },
        { q: 'How many legs does a spider have?', opts: ['8', '6', '4', '10'], correct: 0 },
        { q: 'What colour is grass?', opts: ['Green', 'Blue', 'Red', 'Yellow'], correct: 0 },
        { q: 'What do cows give us?', opts: ['Milk', 'Eggs', 'Honey', 'Wool'], correct: 0 },
        { q: 'What do chickens give us?', opts: ['Eggs', 'Milk', 'Honey', 'Wool'], correct: 0 },
        { q: 'Where do fish live?', opts: ['Water', 'Trees', 'Underground', 'Sky'], correct: 0 },
        { q: 'What part of the flower makes seeds?', opts: ['Flower', 'Leaf', 'Root', 'Stem'], correct: 0 },
        { q: 'What do we use our teeth for?', opts: ['Chewing food', 'Smelling', 'Hearing', 'Seeing'], correct: 0 },
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
        { q: 'What is the skeleton made of?', opts: ['Bones', 'Muscles', 'Skin', 'Blood'], correct: 0 },
        { q: 'What organ helps us think?', opts: ['Brain', 'Heart', 'Stomach', 'Lungs'], correct: 0 },
        { q: 'What type of animal has scales?', opts: ['Fish and reptiles', 'Birds', 'Mammals', 'Amphibians'], correct: 0 },
        { q: 'What do lungs help us do?', opts: ['Breathe', 'Digest food', 'Think', 'Move'], correct: 0 },
        { q: 'What is the main job of the stomach?', opts: ['Digest food', 'Pump blood', 'Filter air', 'Store memories'], correct: 0 },
        { q: 'What gives plants their green colour?', opts: ['Chlorophyll', 'Water', 'Sunlight', 'Soil'], correct: 0 },
        { q: 'What type of animal lays eggs?', opts: ['Birds and reptiles', 'Mammals only', 'Fish only', 'Insects only'], correct: 0 },
        { q: 'What are mammals covered in?', opts: ['Hair or fur', 'Scales', 'Feathers', 'Shell'], correct: 0 },
        { q: 'What is the smallest bone in the body?', opts: ['Stirrup (in ear)', 'Finger bone', 'Toe bone', 'Nose bone'], correct: 0 },
        { q: 'What do plants absorb from the soil?', opts: ['Water and nutrients', 'Light', 'Air', 'Heat'], correct: 0 },
        { q: 'What is the hard outer layer of teeth called?', opts: ['Enamel', 'Dentin', 'Pulp', 'Bone'], correct: 0 },
        { q: 'What type of animal is a snake?', opts: ['Reptile', 'Amphibian', 'Mammal', 'Fish'], correct: 0 },
        { q: 'What do red blood cells carry?', opts: ['Oxygen', 'Food', 'Water', 'Waste'], correct: 0 },
        { q: 'What is the process of a caterpillar becoming a butterfly?', opts: ['Metamorphosis', 'Evolution', 'Photosynthesis', 'Respiration'], correct: 0 },
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
      { q: 'What is DNA?', opts: ['Genetic material', 'A type of protein', 'A vitamin', 'A mineral'], correct: 0 },
      { q: 'What is the function of ribosomes?', opts: ['Make proteins', 'Store energy', 'Transport materials', 'Digest waste'], correct: 0 },
      { q: 'What is respiration?', opts: ['Releasing energy from food', 'Breathing in', 'Photosynthesis', 'Growing'], correct: 0 },
      { q: 'What is an enzyme?', opts: ['A biological catalyst', 'A type of cell', 'A nutrient', 'A hormone'], correct: 0 },
      { q: 'What is the digestive system responsible for?', opts: ['Breaking down food', 'Pumping blood', 'Fighting disease', 'Thinking'], correct: 0 },
      { q: 'What are genes made of?', opts: ['DNA', 'Protein', 'Carbohydrates', 'Fat'], correct: 0 },
      { q: 'What is the circulatory system?', opts: ['Heart and blood vessels', 'Lungs and airways', 'Bones and muscles', 'Brain and nerves'], correct: 0 },
      { q: 'What do plants need for photosynthesis?', opts: ['Light, water, CO2', 'Just water', 'Just light', 'Oxygen'], correct: 0 },
      { q: 'What is the role of the cell membrane?', opts: ['Controls what enters/exits cell', 'Makes proteins', 'Stores DNA', 'Produces energy'], correct: 0 },
      { q: 'What is mitosis?', opts: ['Cell division', 'Protein synthesis', 'Energy production', 'Digestion'], correct: 0 },
      { q: 'What is the nervous system made of?', opts: ['Brain, spinal cord, nerves', 'Heart and blood', 'Bones and muscles', 'Lungs and airways'], correct: 0 },
      { q: 'What is evolution?', opts: ['Change in species over time', 'Individual growth', 'Cell division', 'Metamorphosis'], correct: 0 },
      { q: 'What is an ecosystem?', opts: ['Community of living things and their environment', 'A type of cell', 'A body system', 'A chemical reaction'], correct: 0 },
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
        { q: 'What happens when water freezes?', opts: ['It becomes ice', 'It evaporates', 'It melts', 'It boils'], correct: 0 },
        { q: 'What is a solid?', opts: ['Something hard like a rock', 'Something you can pour', 'Something invisible', 'Something soft'], correct: 0 },
        { q: 'What is a liquid?', opts: ['Something you can pour like water', 'Something hard', 'Something you can breathe', 'Something invisible'], correct: 0 },
        { q: 'What happens when you heat water?', opts: ['It gets hot and may boil', 'It freezes', 'Nothing', 'It turns blue'], correct: 0 },
        { q: 'What colour do you get mixing yellow and blue?', opts: ['Green', 'Orange', 'Purple', 'Red'], correct: 0 },
        { q: 'What colour do you get mixing red and yellow?', opts: ['Orange', 'Green', 'Purple', 'Blue'], correct: 0 },
        { q: 'Is air a solid, liquid or gas?', opts: ['Gas', 'Solid', 'Liquid', 'None'], correct: 0 },
        { q: 'Is a book solid, liquid or gas?', opts: ['Solid', 'Liquid', 'Gas', 'None'], correct: 0 },
        { q: 'Is milk solid, liquid or gas?', opts: ['Liquid', 'Solid', 'Gas', 'None'], correct: 0 },
        { q: 'What do we add to food to make it taste salty?', opts: ['Salt', 'Sugar', 'Pepper', 'Water'], correct: 0 },
        { q: 'What happens to sugar in water?', opts: ['It dissolves', 'It floats', 'Nothing', 'It explodes'], correct: 0 },
        { q: 'What happens to chocolate when heated?', opts: ['It melts', 'It freezes', 'Nothing', 'It grows'], correct: 0 },
        { q: 'What is the Sun made of mostly?', opts: ['Hot gases', 'Rock', 'Water', 'Ice'], correct: 0 },
        { q: 'What do bubbles in boiling water turn into?', opts: ['Steam (gas)', 'Ice', 'Nothing', 'Solid'], correct: 0 },
        { q: 'Can you see air?', opts: ['No, it is invisible', 'Yes, it is blue', 'Yes, it is white', 'Yes, it is green'], correct: 0 },
        { q: 'What happens to wet clothes on a sunny day?', opts: ['They dry (water evaporates)', 'They get wetter', 'They freeze', 'Nothing'], correct: 0 },
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
        { q: 'What is evaporation?', opts: ['Liquid turning to gas', 'Solid turning to liquid', 'Gas turning to solid', 'Liquid turning to solid'], correct: 0 },
        { q: 'What is condensation?', opts: ['Gas turning to liquid', 'Liquid turning to gas', 'Solid turning to liquid', 'Liquid turning to solid'], correct: 0 },
        { q: 'What is a reversible change?', opts: ['A change that can be undone', 'A permanent change', 'Burning', 'Cooking'], correct: 0 },
        { q: 'What is an irreversible change?', opts: ['A change that cannot be undone', 'Melting ice', 'Freezing water', 'Dissolving salt'], correct: 0 },
        { q: 'What gas do we need to breathe?', opts: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], correct: 0 },
        { q: 'What is the chemical symbol for water?', opts: ['H2O', 'CO2', 'O2', 'N2'], correct: 0 },
        { q: 'What happens when you mix oil and water?', opts: ['They separate', 'They mix completely', 'Oil dissolves', 'Water evaporates'], correct: 0 },
        { q: 'What is rust?', opts: ['Iron oxide (oxidation)', 'Melting', 'Freezing', 'Dissolving'], correct: 0 },
        { q: 'What type of change is burning wood?', opts: ['Irreversible (chemical)', 'Reversible', 'Physical only', 'No change'], correct: 0 },
        { q: 'What type of change is melting ice?', opts: ['Reversible (physical)', 'Irreversible', 'Chemical', 'Permanent'], correct: 0 },
        { q: 'What is filtering used for?', opts: ['Separating mixtures', 'Heating liquids', 'Freezing water', 'Making mixtures'], correct: 0 },
        { q: 'What is sieving?', opts: ['Separating by size', 'Mixing', 'Heating', 'Cooling'], correct: 0 },
        { q: 'What happens to particles when heated?', opts: ['They move faster', 'They move slower', 'They stop', 'They disappear'], correct: 0 },
        { q: 'What is a solution?', opts: ['A mixture where something dissolves', 'A solid', 'A gas', 'Pure water'], correct: 0 },
        { q: 'What is the boiling point of water?', opts: ['100°C', '0°C', '50°C', '200°C'], correct: 0 },
        { q: 'What is the freezing point of water?', opts: ['0°C', '100°C', '-10°C', '50°C'], correct: 0 },
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
      { q: 'What is an atom?', opts: ['Smallest particle of an element', 'A molecule', 'A compound', 'A mixture'], correct: 0 },
      { q: 'What is a molecule?', opts: ['Two or more atoms bonded together', 'A single atom', 'An element', 'A mixture'], correct: 0 },
      { q: 'What is an element?', opts: ['A pure substance of one type of atom', 'A mixture', 'A compound', 'A solution'], correct: 0 },
      { q: 'What is a compound?', opts: ['Two or more elements chemically joined', 'A mixture', 'A single element', 'A solution'], correct: 0 },
      { q: 'What is the periodic table?', opts: ['Arrangement of all elements', 'A type of bond', 'A chemical reaction', 'A mixture'], correct: 0 },
      { q: 'What is an acid?', opts: ['Substance with pH below 7', 'Substance with pH above 7', 'Neutral substance', 'A type of gas'], correct: 0 },
      { q: 'What is a base?', opts: ['Substance with pH above 7', 'Substance with pH below 7', 'Neutral substance', 'A type of solid'], correct: 0 },
      { q: 'What is neutralisation?', opts: ['Acid and base reacting', 'Burning', 'Melting', 'Evaporating'], correct: 0 },
      { q: 'What particles are in the nucleus of an atom?', opts: ['Protons and neutrons', 'Electrons only', 'Protons only', 'Neutrons only'], correct: 0 },
      { q: 'What is the charge of an electron?', opts: ['Negative', 'Positive', 'Neutral', 'No charge'], correct: 0 },
      { q: 'What is the charge of a proton?', opts: ['Positive', 'Negative', 'Neutral', 'No charge'], correct: 0 },
      { q: 'What is exothermic reaction?', opts: ['Releases heat', 'Absorbs heat', 'No heat change', 'Creates cold'], correct: 0 },
      { q: 'What is endothermic reaction?', opts: ['Absorbs heat', 'Releases heat', 'No heat change', 'Creates heat'], correct: 0 },
      { q: 'What is oxidation?', opts: ['Gaining oxygen or losing electrons', 'Losing oxygen', 'Gaining electrons', 'No change'], correct: 0 },
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
        { q: 'What do we use to see in the dark?', opts: ['A torch or light', 'Our ears', 'Our nose', 'Nothing'], correct: 0 },
        { q: 'What makes a sound?', opts: ['Vibrations', 'Light', 'Water', 'Air only'], correct: 0 },
        { q: 'Do magnets attract wood?', opts: ['No', 'Yes', 'Sometimes', 'Always'], correct: 0 },
        { q: 'Do magnets attract iron?', opts: ['Yes', 'No', 'Sometimes', 'Never'], correct: 0 },
        { q: 'What shape is the Earth?', opts: ['Sphere (ball)', 'Flat', 'Square', 'Triangle'], correct: 0 },
        { q: 'What gives us light at night from the sky?', opts: ['The Moon and stars', 'The Sun', 'Clouds', 'Nothing'], correct: 0 },
        { q: 'Can light go through glass?', opts: ['Yes', 'No', 'Sometimes', 'Never'], correct: 0 },
        { q: 'Can light go through a brick wall?', opts: ['No', 'Yes', 'Sometimes', 'Always'], correct: 0 },
        { q: 'What is a push?', opts: ['A force moving something away', 'A force bringing something closer', 'No force', 'A sound'], correct: 0 },
        { q: 'What is a pull?', opts: ['A force bringing something closer', 'A force moving something away', 'No force', 'A light'], correct: 0 },
        { q: 'Does sound travel through air?', opts: ['Yes', 'No', 'Only sometimes', 'Only in water'], correct: 0 },
        { q: 'What makes a rainbow appear?', opts: ['Sunlight and rain', 'Just rain', 'Just sun', 'Wind'], correct: 0 },
        { q: 'What colour is the sky on a sunny day?', opts: ['Blue', 'Green', 'Red', 'Yellow'], correct: 0 },
        { q: 'Does a ball roll uphill by itself?', opts: ['No', 'Yes', 'Sometimes', 'Always'], correct: 0 },
        { q: 'What happens when you drop something?', opts: ['It falls down', 'It floats up', 'It stays still', 'It disappears'], correct: 0 },
        { q: 'Is the Sun hot or cold?', opts: ['Very hot', 'Very cold', 'Warm', 'Cool'], correct: 0 },
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
        { q: 'What is gravity?', opts: ['A force that pulls things down', 'A force that pushes up', 'A type of energy', 'A type of light'], correct: 0 },
        { q: 'What type of energy does food contain?', opts: ['Chemical energy', 'Light energy', 'Sound energy', 'Electrical energy'], correct: 0 },
        { q: 'What is a circuit?', opts: ['A path for electricity', 'A type of magnet', 'A sound wave', 'A type of light'], correct: 0 },
        { q: 'What happens when a circuit is broken?', opts: ['Electricity stops flowing', 'It gets brighter', 'Nothing', 'It gets louder'], correct: 0 },
        { q: 'What makes a louder sound?', opts: ['More vibration', 'Less vibration', 'More light', 'More water'], correct: 0 },
        { q: 'What is the unit for measuring force?', opts: ['Newton', 'Metre', 'Kilogram', 'Second'], correct: 0 },
        { q: 'What is insulation?', opts: ['Stopping heat escaping', 'Making heat', 'Stopping light', 'Making sound'], correct: 0 },
        { q: 'What type of mirror shows a smaller image?', opts: ['Convex', 'Concave', 'Flat', 'None'], correct: 0 },
        { q: 'Does electricity flow through metal?', opts: ['Yes (conductor)', 'No', 'Sometimes', 'Only when cold'], correct: 0 },
        { q: 'Does electricity flow through plastic?', opts: ['No (insulator)', 'Yes', 'Always', 'Only when hot'], correct: 0 },
        { q: 'What is air resistance?', opts: ['Friction from air', 'A type of gravity', 'Sound waves', 'Light rays'], correct: 0 },
        { q: 'What makes day and night?', opts: ['Earth spinning', 'Sun moving', 'Moon moving', 'Stars appearing'], correct: 0 },
        { q: 'What type of energy is in a moving car?', opts: ['Kinetic energy', 'Potential energy', 'Sound energy', 'Light energy'], correct: 0 },
        { q: 'What type of energy is stored in a stretched elastic?', opts: ['Elastic potential energy', 'Kinetic energy', 'Thermal energy', 'Sound energy'], correct: 0 },
        { q: 'What is reflection?', opts: ['Light bouncing off a surface', 'Light going through something', 'Light being absorbed', 'Light bending'], correct: 0 },
        { q: 'What is refraction?', opts: ['Light bending when it changes material', 'Light bouncing', 'Light stopping', 'Light dimming'], correct: 0 },
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
      { q: 'What is the unit of power?', opts: ['Watt', 'Joule', 'Newton', 'Volt'], correct: 0 },
      { q: 'What is the unit of energy?', opts: ['Joule', 'Watt', 'Newton', 'Ohm'], correct: 0 },
      { q: 'What is acceleration?', opts: ['Change in velocity over time', 'Distance over time', 'Force times mass', 'Energy over time'], correct: 0 },
      { q: 'What is momentum?', opts: ['Mass times velocity', 'Force times time', 'Energy divided by time', 'Acceleration times distance'], correct: 0 },
      { q: "What is Newton's first law?", opts: ['Objects stay at rest unless acted upon', 'F = ma', 'Every action has reaction', 'Energy is conserved'], correct: 0 },
      { q: "What is Newton's second law?", opts: ['F = ma', 'Objects stay at rest', 'Action equals reaction', 'Energy conserved'], correct: 0 },
      { q: "What is Newton's third law?", opts: ['Every action has equal opposite reaction', 'F = ma', 'Objects stay at rest', 'Energy conserved'], correct: 0 },
      { q: 'What is voltage?', opts: ['Electrical potential difference', 'Current flow', 'Resistance', 'Power'], correct: 0 },
      { q: 'What is current?', opts: ['Flow of electric charge', 'Resistance', 'Voltage', 'Power'], correct: 0 },
      { q: 'What is the relationship V = IR called?', opts: ["Ohm's Law", "Newton's Law", "Faraday's Law", "Hooke's Law"], correct: 0 },
      { q: 'What is a wave?', opts: ['Transfer of energy without matter moving', 'Movement of matter', 'A force', 'A type of particle'], correct: 0 },
      { q: 'What is wavelength?', opts: ['Distance between wave peaks', 'Height of wave', 'Speed of wave', 'Energy of wave'], correct: 0 },
      { q: 'What is frequency measured in?', opts: ['Hertz (Hz)', 'Metres', 'Seconds', 'Joules'], correct: 0 },
      { q: 'What is electromagnetic spectrum?', opts: ['Range of electromagnetic waves', 'Visible light only', 'Sound waves', 'Water waves'], correct: 0 },
      { q: 'What is terminal velocity?', opts: ['Maximum falling speed', 'Starting speed', 'Average speed', 'Minimum speed'], correct: 0 },
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
        { q: 'Is the Moon a planet?', opts: ['No, it is a moon', 'Yes', 'It is a star', 'It is the Sun'], correct: 0 },
        { q: 'Is the Sun a star?', opts: ['Yes', 'No, it is a planet', 'No, it is a moon', 'It is an asteroid'], correct: 0 },
        { q: 'What shape is the Moon?', opts: ['Sphere (ball)', 'Flat', 'Square', 'Triangle'], correct: 0 },
        { q: 'Can people live on the Moon?', opts: ['Not without special equipment', 'Yes easily', 'There is air there', 'It is too hot'], correct: 0 },
        { q: 'What colour does Mars appear?', opts: ['Red', 'Blue', 'Green', 'Yellow'], correct: 0 },
        { q: 'Do astronauts float in space?', opts: ['Yes, due to microgravity', 'No', 'Only sometimes', 'Only on Earth'], correct: 0 },
        { q: 'What do astronauts wear in space?', opts: ['Space suits', 'Normal clothes', 'Swimming suits', 'Nothing'], correct: 0 },
        { q: 'Is Earth the only planet with water?', opts: ['No, others may have water/ice', 'Yes', 'All planets have water', 'Only Mars has water'], correct: 0 },
        { q: 'How many moons does Earth have?', opts: ['One', 'Two', 'None', 'Three'], correct: 0 },
        { q: 'Which is bigger: Earth or the Moon?', opts: ['Earth', 'The Moon', 'Same size', 'Cannot compare'], correct: 0 },
        { q: 'Which is bigger: Earth or the Sun?', opts: ['The Sun', 'Earth', 'Same size', 'Cannot compare'], correct: 0 },
        { q: 'What are stars made of?', opts: ['Hot gas', 'Rock', 'Water', 'Ice'], correct: 0 },
        { q: 'Why do we have day and night?', opts: ['Earth spins', 'Sun moves', 'Moon blocks Sun', 'Stars change'], correct: 0 },
        { q: 'Can you hear sound in space?', opts: ['No, there is no air', 'Yes, loudly', 'Only whispers', 'Sometimes'], correct: 0 },
        { q: 'What vehicle takes people to space?', opts: ['Rocket', 'Aeroplane', 'Car', 'Boat'], correct: 0 },
        { q: 'What is an astronaut?', opts: ['Person who travels to space', 'A type of star', 'A planet', 'A telescope'], correct: 0 },
        { q: 'What do we use to see stars better?', opts: ['Telescope', 'Microscope', 'Glasses', 'Magnifying glass'], correct: 0 },
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
        { q: 'Which planet has rings?', opts: ['Saturn', 'Mars', 'Earth', 'Venus'], correct: 0 },
        { q: 'Which planet is closest to the Sun?', opts: ['Mercury', 'Venus', 'Earth', 'Mars'], correct: 0 },
        { q: 'What is an orbit?', opts: ['Path around another object', 'A type of star', 'A rocket', 'A moon'], correct: 0 },
        { q: 'How long does Earth take to orbit the Sun?', opts: ['1 year (365 days)', '1 day', '1 month', '1 week'], correct: 0 },
        { q: 'How long is a day on Earth?', opts: ['24 hours', '12 hours', '365 days', '7 days'], correct: 0 },
        { q: 'What causes seasons?', opts: ["Earth's tilt", 'Distance from Sun', 'The Moon', 'Wind'], correct: 0 },
        { q: 'What is the Milky Way?', opts: ['Our galaxy', 'A planet', 'A star', 'A chocolate bar only'], correct: 0 },
        { q: 'Which planet is known as Earth twin?', opts: ['Venus (similar size)', 'Mars', 'Jupiter', 'Mercury'], correct: 0 },
        { q: 'What are asteroids?', opts: ['Rocky objects in space', 'Planets', 'Stars', 'Moons'], correct: 0 },
        { q: 'What is a comet?', opts: ['Icy object with a tail', 'A planet', 'A star', 'A moon'], correct: 0 },
        { q: 'How many Earths could fit in the Sun?', opts: ['About 1 million', 'About 100', 'About 10', 'Just 1'], correct: 0 },
        { q: 'Which planet spins on its side?', opts: ['Uranus', 'Mars', 'Earth', 'Venus'], correct: 0 },
        { q: 'What is a satellite?', opts: ['Object orbiting another', 'A type of rocket', 'A star', 'A planet'], correct: 0 },
        { q: 'Why does the Moon appear to change shape?', opts: ['We see different lit parts', 'It actually changes', 'Clouds cover it', 'It moves away'], correct: 0 },
        { q: 'What is a lunar eclipse?', opts: ['Earth blocks Sun from Moon', 'Moon blocks Sun', 'Sun blocks Moon', 'Stars disappear'], correct: 0 },
        { q: 'What is a solar eclipse?', opts: ['Moon blocks Sun from Earth', 'Earth blocks Sun', 'Sun disappears', 'Moon disappears'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('space', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is a light year?', opts: ['Distance light travels in a year', 'A very bright year', '365 days', 'Speed of light'], correct: 0 },
      { q: 'What is the closest star to Earth?', opts: ['The Sun', 'Proxima Centauri', 'Sirius', 'Alpha Centauri'], correct: 0 },
      { q: 'What is a black hole?', opts: ['Region with extreme gravity', 'A dark planet', 'An empty space', 'A type of star'], correct: 0 },
      { q: 'What is a supernova?', opts: ['Exploding star', 'New star forming', 'A black hole', 'A planet collision'], correct: 0 },
      { q: 'What is a galaxy?', opts: ['Collection of stars, gas, dust', 'A single star', 'A planet', 'A moon'], correct: 0 },
      { q: 'What is the Big Bang theory?', opts: ['Universe began from singularity', 'Earth was created', 'Stars were born', 'Moon formed'], correct: 0 },
      { q: 'What is dark matter?', opts: ['Invisible matter affecting gravity', 'Black holes', 'Empty space', 'Dark planets'], correct: 0 },
      { q: 'What is a nebula?', opts: ['Cloud of gas and dust', 'A type of star', 'A black hole', 'A planet'], correct: 0 },
      { q: 'What are dwarf planets?', opts: ['Small planet-like objects', 'Baby planets', 'Tiny stars', 'Large asteroids only'], correct: 0 },
      { q: 'Why is Pluto not a planet?', opts: ["Hasn't cleared its orbit", 'Too small', 'Too cold', 'No moons'], correct: 0 },
      { q: 'What is the asteroid belt?', opts: ['Region between Mars and Jupiter', 'Around Saturn', 'Around Earth', 'Near Pluto'], correct: 0 },
      { q: 'What is gravity?', opts: ['Force of attraction between masses', 'A type of light', 'Sound in space', 'Heat from stars'], correct: 0 },
      { q: 'What is a red dwarf?', opts: ['A small, cool star', 'A hot star', 'A dying star', 'A planet'], correct: 0 },
      { q: 'What is a white dwarf?', opts: ['Remnant of dead star', 'A new star', 'A bright star', 'A type of planet'], correct: 0 },
      { q: 'What is the Hubble Space Telescope?', opts: ['Telescope in orbit', 'A space station', 'A rocket', 'A satellite dish'], correct: 0 },
      { q: 'What is the ISS?', opts: ['International Space Station', 'A rocket', 'A satellite', 'A telescope'], correct: 0 },
      { q: 'How old is the universe approximately?', opts: ['13.8 billion years', '4.5 billion years', '1 billion years', '100 million years'], correct: 0 },
      { q: 'What is an exoplanet?', opts: ['Planet outside our solar system', 'A moon', 'An asteroid', 'A comet'], correct: 0 },
      { q: 'What causes a meteor shower?', opts: ['Earth passing through debris', 'Sun exploding', 'Moon breaking', 'Stars falling'], correct: 0 },
      { q: 'What is the habitable zone?', opts: ['Region where liquid water possible', 'The hottest zone', 'Near black holes', 'Inside stars'], correct: 0 },
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
        { q: 'What animal did Ancient Egyptians worship?', opts: ['Cats', 'Dogs', 'Elephants', 'Tigers'], correct: 0 },
        { q: 'What did cavemen use to make fire?', opts: ['Stones', 'Matches', 'Lighters', 'Electricity'], correct: 0 },
        { q: 'What did Stone Age people hunt?', opts: ['Animals', 'Cars', 'Planes', 'Computers'], correct: 0 },
        { q: 'Where did Ancient Romans come from?', opts: ['Italy', 'France', 'England', 'Spain'], correct: 0 },
        { q: 'What did Ancient Greeks invent?', opts: ['The Olympics', 'Television', 'Cars', 'Phones'], correct: 0 },
        { q: 'What did Ancient people write on?', opts: ['Stone tablets', 'Paper', 'Computers', 'Phones'], correct: 0 },
        { q: 'What was a chariot?', opts: ['A cart pulled by horses', 'A boat', 'A plane', 'A bike'], correct: 0 },
        { q: 'What did Vikings sail in?', opts: ['Longboats', 'Cars', 'Planes', 'Submarines'], correct: 0 },
        { q: 'What weapon did cavemen use?', opts: ['Spears', 'Guns', 'Swords', 'Lasers'], correct: 0 },
        { q: 'What is a fossil?', opts: ['Remains of old creatures', 'A type of rock', 'A plant', 'A tool'], correct: 0 },
        { q: 'What did Ancient Egyptians use to write?', opts: ['Hieroglyphics', 'English', 'Numbers', 'Emojis'], correct: 0 },
        { q: 'What river was important to Ancient Egypt?', opts: ['The Nile', 'The Thames', 'The Amazon', 'The Mississippi'], correct: 0 },
        { q: 'What did Roman soldiers wear?', opts: ['Armour and helmets', 'T-shirts', 'Jeans', 'Trainers'], correct: 0 },
        { q: 'What is an artefact?', opts: ['An old object from the past', 'A new toy', 'A type of food', 'A book'], correct: 0 },
        { q: 'Where were the pyramids built?', opts: ['Egypt', 'England', 'France', 'America'], correct: 0 },
        { q: 'What animals pulled Roman chariots?', opts: ['Horses', 'Dogs', 'Cats', 'Elephants'], correct: 0 },
        { q: 'What did Ancient people live in?', opts: ['Caves and huts', 'Skyscrapers', 'Flats', 'Hotels'], correct: 0 },
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
        { q: 'What was the Colosseum used for?', opts: ['Gladiator fights', 'School', 'Farming', 'Shopping'], correct: 0 },
        { q: 'What civilization built the Parthenon?', opts: ['Ancient Greeks', 'Romans', 'Egyptians', 'Vikings'], correct: 0 },
        { q: 'What is archaeology?', opts: ['Study of old things', 'Study of stars', 'Study of animals', 'Study of weather'], correct: 0 },
        { q: 'What god was Zeus?', opts: ['Greek god of sky', 'Egyptian god', 'Roman god of war', 'Viking god'], correct: 0 },
        { q: 'What were Roman roads made of?', opts: ['Stone', 'Plastic', 'Wood only', 'Sand'], correct: 0 },
        { q: 'What is the Sphinx?', opts: ['Egyptian statue with lion body', 'A pyramid', 'A temple', 'A boat'], correct: 0 },
        { q: 'What did Tutankhamun rule?', opts: ['Ancient Egypt', 'Rome', 'Greece', 'Britain'], correct: 0 },
        { q: 'What did Romans bathe in?', opts: ['Public baths', 'Rivers only', 'Puddles', 'They didn\'t bathe'], correct: 0 },
        { q: 'What was a Roman villa?', opts: ['A large house', 'A shop', 'A temple', 'A fort'], correct: 0 },
        { q: 'What did Ancient Greeks write about?', opts: ['Myths and legends', 'Television shows', 'Cars', 'Phones'], correct: 0 },
        { q: 'What material did Egyptians use for writing?', opts: ['Papyrus', 'Paper', 'Plastic', 'Metal'], correct: 0 },
        { q: 'What was Pompeii?', opts: ['A Roman city destroyed by volcano', 'A Greek temple', 'An Egyptian pyramid', 'A Viking ship'], correct: 0 },
        { q: 'What is a sarcophagus?', opts: ['Egyptian coffin', 'A temple', 'A weapon', 'A chariot'], correct: 0 },
        { q: 'Who was Cleopatra?', opts: ['Egyptian queen', 'Greek goddess', 'Roman empress', 'Viking warrior'], correct: 0 },
        { q: 'What did the Rosetta Stone help us understand?', opts: ['Egyptian writing', 'Roman numbers', 'Greek maps', 'Viking runes'], correct: 0 },
        { q: 'What was an amphitheatre?', opts: ['Roman arena for shows', 'A temple', 'A house', 'A market'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('ancient', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'Who built the Great Pyramid of Giza?', opts: ['Ancient Egyptians', 'Romans', 'Greeks', 'Persians'], correct: 0 },
      { q: 'What civilization invented democracy?', opts: ['Ancient Greeks', 'Romans', 'Egyptians', 'Persians'], correct: 0 },
      { q: 'Who was the first Roman Emperor?', opts: ['Augustus', 'Julius Caesar', 'Nero', 'Caligula'], correct: 0 },
      { q: 'What language did Ancient Romans speak?', opts: ['Latin', 'Greek', 'Italian', 'English'], correct: 0 },
      { q: 'Who was Alexander the Great?', opts: ['Greek conqueror', 'Roman emperor', 'Egyptian pharaoh', 'Persian king'], correct: 0 },
      { q: 'What empire did Julius Caesar lead?', opts: ['Roman Empire', 'Greek Empire', 'Egyptian Empire', 'Persian Empire'], correct: 0 },
      { q: 'What was the Trojan War?', opts: ['War between Greeks and Trojans', 'Egyptian civil war', 'Roman rebellion', 'Viking invasion'], correct: 0 },
      { q: 'What is the Acropolis?', opts: ['Ancient Greek citadel', 'Roman temple', 'Egyptian tomb', 'Persian palace'], correct: 0 },
      { q: 'Who wrote the Iliad?', opts: ['Homer', 'Plato', 'Aristotle', 'Socrates'], correct: 0 },
      { q: 'What was Hadrian\'s Wall?', opts: ['Roman wall in Britain', 'Greek monument', 'Egyptian tomb', 'Viking fort'], correct: 0 },
      { q: 'What caused the fall of Rome?', opts: ['Invasions and decline', 'Flood', 'Earthquake', 'Plague only'], correct: 0 },
      { q: 'Who was Hannibal?', opts: ['Carthaginian general', 'Roman emperor', 'Greek philosopher', 'Egyptian priest'], correct: 0 },
      { q: 'What were hieroglyphics?', opts: ['Egyptian picture writing', 'Roman numbers', 'Greek letters', 'Chinese symbols'], correct: 0 },
      { q: 'What was the Roman Forum?', opts: ['Public gathering place', 'Military camp', 'Temple only', 'Prison'], correct: 0 },
      { q: 'Who was Nefertiti?', opts: ['Egyptian queen', 'Greek goddess', 'Roman empress', 'Persian princess'], correct: 0 },
      { q: 'What is the Valley of the Kings?', opts: ['Egyptian burial site', 'Greek battleground', 'Roman market', 'Persian garden'], correct: 0 },
      { q: 'What did Spartans prioritize?', opts: ['Military training', 'Art and music', 'Trade', 'Farming'], correct: 0 },
      { q: 'Who was Socrates?', opts: ['Greek philosopher', 'Roman general', 'Egyptian scribe', 'Persian king'], correct: 0 },
      { q: 'What were Roman aqueducts for?', opts: ['Carrying water', 'Carrying soldiers', 'Trade routes', 'Tombs'], correct: 0 },
      { q: 'What metal age came after the Bronze Age?', opts: ['Iron Age', 'Stone Age', 'Gold Age', 'Silver Age'], correct: 0 },
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
        { q: 'What weapon did knights use?', opts: ['Swords', 'Guns', 'Lasers', 'Phones'], correct: 0 },
        { q: 'What protected a castle?', opts: ['Walls and moats', 'Nothing', 'Fences', 'Trees'], correct: 0 },
        { q: 'Who lived in a castle?', opts: ['Lords and ladies', 'Nobody', 'Fish', 'Birds'], correct: 0 },
        { q: 'What did a king wear on his head?', opts: ['A crown', 'A hat', 'Nothing', 'A helmet'], correct: 0 },
        { q: 'What story has knights?', opts: ['King Arthur', 'Harry Potter', 'The Gruffalo', 'Peppa Pig'], correct: 0 },
        { q: 'What is a drawbridge?', opts: ['Bridge that lifts up', 'A type of sword', 'A crown', 'A flag'], correct: 0 },
        { q: 'What did medieval people eat with?', opts: ['Their hands', 'Forks always', 'Chopsticks', 'Spoons only'], correct: 0 },
        { q: 'What did a princess live in?', opts: ['A tower or castle', 'A tent', 'A cave', 'A boat'], correct: 0 },
        { q: 'What is a shield?', opts: ['Protection in battle', 'A type of food', 'A crown', 'A horse'], correct: 0 },
        { q: 'What did dragons do in stories?', opts: ['Breathe fire', 'Swim', 'Drive cars', 'Use computers'], correct: 0 },
        { q: 'What is a feast?', opts: ['A big meal', 'A battle', 'A race', 'A game'], correct: 0 },
        { q: 'What did jesters do?', opts: ['Made people laugh', 'Fought battles', 'Built castles', 'Cooked food'], correct: 0 },
        { q: 'What is a throne?', opts: ['A king\'s chair', 'A table', 'A bed', 'A door'], correct: 0 },
        { q: 'What carried messages in medieval times?', opts: ['Horses and people', 'Phones', 'Emails', 'Planes'], correct: 0 },
        { q: 'What did knights train to be?', opts: ['Warriors', 'Teachers', 'Doctors', 'Farmers'], correct: 0 },
        { q: 'What is a medieval banquet?', opts: ['A big party with food', 'A battle', 'A church service', 'A market'], correct: 0 },
        { q: 'What animal was on many shields?', opts: ['Lions', 'Fish', 'Bugs', 'Rabbits'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('medieval', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is a moat?', opts: ['Water around a castle', 'A type of boat', 'A weapon', 'A flag'], correct: 0 },
        { q: 'Who ruled in castles?', opts: ['Lords and Ladies', 'Teachers', 'Farmers', 'Doctors'], correct: 0 },
        { q: 'What was a jousting tournament?', opts: ['A knight competition', 'A cooking show', 'A race', 'A dance'], correct: 0 },
        { q: 'What was a serf?', opts: ['A peasant worker', 'A knight', 'A king', 'A merchant'], correct: 0 },
        { q: 'What was the feudal system?', opts: ['Medieval social order', 'A type of castle', 'A weapon', 'A game'], correct: 0 },
        { q: 'What did monks live in?', opts: ['Monasteries', 'Castles', 'Caves', 'Tents'], correct: 0 },
        { q: 'What was a catapult used for?', opts: ['Attacking castles', 'Fishing', 'Farming', 'Cooking'], correct: 0 },
        { q: 'Who was Robin Hood?', opts: ['A legendary outlaw', 'A king', 'A knight', 'A monk'], correct: 0 },
        { q: 'What was a crusade?', opts: ['A religious war', 'A party', 'A market', 'A game'], correct: 0 },
        { q: 'What did blacksmiths make?', opts: ['Weapons and armour', 'Bread', 'Clothes', 'Books'], correct: 0 },
        { q: 'What was a coat of arms?', opts: ['Family symbol', 'A type of coat', 'A weapon', 'A horse'], correct: 0 },
        { q: 'What was a siege?', opts: ['Surrounding a castle', 'A party', 'A race', 'A dance'], correct: 0 },
        { q: 'Who taught boys to be knights?', opts: ['Other knights', 'Teachers', 'Parents only', 'No one'], correct: 0 },
        { q: 'What did a herald announce?', opts: ['News and events', 'Weather', 'Time', 'Prices'], correct: 0 },
        { q: 'What was a page?', opts: ['Young knight in training', 'A book', 'A weapon', 'A horse'], correct: 0 },
        { q: 'What was a squire?', opts: ['Knight\'s assistant', 'A king', 'A peasant', 'A monk'], correct: 0 },
        { q: 'What was a trebuchet?', opts: ['A large catapult', 'A sword', 'A shield', 'A horse'], correct: 0 },
        { q: 'What is a bailey?', opts: ['Castle courtyard', 'A weapon', 'A crown', 'A flag'], correct: 0 },
        { q: 'What was chainmail?', opts: ['Armour made of rings', 'A type of letter', 'A weapon', 'A horse'], correct: 0 },
        { q: 'What did a minstrel do?', opts: ['Played music', 'Fought battles', 'Made weapons', 'Cooked food'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('medieval', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What year did the Battle of Hastings occur?', opts: ['1066', '1166', '1266', '966'], correct: 0 },
      { q: 'Who was the first Norman King of England?', opts: ['William the Conqueror', 'Henry VIII', 'Richard I', 'Edward I'], correct: 0 },
      { q: 'What was the Black Death?', opts: ['A plague pandemic', 'A war', 'A famine', 'An earthquake'], correct: 0 },
      { q: 'What was the Magna Carta?', opts: ['A charter of rights', 'A peace treaty', 'A map', 'A religious text'], correct: 0 },
      { q: 'Who was Richard the Lionheart?', opts: ['English king and crusader', 'French king', 'Pope', 'Viking leader'], correct: 0 },
      { q: 'What was the Hundred Years War?', opts: ['War between England and France', 'Civil war', 'Crusade', 'Viking invasion'], correct: 0 },
      { q: 'Who was Joan of Arc?', opts: ['French heroine', 'English queen', 'Italian artist', 'Spanish explorer'], correct: 0 },
      { q: 'What was the Domesday Book?', opts: ['English survey record', 'Religious text', 'Map', 'Story book'], correct: 0 },
      { q: 'What was the Wars of the Roses?', opts: ['English civil war', 'French revolution', 'Crusade', 'Viking invasion'], correct: 0 },
      { q: 'Who were the Plantagenets?', opts: ['English royal family', 'French nobles', 'Vikings', 'Romans'], correct: 0 },
      { q: 'What was a guild?', opts: ['Trade association', 'Military group', 'Religious order', 'Royal family'], correct: 0 },
      { q: 'What was the role of the Church in medieval times?', opts: ['Central to daily life', 'Unimportant', 'Only for kings', 'Not yet invented'], correct: 0 },
      { q: 'What was villeinage?', opts: ['Serfdom system', 'Castle type', 'Weapon', 'Trade route'], correct: 0 },
      { q: 'What sparked the Peasants\' Revolt?', opts: ['Poll tax', 'War', 'Famine', 'Plague only'], correct: 0 },
      { q: 'Who was Thomas Becket?', opts: ['Archbishop murdered in Canterbury', 'King', 'Knight', 'Peasant leader'], correct: 0 },
      { q: 'What was a medieval manor?', opts: ['Self-sufficient estate', 'Castle', 'Town', 'Church'], correct: 0 },
      { q: 'What language did Norman rulers speak?', opts: ['French', 'English', 'Latin only', 'German'], correct: 0 },
      { q: 'What was trial by combat?', opts: ['Fighting to prove innocence', 'Military training', 'Tournament', 'Execution'], correct: 0 },
      { q: 'What was the Tower of London used for?', opts: ['Prison and palace', 'Church', 'Market', 'School'], correct: 0 },
      { q: 'Who were the Templars?', opts: ['Military monks', 'Viking raiders', 'Roman soldiers', 'Greek philosophers'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('medieval', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  modern: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What do we celebrate on Remembrance Day?', opts: ['Soldiers who fought in wars', 'Birthdays', 'Christmas', 'Easter'], correct: 0 },
        { q: 'What is a museum?', opts: ['A place with old things', 'A playground', 'A shop', 'A school'], correct: 0 },
        { q: 'What did people travel in before cars?', opts: ['Horse and carts', 'Planes', 'Rockets', 'Submarines'], correct: 0 },
        { q: 'Who was Florence Nightingale?', opts: ['A famous nurse', 'A queen', 'A scientist', 'A teacher'], correct: 0 },
        { q: 'What did people use before telephones?', opts: ['Letters', 'Emails', 'Texts', 'Video calls'], correct: 0 },
        { q: 'When were the first aeroplanes invented?', opts: ['About 120 years ago', '10 years ago', '500 years ago', 'Ancient times'], correct: 0 },
        { q: 'What is a poppy a symbol of?', opts: ['Remembrance', 'Happiness', 'Summer', 'Spring'], correct: 0 },
        { q: 'Who invented the telephone?', opts: ['Alexander Graham Bell', 'Thomas Edison', 'Albert Einstein', 'Isaac Newton'], correct: 0 },
        { q: 'What did children wear to school in Victorian times?', opts: ['Uniforms', 'Jeans', 'Shorts only', 'Nothing'], correct: 0 },
        { q: 'What did people use for light before electricity?', opts: ['Candles', 'Light bulbs', 'Phones', 'Computers'], correct: 0 },
        { q: 'Who was Neil Armstrong?', opts: ['First man on the moon', 'A king', 'A footballer', 'A doctor'], correct: 0 },
        { q: 'What year did the first man walk on the moon?', opts: ['1969', '1999', '1889', '2001'], correct: 0 },
        { q: 'What was the Titanic?', opts: ['A ship that sank', 'A plane', 'A car', 'A train'], correct: 0 },
        { q: 'What did Victorians use to take photos?', opts: ['Big cameras', 'Phones', 'Tablets', 'Nothing'], correct: 0 },
        { q: 'What were gaslights?', opts: ['Lights powered by gas', 'Electric lights', 'Candles', 'Torches'], correct: 0 },
        { q: 'What did the first trains run on?', opts: ['Steam', 'Electricity', 'Petrol', 'Solar power'], correct: 0 },
        { q: 'Who was Queen Victoria?', opts: ['A British queen', 'A French queen', 'A Russian queen', 'A German queen'], correct: 0 },
        { q: 'What is an invention?', opts: ['Something new that is created', 'An old thing', 'A type of food', 'A book'], correct: 0 },
        { q: 'What did children play with 100 years ago?', opts: ['Wooden toys', 'Video games', 'Tablets', 'Phones'], correct: 0 },
        { q: 'How did people travel long distances before planes?', opts: ['By ship', 'By rocket', 'They couldn\'t', 'By car only'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('modern', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'Who was Queen Victoria?', opts: ['A British Queen', 'A Roman Emperor', 'A Greek Goddess', 'An Egyptian Pharaoh'], correct: 0 },
        { q: 'What was the Blitz?', opts: ['Bombing of British cities', 'A type of food', 'A game', 'A celebration'], correct: 0 },
        { q: 'When was the Great Fire of London?', opts: ['1666', '1066', '1966', '1766'], correct: 0 },
        { q: 'What was the Industrial Revolution?', opts: ['Change from farming to factories', 'A war', 'A game', 'A type of government'], correct: 0 },
        { q: 'Who was Guy Fawkes?', opts: ['Tried to blow up Parliament', 'A king', 'A famous scientist', 'A soldier'], correct: 0 },
        { q: 'What was an air raid shelter?', opts: ['Protection from bombs', 'A type of plane', 'A house', 'A school'], correct: 0 },
        { q: 'What were evacuees?', opts: ['Children sent away from cities in war', 'Soldiers', 'Teachers', 'Farmers'], correct: 0 },
        { q: 'What was rationing?', opts: ['Limited food during war', 'A type of cooking', 'A sport', 'A game'], correct: 0 },
        { q: 'Who invented the steam engine?', opts: ['James Watt', 'Thomas Edison', 'Isaac Newton', 'Albert Einstein'], correct: 0 },
        { q: 'What was the Suffragette movement?', opts: ['Women fighting for the vote', 'A war', 'A type of government', 'A sport'], correct: 0 },
        { q: 'What did children work in during the Industrial Revolution?', opts: ['Factories and mines', 'Offices', 'Schools', 'Hospitals'], correct: 0 },
        { q: 'What was a workhouse?', opts: ['Place for the poor to work', 'A school', 'A hospital', 'A prison'], correct: 0 },
        { q: 'What was VE Day?', opts: ['Victory in Europe Day', 'Valentine\'s Day', 'Veterans Day', 'Voting Day'], correct: 0 },
        { q: 'Who was Winston Churchill?', opts: ['British Prime Minister in WWII', 'American President', 'German leader', 'French leader'], correct: 0 },
        { q: 'What was the Empire Windrush?', opts: ['Ship bringing Caribbean immigrants', 'A battle', 'A treaty', 'A palace'], correct: 0 },
        { q: 'What was the British Empire?', opts: ['Countries ruled by Britain', 'A shop', 'A game', 'A book'], correct: 0 },
        { q: 'When did World War II start?', opts: ['1939', '1914', '1945', '1918'], correct: 0 },
        { q: 'What was the Home Guard?', opts: ['Volunteer soldiers in WWII', 'Police', 'Firefighters', 'Doctors'], correct: 0 },
        { q: 'What was a gas mask used for?', opts: ['Protection from poison gas', 'Helping breathe underwater', 'Keeping warm', 'Seeing in the dark'], correct: 0 },
        { q: 'What was the Bletchley Park famous for?', opts: ['Breaking codes in WWII', 'A battle', 'A palace', 'A school'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('modern', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What year did World War I begin?', opts: ['1914', '1918', '1939', '1945'], correct: 0 },
      { q: 'What year did World War II end?', opts: ['1945', '1939', '1918', '1950'], correct: 0 },
      { q: 'Who was the British Prime Minister during WWII?', opts: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee', 'Harold Wilson'], correct: 0 },
      { q: 'When did the Berlin Wall fall?', opts: ['1989', '1979', '1991', '1969'], correct: 0 },
      { q: 'What was the Holocaust?', opts: ['Genocide of Jews by Nazis', 'A battle', 'A treaty', 'A revolution'], correct: 0 },
      { q: 'What was the Cold War?', opts: ['Tension between USA and USSR', 'A winter war', 'A trade war', 'A space race only'], correct: 0 },
      { q: 'Who was Adolf Hitler?', opts: ['Nazi dictator of Germany', 'American president', 'British king', 'Russian leader'], correct: 0 },
      { q: 'What was D-Day?', opts: ['Allied invasion of Normandy', 'End of WWI', 'Start of WWII', 'Berlin Wall fall'], correct: 0 },
      { q: 'What was the Treaty of Versailles?', opts: ['Peace treaty ending WWI', 'Start of WWII', 'Cold War treaty', 'Trade agreement'], correct: 0 },
      { q: 'Who was Martin Luther King Jr?', opts: ['Civil rights leader', 'US President', 'British PM', 'German leader'], correct: 0 },
      { q: 'What was the Moon landing year?', opts: ['1969', '1959', '1979', '1989'], correct: 0 },
      { q: 'What was the NHS founded?', opts: ['1948', '1918', '1968', '1988'], correct: 0 },
      { q: 'What was the Partition of India?', opts: ['Division into India and Pakistan', 'Unification', 'Colonial rule', 'Independence war'], correct: 0 },
      { q: 'What ended the British Empire?', opts: ['Decolonization', 'War', 'Famine', 'Revolution'], correct: 0 },
      { q: 'Who was Margaret Thatcher?', opts: ['First female British PM', 'Queen', 'Scientist', 'Author'], correct: 0 },
      { q: 'What was apartheid?', opts: ['Racial segregation in South Africa', 'A war', 'A treaty', 'An economic system'], correct: 0 },
      { q: 'When did the UK join the EU?', opts: ['1973', '1963', '1983', '1993'], correct: 0 },
      { q: 'What was the Cuban Missile Crisis?', opts: ['Nuclear standoff between USA and USSR', 'Caribbean war', 'Trade dispute', 'Space race event'], correct: 0 },
      { q: 'Who was Nelson Mandela?', opts: ['South African anti-apartheid leader', 'American president', 'British PM', 'Indian leader'], correct: 0 },
      { q: 'What year did Brexit happen?', opts: ['2020', '2016', '2018', '2022'], correct: 0 },
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
        { q: 'What is Buckingham Palace?', opts: ['Where the King lives', 'A museum', 'A school', 'A shop'], correct: 0 },
        { q: 'What is the Houses of Parliament?', opts: ['Where laws are made', 'A museum', 'A palace', 'A church'], correct: 0 },
        { q: 'Who was Henry VIII?', opts: ['A king with six wives', 'A scientist', 'A painter', 'A doctor'], correct: 0 },
        { q: 'What happened in 1066?', opts: ['Battle of Hastings', 'Great Fire', 'World War I', 'Moon landing'], correct: 0 },
        { q: 'What is the Tower of London?', opts: ['Historic castle and prison', 'A bridge', 'A park', 'A museum only'], correct: 0 },
        { q: 'Who was Elizabeth I?', opts: ['A Tudor queen', 'A Victorian queen', 'A modern queen', 'A French queen'], correct: 0 },
        { q: 'What is Stonehenge?', opts: ['Ancient stone monument', 'A castle', 'A cathedral', 'A bridge'], correct: 0 },
        { q: 'What does the Queen\'s Guard wear?', opts: ['Red uniforms and tall hats', 'Blue jeans', 'Armour', 'Normal clothes'], correct: 0 },
        { q: 'What river runs through London?', opts: ['Thames', 'Nile', 'Amazon', 'Seine'], correct: 0 },
        { q: 'What is the capital of Scotland?', opts: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Inverness'], correct: 0 },
        { q: 'What is the capital of Wales?', opts: ['Cardiff', 'Swansea', 'Newport', 'Bangor'], correct: 0 },
        { q: 'What is the national flower of England?', opts: ['Rose', 'Daffodil', 'Thistle', 'Shamrock'], correct: 0 },
        { q: 'What is the national flower of Scotland?', opts: ['Thistle', 'Rose', 'Daffodil', 'Shamrock'], correct: 0 },
        { q: 'What is the national flower of Wales?', opts: ['Daffodil', 'Rose', 'Thistle', 'Shamrock'], correct: 0 },
        { q: 'What sport was invented in England?', opts: ['Football', 'Basketball', 'Baseball', 'Ice hockey'], correct: 0 },
        { q: 'What is Fish and Chips?', opts: ['Traditional British food', 'A game', 'A sport', 'A dance'], correct: 0 },
        { q: 'What is the London Eye?', opts: ['A giant wheel', 'A tower', 'A bridge', 'A museum'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('british', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    const questions = [
      { q: 'How many wives did Henry VIII have?', opts: ['6', '4', '8', '3'], correct: 0 },
      { q: 'Who was the longest reigning British monarch?', opts: ['Queen Elizabeth II', 'Queen Victoria', 'King George III', 'King Henry VIII'], correct: 0 },
      { q: 'What year did the Gunpowder Plot happen?', opts: ['1605', '1666', '1066', '1805'], correct: 0 },
      { q: 'What was the English Civil War?', opts: ['War between King and Parliament', 'War with France', 'War with Spain', 'Religious war'], correct: 0 },
      { q: 'Who was Oliver Cromwell?', opts: ['Lord Protector after Civil War', 'King', 'Queen', 'Prime Minister'], correct: 0 },
      { q: 'What was the Restoration?', opts: ['Return of monarchy in 1660', 'Building restoration', 'Art movement', 'Political party'], correct: 0 },
      { q: 'What was the Glorious Revolution?', opts: ['1688 change of monarchy', 'French Revolution', 'American Revolution', 'Industrial Revolution'], correct: 0 },
      { q: 'Who was the first Prime Minister?', opts: ['Robert Walpole', 'Winston Churchill', 'William Pitt', 'Benjamin Disraeli'], correct: 0 },
      { q: 'What was the Act of Union 1707?', opts: ['Joined England and Scotland', 'Joined with Ireland', 'Left EU', 'Trade agreement'], correct: 0 },
      { q: 'Who was Anne Boleyn?', opts: ['Henry VIII\'s second wife', 'First wife', 'Last wife', 'Daughter'], correct: 0 },
      { q: 'What was the Reformation?', opts: ['Religious change from Catholic Church', 'Political reform', 'Economic change', 'Social movement'], correct: 0 },
      { q: 'Who was Mary Queen of Scots?', opts: ['Scottish queen executed by Elizabeth I', 'English queen', 'French queen', 'Spanish queen'], correct: 0 },
      { q: 'What was the Spanish Armada?', opts: ['Spanish fleet defeated by England', 'Trade ships', 'Fishing boats', 'Exploration fleet'], correct: 0 },
      { q: 'Who was Sir Francis Drake?', opts: ['English explorer and privateer', 'King', 'Scientist', 'Artist'], correct: 0 },
      { q: 'What was the British Raj?', opts: ['British rule of India', 'African colony', 'Caribbean territory', 'Australian settlement'], correct: 0 },
      { q: 'Who was Emmeline Pankhurst?', opts: ['Suffragette leader', 'Queen', 'Scientist', 'Writer'], correct: 0 },
      { q: 'What was the Reform Act 1832?', opts: ['Extended voting rights', 'Trade agreement', 'War treaty', 'Religious law'], correct: 0 },
      { q: 'Who was Sir Isaac Newton?', opts: ['British scientist', 'King', 'Explorer', 'Artist'], correct: 0 },
      { q: 'What was the Elizabethan era known for?', opts: ['Arts and exploration', 'Industrial growth', 'World wars', 'Feudalism'], correct: 0 },
      { q: 'What was the Stuart period?', opts: ['1603-1714 royal dynasty', 'Medieval era', 'Roman period', 'Modern era'], correct: 0 },
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
        { q: 'What is a lake?', opts: ['Water surrounded by land', 'A mountain', 'A desert', 'A forest'], correct: 0 },
        { q: 'What is a beach?', opts: ['Sandy shore by the sea', 'A mountain', 'A forest', 'A river'], correct: 0 },
        { q: 'What is rain?', opts: ['Water falling from clouds', 'A type of food', 'A mountain', 'A river'], correct: 0 },
        { q: 'What is a forest?', opts: ['Lots of trees together', 'A desert', 'An ocean', 'A city'], correct: 0 },
        { q: 'What is a hill?', opts: ['A small mountain', 'A river', 'A lake', 'A desert'], correct: 0 },
        { q: 'What is the sea?', opts: ['Salt water around land', 'Fresh water', 'A mountain', 'A desert'], correct: 0 },
        { q: 'What are waves?', opts: ['Moving water in the sea', 'Mountains', 'Clouds', 'Trees'], correct: 0 },
        { q: 'What is a waterfall?', opts: ['Water falling from high', 'A lake', 'A river', 'A mountain'], correct: 0 },
        { q: 'What is sand?', opts: ['Tiny bits of rock', 'Water', 'Grass', 'Wood'], correct: 0 },
        { q: 'What is a valley?', opts: ['Low land between hills', 'A high mountain', 'A lake', 'A river'], correct: 0 },
        { q: 'What is a cliff?', opts: ['Steep rock by the sea', 'A river', 'A lake', 'A forest'], correct: 0 },
        { q: 'What is an island?', opts: ['Land surrounded by water', 'A mountain', 'A lake', 'A river'], correct: 0 },
        { q: 'What is a pond?', opts: ['Small body of water', 'A mountain', 'A desert', 'A forest'], correct: 0 },
        { q: 'What is a cave?', opts: ['Hole in a mountain', 'A river', 'A lake', 'A tree'], correct: 0 },
        { q: 'What is snow?', opts: ['Frozen water from clouds', 'Rain', 'Sand', 'Leaves'], correct: 0 },
        { q: 'What is ice?', opts: ['Frozen water', 'Hot water', 'Steam', 'Sand'], correct: 0 },
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
        { q: 'What is the longest river in the world?', opts: ['River Nile', 'River Thames', 'River Amazon', 'River Severn'], correct: 0 },
        { q: 'What is a glacier?', opts: ['A river of ice', 'A mountain', 'A volcano', 'A lake'], correct: 0 },
        { q: 'What is a delta?', opts: ['Where river meets sea', 'A mountain', 'A lake', 'A desert'], correct: 0 },
        { q: 'What is a peninsula?', opts: ['Land surrounded by water on 3 sides', 'An island', 'A mountain', 'A river'], correct: 0 },
        { q: 'What is an archipelago?', opts: ['Group of islands', 'Single island', 'Mountain range', 'Desert'], correct: 0 },
        { q: 'What is a plateau?', opts: ['Flat high land', 'Low land', 'A valley', 'A lake'], correct: 0 },
        { q: 'What causes tides?', opts: ['The Moon', 'The Sun only', 'Wind', 'Rain'], correct: 0 },
        { q: 'What is erosion?', opts: ['Wearing away of rock', 'Building up of rock', 'Making water', 'Growing plants'], correct: 0 },
        { q: 'What is a gorge?', opts: ['Deep valley with steep sides', 'A mountain', 'A lake', 'A river'], correct: 0 },
        { q: 'What is a canyon?', opts: ['Deep valley carved by river', 'A mountain', 'A lake', 'A desert'], correct: 0 },
        { q: 'What is a reef?', opts: ['Underwater ridge', 'A mountain', 'A lake', 'A forest'], correct: 0 },
        { q: 'What is a lagoon?', opts: ['Shallow water by sea', 'Deep ocean', 'A mountain', 'A desert'], correct: 0 },
        { q: 'What is a bay?', opts: ['Curved coastline with water', 'A mountain', 'A lake', 'A desert'], correct: 0 },
        { q: 'What is a cape?', opts: ['Point of land into sea', 'An island', 'A mountain', 'A lake'], correct: 0 },
        { q: 'What is a strait?', opts: ['Narrow water between land', 'Wide ocean', 'A mountain', 'A desert'], correct: 0 },
        { q: 'What is a fjord?', opts: ['Deep inlet from sea', 'A mountain', 'A lake', 'A desert'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('physical', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the largest ocean on Earth?', opts: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'], correct: 0 },
      { q: 'What causes earthquakes?', opts: ['Tectonic plate movement', 'Volcanic activity', 'Wind', 'Ocean currents'], correct: 0 },
      { q: 'What type of rock is formed from cooled lava?', opts: ['Igneous', 'Sedimentary', 'Metamorphic', 'Calcium'], correct: 0 },
      { q: 'What is the largest desert in the world?', opts: ['Antarctic Desert', 'Sahara', 'Gobi', 'Arabian'], correct: 0 },
      { q: 'What are tectonic plates?', opts: ['Pieces of Earth\'s crust', 'Types of rock', 'Ocean currents', 'Weather patterns'], correct: 0 },
      { q: 'What is the Ring of Fire?', opts: ['Pacific volcanic zone', 'African desert', 'Arctic region', 'Mountain range'], correct: 0 },
      { q: 'What is a tsunami?', opts: ['Giant ocean wave', 'Type of volcano', 'Desert wind', 'Mountain'], correct: 0 },
      { q: 'What are sedimentary rocks?', opts: ['Formed from layers', 'Formed from lava', 'Formed from heat', 'Formed from crystals'], correct: 0 },
      { q: 'What is the water cycle?', opts: ['Evaporation and precipitation', 'Ocean currents', 'Wind patterns', 'Mountain formation'], correct: 0 },
      { q: 'What is a fault line?', opts: ['Crack in Earth\'s crust', 'River valley', 'Mountain peak', 'Ocean trench'], correct: 0 },
      { q: 'What is magma?', opts: ['Molten rock underground', 'Solid rock', 'Ocean water', 'Desert sand'], correct: 0 },
      { q: 'What is lava?', opts: ['Molten rock above ground', 'Solid rock', 'Ocean water', 'Ice'], correct: 0 },
      { q: 'What is the continental shelf?', opts: ['Shallow ocean floor near land', 'Deep ocean', 'Mountain', 'Desert'], correct: 0 },
      { q: 'What is weathering?', opts: ['Breaking down of rock', 'Moving of rock', 'Heating of rock', 'Growing of rock'], correct: 0 },
      { q: 'What is deposition?', opts: ['Dropping of sediment', 'Picking up sediment', 'Heating of rock', 'Melting of ice'], correct: 0 },
      { q: 'What is the mantle?', opts: ['Layer below Earth\'s crust', 'The surface', 'The core', 'The atmosphere'], correct: 0 },
      { q: 'What is the core of Earth made of?', opts: ['Iron and nickel', 'Rock only', 'Water', 'Air'], correct: 0 },
      { q: 'What is an oxbow lake?', opts: ['Curved lake from old river', 'Mountain lake', 'Ocean inlet', 'Glacier lake'], correct: 0 },
      { q: 'What is a meander?', opts: ['River bend', 'Mountain peak', 'Ocean trench', 'Desert dune'], correct: 0 },
      { q: 'What are stalactites?', opts: ['Cave formations hanging down', 'Cave formations going up', 'Mountains', 'Rivers'], correct: 0 },
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
        { q: 'What is a town?', opts: ['A place where people live', 'A forest', 'An ocean', 'A mountain'], correct: 0 },
        { q: 'What is a village?', opts: ['A small place with houses', 'A big city', 'An ocean', 'A mountain'], correct: 0 },
        { q: 'What is a road for?', opts: ['Cars and people to travel', 'Swimming', 'Flying', 'Sleeping'], correct: 0 },
        { q: 'What is a school?', opts: ['Where children learn', 'Where we sleep', 'Where we swim', 'Where we fly'], correct: 0 },
        { q: 'What is a shop?', opts: ['Where we buy things', 'Where we sleep', 'Where we swim', 'Where we fly'], correct: 0 },
        { q: 'What is a hospital?', opts: ['Where sick people get better', 'A shop', 'A school', 'A park'], correct: 0 },
        { q: 'What is a park?', opts: ['A place to play outside', 'A shop', 'A school', 'A hospital'], correct: 0 },
        { q: 'What is a farm?', opts: ['Where food is grown', 'A city', 'A beach', 'A mountain'], correct: 0 },
        { q: 'What is a bridge?', opts: ['Goes over water or roads', 'A building', 'A car', 'A tree'], correct: 0 },
        { q: 'What is a harbour?', opts: ['Where boats park', 'A car park', 'A airport', 'A train station'], correct: 0 },
        { q: 'What is an airport?', opts: ['Where planes land', 'Where boats dock', 'Where trains stop', 'Where cars park'], correct: 0 },
        { q: 'What is a factory?', opts: ['Where things are made', 'Where we sleep', 'Where we play', 'Where we swim'], correct: 0 },
        { q: 'What country is Paris in?', opts: ['France', 'England', 'Spain', 'Italy'], correct: 0 },
        { q: 'What is a map?', opts: ['Picture of a place', 'A type of food', 'A game', 'A book'], correct: 0 },
        { q: 'What does a postman deliver?', opts: ['Letters', 'Food', 'Toys', 'Clothes'], correct: 0 },
        { q: 'What is a library?', opts: ['Where we borrow books', 'A shop', 'A hospital', 'A park'], correct: 0 },
        { q: 'What is a supermarket?', opts: ['A big shop for food', 'A hospital', 'A school', 'A park'], correct: 0 },
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
        { q: 'What is the capital of the USA?', opts: ['Washington DC', 'New York', 'Los Angeles', 'Chicago'], correct: 0 },
        { q: 'What is the capital of Germany?', opts: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'], correct: 0 },
        { q: 'What is the capital of Spain?', opts: ['Madrid', 'Barcelona', 'Seville', 'Valencia'], correct: 0 },
        { q: 'What is the capital of China?', opts: ['Beijing', 'Shanghai', 'Hong Kong', 'Tokyo'], correct: 0 },
        { q: 'What is the capital of Japan?', opts: ['Tokyo', 'Osaka', 'Kyoto', 'Beijing'], correct: 0 },
        { q: 'What is immigration?', opts: ['Moving to a new country', 'Leaving a country', 'Building houses', 'Farming'], correct: 0 },
        { q: 'What is emigration?', opts: ['Leaving your country', 'Coming to a country', 'Building houses', 'Farming'], correct: 0 },
        { q: 'What is a border?', opts: ['Line between countries', 'A river', 'A mountain', 'A city'], correct: 0 },
        { q: 'What is trade?', opts: ['Buying and selling', 'Swimming', 'Sleeping', 'Running'], correct: 0 },
        { q: 'What is a port?', opts: ['Where ships load goods', 'Where planes land', 'Where trains stop', 'Where cars park'], correct: 0 },
        { q: 'What is a population?', opts: ['Number of people living somewhere', 'Number of animals', 'Number of trees', 'Number of buildings'], correct: 0 },
        { q: 'What is a settlement?', opts: ['Place where people live', 'A mountain', 'A river', 'A forest'], correct: 0 },
        { q: 'What is tourism?', opts: ['Visiting places on holiday', 'Going to work', 'Going to school', 'Going shopping'], correct: 0 },
        { q: 'What is agriculture?', opts: ['Farming', 'Building', 'Teaching', 'Driving'], correct: 0 },
        { q: 'What are natural resources?', opts: ['Things from nature we use', 'Made in factories', 'Toys', 'Books'], correct: 0 },
        { q: 'What is pollution?', opts: ['Damage to environment', 'Cleaning', 'Building', 'Farming'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('human', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is the most populated country?', opts: ['India', 'China', 'USA', 'Indonesia'], correct: 0 },
      { q: 'What is urbanisation?', opts: ['Movement to cities', 'Movement to countryside', 'Building roads', 'Farming'], correct: 0 },
      { q: 'What is the capital of Australia?', opts: ['Canberra', 'Sydney', 'Melbourne', 'Perth'], correct: 0 },
      { q: 'What is the smallest country in the world?', opts: ['Vatican City', 'Monaco', 'San Marino', 'Luxembourg'], correct: 0 },
      { q: 'What is GDP?', opts: ['Measure of economic output', 'Population count', 'Land area', 'Weather pattern'], correct: 0 },
      { q: 'What is a megacity?', opts: ['City with 10+ million people', 'Capital city', 'Small town', 'Village'], correct: 0 },
      { q: 'What is globalisation?', opts: ['Countries becoming connected', 'Countries separating', 'Building walls', 'Local trade only'], correct: 0 },
      { q: 'What is sustainable development?', opts: ['Meeting needs without harming future', 'Using all resources', 'Building fast', 'Ignoring environment'], correct: 0 },
      { q: 'What is a developing country?', opts: ['Lower income country', 'Rich country', 'Island nation', 'European country'], correct: 0 },
      { q: 'What is infrastructure?', opts: ['Roads, bridges, utilities', 'Houses only', 'Farms only', 'Shops only'], correct: 0 },
      { q: 'What is rural-urban migration?', opts: ['Moving from countryside to city', 'Moving from city to countryside', 'Moving between cities', 'Not moving'], correct: 0 },
      { q: 'What is a refugee?', opts: ['Person fleeing danger', 'Tourist', 'Business traveler', 'Student'], correct: 0 },
      { q: 'What is deforestation?', opts: ['Cutting down forests', 'Planting forests', 'Protecting forests', 'Studying forests'], correct: 0 },
      { q: 'What is fair trade?', opts: ['Better prices for producers', 'Free products', 'No trade', 'Expensive products'], correct: 0 },
      { q: 'What is the EU?', opts: ['European Union', 'Eastern Union', 'Economic Union', 'English Union'], correct: 0 },
      { q: 'What is a landlocked country?', opts: ['No coast', 'Surrounded by water', 'Island nation', 'Coastal nation'], correct: 0 },
      { q: 'What is a time zone?', opts: ['Area with same time', 'Weather zone', 'Trade zone', 'War zone'], correct: 0 },
      { q: 'What is the Commonwealth?', opts: ['Association of nations', 'A country', 'A city', 'A continent'], correct: 0 },
      { q: 'What is the UN?', opts: ['United Nations', 'Universal Nations', 'Union of Nations', 'Upper Nations'], correct: 0 },
      { q: 'What is a developed country?', opts: ['High income country', 'Poor country', 'New country', 'Old country'], correct: 0 },
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
        { q: 'What is windy weather?', opts: ['When air moves fast', 'When rain falls', 'When sun shines', 'When snow falls'], correct: 0 },
        { q: 'What is sunny weather?', opts: ['When sun shines bright', 'When rain falls', 'When wind blows', 'When snow falls'], correct: 0 },
        { q: 'What do we wear when it rains?', opts: ['Raincoat', 'Swimsuit', 'Shorts', 'Sunglasses'], correct: 0 },
        { q: 'What season has Christmas?', opts: ['Winter', 'Summer', 'Spring', 'Autumn'], correct: 0 },
        { q: 'What season has Easter?', opts: ['Spring', 'Summer', 'Winter', 'Autumn'], correct: 0 },
        { q: 'What happens in autumn?', opts: ['Leaves fall', 'Snow falls', 'Flowers bloom', 'It gets hot'], correct: 0 },
        { q: 'What happens in spring?', opts: ['Flowers grow', 'Snow falls', 'Leaves fall', 'It gets cold'], correct: 0 },
        { q: 'What is fog?', opts: ['Clouds near the ground', 'Rain', 'Snow', 'Wind'], correct: 0 },
        { q: 'What is hail?', opts: ['Ice balls from clouds', 'Rain', 'Snow', 'Wind'], correct: 0 },
        { q: 'What is frost?', opts: ['Ice on the ground', 'Rain', 'Snow', 'Wind'], correct: 0 },
        { q: 'What colour are rain clouds?', opts: ['Grey', 'White', 'Blue', 'Red'], correct: 0 },
        { q: 'What do we use to measure rain?', opts: ['Rain gauge', 'Thermometer', 'Ruler', 'Scale'], correct: 0 },
        { q: 'What do we use to measure temperature?', opts: ['Thermometer', 'Rain gauge', 'Ruler', 'Scale'], correct: 0 },
        { q: 'Is summer hot or cold?', opts: ['Hot', 'Cold', 'Rainy', 'Snowy'], correct: 0 },
        { q: 'Is winter hot or cold?', opts: ['Cold', 'Hot', 'Sunny', 'Dry'], correct: 0 },
        { q: 'What makes puddles?', opts: ['Rain', 'Sun', 'Wind', 'Snow'], correct: 0 },
        { q: 'What melts snow?', opts: ['Sun and warmth', 'More snow', 'Wind', 'Rain only'], correct: 0 },
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
        { q: 'What is climate?', opts: ['Average weather over years', 'Today\'s weather', 'Yesterday\'s weather', 'A type of plant'], correct: 0 },
        { q: 'What is a drought?', opts: ['Long period without rain', 'Lots of rain', 'Lots of snow', 'Lots of wind'], correct: 0 },
        { q: 'What is a flood?', opts: ['Too much water on land', 'No water', 'Strong wind', 'Lots of snow'], correct: 0 },
        { q: 'What is a hurricane?', opts: ['Powerful storm with wind', 'Light rain', 'Sunshine', 'Snow'], correct: 0 },
        { q: 'What is a tornado?', opts: ['Spinning column of air', 'Heavy rain', 'Heavy snow', 'Sunshine'], correct: 0 },
        { q: 'What causes wind?', opts: ['Differences in air pressure', 'The Sun', 'The Moon', 'The ocean'], correct: 0 },
        { q: 'What is precipitation?', opts: ['Rain, snow, sleet, hail', 'Just rain', 'Just snow', 'Just wind'], correct: 0 },
        { q: 'What is humidity?', opts: ['Water in the air', 'Temperature', 'Wind speed', 'Air pressure'], correct: 0 },
        { q: 'What is a monsoon?', opts: ['Seasonal heavy rain', 'Light rain', 'Snow storm', 'Wind storm'], correct: 0 },
        { q: 'What is the equator?', opts: ['Line around middle of Earth', 'Line from top to bottom', 'A country', 'A continent'], correct: 0 },
        { q: 'Why is it hot near the equator?', opts: ['Sun is more direct', 'Closer to Sun', 'No clouds', 'More land'], correct: 0 },
        { q: 'Why are poles cold?', opts: ['Sun hits at an angle', 'Further from Sun', 'More clouds', 'More water'], correct: 0 },
        { q: 'What is a biome?', opts: ['Large area with same climate', 'A country', 'A city', 'A mountain'], correct: 0 },
        { q: 'What is a tropical climate?', opts: ['Hot and wet all year', 'Cold and dry', 'Hot and dry', 'Cold and wet'], correct: 0 },
        { q: 'What is a desert climate?', opts: ['Hot and dry', 'Cold and wet', 'Hot and wet', 'Cold and dry'], correct: 0 },
        { q: 'What is a polar climate?', opts: ['Very cold all year', 'Very hot all year', 'Mild all year', 'Wet all year'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('climate', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What gas is causing global warming?', opts: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'], correct: 0 },
      { q: 'What is the greenhouse effect?', opts: ['Trapping of heat by gases', 'Plant growth', 'Cooling effect', 'Rain formation'], correct: 0 },
      { q: 'What is a renewable energy source?', opts: ['Solar power', 'Coal', 'Oil', 'Natural gas'], correct: 0 },
      { q: 'What causes seasons on Earth?', opts: ["Earth's tilt", 'Distance from sun', 'Moon phases', 'Ocean currents'], correct: 0 },
      { q: 'What is climate change?', opts: ['Long-term shift in weather patterns', 'Daily weather', 'Season change', 'Time zone'], correct: 0 },
      { q: 'What is the ozone layer?', opts: ['Protects from UV rays', 'Causes rain', 'Creates wind', 'Makes clouds'], correct: 0 },
      { q: 'What is carbon footprint?', opts: ['CO2 emissions from activity', 'Shoe size', 'Land area', 'Population'], correct: 0 },
      { q: 'What is El Niño?', opts: ['Pacific Ocean warming', 'Atlantic storm', 'Arctic ice', 'European wind'], correct: 0 },
      { q: 'What is La Niña?', opts: ['Pacific Ocean cooling', 'Atlantic warming', 'Arctic melting', 'European storm'], correct: 0 },
      { q: 'What are fossil fuels?', opts: ['Coal, oil, natural gas', 'Solar and wind', 'Nuclear power', 'Hydroelectric'], correct: 0 },
      { q: 'What is ocean acidification?', opts: ['CO2 making oceans more acidic', 'Pollution', 'Oil spills', 'Fishing'], correct: 0 },
      { q: 'What is permafrost?', opts: ['Permanently frozen ground', 'Seasonal ice', 'Glacier', 'Snow'], correct: 0 },
      { q: 'What is albedo?', opts: ['How much light is reflected', 'Temperature', 'Pressure', 'Humidity'], correct: 0 },
      { q: 'What is a carbon sink?', opts: ['Absorbs more CO2 than releases', 'Releases CO2', 'No effect on CO2', 'Creates CO2'], correct: 0 },
      { q: 'What is biodiversity?', opts: ['Variety of life', 'Single species', 'Climate type', 'Weather pattern'], correct: 0 },
      { q: 'What is wind power?', opts: ['Electricity from wind turbines', 'Electricity from sun', 'Electricity from water', 'Electricity from coal'], correct: 0 },
      { q: 'What is hydroelectric power?', opts: ['Electricity from water', 'Electricity from wind', 'Electricity from sun', 'Electricity from coal'], correct: 0 },
      { q: 'What is geothermal energy?', opts: ['Heat from Earth\'s interior', 'Solar heat', 'Wind power', 'Coal power'], correct: 0 },
      { q: 'What is desertification?', opts: ['Land becoming desert', 'Forest growth', 'Glacier melting', 'Sea level rise'], correct: 0 },
      { q: 'What is the Paris Agreement?', opts: ['Climate change treaty', 'Trade deal', 'War treaty', 'Border agreement'], correct: 0 },
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
      { q: 'What is the capital of Canada?', opts: ['Ottawa', 'Toronto', 'Vancouver', 'Montreal'], correct: 0 },
      { q: 'What is the capital of India?', opts: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], correct: 0 },
      { q: 'What is the capital of Brazil?', opts: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'], correct: 0 },
      { q: 'What continent is India in?', opts: ['Asia', 'Africa', 'Europe', 'Australia'], correct: 0 },
      { q: 'What is the largest country in Africa?', opts: ['Algeria', 'Sudan', 'Nigeria', 'Egypt'], correct: 0 },
      { q: 'What is the smallest continent?', opts: ['Australia', 'Europe', 'Antarctica', 'South America'], correct: 0 },
      { q: 'What ocean is the largest?', opts: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], correct: 0 },
      { q: 'What is the capital of South Africa?', opts: ['Pretoria', 'Cape Town', 'Johannesburg', 'Durban'], correct: 0 },
      { q: 'What is the capital of Egypt?', opts: ['Cairo', 'Alexandria', 'Luxor', 'Giza'], correct: 0 },
      { q: 'What continent is Nigeria in?', opts: ['Africa', 'Asia', 'Europe', 'South America'], correct: 0 },
      { q: 'What is the capital of Mexico?', opts: ['Mexico City', 'Cancun', 'Guadalajara', 'Monterrey'], correct: 0 },
      { q: 'What continent is Argentina in?', opts: ['South America', 'Europe', 'Africa', 'Asia'], correct: 0 },
      { q: 'What is the capital of Russia?', opts: ['Moscow', 'St Petersburg', 'Kiev', 'Minsk'], correct: 0 },
      { q: 'What is the capital of Greece?', opts: ['Athens', 'Sparta', 'Crete', 'Rhodes'], correct: 0 },
      { q: 'What is the capital of Thailand?', opts: ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya'], correct: 0 },
      { q: 'What is the capital of Netherlands?', opts: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht'], correct: 0 },
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
        { q: 'What shape is a football?', opts: ['Round', 'Square', 'Triangle', 'Rectangle'], correct: 0 },
        { q: 'What colour is the sky?', opts: ['Blue', 'Green', 'Red', 'Yellow'], correct: 0 },
        { q: 'How many eyes do you have?', opts: ['2', '1', '3', '4'], correct: 0 },
        { q: 'What do we drink when thirsty?', opts: ['Water', 'Stones', 'Paper', 'Wood'], correct: 0 },
        { q: 'What do bees make?', opts: ['Honey', 'Milk', 'Butter', 'Cheese'], correct: 0 },
        { q: 'What is the first letter of the alphabet?', opts: ['A', 'B', 'C', 'Z'], correct: 0 },
        { q: 'What season is coldest?', opts: ['Winter', 'Summer', 'Spring', 'Autumn'], correct: 0 },
        { q: 'What do we wear on our feet?', opts: ['Shoes', 'Gloves', 'Hats', 'Scarves'], correct: 0 },
        { q: 'How many ears do you have?', opts: ['2', '1', '3', '4'], correct: 0 },
        { q: 'What colour are leaves in summer?', opts: ['Green', 'Brown', 'White', 'Blue'], correct: 0 },
        { q: 'What do we use to write?', opts: ['Pencil', 'Fork', 'Spoon', 'Cup'], correct: 0 },
        { q: 'What number comes after 5?', opts: ['6', '4', '7', '8'], correct: 0 },
        { q: 'What do we sleep in at night?', opts: ['Bed', 'Car', 'Bath', 'Kitchen'], correct: 0 },
        { q: 'What colour is a fire engine?', opts: ['Red', 'Blue', 'Green', 'Yellow'], correct: 0 },
        { q: 'What do fish live in?', opts: ['Water', 'Trees', 'Sky', 'Ground'], correct: 0 },
        { q: 'What do we eat for breakfast?', opts: ['Cereal', 'Dinner', 'Lunch', 'Supper'], correct: 0 },
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
        { q: 'What is the tallest animal?', opts: ['Giraffe', 'Elephant', 'Horse', 'Lion'], correct: 0 },
        { q: 'How many legs does a spider have?', opts: ['8', '6', '10', '4'], correct: 0 },
        { q: 'What planet do we live on?', opts: ['Earth', 'Mars', 'Venus', 'Jupiter'], correct: 0 },
        { q: 'What is the opposite of hot?', opts: ['Cold', 'Warm', 'Cool', 'Mild'], correct: 0 },
        { q: 'How many hours in a day?', opts: ['24', '12', '48', '36'], correct: 0 },
        { q: 'What is the biggest mammal?', opts: ['Blue whale', 'Elephant', 'Giraffe', 'Hippo'], correct: 0 },
        { q: 'How many sides does a hexagon have?', opts: ['6', '5', '7', '8'], correct: 0 },
        { q: 'What do caterpillars turn into?', opts: ['Butterflies', 'Bees', 'Birds', 'Beetles'], correct: 0 },
        { q: 'How many weeks in a year?', opts: ['52', '48', '50', '54'], correct: 0 },
        { q: 'What is frozen water called?', opts: ['Ice', 'Steam', 'Vapour', 'Cloud'], correct: 0 },
        { q: 'How many teeth does an adult have?', opts: ['32', '20', '28', '36'], correct: 0 },
        { q: 'What is baby sheep called?', opts: ['Lamb', 'Calf', 'Kid', 'Foal'], correct: 0 },
        { q: 'How many minutes in an hour?', opts: ['60', '30', '100', '45'], correct: 0 },
        { q: 'What is the largest ocean?', opts: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], correct: 0 },
        { q: 'What gas do we breathe in?', opts: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Helium'], correct: 0 },
        { q: 'How many bones in human body?', opts: ['206', '150', '300', '100'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('trivia', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'How many days are in a leap year?', opts: ['366', '365', '364', '367'], correct: 0 },
      { q: 'What is the fastest land animal?', opts: ['Cheetah', 'Lion', 'Horse', 'Leopard'], correct: 0 },
      { q: 'What year did the Titanic sink?', opts: ['1912', '1920', '1905', '1918'], correct: 0 },
      { q: 'What is the hardest natural substance?', opts: ['Diamond', 'Gold', 'Iron', 'Platinum'], correct: 0 },
      { q: 'Who painted the Mona Lisa?', opts: ['Leonardo da Vinci', 'Picasso', 'Van Gogh', 'Michelangelo'], correct: 0 },
      { q: 'What is the speed of light?', opts: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'], correct: 0 },
      { q: 'What is the chemical symbol for gold?', opts: ['Au', 'Ag', 'Go', 'Gd'], correct: 0 },
      { q: 'Who wrote Romeo and Juliet?', opts: ['Shakespeare', 'Dickens', 'Austen', 'Chaucer'], correct: 0 },
      { q: 'What is the smallest planet?', opts: ['Mercury', 'Mars', 'Venus', 'Pluto'], correct: 0 },
      { q: 'How many chambers does the heart have?', opts: ['4', '2', '3', '6'], correct: 0 },
      { q: 'What is the longest bone in the body?', opts: ['Femur', 'Tibia', 'Humerus', 'Spine'], correct: 0 },
      { q: 'What is the capital of Japan?', opts: ['Tokyo', 'Osaka', 'Kyoto', 'Nagoya'], correct: 0 },
      { q: 'Who invented the telephone?', opts: ['Alexander Graham Bell', 'Edison', 'Tesla', 'Marconi'], correct: 0 },
      { q: 'What is the largest country?', opts: ['Russia', 'Canada', 'USA', 'China'], correct: 0 },
      { q: 'How many elements in periodic table?', opts: ['118', '100', '150', '92'], correct: 0 },
      { q: 'What year was World War II ended?', opts: ['1945', '1944', '1946', '1943'], correct: 0 },
      { q: 'What is the longest river?', opts: ['Nile', 'Amazon', 'Mississippi', 'Yangtze'], correct: 0 },
      { q: 'Who discovered gravity?', opts: ['Newton', 'Einstein', 'Galileo', 'Darwin'], correct: 0 },
      { q: 'What is the hottest planet?', opts: ['Venus', 'Mercury', 'Mars', 'Jupiter'], correct: 0 },
      { q: 'How many strings on a violin?', opts: ['4', '5', '6', '3'], correct: 0 },
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
        { q: 'What do you swim in?', opts: ['Water', 'Sand', 'Grass', 'Air'], correct: 0 },
        { q: 'What do you hit in tennis?', opts: ['A ball', 'A puck', 'A shuttlecock', 'A disc'], correct: 0 },
        { q: 'What do you wear to protect your head?', opts: ['Helmet', 'Gloves', 'Shoes', 'Shorts'], correct: 0 },
        { q: 'What do you run on in athletics?', opts: ['A track', 'A pitch', 'A court', 'A rink'], correct: 0 },
        { q: 'What colour is a cricket ball?', opts: ['Red', 'Blue', 'Green', 'Yellow'], correct: 0 },
        { q: 'What do you bounce in basketball?', opts: ['A ball', 'A bat', 'A puck', 'A disc'], correct: 0 },
        { q: 'What do gymnasts jump on?', opts: ['A trampoline', 'A ball', 'A net', 'A stick'], correct: 0 },
        { q: 'What do you ride in cycling?', opts: ['A bike', 'A car', 'A boat', 'A plane'], correct: 0 },
        { q: 'What do swimmers wear?', opts: ['Swimsuit', 'Coat', 'Jeans', 'Jumper'], correct: 0 },
        { q: 'What do you catch in cricket?', opts: ['A ball', 'A bat', 'A net', 'A stick'], correct: 0 },
        { q: 'What do you throw in javelin?', opts: ['A spear', 'A ball', 'A disc', 'A hammer'], correct: 0 },
        { q: 'What sport uses a racket?', opts: ['Tennis', 'Football', 'Swimming', 'Running'], correct: 0 },
        { q: 'What sport uses a bat?', opts: ['Cricket', 'Tennis', 'Swimming', 'Running'], correct: 0 },
        { q: 'What sport is played in water?', opts: ['Swimming', 'Football', 'Tennis', 'Running'], correct: 0 },
        { q: 'What do you score in football?', opts: ['Goals', 'Points', 'Runs', 'Tries'], correct: 0 },
        { q: 'What do you score in basketball?', opts: ['Points', 'Goals', 'Runs', 'Tries'], correct: 0 },
        { q: 'What colour is a tennis ball?', opts: ['Yellow', 'Red', 'Blue', 'White'], correct: 0 },
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
        { q: 'How many players in a netball team?', opts: ['7', '5', '9', '11'], correct: 0 },
        { q: 'What sport uses a puck?', opts: ['Ice hockey', 'Football', 'Tennis', 'Cricket'], correct: 0 },
        { q: 'How long is a marathon?', opts: ['26.2 miles', '20 miles', '30 miles', '25 miles'], correct: 0 },
        { q: 'What sport has a scrum?', opts: ['Rugby', 'Football', 'Tennis', 'Cricket'], correct: 0 },
        { q: 'How many sets in tennis match?', opts: ['3 or 5', '2 or 4', '4 or 6', '1 or 3'], correct: 0 },
        { q: 'What is an ace in tennis?', opts: ['Unreturned serve', 'A fault', 'A rally', 'A match'], correct: 0 },
        { q: 'What sport has a wicket?', opts: ['Cricket', 'Football', 'Tennis', 'Rugby'], correct: 0 },
        { q: 'How many points for a try in rugby?', opts: ['5', '3', '6', '7'], correct: 0 },
        { q: 'What is a hat-trick?', opts: ['3 goals', '2 goals', '4 goals', '5 goals'], correct: 0 },
        { q: 'What sport has a half-time?', opts: ['Football', 'Tennis', 'Golf', 'Swimming'], correct: 0 },
        { q: 'How many overs in T20 cricket?', opts: ['20', '50', '10', '40'], correct: 0 },
        { q: 'What is the Tour de France?', opts: ['Cycling race', 'Running race', 'Swimming race', 'Car race'], correct: 0 },
        { q: 'What sport uses a shuttlecock?', opts: ['Badminton', 'Tennis', 'Squash', 'Cricket'], correct: 0 },
        { q: 'How many players in basketball team?', opts: ['5', '7', '9', '11'], correct: 0 },
        { q: 'What is the World Cup?', opts: ['Football tournament', 'Tennis tournament', 'Golf tournament', 'Cricket only'], correct: 0 },
        { q: 'What sport has a referee?', opts: ['Football', 'Tennis', 'Golf', 'Swimming'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('sports', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What sport uses a shuttlecock?', opts: ['Badminton', 'Tennis', 'Squash', 'Table tennis'], correct: 0 },
      { q: 'How many points is a try worth in rugby?', opts: ['5', '3', '6', '7'], correct: 0 },
      { q: 'How long is an Olympic swimming pool?', opts: ['50 metres', '25 metres', '100 metres', '75 metres'], correct: 0 },
      { q: 'How many holes are on a golf course?', opts: ['18', '9', '12', '21'], correct: 0 },
      { q: 'Who has won the most Grand Slams?', opts: ['Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'Pete Sampras'], correct: 0 },
      { q: 'What country invented football?', opts: ['England', 'Brazil', 'Spain', 'Italy'], correct: 0 },
      { q: 'How many players in volleyball team?', opts: ['6', '5', '7', '8'], correct: 0 },
      { q: 'What is the 100m world record?', opts: ['9.58 seconds', '9.74 seconds', '10.01 seconds', '9.87 seconds'], correct: 0 },
      { q: 'Where were the 2020 Olympics held?', opts: ['Tokyo', 'Beijing', 'London', 'Rio'], correct: 0 },
      { q: 'What is a birdie in golf?', opts: ['One under par', 'One over par', 'Par', 'Two under par'], correct: 0 },
      { q: 'How many rounds in boxing match?', opts: ['12', '10', '15', '8'], correct: 0 },
      { q: 'What is the Super Bowl?', opts: ['American football final', 'Basketball final', 'Baseball final', 'Hockey final'], correct: 0 },
      { q: 'What sport is Wimbledon famous for?', opts: ['Tennis', 'Cricket', 'Football', 'Golf'], correct: 0 },
      { q: 'What is a coxswain?', opts: ['Rowing team leader', 'Swimming coach', 'Football referee', 'Tennis umpire'], correct: 0 },
      { q: 'How long is an Olympic triathlon?', opts: ['51.5km total', '40km total', '60km total', '30km total'], correct: 0 },
      { q: 'What sport has a halfpipe?', opts: ['Skateboarding/Snowboarding', 'Swimming', 'Running', 'Tennis'], correct: 0 },
      { q: 'Who is the fastest man ever?', opts: ['Usain Bolt', 'Carl Lewis', 'Tyson Gay', 'Yohan Blake'], correct: 0 },
      { q: 'What is a perfect score in bowling?', opts: ['300', '200', '400', '100'], correct: 0 },
      { q: 'How many Grand Slam tennis tournaments?', opts: ['4', '3', '5', '6'], correct: 0 },
      { q: 'What country dominates table tennis?', opts: ['China', 'Japan', 'Germany', 'Sweden'], correct: 0 },
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
        { q: 'What colour is a ladybird?', opts: ['Red with black spots', 'Blue', 'Green', 'Yellow'], correct: 0 },
        { q: 'What do rabbits eat?', opts: ['Carrots', 'Meat', 'Fish', 'Bread'], correct: 0 },
        { q: 'What do butterflies come from?', opts: ['Caterpillars', 'Eggs only', 'Worms', 'Beetles'], correct: 0 },
        { q: 'What do cows give us?', opts: ['Milk', 'Eggs', 'Honey', 'Wool'], correct: 0 },
        { q: 'What do hens give us?', opts: ['Eggs', 'Milk', 'Honey', 'Wool'], correct: 0 },
        { q: 'What do sheep give us?', opts: ['Wool', 'Milk', 'Eggs', 'Honey'], correct: 0 },
        { q: 'What animal hops?', opts: ['Kangaroo', 'Dog', 'Cat', 'Fish'], correct: 0 },
        { q: 'What animal slithers?', opts: ['Snake', 'Dog', 'Cat', 'Bird'], correct: 0 },
        { q: 'What animal has a trunk?', opts: ['Elephant', 'Giraffe', 'Lion', 'Bear'], correct: 0 },
        { q: 'What animal has a mane?', opts: ['Lion', 'Elephant', 'Giraffe', 'Zebra'], correct: 0 },
        { q: 'What do birds live in?', opts: ['Nests', 'Caves', 'Holes', 'Water'], correct: 0 },
        { q: 'What animal has spots?', opts: ['Leopard', 'Zebra', 'Elephant', 'Bear'], correct: 0 },
        { q: 'What animal says "woof"?', opts: ['Dog', 'Cat', 'Cow', 'Sheep'], correct: 0 },
        { q: 'What animal says "meow"?', opts: ['Cat', 'Dog', 'Cow', 'Sheep'], correct: 0 },
        { q: 'What do flowers need to grow?', opts: ['Water and sun', 'Just water', 'Just sun', 'Nothing'], correct: 0 },
        { q: 'What season do flowers bloom?', opts: ['Spring', 'Winter', 'Autumn', 'Never'], correct: 0 },
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
        { q: 'What type of animal is a shark?', opts: ['Fish', 'Mammal', 'Reptile', 'Bird'], correct: 0 },
        { q: 'What do plants need for photosynthesis?', opts: ['Sunlight', 'Darkness', 'Cold', 'Noise'], correct: 0 },
        { q: 'What is the largest land animal?', opts: ['Elephant', 'Giraffe', 'Rhino', 'Hippo'], correct: 0 },
        { q: 'What type of animal is a whale?', opts: ['Mammal', 'Fish', 'Reptile', 'Bird'], correct: 0 },
        { q: 'How many legs does an insect have?', opts: ['6', '4', '8', '10'], correct: 0 },
        { q: 'What do tadpoles turn into?', opts: ['Frogs', 'Fish', 'Snakes', 'Birds'], correct: 0 },
        { q: 'What is a group of lions called?', opts: ['Pride', 'Pack', 'Herd', 'Flock'], correct: 0 },
        { q: 'What is a group of wolves called?', opts: ['Pack', 'Pride', 'Herd', 'Flock'], correct: 0 },
        { q: 'What is the fastest bird?', opts: ['Peregrine falcon', 'Eagle', 'Owl', 'Hawk'], correct: 0 },
        { q: 'What animal has the longest neck?', opts: ['Giraffe', 'Elephant', 'Horse', 'Camel'], correct: 0 },
        { q: 'What do snakes use to smell?', opts: ['Tongue', 'Nose', 'Eyes', 'Ears'], correct: 0 },
        { q: 'What animal changes colour?', opts: ['Chameleon', 'Snake', 'Frog', 'Lizard'], correct: 0 },
        { q: 'What is hibernation?', opts: ['Winter sleep', 'Summer sleep', 'Migration', 'Hunting'], correct: 0 },
        { q: 'What is migration?', opts: ['Animals moving to new places', 'Sleeping', 'Eating', 'Growing'], correct: 0 },
        { q: 'What do omnivores eat?', opts: ['Plants and meat', 'Just plants', 'Just meat', 'Just fish'], correct: 0 },
        { q: 'What do carnivores eat?', opts: ['Meat', 'Plants', 'Fish only', 'Insects only'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('nature', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is a baby frog called?', opts: ['Tadpole', 'Froglet', 'Spawn', 'Larvae'], correct: 0 },
      { q: 'What is the largest species of bear?', opts: ['Polar bear', 'Grizzly bear', 'Black bear', 'Panda'], correct: 0 },
      { q: 'What bird cannot fly?', opts: ['Penguin', 'Eagle', 'Sparrow', 'Robin'], correct: 0 },
      { q: 'How many wings does a butterfly have?', opts: ['4', '2', '6', '8'], correct: 0 },
      { q: 'What is the largest reptile?', opts: ['Saltwater crocodile', 'Anaconda', 'Komodo dragon', 'Alligator'], correct: 0 },
      { q: 'What is the smallest mammal?', opts: ['Bumblebee bat', 'Mouse', 'Shrew', 'Hamster'], correct: 0 },
      { q: 'What do herbivores eat?', opts: ['Plants', 'Meat', 'Both', 'Neither'], correct: 0 },
      { q: 'What is the deepest ocean zone?', opts: ['Hadal zone', 'Twilight zone', 'Midnight zone', 'Sunlight zone'], correct: 0 },
      { q: 'What is bioluminescence?', opts: ['Living things making light', 'Sound production', 'Heat production', 'Smell production'], correct: 0 },
      { q: 'What is symbiosis?', opts: ['Species living together', 'Competition', 'Predation', 'Parasitism only'], correct: 0 },
      { q: 'What is the food chain?', opts: ['Energy transfer between organisms', 'Food storage', 'Plant growth', 'Animal movement'], correct: 0 },
      { q: 'What is an apex predator?', opts: ['Top of food chain', 'Bottom of food chain', 'Middle of food chain', 'Not in food chain'], correct: 0 },
      { q: 'What is endangered species?', opts: ['At risk of extinction', 'Very common', 'Already extinct', 'Increasing in number'], correct: 0 },
      { q: 'What is an ecosystem?', opts: ['Living and non-living things together', 'Just animals', 'Just plants', 'Just water'], correct: 0 },
      { q: 'What is adaptation?', opts: ['Traits that help survival', 'Learning', 'Growing', 'Sleeping'], correct: 0 },
      { q: 'What is natural selection?', opts: ['Survival of the fittest', 'Random selection', 'Human selection', 'No selection'], correct: 0 },
      { q: 'What is a habitat?', opts: ['Where an organism lives', 'What it eats', 'How it moves', 'Its colour'], correct: 0 },
      { q: 'What is camouflage?', opts: ['Blending with environment', 'Being colourful', 'Making noise', 'Moving fast'], correct: 0 },
      { q: 'What is pollination?', opts: ['Transfer of pollen', 'Water absorption', 'Seed dispersal', 'Fruit formation'], correct: 0 },
      { q: 'What are decomposers?', opts: ['Break down dead matter', 'Produce food', 'Hunt prey', 'Lay eggs'], correct: 0 },
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
      { q: 'What is the lowest male voice?', opts: ['Bass', 'Tenor', 'Alto', 'Soprano'], correct: 0 },
      { q: 'What is the highest female voice?', opts: ['Soprano', 'Alto', 'Bass', 'Tenor'], correct: 0 },
      { q: 'What do you use to play a violin?', opts: ['A bow', 'A pick', 'Sticks', 'Your hands only'], correct: 0 },
      { q: 'What is a conductor?', opts: ['Leads an orchestra', 'Plays drums', 'Sings', 'Plays guitar'], correct: 0 },
      { q: 'What is a duet?', opts: ['Two people performing', 'One person', 'Three people', 'Four people'], correct: 0 },
      { q: 'What is a solo?', opts: ['One person performing', 'Two people', 'Three people', 'Four people'], correct: 0 },
      { q: 'What is tempo?', opts: ['Speed of music', 'Volume', 'Pitch', 'Rhythm'], correct: 0 },
      { q: 'What is a melody?', opts: ['The tune', 'The beat', 'The volume', 'The silence'], correct: 0 },
      { q: 'What is rhythm?', opts: ['Pattern of beats', 'The tune', 'The volume', 'The silence'], correct: 0 },
      { q: 'What is a chorus in a song?', opts: ['Repeated section', 'The beginning', 'The end', 'The verse'], correct: 0 },
      { q: 'What is a verse in a song?', opts: ['Story-telling section', 'The chorus', 'The bridge', 'The intro'], correct: 0 },
      { q: 'What does "forte" mean in music?', opts: ['Loud', 'Quiet', 'Fast', 'Slow'], correct: 0 },
      { q: 'What does "piano" mean in music?', opts: ['Quiet', 'Loud', 'Fast', 'Slow'], correct: 0 },
      { q: 'What is a symphony?', opts: ['Large orchestral piece', 'Small song', 'Solo', 'Duet'], correct: 0 },
      { q: 'What family is the flute in?', opts: ['Woodwind', 'Brass', 'String', 'Percussion'], correct: 0 },
      { q: 'What family is the trumpet in?', opts: ['Brass', 'Woodwind', 'String', 'Percussion'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('music', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
};

// ============= FRENCH QUESTIONS =============
const frenchQuestions = {
  vocabulary: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'How do you say "hello" in French?', opts: ['Bonjour', 'Hola', 'Ciao', 'Guten Tag'], correct: 0 },
        { q: 'What is "cat" in French?', opts: ['Chat', 'Chien', 'Oiseau', 'Poisson'], correct: 0 },
        { q: 'How do you say "thank you" in French?', opts: ['Merci', 'Gracias', 'Danke', 'Grazie'], correct: 0 },
        { q: 'What is "dog" in French?', opts: ['Chien', 'Chat', 'Lapin', 'Souris'], correct: 0 },
        { q: 'How do you say "yes" in French?', opts: ['Oui', 'Non', 'Peut-être', 'Jamais'], correct: 0 },
        { q: 'What colour is "rouge"?', opts: ['Red', 'Blue', 'Green', 'Yellow'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('vocabulary', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What does "Je m\'appelle" mean?', opts: ['My name is', 'I am hungry', 'I like', 'I live in'], correct: 0 },
        { q: 'How do you say "I am 10 years old" in French?', opts: ['J\'ai dix ans', 'Je suis dix', 'J\'aime dix', 'Je vais dix'], correct: 0 },
        { q: 'What is "apple" in French?', opts: ['Pomme', 'Banane', 'Orange', 'Poire'], correct: 0 },
        { q: 'How do you say "school" in French?', opts: ['École', 'Maison', 'Magasin', 'Hôpital'], correct: 0 },
        { q: 'What does "Quel âge as-tu?" mean?', opts: ['How old are you?', 'Where do you live?', 'What is your name?', 'How are you?'], correct: 0 },
        { q: 'What is "book" in French?', opts: ['Livre', 'Cahier', 'Stylo', 'Crayon'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('vocabulary', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What does "Je voudrais" mean?', opts: ['I would like', 'I must', 'I can', 'I will'], correct: 0 },
      { q: 'How do you say "I went to the cinema" in French?', opts: ['Je suis allé au cinéma', 'J\'aime le cinéma', 'Je vais au cinéma', 'Je voudrais aller au cinéma'], correct: 0 },
      { q: 'What is the French word for "weather"?', opts: ['Le temps', 'Le jour', 'La nuit', 'Le soleil'], correct: 0 },
      { q: 'What does "Qu\'est-ce que tu fais?" mean?', opts: ['What are you doing?', 'Where are you going?', 'Who are you?', 'When are you leaving?'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('vocabulary', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  numbers: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is "un" in English?', opts: ['One', 'Two', 'Three', 'Four'], correct: 0 },
        { q: 'How do you say "three" in French?', opts: ['Trois', 'Deux', 'Quatre', 'Cinq'], correct: 0 },
        { q: 'What number is "cinq"?', opts: ['5', '4', '6', '3'], correct: 0 },
        { q: 'What is "dix" in English?', opts: ['Ten', 'Five', 'Twenty', 'Twelve'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('numbers', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    const questions = [
      { q: 'What is "vingt" in English?', opts: ['Twenty', 'Twelve', 'Thirty', 'Forty'], correct: 0 },
      { q: 'How do you say "fifty" in French?', opts: ['Cinquante', 'Quarante', 'Soixante', 'Trente'], correct: 0 },
      { q: 'What number is "quatre-vingt"?', opts: ['80', '40', '60', '100'], correct: 0 },
      { q: 'What is "cent" in English?', opts: ['One hundred', 'Ten', 'Fifty', 'Thousand'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('numbers', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  phrases: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What does "Au revoir" mean?', opts: ['Goodbye', 'Hello', 'Please', 'Sorry'], correct: 0 },
        { q: 'How do you say "please" in French?', opts: ['S\'il vous plaît', 'Merci', 'Pardon', 'Bonjour'], correct: 0 },
        { q: 'What does "Comment ça va?" mean?', opts: ['How are you?', 'What is your name?', 'Where are you?', 'Goodbye'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('phrases', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    const questions = [
      { q: 'What does "Je ne comprends pas" mean?', opts: ['I don\'t understand', 'I don\'t know', 'I don\'t like', 'I don\'t want'], correct: 0 },
      { q: 'How do you say "Excuse me" in French?', opts: ['Excusez-moi', 'Pardon', 'S\'il vous plaît', 'Merci'], correct: 0 },
      { q: 'What does "Où est la gare?" mean?', opts: ['Where is the station?', 'Where is the school?', 'Where is the shop?', 'Where is the hotel?'], correct: 0 },
      { q: 'How do you say "I am hungry" in French?', opts: ['J\'ai faim', 'J\'ai soif', 'J\'ai froid', 'J\'ai chaud'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('phrases', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
};

// ============= IT & COMPUTING QUESTIONS =============
const itQuestions = {
  coding: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is a computer program?', opts: ['Instructions for a computer', 'A type of game', 'A keyboard', 'A screen'], correct: 0 },
        { q: 'What do we call a mistake in code?', opts: ['Bug', 'Feature', 'Update', 'File'], correct: 0 },
        { q: 'What does a programmer do?', opts: ['Writes code', 'Fixes cars', 'Cooks food', 'Draws pictures'], correct: 0 },
        { q: 'What shape is used in coding to make decisions?', opts: ['Diamond', 'Circle', 'Square', 'Star'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('coding', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is a loop in coding?', opts: ['Repeating instructions', 'A mistake', 'A variable', 'A function'], correct: 0 },
        { q: 'What is a variable?', opts: ['A container for data', 'A type of loop', 'A bug', 'A website'], correct: 0 },
        { q: 'What programming language is Scratch based on?', opts: ['Block-based visual coding', 'Python', 'JavaScript', 'HTML'], correct: 0 },
        { q: 'What does "if-then" do in coding?', opts: ['Makes decisions', 'Creates loops', 'Stores data', 'Draws graphics'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('coding', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is an algorithm?', opts: ['Step-by-step instructions', 'A programming language', 'A type of computer', 'A website'], correct: 0 },
      { q: 'What does HTML stand for?', opts: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Markup Language'], correct: 0 },
      { q: 'What is Python?', opts: ['A programming language', 'A type of snake game', 'An operating system', 'A web browser'], correct: 0 },
      { q: 'What is debugging?', opts: ['Finding and fixing errors', 'Writing new code', 'Creating graphics', 'Testing websites'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('coding', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  internet: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What is the internet?', opts: ['A network connecting computers', 'A type of computer', 'A game', 'A phone'], correct: 0 },
        { q: 'What do we use to search the internet?', opts: ['Search engine', 'Calculator', 'Camera', 'Printer'], correct: 0 },
        { q: 'What is an email?', opts: ['Electronic message', 'A website', 'A game', 'A file'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('internet', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What does www stand for?', opts: ['World Wide Web', 'Wide World Web', 'Web Wide World', 'World Web Wide'], correct: 0 },
        { q: 'What is a browser?', opts: ['Software to view websites', 'A type of virus', 'A search engine', 'An email program'], correct: 0 },
        { q: 'What is a URL?', opts: ['Web address', 'Password', 'Username', 'File type'], correct: 0 },
        { q: 'What should you never share online?', opts: ['Passwords and personal info', 'Funny videos', 'School projects', 'Book recommendations'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('internet', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is cybersecurity?', opts: ['Protecting computers and data', 'A type of game', 'Social media', 'Web design'], correct: 0 },
      { q: 'What is phishing?', opts: ['A scam to steal information', 'A type of fishing game', 'Sharing photos', 'Downloading music'], correct: 0 },
      { q: 'What does HTTPS mean?', opts: ['Secure web connection', 'High speed internet', 'Hosting service', 'Transfer protocol'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('internet', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
  hardware: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What do you type on?', opts: ['Keyboard', 'Mouse', 'Screen', 'Speaker'], correct: 0 },
        { q: 'What is a mouse used for?', opts: ['Moving the cursor', 'Typing', 'Taking photos', 'Playing music'], correct: 0 },
        { q: 'What do we see things on?', opts: ['Monitor/Screen', 'Keyboard', 'Printer', 'Speaker'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('hardware', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    if (yearGroup <= 6) {
      const questions = [
        { q: 'What is the "brain" of a computer called?', opts: ['CPU (Processor)', 'RAM', 'Hard Drive', 'Graphics Card'], correct: 0 },
        { q: 'What does RAM stand for?', opts: ['Random Access Memory', 'Read All Memory', 'Run All Memory', 'Ready Access Mode'], correct: 0 },
        { q: 'What is a hard drive used for?', opts: ['Storing files', 'Displaying images', 'Playing sound', 'Connecting to internet'], correct: 0 },
        { q: 'What type of device is a printer?', opts: ['Output device', 'Input device', 'Storage device', 'Processing device'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('hardware', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
    }
    const questions = [
      { q: 'What is an SSD?', opts: ['Solid State Drive', 'Super Speed Disk', 'System Storage Device', 'Serial Speed Drive'], correct: 0 },
      { q: 'What does GPU stand for?', opts: ['Graphics Processing Unit', 'General Processing Unit', 'Gaming Power Unit', 'Graphic Power Usage'], correct: 0 },
      { q: 'What connects your computer to the internet?', opts: ['Network card/WiFi adapter', 'Sound card', 'Graphics card', 'Power supply'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('hardware', q.q, q.opts, q.correct, 'medium', yearGroup, 1);
  },
};

// ============= QUICK LEARN QUESTIONS =============
const quickLearnQuestions = {
  funfacts: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What animal is known as man\'s best friend?', opts: ['Dog', 'Cat', 'Horse', 'Rabbit'], correct: 0 },
      { q: 'What is the fastest land animal?', opts: ['Cheetah', 'Lion', 'Horse', 'Elephant'], correct: 0 },
      { q: 'How many colours are in a rainbow?', opts: ['7', '5', '6', '8'], correct: 0 },
      { q: 'What is the largest ocean?', opts: ['Pacific', 'Atlantic', 'Indian', 'Arctic'], correct: 0 },
      { q: 'What do bees make?', opts: ['Honey', 'Milk', 'Sugar', 'Bread'], correct: 0 },
      { q: 'How many continents are there?', opts: ['7', '5', '6', '8'], correct: 0 },
      { q: 'What is the tallest animal?', opts: ['Giraffe', 'Elephant', 'Horse', 'Camel'], correct: 0 },
      { q: 'What planet is known as the Red Planet?', opts: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('funfacts', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
  brainteasers: (yearGroup: YearGroup): Question => {
    const questions = [
      { q: 'What has hands but can\'t clap?', opts: ['A clock', 'A tree', 'A river', 'A mountain'], correct: 0 },
      { q: 'What has a head and a tail but no body?', opts: ['A coin', 'A snake', 'A fish', 'A bird'], correct: 0 },
      { q: 'What gets wetter the more it dries?', opts: ['A towel', 'A sponge', 'Water', 'Soap'], correct: 0 },
      { q: 'What can you catch but not throw?', opts: ['A cold', 'A ball', 'A fish', 'A bird'], correct: 0 },
      { q: 'What has keys but no locks?', opts: ['A piano', 'A door', 'A car', 'A safe'], correct: 0 },
      { q: 'What goes up but never comes down?', opts: ['Your age', 'A balloon', 'A rocket', 'Temperature'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('brainteasers', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
  lifeskills: (yearGroup: YearGroup): Question => {
    if (yearGroup <= 3) {
      const questions = [
        { q: 'What should you say when someone helps you?', opts: ['Thank you', 'Goodbye', 'Hello', 'Sorry'], correct: 0 },
        { q: 'What do you do before crossing the road?', opts: ['Look both ways', 'Run across', 'Close your eyes', 'Jump'], correct: 0 },
        { q: 'How many hours of sleep do children need?', opts: ['9-11 hours', '5-6 hours', '3-4 hours', '12-15 hours'], correct: 0 },
      ];
      const q = questions[getRandomInt(0, questions.length - 1)];
      return createQuestion('lifeskills', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
    }
    const questions = [
      { q: 'What is a healthy breakfast food?', opts: ['Porridge/Oatmeal', 'Chocolate cake', 'Ice cream', 'Crisps'], correct: 0 },
      { q: 'Why is exercise important?', opts: ['Keeps you healthy and strong', 'Makes you tired', 'Wastes time', 'Is only for athletes'], correct: 0 },
      { q: 'What should you do if you see a fire?', opts: ['Tell an adult and leave safely', 'Try to put it out yourself', 'Ignore it', 'Take a photo'], correct: 0 },
      { q: 'How often should you brush your teeth?', opts: ['Twice a day', 'Once a week', 'Once a month', 'Never'], correct: 0 },
    ];
    const q = questions[getRandomInt(0, questions.length - 1)];
    return createQuestion('lifeskills', q.q, q.opts, q.correct, 'easy', yearGroup, 1);
  },
};

// Main generator function
export const generateSubjectQuestion = (subject: Subject, topic: string, yearGroup: YearGroup): Question => {
  switch (subject) {
    case 'science':
      if (topic === 'biology' || topic === 'cells' || topic === 'body') return scienceQuestions.biology(yearGroup);
      if (topic === 'chemistry' || topic === 'atoms' || topic === 'reactions') return scienceQuestions.chemistry(yearGroup);
      if (topic === 'physics' || topic === 'forces' || topic === 'energy') return scienceQuestions.physics(yearGroup);
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
      
    case 'french':
      if (topic === 'vocabulary' || topic === 'words') return frenchQuestions.vocabulary(yearGroup);
      if (topic === 'numbers' || topic === 'counting') return frenchQuestions.numbers(yearGroup);
      if (topic === 'phrases' || topic === 'speaking') return frenchQuestions.phrases(yearGroup);
      const frTopics = [frenchQuestions.vocabulary, frenchQuestions.numbers, frenchQuestions.phrases];
      return frTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'it':
      if (topic === 'coding' || topic === 'programming') return itQuestions.coding(yearGroup);
      if (topic === 'internet' || topic === 'safety') return itQuestions.internet(yearGroup);
      if (topic === 'hardware' || topic === 'computers') return itQuestions.hardware(yearGroup);
      const itTopics = [itQuestions.coding, itQuestions.internet, itQuestions.hardware];
      return itTopics[getRandomInt(0, 2)](yearGroup);
      
    case 'quicklearn':
      if (topic === 'funfacts' || topic === 'facts') return quickLearnQuestions.funfacts(yearGroup);
      if (topic === 'brainteasers' || topic === 'riddles') return quickLearnQuestions.brainteasers(yearGroup);
      if (topic === 'lifeskills' || topic === 'life') return quickLearnQuestions.lifeskills(yearGroup);
      const qlTopics = [quickLearnQuestions.funfacts, quickLearnQuestions.brainteasers, quickLearnQuestions.lifeskills];
      return qlTopics[getRandomInt(0, 2)](yearGroup);
      
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
    case 'french':
      return [
        { id: 'vocabulary', name: 'French Vocabulary', icon: '🗣️', description: 'Learn essential French words!' },
        { id: 'numbers', name: 'French Numbers', icon: '🔢', description: 'Count and do maths in French!' },
        { id: 'phrases', name: 'French Phrases', icon: '💬', description: 'Useful phrases for conversation!' },
      ];
    case 'it':
      return [
        { id: 'coding', name: 'Coding & Programming', icon: '👨‍💻', description: 'Learn the basics of programming!' },
        { id: 'internet', name: 'Internet & Safety', icon: '🌐', description: 'Stay safe online and understand the web!' },
        { id: 'hardware', name: 'Computer Hardware', icon: '🖥️', description: 'Learn about computer components!' },
      ];
    case 'quicklearn':
      return [
        { id: 'funfacts', name: 'Fun Facts', icon: '🎯', description: 'Quick interesting facts to learn!' },
        { id: 'brainteasers', name: 'Brain Teasers', icon: '🧩', description: 'Riddles and puzzles to solve!' },
        { id: 'lifeskills', name: 'Life Skills', icon: '🌟', description: 'Practical skills for everyday life!' },
      ];
    default:
      return [];
  }
};
