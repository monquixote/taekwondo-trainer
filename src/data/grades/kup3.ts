import type { KupGrade } from '../types.ts';

export const kup3: KupGrade = {
  id: '3rd-kup',
  gradeNumber: 3,
  title: '3rd Kup - Blue Belt (Red Tag)',
  beltColor: '#2563eb',
  stripeColor: '#dc2626',
  pattern: {
    name: 'Toi-Gye',
    movements: 37,
    meaning: "Toi-Gye is the pen name of the noted scholar Yi Hwang (16th Century A.D.), an authority on neo-Confucianism. The 37 movements of this pattern refer to his birth place on 37 degrees latitude, the diagram represents 'Scholar'."
  },
  beltMeaning: 'Red signifies Danger, cautioning the student to exercise control, and warning the opponent to stay away.',
  terms: [
    // Stance
    {
      id: '3rd-vertical-stance',
      category: 'stance',
      english: 'Vertical Stance',
      korean: 'Soojik Sogi',
      notes: '60/40 weight distribution (rear leg heavy), one shoulder width long between big toes'
    },

    // Misc Technical - Punches & Strikes
    {
      id: '3rd-upward-punch',
      category: 'strike',
      english: 'Upward punch',
      korean: 'Ollyo Jirugi',
      notes: 'Punch delivered in upward vertical direction under opponent jaw'
    },
    {
      id: '3rd-knife-hand-downward-strike',
      category: 'strike',
      english: 'Knife hand downward strike',
      korean: 'Sonkal naeryo taerigi',
      notes: 'Downward chopping strike with the knifehand targeting collarbone or head'
    },

    // Misc Technical - Blocks
    {
      id: '3rd-palm-pushing-block',
      category: 'block',
      english: 'Palm pushing block',
      korean: 'Sonbadak miro makgi',
      notes: 'Pushing redirection block using the open palm'
    },

    // Misc Technical - Kicks
    {
      id: '3rd-flying-back-piercing-kick',
      category: 'kick',
      english: 'Flying back piercing kick',
      korean: 'Twimyo dwit cha jirugi',
      notes: 'Airborne jumping back kick striking with the heel'
    },
    {
      id: '3rd-twin-foot-front-kick',
      category: 'kick',
      english: 'Twin foot front kick',
      korean: 'Sangbal apcha busigi',
      notes: 'Flying kick delivering simultaneous front snap kicks with both feet'
    }
  ],

  theory: [
    {
      id: 'theory-toigye-pattern',
      prompt: 'What is the 3rd Kup Pattern?',
      correctAnswer: 'Toi-Gye ( 37 Movements )',
      distractors: [
        'Joong-Gun ( 32 Movements )',
        'Hwa-Rang ( 29 Movements )',
        'Yul-Gok ( 38 Movements )'
      ],
      explanation: 'Toi-Gye is the pattern for 3rd Kup, containing 37 movements.'
    },
    {
      id: 'theory-toigye-movements',
      prompt: 'How many movements are in the pattern Toi-Gye?',
      correctAnswer: '37 Movements',
      distractors: ['32 Movements', '29 Movements', '38 Movements'],
      explanation: 'Toi-Gye has 37 movements.'
    },
    {
      id: 'theory-toigye-meaning',
      prompt: 'What is the meaning of the pattern Toi-Gye?',
      correctAnswer: 'Toi-Gye is the pen name of the noted scholar Yi Hwang (16th Century A.D.), an authority on neo-Confucianism.',
      distractors: [
        'Named after patriot An Joong-Gun who assassinated Hiro-Bumi Ito.',
        'Named after philosopher Yi I, nicknamed the Confucius of Korea.',
        'Named after the Hwa-Rang youth group originating in the Silla Dynasty.'
      ],
      explanation: 'Toi-Gye is the pen name of noted scholar Yi Hwang (16th Century A.D.).'
    },
    {
      id: 'theory-toigye-37-movements',
      prompt: 'What do the 37 movements in Toi-Gye represent?',
      correctAnswer: 'His birth place on 37 degrees latitude (diagram represents "Scholar")',
      distractors: [
        'His age when he achieved enlightenment',
        'The 37 chapters of neo-Confucian principles',
        'The 37 years he served the dynasty'
      ],
      explanation: 'The 37 movements refer to his birth place on 37 degrees latitude.'
    },
    {
      id: 'theory-toigye-century',
      prompt: 'In what century was scholar Yi Hwang active?',
      correctAnswer: '16th Century A.D.',
      distractors: ['14th Century A.D.', '7th Century A.D.', '19th Century A.D.'],
      explanation: 'Scholar Yi Hwang lived during the 16th Century A.D.'
    },
    {
      id: 'theory-ilbo-matsoki-korean',
      prompt: 'What is the Korean term for One-Step Sparring?',
      correctAnswer: 'Ilbo Matsoki',
      distractors: ['Ibo Matsoki', 'Sambo Matsoki', 'Ban Jayoo Matsoki'],
      explanation: 'Ilbo Matsoki is One-Step Sparring.'
    },
    {
      id: 'theory-ilbo-attack',
      prompt: 'In 3rd Kup One-Step Sparring, what is the standardized attack?',
      correctAnswer: 'Right leg forward (then left) High section obverse punch in walking stance',
      distractors: [
        'Right leg back middle punch in L-stance',
        'Front snap kick followed by twin vertical punch',
        'Right fixed stance side punch'
      ],
      explanation: 'Attack starts from parallel ready stance: high section obverse punch in walking stance.'
    },
    {
      id: 'theory-soojik-sogi',
      prompt: 'What stance is Soojik Sogi?',
      correctAnswer: 'Vertical Stance',
      distractors: ['Fixed Stance (Gojung Sogi)', 'Low Stance (Nachuo Sogi)', 'Rear Foot Stance (Dwitbal Sogi)'],
      explanation: 'Soojik Sogi is Vertical Stance.'
    },
    {
      id: 'theory-ollyo-jirugi',
      prompt: 'What technique is Ollyo Jirugi?',
      correctAnswer: 'Upward punch',
      distractors: ['Downward punch (Naeryo jirugi)', 'Side punch (Yop jirugi)', 'Crescent punch (Bandal jirugi)'],
      explanation: 'Ollyo Jirugi is upward punch.'
    },
    {
      id: 'theory-sangbal-apcha-busigi',
      prompt: 'What technique is Sangbal apcha busigi?',
      correctAnswer: 'Twin foot front kick',
      distractors: ['Flying back piercing kick', 'Reverse turning kick', 'Knee kick'],
      explanation: 'Sangbal apcha busigi is twin foot front kick.'
    }
  ],

  sparringSequence: [
    {
      step: 1,
      action: 'ATTACK Starting position: Parallel ready Stance. First right leg forward (then left) High section obverse punch (Walking stance). DEFENCE Any combination of stances, blocks and counter attacks based on knowledge from previous step sparring.'
    }
  ],
  notes: 'One Step Sparring (Ilbo Matsoki), Semi Free Sparring (Ban Jayoo Matsoki Advanced), and Pad Work (Single 45 kick, Double 45 kick, Turning kick, Axe kick) required for 3rd Kup.'
};
