import type { KupGrade } from '../types.ts';

export const kup6: KupGrade = {
  id: '6th-kup',
  gradeNumber: 6,
  title: '6th Kup - Green Belt',
  beltColor: '#10b981',
  pattern: {
    name: 'Won-Hyo',
    movements: 28,
    meaning: 'Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty in the year 686 A.D.'
  },
  beltMeaning: 'Blue signifies the Heaven towards which the plant matures into a towering tree as training in Tae Kwon-Do progresses.',
  terms: [
    // Parts of Body
    {
      id: '6th-elbow',
      category: 'body_part',
      english: 'Elbow',
      korean: 'Palkup',
      notes: 'Used in strikes and thrusts'
    },
    {
      id: '6th-knee',
      category: 'body_part',
      english: 'Knee',
      korean: 'Moorup',
      notes: 'Used in knee strikes and kicks'
    },
    {
      id: '6th-side-sole',
      category: 'body_part',
      english: 'Side sole',
      korean: 'Yop Bal Badak',
      notes: 'Used in checking and sweeping kicks'
    },
    {
      id: '6th-reverse-footsword',
      category: 'body_part',
      english: 'Reverse Footsword',
      korean: 'Bakal Dung',
      notes: 'Inner edge of the foot'
    },
    {
      id: '6th-sole',
      category: 'body_part',
      english: 'Sole',
      korean: 'Kumchi',
      notes: 'Bottom surface of the foot'
    },

    // Stances
    {
      id: '6th-parallel-ready-stance',
      category: 'stance',
      english: 'Parallel ready stance',
      korean: 'Narani jumbi sogi',
      notes: 'Feet parallel, shoulder-width apart'
    },
    {
      id: '6th-close-stance',
      category: 'stance',
      english: 'Close stance',
      korean: 'Moa sogi',
      notes: 'Feet together touching at inner edges'
    },
    {
      id: '6th-close-ready-stance',
      category: 'stance',
      english: 'Close ready stance',
      korean: 'Moa jumbi sogi',
      notes: 'Close stance with hands in ready position'
    },
    {
      id: '6th-bending-ready-stance',
      category: 'stance',
      english: 'Bending ready stance',
      korean: 'Guburyo jumbi sogi',
      notes: 'Weight on one bent leg preparing for side kick'
    },

    // Misc Technical - Kicks
    {
      id: '6th-knee-kick',
      category: 'kick',
      english: 'Knee Kick',
      korean: 'Moorup chagi',
      notes: 'Upward thrust using the knee'
    },
    {
      id: '6th-crescent-kick',
      category: 'kick',
      english: 'Crescent Kick',
      korean: 'Bandal chagi',
      notes: 'Defensive arc kick'
    },
    {
      id: '6th-hooking-kick',
      category: 'kick',
      english: 'Hooking Kick',
      korean: 'Golcho chagi',
      notes: 'Hooking motion to deflect or strike'
    },
    {
      id: '6th-reverse-turning-hooking-kick',
      category: 'kick',
      english: 'Reverse turning hooking kick',
      korean: 'Bandae dollyo goro chagi',
      notes: 'Spinning reverse hook kick'
    },

    // Misc Technical - Blocks
    {
      id: '6th-palm-hooking-block',
      category: 'block',
      english: 'Palm hooking block',
      korean: 'Sonbadak golcho makgi',
      notes: 'Hooking block executed with the palm'
    },
    {
      id: '6th-twin-knife-hand-block',
      category: 'block',
      english: 'Twin knife hand block',
      korean: 'Sang sonkal makgi',
      notes: 'Double knifehand guarding/block'
    },
    {
      id: '6th-reverse-knife-hand-block',
      category: 'block',
      english: 'Reverse knife hand block',
      korean: 'Sonkal dung makgi',
      notes: 'Block with the thumb side edge of the hand'
    },
    {
      id: '6th-x-fist-pressing-block',
      category: 'block',
      english: 'X-Fist pressing block',
      korean: 'Kyocha joomuk noollo makgi',
      notes: 'Downward pressing block with crossed wrists'
    },
    {
      id: '6th-double-forearm-block',
      category: 'block',
      english: 'Double forearm block',
      korean: 'Doo palmok makgi',
      notes: 'Reinforced block using both forearms'
    },

    // Misc Technical - Strikes & Thrusts
    {
      id: '6th-front-elbow-strike',
      category: 'strike',
      english: 'Front elbow strike',
      korean: 'Ap palkup Taerigi',
      notes: 'Forward smashing strike with the elbow'
    },
    {
      id: '6th-upper-elbow-strike',
      category: 'strike',
      english: 'Upper elbow strike',
      korean: 'Wi palkup Taerigi',
      notes: 'Rising upward elbow strike'
    },
    {
      id: '6th-side-elbow-thrust',
      category: 'thrust',
      english: 'Side elbow thrust',
      korean: 'Yop palkup tulgi',
      notes: 'Lateral thrust with the point of the elbow'
    },
    {
      id: '6th-reverse-knife-hand-inward-front-strike',
      category: 'strike',
      english: 'Reverse knife hand inward front strike',
      korean: 'Sonkal dung anuro ap taerigi',
      notes: 'Inward front strike using the reverse knifehand'
    },
    {
      id: '6th-crescent-punch',
      category: 'strike',
      english: 'Crescent punch',
      korean: 'Bandal jirugi',
      notes: 'Curved inward punching technique'
    }
  ],

  theory: [
    {
      id: 'theory-wonhyo-pattern',
      prompt: 'What is the 6th Kup Pattern?',
      correctAnswer: 'Won-Hyo ( 28 Movements )',
      distractors: [
        'Do-San ( 24 Movements )',
        'Dan-Gun ( 21 Movements )',
        'Yul-Gok ( 38 Movements )'
      ],
      explanation: 'Won-Hyo is the pattern for 6th Kup, consisting of 28 movements.'
    },
    {
      id: 'theory-wonhyo-movements',
      prompt: 'How many movements are in the pattern Won-Hyo?',
      correctAnswer: '28 Movements',
      distractors: ['21 Movements', '24 Movements', '32 Movements'],
      explanation: 'Won-Hyo has 28 movements.'
    },
    {
      id: 'theory-wonhyo-meaning',
      prompt: 'What is the meaning of the pattern Won-Hyo?',
      correctAnswer: 'Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty in the year 686 A.D.',
      distractors: [
        "Do-San is the pseudonym of the patriot Ahn Ch'ang Ho who devoted his life to education.",
        'Dan-Gun is named after the holy Dan-Gun, legendary founder of Korea in 2333 B.C.',
        'Yul-Gok is the pseudonym of great philosopher and scholar Yi I, the Confucius of Korea.'
      ],
      explanation: 'Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty in 686 A.D.'
    },
    {
      id: 'theory-wonhyo-year',
      prompt: 'In what year did Won-Hyo introduce Buddhism to the Silla Dynasty?',
      correctAnswer: '686 A.D.',
      distractors: ['2333 B.C.', '1910 A.D.', '1536 A.D.'],
      explanation: 'Won-Hyo introduced Buddhism to the Silla Dynasty in 686 A.D.'
    },
    {
      id: 'theory-blue-belt-meaning',
      prompt: 'What is the meaning of the Blue Belt / Stripe?',
      correctAnswer: 'Signifies the Heaven towards which the plant matures into a towering tree as training in Tae Kwon-Do progresses.',
      distractors: [
        "Signifies the plant's growth as Tae Kwon-Do skills begin to develop.",
        'Signifies the earth from which a plant sprouts and takes root.',
        'Signifies danger, cautioning the student to exercise control.'
      ],
      explanation: 'Blue signifies the Heaven towards which the plant matures into a towering tree.'
    },
    {
      id: 'theory-6th-sparring-requirements',
      prompt: 'Which 3-step sparring routines are required for 6th Kup grading?',
      correctAnswer: 'Steps 1 to 10 (Advanced Steps 8, 9, 10)',
      distractors: ['Steps 1 to 7 only', 'Steps 1 to 4 only', 'Two-step sparring 1 to 4'],
      explanation: '6th Kup requires knowledge and performance of 3-step sparring up to Step 10.'
    },
    {
      id: 'theory-sparring-step-8',
      prompt: 'In 3-step sparring step 8, what is the counter-attack sequence?',
      correctAnswer: 'Back leg side kick to mid section, land in left L-stance backfist to temple',
      distractors: [
        'Turning kick with right leg, land in vertical stance knifehand strike to neck',
        'Reverse side kick with right leg, land in walking stance reverse knifehand',
        'Front snap kick with back leg, then walking stance double punch'
      ],
      explanation: 'Slide back into right L-stance forearm guarding block, back leg side kick, left L-stance right backfist to temple.'
    },
    {
      id: 'theory-sparring-step-9',
      prompt: 'In 3-step sparring step 9, what is the counter-attack sequence?',
      correctAnswer: 'Move left leg across, right leg turning kick, land in left Vertical stance right knifehand strike to neck/kidneys',
      distractors: [
        'Back leg side kick to mid section, left L-stance backfist',
        'Reverse side kick, land in right walking stance reverse knifehand',
        'Sitting stance simultaneously block and punch'
      ],
      explanation: 'Move left leg across, right leg turning kick to mid section, land in left Vertical stance knifehand strike to neck or kidneys.'
    },
    {
      id: 'theory-sparring-step-10',
      prompt: 'In 3-step sparring step 10, what is the counter-attack sequence?',
      correctAnswer: 'Right leg reverse side kick, land in right walking stance left mid reverse knifehand inward strike, slip front leg into left L-stance guarding block',
      distractors: [
        'Back leg side kick to mid section, left L-stance backfist to temple',
        'Turning kick to mid section, land in vertical stance knifehand strike',
        'Front snap kick then walking stance double punch'
      ],
      explanation: 'Slide back into guarding block, right leg reverse side kick, right walking stance left reverse knifehand, slip into guarding block.'
    },
    {
      id: 'theory-semi-free-sparring-korean',
      prompt: 'What is the Korean term for Semi-Free Sparring?',
      correctAnswer: 'Ban Jayoo Matsoki',
      distractors: ['Sambo Matsoki', 'Ibo Matsoki', 'Ilbo Matsoki'],
      explanation: 'Ban Jayoo Matsoki is Semi-Free Sparring.'
    },
    {
      id: 'theory-palkup',
      prompt: 'What part of the body is Palkup?',
      correctAnswer: 'Elbow',
      distractors: ['Knee (Moorup)', 'Sole (Kumchi)', 'Side sole (Yop Bal Badak)'],
      explanation: 'Palkup is the Korean term for elbow.'
    },
    {
      id: 'theory-moorup',
      prompt: 'What part of the body is Moorup?',
      correctAnswer: 'Knee',
      distractors: ['Elbow (Palkup)', 'Sole (Kumchi)', 'Footsword (Balkal)'],
      explanation: 'Moorup is the Korean term for knee.'
    },
    {
      id: 'theory-yop-bal-badak',
      prompt: 'What part of the body is Yop Bal Badak?',
      correctAnswer: 'Side sole',
      distractors: ['Sole (Kumchi)', 'Reverse Footsword (Bakal Dung)', 'Heel (Dwitchhook)'],
      explanation: 'Yop Bal Badak is the Korean term for side sole.'
    },
    {
      id: 'theory-bakal-dung',
      prompt: 'What part of the body is Bakal Dung?',
      correctAnswer: 'Reverse Footsword',
      distractors: ['Footsword (Balkal)', 'Instep (Baldung)', 'Side sole (Yop Bal Badak)'],
      explanation: 'Bakal Dung is the Korean term for reverse footsword.'
    },
    {
      id: 'theory-kumchi',
      prompt: 'What part of the body is Kumchi?',
      correctAnswer: 'Sole',
      distractors: ['Heel (Dwitchhook)', 'Ball of foot (Ap Kumchi)', 'Toes (Balkut)'],
      explanation: 'Kumchi is the Korean term for the sole of the foot.'
    }
  ],

  sparringSequence: [
    {
      step: 8,
      action: "Right leg back, right 'L' stance knifehand block. Third move, slide back into right 'L' stance forearm guarding block then side kick with back leg to mid section place foot down into left 'L' stance back fist with right hand to temple."
    },
    {
      step: 9,
      action: "Right leg back, right 'L' stance pushing block with left palm heel to outside of punch. Third move, block then move left leg across towards partners right hand side executing a turning kick to the mid section with the right leg place the foot down into a left Vertical stance then knife hand strike with the right hand to partners neck or kidneys."
    },
    {
      step: 10,
      action: "As No8, third move, slide back into right 'L' stance forearm guarding block execute a right leg reverse side kick place the foot down a right walking stance executing a mid reverse knifehand inward strike with the left hand, then slip front leg into a left 'L' stance forearm guarding block."
    }
  ],
  notes: 'Sambo Matsoki (Steps 1 to 10) and Semi-Free Sparring (Ban Jayoo Matsoki Basic) are required for 6th Kup.'
};
