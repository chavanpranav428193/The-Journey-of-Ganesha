import { LevelConfig, WisdomCardData, AchievementData, LeaderboardEntry, LevelQuiz } from '../types';

export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'The Arrival of Ganesha',
    subtitle: 'Devotion, Responsibility & Sacred Qualities',
    emoji: '🌸',
    baseScore: 500,
    maxScore: 1000,
    storyIntro: {
      title: 'A Sacred Creation at Mount Kailash',
      narrative: [
        'In a widely told traditional account, atop the snowy peaks of Mount Kailash, Goddess Parvati creates young Ganesha.',
        'Entrusting him with a solemn responsibility, she instructs: "Guard this entrance and do not let anyone enter while I bathe."',
        'Young Ganesha accepts his duty with pure devotion, exemplifying the virtues of responsibility, wisdom, and auspicious new beginnings.'
      ],
      ganeshaQuote: 'True strength begins with responsibility and heartfelt devotion to duty.'
    },
    educationalInsight: {
      title: 'Qualities of Lord Ganesha',
      summary: 'Lord Ganesha is widely revered as a deity associated with wisdom, auspicious beginnings and the removal of obstacles.',
      culturalContext: 'In traditional narratives, Ganesha represents the manifestation of purity, consciousness, and steadfast responsibility. He is invoked at the start of any new venture as Vighnaharta — the remover of obstacles.',
      modernTakeaway: 'When starting any meaningful journey, approach your responsibilities with clarity, sincerity, and pure intent.'
    }
  },
  {
    id: 2,
    title: 'The Guardian',
    subtitle: 'Steadfast Duty & The Sacred Elephant Form',
    emoji: '🛕',
    baseScore: 500,
    maxScore: 1000,
    storyIntro: {
      title: 'Standing Guard at the Threshold',
      narrative: [
        'Ganesha stands faithfully at the entrance, upholding his mother\'s instruction with unwavering determination.',
        'When Lord Shiva returns to Kailash, Ganesha does not allow him to enter because he is faithfully carrying out Parvati\'s command.',
        'A conflict develops. In traditional narratives, this pivotal encounter transforms through a bright divine visual into Ganesha receiving the sacred elephant head.'
      ],
      ganeshaQuote: 'Do your duty with sincerity, standing firm in integrity and devotion.'
    },
    educationalInsight: {
      title: 'The Elephant Head & Sacred Form',
      summary: 'Different Hindu traditions tell the story with variations, but Ganesha\'s elephant-headed form is central to his identity and worship.',
      culturalContext: 'The elephant is commonly associated with qualities such as wisdom, strength and intelligence. Large ears signify attentive listening, the trunk symbolizes adaptability and discernment, and the broken tusk represents dedication to learning.',
      modernTakeaway: 'True character is forged when we fulfill our responsibilities with honesty and courage, learning that strength shines brightest when tempered with wisdom.'
    }
  },
  {
    id: 3,
    title: 'The Wisdom Challenge',
    subtitle: 'Kartikeya\'s Journey & The Cosmic Pradakshina',
    emoji: '🧠',
    baseScore: 500,
    maxScore: 1000,
    storyIntro: {
      title: 'The Race Around the Cosmos',
      narrative: [
        'In the traditional family narrative, Ganesha\'s brother Kartikeya is known for his swift peacock mount.',
        'A sacred challenge is set: whoever circles the entire world first shall receive the divine fruit of wisdom.',
        'Kartikeya chooses a physical journey across the globe. Ganesha thinks differently: recognizing that his parents encompass the entire universe, he performs a reverent pradakshina around them.'
      ],
      ganeshaQuote: 'Wisdom is not always about moving faster. Sometimes it is about seeing differently.'
    },
    educationalInsight: {
      title: 'Reverence & Perspective',
      summary: 'One traditional interpretation of this story highlights wisdom, perspective and devotion to one\'s parents.',
      culturalContext: 'Circumambulating parents (Pradakshina) symbolizes that love, gratitude, and moral foundations encompass all knowledge. The story teaches that deep contemplation often reveals answers that frantic haste misses.',
      modernTakeaway: 'Do not measure progress solely by physical speed; often the most thoughtful and respectful perspective solves life\'s greatest questions.'
    }
  },
  {
    id: 4,
    title: 'Why Do We Celebrate Ganesh Chaturthi?',
    subtitle: 'Birth, Devotion & Building the Festival',
    emoji: '🪔',
    baseScore: 500,
    maxScore: 1000,
    storyIntro: {
      title: 'The Arrival of the Divine Guest',
      narrative: [
        'Ganesh Chaturthi is a Hindu festival commemorating the birth and arrival of Lord Ganesha.',
        'It is observed on the Chaturthi (fourth lunar day) of the bright fortnight of Bhadrapada, generally falling in August or September.',
        'Celebration styles and durations vary by region: from intimate home altars with clay idols, aartis, and sweet modaks to grand community pandals filled with music and cultural unity.'
      ],
      ganeshaQuote: 'Celebration becomes meaningful when it brings people together in devotion and harmony.'
    },
    educationalInsight: {
      title: 'The Essence of Ganesh Chaturthi',
      summary: 'Ganesh Chaturthi brings devotion, culture, family and community together. The festival is not only about decoration or entertainment; worship and devotion remain central.',
      culturalContext: 'Across India and global diasporas, families welcome Ganesha with traditional rituals (Prana Pratishtha), offer 21 durva blades and modaks, sing aartis, and open their homes to neighbors and relatives.',
      modernTakeaway: 'Festivals are living expressions of human connection, spiritual reflection, hospitality, and shared cultural joy.'
    }
  },
  {
    id: 5,
    title: 'From Tradition to Ganeshotsav',
    subtitle: 'Ancient Roots, Public Unity & Responsible Farewell',
    emoji: '✨',
    baseScore: 500,
    maxScore: 1000,
    storyIntro: {
      title: 'From Ancient Roots to Public Celebration',
      narrative: [
        'Ganesh worship and the festival have roots older than the modern public Ganeshotsav.',
        'During the 1890s, Lokmanya Bal Gangadhar Tilak helped transform and expand Ganesh worship into a large public community celebration.',
        'The public festival created opportunities for people of all backgrounds to gather for worship, music, cultural activities, public discussion, and social unity.'
      ],
      ganeshaQuote: 'Modern celebrations can preserve tradition while caring for people, community, and Mother Nature.'
    },
    educationalInsight: {
      title: 'Responsible Celebration & Visarjan',
      summary: 'Ganesh Chaturthi is a meeting point of devotion, tradition, community and culture. Modern celebrations can preserve tradition while caring for people and nature.',
      culturalContext: 'Many Ganesh Chaturthi celebrations conclude with the ceremonial immersion (Visarjan) of the Ganesha idol, symbolizing the cycle of creation and return to formless spirit. Today, communities actively champion eco-friendly clay idols and artificial water immersion to protect our rivers and lakes.',
      modernTakeaway: 'Celebrate with joyful chants of "Ganpati Bappa Morya" and "Pudhchya Varshi Lavkar Ya", keeping our environment clean and our communities united.'
    }
  }
];

export const WISDOM_CARDS: WisdomCardData[] = [
  {
    id: 1,
    levelId: 1,
    chapterTitle: 'THE FIRST LESSON',
    theme: 'Responsibility & Devotion',
    lesson: 'True strength begins with responsibility.',
    quote: 'Accept duty with sincerity, for genuine valor lies in steadfast guardianship.',
    symbol: '🌸 Kailash Lotus & Diya',
    culturalNote: 'Ganesha teaches us that life\'s greatest achievements begin when we honor our commitments with integrity.'
  },
  {
    id: 2,
    levelId: 2,
    chapterTitle: 'THE SECOND LESSON',
    theme: 'Integrity & Sincerity',
    lesson: 'Do your duty with sincerity.',
    quote: 'Stand firm in righteousness; when strength is tempered with wisdom, obstacles turn into blessings.',
    symbol: '🐘 Gajamukha (Elephant Head)',
    culturalNote: 'The elephant head symbolizes profound intellect, gentle strength, and the capacity to listen deeply before acting.'
  },
  {
    id: 3,
    levelId: 3,
    chapterTitle: 'THE THIRD LESSON',
    theme: 'Perspective & Wisdom',
    lesson: 'Wisdom is not always about moving faster. Sometimes it is about seeing differently.',
    quote: 'Those who honor their parents and cultivate reverence discover the universe within their hearts.',
    symbol: '🧠 Cosmic Pradakshina',
    culturalNote: 'Contemplation and reverence reveal profound solutions that mere physical speed can never match.'
  },
  {
    id: 4,
    levelId: 4,
    chapterTitle: 'THE FOURTH LESSON',
    theme: 'Community & Shared Devotion',
    lesson: 'Celebration becomes meaningful when it brings people together.',
    quote: 'True celebration is where devotion meets togetherness, welcoming all with sweet offerings and open hearts.',
    symbol: '🪔 Festive Pandal & Modak',
    culturalNote: 'Ganesh Chaturthi unites families, neighborhoods, and cultures through music, arts, and heartfelt prayer.'
  },
  {
    id: 5,
    levelId: 5,
    chapterTitle: 'THE FINAL LESSON',
    theme: 'Tradition & Eco-Harmony',
    lesson: 'Modern celebrations can preserve tradition while caring for people and nature.',
    quote: 'Form dissolves in water, yet the divine wisdom, unity, and love in our hearts remain eternal.',
    symbol: '🌱 Eco Visarjan & Sacred Immersion',
    culturalNote: 'Responsible Ganeshotsav honors both our ancient heritage and the natural ecosystems that sustain all living beings.'
  }
];

export const LEVEL_QUIZZES: LevelQuiz[] = [
  {
    levelId: 1,
    levelTitle: 'The Arrival of Ganesha',
    questions: [
      {
        id: 1,
        question: 'Why was Ganesha guarding the entrance at Mount Kailash?',
        options: [
          { id: 'a', text: 'He wanted to challenge Shiva in a duel', isCorrect: false },
          { id: 'b', text: 'Goddess Parvati had asked him to guard it', isCorrect: true },
          { id: 'c', text: 'Kartikeya asked him to watch the mountain', isCorrect: false },
          { id: 'd', text: 'He was preparing for a village market', isCorrect: false }
        ],
        correctExplanation: 'In a widely told traditional account, Goddess Parvati created Ganesha and entrusted him with guarding the entrance while she was bathing.'
      },
      {
        id: 2,
        question: 'What sacred duty did Goddess Parvati give to young Ganesha?',
        options: [
          { id: 'a', text: 'To wander into the dense Himalayan forest', isCorrect: false },
          { id: 'b', text: 'To guard the entrance and let no one enter', isCorrect: true },
          { id: 'c', text: 'To build a golden chariot for the gods', isCorrect: false },
          { id: 'd', text: 'To count all the stars in the night sky', isCorrect: false }
        ],
        correctExplanation: 'She gave him the clear responsibility: "Guard this entrance and do not let anyone enter," which Ganesha accepted faithfully.'
      },
      {
        id: 3,
        question: 'Which qualities are traditionally associated with Lord Ganesha?',
        options: [
          { id: 'a', text: 'Only physical combat and destructive anger', isCorrect: false },
          { id: 'b', text: 'Wisdom, auspicious beginnings, and the removal of obstacles', isCorrect: true },
          { id: 'c', text: 'Silence, wandering, and avoiding responsibility', isCorrect: false },
          { id: 'd', text: 'Material greed and boasting', isCorrect: false }
        ],
        correctExplanation: 'Lord Ganesha is revered across traditions as the deity of wisdom, auspicious new beginnings, and the remover of obstacles (Vighnaharta).'
      }
    ]
  },
  {
    levelId: 2,
    levelTitle: 'The Guardian',
    questions: [
      {
        id: 1,
        question: 'Why did Ganesha not allow Lord Shiva to enter the entrance?',
        options: [
          { id: 'a', text: 'He was faithfully following Goddess Parvati\'s instruction', isCorrect: true },
          { id: 'b', text: 'He wanted to claim Mount Kailash for himself', isCorrect: false },
          { id: 'c', text: 'He had fallen asleep and locked the doors', isCorrect: false },
          { id: 'd', text: 'Kartikeya told him to block the pathway', isCorrect: false }
        ],
        correctExplanation: 'Ganesha stood his ground because he was steadfastly upholding the duty and promise he made to his mother Parvati.'
      },
      {
        id: 2,
        question: 'Who instructed Ganesha to guard the threshold?',
        options: [
          { id: 'a', text: 'Sage Narada', isCorrect: false },
          { id: 'b', text: 'Lord Brahma', isCorrect: false },
          { id: 'c', text: 'Goddess Parvati', isCorrect: true },
          { id: 'd', text: 'Lord Indra', isCorrect: false }
        ],
        correctExplanation: 'Goddess Parvati created Ganesha and personally gave him the sacred duty of guarding her threshold.'
      },
      {
        id: 3,
        question: 'What transformation is central to Ganesha\'s traditional story and form?',
        options: [
          { id: 'a', text: 'Ganesha disappears permanently into the wind', isCorrect: false },
          { id: 'b', text: 'Ganesha receives the sacred elephant head, symbolizing wisdom and intellect', isCorrect: true },
          { id: 'c', text: 'Ganesha grows wings and flies across the sun', isCorrect: false },
          { id: 'd', text: 'Ganesha transforms into a mountain peak', isCorrect: false }
        ],
        correctExplanation: 'Traditional narratives recount Ganesha receiving the elephant head, a divine form widely associated with wisdom, strength, and calm intelligence.'
      }
    ]
  },
  {
    levelId: 3,
    levelTitle: 'The Wisdom Challenge',
    questions: [
      {
        id: 1,
        question: 'Who is Kartikeya in traditional narratives of Ganesha\'s family?',
        options: [
          { id: 'a', text: 'Ganesha\'s brother, who travels swiftly upon a peacock', isCorrect: true },
          { id: 'b', text: 'A neighboring ruler of the plains', isCorrect: false },
          { id: 'c', text: 'A wandering merchant in the valley', isCorrect: false },
          { id: 'd', text: 'A celestial singer from Gandharva realm', isCorrect: false }
        ],
        correctExplanation: 'Kartikeya (also known as Murugan or Skanda) is Ganesha\'s brother in the divine family of Shiva and Parvati.'
      },
      {
        id: 2,
        question: 'What was the divine challenge set before Ganesha and Kartikeya?',
        options: [
          { id: 'a', text: 'To compose the longest epic poetry in one night', isCorrect: false },
          { id: 'b', text: 'To travel around the world / cosmos', isCorrect: true },
          { id: 'c', text: 'To construct a golden temple on the peak', isCorrect: false },
          { id: 'd', text: 'To find a hidden jewel at the bottom of the ocean', isCorrect: false }
        ],
        correctExplanation: 'The friendly challenge was to travel around the entire world to receive the divine fruit of supreme wisdom.'
      },
      {
        id: 3,
        question: 'What quality does Ganesha\'s solution emphasize in the traditional story?',
        options: [
          { id: 'a', text: 'Relying purely on mechanical speed', isCorrect: false },
          { id: 'b', text: 'Wisdom, perspective, and heartfelt devotion to his parents', isCorrect: true },
          { id: 'c', text: 'Avoiding challenges through deception', isCorrect: false },
          { id: 'd', text: 'Asking someone else to take his place', isCorrect: false }
        ],
        correctExplanation: 'By circumambulating his parents, Ganesha demonstrated that wisdom and reverence can see that devoted parents encompass the entire universe.'
      }
    ]
  },
  {
    levelId: 4,
    levelTitle: 'Why Do We Celebrate Ganesh Chaturthi?',
    questions: [
      {
        id: 1,
        question: 'What does the festival of Ganesh Chaturthi traditionally commemorate?',
        options: [
          { id: 'a', text: 'The birth and arrival of Lord Ganesha', isCorrect: true },
          { id: 'b', text: 'The end of the monsoon harvest only', isCorrect: false },
          { id: 'c', text: 'A historical military treaty', isCorrect: false },
          { id: 'd', text: 'The founding of a river trade port', isCorrect: false }
        ],
        correctExplanation: 'Ganesh Chaturthi is a sacred Hindu festival commemorating the birth and joyous arrival of Lord Ganesha.'
      },
      {
        id: 2,
        question: 'When is Ganesh Chaturthi traditionally observed in the Hindu calendar?',
        options: [
          { id: 'a', text: 'On the Chaturthi (fourth lunar day) of the bright fortnight of Bhadrapada', isCorrect: true },
          { id: 'b', text: 'On the full moon night of Chaitra in spring', isCorrect: false },
          { id: 'c', text: 'On the dark new moon of Kartika during Diwali', isCorrect: false },
          { id: 'd', text: 'On the winter solstice in mid-December', isCorrect: false }
        ],
        correctExplanation: 'Ganesh Chaturthi is observed on the Chaturthi of the bright fortnight (Shukla Paksha) of the lunar month of Bhadrapada (August-September).'
      },
      {
        id: 3,
        question: 'Which activities commonly form an authentic part of Ganesh Chaturthi celebrations?',
        options: [
          { id: 'a', text: 'Only commercial shopping without rituals', isCorrect: false },
          { id: 'b', text: 'Idol installation, puja, aartis, modak offerings, and community gatherings', isCorrect: true },
          { id: 'c', text: 'Complete silence with no prayer or song', isCorrect: false },
          { id: 'd', text: 'Solitary fasting without family or friends', isCorrect: false }
        ],
        correctExplanation: 'Celebrations involve installing the idol, offering prayers and modaks, singing aartis, and bringing community together in cultural harmony.'
      }
    ]
  },
  {
    levelId: 5,
    levelTitle: 'From Tradition to Ganeshotsav',
    questions: [
      {
        id: 1,
        question: 'What is the historical truth regarding the origins of Ganesh Chaturthi and Lokmanya Tilak?',
        options: [
          { id: 'a', text: 'Tilak invented the worship of Ganesha from scratch in 1893', isCorrect: false },
          { id: 'b', text: 'The festival has older roots, while Tilak helped expand its public community form in the 1890s', isCorrect: true },
          { id: 'c', text: 'The festival was created as a sports tournament in 1947', isCorrect: false },
          { id: 'd', text: 'Ganesh worship only began in the 20th century', isCorrect: false }
        ],
        correctExplanation: 'Ganesh worship and Ganesh Chaturthi have ancient historical roots. Lokmanya Tilak did not invent the festival, but helped popularize its public community form (Sarvajanik Ganeshotsav) in the 1890s.'
      },
      {
        id: 2,
        question: 'Why was the public Ganeshotsav expanded during the 1890s by Lokmanya Tilak?',
        options: [
          { id: 'a', text: 'To foster social unity, public discourse, cultural activities, and community worship', isCorrect: true },
          { id: 'b', text: 'To prevent people from gathering together', isCorrect: false },
          { id: 'c', text: 'To restrict the festival exclusively to private palaces', isCorrect: false },
          { id: 'd', text: 'To commercialize religious items for profit', isCorrect: false }
        ],
        correctExplanation: 'The public community festival created an open space for citizens to unite across backgrounds, enjoy classical arts, participate in public discussions, and build social solidarity.'
      },
      {
        id: 3,
        question: 'What is the spiritual and environmental meaning of Visarjan in responsible celebrations?',
        options: [
          { id: 'a', text: 'Carelessly throwing materials into natural rivers', isCorrect: false },
          { id: 'b', text: 'A ceremonial immersion symbolizing form returning to formlessness, best done using eco-friendly idols', isCorrect: true },
          { id: 'c', text: 'A contest to see whose idol sinks the quickest', isCorrect: false },
          { id: 'd', text: 'An end to all devotion and prayer', isCorrect: false }
        ],
        correctExplanation: 'Visarjan is a reverent farewell reminding us that the divine is eternal and formless. Modern eco-friendly clay idols and home-tub immersions ensure we honor tradition while protecting rivers and marine life.'
      }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementData[] = [
  {
    id: 'first_step',
    title: 'Arrival of Ganesha',
    description: 'Complete Chapter 1: The Sacred Duty at Mount Kailash',
    icon: '🌸',
    unlocked: false,
    category: 'story'
  },
  {
    id: 'loyal_guardian',
    title: 'The Loyal Sentinel',
    description: 'Make all correct guardian choices in Chapter 2',
    icon: '🛡️',
    unlocked: false,
    category: 'story'
  },
  {
    id: 'wisdom_seeker',
    title: 'Wisdom Seeker',
    description: 'Master the cosmic wisdom journey in Chapter 3',
    icon: '🧠',
    unlocked: false,
    category: 'culture'
  },
  {
    id: 'festival_pandal',
    title: 'Master Pandal Builder',
    description: 'Design a complete festive pandal in Chapter 4',
    icon: '🪔',
    unlocked: false,
    category: 'culture'
  },
  {
    id: 'eco_warrior',
    title: 'Prakriti Protector',
    description: 'Balance budget, community and eco-harmony in Chapter 5',
    icon: '🌱',
    unlocked: false,
    category: 'culture'
  },
  {
    id: 'perfect_quiz',
    title: 'Flawless Scholar',
    description: 'Achieve 100% accuracy in chapter quizzes',
    icon: '✨',
    unlocked: false,
    category: 'score'
  },
  {
    id: 'fast_learner',
    title: 'Swift as the Mooshak',
    description: 'Complete gameplay with speed efficiency',
    icon: '⚡',
    unlocked: false,
    category: 'speed'
  },
  {
    id: 'perfect_journey',
    title: 'Ganesha Wisdom Master',
    description: 'Score above 5,000 points across the complete journey',
    icon: '⭐',
    unlocked: false,
    category: 'score'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    player_name: 'Aarav Sharma',
    score: 5850,
    achievement_title: '🌟 Ganesha Wisdom Master',
    completed_at: '2026-09-12',
    certificate_id: 'GJ-2026-881924'
  },
  {
    rank: 2,
    player_name: 'Pranav Shahaji Chavan',
    score: 5650,
    achievement_title: '🌟 Ganesha Wisdom Master',
    completed_at: '2026-09-14',
    certificate_id: 'GJ-2026-928471'
  },
  {
    rank: 3,
    player_name: 'Riya Kulkarni',
    score: 5400,
    achievement_title: '🌟 Ganesha Wisdom Master',
    completed_at: '2026-09-13',
    certificate_id: 'GJ-2026-773129'
  },
  {
    rank: 4,
    player_name: 'Ananya Deshmukh',
    score: 5100,
    achievement_title: '🐘 Wisdom Seeker',
    completed_at: '2026-09-11',
    certificate_id: 'GJ-2026-641029'
  },
  {
    rank: 5,
    player_name: 'Aditya Patil',
    score: 4850,
    achievement_title: '🐘 Wisdom Seeker',
    completed_at: '2026-09-10',
    certificate_id: 'GJ-2026-519283'
  },
  {
    rank: 6,
    player_name: 'Tanvi Joshi',
    score: 4600,
    achievement_title: '🐘 Wisdom Seeker',
    completed_at: '2026-09-09',
    certificate_id: 'GJ-2026-442819'
  },
  {
    rank: 7,
    player_name: 'Ishaan Verma',
    score: 4350,
    achievement_title: '🪔 Festival Explorer',
    completed_at: '2026-09-08',
    certificate_id: 'GJ-2026-382910'
  },
  {
    rank: 8,
    player_name: 'Meera Iyer',
    score: 4100,
    achievement_title: '🪔 Festival Explorer',
    completed_at: '2026-09-07',
    certificate_id: 'GJ-2026-291039'
  }
];

export function getRankTier(score: number): { title: string; emoji: string; color: string; desc: string } {
  if (score >= 5200) {
    return {
      title: 'Ganesha Wisdom Master',
      emoji: '🌟',
      color: 'text-amber-400',
      desc: 'Flawless mastery of traditional lore, values, and cultural wisdom!'
    };
  } else if (score >= 4500) {
    return {
      title: 'Wisdom Seeker',
      emoji: '🐘',
      color: 'text-orange-400',
      desc: 'Profound understanding of Ganesha’s stories and teachings.'
    };
  } else if (score >= 3500) {
    return {
      title: 'Festival Explorer',
      emoji: '🪔',
      color: 'text-yellow-400',
      desc: 'Wonderful exploration of festival traditions and devotion.'
    };
  } else {
    return {
      title: 'Journey Beginner',
      emoji: '🌱',
      color: 'text-emerald-400',
      desc: 'An inspiring first step on the sacred path of learning and wisdom.'
    };
  }
}
