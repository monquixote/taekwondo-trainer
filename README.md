# 🥋 Tae Kwon-Do Trainer: 8-Bit Terminology Challenge

[![Deploy to GitHub Pages](https://github.com/monquixote/taekwondo-trainer/actions/workflows/deploy.yml/badge.svg)](https://github.com/monquixote/taekwondo-trainer/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-brightgreen?style=flat&logo=github)](https://monquixote.github.io/taekwondo-trainer/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Phaser 3](https://img.shields.io/badge/Engine-Phaser%203.88-orange?logo=phaser)](https://phaser.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An authentic 8-bit retro arcade kung-fu martial arts game that gamifies **Tae Kwon-Do Association of Great Britain (TAGB)** grading theory, Korean terminology, stances, blocks, kicks, patterns, and sparring.

---

## 🎮 Play Online

Play immediately in your browser on desktop, tablet, or mobile:
👉 **[https://monquixote.github.io/taekwondo-trainer/](https://monquixote.github.io/taekwondo-trainer/)**

---

## 🎯 What Is This Game For?

Preparing for a martial arts belt grading exam requires memorizing dozens of foreign terminology terms, Korean names for stances, strikes, and blocks, pattern meanings, movement counts, and theory history. For young students and adult practitioners alike, rote flashcard drilling can be dry and exhausting.

**Tae Kwon-Do Trainer** transforms grade preparation into a fast-paced, retro 1980s arcade beat-'em-up in the spirit of NES *Kung-Fu Master*. To defend against oncoming opponents in the dojang, the player must identify the correct Korean technique or theory answer under pressure.

### Key Goals:
- **Zero-Friction Grading Preparation**: Complete coverage of TAGB belt requirements from 9th Kup (Yellow Tag) through 7th Kup (Green Tag) and beyond.
- **Spaced Repetition Without Tedium**: An intelligent deck-building algorithm that monitors individual student weaknesses and serves challenging terms more frequently without frustrating immediate repeats.
- **Auditory Memory Reinforcement**: Native voice synthesis calling out commands in authentic Korean or instructor phonetics.
- **Exam Readiness**: A cumulative "Grading Exam" mode that tests students across their current belt *and* all prior belts, exactly mirroring how grading examiners test students.

---

## 🥋 Core Features

### 1. Authentic TAGB Syllabus Content (9th to 2nd Kup)
- **9th Kup (White Belt / Yellow Tag)**: Walking stance (*Gunnun Sogi*), L-stance (*Niunja Sogi*), Front Snap Kick (*Apcha Busigi*), low/middle blocks, and the 19 movements of pattern **Chon-Ji**.
- **8th Kup (Yellow Belt)**: Fixed stance (*Gojung Sogi*), Twin fist vertical punch (*Sang Joomuk sewo Jirugi*), Backfist side strike, Wedging block (*Hechyo Makgi*), and the 21 movements of pattern **Dan-Gun**.
- **7th Kup (Yellow Belt / Green Tag)**: Heel (*Dwitchhook*), Palm (*Sonbadak*), Toes (*Balkut*), Low stance (*Nachuo Sogi*), Rear foot stance (*Dwitbal Sogi*), Flat fingertip thrust (*Opun Sonkut Tulgi*), Circular block (*Dollymio Makgi*), Reverse turning kick (*Bandae Dollyo Chagi*), 3-step sparring (*Sambo Matsoki* 1–7), and the 24 movements of pattern **Do-San**.
- **6th Kup (Green Belt)**: Elbow (*Palkup*), Knee (*Moorup*), Side sole (*Yop Bal Badak*), Reverse footsword (*Bakal Dung*), Sole (*Kumchi*), Bending ready stance (*Guburyo jumbi sogi*), Crescent kick (*Bandal chagi*), Double forearm block (*Doo palmok makgi*), 3-step sparring (*Sambo Matsoki* 8–10), and the 28 movements of pattern **Won-Hyo**.
- **5th Kup (Green Belt / Blue Tag)**: Arc hand (*Bandalson*), 'X' stance (*Kyocha Sogi*), Downward punch (*Naeryo jirugi*), High elbow strike (*Nopun palkup taerigi*), 'U' shaped block (*Digutja makgi*), 'X' fist rising block (*Kyocha joomuk chookyo makgi*), Two-step sparring (*Ibo Matsoki* 1–4), and the 38 movements of pattern **Yul-Gok**.
- **4th Kup (Blue Belt)**: Vertical kick (*Sewo chagi*), Downward kick (*Naeryo chagi*), Flying kick (*Twimyo chagi*), W-Shape block (*San Makgi*), Double forearm pushing block (*Doo palmok miro makgi*), Angle punch (*Giokja jirugi*), Upset fingertip thrust (*Dwijibun sonkut tulgi*), Two-step sparring (*Ibo Matsoki* 5–8), Pad work (*Byogae*), and the 32 movements of pattern **Joong-Gun**.
- **3rd Kup (Blue Belt / Red Tag)**: Vertical stance (*Soojik Sogi*), Upward punch (*Ollyo Jirugi*), Palm pushing block (*Sonbadak miro makgi*), Knife hand downward strike (*Sonkal naeryo taerigi*), Flying back piercing kick (*Twimyo dwit cha jirugi*), Twin foot front kick (*Sangbal apcha busigi*), One-step sparring (*Ilbo Matsoki*), and the 37 movements of pattern **Toi-Gye**.
- **2nd Kup (Red Belt)**: Close ready 'C' (*Moa Jumbi 'C'*), Twisting kick (*Bituro chagi*), Jumping kick (*Twimyo chagi*), 'X' fist middle side block (*Kyocha joomuk yop makgi*), Twin palm upward block (*Sang sonbadak ollyo makgi*), Advanced One-step sparring, and the 29 movements of pattern **Hwa-Rang**.

### 2. Smart Spaced-Repetition & Zero Immediate Repeats
- Incorporates a weighted sampling algorithm based on student performance history.
- Never serves the exact same question twice in a single round.
- Weighs unpracticed and recently missed terms higher so they appear earlier in training sessions.

### 3. Cumulative "Grading Exam" Mode
- Toggle between single-belt focus and comprehensive grading exam.
- In **Grading Exam** mode, questions pull from both the target belt and all prerequisite belts, ensuring total curriculum mastery before real-world belt examinations.

### 4. Interactive End-of-Round "Mistake Review"
- At the end of every round, all incorrect answers are summarized with the question prompt, what you answered, the correct answer, and an instant **Replay Audio [🔊]** button.
- A dedicated **`[RETRY MISSED]`** button launches a focused recovery round with *only* the questions missed in that session.

### 5. Multi-Lingual Speech Synthesis & Voice Picker
- Powered by the browser's native Web Speech API.
- Native Korean Hangul pronunciation for authentic Korean sounds.
- English phonetic transliterations tailored for students of British TAGB instructors.
- In-game **Voice Configuration Menu (`⚙️ VOICE`)** to audition, filter (`ALL`, `KOREAN`, `ENGLISH`), and select any voice installed on the device, with pitch modulation controls.

### 6. Procedural 8-Bit Pixel Art & Retro Audio
- 100% procedurally generated NES Kung-Fu graphics via HTML5 Canvas (zero image asset loading lag).
- Procedural chiptune sound effects generated via Web Audio API oscillators and noise generators (punches, kicks, blocks, defeats, combo streaks).
- Dynamic belt and stripe rendering matching the student's selected grade on both character sprites and UI badges.

---

## 🕹️ Controls

| Action | Keyboard | Touch / Mobile |
| :--- | :--- | :--- |
| **Select Answer** | Number Keys `1`, `2`, `3`, `4` | Tap Answer Card |
| **Replay Spoken Term** | Key `R` | Tap `🔊` Speaker Icon |
| **Change Grade (Menu)** | `Left` / `Right` Arrow Keys | Tap `◀` / `▶` Buttons |
| **Start Game** | `Space` / `Enter` | Tap `START GAME` |
| **Hard Mode Toggle** | Key `H` | Tap `HARD MODE` |
| **Exam Mode Toggle** | Key `C` | Tap `EXAM` |
| **Voice Configuration**| Key `V` | Tap `⚙️ VOICE` |
| **Performance Stats** | Key `S` | Tap `VIEW STATS` |
| **Back / Main Menu** | `Esc` / Key `M` | Tap `BACK` |

---

## 🛠️ Tech Stack & Architecture

- **Game Engine**: [Phaser 3](https://phaser.io/) (v3.88.2) — Arcade physics, container-based UI, procedural canvas rendering.
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.7.3) — Strict type safety for data models, encounters, and state.
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/) (v6.2.0) — Lightning-fast HMR and optimized production bundling.
- **Audio Engine**: 
  - Procedural 8-bit sound effects synthesized via **Web Audio API** oscillators.
  - Speech synthesis powered by **Web Speech API** (`window.speechSynthesis`).
- **Persistence**: Browser `localStorage` for player statistics, rolling accuracy, selected grades, and voice preferences.
- **CI/CD**: Automatic GitHub Actions workflow building and deploying to **GitHub Pages** on every push to `main`.

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation

```bash
# Clone repository
git clone https://github.com/monquixote/taekwondo-trainer.git
cd taekwondo-trainer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` (or the port displayed in your terminal) to play and test changes with instant Hot Module Replacement (HMR).

### Build for Production

```bash
# Typecheck and compile production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

### Running Tests

```bash
# Run syllabus data integrity verification
npm test
```

---

## 📚 Detailed Documentation

For deep-dive documentation on architecture, design, and syllabus content, see:

1. **[Technical Architecture & Engineering Guide](docs/TECHNICAL.md)**: Engine lifecycle, scene state machine, procedural assets, audio synthesis, deck generation algorithm, and mobile optimization.
2. **[Game Design & Educational Philosophy](docs/DESIGN.md)**: Game mechanics, combat pacing, spaced repetition formulas, gamification psychology, visual aesthetic, and accessibility.
3. **[TAGB Syllabus & Terminology Reference](docs/SYLLABUS.md)**: Belt requirements, terminology dictionary, pattern movement guides, 3-step sparring breakdown, and how to add higher Kup grades.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
Tae Kwon-Do terminology and syllabus references are based on the standard syllabus of the **Tae Kwon-Do Association of Great Britain (TAGB)** / International Taekwon-Do Federation (ITF).
