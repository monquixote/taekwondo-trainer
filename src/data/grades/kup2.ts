import type { KupGrade } from '../types.ts';

export const kup2: KupGrade = {
  id: '2nd-kup',
  gradeNumber: 2,
  title: '2nd Kup - Red Belt',
  beltColor: '#dc2626',
  pattern: {
    name: 'Hwa-Rang',
    movements: 29,
    meaning: 'Hwa-Rang is named after the Hwa-Rang youth group which originated in the Silla Dynasty about 1350 years ago. This group eventually became the actual driving force for the unification of the three kingdoms of Korea. The 29 movements refer to the 29th infantry division, where Tae Kwon-Do developed into maturity.'
  },
  beltMeaning: 'Black is opposite to white, therefore, signifying the maturity and proficiency in Tae Kwon-Do. Also indicates the wearer\'s imperviousness to darkness and fear.',
  terms: [
    // Stance
    {
      id: '2nd-close-ready-stance-c',
      category: 'stance',
      english: "Close ready 'C'",
      korean: "Moa Jumbi 'C'",
      notes: "Close stance ready posture with hands held at abdomen height with left palm over right fist"
    },

    // Misc Technical - Kicks
    {
      id: '2nd-twisting-kick',
      category: 'kick',
      english: 'Twisting kick',
      korean: 'Bituro chagi',
      notes: 'Outward twisting kick struck with the ball of the foot'
    },
    {
      id: '2nd-jumping-kick',
      category: 'kick',
      english: 'Jumping kick',
      korean: 'Twimyo chagi',
      notes: 'Jumping aerial kick delivered at peak of elevation'
    },

    // Misc Technical - Blocks
    {
      id: '2nd-x-fist-middle-side-block',
      category: 'block',
      english: "'X' fist middle side block",
      korean: 'Kyocha joomuk yop makgi',
      notes: 'Crossed-fist side block defending middle torso line'
    },
    {
      id: '2nd-twin-palm-upward-block',
      category: 'block',
      english: 'Twin palm upward block',
      korean: 'Sang sonbadak ollyo makgi',
      notes: 'Double open palm upward deflection'
    }
  ],

  theory: [
    {
      id: 'theory-hwarang-pattern',
      prompt: 'What is the 2nd Kup Pattern?',
      correctAnswer: 'Hwa-Rang ( 29 Movements )',
      distractors: [
        'Toi-Gye ( 37 Movements )',
        'Choong-Moo ( 30 Movements )',
        'Joong-Gun ( 32 Movements )'
      ],
      explanation: 'Hwa-Rang is the pattern for 2nd Kup, containing 29 movements.'
    },
    {
      id: 'theory-hwarang-movements',
      prompt: 'How many movements are in the pattern Hwa-Rang?',
      correctAnswer: '29 Movements',
      distractors: ['37 Movements', '32 Movements', '30 Movements'],
      explanation: 'Hwa-Rang has 29 movements.'
    },
    {
      id: 'theory-hwarang-meaning',
      prompt: 'What is the meaning of the pattern Hwa-Rang?',
      correctAnswer: 'Named after the Hwa-Rang youth group originating in the Silla Dynasty about 1350 years ago, who became the driving force for unification of the three kingdoms.',
      distractors: [
        'Named after patriot An Joong-Gun who assassinated Hiro-Bumi Ito.',
        'Named after scholar Yi Hwang, authority on neo-Confucianism.',
        'Named after monk Won-Hyo who introduced Buddhism to the Silla Dynasty.'
      ],
      explanation: 'Hwa-Rang is named after the youth group of the Silla Dynasty (c. 1350 years ago).'
    },
    {
      id: 'theory-hwarang-29-movements',
      prompt: 'What do the 29 movements in Hwa-Rang refer to?',
      correctAnswer: 'The 29th Infantry Division, where Tae Kwon-Do developed into maturity',
      distractors: [
        'The 29 youth disciples of the Silla king',
        'His age when martyred for unification',
        'The 29 kingdoms of ancient East Asia'
      ],
      explanation: 'The 29 movements refer to the 29th Infantry Division where Tae Kwon-Do developed into maturity.'
    },
    {
      id: 'theory-hwarang-origin-time',
      prompt: 'About how many years ago did the Hwa-Rang youth group originate in the Silla Dynasty?',
      correctAnswer: 'About 1350 years ago',
      distractors: ['About 2000 years ago', 'About 600 years ago', 'About 100 years ago'],
      explanation: 'The Hwa-Rang youth group originated about 1350 years ago.'
    },
    {
      id: 'theory-black-belt-meaning',
      prompt: 'What is the meaning of the Black Belt?',
      correctAnswer: 'Opposite to white, signifying maturity and proficiency in Tae Kwon-Do, and the wearer\'s imperviousness to darkness and fear.',
      distractors: [
        'Signifies danger, cautioning the student to exercise control.',
        'Signifies the Heaven towards which the plant matures into a towering tree.',
        "Signifies the plant's growth as Tae Kwon-Do skills begin to develop."
      ],
      explanation: 'Black signifies maturity, proficiency, and imperviousness to darkness and fear.'
    },
    {
      id: 'theory-bituro-chagi',
      prompt: 'What technique is Bituro chagi?',
      correctAnswer: 'Twisting kick',
      distractors: ['Turning kick (Dollyo chagi)', 'Reverse turning kick (Bandae dollyo chagi)', 'Hooking kick (Golcho chagi)'],
      explanation: 'Bituro chagi is twisting kick.'
    },
    {
      id: 'theory-moa-jumbi-c',
      prompt: "What stance is Moa Jumbi 'C'?",
      correctAnswer: "Close ready 'C'",
      distractors: ["Parallel ready", "Bending ready", "Fixed stance"],
      explanation: "Moa Jumbi 'C' is Close ready stance C."
    },
    {
      id: 'theory-kyocha-joomuk-yop-makgi',
      prompt: "What block is Kyocha joomuk yop makgi?",
      correctAnswer: "'X' fist middle side block",
      distractors: ["'X' fist rising block", "'X' fist pressing block", "W-Shape block"],
      explanation: "Kyocha joomuk yop makgi is 'X' fist middle side block."
    }
  ],

  sparringSequence: [
    {
      step: 1,
      action: 'One Step Sparring (Ilbo Matsoki): Standardized high section obverse punch attack in walking stance; defender executes technical multi-move combination counters using kicks, hand strikes, and joint lock defenses.'
    }
  ],
  notes: 'One Step Sparring (Ilbo Matsoki with advanced combinations) and Pad Work (Byogae hands and feet routines) required for 2nd Kup.'
};
