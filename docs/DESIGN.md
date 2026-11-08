# Game Design & Educational Philosophy

This document outlines the product vision, pedagogical philosophy, game mechanics, and user experience design of **Tae Kwon-Do Trainer**.

---

## 1. Product Vision & Problem Statement

### The Problem
In traditional martial arts training—specifically within the **Tae Kwon-Do Association of Great Britain (TAGB)**—students spend hundreds of hours practicing physical techniques in the dojang (stances, patterns, sparring, and line work). However, to progress through the belt ranks ("Kups"), students must also pass a formal theory examination conducted by an external grading examiner.

This theory curriculum includes:
- Memorizing dozens of Korean names for body parts, stances, blocks, strikes, thrusts, and kicks.
- Pattern (*Tul*) names, movement counts, historical diagram interpretations, and philosophical meanings.
- Belt color symbolism.
- Multi-step sparring rules and attack/defense sequences.

**Traditional study methods (printed paper sheets or static flashcard apps) fail because:**
1. **Lack of Auditory Feedback**: Students read romanized Korean words on paper (e.g. *Najunde Bakat Palmok Makgi*) without hearing how they sound, leading to poor pronunciation and anxiety when an examiner calls them out verbally.
2. **No Pressure Simulation**: In a grading exam, the examiner calls commands quickly. Students must react instinctively, not pause to deliberate.
3. **Monotony & Lack of Engagement**: For young students (children and teens) especially, rote memorization feels like homework rather than martial arts practice.

### The Solution
**Tae Kwon-Do Trainer** reframes grading theory as a retro 1980s arcade martial arts action game. Instead of flipping passive flashcards, the student takes the role of a martial artist defending the dojang against oncoming challengers. Choosing the correct Korean technique executes an authentic punch, kick, or block; hesitating or making a mistake allows the opponent to strike.

---

## 2. The Combat Metaphor

Every encounter in the game translates cognitive recall into a physical martial arts action:

```
┌────────────────────────────────────────────────────────┐
│                        PROMPT                          │
│        "Front Snap Kick" / "Apcha Busigi"              │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   COGNITIVE RECALL                     │
│    Player selects answer from Action Deck (1, 2, 3, 4) │
└───────────────────────────┬────────────────────────────┘
                            │
           ┌────────────────┴────────────────┐
           ▼                                 ▼
┌──────────────────────┐          ┌──────────────────────┐
│    CORRECT ANSWER    │          │   INCORRECT ANSWER   │
├──────────────────────┤          ├──────────────────────┤
│ • Player attacks     │          │ • Player gets struck │
│ • Punch/Kick sound   │          │ • Takes 1 heart DMG  │
│ • Opponent defeated  │          │ • Streak resets to 0 │
│ • Score & combo rise │          │ • Logged for review  │
└──────────────────────┘          └──────────────────────┘
```

### Visual Metaphors:
- **Technique Prompts**: Answering a technique question (e.g. *Walking stance middle punch*) triggers an animation of the player executing that exact strike against the opponent.
- **Theory Prompts**: Answering general knowledge or belt symbolism questions delivers a decisive roundhouse kick or defensive block.
- **Dynamic Belts**: The player's sprite visibly wears the belt color and stripe matching the selected grade (e.g. solid yellow for 8th Kup, yellow with green stripe for 7th Kup).

---

## 3. Game Modes & Difficulty Curves

### 1. Standard Training Mode
- **Target Audience**: Students learning a new belt's syllabus for the first time.
- **Mechanics**:
  - Untimed: Students can take all the time they need to read, think, and click the audio replay button **`[🔊]`** to listen to the term repeatedly.
  - Generous health pool (3 hearts / 3 mistakes allowed before KO).
  - Designed for low-stress initial memorization.

### 2. Hard Mode (Speed & Reflex Training)
- **Target Audience**: Students preparing for an imminent grading exam.
- **Activation**: Toggle via the **`HARD MODE`** switch on the Main Menu or press `H`.
- **Mechanics**:
  - **Dynamic Speed Timer**: A countdown progress bar forces the student to answer within 4 seconds.
  - **Atmospheric Shift**: The dojang shifts to a high-stakes crimson and black color palette with an ominous warning tone upon launch.
  - **Reflex Reinforcement**: Simulates the examiner standing directly in front of the student calling out commands at rapid pace.

### 3. Cumulative "Grading Exam" Mode
- **Target Audience**: Realistic belt grading mock exams.
- **Activation**: Toggle via the **`EXAM`** switch on the Main Menu or press `C`.
- **Mechanics**:
  - In real TAGB belt promotions, examiners test students on both their **current belt requirements** and **any material from prior belts**.
  - When enabled, the deck builder pulls questions from the target belt (e.g. 7th Kup Green Tag) *and* all prerequisite belts (8th Kup Yellow Belt, 9th Kup Yellow Tag).
  - Questions are weighted so that the primary belt makes up the majority of the session, while lower belts appear periodically to test long-term retention.

---

## 4. Error Recovery & The Deliberate Practice Loop

A key educational philosophy of the game is that **mistakes are the primary vehicle for learning**. The game never penalizes students without providing immediate, actionable correction.

### 1. In-Combat Immediate Feedback
- When an incorrect answer is selected:
  - The correct button flashes bright green, while the chosen incorrect button flashes red.
  - The opponent delivers a counter-strike, and the player sprite flashes white in hit-stun.
  - The mistake is recorded in the session's mistake ledger.

### 2. End-of-Round Mistake Review
- On the **Result Screen**, if any mistakes were made, a dedicated **Mistake Review Panel** opens.
- Each missed question is presented with:
  - The original prompt.
  - Your incorrect answer (shown in red).
  - The correct answer (shown in vibrant green).
  - An instant **Audio Replay Button `[🔊]`** allowing the student to listen to the correct Korean pronunciation as many times as desired.

### 3. Focused Recovery Mode (`[RETRY MISSED]`)
- Below the mistake ledger, a high-priority **`[RETRY MISSED]`** button appears.
- Clicking it immediately launches a customized recovery round consisting **only of the questions missed in that session**.
- This creates an airtight **deliberate practice loop**: Learn $\rightarrow$ Test $\rightarrow$ Review Errors $\rightarrow$ Re-test Missed Items until mastery is reached.

---

## 5. Audio-Visual Design Philosophy

### 1. 1980s Retro Arcade Aesthetic
- **Visuals**: Inspired by 1985 arcade classic *Kung-Fu Master* and early NES fighting games. Rendered in pixelated 8-bit styling using a limited color palette.
- **Typography**: The Google font `'Press Start 2P'` is used consistently for all headings, dialogue, and move cards to preserve the arcade feel.
- **Zero Asset Bloat**: All sprites, banners, and textures are drawn using offscreen HTML5 canvas operations at boot. The game loads instantly even on poor mobile cellular connections.

### 2. Audio Design: Chiptune + Authentic Voice
- **Sound Effects**: Procedurally synthesized via Web Audio API oscillators. Crisp square wave chimes celebrate correct answers, while crunching noise bursts accompany punches and kicks.
- **Dual Voice Philosophy**:
  - **Authentic Korean**: Native Hangul text synthesized via Korean text-to-speech engines ensures accurate vowels, consonants, and cadence.
  - **Instructor English**: Phonetic English transliterations (e.g. *"Guhn noon Soh gee"*) allow students trained by British instructors to recognize commands exactly as called in UK training halls.
  - **Full Customization**: The in-game Voice Config screen (`⚙️ VOICE`) gives parents and students full control over whichever voice sounds clearest on their specific phone or computer.

---

## 6. User Experience & Accessibility

- **Keyboard & Touch Parity**: Every action in the game can be performed either with mouse/touch or entirely via keyboard shortcuts (`1-4` for answers, `Space`/`Enter` for menus, `V` for voice, `S` for stats, `H` for hard mode).
- **High-Contrast Readability**: Question banners feature dark backgrounds with high-contrast text (`#ffe135` yellow prompts, `#00ff88` green accents) ensuring legibility on small mobile displays under daylight.
- **Zero Data Privacy Intrusion**: All data is saved exclusively on the student's device (`localStorage`). No tracking scripts, no third-party cookies, and no advertisements.
