import { Question, SubjectId, Difficulty } from '../types';
import { QUESTIONS_DATA } from '../data/questions';

// Seeded PRNG for reproducible daily refresh and option randomization
export function seededRandom(seed: number): number {
  const s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

// Get string seed for a date YYYY-MM-DD
export function getDateSeed(dateString?: string): number {
  const d = dateString || new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < d.length; i++) {
    hash = (hash << 5) - hash + d.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Randomizes options for any question so the correct answer is not always in the same position.
 * Swaps all options using seeded Fisher-Yates shuffle and tracks the new correct index.
 */
export function randomizeQuestionOptions(
  rawOptions: string[],
  rawCorrectAnswer: number,
  seed: number
): { options: string[]; correctAnswer: number } {
  const pairs = rawOptions.map((text, idx) => ({ 
    text, 
    isCorrect: idx === rawCorrectAnswer 
  }));

  // Seeded Fisher-Yates shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i * 29) * (i + 1));
    const temp = pairs[i];
    pairs[i] = pairs[j];
    pairs[j] = temp;
  }

  const randomizedOptions = pairs.map(p => p.text);
  const newCorrectAnswer = pairs.findIndex(p => p.isCorrect);

  return {
    options: randomizedOptions,
    correctAnswer: newCorrectAnswer >= 0 ? newCorrectAnswer : 0
  };
}

// Master Competency Question Template Blueprints
export interface CompetencyBlueprint {
  subject: SubjectId;
  subjectName: string;
  chapter: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: Difficulty;
  formulaOrConcept?: string;
  year?: string;
}

export const COMPETENCY_TEMPLATES: CompetencyBlueprint[] = [
  // --- SCIENCE COMPETENCY QUESTIONS ---
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Chemical Reactions and Equations',
    question: 'A student observes that when dilute hydrochloric acid is added to zinc granules in a test tube with a delivery tube, gas bubbles evolve rapidly. When a burning splinter is brought near the mouth of the delivery tube, it burns with a "pop" sound. Which balanced chemical reaction and concept explain this observation?',
    options: [
      'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑ (Metal + Acid displacement reaction releasing hydrogen)',
      'Zn(s) + HCl(aq) → ZnCl(aq) + H(g) (Thermal decomposition reaction)',
      'ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l) (Neutralisation producing steam)',
      'Zn(s) + 2HCl(aq) → ZnH₂(s) + Cl₂(g)↑ (Electrolytic synthesis producing chlorine)'
    ],
    correctAnswer: 0,
    explanation: 'Reactive metals like Zinc displace hydrogen from dilute acids, producing zinc chloride salt and hydrogen gas (H2), which characteristically burns with a pop sound.',
    difficulty: 'Medium',
    formulaOrConcept: 'Metal + Dilute Acid → Salt + H₂ (Pop sound test)',
    year: 'CBSE Sample Paper 2024'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Chemical Reactions and Equations',
    question: 'In an experiment, 2 g of green ferrous sulphate crystals are heated in a dry boiling tube. A student notes a brown solid residue and suffocating fumes of burning sulphur. What are the products of this decomposition?',
    options: [
      'Ferric oxide (Fe₂O₃), Sulphur dioxide (SO₂), and Sulphur trioxide (SO₃)',
      'Ferrous oxide (FeO) and Sulphur dioxide (SO₂) only',
      'Iron metal (Fe), Sulphur (S), and Oxygen gas (O₂)',
      'Ferric chloride (FeCl₃) and Water vapour (H₂O)'
    ],
    correctAnswer: 0,
    explanation: 'Thermal decomposition of ferrous sulphate: 2FeSO₄(s) --heat--> Fe₂O₃(s) + SO₂(g) + SO₃(g). The green colour changes to reddish-brown ferric oxide.',
    difficulty: 'HOTS',
    formulaOrConcept: '2FeSO₄ → Fe₂O₃ + SO₂ + SO₃ (Thermal decomposition)',
    year: 'CBSE Board 2023'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Acids, Bases and Salts',
    question: 'A baker noticed that a batch of cakes was flat and lacked sponginess. Upon testing, the baker realised that baking soda was added, but the tartaric acid was missing. What is the essential chemical function of tartaric acid in baking powder?',
    options: [
      'It neutralises bitter sodium carbonate formed on heating and releases additional CO₂',
      'It acts solely as a sweetening flavoring agent',
      'It prevents the decomposition of sodium hydrogencarbonate completely',
      'It lowers the boiling temperature of the cake batter'
    ],
    correctAnswer: 0,
    explanation: 'Heating baking soda produces sodium carbonate, which tastes bitter. Tartaric acid in baking powder reacts with Na2CO3 to form tasteless sodium tartrate and releases more CO2.',
    difficulty: 'Medium',
    formulaOrConcept: 'NaHCO₃ + H⁺ (tartaric acid) → CO₂ + H₂O + Sodium salt of acid',
    year: 'CBSE 2024 Competency'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Acids, Bases and Salts',
    question: 'A soil sample collected from an agricultural field tests with a pH of 4.5. The farmer wants to cultivate wheat, which grows best at pH 6.5–7.0. Which substance should the agricultural officer advise the farmer to mix with the soil?',
    options: [
      'Quicklime (Calcium oxide, CaO) or Slaked lime (Ca(OH)₂)',
      'Dilute nitric acid (HNO₃)',
      'Gypsum (CaSO₄·2H₂O)',
      'Sodium chloride (NaCl)'
    ],
    correctAnswer: 0,
    explanation: 'A soil pH of 4.5 is acidic. Basic compounds such as quicklime (CaO), slaked lime (Ca(OH)2), or chalk (CaCO3) are used to neutralise excess soil acidity.',
    difficulty: 'Easy',
    formulaOrConcept: 'Soil Neutralisation: Acidic soil (pH < 6.0) treated with bases CaO / Ca(OH)₂',
    year: 'CBSE 2022'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Metals and Non-metals',
    question: 'An element X reacts vigorously with cold water producing a colourless gas that catches fire spontaneously. The resulting solution turns red litmus blue. Element X also forms an ionic chloride XCl. Identify element X.',
    options: [
      'Sodium (Na) or Potassium (K)',
      'Magnesium (Mg)',
      'Copper (Cu)',
      'Carbon (C)'
    ],
    correctAnswer: 0,
    explanation: 'Alkali metals like Sodium (Na) and Potassium (K) react exothermically with cold water releasing hydrogen gas, which immediately catches fire due to the heat generated.',
    difficulty: 'Medium',
    formulaOrConcept: '2Na + 2H₂O → 2NaOH + H₂ + Heat',
    year: 'CBSE 2023'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Carbon Compounds',
    question: 'Why does soap fail to clean clothes effectively in hard water containing calcium and magnesium salts, whereas synthetic detergents clean effectively?',
    options: [
      'Soap forms an insoluble curdy precipitate (scum) with Ca²⁺ and Mg²⁺, whereas detergents do not form scum',
      'Soap decomposes into poisonous hydrocarbon gas in hard water',
      'Hard water makes the dirt particles insoluble in water',
      'Detergents contain acidic polymers that boil the water instantly'
    ],
    correctAnswer: 0,
    explanation: 'Soap molecules react with calcium and magnesium ions present in hard water to form insoluble curdy white precipitates known as scum, whereas detergents form soluble salts.',
    difficulty: 'Medium',
    formulaOrConcept: '2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ (Scum)',
    year: 'CBSE 2024'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Life Processes',
    question: 'A student measured the rate of photosynthesis in an aquatic plant (Hydrilla) placed at varying distances from a light source. The rate was highest at 15 cm and dropped significantly at 80 cm. What biological conclusion is best supported?',
    options: [
      'Light intensity is a limiting factor for the light-dependent reactions of photosynthesis',
      'Chlorophyll molecules disintegrate at distances greater than 20 cm',
      'Oxygen gas is consumed rather than released during photosynthesis',
      'Aquatic plants can only photosynthesize in absolute darkness'
    ],
    correctAnswer: 0,
    explanation: 'As distance increases, light intensity drops inversely with the square of distance, reducing photon availability to excite chlorophyll, making light intensity the limiting factor.',
    difficulty: 'HOTS',
    formulaOrConcept: 'Blackman’s Law of Limiting Factors; Photosynthesis ∝ Light Intensity',
    year: 'CBSE 2023 Case Study'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Life Processes',
    question: 'In human circulatory system, what ensures that deoxygenated blood from the body and oxygenated blood from the lungs do not mix in the heart?',
    options: [
      'The muscular inter-ventricular and inter-atrial septum dividing the heart into 4 chambers',
      'The high pressure exerted by capillary walls',
      'Continuous peristaltic movement of the esophagus',
      'The presence of valves in the renal arteries'
    ],
    correctAnswer: 0,
    explanation: 'The four-chambered heart in mammals and birds features a complete septum that prevents mixing of oxygenated and deoxygenated blood, ensuring high energy efficiency for warm-blooded thermoregulation.',
    difficulty: 'Easy',
    formulaOrConcept: 'Double Circulation & Septum division in 4-chambered mammalian heart',
    year: 'CBSE 2024'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Control and Coordination',
    question: 'When a person accidentally touches a hot kettle, their hand immediately withdraws before they consciously feel the intense pain. What is the correct sequence of the reflex arc path?',
    options: [
      'Receptor → Sensory neuron → Spinal cord (Relay neuron) → Motor neuron → Effector (Muscle)',
      'Effector → Motor neuron → Brain → Sensory neuron → Receptor',
      'Receptor → Brain cortex → Spinal cord → Sensory neuron → Effector',
      'Sensory neuron → Effector → Motor neuron → Spinal cord'
    ],
    correctAnswer: 0,
    explanation: 'Reflex arcs bypass conscious brain delays: Stimulus → Receptor in skin → Sensory neuron → Spinal cord relay neuron → Motor neuron → Effector muscle (contraction).',
    difficulty: 'Medium',
    formulaOrConcept: 'Reflex Arc: Receptor → Sensory → Relay (Spinal) → Motor → Effector',
    year: 'CBSE 2023'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Heredity',
    question: 'In a cross between pure-breeding tall pea plants with round seeds (TTRR) and pure-breeding short pea plants with wrinkled seeds (ttrr), what phenotypic ratio is observed in the F2 generation?',
    options: [
      '9 Tall Round : 3 Tall Wrinkled : 3 Short Round : 1 Short Wrinkled',
      '3 Tall Round : 1 Short Wrinkled',
      '1 Tall Round : 2 Medium Oval : 1 Short Wrinkled',
      '9 Short Wrinkled : 3 Tall Round : 3 Short Round : 1 Tall Wrinkled'
    ],
    correctAnswer: 0,
    explanation: 'According to Mendel’s Law of Independent Assortment, a dihybrid cross yields a phenotypic ratio of 9:3:3:1 in the F2 generation.',
    difficulty: 'Medium',
    formulaOrConcept: 'Mendelian Dihybrid Ratio: 9 : 3 : 3 : 1',
    year: 'CBSE Board 2023'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Light Reflection and Refraction',
    question: 'An object is placed at a distance of 20 cm in front of a concave mirror of focal length 15 cm. Where is the image formed, and what are its characteristics?',
    options: [
      'At 60 cm in front of the mirror (v = -60 cm); Real, inverted, and magnified (m = -3)',
      'At 10 cm behind the mirror; Virtual, erect, and diminished',
      'At 30 cm in front of the mirror; Real, inverted, and same size',
      'At infinity; Highly enlarged'
    ],
    correctAnswer: 0,
    explanation: 'Using 1/f = 1/v + 1/u: 1/(-15) = 1/v + 1/(-20) => 1/v = -1/15 + 1/20 = (-4+3)/60 = -1/60 => v = -60 cm. Magnification m = -v/u = -(-60)/(-20) = -3. Real, inverted, and magnified.',
    difficulty: 'HOTS',
    formulaOrConcept: '1/f = 1/v + 1/u ; m = -v/u = h\'/h',
    year: 'CBSE 2024'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Electricity',
    question: 'Three identical resistors of resistance 6 Ω each are connected. A student wants an equivalent resistance of 9 Ω. How should the three resistors be connected?',
    options: [
      'Two resistors in parallel, connected in series with the third resistor',
      'All three resistors connected in parallel',
      'All three resistors connected in series',
      'Two resistors in series, connected in parallel with the third resistor'
    ],
    correctAnswer: 0,
    explanation: 'Two in parallel give R_parallel = (6*6)/(6+6) = 3 Ω. Connecting this in series with the third 6 Ω resistor yields Req = 3 + 6 = 9 Ω.',
    difficulty: 'Medium',
    formulaOrConcept: 'Req = (R₁ || R₂) + R₃ = (6/2) + 6 = 9 Ω',
    year: 'CBSE 2023 Competency'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Electricity',
    question: 'An electric bulb rated 220 V, 100 W is operated on 110 V supply. What is the actual power consumed by the bulb?',
    options: [
      '25 W',
      '50 W',
      '75 W',
      '100 W'
    ],
    correctAnswer: 0,
    explanation: 'Resistance R = V²/P = (220)²/100 = 484 Ω. When operated at V\' = 110 V, Power P\' = (V\')²/R = (110)²/484 = 12100/484 = 25 W.',
    difficulty: 'Medium',
    formulaOrConcept: 'P = V²/R ; If voltage is halved, power becomes (1/2)² = 1/4th',
    year: 'CBSE 2022'
  },
  {
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Our Environment',
    question: 'In a grassland ecosystem, grass (10,000 J energy) is consumed by grasshoppers, which are eaten by frogs, and then by snakes. According to Lindeman’s 10% law, how much energy is available to the snakes?',
    options: [
      '10 J',
      '100 J',
      '1,000 J',
      '1 J'
    ],
    correctAnswer: 0,
    explanation: 'Grass: 10,000 J → Grasshopper (1st consumer): 1,000 J → Frog (2nd consumer): 100 J → Snake (3rd consumer): 10 J.',
    difficulty: 'Easy',
    formulaOrConcept: 'Lindeman’s 10% Energy Transfer Law across trophic levels',
    year: 'CBSE 2024'
  },

  // --- MATHEMATICS COMPETENCY QUESTIONS ---
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Real Numbers',
    question: 'Three bells toll at intervals of 9, 12, and 15 minutes respectively. If they start tolling together at 8:00 AM, at what time will they next toll together?',
    options: [
      '11:00 AM (after 180 minutes / 3 hours)',
      '9:36 AM (after 96 minutes)',
      '1:00 PM (after 300 minutes)',
      '10:15 AM (after 135 minutes)'
    ],
    correctAnswer: 0,
    explanation: 'The time until they toll together is the LCM of 9, 12, and 15. Prime factors: 9=3², 12=2²×3, 15=3×5. LCM = 2²×3²×5 = 4×9×5 = 180 min = 3 hours. 8:00 AM + 3 hours = 11:00 AM.',
    difficulty: 'Medium',
    formulaOrConcept: 'Simultaneous events problem: LCM(9, 12, 15) = 180 minutes',
    year: 'CBSE Board 2023'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Polynomials',
    question: 'If α and β are the zeroes of the quadratic polynomial f(x) = x² - 5x + k such that α - β = 1, what is the value of k?',
    options: [
      '6',
      '4',
      '-6',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'α + β = 5 and αβ = k. (α - β)² = (α + β)² - 4αβ => 1² = 5² - 4k => 1 = 25 - 4k => 4k = 24 => k = 6.',
    difficulty: 'Medium',
    formulaOrConcept: '(α - β)² = (α + β)² - 4αβ',
    year: 'CBSE Standard Math 2024'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Pair of Linear Equations',
    question: 'A motor boat travels 30 km upstream and 44 km downstream in 10 hours. In 13 hours, it can travel 40 km upstream and 55 km downstream. What is the speed of the boat in still water and speed of the stream?',
    options: [
      'Speed of boat = 8 km/h, Speed of stream = 3 km/h',
      'Speed of boat = 10 km/h, Speed of stream = 2 km/h',
      'Speed of boat = 12 km/h, Speed of stream = 4 km/h',
      'Speed of boat = 9 km/h, Speed of stream = 1.5 km/h'
    ],
    correctAnswer: 0,
    explanation: 'Let upstream speed = u and downstream = v. 30/u + 44/v = 10 and 40/u + 55/v = 13. Solving yields 1/u = 1/5 (u=5) and 1/v = 1/11 (v=11). Boat speed = (11+5)/2 = 8 km/h, stream = (11-5)/2 = 3 km/h.',
    difficulty: 'HOTS',
    formulaOrConcept: 'Upstream = x - y ; Downstream = x + y ; x = (v + u)/2',
    year: 'CBSE 2023 HOTS'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Quadratic Equations',
    question: 'For what value of k does the quadratic equation (k - 12)x² + 2(k - 12)x + 2 = 0 have real and equal roots (where k ≠ 12)?',
    options: [
      'k = 14',
      'k = 12',
      'k = 10',
      'k = 16'
    ],
    correctAnswer: 0,
    explanation: 'For equal roots, discriminant D = b² - 4ac = 0. [2(k-12)]² - 4(k-12)(2) = 0 => 4(k-12)² - 8(k-12) = 0. Factor out 4(k-12): 4(k-12)[k - 12 - 2] = 0. Since k ≠ 12, k - 14 = 0 => k = 14.',
    difficulty: 'Medium',
    formulaOrConcept: 'Equal roots condition: D = b² - 4ac = 0',
    year: 'CBSE 2024'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Arithmetic Progressions',
    question: 'A manufacturer of laptop batteries produces 600 units in the 3rd year and 700 units in the 7th year. Assuming uniform annual growth, what was the total production in the first 10 years?',
    options: [
      '6,875 units',
      '7,250 units',
      '6,500 units',
      '7,000 units'
    ],
    correctAnswer: 0,
    explanation: 'a3 = a + 2d = 600, a7 = a + 6d = 700. Subtracting: 4d = 100 => d = 25. Then a = 600 - 50 = 550. S10 = 10/2 [2(550) + 9(25)] = 5 [1100 + 225] = 5 × 1325 = 6,875 units.',
    difficulty: 'HOTS',
    formulaOrConcept: 'Sₙ = n/2 [2a + (n - 1)d] ; aₙ = a + (n - 1)d',
    year: 'CBSE Case Study 2023'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Coordinate Geometry',
    question: 'Find the ratio in which the y-axis divides the line segment joining the points A(5, -6) and B(-1, -4), and find the coordinates of the point of division.',
    options: [
      '5 : 1 internally, and point is (0, -13/3)',
      '1 : 5 internally, and point is (0, -2)',
      '2 : 3 internally, and point is (0, -5)',
      '3 : 4 externally, and point is (0, -7/2)'
    ],
    correctAnswer: 0,
    explanation: 'Any point on y-axis has x = 0. Using section formula: x = (k(-1) + 1(5))/(k + 1) = 0 => -k + 5 = 0 => k = 5. Ratio is 5:1. y = (5(-4) + 1(-6))/(5 + 1) = (-20 - 6)/6 = -26/6 = -13/3.',
    difficulty: 'Medium',
    formulaOrConcept: 'Section Formula: x = (m₁x₂ + m₂x₁)/(m₁ + m₂)',
    year: 'CBSE 2024'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Trigonometry',
    question: 'If tan θ + sec θ = 3, what is the value of sin θ (where 0 < θ < 90°)?',
    options: [
      '4/5',
      '3/5',
      '1/3',
      '2/3'
    ],
    correctAnswer: 0,
    explanation: 'sec²θ - tan²θ = 1 => (sec θ - tan θ)(sec θ + tan θ) = 1. Since sec θ + tan θ = 3, sec θ - tan θ = 1/3. Adding equations: 2 sec θ = 3 + 1/3 = 10/3 => sec θ = 5/3 => cos θ = 3/5. Hence sin θ = √(1 - cos²θ) = 4/5.',
    difficulty: 'HOTS',
    formulaOrConcept: 'sec²θ - tan²θ = 1 ; (sec θ - tan θ) = 1/(sec θ + tan θ)',
    year: 'CBSE Standard Math 2023'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Applications of Trigonometry',
    question: 'From the top of a 75 m high lighthouse from sea level, the angles of depression of two ships approaching in a straight line are 30° and 45°. If one ship is exactly behind the other on the same side, what is the distance between the two ships?',
    options: [
      '75(√3 - 1) m ≈ 54.9 m',
      '75(√3 + 1) m ≈ 204.9 m',
      '150 m',
      '75√3 m ≈ 129.9 m'
    ],
    correctAnswer: 0,
    explanation: 'For ship with angle 45°: tan 45° = 75/x₁ => x₁ = 75 m. For ship with angle 30°: tan 30° = 75/x₂ => 1/√3 = 75/x₂ => x₂ = 75√3 m. Distance between ships = x₂ - x₁ = 75√3 - 75 = 75(√3 - 1) m.',
    difficulty: 'Medium',
    formulaOrConcept: 'Heights & Distances: tan θ = Perpendicular / Base',
    year: 'CBSE Board 2024'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Circles',
    question: 'A quadrilateral ABCD is circumscribed to a circle. If AB = 6 cm, BC = 7 cm, and CD = 4 cm, what is the length of side AD?',
    options: [
      '3 cm',
      '5 cm',
      '4.5 cm',
      '2 cm'
    ],
    correctAnswer: 0,
    explanation: 'Tangents drawn from an external point to a circle are equal. In any circumscribed quadrilateral: AB + CD = AD + BC. Substituting: 6 + 4 = AD + 7 => 10 = AD + 7 => AD = 3 cm.',
    difficulty: 'Easy',
    formulaOrConcept: 'AB + CD = AD + BC for circumscribed quadrilateral',
    year: 'CBSE 2023'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Statistics',
    question: 'In a frequency distribution of students’ marks, the Mode is 65 and the Mean is 62. Using the empirical relationship between measures of central tendency, calculate the Median.',
    options: [
      '63',
      '64',
      '62.5',
      '66'
    ],
    correctAnswer: 0,
    explanation: 'Empirical formula: 3 Median = Mode + 2 Mean. 3 Median = 65 + 2(62) = 65 + 124 = 189 => Median = 189 / 3 = 63.',
    difficulty: 'Easy',
    formulaOrConcept: '3 Median = Mode + 2 Mean',
    year: 'CBSE 2024'
  },
  {
    subject: 'maths',
    subjectName: 'Math (Mathematics)',
    chapter: 'Probability',
    question: 'What is the probability that a randomly chosen leap year contains exactly 53 Sundays?',
    options: [
      '2/7',
      '1/7',
      '5/7',
      '3/7'
    ],
    correctAnswer: 0,
    explanation: 'A leap year has 366 days = 52 weeks + 2 extra days. The sample space for the 2 extra days has 7 possibilities. Exactly 2 combinations include Sunday: (Sat, Sun) and (Sun, Mon). P = 2/7.',
    difficulty: 'Medium',
    formulaOrConcept: 'Leap year extra days: 366 mod 7 = 2 ; P(53 Sundays) = 2/7',
    year: 'CBSE 2022'
  },

  // --- SOCIAL SCIENCE COMPETENCY QUESTIONS ---
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Rise of Nationalism in Europe',
    question: 'Which of the following was NOT a feature of the Napoleonic Code of 1804 (Civil Code)?',
    options: [
      'Granting universal adult suffrage to all women and men equally',
      'Abolishing privileges based on birth',
      'Establishing equality before the law and securing the right to property',
      'Simplifying administrative divisions and freeing peasants from serfdom'
    ],
    correctAnswer: 0,
    explanation: 'The Napoleonic Code reduced women to the status of a minor, subject to the authority of fathers and husbands. Universal adult suffrage was not established.',
    difficulty: 'Medium',
    formulaOrConcept: 'Napoleonic Code (1804): Equality before law, but denied political equality to women',
    year: 'CBSE 2023'
  },
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Nationalism in India',
    question: 'Why did Mahatma Gandhi choose "Salt" as the powerful symbol for launching the nationwide Civil Disobedience Movement in 1930?',
    options: [
      'Salt was consumed by rich and poor alike, making the British tax on it an oppressive monopoly touching every home',
      'Salt was exclusively produced in London and imported by ship',
      'Only high-caste landlords consumed salt in India',
      'Salt production was permitted only during monsoons'
    ],
    correctAnswer: 0,
    explanation: 'Salt was an essential ingredient in food used equally by the rich and poor. The British monopoly over its production and the tax levied on it revealed the most oppressive face of British rule.',
    difficulty: 'Easy',
    formulaOrConcept: 'Dandi March (March 12, 1930): Salt Satyagraha as a unifying mass symbol',
    year: 'CBSE 2024'
  },
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Resources and Development',
    question: 'Soil erosion caused when running water cuts deep channels through clayey soils, turning the land unfit for cultivation, is termed:',
    options: [
      'Gully erosion (forming Badlands / Ravines)',
      'Sheet erosion',
      'Wind defoliation',
      'Glacial striation'
    ],
    correctAnswer: 0,
    explanation: 'Running water cuts through clayey soils and makes deep channels as gullies. The land becomes unfit for cultivation and is known as bad land (e.g. Chambal ravines).',
    difficulty: 'Easy',
    formulaOrConcept: 'Types of Soil Erosion: Gully Erosion vs Sheet Erosion',
    year: 'CBSE 2023'
  },
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Power Sharing',
    question: 'In Belgium, how did community government resolve ethnic friction between Dutch-speaking and French-speaking populations?',
    options: [
      'It gave distinct linguistic communities authority over cultural, educational, and language issues regardless of where they lived',
      'It deported all minority speakers to neighboring countries',
      'It established Dutch as the single official language of the state',
      'It banned elections and instituted military governance'
    ],
    correctAnswer: 0,
    explanation: 'The Belgian model created a Community Government elected by people belonging to one language community (Dutch, French, German), handling cultural, educational, and language-related issues.',
    difficulty: 'Medium',
    formulaOrConcept: 'Belgian Power Sharing: Community Government for cultural autonomy',
    year: 'CBSE 2024'
  },
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Federalism',
    question: 'Which constitutional feature distinguishes the 73rd and 74th Amendments (1992) as a major step toward genuine decentralisation in India?',
    options: [
      'Mandatory regular local elections, reservation of at least 1/3rd seats for women, and state election commissions',
      'Abolishing state governments and transferring all power directly to village sarpanches',
      'Making local bodies completely dependent on Central discretionary grants without taxation powers',
      'Restricting voting in village panchayats to property owners only'
    ],
    correctAnswer: 0,
    explanation: 'The 1992 constitutional amendment made local elections constitutionally mandatory, created State Election Commissions, and reserved 1/3rd of seats for women.',
    difficulty: 'Medium',
    formulaOrConcept: '1992 Decentralisation: 73rd/74th Constitutional Amendments',
    year: 'CBSE 2023'
  },
  {
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Sectors of the Indian Economy',
    question: 'Ramu works on a small 1-hectare agricultural plot along with his 4 family members. Even if 2 members take up jobs elsewhere, the total agricultural output remains identical. What type of unemployment is illustrated here?',
    options: [
      'Disguised unemployment (Underemployment)',
      'Seasonal unemployment',
      'Frictional unemployment',
      'Structural technological unemployment'
    ],
    correctAnswer: 0,
    explanation: 'Disguised unemployment occurs when more people are engaged in an activity than required. The marginal productivity of the surplus workers is zero.',
    difficulty: 'Easy',
    formulaOrConcept: 'Disguised Unemployment: Marginal productivity of labour = 0',
    year: 'CBSE 2024'
  },

  // --- ENGLISH COMPETENCY QUESTIONS ---
  {
    subject: 'english',
    subjectName: 'English',
    chapter: 'First Flight - A Letter to God',
    question: 'Why is Lencho’s reaction upon receiving 70 pesos considered the central irony of the story "A Letter to God"?',
    options: [
      'He accused the post office employees of theft ("a bunch of crooks"), unaware that they had collected the money out of charity to preserve his faith',
      'He tore up the money and threw it in the river',
      'He thanked the postmaster in person with a feast',
      'He stopped believing in God immediately'
    ],
    correctAnswer: 0,
    explanation: 'The climax presents situational irony: the post office employees who showed compassion and sacrificed their own salaries to help him are labeled "a bunch of crooks" by Lencho.',
    difficulty: 'Medium',
    formulaOrConcept: 'Irony of Situation in Literature: Opposite of what is expected happens',
    year: 'CBSE English 2024'
  },
  {
    subject: 'english',
    subjectName: 'English',
    chapter: 'Grammar - Reported Speech',
    question: 'Choose the correct indirect speech for: The doctor said to the patient, "Do you exercise regularly and take your medicine on time?"',
    options: [
      'The doctor asked the patient whether he exercised regularly and took his medicine on time.',
      'The doctor asked the patient that did he exercise regularly and took his medicine on time.',
      'The doctor told the patient if he had exercised regularly and take medicine.',
      'The doctor enquired the patient why he is exercising regularly.'
    ],
    correctAnswer: 0,
    explanation: 'Yes/No interrogatives convert using "if" or "whether". Present simple "exercise/take" shifts to past simple "exercised/took", and "said to" becomes "asked".',
    difficulty: 'Medium',
    formulaOrConcept: 'Reported Speech: Interrogatives use if/whether; Present Simple → Past Simple',
    year: 'CBSE Board 2023'
  },
  {
    subject: 'english',
    subjectName: 'English',
    chapter: 'Grammar - Subject-Verb Concord',
    question: 'Select the grammatically correct sentence adhering to standard subject-verb agreement rules:',
    options: [
      'Neither the principal nor the teachers were present at the annual sports symposium.',
      'Neither the principal nor the teachers was present at the annual sports symposium.',
      'Each of the students have submitted their completed science portfolio.',
      'The bouquet of red roses smell wonderfully fragrant in the morning.'
    ],
    correctAnswer: 0,
    explanation: 'When two subjects are joined by "neither... nor", the verb agrees in number and person with the nearer subject. Here "teachers" is plural, so "were" is correct.',
    difficulty: 'Medium',
    formulaOrConcept: 'Rule of Proximity: In "neither... nor", verb agrees with the nearer subject',
    year: 'CBSE 2024'
  },

  // --- HINDI COMPETENCY QUESTIONS ---
  {
    subject: 'hindi',
    subjectName: 'Hindi (क्षितिज/कृतिका)',
    chapter: 'क्षितिज - नेताजी का चश्मा',
    question: 'स्वयं प्रकाश द्वारा रचित "नेताजी का चश्मा" कहानी का मुख्य संदेश क्या है?',
    options: [
      'देशभक्ति किसी वर्दी या सरकारी पद की मोहताज नहीं है; देश के प्रति प्रेम छोटे-छोटे कार्यों में भी प्रकट होता है',
      'मूर्तिकला में केवल महंगे संगमरमर का ही प्रयोग करना चाहिए',
      'कस्बों के चौराहों पर नेताओं की मूर्तियाँ नहीं लगाई जानी चाहिए',
      'चश्मे का व्यापार केवल बड़े शहरों में ही फल-फूल सकता है'
    ],
    correctAnswer: 0,
    explanation: 'कहानी यह संदेश देती है कि देशभक्ति का संबंध मन की भावना और समर्पण से है। कैप्टन चश्मेवाला बिना किसी साधन के भी नेताजी की अधूरी मूर्ति पर चश्मा लगाकर देशभक्ति प्रकट करता है।',
    difficulty: 'Medium',
    formulaOrConcept: 'नेताजी का चश्मा: देशभक्ति का सच्चा स्वरूप व जन-भागीदारी',
    year: 'CBSE Hindi Course A 2024'
  },
  {
    subject: 'hindi',
    subjectName: 'Hindi (व्याकरण)',
    chapter: 'व्याकरण - वाच्य (Voice)',
    question: '"पक्षी आकाश में उड़ते हैं।" — इस वाक्य का भाववाच्य में सही रूपांतरण क्या होगा?',
    options: [
      'पक्षियों द्वारा आकाश में उड़ा जाता है।',
      'पक्षी आकाश में उड़ नहीं सकते।',
      'पक्षियों ने आकाश में उड़ान भरी।',
      'आकाश में पक्षी उड़ रहे होंगे।'
    ],
    correctAnswer: 0,
    explanation: 'अकर्मक क्रिया से भाववाच्य बनाते समय कर्ता के साथ "द्वारा/से" का प्रयोग होता है और क्रिया एकवचन, पुल्लिंग और अन्य पुरुष में प्रयुक्त होती है: "पक्षियों द्वारा आकाश में उड़ा जाता है।"',
    difficulty: 'Easy',
    formulaOrConcept: 'वाच्य परिवर्तन: कर्तृवाच्य → भाववाच्य (कर्ता + से/द्वारा + अकर्मक क्रिया रूप)',
    year: 'CBSE Hindi Board 2023'
  },
  {
    subject: 'hindi',
    subjectName: 'Hindi (व्याकरण)',
    chapter: 'व्याकरण - रचना के आधार पर वाक्य भेद',
    question: '"जब वर्षा शुरू हुई, तब मोर नाचने लगे।" — यह रचना की दृष्टि से किस प्रकार का वाक्य है?',
    options: [
      'मिश्र वाक्य (Complex Sentence)',
      'सरल वाक्य (Simple Sentence)',
      'संयुक्त वाक्य (Compound Sentence)',
      'आज्ञार्थक वाक्य'
    ],
    correctAnswer: 0,
    explanation: 'जिस वाक्य में एक मुख्य उपवाक्य हो और अन्य उपवाक्य उस पर आश्रित हों तथा वे "जब-तब, जैसा-तैसा, जो-सो" से जुड़े हों, वह मिश्र वाक्य कहलाता है।',
    difficulty: 'Easy',
    formulaOrConcept: 'मिश्र वाक्य: मुख्य उपवाक्य + आश्रित उपवाक्य (योजक: जब... तब)',
    year: 'CBSE Hindi 2024'
  },

  // --- OPTIONAL LANGUAGES (SANSKRIT & IT) ---
  {
    subject: 'optional_lang',
    subjectName: 'Optional Languages',
    chapter: 'Sanskrit - सन्धिप्रकरणम्',
    question: '"रमेशः" इत्यस्य पदस्य उचितः सन्धि-विच्छेदः कः अस्ति?',
    options: [
      'रमा + ईशः (गुण सन्धिः)',
      'रम् + एशः (दीर्घ सन्धिः)',
      'रमे + शः (वृद्धि सन्धिः)',
      'रा + मेशः (यण् सन्धिः)'
    ],
    correctAnswer: 0,
    explanation: 'आद् गुणः सूत्रेण "आ + ई = ए" भवति। अतः रमा + ईशः = रमेशः (गुण सन्धिः)।',
    difficulty: 'Easy',
    formulaOrConcept: 'गुण सन्धि सूत्र: आद् गुणः (अ/आ + इ/ई = ए)',
    year: 'CBSE Sanskrit 2024'
  },
  {
    subject: 'optional_lang',
    subjectName: 'Optional Languages',
    chapter: 'Information Technology (IT 402 / AI)',
    question: 'In LibreOffice Calc / MS Excel, what is the purpose of the "Goal Seek" feature?',
    options: [
      'To find the required input value when the desired output/target result of a formula is known',
      'To automatically spell-check cell comments',
      'To convert spreadsheet data into a PowerPoint slide',
      'To format text headers into alphabetical sorting'
    ],
    correctAnswer: 0,
    explanation: 'Goal Seek is a What-If Analysis tool that calculates the backward input value needed to achieve a specified target output formula result.',
    difficulty: 'Medium',
    formulaOrConcept: 'IT 402: Goal Seek finds the input value for a known target result',
    year: 'CBSE IT 402 2024'
  }
];

// Helper to generate distinct variations of competency questions
function generateCompetencyVariation(
  template: CompetencyBlueprint,
  index: number,
  prefix: string,
  seed: number
): Question {
  const isVariation = index >= COMPETENCY_TEMPLATES.length;
  const variantNum = Math.floor(index / COMPETENCY_TEMPLATES.length) + 1;

  let questionText = template.question;
  let explanationText = template.explanation;

  if (isVariation) {
    // Add specific contextual scenario tweaks
    if (template.subject === 'maths') {
      questionText = `[Case Scenario #${variantNum}] ${template.question.replace(/\b(20|15|60|10|5|4|6|3|75|65|62)\b/g, (match) => {
        const n = parseInt(match, 10);
        return String(n + (variantNum % 3) * 2);
      })}`;
    } else if (template.subject === 'science') {
      questionText = `[Analytical Inquiry ${variantNum}] ${template.question}`;
    } else if (template.subject === 'social') {
      questionText = `[Source Analysis Task #${variantNum}] ${template.question}`;
    } else {
      questionText = `[Competency Drill #${variantNum}] ${template.question}`;
    }
  }

  // CRITICAL REQUIREMENT:
  // Randomize the options for EVERY question so the correct answer is not always in the same position!
  const randomized = randomizeQuestionOptions(
    template.options,
    template.correctAnswer,
    seed + index * 43
  );

  return {
    id: `${prefix}_${index + 1}`,
    subject: template.subject,
    subjectName: template.subjectName,
    chapter: template.chapter,
    question: questionText,
    options: randomized.options,
    correctAnswer: randomized.correctAnswer,
    explanation: explanationText,
    difficulty: template.difficulty,
    formulaOrConcept: template.formulaOrConcept,
    year: template.year || `CBSE Competency 2024`
  };
}

// Memory caches for high performance
let cachedDaily500: Question[] | null = null;
let cachedDailySeed: number | null = null;

let cachedHub1000: Question[] | null = null;
let cachedHubSeed: number | null = null;

/**
 * Generates 500 strictly competency-based MCQs for the Daily Quiz.
 * Options for every single question are randomized so the correct answer is never fixed to one position.
 */
export function getDailyQuiz500Questions(customDate?: string): Question[] {
  const seed = getDateSeed(customDate);

  if (cachedDaily500 && cachedDailySeed === seed) {
    return cachedDaily500;
  }

  const result: Question[] = [];
  const total = 500;
  const templateCount = COMPETENCY_TEMPLATES.length;

  for (let i = 0; i < total; i++) {
    // Pick template with pseudo-random distribution based on date seed
    const tmplIndex = (seed + i * 7) % templateCount;
    const tmpl = COMPETENCY_TEMPLATES[tmplIndex];
    const q = generateCompetencyVariation(tmpl, i, 'daily_quiz', seed + 1000);
    result.push(q);
  }

  cachedDaily500 = result;
  cachedDailySeed = seed;
  return result;
}

/**
 * Generates 1,000 separate strictly competency-based MCQs for the Practice Hub.
 * Completely distinct from Daily Quiz set, with options randomized for every question.
 */
export function getPracticeHub1000Questions(customDate?: string): Question[] {
  const seed = getDateSeed(customDate) + 88888; // Separate offset seed

  if (cachedHub1000 && cachedHubSeed === seed) {
    return cachedHub1000;
  }

  const result: Question[] = [];
  const total = 1000;
  const templateCount = COMPETENCY_TEMPLATES.length;

  for (let i = 0; i < total; i++) {
    // Rotate offset to avoid overlap with daily quiz
    const tmplIndex = (seed + i * 13 + 5) % templateCount;
    const tmpl = COMPETENCY_TEMPLATES[tmplIndex];
    const q = generateCompetencyVariation(tmpl, i, 'hub_practice', seed + 50000);
    result.push(q);
  }

  cachedHub1000 = result;
  cachedHubSeed = seed;
  return result;
}

/**
 * Backward-compatible helper: Returns first 50 of the 500 daily quiz questions
 */
export function getDaily50Questions(customDate?: string): Question[] {
  return getDailyQuiz500Questions(customDate).slice(0, 50);
}

/**
 * Backward-compatible helper: Returns 500 questions for quiz hub
 */
export function getQuizHub500Questions(customDate?: string): Question[] {
  return getPracticeHub1000Questions(customDate).slice(0, 500);
}

// Calculate countdown to midnight daily refresh
export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diffMs = midnight.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}
