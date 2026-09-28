// AI Voice Personalization Module for EduPulse Class 10
// Personas: Amitabh Bachchan, Bharti Singh, and Deactivated

export type VoicePersona = 'amitabh' | 'bharti' | 'deactivated';

export interface PersonaDetails {
  id: VoicePersona;
  name: string;
  character: string;
  tagline: string;
  avatar: string;
  badge: string;
  color: string;
  gradient: string;
  pitch: number;
  rate: number;
  introVoiceText: string;
  correctReactions: string[];
  incorrectReactions: string[];
  motivationalQuotes: string[];
}

export const PERSONAS_CONFIG: Record<VoicePersona, PersonaDetails> = {
  amitabh: {
    id: 'amitabh',
    name: 'Amitabh Bachchan',
    character: 'महानायक / केबीसी मेंटर',
    tagline: 'गंभीर, प्रेरणादायक और केबीसी शैली में सटीक मार्गदर्शन',
    avatar: '🎙️',
    badge: 'KBC Mentor',
    color: '#6366f1',
    gradient: 'from-indigo-600 via-indigo-700 to-purple-800',
    pitch: 0.72,
    rate: 0.88,
    introVoiceText: 'नमस्कार, आदाब, अभिनन्दन! मैं अमिताभ बच्चन। अपनी कक्षा 10 की परीक्षा में पूरे आत्मविश्वास के साथ आगे बढ़िए। सफलता आपका इंतज़ार कर रही है!',
    correctReactions: [
      'अद्भुत! बिल्कुल सही उत्तर! कम्प्यूटर जी ने आपके जवाब को लॉक कर दिया है!',
      'शानदार! क्या आत्मविश्वास है! आपका यह उत्तर पूर्णतः सही है।',
      'बहुत खूब! आपकी एकाग्रता और लगन देखकर अत्यंत प्रसन्नता हुई।',
      'अद्वितीय प्रयास! कक्षा 10 बोर्ड में 95 प्रतिशत का लक्ष्य अब और करीब है!'
    ],
    incorrectReactions: [
      'ओहो! यह उत्तर सही नहीं था। पर घबराइए मत, हर गलती एक नई सीख देती है।',
      'अफसोस, यह गलत हो गया। ध्यान से व्याख्या को पढ़िए और आगे बढ़िए।',
      'धैर्य रखिए। असफलता केवल यह सिद्ध करती है कि सफलता का प्रयास पूरे मन से नहीं हुआ। अगला सवाल देखिए।'
    ],
    motivationalQuotes: [
      'याद रखिए, जीवन में कभी किसी से कम मत समझिए। मेहनत का कोई विकल्प नहीं होता!',
      'कोशिश करने वालों की कभी हार नहीं होती, लहरों से डरकर नौका पार नहीं होती!'
    ]
  },
  bharti: {
    id: 'bharti',
    name: 'Bharti',
    character: 'कॉमेडी क्वीन / चीयरलीडर',
    tagline: 'हँसते-हँसते बोर्ड की फुल तैयारी, टेंशन को बोलो बाय-बाय!',
    avatar: '💃',
    badge: 'Fun & Energy',
    color: '#ec4899',
    gradient: 'from-pink-500 via-rose-500 to-amber-500',
    pitch: 1.28,
    rate: 1.05,
    introVoiceText: 'अरे वाह! नमस्ते जी! मैं हूँ भारती! टेंशन बिल्कुल मत लो, पढ़ाई को हँसते-खेलते ऐसा फोड़ेंगे कि पूरे मोहल्ले में लड्डू बटेंगे!',
    correctReactions: [
      'अरे वाह मेरे शेर! क्या बात है! एकदम लल्लनटॉप सही जवाब!',
      'शाबाश! अरे ताली बजाओ रे कोई! एकदम सही निशाना मारा है!',
      'ओए होए! क्या दिमाग पाया है! आज तो बोर्ड टॉपर बनने से कोई नहीं रोक सकता!',
      'जियो मेरे लाल! ऐसे ही सारे सवाल उड़ाते रहो, पार्टी पक्की!'
    ],
    incorrectReactions: [
      'अरे रे रे! गलत हो गया कोई ना! टेंशन काहे लेते हो, गलती नहीं करोगे तो सीखोगे कैसे?',
      'अरे कोई बात नहीं यार! बड़े-बड़े शहरों में ऐसी छोटी-छोटी गलतियाँ होती रहती हैं। अगला वाला फोड़ेंगे!',
      'हँस के टाल दो! एक बार एक्सप्लेनेशन पढ़ लो, अगली बार यही सवाल एग्ज़ाम में छपेगा!'
    ],
    motivationalQuotes: [
      'अरे काहे डरते हो बोर्ड से! तुम शेर हो शेर! बस रोज़ 50 सवाल फोड़ो, 95% पक्के हैं!',
      'मुस्कुराते रहो और पढ़ाई का मज़ा लो, तनाव लेने से तो सिर्फ बीपी बढ़ता है, मार्क्स नहीं!'
    ]
  },
  deactivated: {
    id: 'deactivated',
    name: 'Deactivated',
    character: 'शांत अध्ययन मोड',
    tagline: 'बिना किसी वॉइस कमेंट्री के शांतिपूर्वक पढ़ाई करें',
    avatar: '🔇',
    badge: 'Silent Focus',
    color: '#64748b',
    gradient: 'from-slate-600 to-slate-800',
    pitch: 1.0,
    rate: 1.0,
    introVoiceText: '',
    correctReactions: [],
    incorrectReactions: [],
    motivationalQuotes: []
  }
};

class AIVoiceEngine {
  private currentPersona: VoicePersona = 'amitabh';
  private isSpeaking: boolean = false;
  private listeners: ((speaking: boolean, text: string) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('edupulse_ai_voice_persona');
      if (saved && (saved === 'amitabh' || saved === 'bharti' || saved === 'deactivated')) {
        this.currentPersona = saved as VoicePersona;
      }
    }
  }

  getPersona(): VoicePersona {
    return this.currentPersona;
  }

  setPersona(persona: VoicePersona): void {
    this.currentPersona = persona;
    if (typeof window !== 'undefined') {
      localStorage.setItem('edupulse_ai_voice_persona', persona);
    }
    this.stop();
  }

  subscribe(callback: (speaking: boolean, text: string) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeaking = speaking;
    this.listeners.forEach(cb => cb(speaking, text));
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify(false, '');
  }

  speak(text: string, forcePersona?: VoicePersona): void {
    const personaKey = forcePersona || this.currentPersona;
    if (personaKey === 'deactivated' || !text.trim()) {
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const config = PERSONAS_CONFIG[personaKey];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = config.pitch;
    utterance.rate = config.rate;

    // Pick best Hindi / Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('HI'));
    const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    } else if (indianVoice) {
      utterance.voice = indianVoice;
    }

    utterance.onstart = () => {
      this.notify(true, text);
    };

    utterance.onend = () => {
      this.notify(false, '');
    };

    utterance.onerror = () => {
      this.notify(false, '');
    };

    window.speechSynthesis.speak(utterance);
  }

  speakFeedback(isCorrect: boolean): void {
    if (this.currentPersona === 'deactivated') return;
    const config = PERSONAS_CONFIG[this.currentPersona];
    const list = isCorrect ? config.correctReactions : config.incorrectReactions;
    if (!list || list.length === 0) return;
    const randomItem = list[Math.floor(Math.random() * list.length)];
    this.speak(randomItem);
  }

  speakIntro(persona?: VoicePersona): void {
    const p = persona || this.currentPersona;
    const config = PERSONAS_CONFIG[p];
    if (config.introVoiceText) {
      this.speak(config.introVoiceText, p);
    }
  }

  speakQuestion(questionText: string): void {
    if (this.currentPersona === 'deactivated') return;
    const prefix = this.currentPersona === 'amitabh' 
      ? 'कंप्यूटर जी, अगला प्रश्न प्रस्तुत किया जाए: '
      : 'अरे सुनो ध्यान से, यह रहा सवाल: ';
    this.speak(`${prefix} ${questionText}`);
  }
}

export const aiVoice = new AIVoiceEngine();
