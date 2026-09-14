export interface StoryCharacter {
  name: string;
  role: string;
  symbol: string;
  description: string;
}

export interface StoryTimelineEvent {
  step: string;
  title: string;
  detail: string;
  icon: string;
}

export interface AiStoryLessonData {
  levelId: number;
  levelTitle: string;
  chapterBadge: string;
  subtitle: string;
  hookQuestion: string;
  
  // 1. The Story
  storySummary: string;
  storyNarrative: string[];

  // 2. What Happened?
  timeline: StoryTimelineEvent[];

  // 3. Who Are the Characters?
  characters: StoryCharacter[];

  // 4. Meaning & Symbolism
  symbolism: {
    symbol: string;
    meaning: string;
    explanation: string;
  }[];

  // 5. Cultural / Historical Context
  culturalContext: {
    traditionVsHistory: string;
    regionalVariationsNote: string;
    details: string;
  };

  // 6. Did You Know?
  didYouKnow: string[];

  // 7. Why This Matters
  whyThisMatters: {
    keyMessage: string;
    modernApplication: string;
  };

  // AI Interaction: Suggested Questions & Verified Grounded Answers
  suggestedQuestions: {
    question: string;
    answer: string;
  }[];

  // Fallback / Knowledge keywords for grounding custom questions
  topicKeywords: string[];
}

export const AI_STORY_LESSONS: Record<number, AiStoryLessonData> = {
  1: {
    levelId: 1,
    levelTitle: 'The Arrival of Ganesha',
    chapterBadge: 'Chapter 1',
    subtitle: 'Devotion, Responsibility & Sacred Auspiciousness',
    hookQuestion: 'Want to know the sacred story of Ganesha’s creation at Mount Kailash?',
    storySummary: 'In traditional narratives, Goddess Parvati crafts young Ganesha from turmeric and sandalwood paste, breathing life into him with divine grace and appointing him guardian of her sanctum.',
    storyNarrative: [
      'According to widely cherished Hindu puranic traditions, Goddess Parvati resided in the serene celestial realm of Mount Kailash. Wishing to prepare for her sacred cleansing undisturbed, she fashioned a youthful boy from natural turmeric and sandalwood paste.',
      'Imparting life and divine consciousness into the form, she embraced him as her beloved son and entrusted him with a sacred duty: "Stay steadfast at this threshold, my child, and permit no one to enter until my rites are complete."',
      'Young Ganesha took up his post with innocent devotion and absolute integrity, treating his mother’s instruction as a sacred vow (dharma). This moment establishes Ganesha as the embodiment of filial devotion, responsibility, and the auspicious commencement of every noble task.'
    ],
    timeline: [
      {
        step: '1',
        title: 'Consecration from Clay & Herbs',
        detail: 'Goddess Parvati prepares natural turmeric and sandalwood unguents on Mount Kailash.',
        icon: '🌿'
      },
      {
        step: '2',
        title: 'The Breath of Life',
        detail: 'Parvati infuses divine spirit and consciousness into the form, creating her devoted son.',
        icon: '✨'
      },
      {
        step: '3',
        title: 'The Solemn Instruction',
        detail: 'Parvati places Ganesha at the entrance of her sanctuary, asking him to guard it faithfully.',
        icon: '🚪'
      },
      {
        step: '4',
        title: 'Steadfast Vigil Begins',
        detail: 'Ganesha guards the doorway with pure devotion, exemplifying steadfast responsibility.',
        icon: '🛡️'
      }
    ],
    characters: [
      {
        name: 'Young Ganesha',
        role: 'The Devoted Son & Guardian',
        symbol: '🌸',
        description: 'Created with pure natural elements, he exemplifies unwavering loyalty, filial love, and steadfast devotion to his duty.'
      },
      {
        name: 'Goddess Parvati',
        role: 'The Divine Mother (Shakti)',
        symbol: '🌺',
        description: 'Consort of Shiva and embodiment of primal creative energy (Prakriti), motherly care, and protective grace.'
      },
      {
        name: 'Mount Kailash',
        role: 'The Sacred Mountain Sanctuary',
        symbol: '🏔️',
        description: 'The snow-capped celestial abode symbolizing transcendent purity, spiritual meditation, and cosmic calm.'
      }
    ],
    symbolism: [
      {
        symbol: 'Clay, Turmeric & Sandalwood',
        meaning: 'Purity from the Earth',
        explanation: 'Created from natural herbs and earth, reminding us that life emerges from nature and remains intrinsically bound to organic purity.'
      },
      {
        symbol: 'The Doorway (Threshold)',
        meaning: 'Guardianship of the Mind',
        explanation: 'Standing at the doorway symbolizes guarding our senses against negative distractions and uninvited impulses.'
      },
      {
        symbol: 'Vighnaharta (Obstacle Remover)',
        meaning: 'Auspicious Beginnings',
        explanation: 'Invoked before starting any study, journey, or ceremony to clear impediments with clarity and sincere intent.'
      }
    ],
    culturalContext: {
      traditionVsHistory: 'This narrative is a revered sacred tradition passed down through puranic storytelling, oral transmission, and family celebrations across millennia.',
      regionalVariationsNote: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version.',
      details: 'Across various regional traditions, the exact herbs and details of Ganesha’s creation carry distinct regional poetry, but all emphasize the bond between Mother Parvati and her son, and the value of honoring commitments with pure intention.'
    },
    didYouKnow: [
      'Ganesha is addressed by 108 auspicious names, including "Vinayaka" (supreme guide) and "Vighnaharta" (remover of obstacles).',
      'The red hibiscus flower and 21 blades of sacred Durva grass are traditionally offered to Ganesha as symbols of passion transformed into pure devotion and cooling humility.',
      'In traditional Indian arts and classical dance, the invocation of Ganesha is always the opening item to sanctify the stage.'
    ],
    whyThisMatters: {
      keyMessage: 'True character is demonstrated by taking responsibility seriously and keeping our word.',
      modernApplication: 'When we accept a task or give our word to our parents, teachers, or community, upholding that promise with patience and honesty builds lifelong integrity.'
    },
    suggestedQuestions: [
      {
        question: 'Why did Goddess Parvati create Ganesha?',
        answer: 'In widely told traditional narratives, Goddess Parvati created Ganesha from natural turmeric and sandalwood paste to guard the entrance of her sanctuary while she performed sacred cleansing rites, trusting him with this important duty.'
      },
      {
        question: 'Why did Ganesha guard the entrance so strictly?',
        answer: 'Ganesha loved and respected his mother deeply. He took her instruction as a sacred duty (dharma), remaining steadfast at his post despite any pressure or distraction.'
      },
      {
        question: 'What does this story teach us about duty and responsibility?',
        answer: 'The story teaches that fulfilling our commitments requires dedication, sincere loyalty, and clarity of purpose. When we accept a responsibility, we should carry it out faithfully.'
      },
      {
        question: 'Are there other versions of how Ganesha arrived?',
        answer: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version found in puranic traditions, while other regional narratives celebrate his origin through diverse poetic allegories.'
      }
    ],
    topicKeywords: ['parvati', 'kailash', 'creation', 'duty', 'guard', 'door', 'entrance', 'turmeric', 'sandalwood', 'promise', 'vighnaharta', 'auspicious', 'beginning']
  },

  2: {
    levelId: 2,
    levelTitle: 'The Guardian',
    chapterBadge: 'Chapter 2',
    subtitle: 'Steadfast Duty & The Sacred Elephant Form',
    hookQuestion: 'Want to know why Ganesha stands with the sacred elephant head?',
    storySummary: 'Ganesha loyally guards the threshold against all visitors, even when Lord Shiva returns. Recognizing the boy’s unyielding integrity, Lord Shiva bestows upon him the sacred elephant head, symbolizing vast wisdom, active listening, and calm power.',
    storyNarrative: [
      'As Ganesha stood vigilant at the threshold of Mount Kailash, various celestial messengers and companions of Shiva, including the loyal Nandi and the ganas, sought admittance. Ganesha politely but firmly requested them to wait until Parvati concluded her prayers.',
      'When Lord Shiva himself returned to Mount Kailash, young Ganesha did not recognize his divine father, knowing only the solemn instruction bestowed by his mother. Shiva was astonished by the boy’s refusal to yield, leading to a profound divine encounter.',
      'Upon Parvati’s revelation of Ganesha’s true identity, Lord Shiva admired the boy’s fearless resolve and absolute fidelity. Through a radiant divine transformation, Ganesha was blessed with the head of a noble elephant, bestowing upon him the status of Ganapati — lord of all celestial ganas, endowed with supreme wisdom, intellect, and gentle strength.'
    ],
    timeline: [
      {
        step: '1',
        title: 'Approaching Visitors',
        detail: 'Celestial messengers and Nandi attempt to enter, but Ganesha politely requests them to await Parvati.',
        icon: '🐂'
      },
      {
        step: '2',
        title: 'The Great Meeting',
        detail: 'Lord Shiva arrives at Kailash. Ganesha, unaware of Shiva’s identity, stands firm on his mother’s word.',
        icon: '🔱'
      },
      {
        step: '3',
        title: 'The Divine Realization',
        detail: 'Goddess Parvati explains the sacred bond, revealing Ganesha’s steadfast devotion to duty.',
        icon: '🌺'
      },
      {
        step: '4',
        title: 'The Sacred Blessing',
        detail: 'Shiva blesses Ganesha with the elephant head, consecrating him as Ganapati, leader of wisdom and peace.',
        icon: '🐘'
      }
    ],
    characters: [
      {
        name: 'Ganesha (The Guardian)',
        role: 'The Steadfast Protector',
        symbol: '🐘',
        description: 'Exemplifies moral courage: standing firm on principles of duty even in the face of immense, towering opposition.'
      },
      {
        name: 'Lord Shiva',
        role: 'The Great Ascetic & Cosmic Lord (Mahadeva)',
        symbol: '🔱',
        description: 'Lord of Mount Kailash who recognizes and honors authentic devotion, bestowing leadership of the ganas onto Ganesha.'
      },
      {
        name: 'Nandi & The Ganas',
        role: 'The Celestial Attendants',
        symbol: '🐂',
        description: 'Shiva’s loyal retinue who witness Ganesha’s fearless devotion and subsequently accept him as their beloved leader (Ganapati).'
      }
    ],
    symbolism: [
      {
        symbol: 'Large Elephant Ears',
        meaning: 'Deep & Attentive Listening',
        explanation: 'Signifies the wisdom of listening more than speaking, absorbing good counsel and hearing the quiet prayers of all.'
      },
      {
        symbol: 'Vast Elephant Forehead (Mastaka)',
        meaning: 'Expansive Intellect & Discernment',
        explanation: 'Represents broad-minded thinking, deep philosophical contemplation, and mental capacity to see beyond surface illusions.'
      },
      {
        symbol: 'Flexible Elephant Trunk',
        meaning: 'Adaptability & Discrimination (Viveka)',
        explanation: 'The trunk can uproot a giant tree or delicately pluck a single blade of grass, symbolizing power guided by fine discrimination.'
      },
      {
        symbol: 'Single Broken Tusk (Ekadanta)',
        meaning: 'Sacrifice for Knowledge',
        explanation: 'In tradition, Ganesha broke his own tusk to use as a stylus to scribe the great epic Mahabharata without pause.'
      }
    ],
    culturalContext: {
      traditionVsHistory: 'This pivotal story of the elephant head is deeply celebrated in Hindu puranas (such as the Shiva Purana and Ganesha Purana) as an allegory of spiritual rebirth and the transition from ego to wisdom.',
      regionalVariationsNote: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version.',
      details: 'Traditional storytellers and modern scholars agree that the elephant symbolizes peaceful majesty in ancient Indian ecology. Elephants represent gentle vegetarian power, memory, social solidarity, and reverence for wilderness.'
    },
    didYouKnow: [
      'The word "Ganapati" is formed from "Gana" (assemblage/multitude) and "Pati" (master/guardian), meaning ruler of all cosmic categories.',
      'Ganesha is commonly depicted with four arms, holding an axe (to sever attachments), a noose (to steer the mind toward dharma), a sweet modak (spiritual bliss), and showing the Abhaya mudra (fearlessness).',
      'The small mouse (Mooshika) serving as Ganesha’s vehicle (vahana) represents mastering restless desires and navigating narrow, hidden obstacles.'
    ],
    whyThisMatters: {
      keyMessage: 'True strength is calm, thoughtful, and protective rather than aggressive or loud.',
      modernApplication: 'Standing up for what is right with quiet composure, listening carefully before acting, and prioritizing wisdom over ego are values that serve us in our daily lives.'
    },
    suggestedQuestions: [
      {
        question: 'Why did Ganesha not let Lord Shiva enter?',
        answer: 'Ganesha was faithfully following his mother Goddess Parvati’s explicit instruction not to let anyone enter. Not recognizing Shiva at first, he prioritized keeping his mother’s trust.'
      },
      {
        question: 'What does the sacred elephant head symbolize?',
        answer: 'The elephant head symbolizes deep wisdom, vast intellect, attentive listening (large ears), adaptability and discernment (the trunk), and gentle strength guided by calm judgment.'
      },
      {
        question: 'Why is Ganesha called "Ganapati"?',
        answer: 'Lord Shiva named him Ganapati because "Gana" means the celestial hosts or people, and "Pati" means guardian or leader. Ganesha became the beloved protector and leader of all.'
      },
      {
        question: 'Why do different sources describe this encounter differently?',
        answer: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version focusing on the divine transformation, wisdom, and reconciliation between Shiva and Ganesha.'
      }
    ],
    topicKeywords: ['shiva', 'elephant', 'ears', 'trunk', 'tusk', 'ekadanta', 'ganapati', 'nandi', 'ganas', 'listening', 'wisdom', 'transformation', 'mooshika']
  },

  3: {
    levelId: 3,
    levelTitle: 'The Wisdom Challenge',
    chapterBadge: 'Chapter 3',
    subtitle: 'Kartikeya\'s Journey & The Cosmic Pradakshina',
    hookQuestion: 'Want to discover why circling one’s parents won the divine race of wisdom?',
    storySummary: 'When challenged to circle the entire cosmos first to win the divine Fruit of Wisdom (Jnana Pazham), Kartikeya set off swiftly on his peacock, while Ganesha reverently circumambulated his parents, demonstrating that true wisdom lies in deep perception rather than mere physical speed.',
    storyNarrative: [
      'One day in Mount Kailash, the divine sage Narada visited Lord Shiva and Goddess Parvati, presenting a rare celestial fruit known as the Jnana Pazham — the Fruit of Divine Knowledge and Wisdom. As it could not be sliced, a contest was proposed for the two young brothers, Kartikeya (Murugan) and Ganesha.',
      'The rule of the challenge was simple yet momentous: whoever circles the entire universe first and returns to Mount Kailash shall receive the sacred fruit of wisdom.',
      'Kartikeya, radiant and spirited, mounted his swift peacock and soared immediately across oceans, mountain ranges, celestial stars, and galaxies. Ganesha, riding his humble mouse, paused and contemplated deeply with mature insight.',
      'Stepping forward calmly, Ganesha bowed and asked Shiva and Parvati to sit side by side. He reverently walked around them three times in sacred circumambulation (Pradakshina). When asked, he explained: "For a devoted soul, one’s parents and spiritual origins encompass the entire universe." The celestial assembly rejoiced at his profound wisdom, and the Fruit of Knowledge was awarded to him.'
    ],
    timeline: [
      {
        step: '1',
        title: 'The Gift of Sage Narada',
        detail: 'Narada arrives with the sacred Fruit of Wisdom, sparking a friendly contest of knowledge.',
        icon: '🥭'
      },
      {
        step: '2',
        title: 'Kartikeya’s Swift Flight',
        detail: 'Kartikeya mounts his peacock and speeds across the physical cosmos and distant horizons.',
        icon: '🦚'
      },
      {
        step: '3',
        title: 'Ganesha’s Reflection',
        detail: 'Ganesha pauses to consider the deeper spiritual meaning of the universe.',
        icon: '💡'
      },
      {
        step: '4',
        title: 'The Cosmic Pradakshina',
        detail: 'Ganesha circumambulates his parents three times, demonstrating that parents embody the entire cosmos.',
        icon: '❤️'
      }
    ],
    characters: [
      {
        name: 'Ganesha',
        role: 'The Contemplative Seeker of Wisdom',
        symbol: '🐘',
        description: 'Demonstrates that deep understanding, introspection, and perspective are far more powerful than physical hurry.'
      },
      {
        name: 'Lord Kartikeya (Murugan)',
        role: 'The Swift Celestial Commander',
        symbol: '🦚',
        description: 'Ganesha’s beloved brother, famed for his valor, youth, dynamic energy, and cosmic peacock mount.'
      },
      {
        name: 'Sage Narada',
        role: 'The Celestial Messenger & Philosopher',
        symbol: '🪕',
        description: 'A divine sage whose curious questions and tests spark profound moral revelations across the heavens.'
      },
      {
        name: 'Shiva & Parvati',
        role: 'The Cosmic Foundation & Loving Parents',
        symbol: '🔱',
        description: 'Representing the cosmic interplay of consciousness (Purusha) and nature (Prakriti), the origin of all worlds.'
      }
    ],
    symbolism: [
      {
        symbol: 'The Fruit of Wisdom (Jnana Pazham)',
        meaning: 'Indivisible Knowledge',
        explanation: 'Wisdom cannot be cut into pieces or hoarded; it is an integrated understanding of truth, love, and reality.'
      },
      {
        symbol: 'Pradakshina (Circumambulation)',
        meaning: 'Centering on the Divine Core',
        explanation: 'Walking around a sacred center reminds us to keep love, gratitude, and moral roots at the focal point of our lives.'
      },
      {
        symbol: 'The Peacock vs. The Mouse',
        meaning: 'Speed vs. Depth',
        explanation: 'Physical velocity and splendor can cover vast distances, but quiet contemplation and insight reveal inner truth.'
      }
    ],
    culturalContext: {
      traditionVsHistory: 'This beloved tale is told in families, schools, and classical arts across India, particularly celebrated in Tamil Nadu (connected to Lord Murugan temples such as Palani) and Maharashtra.',
      regionalVariationsNote: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version.',
      details: 'In South Indian traditions, the story is tied closely to the emergence of the holy hill shrine of Palani ("Pazham-nee" meaning "You are the fruit of wisdom"), honoring Kartikeya’s spiritual journey.'
    },
    didYouKnow: [
      'The sacred ritual of Pradakshina is always performed in a clockwise direction in Hindu traditions, symbolizing keeping the sacred on one’s right side (dakshina).',
      'In traditional Hindu philosophy, the parents are revered alongside the teacher and the divine: "Matru Devo Bhava, Pitru Devo Bhava, Acharya Devo Bhava".',
      'The word "Jnana" translates directly from Sanskrit as transcendental knowledge, distinct from simple information (Vijnana).'
    ],
    whyThisMatters: {
      keyMessage: 'Wisdom is not about moving fastest; it is about looking deepest.',
      modernApplication: 'In our fast-paced modern world of screens and hurry, stopping to appreciate our families, our roots, and our elders reveals the true essence of life.'
    },
    suggestedQuestions: [
      {
        question: 'Why did Ganesha circle his parents instead of the earth?',
        answer: 'Ganesha recognized that for a child, loving parents represent the source of existence, shelter, and guidance. To him, Shiva and Parvati embodied the entire universe, proving that wisdom sees deeper than mere physical distance.'
      },
      {
        question: 'What does Kartikeya’s journey teach us?',
        answer: 'Kartikeya’s journey represents enthusiasm, adventurous pursuit, diligence, and dynamic effort. Both brothers represent complementary noble qualities: one action and physical mastery, the other introspection and philosophical depth.'
      },
      {
        question: 'What is the Fruit of Wisdom (Jnana Pazham)?',
        answer: 'Jnana Pazham translates to "The Fruit of Knowledge." It represents divine wisdom that cannot be bought or divided, gained only through sincere devotion and genuine understanding.'
      },
      {
        question: 'Why do temples in South India feature this story so prominently?',
        answer: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version. In Tamil tradition, this story is tied to Lord Murugan’s shrine at Palani, where he is revered for his spiritual realization.'
      }
    ],
    topicKeywords: ['kartikeya', 'murugan', 'peacock', 'narada', 'pradakshina', 'parents', 'shiva', 'parvati', 'race', 'jnana', 'pazham', 'fruit', 'speed', 'wisdom']
  },

  4: {
    levelId: 4,
    levelTitle: 'Why Do We Celebrate Ganesh Chaturthi?',
    chapterBadge: 'Chapter 4',
    subtitle: 'Birth, Devotion & Building the Festival',
    hookQuestion: 'Want to know how families and communities celebrate the arrival of the Divine Guest?',
    storySummary: 'Ganesh Chaturthi celebrates the appearance day of Lord Ganesha, marked by sacred clay idols, festive sweets like modaks, communal aartis, and the joyful welcoming of the divine guest into every household and neighborhood.',
    storyNarrative: [
      'Ganesh Chaturthi, also known as Vinayaka Chaturthi, falls on the fourth day (Chaturthi) of the waxing moon fortnight in the Hindu lunar month of Bhadrapada (typically August or September). It honors the birth and cosmic arrival of Ganesha.',
      'The celebration begins with "Prana Pratishtha", a reverent ritual where the divine presence is invoked into a beautifully sculpted clay idol. Ganesha is welcomed not merely as a remote deity, but as a cherished guest, family member, and teacher.',
      'For periods ranging from 1.5, 3, 5, 7, to 11 days, households and communities offer sacred Durva grass, fragrant hibiscus flowers, and freshly steamed Ukadiche Modaks. Morning and evening, families join together in song, singing the timeless Aarti "Sukhakarta Dukhaharta" written by the 17th-century saint Samarth Ramdas.'
    ],
    timeline: [
      {
        step: '1',
        title: 'Prana Pratishtha',
        detail: 'Invoking the divine presence into clay idols with sacred mantras and sandalwood.',
        icon: '🏺'
      },
      {
        step: '2',
        title: 'Shodashopachara Puja',
        detail: '16 traditional stages of worship, offering water, flowers, incense, lamps, and modaks.',
        icon: '🪔'
      },
      {
        step: '3',
        title: 'Communal Aarti & Prasad',
        detail: 'Gathering neighbors, friends, and travelers to sing hymns and share sweet prasad.',
        icon: '🎵'
      },
      {
        step: '4',
        title: 'Cultural Fellowship',
        detail: 'Hosting music, drama, discussions, and open hospitality across homes and community pandals.',
        icon: '👥'
      }
    ],
    characters: [
      {
        name: 'The Welcoming Household',
        role: 'Hosts of the Divine Guest',
        symbol: '🏡',
        description: 'Families clean and decorate their homes, crafting paper or floral mandaps to receive Ganesha with joy.'
      },
      {
        name: 'Artisans (Murtikars)',
        role: 'Keepers of Clay Sculpting',
        symbol: '🎨',
        description: 'Generations of sculptors who shape natural river clay (Shadu Mati) into expressive idols of Ganesha.'
      },
      {
        name: 'Saint Samarth Ramdas',
        role: 'Author of the Beloved Aarti',
        symbol: '📜',
        description: '17th-century saint-poet of Maharashtra who composed "Sukhakarta Dukhaharta", sung in millions of households.'
      }
    ],
    symbolism: [
      {
        symbol: 'Steamed Modak',
        meaning: 'The Sweet Bliss of Knowledge (Ananda)',
        explanation: 'A modak resembles a folded lotus budget; on the outside it is simple rice flour, but inside lies the sweet golden nectar of jaggery and coconut, symbolizing the hidden bliss of inner wisdom.'
      },
      {
        symbol: '21 Blades of Durva Grass',
        meaning: 'Humility, Simplicity & Cooling Healing',
        explanation: 'Durva is an ordinary grass that grows anywhere, showing that divine love values humble sincerity over ostentatious wealth.'
      },
      {
        symbol: 'The Kalash (Sacred Pot)',
        meaning: 'Abundance & The Womb of Creation',
        explanation: 'Filled with water, mango leaves, and a coconut, symbolizing auspicious life energy and gratitude to nature.'
      }
    ],
    culturalContext: {
      traditionVsHistory: 'Ganesh worship within homes has ancient spiritual roots mentioned in early medieval texts, while community celebrations have enriched public cultural heritage for centuries.',
      regionalVariationsNote: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version.',
      details: 'In Maharashtra, Karnataka, Andhra Pradesh, Telangana, Tamil Nadu, and Goa, unique local foods accompany the festival — from modaks and puran poli to kozhukattai and undrallu.'
    },
    didYouKnow: [
      'Ukadiche Modak is traditionally prepared by steaming dough made from newly harvested rice flour, filled with fresh grated coconut and jaggery.',
      'The number 21 is sacred in Ganesh puja: 21 durva blades, 21 modaks, and 21 names of Ganesha are recited during traditional pujas.',
      'Traditional Ganesh puja avoids plastic and chemical synthetic perfumes, emphasizing natural earthen clay, fresh leaves, turmeric, and cotton wicks.'
    ],
    whyThisMatters: {
      keyMessage: 'Festivals strengthen human bonds through hospitality, humility, and shared rejoicing.',
      modernApplication: 'Welcoming guests with warm hearts, sharing delicious homemade meals, and honoring our traditions brings warmth, togetherness, and harmony to our neighborhoods.'
    },
    suggestedQuestions: [
      {
        question: 'Why do people celebrate Ganesh Chaturthi?',
        answer: 'Ganesh Chaturthi commemorates the appearance day of Lord Ganesha. It is celebrated to invoke his blessings for wisdom, good fortune, peace, and the removal of obstacles for families and communities.'
      },
      {
        question: 'Why are modaks Ganesha’s favorite sweet?',
        answer: 'The modak is called the sweet fruit of knowledge. Its simple outer shell protects a sweet, rich inner filling of coconut and jaggery, symbolizing the inner bliss (Ananda) of spiritual knowledge.'
      },
      {
        question: 'What is the significance of offering 21 blades of Durva grass?',
        answer: 'Durva grass symbolizes humility and healing. Despite being a common, unpretentious plant, it is Ganesha’s most beloved offering, teaching us that sincere devotion is far greater than expensive material gifts.'
      },
      {
        question: 'What is Prana Pratishtha?',
        answer: 'Prana Pratishtha is the opening ritual in which the clay idol is consecrated through sacred mantras, symbolically inviting divine consciousness and welcoming Ganesha as an honored guest.'
      }
    ],
    topicKeywords: ['modak', 'durva', 'aarti', 'prana pratishtha', 'puja', 'bhadrapada', 'chaturthi', 'kalash', 'sukhakarta', 'guest', 'shadu', 'tradition']
  },

  5: {
    levelId: 5,
    levelTitle: 'From Tradition to Ganeshotsav',
    chapterBadge: 'Chapter 5',
    subtitle: 'Ancient Roots, Public Unity & Responsible Farewell',
    hookQuestion: 'Want to discover how a domestic festival transformed into a massive public movement of unity?',
    storySummary: 'While Ganesh worship has ancient puranic roots, in the 1890s national leader Lokmanya Bal Gangadhar Tilak transformed the private home worship into a public community festival (Sarvajanik Ganeshotsav) to unite people across barriers, inspiring modern eco-conscious celebrations.',
    storyNarrative: [
      'For centuries, Ganesh Chaturthi was primarily celebrated as an intimate family observance in private households across western and central India. During the 18th century, the Maratha Peshwa rulers encouraged public devotion in their capital of Pune.',
      'In 1893, under colonial British rule, anti-assembly laws restricted public gatherings of citizens. Freedom fighter and social reformer Lokmanya Bal Gangadhar Tilak recognized that Ganesha was universally beloved across all castes, communities, and backgrounds.',
      'Tilak championed the public festival: Sarvajanik Ganeshotsav. Grand community pandals were erected in city squares, transforming religious celebration into a vibrant platform for public discussions, patriotic songs, traditional theatre, healthcare drives, and social cohesion.',
      'Today, modern Ganeshotsav balances this rich cultural legacy with environmental stewardship: embracing traditional clay (Shadu Mati) idols infused with seeds, using natural cloth decor, controlling noise levels, and conducting Visarjan in artificial community water tanks.'
    ],
    timeline: [
      {
        step: '1',
        title: 'Ancient & Peshwa Roots',
        detail: 'Family domestic worship observed for generations; 18th-century Peshwas promote festivities in Pune.',
        icon: '📜'
      },
      {
        step: '2',
        title: '1893: Tilak’s Public Vision',
        detail: 'Lokmanya Tilak encourages community pandals to build unity and bypass colonial restrictions.',
        icon: '🚩'
      },
      {
        step: '3',
        title: 'Platform for Arts & Reform',
        detail: 'Pandals host classical music, Dhol-Tasha folk ensembles, educational lectures, and charity.',
        icon: '🥁'
      },
      {
        step: '4',
        title: 'The Eco-Friendly Era',
        detail: 'Contemporary movement toward non-toxic clay, seed-impregnated idols, and river conservation.',
        icon: '🌱'
      }
    ],
    characters: [
      {
        name: 'Lokmanya Bal Gangadhar Tilak',
        role: 'Freedom Fighter & Social Visionary',
        symbol: '🚩',
        description: 'Revered national leader who utilized cultural festivals to foster communal solidarity and social pride during India’s independence movement.'
      },
      {
        name: 'The Sarvajanik Mandal Volunteers',
        role: 'Community Organizers',
        symbol: '🤝',
        description: 'Neighborhood youth committees who coordinate crowd safety, free meals (Annadanam), blood donations, and cultural programs.'
      },
      {
        name: 'Eco-Craftsmen & Environmentalists',
        role: 'Custodians of Nature',
        symbol: '🌱',
        description: 'Pioneers restoring natural Shadu clay and organizing artificial water immersion tanks to protect lakes and marine life.'
      }
    ],
    symbolism: [
      {
        symbol: 'Sarvajanik (For All the People)',
        meaning: 'Overcoming Social Barriers',
        explanation: 'Shows that faith and culture belong equally to everyone, uniting people of all occupations, ages, and backgrounds in a shared space.'
      },
      {
        symbol: 'Visarjan (Immersion)',
        meaning: 'Form Returning to Formlessness',
        explanation: 'Reminds us that all material forms are temporary. The divine spirit arrives, resides in our hearts, and returns to the infinite universe.'
      },
      {
        symbol: 'Seed-Infused Clay Idols',
        meaning: 'Life Rebirth from Devotion',
        explanation: 'When dissolved in water, seeds within the natural clay sprout into tulsi, flowering plants, and trees, leaving a living gift to nature.'
      }
    ],
    culturalContext: {
      traditionVsHistory: 'Historical records verify that Ganesh worship predated Tilak by many centuries. Tilak did not invent the festival; he expanded and organized its public, collective dimension in the 1890s.',
      regionalVariationsNote: 'Different Hindu traditions and regional sources tell this story in different ways. This game presents one widely told version.',
      details: 'From Keshavji Naik Chawl in Girgaon (Mumbai’s first Sarvajanik Ganpati in 1893) to Lalbaugcha Raja and the Manache Ganpati in Pune, public Ganeshotsav has become one of the largest annual cultural spectacles in the world.'
    },
    didYouKnow: [
      'The famous slogan "Freedom is my birthright and I shall have it" was coined by Lokmanya Bal Gangadhar Tilak.',
      'The traditional Dhol Tasha troupes that perform during Ganeshotsav feature youth of all professions—doctors, engineers, students—playing traditional drums in disciplined unison.',
      'The farewell chant: "Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya!" translates to: "Father Ganesha, come back early next year!"'
    ],
    whyThisMatters: {
      keyMessage: 'True celebration uplifts community harmony and protects the living earth.',
      modernApplication: 'We can celebrate our heritage with grand enthusiasm while being responsible citizens: choosing biodegradable materials, preventing noise pollution, and keeping our water clean.'
    },
    suggestedQuestions: [
      {
        question: 'Did Lokmanya Tilak invent Ganesh Chaturthi?',
        answer: 'No. Ganesh worship and domestic festival traditions existed for centuries before Tilak. In 1893, Tilak organized and expanded the festival into a public community event (Sarvajanik Ganeshotsav) to unite people during India’s independence movement.'
      },
      {
        question: 'Why did the festival become a public community event in the 1890s?',
        answer: 'Under British colonial rule, political meetings were heavily restricted. Tilak saw Ganesha as a universally revered figure who could bring people together peacefully across all communities for cultural programs, educational talks, and social harmony.'
      },
      {
        question: 'What is the true spiritual meaning of Visarjan (Immersion)?',
        answer: 'Visarjan represents the profound philosophical truth that form emerges from the earth and returns to formlessness. It teaches non-attachment and reminds us that divine grace is always within us, even when the clay form dissolves.'
      },
      {
        question: 'Why is eco-friendly Visarjan so important today?',
        answer: 'Plaster of Paris (PoP) and chemical paints harm rivers and marine life. Using natural clay (Shadu Mati) and immersing idols in artificial community tubs or garden pots ensures our sacred traditions respect and nurture Mother Nature.'
      }
    ],
    topicKeywords: ['tilak', 'sarvajanik', 'ganeshotsav', 'history', '1893', 'pune', 'mumbai', 'visarjan', 'eco', 'shadu', 'clay', 'community', 'immersion', 'freedom', 'nature']
  }
};

/**
 * Knowledge-grounded responder function that answers player queries ONLY
 * using the approved, fact-checked curriculum.
 */
export function answerStoryLessonQuery(levelId: number, query: string): string {
  const lesson = AI_STORY_LESSONS[levelId] || AI_STORY_LESSONS[1];
  const q = query.trim().toLowerCase();

  if (!q) {
    return 'Please ask a question about the story, characters, symbols, or history of this chapter!';
  }

  // 1. Direct suggested question match
  for (const item of lesson.suggestedQuestions) {
    if (
      q.includes(item.question.toLowerCase().slice(0, 20)) ||
      item.question.toLowerCase().includes(q)
    ) {
      return item.answer;
    }
  }

  // 2. Keyword-based matching to verified curriculum
  if (q.includes('scripture') || q.includes('who wrote') || q.includes('source') || q.includes('text')) {
    return `In this game, stories are grounded in traditional puranic narratives and widely told cultural lore. ${lesson.culturalContext.regionalVariationsNote} Documented history and puranic traditions are respectfully distinguished to ensure factual authenticity.`;
  }

  if (q.includes('different version') || q.includes('other story') || q.includes('regional')) {
    return `${lesson.culturalContext.regionalVariationsNote} In Chapter ${levelId}, we focus on the central theme of ${lesson.subtitle}.`;
  }

  if (q.includes('symbol') || q.includes('mean') || q.includes('represent') || q.includes('stand for')) {
    const symbolMatches = lesson.symbolism.map((s) => `${s.symbol} represents ${s.meaning}: ${s.explanation}`).join(' ');
    return `Here is the sacred symbolism of this chapter: ${symbolMatches}`;
  }

  if (q.includes('character') || q.includes('who is') || q.includes('who are')) {
    const charList = lesson.characters.map((c) => `${c.name} (${c.role}): ${c.description}`).join(' ');
    return `The key figures in this chapter are: ${charList}`;
  }

  if (q.includes('why') && (q.includes('matter') || q.includes('important') || q.includes('today') || q.includes('learn'))) {
    return `${lesson.whyThisMatters.keyMessage} In our modern lives, ${lesson.whyThisMatters.modernApplication}`;
  }

  if (levelId === 1 && (q.includes('create') || q.includes('born') || q.includes('clay') || q.includes('paste') || q.includes('parvati'))) {
    return 'According to traditional accounts, Goddess Parvati fashioned young Ganesha from natural turmeric and sandalwood paste, breathing life into him and assigning him the sacred responsibility of guarding the sanctum doorway.';
  }

  if (levelId === 2 && (q.includes('elephant') || q.includes('head') || q.includes('ears') || q.includes('trunk'))) {
    return 'The sacred elephant head bestowed by Lord Shiva represents profound wisdom, vast intellect, attentive listening (large ears), adaptability (the trunk), and noble strength guided by calm discernment.';
  }

  if (levelId === 3 && (q.includes('race') || q.includes('kartikeya') || q.includes('peacock') || q.includes('parents') || q.includes('fruit'))) {
    return 'While Kartikeya swiftly flew around the physical world on his peacock, Ganesha circumambulated his parents, recognizing that for a devoted child, loving parents represent the entire universe and the source of all wisdom.';
  }

  if (levelId === 4 && (q.includes('modak') || q.includes('durva') || q.includes('sweets') || q.includes('grass') || q.includes('aarti'))) {
    return 'Ukadiche Modaks symbolize the sweet bliss (Ananda) of spiritual knowledge hidden within, while 21 blades of Durva grass symbolize healing humility. The aarti brings families and neighbors together in devotional harmony.';
  }

  if (levelId === 5 && (q.includes('tilak') || q.includes('1893') || q.includes('invent') || q.includes('sarvajanik') || q.includes('visarjan'))) {
    return 'Lokmanya Bal Gangadhar Tilak did not invent the festival; domestic worship existed for centuries. In 1893, Tilak expanded it into a public community festival (Sarvajanik Ganeshotsav) to unite all people during India’s independence movement. Today, eco-friendly Visarjan protects our rivers and marine life.';
  }

  // General grounded synthesis
  return `${lesson.storySummary} ${lesson.whyThisMatters.keyMessage} ${lesson.culturalContext.regionalVariationsNote}`;
}
