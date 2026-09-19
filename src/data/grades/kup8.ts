import type { KupGrade } from '../types.ts';

export const kup8: KupGrade = {
  id: '8th-kup',
  gradeNumber: 8,
  title: '8th Kup - Yellow Belt (Green Stripe Prep)',
  beltColor: '#ffe135',
  stripeColor: '#10b981',
  pattern: {
    name: 'Dan-Gun',
    movements: 21,
    meaning: 'Dan-Gun is named after the holy Dan-Gun, the legendary founder of Korea in the year 2333 B.C.'
  },
  beltMeaning: 'Green signifies the plant\'s growth as Tae Kwon-Do skills begin to develop.',
  terms: [
    // Parts of Body
    {
      id: 'body-backfist',
      category: 'body_part',
      english: 'Backfist',
      korean: 'Dung Joomuk',
      notes: 'Used in strikes like Dung Joomuk Yop Taerigi'
    },
    {
      id: 'body-fingertips',
      category: 'body_part',
      english: 'Finger tips',
      korean: 'Sonkut',
      notes: 'Used in Sun Sonkut Tulgi'
    },

    // Stances
    {
      id: 'stance-fixed',
      category: 'stance',
      english: 'Fixed Stance',
      korean: 'Gojung Sogi',
      notes: 'Weight distributed 50/50, 1.5 shoulder widths long'
    },

    // Technical / Moves
    {
      id: 'tech-twin-vert-punch',
      category: 'strike',
      english: 'Twin Fist Vertical Punch',
      korean: 'Sang Joomuk sewo Jirugi',
      notes: 'Executed in Dan-Gun pattern'
    },
    {
      id: 'tech-twin-upset-punch',
      category: 'strike',
      english: 'Twin Fist Upset Punch',
      korean: 'Sang Joomuk Dwijibo Jirugi',
      notes: 'Both palms facing upwards'
    },
    {
      id: 'tech-straight-fingertip-thrust',
      category: 'thrust',
      english: 'Straight fingertip Thrust',
      korean: 'Sun Sonkut Tulgi',
      notes: 'Targeting solar plexus'
    },
    {
      id: 'tech-side-punch',
      category: 'strike',
      english: 'Side Punch',
      korean: 'Yop Jirugi',
      notes: 'Punching laterally from stance'
    },
    {
      id: 'tech-backfist-side-strike',
      category: 'strike',
      english: 'Back Fist Side Strike',
      korean: 'Dung Joomuk Yop Taerigi',
      notes: 'Striking with the backfist sideways'
    },
    {
      id: 'tech-wedging-block',
      category: 'block',
      english: 'Wedging Block',
      korean: 'Hechyo Makgi',
      notes: 'Separating opponent\'s double attack'
    },
    {
      id: 'tech-waist-block',
      category: 'block',
      english: 'Waist Block',
      korean: 'Hori Makgi ( Anuro/Bakuro )',
      notes: 'Inward/Outward waist height block'
    },
    {
      id: 'tech-outer-forearm-high-side-block',
      category: 'block',
      english: 'Outer Forearm High Side Block',
      korean: 'Bakat Palmok Nopunde Yop Makgi',
      notes: 'Key block in Dan-Gun'
    },
    {
      id: 'tech-back-piercing-kick',
      category: 'kick',
      english: 'Back Piercing Kick',
      korean: 'Dwit Cha Jirugi',
      notes: 'Thrusting backwards with the heel'
    }
  ],

  theory: [
    {
      id: 'theory-dangun-movements',
      prompt: 'How many movements are in the pattern Dan-Gun?',
      correctAnswer: '21 Movements',
      distractors: ['19 Movements', '24 Movements', '28 Movements'],
      explanation: 'Dan-Gun has 21 movements.'
    },
    {
      id: 'theory-dangun-founder',
      prompt: 'Who is the pattern Dan-Gun named after?',
      correctAnswer: 'The holy Dan-Gun, founder of Korea in 2333 B.C.',
      distractors: [
        'A famous 16th century Korean Admiral',
        'The patriot Ahn Chang-Ho',
        'General Kim Yoo-Sin'
      ],
      explanation: 'Dan-Gun is named after the holy Dan-Gun, legendary founder of Korea in 2333 B.C.'
    },
    {
      id: 'theory-dangun-year',
      prompt: 'In what year was Korea founded according to Dan-Gun legend?',
      correctAnswer: '2333 B.C.',
      distractors: ['1910 A.D.', '1392 A.D.', '668 A.D.'],
      explanation: 'Holy Dan-Gun founded Korea in 2333 B.C.'
    },
    {
      id: 'theory-green-belt-meaning',
      prompt: 'What is the meaning of the Green Belt / Stripe?',
      correctAnswer: 'Signifies the plant\'s growth as Tae Kwon-Do skills begin to develop.',
      distractors: [
        'Signifies the earth from which a plant sprouts.',
        'Signifies danger, cautioning the student to exercise control.',
        'Signifies innocence, as that of a beginning student.'
      ],
      explanation: 'Green signifies the plant\'s growth as Tae Kwon-Do skills develop.'
    },
    {
      id: 'theory-inner-forearm-block',
      prompt: 'What is an Inner Forearm Block (An Palmok Makgi)?',
      correctAnswer: 'Any block that uses the inner forearm',
      distractors: [
        'Any block that reaches from outward to inward',
        'Any block directed at the inside of the opponent\'s body',
        'Any block executed with both forearms'
      ],
      explanation: 'An Palmok Makgi is any block that utilizes the inner radial forearm.'
    },
    {
      id: 'theory-outer-forearm-block',
      prompt: 'What is an Outer Forearm Block (Bakat Palmok Makgi)?',
      correctAnswer: 'Any block that uses the outer forearm',
      distractors: [
        'Any block that reaches from inward to outward',
        'Any block using the knifehand',
        'Any block directed above eye level'
      ],
      explanation: 'Bakat Palmok Makgi uses the outer ulnar forearm.'
    },
    {
      id: 'theory-inward-block',
      prompt: 'What defines an Inward Block (Anuro Makgi)?',
      correctAnswer: 'Reaches from an outward to an inward trajectory',
      distractors: [
        'Reaches from an inward to an outward trajectory',
        'Targets the inner portion of the opponent\'s arm',
        'Always uses the inner forearm'
      ],
      explanation: 'Anuro Makgi travels from outside towards the center line (outward to inward).'
    },
    {
      id: 'theory-outward-block',
      prompt: 'What defines an Outward Block (Bakuro Makgi)?',
      correctAnswer: 'Reaches from an inward to an outward trajectory',
      distractors: [
        'Reaches from an outward to an inward trajectory',
        'Blocks an attack coming from the outside',
        'Uses only the outer edge of the fist'
      ],
      explanation: 'Bakuro Makgi travels from the inside towards the outside.'
    },
    {
      id: 'theory-inside-block',
      prompt: 'What is an Inside Block (An Makgi)?',
      correctAnswer: 'Directed at the inner portion of the opponent\'s attacking tool',
      distractors: [
        'Uses the inner forearm to deflect',
        'Travels inward from the shoulder',
        'A block performed while stepping inwards'
      ],
      explanation: 'An Makgi targets the inside line of the attacking limb.'
    },
    {
      id: 'theory-outside-block',
      prompt: 'What is an Outside Block (Bakat Makgi)?',
      correctAnswer: 'Directed at the outer portion of the opponent\'s attacking tool',
      distractors: [
        'Uses only the outer forearm',
        'Deflects attacks outside the dojang ring',
        'Travels purely from bottom to top'
      ],
      explanation: 'Bakat Makgi strikes or deflects the outside line of the attacker\'s limb.'
    }
  ]
};
