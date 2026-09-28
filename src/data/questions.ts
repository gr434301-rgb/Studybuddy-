import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // SCIENCE
  {
    id: 'sci_1',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Chemical Reactions and Equations',
    question: 'When aqueous solutions of barium chloride and sodium sulphate react, an insoluble white precipitate is formed. What type of reaction is this?',
    options: [
      'Decomposition reaction',
      'Combination reaction',
      'Double displacement and precipitation reaction',
      'Thermal displacement reaction'
    ],
    correctAnswer: 2,
    explanation: 'BaCl2(aq) + Na2SO4(aq) -> BaSO4(s) + 2NaCl(aq). Exchange of ions takes place and an insoluble white precipitate of BaSO4 is formed, making it both a double displacement and precipitation reaction.',
    difficulty: 'Easy',
    formulaOrConcept: 'Ba²⁺ + SO₄²⁻ → BaSO₄ (white ppt)',
    year: 'CBSE 2023'
  },
  {
    id: 'sci_2',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Acids, Bases and Salts',
    question: 'What is the chemical formula of Plaster of Paris (POP) and how is it prepared from Gypsum?',
    options: [
      'CaSO4 · 2H2O heated at 300 K',
      'CaSO4 · 1/2H2O heated at 373 K',
      'CaSO4 · 1/2H2O heated at 273 K',
      'CaOCl2 heated at 373 K'
    ],
    correctAnswer: 1,
    explanation: 'Plaster of Paris is calcium sulphate hemihydrate (CaSO4 · 1/2H2O). It is obtained by heating gypsum (CaSO4 · 2H2O) at 373 K (100°C). If heated beyond this temperature, dead burnt plaster is formed.',
    difficulty: 'Medium',
    formulaOrConcept: 'CaSO₄ · 2H₂O —(373K)→ CaSO₄ · ½H₂O + 1½H₂O',
    year: 'CBSE 2022'
  },
  {
    id: 'sci_3',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Life Processes',
    question: 'Which enzyme present in saliva breaks down complex starch molecules into simpler maltose sugars?',
    options: [
      'Pepsin',
      'Trypsin',
      'Salivary Amylase (Ptyalin)',
      'Lipase'
    ],
    correctAnswer: 2,
    explanation: 'Salivary amylase (also known as ptyalin) is secreted by salivary glands in the mouth and begins the chemical digestion of carbohydrates by breaking starch down into simpler sugars like maltose at an optimum pH of around 6.8.',
    difficulty: 'Easy',
    formulaOrConcept: 'Starch + Salivary Amylase → Maltose',
    year: 'CBSE 2024'
  },
  {
    id: 'sci_4',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Light - Reflection and Refraction',
    question: 'An object is placed at a distance of 20 cm in front of a concave mirror of focal length 15 cm. What is the nature and position of the image?',
    options: [
      'Virtual, erect and behind the mirror',
      'Real, inverted and at -60 cm in front of mirror',
      'Real, erect and at +30 cm',
      'Virtual, inverted and at -30 cm'
    ],
    correctAnswer: 1,
    explanation: 'Using mirror formula 1/f = 1/v + 1/u with sign convention (u = -20 cm, f = -15 cm): 1/v = 1/(-15) - 1/(-20) = -1/15 + 1/20 = -1/60. Hence v = -60 cm. Since v is negative and m = -v/u is negative, the image is real, inverted, magnified and formed at 60 cm in front of the mirror.',
    difficulty: 'HOTS',
    formulaOrConcept: '1/f = 1/v + 1/u, m = -v/u',
    year: 'CBSE 2023 HOTS'
  },
  {
    id: 'sci_5',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Electricity',
    question: 'A wire of resistance R is cut into five equal parts. These parts are then connected in parallel. If the equivalent resistance of this combination is R\', what is the ratio R/R\'?',
    options: [
      '1/25',
      '1/5',
      '5',
      '25'
    ],
    correctAnswer: 3,
    explanation: 'Each piece has resistance r = R/5. When 5 such resistors are connected in parallel: 1/R\' = 1/r + 1/r + 1/r + 1/r + 1/r = 5/r = 5/(R/5) = 25/R. Therefore, R\' = R/25, which gives the ratio R/R\' = 25.',
    difficulty: 'HOTS',
    formulaOrConcept: 'r = R/n, 1/R_parallel = n/r = n² / R',
    year: 'NCERT Exemplar'
  },
  {
    id: 'sci_6',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Electricity',
    question: 'According to Joule\'s law of heating, the heat produced in a resistor is directly proportional to:',
    options: [
      'Square of the current (I²), resistance (R), and time (t)',
      'Current (I), square of resistance (R²), and time (t)',
      'Inverse of resistance (1/R) and current (I)',
      'Square of voltage (V²) only'
    ],
    correctAnswer: 0,
    explanation: 'Joule\'s Law of Heating states that H = I²Rt. The heat produced is directly proportional to the square of the current, directly proportional to resistance for a given current, and directly proportional to the time for which current flows.',
    difficulty: 'Easy',
    formulaOrConcept: 'H = I² · R · t = V · I · t',
    year: 'CBSE 2020'
  },
  {
    id: 'sci_7',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Metals and Non-metals',
    question: 'Which of the following metals is extracted by the reduction of its oxide using aluminium powder in the thermite process?',
    options: [
      'Sodium',
      'Iron / Manganese',
      'Gold',
      'Magnesium'
    ],
    correctAnswer: 1,
    explanation: 'The reduction of iron(III) oxide (Fe2O3) or manganese dioxide (MnO2) by aluminium powder is highly exothermic, producing molten metal used to join railway tracks. This is known as the Thermite reaction.',
    difficulty: 'Medium',
    formulaOrConcept: 'Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat',
    year: 'CBSE 2021'
  },
  {
    id: 'sci_8',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Life Processes',
    question: 'What is the correct sequence of blood flow in human double circulation starting from deoxygenated blood?',
    options: [
      'Body tissues -> Right Atrium -> Right Ventricle -> Lungs -> Left Atrium -> Left Ventricle -> Aorta -> Body',
      'Body tissues -> Left Atrium -> Left Ventricle -> Lungs -> Right Atrium -> Body',
      'Lungs -> Right Ventricle -> Body tissues -> Left Atrium',
      'Right Ventricle -> Aorta -> Lungs -> Left Atrium'
    ],
    correctAnswer: 0,
    explanation: 'Deoxygenated blood enters the Right Atrium via vena cava, passes into Right Ventricle, is pumped to Lungs via pulmonary artery, returns oxygenated to Left Atrium via pulmonary veins, into Left Ventricle, and is pumped to the whole body via Aorta.',
    difficulty: 'Medium',
    formulaOrConcept: 'Vena Cava → RA → RV → Pulm Artery → Lungs → Pulm Vein → LA → LV → Aorta',
    year: 'CBSE 2022'
  },
  {
    id: 'sci_9',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Magnetic Effects of Electric Current',
    question: 'In Fleming\'s Left-Hand Rule, the forefinger, middle finger, and thumb represent respectively:',
    options: [
      'Current, Magnetic Field, Force',
      'Magnetic Field, Electric Current, Direction of Force / Motion',
      'Force, Current, Magnetic Field',
      'Motion, Induced Current, Magnetic Field'
    ],
    correctAnswer: 1,
    explanation: 'In Fleming\'s Left-Hand Rule: Forefinger represents Magnetic Field (F = Field), Middle finger represents Current (C = Current), and Thumb represents Motion or Force (M/Th = Motion).',
    difficulty: 'Easy',
    formulaOrConcept: 'Thumb = Force, Forefinger = Field, Middle = Current (FBI)',
    year: 'CBSE 2023'
  },
  {
    id: 'sci_10',
    subject: 'science',
    subjectName: 'Science',
    chapter: 'Carbon and its Compounds',
    question: 'What is the functional group present in Ethanoic acid and what happens when it reacts with Ethanol in presence of conc. H2SO4?',
    options: [
      '-CHO; forms aldehyde',
      '-COOH; forms sweet-smelling ester (Ethyl Ethanoate)',
      '-OH; forms soap immediately',
      '-CO-; forms ketone'
    ],
    correctAnswer: 1,
    explanation: 'Ethanoic acid has the carboxylic acid group (-COOH). When treated with ethanol in presence of conc. H2SO4 (catalyst/dehydrating agent), esterification occurs producing ethyl ethanoate (CH3COOC2H5), a sweet-smelling ester used in perfumes.',
    difficulty: 'Medium',
    formulaOrConcept: 'CH₃COOH + C₂H₅OH —(conc H₂SO₄)→ CH₃COOC₂H₅ + H₂O',
    year: 'CBSE 2024'
  },

  // MATHEMATICS
  {
    id: 'math_1',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Real Numbers',
    question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x and y are prime numbers, then HCF(a, b) is:',
    options: [
      'xy',
      'xy²',
      'x³y³',
      'x²y²'
    ],
    correctAnswer: 1,
    explanation: 'HCF of two numbers is the product of the smallest power of each common prime factor involved in the numbers. Smallest power of x is x¹, smallest power of y is y². Thus HCF(a, b) = xy².',
    difficulty: 'Easy',
    formulaOrConcept: 'HCF = Product of lowest powers of common prime factors',
    year: 'CBSE 2023 Standard'
  },
  {
    id: 'math_2',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Polynomials',
    question: 'If α and β are the zeros of the quadratic polynomial f(x) = x² - 5x + 6, find the value of (1/α + 1/β).',
    options: [
      '5/6',
      '-5/6',
      '6/5',
      '1/5'
    ],
    correctAnswer: 0,
    explanation: 'For ax² + bx + c = 0, α + β = -b/a = -(-5)/1 = 5, and αβ = c/a = 6/1 = 6. Therefore, 1/α + 1/β = (α + β) / (αβ) = 5/6.',
    difficulty: 'Easy',
    formulaOrConcept: 'α + β = -b/a, αβ = c/a, 1/α + 1/β = (α+β)/αβ',
    year: 'CBSE 2022'
  },
  {
    id: 'math_3',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Pair of Linear Equations in Two Variables',
    question: 'For what value of k will the pair of equations 2x + 3y = 7 and (k-1)x + (k+2)y = 3k have infinitely many solutions?',
    options: [
      'k = 5',
      'k = 7',
      'k = 3',
      'k = -1'
    ],
    correctAnswer: 1,
    explanation: 'Condition for infinitely many solutions is a1/a2 = b1/b2 = c1/c2. Here, 2/(k-1) = 3/(k+2) = 7/(3k). From 2/(k-1) = 3/(k+2) => 2k + 4 = 3k - 3 => k = 7. Checking with 7/(3*7) = 1/3, 2/(7-1) = 2/6 = 1/3. So k = 7.',
    difficulty: 'Medium',
    formulaOrConcept: 'a₁/a₂ = b₁/b₂ = c₁/c₂ (Coincident lines)',
    year: 'CBSE 2021'
  },
  {
    id: 'math_4',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Quadratic Equations',
    question: 'If the quadratic equation 2x² - kx + 8 = 0 has two real and equal roots, what is the value of k?',
    options: [
      '± 4',
      '± 8',
      '± 16',
      '8 only'
    ],
    correctAnswer: 1,
    explanation: 'For real and equal roots, discriminant D = b² - 4ac = 0. Here a = 2, b = -k, c = 8. (-k)² - 4(2)(8) = 0 => k² - 64 = 0 => k² = 64 => k = ±8.',
    difficulty: 'Medium',
    formulaOrConcept: 'D = b² - 4ac = 0 for equal roots',
    year: 'CBSE 2020'
  },
  {
    id: 'math_5',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Arithmetic Progressions',
    question: 'If the 7th term of an AP is 1/9 and the 9th term is 1/7, find its 63rd term (a₆₃).',
    options: [
      '0',
      '1',
      '63',
      '1/63'
    ],
    correctAnswer: 1,
    explanation: 'Let first term be a and common difference be d. a7 = a + 6d = 1/9 and a9 = a + 8d = 1/7. Subtracting: 2d = 1/7 - 1/9 = 2/63 => d = 1/63. Then a = 1/9 - 6/63 = 7/63 - 6/63 = 1/63. Now a63 = a + 62d = 1/63 + 62/63 = 63/63 = 1.',
    difficulty: 'HOTS',
    formulaOrConcept: 'a_n = a + (n-1)d',
    year: 'CBSE HOTS Standard'
  },
  {
    id: 'math_6',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Introduction to Trigonometry',
    question: 'If sin θ + sin² θ = 1, then the value of the expression (cos² θ + cos⁴ θ) is:',
    options: [
      '1',
      '2',
      '0',
      '1/2'
    ],
    correctAnswer: 0,
    explanation: 'Given: sin θ + sin² θ = 1 => sin θ = 1 - sin² θ = cos² θ. Now substitute sin θ for cos² θ in the expression: cos² θ + cos⁴ θ = sin θ + (cos² θ)² = sin θ + sin² θ = 1.',
    difficulty: 'HOTS',
    formulaOrConcept: 'sin²θ + cos²θ = 1',
    year: 'CBSE 2023'
  },
  {
    id: 'math_7',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Coordinate Geometry',
    question: 'Find the coordinates of the point which divides the line segment joining A(4, -3) and B(8, 5) in the ratio 3:1 internally.',
    options: [
      '(7, 3)',
      '(6, 1)',
      '(7, 1)',
      '(5, 2)'
    ],
    correctAnswer: 0,
    explanation: 'Using section formula: x = (m1*x2 + m2*x1)/(m1+m2) = (3*8 + 1*4)/(3+1) = 28/4 = 7. y = (m1*y2 + m2*y1)/(m1+m2) = (3*5 + 1*(-3))/(3+1) = (15-3)/4 = 12/4 = 3. Point is (7, 3).',
    difficulty: 'Medium',
    formulaOrConcept: 'x = (m₁x₂ + m₂x₁)/(m₁+m₂), y = (m₁y₂ + m₂y₁)/(m₁+m₂)',
    year: 'CBSE 2022'
  },
  {
    id: 'math_8',
    subject: 'maths',
    subjectName: 'Mathematics',
    chapter: 'Statistics',
    question: 'If for a given data, Mean = 24 and Median = 26, then using the empirical relationship, Mode is:',
    options: [
      '30',
      '28',
      '25',
      '32'
    ],
    correctAnswer: 0,
    explanation: 'The empirical relationship between mean, median and mode is: Mode = 3 Median - 2 Mean. Substituting values: Mode = 3(26) - 2(24) = 78 - 48 = 30.',
    difficulty: 'Easy',
    formulaOrConcept: 'Mode = 3(Median) - 2(Mean)',
    year: 'CBSE 2024'
  },

  // SOCIAL SCIENCE
  {
    id: 'soc_1',
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'The Rise of Nationalism in Europe',
    question: 'Who hosted the famous Congress of Vienna in 1815 and which royal dynasty was restored to power in France?',
    options: [
      'Duke Metternich; Bourbon Dynasty',
      'Giuseppe Mazzini; Bonaparte Dynasty',
      'Otto von Bismarck; Habsburg Dynasty',
      'Napoleon; Romanov Dynasty'
    ],
    correctAnswer: 0,
    explanation: 'The Congress of Vienna (1815) was hosted by Austrian Chancellor Duke Metternich to draw up a peace settlement for Europe. The Bourbon dynasty, which had been deposed during the French Revolution, was restored to power in France.',
    difficulty: 'Easy',
    formulaOrConcept: 'Congress of Vienna 1815 → Metternich + Bourbon Restoration',
    year: 'CBSE 2023'
  },
  {
    id: 'soc_2',
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Nationalism in India',
    question: 'Why did Mahatma Gandhi organize the historic Salt March (Dandi March) from Sabarmati to Dandi in 1930?',
    options: [
      'To demand complete independence from the Simon Commission directly',
      'To break the government monopoly on salt production and protest against the salt tax',
      'To support the Khilafat leaders in Bombay',
      'To protest the Rowlatt Act execution'
    ],
    correctAnswer: 1,
    explanation: 'Salt was an essential commodity consumed by rich and poor alike. The tax on salt and the British government\'s monopoly over its manufacture revealed the most oppressive face of British rule. Gandhi marched 240 miles to break this law on April 6, 1930.',
    difficulty: 'Easy',
    formulaOrConcept: 'Dandi March (March 12 - April 6, 1930) launched Civil Disobedience',
    year: 'CBSE 2022'
  },
  {
    id: 'soc_3',
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Power Sharing & Federalism',
    question: 'Which of the following subjects is correctly matched with its constitutional legislative list in India?',
    options: [
      'Banking and Defence - Union List',
      'Police and Agriculture - Concurrent List',
      'Education and Forests - State List',
      'Computer Software - State List'
    ],
    correctAnswer: 0,
    explanation: 'Defence, Foreign Affairs, Banking, and Currency belong to the Union List. Police, Agriculture, and Trade belong to the State List. Education and Forests belong to Concurrent List. Computer software is a residuary subject.',
    difficulty: 'Medium',
    formulaOrConcept: 'Union (Centre), State (State Gov), Concurrent (Both), Residuary (Centre)',
    year: 'CBSE 2024'
  },
  {
    id: 'soc_4',
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Money and Credit',
    question: 'Why are Self-Help Groups (SHGs) considered a revolutionary financial initiative for rural women in India?',
    options: [
      'They provide interest-free loans from multinational corporations',
      'They pool small savings, provide collateral-free credit at reasonable rates, and empower women socially',
      'They replace all nationalized banks in villages',
      'They only give loans for political campaigns'
    ],
    correctAnswer: 1,
    explanation: 'A typical SHG has 15-20 members who pool regular small savings. Members can take small loans from the group without requiring collateral, escaping moneylenders, and regular meetings provide a platform to discuss social issues like health and domestic violence.',
    difficulty: 'Medium',
    formulaOrConcept: 'SHGs → Micro-credit without collateral + Women Empowerment',
    year: 'CBSE 2023'
  },
  {
    id: 'soc_5',
    subject: 'social',
    subjectName: 'Social Science',
    chapter: 'Resources and Development',
    question: 'Which type of soil covers the entire northern plains of India and is formed by deposits brought down by the Indus, Ganga, and Brahmaputra river systems?',
    options: [
      'Black Soil (Regur)',
      'Alluvial Soil (Khadar and Bangar)',
      'Laterite Soil',
      'Red and Yellow Soil'
    ],
    correctAnswer: 1,
    explanation: 'Alluvial soil is the most widely spread and important soil of India. The entire northern plains are made of alluvial soil deposited by the Indus, Ganga, and Brahmaputra rivers. It is divided into Khadar (new, fertile) and Bangar (old, higher kankar nodules).',
    difficulty: 'Easy',
    formulaOrConcept: 'Alluvial Soil = Northern Plains (Khadar / Bangar)',
    year: 'CBSE 2021'
  },

  // ENGLISH
  {
    id: 'eng_1',
    subject: 'english',
    subjectName: 'English (Language & Lit)',
    chapter: 'A Letter to God',
    question: 'Why did Lencho call the post office employees a "bunch of crooks" at the end of the story?',
    options: [
      'Because they refused to deliver his letter to God',
      'Because he received only 70 pesos out of 100 and believed they stole the rest',
      'Because they destroyed his cornfield',
      'Because they mocked his farming methods'
    ],
    correctAnswer: 1,
    explanation: 'Lencho had unquestionable faith in God and was confident God could not make a mistake. Unaware that the postmaster and staff had charitably collected and sent 70 pesos, he blamed the employees for stealing the remaining 30 pesos, creating a sharp ironic ending.',
    difficulty: 'Easy',
    formulaOrConcept: 'Theme of dramatic irony & blind unquestioning faith',
    year: 'CBSE 2023'
  },
  {
    id: 'eng_2',
    subject: 'english',
    subjectName: 'English (Language & Lit)',
    chapter: 'Nelson Mandela: Long Walk to Freedom',
    question: 'According to Nelson Mandela, what does "courage" truly mean?',
    options: [
      'The complete absence of fear',
      'The triumph over fear',
      'Physical strength and fighting ability',
      'Never feeling pain in prison'
    ],
    correctAnswer: 1,
    explanation: 'Mandela learned that courage was not the absence of fear, but the triumph over it. The brave man is not he who does not feel afraid, but he who conquers that fear.',
    difficulty: 'Easy',
    formulaOrConcept: 'Quote: "Courage was not the absence of fear, but the triumph over it"',
    year: 'CBSE 2024'
  },
  {
    id: 'eng_3',
    subject: 'english',
    subjectName: 'English (Grammar)',
    chapter: 'Reported Speech & Modals',
    question: 'Choose the correct indirect speech for: The teacher said to the students, "Work hard if you want to score above 90%."',
    options: [
      'The teacher told the students that work hard if they wanted to score above 90%.',
      'The teacher advised the students to work hard if they wanted to score above 90%.',
      'The teacher asked the students to work hard if you wanted to score above 90%.',
      'The teacher ordered the students that they should work hard if you want 90%.'
    ],
    correctAnswer: 1,
    explanation: 'Imperative sentence conversion: "said to" becomes "advised", followed by infinitive "to work hard", and present tense verbs "want" shift to past "wanted", with second person pronoun "you" changing to "they".',
    difficulty: 'Medium',
    formulaOrConcept: 'Direct: Advice → Indirect: advised + object + to-infinitive',
    year: 'CBSE Board Grammar'
  },

  // HINDI
  {
    id: 'hin_1',
    subject: 'hindi',
    subjectName: 'Hindi (क्षितिज व कृतिका)',
    chapter: 'नेताजी का चश्मा',
    question: 'हालदार साहब को हर पंद्रहवें दिन कस्बे से क्यों गुजरना पड़ता था और मूर्ति पर लगे चश्मे को कौन बदलता था?',
    options: [
      'कंपनी के काम के सिलसिले में; कैप्टन चश्मेवाला',
      'पान खाने के शौक के कारण; मास्टर मोतीलाल',
      'नगरपालिका के निरीक्षण हेतु; पानवाला',
      'अपने गाँव जाने के लिए; हालदार साहब का ड्राइवर'
    ],
    correctAnswer: 0,
    explanation: 'हालदार साहब अपनी कंपनी के काम के सिलसिले में उस कस्बे से हर पंद्रहवें दिन गुजरते थे। नेताजी की संगमरमर की अधूरी मूर्ति पर चश्मा लगाने व बदलने का देशभक्तिपूर्ण कार्य कैप्टन चश्मेवाला करता था।',
    difficulty: 'Easy',
    formulaOrConcept: 'कहानीकार: स्वयं प्रकाश, मुख्य पात्र: हालदार साहब, पानवाला, कैप्टन',
    year: 'CBSE 2023'
  },
  {
    id: 'hin_2',
    subject: 'hindi',
    subjectName: 'Hindi (क्षितिज व कृतिका)',
    chapter: 'बालगोबिन भगत',
    question: 'बेटे की मृत्यु होने पर बालगोबिन भगत ने विलाप करने के स्थान पर उत्सव मनाने को क्यों कहा?',
    options: [
      'क्योंकि वे अपने बेटे से अत्यधिक क्रोधित थे',
      'क्योंकि कबीर दर्शन के अनुसार विरहिणी आत्मा अपने प्रियतम परमात्मा से मिलने चली गई थी',
      'क्योंकि वे अपनी पुत्रवधू से छुटकारा पाना चाहते थे',
      'क्योंकि वे गाँव वालों को चकित करना चाहते थे'
    ],
    correctAnswer: 1,
    explanation: 'बालगोबिन भगत सच्चे कबीरपंथी साधु थे। उनकी मान्यता थी कि आत्मा परमात्मा का ही अंश है। शरीर नश्वर है और आत्मा अमर है। बेटे की मृत्यु पर आत्मा अपने परम प्रियतम परमात्मा से मिल गई, अतः यह शोक का नहीं, बल्कि आध्यात्मिक मिलन का आनंदमय उत्सव है।',
    difficulty: 'Medium',
    formulaOrConcept: 'रेखाचित्र: रामवृक्ष बेनीपुरी, कबीर दर्शन: आत्मा-परमात्मा का मिलन',
    year: 'CBSE 2022'
  },
  {
    id: 'hin_3',
    subject: 'hindi',
    subjectName: 'Hindi (क्षितिज व कृतिका)',
    chapter: 'सूरदास के पद',
    question: 'गोपियों ने अपने लिए श्रीकृष्ण को किस पक्षी की लकड़ी के समान बताया है और उद्धव के योग संदेश की तुलना किससे की है?',
    options: [
      'चातक पक्षी; मीठे दूध से',
      'हारिल पक्षी; कड़वी ककड़ी से',
      'हंस पक्षी; निर्मल जल से',
      'मयूर पक्षी; विषैले बाण से'
    ],
    correctAnswer: 1,
    explanation: 'गोपियों ने पद में कहा है: "हमारैं हरि हारिल की लकरी।" जैसे हारिल पक्षी अपने पंजों से लकड़ी को हर समय पकड़े रहता है, वैसे ही गोपियों ने मन, क्रम और वचन से कृष्ण को थाम रखा है। उद्धव का योग संदेश उन्हें "करुई ककरी" (कड़वी ककड़ी) जैसा अरुचिकर लगता है।',
    difficulty: 'Easy',
    formulaOrConcept: 'भ्रमरगीत: सूरदास, "हमारैं हरि हारिल की लकरी", योग संदेश = कड़वी ककड़ी',
    year: 'CBSE 2024'
  },
  {
    id: 'hin_4',
    subject: 'hindi',
    subjectName: 'Hindi (क्षितिज व कृतिका)',
    chapter: 'राम-लक्ष्मण-परशुराम संवाद',
    question: '"नाथ संभुधनु भंजनिहारा। होइहि केउ एक दास तुम्हारा॥" यह शांत और विनयपूर्ण कथन सभा में किसने और किससे कहा था?',
    options: [
      'लक्ष्मण ने विश्वामित्र से',
      'श्रीराम ने परशुराम जी से',
      'जनक ने परशुराम जी से',
      'विश्वामित्र ने श्रीराम से'
    ],
    correctAnswer: 1,
    explanation: 'शिवधनुष टूटने पर जब परशुराम प्रचंड क्रोध में भरकर सभा में गर्जना करते हैं, तब मर्यादा पुरुषोत्तम श्रीराम अत्यंत विनीत स्वर में कहते हैं कि हे नाथ! भगवान शिव के धनुष को तोड़ने वाला आपका ही कोई एक दास होगा।',
    difficulty: 'Easy',
    formulaOrConcept: 'रामचरितमानस (बालकांड): तुलसीदास, भाषा: अवधी, शांत व विनय भाव',
    year: 'CBSE 2023'
  },
  {
    id: 'hin_5',
    subject: 'hindi',
    subjectName: 'Hindi (व्याकरण)',
    chapter: 'रचना के आधार पर वाक्य भेद',
    question: '"सूर्योदय हुआ और कुहासा दूर हो गया।" रचना की दृष्टि से यह किस प्रकार का वाक्य है?',
    options: [
      'सरल वाक्य',
      'संयुक्त वाक्य',
      'मिश्र वाक्य',
      'संदेहवाचक वाक्य'
    ],
    correctAnswer: 1,
    explanation: 'यहाँ दो स्वतंत्र उपवाक्य ("सूर्योदय हुआ" और "कुहासा दूर हो गया") समानाधिकरण समुच्चयबोधक अव्यय "और" से जुड़े हैं। अतः यह संयुक्त वाक्य है।',
    difficulty: 'Medium',
    formulaOrConcept: 'संयुक्त वाक्य पहचान: और, तथा, एवं, या, अथवा, किंतु, परंतु, लेकिन',
    year: 'CBSE Board Grammar'
  },
  {
    id: 'hin_6',
    subject: 'hindi',
    subjectName: 'Hindi (व्याकरण)',
    chapter: 'वाच्य एवं पद परिचय',
    question: '"लड़की से दौड़ा नहीं जाता।" इस वाक्य में कौन-सा वाच्य है?',
    options: [
      'कर्तृवाच्य',
      'कर्मवाच्य',
      'भाववाच्य',
      'करणवाच्य'
    ],
    correctAnswer: 2,
    explanation: 'इस वाक्य में क्रिया अकर्मक है, कर्ता के साथ "से" कारक चिह्न लगा है, असमर्थता का भाव है तथा क्रिया भाव के अनुसार पुल्लिंग, एकवचन और अन्य पुरुष में है। अतः यह भाववाच्य है।',
    difficulty: 'Medium',
    formulaOrConcept: 'भाववाच्य: अकर्मक क्रिया + कर्ता के साथ "से/के द्वारा" + सदैव पुल्लिंग एकवचन क्रिया',
    year: 'CBSE 2022'
  }
];
