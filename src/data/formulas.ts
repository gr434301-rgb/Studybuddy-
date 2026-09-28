import { FormulaItem } from '../types';

export const FORMULAS_DATA: FormulaItem[] = [
  // MATHS
  {
    id: 'f_math_1',
    subject: 'maths',
    category: 'Algebra & Quadratics',
    title: 'Quadratic Formula (Sridharacharya)',
    formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    variables: 'a = coeff of x², b = coeff of x, c = constant term, D = b² - 4ac',
    application: 'Used to find the roots of any quadratic equation ax² + bx + c = 0.'
  },
  {
    id: 'f_math_2',
    subject: 'maths',
    category: 'Arithmetic Progressions',
    title: 'nth Term & Sum of AP',
    formula: 'a_n = a + (n - 1)d \\quad | \\quad S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)',
    variables: 'a = first term, d = common difference, n = total terms, l = last term',
    application: 'Finding missing terms, position of numbers, and total series summation.'
  },
  {
    id: 'f_math_3',
    subject: 'maths',
    category: 'Coordinate Geometry',
    title: 'Distance & Section Formula',
    formula: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\quad | \\quad (x, y) = \\left(\\frac{m_1x_2 + m_2x_1}{m_1 + m_2}, \\frac{m_1y_2 + m_2y_1}{m_1 + m_2}\\right)',
    variables: '(x1, y1), (x2, y2) = endpoints; m1:m2 = internal division ratio',
    application: 'Calculating lengths of segments, midpoints ((x1+x2)/2, (y1+y2)/2), and dividing ratios.'
  },
  {
    id: 'f_math_4',
    subject: 'maths',
    category: 'Trigonometry',
    title: 'Fundamental Pythagorean Identities',
    formula: '\\sin^2\\theta + \\cos^2\\theta = 1 \\quad | \\quad 1 + \\tan^2\\theta = \\sec^2\\theta \\quad | \\quad 1 + \\cot^2\\theta = \\csc^2\\theta',
    variables: 'θ = acute angle (0° ≤ θ ≤ 90°)',
    application: 'Essential for trigonometry proofs, simplification, and height & distance calculations.'
  },
  {
    id: 'f_math_5',
    subject: 'maths',
    category: 'Statistics',
    title: 'Empirical Relationship',
    formula: '\\text{Mode} = 3(\\text{Median}) - 2(\\text{Mean})',
    variables: 'Mean (average), Median (middle value), Mode (most frequent)',
    application: 'Calculating the third central tendency when any two are known.'
  },
  {
    id: 'f_math_6',
    subject: 'maths',
    category: 'Mensuration',
    title: 'Surface Area & Volume (Cylinder, Cone, Sphere)',
    formula: 'V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3',
    variables: 'r = radius, h = height, l = slant height = √(r² + h²)',
    application: 'Conversion of solids, combining hemisphere and cone toys, melted spheres.'
  },

  // SCIENCE - PHYSICS
  {
    id: 'f_phy_1',
    subject: 'science',
    category: 'Optics (Light)',
    title: 'Mirror & Lens Formula',
    formula: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} \\text{ (Mirror)} \\quad | \\quad \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} \\text{ (Lens)}',
    variables: 'f = focal length, v = image distance, u = object distance (always negative in cartesian)',
    application: 'Finding image position, nature, and magnification (m = -v/u for mirror; m = +v/u for lens).'
  },
  {
    id: 'f_phy_2',
    subject: 'science',
    category: 'Optics (Light)',
    title: 'Power of a Lens & Refractive Index',
    formula: 'P = \\frac{1}{f \\text{ (in meters)}} \\text{ Dioptres (D)} \\quad | \\quad n = \\frac{c}{v} = \\frac{\\sin i}{\\sin r}',
    variables: 'P = power (+ for convex, - for concave), c = speed in vacuum 3×10⁸ m/s, v = speed in medium',
    application: 'Corrective spectacles, lens combinations P = P1 + P2, Snell\'s law of refraction.'
  },
  {
    id: 'f_phy_3',
    subject: 'science',
    category: 'Electricity',
    title: 'Ohm\'s Law & Resistivity',
    formula: 'V = I \\cdot R \\quad | \\quad R = \\rho \\frac{l}{A}',
    variables: 'V = voltage (V), I = current (A), R = resistance (Ω), ρ = resistivity (Ω·m), l = length, A = area',
    application: 'Circuit calculations, wire stretching/cutting problems.'
  },
  {
    id: 'f_phy_4',
    subject: 'science',
    category: 'Electricity',
    title: 'Electric Power & Joule\'s Heating',
    formula: 'P = VI = I^2R = \\frac{V^2}{R} \\quad | \\quad H = I^2 R t',
    variables: 'P = Watts (W), H = Joules (J), t = time in seconds',
    application: 'Finding heat produced in geysers/heaters, bulb wattage ratings, electricity bill unit calculations.'
  },

  // SCIENCE - CHEMISTRY
  {
    id: 'f_chem_1',
    subject: 'science',
    category: 'Chemical Reactions',
    title: 'Key Chemical Reactions of Class 10',
    formula: '2FeSO_4 \\xrightarrow{\\Delta} Fe_2O_3 + SO_2 + SO_3 \\quad | \\quad CaO + H_2O \\rightarrow Ca(OH)_2',
    variables: 'Quicklime (CaO), Slaked lime (Ca(OH)2), Limestone (CaCO3)',
    application: 'Decomposition, combination, and precipitation board exam equations.'
  },
  {
    id: 'f_chem_2',
    subject: 'science',
    category: 'Carbon Compounds',
    title: 'Esterification & Saponification',
    formula: 'CH_3COOH + C_2H_5OH \\xrightarrow{H_2SO_4} CH_3COOC_2H_5 + H_2O \\quad | \\quad \\text{Ester} + NaOH \\rightarrow \\text{Soap}',
    variables: 'Acetic acid + Ethanol → Ethyl ethanoate (sweet scent) → Soap + Alcohol',
    application: 'Distinguishing ethanol and ethanoic acid, soap manufacturing.'
  },

  // SOCIAL SCIENCE & CONSTITUTION
  {
    id: 'f_soc_1',
    subject: 'social',
    category: 'भारतीय संविधान व संघवाद',
    title: 'विधायी सूचियों का विभाजन (Federal Lists)',
    formula: '\\text{संघ सूची (97 विषय)} \\quad | \\quad \\text{राज्य सूची (66 विषय)} \\quad | \\quad \\text{समवर्ती सूची (47 विषय)}',
    variables: 'संघ सूची: रक्षा/विदेश/मुद्रा (केंद्र); राज्य सूची: पुलिस/कृषि (राज्य); समवर्ती: शिक्षा/वन (दोनों)',
    application: 'केंद्र-राज्य विधायी शक्ति विभाजन एवं 1992 का 73वां/74वां पंचायती राज संशोधन।'
  },

  // HINDI GRAMMAR
  {
    id: 'f_hin_1',
    subject: 'hindi',
    category: 'हिंदी व्याकरण सूत्र',
    title: 'वाच्य एवं वाक्य रूपांतरण सूत्र',
    formula: '\\text{कर्तृवाच्य} \\rightarrow \\text{कर्मवाच्य (के द्वारा)} \\rightarrow \\text{भाववाच्य (से + अकर्मक क्रिया)}',
    variables: 'रचना आधार: सरल (1 विधेय), संयुक्त (और/किंतु), मिश्र (कि/जो/क्योंकि)',
    application: 'कक्षा 10 बोर्ड परीक्षा में 4 अंक वाक्य भेद व 4 अंक वाच्य रूपांतरण में शत-प्रतिशत अंक।'
  },

  // OPTIONAL LANGUAGES - SANSKRIT & IT
  {
    id: 'f_opt_1',
    subject: 'optional_lang',
    category: 'संस्कृत सन्धि व IT 402',
    title: 'संस्कृत सन्धि सूत्र व Spreadsheets Goal Seek',
    formula: '\\text{अकः सवर्णे दीर्घः} (\\text{दीर्घ}) \\quad | \\quad \\text{आद्गुणः} (\\text{गुण}) \\quad | \\quad \\text{Goal Seek (Target Value Formula)}',
    variables: 'विद्या + आलयः = विद्यालयः; देव + इन्द्रः = देवेन्द्रः; Goal Seek = single input solver',
    application: 'संस्कृत व्याकरण 10वीं बोर्ड सन्धि एवं IT 402 What-If Analysis।'
  }
];
