import type { KupGrade } from '../types.ts';

export const kup5: KupGrade = {
  id: '5th-kup',
  gradeNumber: 5,
  title: '5th Kup - Green Belt (Blue Tag)',
  beltColor: '#10b981',
  stripeColor: '#2563eb',
  pattern: {
    name: 'Yul-Gok',
    movements: 38,
    meaning: "Yul-Gok is the pseudonym of a great philosopher and scholar Yi I (1536-1584 A.D.) nicknamed the 'Confucius of Korea'. The 38 movements of this pattern refer to his birth place on 38 deg latitude and the diagram represents scholar."
  },
  beltMeaning: 'Blue signifies the Heaven towards which the plant matures into a towering tree as training in Tae Kwon-Do progresses.',
  terms: [
    // Parts of Body
    {
      id: '5th-arc-hand',
      category: 'body_part',
      english: 'Arc hand',
      korean: 'Bandalson',
      notes: 'Formed with thumb and index finger forming a curve; used against throat or neck'
    },

    // Stance
    {
      id: '5th-x-stance',
      category: 'stance',
      english: "'X' Stance",
      korean: 'Kyocha Sogi',
      notes: 'Crossed leg stance with one foot flat and other on ball of foot'
    },

    // Misc Technical - Strikes & Punches
    {
      id: '5th-downward-punch',
      category: 'strike',
      english: 'Downward punch',
      korean: 'Naeryo jirugi',
      notes: 'Downward punching strike towards fallen or low opponent'
    },
    {
      id: '5th-high-elbow-strike',
      category: 'strike',
      english: 'High elbow strike',
      korean: 'Nopun palkup taerigi',
      notes: 'Elbow strike targeting opponent head/jaw line'
    },

    // Misc Technical - Blocks
    {
      id: '5th-knife-hand-low-guarding-block',
      category: 'block',
      english: 'Knife hand low guarding block',
      korean: 'Sonkal najunde daebi makgi',
      notes: 'Guarding block defending low section with knife hands'
    },
    {
      id: '5th-palm-pressing-block',
      category: 'block',
      english: 'Palm pressing block',
      korean: 'Sonbadak noollo makgi',
      notes: 'Downward pressing deflection using open palm'
    },
    {
      id: '5th-u-shaped-block',
      category: 'block',
      english: "'U' shaped block",
      korean: 'Digutja makgi',
      notes: 'Defensive block forming a U-shape around opponent stick or pole'
    },
    {
      id: '5th-x-fist-rising-block',
      category: 'block',
      english: "'X' fist rising block",
      korean: 'Kyocha joomuk chookyo makgi',
      notes: 'Upward rising block with crossed wrists defending head'
    }
  ],

  theory: [
    {
      id: 'theory-yulgok-pattern',
      prompt: 'What is the 5th Kup Pattern?',
      correctAnswer: 'Yul-Gok ( 38 Movements )',
      distractors: [
        'Won-Hyo ( 28 Movements )',
        'Joong-Gun ( 32 Movements )',
        'Do-San ( 24 Movements )'
      ],
      explanation: 'Yul-Gok is the pattern for 5th Kup, containing 38 movements.'
    },
    {
      id: 'theory-yulgok-movements',
      prompt: 'How many movements are in the pattern Yul-Gok?',
      correctAnswer: '38 Movements',
      distractors: ['28 Movements', '32 Movements', '24 Movements'],
      explanation: 'Yul-Gok has 38 movements.'
    },
    {
      id: 'theory-yulgok-meaning',
      prompt: 'What is the meaning of the pattern Yul-Gok?',
      correctAnswer: "Yul-Gok is the pseudonym of philosopher and scholar Yi I (1536-1584 A.D.) nicknamed the 'Confucius of Korea'.",
      distractors: [
        'Named after patriot An Joong-Gun who assassinated Hiro-Bumi Ito.',
        'Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty.',
        "Do-San is the pseudonym of patriot Ahn Ch'ang Ho who devoted his life to education."
      ],
      explanation: 'Yul-Gok is the pseudonym of philosopher Yi I (1536-1584 A.D.).'
    },
    {
      id: 'theory-yulgok-38-movements',
      prompt: 'What do the 38 movements in Yul-Gok represent?',
      correctAnswer: 'His birth place on 38 degrees latitude (diagram represents scholar)',
      distractors: [
        'His age when executed at Lui-Shung prison',
        'The year Buddhism was introduced to the Silla Dynasty',
        'The 38 battles fought against the invaders'
      ],
      explanation: 'The 38 movements refer to his birth place on 38 degrees latitude.'
    },
    {
      id: 'theory-yulgok-dates',
      prompt: 'What years was philosopher Yi I alive?',
      correctAnswer: '1536 - 1584 A.D.',
      distractors: ['1876 - 1938 A.D.', '686 A.D.', '2333 B.C.'],
      explanation: 'Scholar Yi I lived from 1536 to 1584 A.D.'
    },
    {
      id: 'theory-two-step-sparring-korean',
      prompt: 'What is the Korean term for Two-Step Sparring?',
      correctAnswer: 'Ibo Matsoki',
      distractors: ['Sambo Matsoki', 'Ilbo Matsoki', 'Ban Jayoo Matsoki'],
      explanation: 'Ibo Matsoki means Two-Step Sparring.'
    },
    {
      id: 'theory-ibo-step-1',
      prompt: 'In Two-Step Sparring routine 1, what is the counter-attack?',
      correctAnswer: 'Twin fist vertical punch',
      distractors: [
        'Right side elbow in L-stance',
        'Knee kick while pulling opponent shoulders',
        'Front kick to coccyx, twin upset punch to kidneys'
      ],
      explanation: 'Routine 1 counter is a twin fist vertical punch.'
    },
    {
      id: 'theory-ibo-step-2',
      prompt: 'In Two-Step Sparring routine 2, what is the counter-attack?',
      correctAnswer: "Slide forward into right 'L' stance, right side elbow",
      distractors: [
        'Twin fist vertical punch',
        'Front kick to coccyx, twin upset punch to kidneys',
        'Double punch in walking stance'
      ],
      explanation: 'Routine 2 counter is slide forward into right L-stance, right side elbow.'
    },
    {
      id: 'theory-ibo-step-3',
      prompt: 'In Two-Step Sparring routine 3, what is the counter-attack?',
      correctAnswer: 'Knee kick, at the same time pull opponent shoulders',
      distractors: [
        'Right side elbow in L-stance',
        'Twin fist vertical punch',
        'Reverse knifehand strike to neck'
      ],
      explanation: 'Routine 3 counter is a knee kick while pulling the opponent shoulders.'
    },
    {
      id: 'theory-ibo-step-4',
      prompt: 'In Two-Step Sparring routine 4, what is the counter-attack?',
      correctAnswer: 'Front kick to coccyx, twin upset punch to kidneys',
      distractors: [
        'Slide forward into right L-stance side elbow',
        'Twin fist vertical punch',
        'Knee kick while pulling opponent shoulders'
      ],
      explanation: 'Routine 4 counter is front kick to coccyx, twin upset punch to kidneys.'
    },
    {
      id: 'theory-bandalson',
      prompt: 'What part of the body is Bandalson?',
      correctAnswer: 'Arc hand',
      distractors: ['Palm (Sonbadak)', 'Fingertips (Sonkut)', 'Backfist (Dung Joomuk)'],
      explanation: 'Bandalson is the Korean term for arc hand.'
    },
    {
      id: 'theory-kyocha-sogi',
      prompt: 'What stance is Kyocha Sogi?',
      correctAnswer: "'X' Stance",
      distractors: ['Walking Stance', 'L-Stance', 'Sitting Stance'],
      explanation: 'Kyocha Sogi is X Stance.'
    },
    {
      id: 'theory-digutja-makgi',
      prompt: 'What block is Digutja makgi?',
      correctAnswer: "'U' shaped block",
      distractors: ['W-Shape Block (San Makgi)', 'Wedging Block (Hechyo Makgi)', 'Circular Block (Dollymio Makgi)'],
      explanation: 'Digutja makgi is U-shaped block.'
    }
  ],

  sparringSequence: [
    {
      step: 1,
      action: "ATTACK High punch, front kick. DEFENCE Right leg back walking stance rising block, left leg back walking stance 'X' fist pressing block. COUNTER Twin fist vertical punch."
    },
    {
      step: 2,
      action: "ATTACK Side punch (Fixed stance), turning kick. DEFENCE Right leg back 'L' stance upward palm block, left leg back 'L' stance waist block. COUNTER Slide forward into right 'L' stance, right side elbow."
    },
    {
      step: 3,
      action: "ATTACK Front kick, twin vertical punch. DEFENCE Right leg back walking stance 'X' fist pressing block, left leg back walking stance outer forearm wedging block. COUNTER Knee kick, at the same time pull opponent shoulders."
    },
    {
      step: 4,
      action: "ATTACK Flat fingertip thrust, side kick. DEFENCE Right leg back walking stance knife hand rising block, left leg back 'L' stance inward palm block. COUNTER Front kick to coccyx, twin upset punch to kidneys."
    }
  ],
  notes: 'Two Step Sparring (Ibo Matsoki Basic 1 to 4) and Semi Free Sparring (Ban Jayoo Matsoki Intermediate) required for 5th Kup.'
};
