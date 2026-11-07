import type { KupGrade } from '../types.ts';

export const kup7: KupGrade = {
  id: '7th-kup',
  gradeNumber: 7,
  title: '7th Kup - Yellow Belt (Green Tag)',
  beltColor: '#ffe135',
  stripeColor: '#10b981',
  pattern: {
    name: 'Do-San',
    movements: 24,
    meaning: "Do-San is the pseudonym of the patriot Ahn Ch'ang Ho (1876-1938) who devoted his entire life to furthering the education of Korea and its independent movement."
  },
  beltMeaning: "Green signifies the plant's growth as Tae Kwon-Do skills begin to develop.",
  terms: [
    // Parts of Body
    {
      id: '7th-heel',
      category: 'body_part',
      english: 'Heel',
      korean: 'Dwitchhook',
      notes: 'Parts of Body - used in kicks and foot strikes'
    },
    {
      id: '7th-palm',
      category: 'body_part',
      english: 'Palm',
      korean: 'Sonbadak',
      notes: 'Parts of Body - used in palm blocks and pressing'
    },
    {
      id: '7th-toes',
      category: 'body_part',
      english: 'Toes',
      korean: 'Balkut',
      notes: 'Parts of Body - tips of the toes'
    },

    // Stances
    {
      id: '7th-low-stance',
      category: 'stance',
      english: 'Low',
      korean: 'Nachuo',
      notes: 'As in Nachuo Sogi (Low Stance)'
    },
    {
      id: '7th-rear-foot-stance',
      category: 'stance',
      english: 'Rear foot',
      korean: 'Dwitbal',
      notes: 'As in Dwitbal Sogi (Rear Foot Stance)'
    },

    // Misc Technical
    {
      id: '7th-flat-fingertip-thrust',
      category: 'thrust',
      english: 'Flat Fingertip Thrust',
      korean: 'Opun Sonkut Tulgi',
      notes: 'Executed horizontally with palm facing downwards'
    },
    {
      id: '7th-circular-block',
      category: 'block',
      english: 'Circular block',
      korean: 'Dollymio Makgi',
      notes: 'Inner forearm circular block executed in Do-San'
    },
    {
      id: '7th-palm-upward-block',
      category: 'block',
      english: 'Palm upward block',
      korean: 'Sonbadak Ollyo Makgi',
      notes: 'Deflecting an upward attack using the palm'
    },
    {
      id: '7th-reverse-turning-kick',
      category: 'kick',
      english: 'Reverse turning kick',
      korean: 'Bandae Dollyo Chagi',
      notes: 'Striking with the heel or back of foot in reverse rotation'
    },
    {
      id: '7th-reverse-knifehand',
      category: 'technique',
      english: 'Reverse Knifehand',
      korean: 'Sonkal Dung',
      notes: 'Striking with the thumb side edge of the open hand'
    },
    {
      id: '7th-release-from-grab',
      category: 'technique',
      english: 'Release from grab',
      korean: 'Jappyosul Tae',
      notes: 'Self-defence escape technique when grabbed'
    }
  ],

  theory: [
    {
      id: 'theory-dosan-pattern',
      prompt: 'What is the 7th Kup Pattern?',
      correctAnswer: 'Do-San ( 24 Movements )',
      distractors: [
        'Dan-Gun ( 21 Movements )',
        'Chon-Ji ( 19 Movements )',
        'Won-Hyo ( 28 Movements )'
      ],
      explanation: 'Do-San is the pattern for 7th Kup, containing 24 movements.'
    },
    {
      id: 'theory-dosan-movements',
      prompt: 'How many movements are in the pattern Do-San?',
      correctAnswer: '24 Movements',
      distractors: ['19 Movements', '21 Movements', '28 Movements'],
      explanation: 'Do-San has 24 movements.'
    },
    {
      id: 'theory-dosan-meaning',
      prompt: 'What is the meaning of the Do-San pattern?',
      correctAnswer: "Do-San is the pseudonym of the patriot Ahn Ch'ang Ho (1876-1938) who devoted his entire life to furthering the education of Korea and its independent movement.",
      distractors: [
        'Dan-Gun is named after the holy Dan-Gun, legendary founder of Korea in 2333 B.C.',
        'Chon-Ji literally means "the Heaven the Earth", the creation of the world.',
        'Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty in 686 A.D.'
      ],
      explanation: "Do-San is the pseudonym of educator and patriot Ahn Ch'ang Ho."
    },
    {
      id: 'theory-green-tag-meaning',
      prompt: 'What is the meaning of the Green Tag / Belt?',
      correctAnswer: "Signifies the plant's growth as Tae Kwon-Do skills begin to develop.",
      distractors: [
        'Signifies the earth from which a plant sprouts and takes root.',
        'Signifies danger, cautioning the student to exercise control.',
        'Signifies innocence, as that of a beginning student.'
      ],
      explanation: "Green signifies the plant's growth as Tae Kwon-Do skills begin to develop."
    },
    {
      id: 'theory-3-step-sparring-requirement',
      prompt: 'Which 3-step sparring routines are required for 7th Kup grading?',
      correctAnswer: 'Steps 1 to 7',
      distractors: ['Steps 1 to 4', 'Steps 5 to 7 only', 'Steps 1 to 10'],
      explanation: '7th Kup requires knowledge and performance of 3-step sparring numbers 1 through 7.'
    },
    {
      id: 'theory-sparring-step-5',
      prompt: 'In 3-step sparring step 5, what is the third move after pivoting into sitting stance?',
      correctAnswer: 'Simultaneously block and punch',
      distractors: [
        'Double punch in walking stance',
        'Inward knife hand high strike to neck',
        'Front snap kick with back leg'
      ],
      explanation: 'Move right pivoting on left foot into sitting stance, simultaneously block and punch.'
    },
    {
      id: 'theory-sparring-step-6',
      prompt: 'In 3-step sparring step 6, what is the third move counter-attack to the neck?',
      correctAnswer: 'Inward knife hand high strike with right knife hand',
      distractors: [
        'Reverse knifehand strike',
        'Back fist side strike',
        'Twin vertical punch'
      ],
      explanation: 'Pivot as step 5, block and inward knife hand high strike to neck with right knife hand.'
    },
    {
      id: 'theory-sparring-step-7',
      prompt: 'In 3-step sparring step 7, what is the counter sequence after the L-stance guarding block?',
      correctAnswer: 'Back leg front snap kick, then double punch in walking stance',
      distractors: [
        'Side piercing kick, then reverse knifehand strike',
        'Reverse turning kick, then single punch',
        'Turning kick with front leg, then high punch'
      ],
      explanation: 'Slide into right L-stance middle forearm guarding block, back leg front snap kick, place foot down into right walking stance double punch.'
    },
    {
      id: 'theory-dwitchhook',
      prompt: 'What part of the body is Dwitchhook?',
      correctAnswer: 'Heel',
      distractors: ['Toes (Balkut)', 'Palm (Sonbadak)', 'Instep (Baldung)'],
      explanation: 'Dwitchhook is the Korean term for heel.'
    },
    {
      id: 'theory-sonbadak',
      prompt: 'What part of the body is Sonbadak?',
      correctAnswer: 'Palm',
      distractors: ['Finger tips (Sonkut)', 'Backfist (Dung Joomuk)', 'Forearm (Palmok)'],
      explanation: 'Sonbadak is the Korean term for palm.'
    },
    {
      id: 'theory-balkut',
      prompt: 'What part of the body is Balkut?',
      correctAnswer: 'Toes',
      distractors: ['Heel (Dwitchhook)', 'Ball of foot (Ap Kumchi)', 'Footsword (Balkal)'],
      explanation: 'Balkut is the Korean term for toes.'
    },
    {
      id: 'theory-release-from-grab',
      prompt: 'What is the Korean term for Release from grab?',
      correctAnswer: 'Jappyosul Tae',
      distractors: ['Hechyo Makgi', 'Dollymio Makgi', 'Bandae Dollyo Chagi'],
      explanation: 'Jappyosul Tae means release from a grab.'
    }
  ],

  sparringSequence: [
    {
      step: 5,
      action: "Right leg back, right ‘L’ stance outer forearm block with left arm to in side of punch. Third move, move right pivoting on left foot into sitting stance simultaneously block and punch."
    },
    {
      step: 6,
      action: "As last move but block knife hand. Third move, pivot as 5, block and inward knife hand high strike to neck with right knife hand."
    },
    {
      step: 7,
      action: "Right leg back, right ‘L’ stance outer forearm block with left arm to inside of punch. Third move, slide back into right ‘L’ stance middle forearm guarding block then front snap kick with back leg to mid section place foot down into right walking stance double punch."
    }
  ],
  notes: "You may also be required to perform 3 step sparring (1 to 7) for this grading refer to your last worksheet."
};
