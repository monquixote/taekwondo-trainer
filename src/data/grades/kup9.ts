import { KupGrade } from '../types';

export const kup9: KupGrade = {
  id: '9th-kup',
  gradeNumber: 9,
  title: '9th Kup - White Belt (Yellow Stripe)',
  beltColor: '#ffffff',
  stripeColor: '#ffe135',
  pattern: {
    name: 'Chon-Ji',
    movements: 19,
    meaning: 'Chon-Ji literally means "the Heaven the Earth". In the Orient it is interpreted as the creation of the world.'
  },
  beltMeaning: 'Yellow signifies the earth from which a plant sprouts and takes root as the Tae Kwon-Do foundation is laid.',
  terms: [
    {
      id: '9th-walking-stance',
      category: 'stance',
      english: 'Walking Stance',
      korean: 'Gunnun Sogi',
      notes: '50/50 weight, 1.5 shoulder widths long'
    },
    {
      id: '9th-low-block',
      category: 'block',
      english: 'Low Block (Outer Forearm)',
      korean: 'Najunde Bakat Palmok Makgi',
      notes: 'First movement of Chon-Ji'
    },
    {
      id: '9th-middle-punch',
      category: 'strike',
      english: 'Middle Forefist Punch',
      korean: 'Kaunde Ap Joomuk Jirugi',
      notes: 'Targeting solar plexus'
    },
    {
      id: '9th-front-snap-kick',
      category: 'kick',
      english: 'Front Snap Kick',
      korean: 'Apcha Busigi',
      notes: 'Using the ball of the foot (Ap kumchi)'
    },
    {
      id: '9th-l-stance',
      category: 'stance',
      english: 'L-Stance',
      korean: 'Niunja Sogi',
      notes: '70/30 weight distribution'
    },
    {
      id: '9th-inner-forearm-middle-block',
      category: 'block',
      english: 'Inner Forearm Middle Block',
      korean: 'An Palmok Kaunde Makgi',
      notes: 'Second section of Chon-Ji'
    }
  ],
  theory: [
    {
      id: '9th-theory-chonji',
      prompt: 'What is the meaning of Chon-Ji?',
      correctAnswer: 'The Heaven and the Earth (Creation of the world)',
      distractors: [
        'Named after the holy Dan-Gun',
        'Pseudonym of patriot Ahn Chang-Ho',
        'The flower of Korean youth'
      ],
      explanation: 'Chon-Ji means the Heaven and the Earth.'
    },
    {
      id: '9th-theory-movements',
      prompt: 'How many movements in Chon-Ji?',
      correctAnswer: '19 Movements',
      distractors: ['21 Movements', '24 Movements', '14 Movements'],
      explanation: 'Chon-Ji has 19 movements.'
    }
  ]
};
