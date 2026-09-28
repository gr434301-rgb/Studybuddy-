import { ChapterNote } from '../types';

export const NCERT_NOTES: ChapterNote[] = [
  {
    id: 'note_sci_1',
    subject: 'science',
    title: 'Chemical Reactions and Equations',
    chapterNumber: 1,
    readTime: '6 min read',
    summary: 'Master chemical balancing, types of reactions (Combination, Decomposition, Displacement, Double Displacement, Redox), and everyday effects like Corrosion and Rancidity.',
    keyPoints: [
      'Chemical reaction evidence: change in state, color, evolution of gas, change in temperature.',
      'Law of Conservation of Mass: Number of atoms of each element remains identical on both sides of a balanced chemical equation.',
      'Exothermic vs Endothermic: Exothermic releases heat (Respiration, Burning of natural gas); Endothermic absorbs heat (Photosynthesis, Decomposition of CaCO3).',
      'Redox Reactions: Oxidation = gain of oxygen or loss of hydrogen/electrons; Reduction = loss of oxygen or gain of hydrogen/electrons.',
      'Corrosion & Rancidity: Iron rusts in moist air as hydrated iron(III) oxide Fe2O3·xH2O; oils and fats oxidize leading to rancidity, prevented by antioxidants or nitrogen flushing.'
    ],
    importantFormulasOrReactions: [
      'Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (Exothermic)',
      'Slaking of lime: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat',
      'White washing: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)',
      'Thermal decomposition: 2FeSO₄(s) —(Δ)→ Fe₂O₃(s) + SO₂(g) + SO₃(g)',
      'Redox: CuO + H₂ —(Δ)→ Cu + H₂O (CuO is reduced to Cu, H₂ is oxidized to H₂O)'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why is respiration considered an exothermic reaction?',
        answer: 'During digestion, food containing carbohydrates is broken down into glucose. This glucose combines with oxygen in the cells of our body and releases substantial energy for biological processes: C6H12O6 + 6O2 -> 6CO2 + 6H2O + Energy.'
      },
      {
        question: 'Why do we store silver chloride in dark colored bottles?',
        answer: 'Silver chloride undergoes photolytic decomposition when exposed to sunlight, turning grey and decomposing into silver metal and chlorine gas: 2AgCl(s) —(Sunlight)→ 2Ag(s) + Cl2(g). Dark bottles prevent light transmission.'
      }
    ]
  },
  {
    id: 'note_sci_2',
    subject: 'science',
    title: 'Acids, Bases and Salts',
    chapterNumber: 2,
    readTime: '7 min read',
    summary: 'Understand Arrhenius definitions, pH scale, indicator reactions, neutralization, and vital commercial salts like Bleaching Powder, Baking Soda, Washing Soda, and POP.',
    keyPoints: [
      'Acids produce H⁺ (or H₃O⁺ hydronium) ions in aqueous solution; bases produce OH⁻ (hydroxide) ions.',
      'pH scale ranges from 0 to 14: acidic (<7), neutral (=7), basic (>7). Tooth decay starts when mouth pH drops below 5.5.',
      'Neutralization: Acid + Base → Salt + Water + Heat.',
      'Chlor-alkali process: Electrolysis of brine (NaCl aq) yields Cl2 at anode, H2 at cathode, and NaOH at cathode.',
      'Water of crystallization: Fixed number of water molecules chemically bonded in one formula unit (CuSO4·5H2O is blue; anhydrous is white).'
    ],
    importantFormulasOrReactions: [
      'Bleaching Powder: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O',
      'Baking Soda: NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃',
      'Heating Baking Soda: 2NaHCO₃ —(Δ)→ Na₂CO₃ + H₂O + CO₂',
      'Washing Soda: Na₂CO₃ + 10H₂O → Na₂CO₃ · 10H₂O',
      'Plaster of Paris: CaSO₄ · 2H₂O —(373K)→ CaSO₄ · ½H₂O + 1½H₂O'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why does dry HCl gas not change the color of dry litmus paper?',
        answer: 'Acidic properties and color change of litmus are caused solely by H+ or H3O+ ions. In the absence of water/moisture, HCl does not ionize into hydrogen ions; hence dry litmus paper shows no change.'
      }
    ]
  },
  {
    id: 'note_sci_3',
    subject: 'science',
    title: 'Life Processes (Nutrition, Respiration, Transport, Excretion)',
    chapterNumber: 6,
    readTime: '9 min read',
    summary: 'The powerhouse chapter covering Autotrophic and Heterotrophic nutrition, aerobic vs anaerobic pathways, human heart circulation, and nephron urine formation.',
    keyPoints: [
      'Photosynthesis equation: 6CO₂ + 12H₂O —(Light/Chlorophyll)→ C₆H₁₂O₆ + 6O₂ + 6H₂O.',
      'Respiration: Glycolysis occurs in cytoplasm yielding Pyruvate. In mitochondria with oxygen: CO2 + H2O + 38 ATP. In muscle cells during sprint: Lactic acid + 2 ATP.',
      'Plant transport: Xylem transports water and minerals (unidirectional via transpiration pull); Phloem translocates sucrose/food (bidirectional using ATP).',
      'Human Heart: 4 chambers prevent mixing of oxygenated and deoxygenated blood; double circulation (pulmonary + systemic).',
      'Excretion in Nephron: Ultrafiltration in glomerulus/Bowman\'s capsule, selective reabsorption of glucose, amino acids, salts, and tubular secretion into collecting duct.'
    ],
    frequentBoardQuestions: [
      {
        question: 'What are the three events that occur during photosynthesis?',
        answer: '1. Absorption of light energy by chlorophyll. 2. Conversion of light energy to chemical energy and splitting of water molecules into hydrogen and oxygen. 3. Reduction of carbon dioxide to carbohydrates.'
      },
      {
        question: 'Why are ventricles thicker walled than atria?',
        answer: 'Ventricles have to pump blood with high pressure to distant organs and the entire body (e.g. left ventricle into aorta), whereas atria only receive blood and push it down into the adjacent ventricles.'
      }
    ]
  },
  {
    id: 'note_sci_4',
    subject: 'science',
    title: 'Electricity & Heating Effects',
    chapterNumber: 12,
    readTime: '8 min read',
    summary: 'All formulas, circuit diagrams, Ohm\'s Law, resistivity factors, series vs parallel combinations, electric power, and commercial energy units.',
    keyPoints: [
      'Electric current I = Q/t (Amperes). Potential difference V = W/Q (Volts).',
      'Ohm\'s Law: V = IR at constant temperature.',
      'Resistance factors: R = ρ(L/A), where ρ is resistivity (depends only on material and temperature, in Ω·m).',
      'Series: R_eq = R₁ + R₂ + R₃ (Current is constant).',
      'Parallel: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ (Voltage is constant).',
      'Joule\'s Heating: H = I²Rt. Power: P = VI = I²R = V²/R (Watts).',
      'Commercial unit of energy: 1 kWh = 1 unit = 3.6 × 10⁶ Joules.'
    ],
    importantFormulasOrReactions: [
      'V = I · R',
      'R = ρ · (l / A)',
      'P = V · I = I²R = V² / R',
      'H = I² · R · t',
      '1 kWh = 3.6 × 10⁶ J'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why are domestic electric appliances connected in parallel rather than series?',
        answer: '1. In parallel, each appliance receives the full mains voltage (220V). 2. If one appliance fuses or is turned off, others continue operating normally. 3. Each appliance can have its own independent switch. 4. Total equivalent resistance is minimized, drawing sufficient required current.'
      }
    ]
  },

  // MATHS
  {
    id: 'note_math_1',
    subject: 'maths',
    title: 'Quadratic Equations & Roots',
    chapterNumber: 4,
    readTime: '7 min read',
    summary: 'Form standard equations, solve by factorization and quadratic formula, and predict root nature with the discriminant.',
    keyPoints: [
      'Standard form: ax² + bx + c = 0, where a ≠ 0.',
      'Quadratic formula (Sridharacharya): x = (-b ± √(b² - 4ac)) / (2a).',
      'Discriminant D = b² - 4ac:',
      '  • D > 0: Two distinct real roots.',
      '  • D = 0: Two equal real roots (x = -b/2a).',
      '  • D < 0: No real roots (roots are complex/imaginary).'
    ],
    importantFormulasOrReactions: [
      'x = [-b ± √(b² - 4ac)] / 2a',
      'D = b² - 4ac',
      'Sum of roots (α + β) = -b/a',
      'Product of roots (α · β) = c/a'
    ],
    frequentBoardQuestions: [
      {
        question: 'Find the nature of the roots of the quadratic equation 2x² - 4x + 3 = 0.',
        answer: 'Here a = 2, b = -4, c = 3. Discriminant D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8. Since D < 0, the equation has no real roots.'
      }
    ]
  },
  {
    id: 'note_math_2',
    subject: 'maths',
    title: 'Introduction to Trigonometry & Identities',
    chapterNumber: 8,
    readTime: '8 min read',
    summary: 'Fundamental trigonometric ratios, standard table values (0°, 30°, 45°, 60°, 90°), and proving identities.',
    keyPoints: [
      'sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj.',
      'Reciprocal identities: cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.',
      'Quotient: tan θ = sin θ / cos θ, cot θ = cos θ / sin θ.',
      'Pythagorean identities: sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ.'
    ],
    importantFormulasOrReactions: [
      'sin²θ + cos²θ = 1',
      'sec²θ - tan²θ = 1',
      'cosec²θ - cot²θ = 1',
      'sin 30° = 1/2, cos 30° = √3/2, tan 45° = 1'
    ],
    frequentBoardQuestions: [
      {
        question: 'Prove that (sin θ - 2sin³θ) / (2cos³θ - cos θ) = tan θ.',
        answer: 'LHS = [sin θ(1 - 2sin²θ)] / [cos θ(2cos²θ - 1)]. Note that 1 - 2sin²θ = (sin²θ + cos²θ) - 2sin²θ = cos²θ - sin²θ. Similarly, 2cos²θ - 1 = 2cos²θ - (sin²θ + cos²θ) = cos²θ - sin²θ. Thus LHS = (sin θ / cos θ) · 1 = tan θ = RHS. Hence proved.'
      }
    ]
  },

  // SOCIAL SCIENCE
  {
    id: 'note_soc_1',
    subject: 'social',
    title: 'Nationalism in India',
    chapterNumber: 2,
    readTime: '8 min read',
    summary: 'Chronology from the First World War, Rowlatt Satyagraha, Jallianwala Bagh, Non-Cooperation Movement, Civil Disobedience Movement, to the Poona Pact.',
    keyPoints: [
      'First World War impacts: Defense expenditure spiked, forced recruitment in rural areas, crop failure leading to acute shortages and 1921 influenza epidemic.',
      'Satyagraha Philosophy: Power of truth and the need to search for truth without physical force.',
      'Rowlatt Act (1919) allowed detention of political prisoners without trial for 2 years; followed by Jallianwala Bagh massacre on 13 April 1919 (General Dyer).',
      'Non-Cooperation Movement (1920-1922): Surrender of titles, boycott of civil services, army, schools, foreign goods; withdrawn after Chauri Chaura incident (Feb 1922).',
      'Civil Disobedience Movement (1930): Launched with Dandi March; violation of salt laws, refusal of revenue; concluded temporarily with Gandhi-Irwin Pact (1931).',
      'Poona Pact (Sept 1932): Signed between Mahatma Gandhi and Dr. B.R. Ambedkar; gave reserved seats in provincial and central legislative councils to Depressed Classes.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why did Mahatma Gandhi decide to withdraw the Non-Cooperation Movement in 1922?',
        answer: 'In February 1922, at Chauri Chaura (Gorakhpur, UP), a peaceful demonstration turned into a violent clash with the police, resulting in the burning of a police station and deaths of 22 policemen. Feeling that the movement was turning violent and satyagrahis needed proper training in non-violence, Gandhi halted the campaign.'
      }
    ]
  },

  // ENGLISH
  {
    id: 'note_eng_1',
    subject: 'english',
    title: 'A Letter to God (First Flight)',
    chapterNumber: 1,
    readTime: '5 min read',
    summary: 'Themes of unshakeable faith, innocence vs human kindness, and dramatic irony through the story of peasant Lencho.',
    keyPoints: [
      'Author: G.L. Fuentes.',
      'Setting: A solitary house sitting on the crest of a low hill overlooking cornfields.',
      'Plot: A severe hailstorm completely destroys Lencho\'s mature ripe corn and flowers.',
      'The Letter: Lencho writes directly to God asking for 100 pesos to sow his field again and survive.',
      'The Twist: The generous postmaster raises 70 pesos from colleagues and sends it signed "God". Lencho is furious, assuming the post office clerks stole the remaining 30 pesos.'
    ],
    frequentBoardQuestions: [
      {
        question: 'What is the dramatic irony in the story "A Letter to God"?',
        answer: 'The dramatic irony lies in the fact that the post office workers, whom Lencho suspects and labels "a bunch of crooks", are the very compassionate individuals who sacrificed portions of their salaries to aid him in his desperate time of need.'
      }
    ]
  },
  {
    id: 'note_eng_2',
    subject: 'english',
    title: 'Nelson Mandela: Long Walk to Freedom',
    chapterNumber: 2,
    readTime: '6 min read',
    summary: 'Inauguration of South Africa’s first democratic non-racial government and Mandela\'s profound reflections on freedom, courage, and human dignity.',
    keyPoints: [
      'Inauguration Date: 10th May 1994 at the Union Buildings amphitheatre in Pretoria.',
      'Mandela pledged to liberate all his people from poverty, deprivation, suffering, and discrimination.',
      'Definition of Courage: Courage is not the absence of fear, but the triumph over it.',
      'Twin Obligations: Every man has obligations to his family/parents, and obligations to his people/community/country.',
      'Oppressor & Oppressed: The oppressor is a prisoner of hatred locked behind the bars of prejudice. Both the oppressed and oppressor are robbed of their humanity.'
    ],
    frequentBoardQuestions: [
      {
        question: 'What "twin obligations" does Nelson Mandela mention in his speech?',
        answer: 'Mandela states that every man has two obligations: first to his family, parents, wife and children; and second to his people, community and country. Under apartheid in South Africa, a Black man attempting to fulfill both was punished and isolated.'
      }
    ]
  },

  // HINDI (Kshitij, Kritika, Sparsh, Sanchayan & Vyakaran)
  {
    id: 'note_hin_1',
    subject: 'hindi',
    title: 'नेताजी का चश्मा (Netaji Ka Chashma - स्वयं प्रकाश)',
    chapterNumber: 10,
    readTime: '6 min read',
    summary: 'कस्बे की नगरपालिका द्वारा नेताजी सुभाषचंद्र बोस की संगमरमर की मूर्ति, कैप्टन चश्मेवाले की निःस्वार्थ देशभक्ति और हालदार साहब की राष्ट्रीय संवेदना।',
    keyPoints: [
      'कहानीकार: स्वयं प्रकाश। मुख्य पात्र: हालदार साहब, पानवाला और कैप्टन चश्मेवाला।',
      'कस्बे के मुख्य चौराहे पर मास्टर मोतीलाल ने नेताजी की संगमरमर की मूर्ति बनाई, परंतु वे चश्मा लगाना भूल गए।',
      'कैप्टन: एक निर्धन, लंगड़ा और बूढ़ा फेरीवाला जो नेताजी की बिना चश्मे वाली मूर्ति देखकर आहत होता था और अपने पास से चश्मा लगाता था।',
      'पानवाला कैप्टन की देशभक्ति का मज़ाक उड़ाता था—"वह लंगड़ा क्या जाएगा फ़ौज में! पागल है पागल!"।',
      'कैप्टन की मृत्यु के बाद हालदार साहब ने देखा कि चौराहे पर नेताजी की मूर्ति पर किसी बच्चे ने सरकंडे का छोटा चश्मा लगा दिया था। इससे सिद्ध होता है कि देशभक्ति केवल सैनिकों तक सीमित नहीं, भावी पीढ़ी में भी जीवित है।'
    ],
    importantFormulasOrReactions: [
      'केंद्रीय संदेश: देशभक्ति कोई दिखावा नहीं, देश के प्रति आत्मीय सम्मान और समर्पण की भावना है।',
      'प्रमुख प्रतीक: "सरकंडे का चश्मा" भावी पीढ़ी में देशभक्ति की अटूट आशा का प्रतीक है।'
    ],
    frequentBoardQuestions: [
      {
        question: 'सेनानी न होते हुए भी चश्मेवाले को लोग "कैप्टन" क्यों कहते थे?',
        answer: 'चश्मेवाला कोई सेनानी या आज़ाद हिंद फ़ौज का सिपाही नहीं था, परंतु उसके मन में देश के अमर शहीदों और नेताजी के प्रति असीम सम्मान व देशभक्ति की भावना थी। बिना चश्मे की नेताजी की अधूरी मूर्ति उसे आहत करती थी। उसकी इसी उत्कट राष्ट्रभक्ति के कारण लोग व्यंग्य व आदर से उसे कैप्टन कहते थे।'
      },
      {
        question: 'मूर्ति पर सरकंडे का चश्मा देखकर हालदार साहब भावुक क्यों हो उठे?',
        answer: 'हालदार साहब को लगा था कि कैप्टन की मृत्यु के बाद अब नेताजी की मूर्ति बिना चश्मे की ही रहेगी। परंतु बच्चों द्वारा सरकंडे का चश्मा पहनाया जाना यह दर्शाता है कि हमारे देश के नन्हे बच्चों में भी देशप्रेम की भावना जीवित है। देश का भविष्य सुरक्षित हाथों में है—यह सोचकर उनकी आँखें भर आईं।'
      }
    ]
  },
  {
    id: 'note_hin_2',
    subject: 'hindi',
    title: 'बालगोबिन भगत (Balgobin Bhagat - रामवृक्ष बेनीपुरी)',
    chapterNumber: 11,
    readTime: '7 min read',
    summary: 'कबीरपंथी गृहस्थ साधु का अनोखा जीवन चरित्र, पाखंडों का खंडन, बेटे की मृत्यु पर उत्सव और बहू का पुनर्विवाह कराकर सामाजिक रूढ़ियों को तोड़ना।',
    keyPoints: [
      'लेखक: रामवृक्ष बेनीपुरी। यह एक मार्मिक रेखाचित्र है।',
      'बालगोबिन भगत बाह्य वेशभूषा (गेरुआ वस्त्र, जटा-जूट) से नहीं, बल्कि अपने आचरण, कर्म और कबीरपंथी विचारों से सच्चे संन्यासी थे।',
      'वे गृहस्थ होते हुए भी किसी की चीज़ बिना पूछे नहीं लेते थे, कभी झूठ नहीं बोलते थे और खेत की सारी उपज कबीर मठ में भेंट कर प्रसाद रूप में ग्रहण करते थे।',
      'आषाढ़ की रिमझिम में धान रोपते हुए उनका मधुर गायन ("गोदी में पियवा, चमक उठे सखिया...") पूरे गाँव को संगीत के जादू में बाँध देता था।',
      'सामाजिक क्रांति: जब उनके इकलौते सुस्त बेटे की मृत्यु हुई, तो रोने के बजाय उन्होंने उत्सव मनाया (आत्मा परमात्मा से मिल गई)। उन्होंने पुत्रवधू से ही चिता को मुखाग्नि दिलवाई और उसके भाई को बुलाकर दूसरा विवाह कराने का आदेश दिया।'
    ],
    importantFormulasOrReactions: [
      'कबीर दर्शन: "आत्मा का परमात्मा में विलीन होना शोक नहीं, आनंद का विषय है।", रूढ़िवादी सामाजिक कुरीतियों का साहसपूर्वक विरोध।'
    ],
    frequentBoardQuestions: [
      {
        question: 'भगत की पुत्रवधू उन्हें अकेले छोड़कर क्यों नहीं जाना चाहती थी?',
        answer: 'भगत जी वृद्ध हो चले थे। उनके इकलौते बेटे की मृत्यु हो चुकी थी। पुत्रवधू जानती थी कि उसके जाने के बाद भगत जी के लिए बुढ़ापे में भोजन कौन बनाएगा, बीमार पड़ने पर पानी कौन देगा। वह अपने सुख के बजाय भगत जी की सेवा करना अपना परम धर्म मानती थी।'
      },
      {
        question: 'बालगोबिन भगत को साधु क्यों कहा गया है, जबकि वे गृहस्थ थे?',
        answer: 'साधु केवल गेरुआ वस्त्र धारण करने से नहीं बना जाता। बालगोबिन भगत का आचरण, सत्यनिष्ठा, अपरिग्रह, कबीर के प्रति समर्पण, वासनाओं से मुक्ति और मोह-रहित जीवन उन्हें एक सच्चे संन्यासी के उच्च पद पर प्रतिष्ठित करता था।'
      }
    ]
  },
  {
    id: 'note_hin_3',
    subject: 'hindi',
    title: 'सूरदास के पद (भ्रमरगीत - सूरसागर)',
    chapterNumber: 1,
    readTime: '7 min read',
    summary: 'श्रीकृष्ण द्वारा उद्धव के माध्यम से गोपियों को भेजे गए योग संदेश पर गोपियों का तीखा व्यंग्य, वाक्चातुर्य और अनन्य एकनिष्ठ प्रेम की विजय।',
    keyPoints: [
      'कवि: भक्तिकाल के महाकवि सूरदास। प्रसंग: भ्रमरगीत सार। भाषा: ब्रजभाषा। रस: वियोग शृंगार।',
      'पद 1 ("ऊधौ, तुम हौ अति बड़भागी"): गोपियाँ उद्धव पर वक्रोक्ति (व्यंग्य) करती हैं कि तुम कितने भाग्यशाली हो जो प्रेम के सागर (कृष्ण) के पास रहकर भी प्रेम के धागे से नहीं बँधे—जैसे कमल का पत्ता जल में रहकर भी गीला नहीं होता।',
      'पद 2 ("मन की मन ही माँझ रही"): गोपियाँ अपनी विरह वेदना किसी और से नहीं कह पा रही हैं। वे कृष्ण के आने की आशा में तन-मन की व्यथा सह रही थीं।',
      'पद 3 ("हमारैं हरि हारिल की लकरी"): गोपियों के लिए कृष्ण हारिल पक्षी की लकड़ी के समान हैं, जिसे वह पंजों से कभी नहीं छोड़ता। उद्धव का योग संदेश उन्हें "कड़वी ककड़ी" जैसा अरुचिकर लगता है।',
      'पद 4 ("हरि हैं राजनीति पढ़ि आए"): गोपियाँ कहती हैं कि कृष्ण अब मथुरा जाकर चतुर राजनेता बन गए हैं। सच्चा राजधर्म तो यह है कि प्रजा को न सताया जाए।'
    ],
    importantFormulasOrReactions: [
      'काव्य सौंदर्य: ब्रजभाषा की मधुरता, अनुप्रास, उपमा व रूपक अलंकार, वक्रोक्ति शैली और प्रेम-मार्ग (भक्ति) की ज्ञान-मार्ग (योग) पर विजय।'
    ],
    frequentBoardQuestions: [
      {
        question: 'गोपियों ने उद्धव को "बड़भागी" कहकर क्या व्यंग्य किया है?',
        answer: 'गोपियों ने बाह्य रूप से उद्धव को भाग्यशाली कहा है, परंतु वास्तव में उनका आशय है कि उद्धव अत्यंत अभागे हैं। साक्षात् प्रेम के अवतार श्रीकृष्ण के सान्निध्य में रहकर भी उनके हृदय में प्रेम और अनुराग का अंकुर नहीं फूटा, वे प्रेम के आनंद से पूर्णतः वंचित रहे।'
      },
      {
        question: 'गोपियों के अनुसार राजा का वास्तविक धर्म क्या होना चाहिए?',
        answer: 'सूरदास के पद के अनुसार, राजा का वास्तविक धर्म यह है कि उसकी प्रजा पर कोई अत्याचार न हो, प्रजा को किसी भी प्रकार सताया न जाए तथा राजा सदैव प्रजा के हित और सुख की रक्षा करे।'
      }
    ]
  },
  {
    id: 'note_hin_4',
    subject: 'hindi',
    title: 'राम-लक्ष्मण-परशुराम संवाद (तुलसीदास - रामचरितमानस)',
    chapterNumber: 2,
    readTime: '8 min read',
    summary: 'सीता स्वयंवर में शिवधनुष टूटने पर परशुराम का भयानक क्रोध, लक्ष्मण के तीखे व्यंग्य बाण और मर्यादा पुरुषोत्तम श्रीराम की शांत विनयशीलता।',
    keyPoints: [
      'कवि: गोस्वामी तुलसीदास। स्रोत: रामचरितमानस (बालकांड)। भाषा: अवधी। छंद: चौपाई और दोहा। रस: वीर रस और रौद्र रस।',
      'शिवधनुष टूटने पर परशुराम क्रोधित होकर सभा में आते हैं और पूछते हैं कि यह धनुष किसने तोड़ा।',
      'श्रीराम शांत स्वर में कहते हैं: "नाथ संभुधनु भंजनिहारा। होइहि केउ एक दास तुम्हारा॥" (हे नाथ! शिवजी के धनुष को तोड़ने वाला आपका ही कोई दास होगा)।',
      'लक्ष्मण व्यंग्य करते हैं: "बहु धनुहीं तोरीं लरिकाईं। कबहुँ न असि रिस कीन्हि गोसाईं॥" बचपन में हमने बहुत-सी ऐसी धनुहियाँ तोड़ी हैं, तब तो आपने कभी ऐसा क्रोध नहीं किया।',
      'परशुराम अपने फरसे की भयानकता का बखान करते हैं कि इसने सहस्त्रबाहु की भुजाओं को काट डाला था और यह गर्भ के बच्चों का भी नाश कर देता है।',
      'लक्ष्मण का उत्तर: "पुनि पुनि मोहि देखव कुठारू। चहत उड़ावन फूँकि पहारू॥" (आप बार-बार कुल्हाड़ी दिखाकर मानो फूँक से पहाड़ उड़ाना चाहते हैं)।'
    ],
    importantFormulasOrReactions: [
      'तुलसीदास की संवाद शैली: लक्ष्मण का ओजस्वी वक्रोक्तिपूर्ण स्वभाव बनाम श्रीराम की मर्यादा व विनम्रता।'
    ],
    frequentBoardQuestions: [
      {
        question: 'परशुराम के क्रोध करने पर लक्ष्मण ने धनुष टूट जाने के कौन-कौन से तर्क दिए?',
        answer: 'लक्ष्मण ने तर्क दिए: 1. बचपन में हमने खेल-खेल में कई धनुहियाँ तोड़ीं, तब किसी ने क्रोध नहीं किया। 2. यह पुराना और जीर्ण-शीर्ण धनुष था, जो श्रीराम के छूते ही टूट गया, इसमें उनका कोई दोष नहीं। 3. हमारी दृष्टि में तो सभी धनुष एक समान हैं, इस पुराने धनुष के टूटने से क्या हानि या लाभ?'
      }
    ]
  },
  {
    id: 'note_hin_5',
    subject: 'hindi',
    title: 'माता का अँचल (Mata Ka Aanchal - शिवपूजन सहाय)',
    chapterNumber: 1,
    readTime: '6 min read',
    summary: 'कृतिका भाग-2 का अत्यंत लोकप्रिय पाठ: 1930 के दशक का ग्रामीण बचपन, पिता का वात्सल्य, बच्चों के सामूहिक खेल और सांप के भय से माँ के आँचल में शरण।',
    keyPoints: [
      'लेखक: शिवपूजन सहाय (उपन्यास "देहाती दुनिया" का अंश)। मुख्य पात्र: तारकेश्वरनाथ (उपनाम भोलानाथ)।',
      'भोलानाथ का अधिकांश समय पिता के साथ बीतता था—सवेरे उठना, नहाना, पूजा में बैठना, माथे पर भभूत लगाना, गंगा में मछलियों को आटे की गोलियाँ खिलाना।',
      'ग्रामीण बाल-क्रीड़ाएँ: बारात का जुलूस निकालना, मिठाई की दुकान लगाना, मिट्टी के बर्तनों से भोज (पंगत) तैयार करना और खेती करने का अभिनय।',
      'चरमोत्कर्ष (क्लाइमेक्स): जब बच्चे टीले पर चूहों के बिल में पानी डाल रहे थे, तो अचानक उसमें से काला नाग निकल आया। सभी बच्चे डरकर भागे।',
      'माँ के आँचल का महत्त्व: लहूलुहान और थर-थर काँपते भोलानाथ ने पिता के बुलाने पर भी उनकी ओर न जाकर सीधे माँ की गोद और आँचल में छिपकर शरण ली। माँ की ममता ही सबसे बड़ा सुरक्षा कवच है।'
    ],
    frequentBoardQuestions: [
      {
        question: 'भोलानाथ अपने पिता से अधिक जुड़ाव रखता था, फिर भी विपत्ति के समय वह माँ की शरण में क्यों गया?',
        answer: 'यद्यपि भोलानाथ का सारा दिन पिता के साथ हँसी-खेल और पूजा में बीतता था, परंतु भय और संकट के समय बालक को जो असीम सुरक्षा, शांति और वात्सल्य माँ की ममतामयी गोद में मिलता है, वह अन्यत्र दुर्लभ है। माँ का आँचल बच्चे के लिए प्रेम और निर्भयता का अटूट दुर्ग होता है।'
      }
    ]
  },
  {
    id: 'note_hin_6',
    subject: 'hindi',
    title: 'हिंदी व्याकरण (Class 10 CBSE Board Master Notes)',
    chapterNumber: 16,
    readTime: '8 min read',
    summary: 'कक्षा 10 बोर्ड परीक्षा के अनिवार्य 16 अंक व्याकरण: रचना के आधार पर वाक्य भेद, वाच्य, पद परिचय, और रस सिद्धांत।',
    keyPoints: [
      '1. रचना के आधार पर वाक्य भेद: सरल वाक्य (एक उद्देश्य, एक विधेय), संयुक्त वाक्य (समुच्चयबोधक अव्यय: और, एवं, तथा, या, अथवा, किंतु, परंतु से जुड़े), मिश्र वाक्य (प्रधान उपवाक्य + आश्रित उपवाक्य: कि, जो, क्योंकि, यदि-तो, जब-तब से जुड़े)।',
      '2. वाच्य (Voice): कर्तृवाच्य (क्रिया कर्ता के अनुसार), कर्मवाच्य (क्रिया कर्म के अनुसार, कर्ता के साथ "के द्वारा/से"), भाववाच्य (क्रिया भाव के अनुसार, सदैव अकर्मक, एकवचन, पुल्लिंग)।',
      '3. पद परिचय: वाक्य में प्रयुक्त पद का व्याकरणिक परिचय (संज्ञा, सर्वनाम, विशेषण, क्रिया, लिंग, वचन, कारक, काल)।',
      '4. रस (11 रस): स्थायी भाव (शृंगार-रति, हास्य-हास, करुण-शोक, रौद्र-क्रोध, वीर-उत्साह, भयानक-भय, बीभत्स-जुगुप्सा, अद्भुत-विस्मय, शांत-निर्वेद, वात्सल्य-स्नेह, भक्ति-भगवद्विषयक रति)। रस के 4 अंग: स्थायी भाव, विभाव, अनुभाव, संचारी भाव (33 संख्या)।'
    ],
    importantFormulasOrReactions: [
      'वाक्य रूपांतरण ट्रिक: यदि दो स्वतंत्र उपवाक्य "और/किंतु" से जुड़े हों तो संयुक्त वाक्य; यदि "जो-वह, जैसे-वैसे, क्योंकि" हो तो मिश्र वाक्य।',
      'वाच्य ट्रिक: "राम पत्र लिखता है" (कर्तृवाच्य) → "राम द्वारा पत्र लिखा जाता है" (कर्मवाच्य) → "राम से चला नहीं जाता" (भाववाच्य)।'
    ],
    frequentBoardQuestions: [
      {
        question: '"जो परिश्रमी होते हैं, वे अवश्य सफल होते हैं।" रचना के आधार पर वाक्य भेद बताइए और सरल वाक्य में बदलिए।',
        answer: 'भेद: मिश्र वाक्य (क्योंकि इसमें "जो...वे" आश्रित उपवाक्य है)। सरल वाक्य रूपांतरण: "परिश्रमी व्यक्ति अवश्य सफल होते हैं।"'
      },
      {
        question: 'रस के चार प्रमुख अंगों के नाम लिखिए।',
        answer: 'रस के चार प्रमुख अंग हैं: 1. स्थायी भाव (मूल भाव), 2. विभाव (आलंबन व उद्दीपन), 3. अनुभाव (शारीरिक चेष्टाएँ), 4. संचारी भाव (मन में क्षणिक उठने-गिरने वाले 33 भाव)।'
      }
    ]
  },

  // SCIENCE ADDITIONAL CHAPTERS (Part 1 Syllabus)
  {
    id: 'note_sci_metals',
    subject: 'science',
    title: 'Metals and Non-metals',
    chapterNumber: 3,
    readTime: '7 min read',
    summary: 'Physical & chemical properties of metals, reactivity series, ionic bonding, metallurgy (roasting, calcination, electrolytic refining), and prevention of corrosion.',
    keyPoints: [
      'Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au.',
      'Ionic Compounds: Formed by transfer of electrons from metal to non-metal. Characteristics: high melting/boiling points, soluble in water, conduct electricity in molten/aqueous state.',
      'Metallurgy: Roasting (heating sulfide ore in excess air: 2ZnS + 3O2 -> 2ZnO + 2SO2); Calcination (heating carbonate ore in limited air: ZnCO3 -> ZnO + CO2).',
      'Thermite Reaction: Highly exothermic reduction of metal oxides with aluminium: Fe2O3 + 2Al -> 2Fe(l) + Al2O3 + Heat (used to join railway tracks).',
      'Corrosion Prevention: Galvanisation (coating iron with zinc), alloying (stainless steel = iron + nickel + chromium; brass = copper + zinc; bronze = copper + tin).'
    ],
    importantFormulasOrReactions: [
      'Roasting: 2ZnS + 3O₂ —(Δ)→ 2ZnO + 2SO₂',
      'Calcination: ZnCO₃ —(Δ)→ ZnO + CO₂',
      'Thermite: Fe₂O₃ + 2Al → 2Fe(l) + Al₂O₃ + Heat',
      'Amphoteric Oxides: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O & Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O'
    ],
    frequentBoardQuestions: [
      {
        question: 'What are amphoteric oxides? Give two chemical equations showing aluminium oxide as an amphoteric oxide.',
        answer: 'Amphoteric oxides are metal oxides that react with both acids and bases to produce salt and water. For Al2O3: 1) With Acid: Al2O3 + 6HCl -> 2AlCl3 + 3H2O; 2) With Base: Al2O3 + 2NaOH -> 2NaAlO2 (Sodium Aluminate) + H2O.'
      }
    ]
  },
  {
    id: 'note_sci_carbon',
    subject: 'science',
    title: 'Carbon and its Compounds',
    chapterNumber: 4,
    readTime: '8 min read',
    summary: 'Covalent bonding, tetravalency and catenation, allotropes (diamond, graphite, fullerene), homologous series, functional groups, and ethanol/ethanoic acid reactions.',
    keyPoints: [
      'Versatile Nature of Carbon: Catenation (self-linking property forming long chains) and Tetravalency (forms 4 covalent bonds).',
      'Allotropes: Diamond (tetrahedral 3D network, hardest, insulator); Graphite (hexagonal layers, conductor due to delocalized electrons); C-60 Buckminsterfullerene (football shape).',
      'Homologous Series: Family of compounds with same functional group, differing by -CH2- unit and 14 u molecular mass.',
      'Esterification: Ethanoic acid + Ethanol —(conc. H2SO4)→ Ethyl Ethanoate (sweet fruity smell) + H2O.',
      'Saponification: Ethyl Ethanoate + NaOH -> Sodium Ethanoate + Ethanol (used in soap preparation).',
      'Soaps & Micelles: Soap molecule has hydrophilic ionic head (-COONa) and hydrophobic carbon tail. Micelles trap oily grease in center.'
    ],
    importantFormulasOrReactions: [
      'Alkanes: CₙH₂ₙ₊₂, Alkenes: CₙH₂ₙ, Alkynes: CₙH₂ₙ₋₂',
      'Esterification: CH₃COOH + C₂H₅OH —(H₂SO₄)→ CH₃COOC₂H₅ + H₂O',
      'Saponification: CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH',
      'Oxidation of Ethanol: CH₃CH₂OH —(alkaline KMnO₄ / acid K₂Cr₂O₇)→ CH₃COOH'
    ],
    frequentBoardQuestions: [
      {
        question: 'Explain the cleansing action of soaps with a neat labeled micelle diagram.',
        answer: 'A soap molecule consists of a hydrophobic hydrocarbon tail and a hydrophilic ionic head (-COO-Na+). When dissolved in water, the hydrophobic tails stick to the oily dirt particle while the hydrophilic heads project outwards into the water, forming a spherical cluster called a micelle. On agitation, the oily dirt is lifted and washed away in water as an emulsion.'
      }
    ]
  },
  {
    id: 'note_sci_control',
    subject: 'science',
    title: 'Control and Coordination',
    chapterNumber: 7,
    readTime: '7 min read',
    summary: 'Nervous system, neuron transmission, reflex arcs, human brain regions, plant tropisms (phototropism, geotropism), and endocrine hormones.',
    keyPoints: [
      'Neuron Pathway: Dendrite receives electrical impulse -> Cyton (cell body) -> Axon -> Synapse (chemical neurotransmitters cross the gap).',
      'Reflex Arc: Receptor -> Sensory Neuron -> Spinal Cord (Relay Neuron) -> Motor Neuron -> Effector (muscle).',
      'Human Brain: Forebrain (Cerebrum: thinking, memory, sensory interpretation); Midbrain (visual and auditory reflexes); Hindbrain (Cerebellum: balance/posture, Pons: respiration, Medulla: involuntary blood pressure/salivation/vomiting).',
      'Plant Hormones: Auxin (shoots bend towards light - phototropism), Gibberellins (stem growth), Cytokinins (cell division), Abscisic Acid (ABA: stress hormone, wilting of leaves).',
      'Endocrine System: Adrenaline (fight-or-flight, emergency), Thyroxine (iodine required, basal metabolism), Insulin (regulates blood glucose, pancreas), Growth hormone (pituitary).'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why is the use of iodised salt advisable?',
        answer: 'Iodine is essential for the thyroid gland to synthesize thyroxine hormone. Thyroxine regulates carbohydrate, protein, and fat metabolism for optimal body growth. Deficiency of iodine leads to goitre (swollen neck).'
      }
    ]
  },
  {
    id: 'note_sci_repro',
    subject: 'science',
    title: 'How do Organisms Reproduce?',
    chapterNumber: 8,
    readTime: '8 min read',
    summary: 'Asexual reproduction (fission, budding, spore formation, vegetative propagation) and Sexual reproduction in flowering plants and humans, including contraception.',
    keyPoints: [
      'Asexual modes: Binary fission (Amoeba), Multiple fission (Plasmodium), Budding (Hydra/Yeast), Regeneration (Planaria), Vegetative propagation (Bryophyllum leaves, Rose cuttings).',
      'Flower Structure: Stamen (anther + filament, male); Carpel/Pistil (stigma + style + ovary, female). Double fertilization produces zygote (2n) and endosperm (3n).',
      'Human Male: Testes produce sperms and testosterone, located in scrotum for maintaining 2-2.5°C lower temperature than body.',
      'Human Female: Ovaries release one ovum every 28 days; fertilization takes place in Fallopian tube; embryo implants in uterine wall nourished by placenta.',
      'Contraceptive Methods: Mechanical barriers (condoms), Chemical (oral pills), IUDs (Copper-T), Surgical (Vasectomy in males, Tubectomy in females).'
    ],
    frequentBoardQuestions: [
      {
        question: 'What is the function of the placenta during human pregnancy?',
        answer: 'The placenta is a disc-like vascular tissue embedded in the uterine wall. It provides a large surface area of villi for the transfer of glucose and oxygen from the maternal blood to the developing embryo, and removes metabolic wastes generated by the embryo into the mother\'s blood.'
      }
    ]
  },
  {
    id: 'note_sci_heredity',
    subject: 'science',
    title: 'Heredity & Mendel’s Experiments',
    chapterNumber: 9,
    readTime: '6 min read',
    summary: 'Mendel’s laws of inheritance, monohybrid and dihybrid crosses, genotype vs phenotype, and sex determination in human beings.',
    keyPoints: [
      'Mendel used Garden Pea (Pisum sativum) due to short life span, contrasting visible traits, and self-pollinating flowers.',
      'Monohybrid Cross (TT x tt): F1 generation all tall (Tt); F2 phenotypic ratio 3 Tall : 1 Dwarf; genotypic ratio 1 TT : 2 Tt : 1 tt.',
      'Dihybrid Cross (RRYY x rryy): F2 phenotypic ratio is 9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green (Law of Independent Assortment).',
      'Sex Determination in Humans: Females have XX chromosomes (all ova carry X); Males have XY chromosomes (50% sperm carry X, 50% carry Y). The father\'s sperm determines the sex of the child.'
    ],
    frequentBoardQuestions: [
      {
        question: 'How is the sex of a child determined in human beings?',
        answer: 'Human cells contain 23 pairs of chromosomes. Pair 23 are sex chromosomes. Females are homogametic (XX) producing only X-carrying eggs. Males are heterogametic (XY) producing 50% X-sperms and 50% Y-sperms. If an X-sperm fertilizes the egg, the child is female (XX); if a Y-sperm fertilizes the egg, the child is male (XY). Thus, sex is determined strictly by the male parent.'
      }
    ]
  },
  {
    id: 'note_sci_light',
    subject: 'science',
    title: 'Light: Reflection and Refraction',
    chapterNumber: 10,
    readTime: '8 min read',
    summary: 'Spherical mirrors, mirror formula, Snell\'s law, refractive index, lens formula, power of lens, and all ray diagrams.',
    keyPoints: [
      'Laws of Reflection: Angle of incidence = angle of reflection (i = r).',
      'Mirror Formula: 1/f = 1/v + 1/u. Magnification: m = -v/u = h\'/h.',
      'Concave mirror: Real & inverted images for u > f; virtual, erect, magnified image when object is between P and F.',
      'Convex mirror: Always forms virtual, erect, diminished image (used as rear-view mirrors).',
      'Refraction & Snell\'s Law: sin i / sin r = n₂/n₁ = v₁/v₂.',
      'Lens Formula: 1/f = 1/v - 1/u. Magnification: m = v/u = h\'/h.',
      'Power of Lens: P = 1 / f(in meters) in Dioptres (D). Convex lens has positive power; Concave lens has negative power.'
    ],
    importantFormulasOrReactions: [
      'Mirror: 1/f = 1/v + 1/u, m = -v/u',
      'Lens: 1/f = 1/v - 1/u, m = v/u',
      'Power: P = 1 / f(m) (Dioptre, D)',
      'Refractive Index: n = c / v'
    ],
    frequentBoardQuestions: [
      {
        question: 'A doctor prescribes a corrective lens of power -2.0 D. Find the focal length of the lens. Is the lens diverging or converging?',
        answer: 'Power P = -2.0 D. Focal length f = 1/P = 1/(-2.0) = -0.5 m = -50 cm. Since focal length and power are negative, it is a concave (diverging) lens used to correct myopia.'
      }
    ]
  },
  {
    id: 'note_sci_eye',
    subject: 'science',
    title: 'Human Eye and the Colourful World',
    chapterNumber: 11,
    readTime: '7 min read',
    summary: 'Eye anatomy, defects of vision (Myopia, Hypermetropia, Presbyopia), glass prism dispersion, atmospheric refraction, and scattering of light (Tyndall effect).',
    keyPoints: [
      'Power of accommodation: Ability of the ciliary muscles to adjust the focal length of the eye lens. Near point = 25 cm; Far point = infinity.',
      'Myopia (Near-sightedness): Image forms in front of retina; corrected by concave lens.',
      'Hypermetropia (Far-sightedness): Image forms behind retina; corrected by convex lens.',
      'Atmospheric Refraction: Twinkling of stars, advance sunrise (2 mins before) and delayed sunset (2 mins after).',
      'Dispersion through Prism: White light splits into VIBGYOR (Red bends least, Violet bends most).',
      'Scattering (Rayleigh law): I ∝ 1/λ⁴. Blue sky (fine air particles scatter shorter blue light), reddish sunrise/sunset (blue light scattered away, only red reaches eye).'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why do stars twinkle while planets do not twinkle?',
        answer: 'Stars are point-sized light sources extremely far away. As their light passes through continuously fluctuating layers of Earth\'s atmosphere with varying refractive indices, the path of light fluctuates, making the apparent brightness vary (twinkling). Planets are closer extended sources that act as a collection of point sources where individual fluctuations average out to zero.'
      }
    ]
  },

  // MATHEMATICS ADDITIONAL CHAPTERS (Part 1 Syllabus)
  {
    id: 'note_math_real',
    subject: 'maths',
    title: 'Real Numbers & Fundamental Theorem of Arithmetic',
    chapterNumber: 1,
    readTime: '6 min read',
    summary: 'Prime factorisation, HCF and LCM relationship, and proofs of irrationality of √2, √3, and √5.',
    keyPoints: [
      'Fundamental Theorem of Arithmetic: Every composite number can be expressed (factorised) as the product of primes uniquely, apart from the order in which prime factors occur.',
      'LCM(a, b) × HCF(a, b) = a × b (valid for two numbers only).',
      'Proof of irrationality: Based on theorem that if prime p divides a², then p divides a.'
    ],
    importantFormulasOrReactions: [
      'HCF(a, b) × LCM(a, b) = a × b',
      'Terminating decimal: denominator in form 2ⁿ · 5ᵐ'
    ],
    frequentBoardQuestions: [
      {
        question: 'Prove that √5 is an irrational number.',
        answer: 'Assume √5 is rational, i.e., √5 = a/b where a and b are co-prime integers with b ≠ 0. Squaring gives 5b² = a², meaning 5 divides a² and hence 5 divides a. Let a = 5c; then 5b² = 25c² => b² = 5c², which means 5 divides b. Thus, 5 is a common factor of both a and b, contradicting that a and b are co-prime. Hence √5 is irrational.'
      }
    ]
  },
  {
    id: 'note_math_poly',
    subject: 'maths',
    title: 'Polynomials & Zeros',
    chapterNumber: 2,
    readTime: '6 min read',
    summary: 'Geometric meaning of zeroes, relationship between coefficients and zeroes of quadratic polynomials.',
    keyPoints: [
      'Degree: Linear (1), Quadratic (2), Cubic (3). Number of zeroes cannot exceed the degree.',
      'For p(x) = ax² + bx + c: Sum of zeroes (α + β) = -b/a; Product of zeroes (αβ) = c/a.',
      'Forming a quadratic polynomial: k[x² - (α + β)x + αβ].'
    ],
    importantFormulasOrReactions: [
      'α + β = -b/a',
      'α · β = c/a',
      'p(x) = k · [x² - (Sum)x + (Product)]'
    ],
    frequentBoardQuestions: [
      {
        question: 'Find a quadratic polynomial whose zeroes are (2 + √3) and (2 - √3).',
        answer: 'Sum of zeroes S = (2 + √3) + (2 - √3) = 4. Product of zeroes P = (2 + √3)(2 - √3) = 4 - 3 = 1. Required polynomial is p(x) = x² - Sx + P = x² - 4x + 1.'
      }
    ]
  },
  {
    id: 'note_math_linear',
    subject: 'maths',
    title: 'Pair of Linear Equations in Two Variables',
    chapterNumber: 3,
    readTime: '7 min read',
    summary: 'Graphical and algebraic methods (substitution, elimination) and consistency conditions.',
    keyPoints: [
      'Intersecting Lines: a1/a2 ≠ b1/b2 (Unique solution, Consistent).',
      'Coincident Lines: a1/a2 = b1/b2 = c1/c2 (Infinitely many solutions, Consistent dependent).',
      'Parallel Lines: a1/a2 = b1/b2 ≠ c1/c2 (No solution, Inconsistent).'
    ],
    frequentBoardQuestions: [
      {
        question: 'Solve for x and y: 2x + 3y = 11 and 2x - 4y = -24.',
        answer: 'Subtracting equation 2 from 1: (2x + 3y) - (2x - 4y) = 11 - (-24) => 7y = 35 => y = 5. Substituting into equation 1: 2x + 3(5) = 11 => 2x = 11 - 15 = -4 => x = -2. So (x = -2, y = 5).'
      }
    ]
  },
  {
    id: 'note_math_ap',
    subject: 'maths',
    title: 'Arithmetic Progressions (AP)',
    chapterNumber: 5,
    readTime: '7 min read',
    summary: 'General term an, sum of first n terms Sn, and solving real-life word problems.',
    keyPoints: [
      'nth term: an = a + (n - 1)d, where a is first term and d is common difference.',
      'Sum of n terms: Sn = n/2 [2a + (n - 1)d] = n/2 [a + l].',
      'nth term from sum: an = Sn - Sn-1.'
    ],
    importantFormulasOrReactions: [
      'aₙ = a + (n - 1)d',
      'Sₙ = (n/2) · [2a + (n - 1)d] = (n/2) · [a + l]'
    ],
    frequentBoardQuestions: [
      {
        question: 'Find the 20th term from the last term of the AP: 3, 8, 13, ..., 253.',
        answer: 'Reversing the AP: a = 253, d = -5. The 20th term is a20 = a + (20 - 1)d = 253 + 19(-5) = 253 - 95 = 158.'
      }
    ]
  },
  {
    id: 'note_math_triangles',
    subject: 'maths',
    title: 'Triangles (Similarity & Theorems)',
    chapterNumber: 6,
    readTime: '8 min read',
    summary: 'Criteria for similarity of triangles (AAA, SSS, SAS) and Basic Proportionality Theorem (Thales Theorem).',
    keyPoints: [
      'Basic Proportionality Theorem (BPT): If a line is drawn parallel to one side of a triangle intersecting other two sides, it divides the two sides in the same ratio.',
      'Converse of BPT: If a line divides any two sides of a triangle in the same ratio, the line is parallel to the third side.',
      'Similarity Criteria: AAA, SAS, and SSS.'
    ],
    frequentBoardQuestions: [
      {
        question: 'State and prove the Basic Proportionality Theorem (Thales Theorem).',
        answer: 'Statement: If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio. In ΔABC with DE || BC: Area(ΔADE)/Area(ΔBDE) = AD/DB and Area(ΔADE)/Area(ΔCDE) = AE/EC. Since ΔBDE and ΔCDE share base DE and lie between parallel lines DE and BC, Area(ΔBDE) = Area(ΔCDE). Therefore, AD/DB = AE/EC.'
      }
    ]
  },
  {
    id: 'note_math_coord',
    subject: 'maths',
    title: 'Coordinate Geometry',
    chapterNumber: 7,
    readTime: '7 min read',
    summary: 'Distance formula, Section formula, midpoint coordinates, and centroid of a triangle.',
    keyPoints: [
      'Distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²].',
      'Section formula (internal): P(x, y) = ((m₁x₂ + m₂x₁)/(m₁ + m₂), (m₁y₂ + m₂y₁)/(m₁ + m₂)).',
      'Midpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).'
    ],
    importantFormulasOrReactions: [
      'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      'Section: x = (m₁x₂ + m₂x₁)/(m₁ + m₂), y = (m₁y₂ + m₂y₁)/(m₁ + m₂)',
      'Centroid = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)'
    ],
    frequentBoardQuestions: [
      {
        question: 'Find the ratio in which the y-axis divides the line segment joining the points (5, -6) and (-1, -4).',
        answer: 'Any point on the y-axis has coordinates (0, y). Let the ratio be k:1. Using section formula for x-coordinate: 0 = [k(-1) + 1(5)] / (k + 1) => -k + 5 = 0 => k = 5. Hence the ratio is 5:1.'
      }
    ]
  },
  {
    id: 'note_math_heights',
    subject: 'maths',
    title: 'Applications of Trigonometry (Heights & Distances)',
    chapterNumber: 9,
    readTime: '7 min read',
    summary: 'Line of sight, angle of elevation, angle of depression, and two-triangle word problems.',
    keyPoints: [
      'Angle of elevation: Angle formed by the line of sight with horizontal when object is above observer eye level.',
      'Angle of depression: Angle formed with horizontal when object is below observer eye level.',
      'Common standard ratios: tan 30° = 1/√3, tan 45° = 1, tan 60° = √3.'
    ],
    frequentBoardQuestions: [
      {
        question: 'From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.',
        answer: 'Let building AB = 7 m. In lower triangle, tan 45° = 7/d => d = 7 m. In upper triangle on tower, tan 60° = h/d => h = 7√3 m. Total height of tower = h + 7 = 7(√3 + 1) m ≈ 7(1.732 + 1) = 19.12 m.'
      }
    ]
  },
  {
    id: 'note_math_circles',
    subject: 'maths',
    title: 'Circles & Tangents',
    chapterNumber: 10,
    readTime: '6 min read',
    summary: 'Tangent properties, radius perpendicular to tangent at point of contact, and lengths of tangents from external point.',
    keyPoints: [
      'Theorem 10.1: The tangent at any point of a circle is perpendicular to the radius through the point of contact (OP ⊥ PT).',
      'Theorem 10.2: The lengths of tangents drawn from an external point to a circle are equal (PA = PB).',
      'Tangents subtend equal angles at the center.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Prove that the lengths of tangents drawn from an external point to a circle are equal.',
        answer: 'Given circle with center O and external point P with tangents PA and PB. In right ΔOAP and ΔOBP: OA = OB (radii), OP = OP (common hypotenuse), ∠OAP = ∠OBP = 90° (tangent ⊥ radius). By RHS congruence criterion, ΔOAP ≅ ΔOBP. Hence PA = PB by CPCT.'
      }
    ]
  },
  {
    id: 'note_math_surface',
    subject: 'maths',
    title: 'Surface Areas and Volumes',
    chapterNumber: 13,
    readTime: '8 min read',
    summary: 'Surface areas and volumes of combinations of solids (cubes, cuboids, cylinders, cones, spheres, hemispheres).',
    keyPoints: [
      'Cylinder: CSA = 2πrh, TSA = 2πr(r + h), Volume = πr²h.',
      'Cone: CSA = πrl (where slant height l = √(r² + h²)), TSA = πr(l + r), Volume = (1/3)πr²h.',
      'Sphere: Surface Area = 4πr², Volume = (4/3)πr³.',
      'Hemisphere: CSA = 2πr², TSA = 3πr², Volume = (2/3)πr³.'
    ],
    importantFormulasOrReactions: [
      'Cylinder: V = πr²h, TSA = 2πr(r + h)',
      'Cone: l = √(r² + h²), V = ⅓πr²h, CSA = πrl',
      'Sphere: V = ⁴⁄₃πr³, SA = 4πr²',
      'Hemisphere: V = ⅔πr³, TSA = 3πr²'
    ],
    frequentBoardQuestions: [
      {
        question: 'A solid toy is in the form of a hemisphere surmounted by a right circular cone of the same radius 3.5 cm. If the total height of the toy is 15.5 cm, find the total surface area of the toy.',
        answer: 'Radius r = 3.5 cm. Height of cone h = 15.5 - 3.5 = 12 cm. Slant height l = √(r² + h²) = √(12.25 + 144) = √156.25 = 12.5 cm. Total Surface Area = CSA of cone + CSA of hemisphere = πrl + 2πr² = πr(l + 2r) = (22/7) * 3.5 * (12.5 + 7) = 11 * 19.5 = 214.5 cm².'
      }
    ]
  },
  {
    id: 'note_math_stats',
    subject: 'maths',
    title: 'Statistics (Mean, Median, Mode)',
    chapterNumber: 14,
    readTime: '7 min read',
    summary: 'Grouped data formulas: Direct and Assumed Mean, Modal class, Median class, and the empirical relationship.',
    keyPoints: [
      'Mean: Direct method x̄ = Σ(fi·xi) / Σfi; Assumed mean method x̄ = a + [Σ(fi·di) / Σfi].',
      'Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h, where l is lower limit of modal class.',
      'Median = l + [((n/2) - cf) / f] × h.',
      'Empirical Formula: 3 Median = Mode + 2 Mean.'
    ],
    importantFormulasOrReactions: [
      'Mode = l + [(f₁ - f₀)/(2f₁ - f₀ - f₂)] × h',
      'Median = l + [(n/2 - cf)/f] × h',
      'Empirical: 3 Median = Mode + 2 Mean'
    ],
    frequentBoardQuestions: [
      {
        question: 'If the mean of a data set is 28 and the median is 30, find the mode using the empirical relationship.',
        answer: 'Empirical formula: 3 Median = Mode + 2 Mean => Mode = 3 Median - 2 Mean = 3(30) - 2(28) = 90 - 56 = 34.'
      }
    ]
  },
  {
    id: 'note_math_prob',
    subject: 'maths',
    title: 'Probability',
    chapterNumber: 15,
    readTime: '6 min read',
    summary: 'Theoretical probability, sample spaces for coins, dice, and 52-card decks, impossible and sure events.',
    keyPoints: [
      'P(E) = Number of outcomes favorable to E / Total number of possible outcomes.',
      '0 ≤ P(E) ≤ 1. Sure event P(E) = 1; Impossible event P(E) = 0.',
      'Complementary events: P(E) + P(not E) = 1.',
      '52 Cards: 26 Red (13 Hearts, 13 Diamonds), 26 Black (13 Spades, 13 Clubs). 12 Face cards (4 Kings, 4 Queens, 4 Jacks).'
    ],
    frequentBoardQuestions: [
      {
        question: 'One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting: (i) a king of red colour, (ii) a face card.',
        answer: '(i) There are 2 red kings (King of Hearts & King of Diamonds). P(Red King) = 2/52 = 1/26. (ii) There are 12 face cards. P(Face Card) = 12/52 = 3/13.'
      }
    ]
  },

  // SOCIAL SCIENCE IN HINDI (Complete Part 1 Requirements)
  {
    id: 'note_soc_europe',
    subject: 'social',
    title: 'यूरोप में राष्ट्रवाद का उदय (Rise of Nationalism in Europe)',
    chapterNumber: 1,
    readTime: '8 min read',
    summary: 'फ्रेडरिक सॉरयू की कल्पना, 1789 की फ्रांसीसी क्रांति, नेपोलियन कोड 1804, उदारवादी राष्ट्रवाद, 1848 की क्रांतियां, इटली व जर्मनी का एकीकरण।',
    keyPoints: [
      '1789 की फ्रांसीसी क्रांति: संप्रभुता राजतंत्र से निकलकर नागरिकों के समूह में स्थानांतरित; पितृभूमि (la patrie) और नागरिक (le citoyen) की भावना।',
      'नेपोलियन कोड (1804): जन्म आधारित विशेषाधिकार समाप्त, संपत्ति का अधिकार सुरक्षित, कानून के समक्ष समानता।',
      'जर्मनी का एकीकरण (1866-1871): ओटो वॉन बिस्मार्क (प्रशिया का चांसलर) को जनक माना जाता है; "रक्त और लौह की नीति" (Blood and Iron policy); 1871 में कैसर विलियम प्रथम सम्राट घोषित।',
      'इटली का एकीकरण: तीन प्रमुख नायक—मैत्सिनी (यंग इटली), कावूर (कूटनीतिक आंदोलन), गैरीबाल्डी (रेड शर्ट्स वालंटियर्स); 1861 में विक्टर इमैनुएल द्वितीय राजा बने।',
      'ब्रिटेन का अजीबोगरीब मामला: 1707 के एक्ट ऑफ यूनियन द्वारा यूनाइटेड किंगडम ऑफ ग्रेट ब्रिटेन का गठन।'
    ],
    frequentBoardQuestions: [
      {
        question: 'जर्मनी के एकीकरण की प्रक्रिया का संक्षेप में वर्णन कीजिए।',
        answer: '1848 में जर्मन मध्यम वर्ग ने फ्रैंकफर्ट संसद में संविधान बनाकर एकीकरण का प्रयास किया जो विफल रहा। इसके बाद प्रशिया ने आंदोलन का नेतृत्व संभाला। प्रशिया के प्रमुख मंत्री ओटो वॉन बिस्मार्क ने सेना और नौकरशाही की मदद से सात वर्षों में ऑस्ट्रिया, डेनमार्क और फ्रांस के खिलाफ तीन युद्ध जीते और प्रशिया की जीत के साथ जनवरी 1871 में वर्साय में कैसर विलियम प्रथम को एकीकृत जर्मनी का सम्राट घोषित किया गया।'
      }
    ]
  },
  {
    id: 'note_soc_global',
    subject: 'social',
    title: 'भूमंडलीकृत विश्व का बनना (The Making of a Global World)',
    chapterNumber: 3,
    readTime: '7 min read',
    summary: 'सिल्क रूट, बीमारी और उपनिवेशवाद (रिंडरपेस्ट/कैटल प्लेग), उन्नीसवीं सदी का वैश्विक श्रम प्रवास, महामंदी (1929) और ब्रेटन वुड्स संस्थान (IMF & World Bank)।',
    keyPoints: [
      'सिल्क रूट (रेशम मार्ग): एशिया, यूरोप और उत्तरी अफ्रीका को जोड़ने वाला प्राचीन व्यापारिक व सांस्कृतिक मार्ग।',
      'रिंडरपेस्ट (1890 के दशक में अफ्रीका): मवेशियों की भयानक संक्रामक बीमारी जिसने 90% मवेशियों को मार डाला और अफ्रीकियों को श्रम बाजार में धकेल दिया।',
      'गिरमिटिया मजदूर (Indentured Laborers): अनुबंध पर फिजी, मॉरीशस, त्रिनिदाद भेजे गए भारतीय मजदूर (जिन्हें "नई दास प्रणाली" कहा गया)।',
      '1929 की महामंदी: कृषि अति-उत्पादन और अमेरिकी शेयर बाजार ढहने से शुरू हुई; बैंकों का दिवालिया होना, बेरोजगारी और व्यापार में भारी गिरावट।',
      'ब्रेटन वुड्स समझौता (1944): आर्थिक स्थिरता हेतु अंतरराष्ट्रीय मुद्रा कोष (IMF) और विश्व बैंक (IBRD) की स्थापना; अमेरिकी डॉलर को आधार मुद्रा माना गया।'
    ],
    frequentBoardQuestions: [
      {
        question: '1929 की महामंदी के प्रमुख कारणों का उल्लेख कीजिए।',
        answer: '1. कृषि में अत्यधिक उत्पादन जिससे कीमतें गिर गईं और किसानों की आय में भारी कमी आई। 2. 1920 के दशक में अमेरिका ने विदेशी देशों को भारी कर्ज दिया था, संकट आते ही अमेरिकी बैंकों ने घरेलू और विदेशी ऋण वापस बुला लिए। 3. अमेरिकी शेयर बाजार (वॉल स्ट्रीट) का क्रैश होना जिससे बैंक दिवालिया हो गए और निवेश रुक गया।'
      }
    ]
  },
  {
    id: 'note_soc_fed',
    subject: 'social',
    title: 'संघवाद एवं सत्ता की साझेदारी (Federalism & Power Sharing)',
    chapterNumber: 14,
    readTime: '8 min read',
    summary: 'बेल्जियम और श्रीलंका में सत्ता की साझेदारी का मॉडल, भारतीय संघवाद की त्रस्तरीय व्यवस्था (संघ, राज्य, समवर्ती सूची), और 1992 का 73वां/74वां विकेंद्रीकरण संशोधन।',
    keyPoints: [
      'बेल्जियम मॉडल: डच और फ्रेंच भाषियों को केंद्र में समान प्रतिनिधित्व, सामुदायिक सरकार (भाषा व संस्कृति हेतु); गृहयुद्ध टला।',
      'श्रीलंका में बहुसंख्यकवाद: 1956 के कानून द्वारा सिंहली को एकमात्र राजभाषा घोषित किया गया, तमिलों में अलगाव की भावना बढ़ी और गृहयुद्ध हुआ।',
      'भारतीय संघवाद: संघ सूची (रक्षा, विदेश, बैंकिंग), राज्य सूची (पुलिस, व्यापार, कृषि), समवर्ती सूची (शिक्षा, वन, विवाह), अवशिष्ट शक्तियां (कंप्यूटर सॉफ्टवेयर, केंद्र के पास)।',
      '1992 का विकेंद्रीकरण: स्थानीय निकायों के नियमित चुनाव अनिवार्य, महिलाओं के लिए 1/3 सीटें आरक्षित, राज्य चुनाव आयोग का गठन।'
    ],
    frequentBoardQuestions: [
      {
        question: '1992 के संविधान संशोधन द्वारा भारत में स्थानीय स्वशासन (विकेंद्रीकरण) को किस प्रकार सुदृढ़ बनाया गया?',
        answer: '1. स्थानीय स्वशासी निकायों के चुनाव नियमित रूप से कराना संवैधानिक बाध्यता बना दिया गया। 2. अनुसूचित जातियों, जनजातियों और पिछड़ी जातियों के लिए सीटें आरक्षित की गईं। 3. महिलाओं के लिए सभी पदों पर कम से कम एक-तिहाई (33%) आरक्षण अनिवार्य किया गया। 4. पंचायतों और नगरपालिकाओं के स्वतंत्र चुनाव हेतु प्रत्येक राज्य में "राज्य चुनाव आयोग" का गठन किया गया।'
      }
    ]
  },
  {
    id: 'note_soc_parties',
    subject: 'social',
    title: 'राजनीतिक दल एवं लोकतंत्र के परिणाम (Political Parties & Outcomes)',
    chapterNumber: 15,
    readTime: '7 min read',
    summary: 'राजनीतिक दलों के तीन प्रमुख अंग, कार्य, चुनौतियां (वंशवाद, धन-बल), चुनाव आयोग के सुधार और लोकतंत्र के जवाबदेह व उत्तरदायी परिणाम।',
    keyPoints: [
      'राजनीतिक दल के तीन घटक: नेता, सक्रिय सदस्य, और अनुयायी (समर्थक)।',
      'प्रमुख कार्य: चुनाव लड़ना, नीतियां व कार्यक्रम बनाना, कानून निर्माण में निर्णायक भूमिका, विपक्ष की भूमिका निभाना, जनमत तैयार करना।',
      'दलों के समक्ष 4 प्रमुख चुनौतियां: 1. आंतरिक लोकतंत्र का अभाव, 2. वंशवादी उत्तराधिकार, 3. धन और बाहुबल का बढ़ता प्रभाव, 4. मतदाताओं के सामने सार्थक विकल्प का अभाव।',
      'दलबदल विरोधी कानून: विधायकों/सांसदों को दल बदलने पर अयोग्य घोषित करने हेतु संविधान में संशोधन।'
    ],
    frequentBoardQuestions: [
      {
        question: 'लोकतांत्रिक व्यवस्था को एक "उत्तरदायी और वैध सरकार" क्यों माना जाता है?',
        answer: '1. लोकतंत्र में सरकार जनता द्वारा चुनी जाती है, अतः वह जनता की जरूरतों और आकांक्षाओं के प्रति जवाबदेह होती है। 2. निर्णय लेने में तय नियमों और प्रक्रियाओं का पालन होता है जिससे पारदर्शिता बनी रहती है। 3. यह एक "वैध सरकार" है क्योंकि यह संविधान के दायरे में जनता के जनादेश से शासन करती है।'
      }
    ]
  },

  // OPTIONAL LANGUAGES (Sanskrit & IT 402)
  {
    id: 'note_opt_sanskrit',
    subject: 'optional_lang',
    title: 'संस्कृत व्याकरण एवं शेमुषी भाग-2 (Sanskrit Core)',
    chapterNumber: 1,
    readTime: '7 min read',
    summary: 'शुचिपर्यावरणम्, सन्धि-प्रकरणम् (व्यञ्जन व विसर्ग), समास (तत्पुरुष, कर्मधारय, बहुव्रीहि), प्रत्यय (मतुप्, तल्, त्व) तथा समय-लेखन।',
    keyPoints: [
      'शुचिपर्यावरणम्: कवि हरिदत्तशर्मा द्वारा रचित "लसलल्तिका" से संकलित। पर्यावरण प्रदूषण से मुक्ति और प्राकृतिक संरक्षण का संदेश।',
      'व्यञ्जन सन्धि: प्रथम वर्णस्य तृतीय वर्णे परिवर्तनम् (वाक् + ईशः = वागीशः, अच् + अन्तः = अजन्तः)।',
      'विसर्ग सन्धि: विसर्गस्य उत्वम् (रामः + अवदत् = रामोऽवदत्); विसर्गस्य रुत्वम् (मुनिः + अयम् = मुनिरयम्)।',
      'समय-लेखनम्: 4:00 (चतुर्वादनम्), 4:15 (सपाद-चतुर्वादनम्), 4:30 (सार्ध-चतुर्वादनम्), 4:45 (पादों-पञ्चवादनम्)।',
      'प्रत्यय: मतुप् (गुणवान्, धनवान्, बुद्धिमती), तल् (सुन्दरता), त्व (महत्त्वम्)।'
    ],
    frequentBoardQuestions: [
      {
        question: 'संस्कृत समय-लेखनम् कुरुत: (i) 07:15, (ii) 09:30, (iii) 10:45।',
        answer: '(i) 07:15 = सपाद-सप्तवादनम्, (ii) 09:30 = सार्ध-नववादनम्, (iii) 10:45 = पादोन-एकादशवादनम्।'
      }
    ]
  },
  {
    id: 'note_opt_it',
    subject: 'optional_lang',
    title: 'Information Technology (IT 402) & AI Foundations',
    chapterNumber: 2,
    readTime: '7 min read',
    summary: 'Digital Documentation (Styles, TOC, Mail Merge), Electronic Spreadsheet (Scenarios, Goal Seek, Macros), RDBMS (SQL keys), and AI Project Cycle.',
    keyPoints: [
      'Digital Documentation: Styles & Formatting deck; Inserting images (Crop, Wrap text); Creating Table of Contents (TOC); Mail Merge for mass personalized letters.',
      'Spreadsheets: Consolidate data across sheets; Subtotals tool; What-If Analysis (Goal Seek to find input for targeted result; Solver; Scenarios); Recording Macros.',
      'RDBMS / Database: Primary Key (unique, non-null identifier); Foreign Key (references primary key in another table); Candidate keys.',
      'Web Security & Workplace Safety: Strong password guidelines, firewall, phishing prevention, ergonomics and cyber safety.',
      'Artificial Intelligence (AI): AI Project Cycle: Problem Scoping -> Data Acquisition -> Data Exploration -> Modelling -> Evaluation.'
    ],
    frequentBoardQuestions: [
      {
        question: 'What is the difference between Goal Seek and Solver in a spreadsheet application?',
        answer: 'Goal Seek is used when you know the final outcome of a single formula and want to find the single input variable needed to achieve that goal. Solver is an advanced tool that can handle multiple input variables simultaneously with specific constraints and boundary conditions.'
      }
    ]
  }
];

