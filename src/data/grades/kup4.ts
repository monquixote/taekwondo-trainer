import type { KupGrade } from '../types.ts';

export const kup4: KupGrade = {
  id: '4th-kup',
  gradeNumber: 4,
  title: '4th Kup - Blue Belt',
  beltColor: '#2563eb',
  pattern: {
    name: 'Joong-Gun',
    movements: 32,
    meaning: "Joong-Gun is named after the patriot An Joong-Gun who assassinated Hiro-Bumi Ito; the first Japanese governor general of Korea, known as the man who played the leading part in the Korean-Japan merger. There are 32 movements in this pattern to represent Mr An's age when he was executed at Lui-Shung prison (1910)."
  },
  beltMeaning: 'Red signifies Danger, cautioning the student to exercise control, and warning the opponent to stay away.',
  terms: [
    // Misc Technical - Kicks
    {
      id: '4th-vertical-kick',
      category: 'kick',
      english: 'Vertical kick',
      korean: 'Sewo chagi',
      notes: 'Vertical kick executed with outward or inward swinging motion'
    },
    {
      id: '4th-downward-kick',
      category: 'kick',
      english: 'Downward kick',
      korean: 'Naeryo chagi',
      notes: 'Axe kick dropping heel downwards on target'
    },
    {
      id: '4th-flying-kick',
      category: 'kick',
      english: 'Flying kick',
      korean: 'Twimyo chagi',
      notes: 'Jumping aerial kick delivering strike while airborne'
    },

    // Misc Technical - Blocks
    {
      id: '4th-w-shape-block',
      category: 'block',
      english: 'W-Shape Block',
      korean: 'San Makgi',
      notes: 'Double outer forearm block forming a W shape, defending against double attacks'
    },
    {
      id: '4th-double-forearm-pushing-block',
      category: 'block',
      english: 'Double forearm pushing block',
      korean: 'Doo palmok miro makgi',
      notes: 'Two-handed pushing block pushing opponent attack away'
    },
    {
      id: '4th-twin-palm-upward-block',
      category: 'block',
      english: 'Twin palm upward block',
      korean: 'Sang sonbadak ollyo makgi',
      notes: 'Double open palm upward rising block'
    },

    // Misc Technical - Strikes & Thrusts
    {
      id: '4th-upset-finger-tip-thrust',
      category: 'thrust',
      english: 'Upset finger tip thrust',
      korean: 'Dwijibun sonkut tulgi',
      notes: 'Fingertip spear thrust with palm facing upwards to the groin or abdomen'
    },
    {
      id: '4th-angle-punch',
      category: 'strike',
      english: 'Angle punch',
      korean: 'Giokja jirugi',
      notes: 'Hooking angle punch delivered across chest'
    }
  ],

  theory: [
    {
      id: 'theory-joonggun-pattern',
      prompt: 'What is the 4th Kup Pattern?',
      correctAnswer: 'Joong-Gun ( 32 Movements )',
      distractors: [
        'Yul-Gok ( 38 Movements )',
        'Won-Hyo ( 28 Movements )',
        'Toi-Gye ( 37 Movements )'
      ],
      explanation: 'Joong-Gun is the pattern for 4th Kup, containing 32 movements.'
    },
    {
      id: 'theory-joonggun-movements',
      prompt: 'How many movements are in the pattern Joong-Gun?',
      correctAnswer: '32 Movements',
      distractors: ['28 Movements', '38 Movements', '37 Movements'],
      explanation: 'Joong-Gun has 32 movements.'
    },
    {
      id: 'theory-joonggun-meaning',
      prompt: 'What is the meaning of the pattern Joong-Gun?',
      correctAnswer: 'Named after patriot An Joong-Gun who assassinated Hiro-Bumi Ito, the first Japanese governor general of Korea.',
      distractors: [
        'Named after patriot Ahn Chang-Ho who devoted his life to education.',
        'Named after philosopher Yi I, nicknamed the Confucius of Korea.',
        'Named after the holy founder of Korea in 2333 B.C.'
      ],
      explanation: 'Joong-Gun is named after the patriot An Joong-Gun.'
    },
    {
      id: 'theory-joonggun-32-movements',
      prompt: 'What do the 32 movements in Joong-Gun represent?',
      correctAnswer: "Mr An's age when he was executed at Lui-Shung prison (1910)",
      distractors: [
        'His birth place on 32 degrees latitude',
        'The 32 provinces of ancient Korea',
        'The 32 disciples of Buddhism'
      ],
      explanation: "The 32 movements represent Mr An's age when executed at Lui-Shung prison in 1910."
    },
    {
      id: 'theory-joonggun-execution-year',
      prompt: 'In what year was An Joong-Gun executed at Lui-Shung prison?',
      correctAnswer: '1910',
      distractors: ['1938', '1584', '686'],
      explanation: 'An Joong-Gun was executed at Lui-Shung prison in 1910.'
    },
    {
      id: 'theory-red-belt-meaning',
      prompt: 'What is the meaning of the Red Belt / Stripe?',
      correctAnswer: 'Signifies Danger, cautioning the student to exercise control, and warning the opponent to stay away.',
      distractors: [
        'Signifies the Heaven towards which the plant matures into a towering tree.',
        "Signifies the plant's growth as Tae Kwon-Do skills begin to develop.",
        'Signifies innocence, as that of a beginning student.'
      ],
      explanation: 'Red signifies danger, cautioning control and warning opponents.'
    },
    {
      id: 'theory-san-makgi',
      prompt: 'What block is San Makgi?',
      correctAnswer: 'W-Shape Block',
      distractors: ["'U' shaped block (Digutja makgi)", 'Circular block (Dollymio makgi)', 'Wedging block (Hechyo makgi)'],
      explanation: 'San Makgi is W-Shape Block.'
    },
    {
      id: 'theory-twimyo-chagi',
      prompt: 'What technique is Twimyo chagi?',
      correctAnswer: 'Flying kick',
      distractors: ['Vertical kick (Sewo chagi)', 'Downward kick (Naeryo chagi)', 'Twisting kick (Bituro chagi)'],
      explanation: 'Twimyo chagi is flying/jumping kick.'
    },
    {
      id: 'theory-pad-work-korean',
      prompt: 'What is the Korean term for Pad Work?',
      correctAnswer: 'Byogae',
      distractors: ['Matsoki', 'Tulgi', 'Taerigi'],
      explanation: 'Byogae is pad work training.'
    },
    {
      id: 'theory-ibo-step-5',
      prompt: 'In Two-Step Sparring routine 5, what is the counter-attack?',
      correctAnswer: 'Right walking stance reverse knife hand middle inward strike (slipping right foot)',
      distractors: [
        'Left side kick while holding grabbed arm',
        'Right high reverse turning kick',
        "Left 'X' stance backfist high side strike"
      ],
      explanation: 'Routine 5 counter is right walking stance reverse knife hand middle inward strike.'
    },
    {
      id: 'theory-ibo-step-6',
      prompt: 'In Two-Step Sparring routine 6, what is the counter-attack?',
      correctAnswer: 'Left side kick (still holding the grabbed arm)',
      distractors: [
        'Right walking stance reverse knife hand inward strike',
        'Right high reverse turning kick',
        'Twin fist vertical punch'
      ],
      explanation: 'Routine 6 counter is left side kick while holding the opponent grabbed arm.'
    },
    {
      id: 'theory-ibo-step-7',
      prompt: 'In Two-Step Sparring routine 7, what is the counter-attack?',
      correctAnswer: 'Right high reverse turning kick',
      distractors: [
        "Left 'X' stance backfist high side strike",
        'Right walking stance reverse knife hand inward strike',
        'Left side kick holding grabbed arm'
      ],
      explanation: 'Routine 7 counter is right high reverse turning kick.'
    },
    {
      id: 'theory-ibo-step-8',
      prompt: 'In Two-Step Sparring routine 8, what is the counter-attack?',
      correctAnswer: "Left 'X' stance backfist high side strike",
      distractors: [
        'Right high reverse turning kick',
        'Right walking stance reverse knife hand inward strike',
        'Slide forward into right L-stance side elbow'
      ],
      explanation: "Routine 8 counter is left 'X' stance backfist high side strike."
    }
  ],

  sparringSequence: [
    {
      step: 5,
      action: "ATTACK Right reverse side kick, left walking stance open fist high strike. DEFENCE Right 'L' stance palm waist block, left 'L' stance outer forearm inward block. COUNTER Right walking stance reverse knife hand middle inward strike (slipping right foot)."
    },
    {
      step: 6,
      action: "ATTACK Right high turning kick, left walking stance arc-hand high strike. DEFENCE Sitting stance twin straight forearm block (moving left foot diagonal), right 'L' stance palm hooking block (grabbing arm). COUNTER Left side kick (still holding grabbed arm)."
    },
    {
      step: 7,
      action: "ATTACK Right fixed stance side fist side strike, left middle reverse turning kick. DEFENCE Left 'L' stance twin forearm block, right 'L' stance knife hand guarding block (sliding away using block as guard only). COUNTER Right high reverse turning kick."
    },
    {
      step: 8,
      action: "ATTACK Right middle side kick, right 'L' stance knife hand high side strike (turning anticlockwise). DEFENCE Right 'L' stance inner forearm inward waist block, right 'L' stance knifehand guarding block (stepping foot side foot). COUNTER Left 'X' stance backfist high side strike."
    }
  ],
  notes: 'Two Step Sparring (Ibo Matsoki Advanced 5 to 8), Pad Work (Byogae), and Semi Free Sparring Advanced required for 4th Kup.'
};
