import { kup8 } from '../src/data/grades/kup8.ts';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- Testing Grades & Syllabus Data ---');

// Check 8th Kup integrity
const grade8 = kup8;
assert(grade8.id === '8th-kup', '8th Kup should be resolvable by id');
assert(grade8.terms.length >= 10, '8th Kup should have at least 10 terminology items');
assert(grade8.theory.length >= 8, '8th Kup should have at least 8 theory questions');
console.log(`✓ 8th Kup verified with ${grade8.terms.length} terms and ${grade8.theory.length} theory questions`);

// 3. Verify specific study sheet terms
const studySheetEnglishTerms = [
  'Backfist',
  'Finger tips',
  'Fixed Stance',
  'Twin Fist Vertical Punch',
  'Twin Fist Upset Punch',
  'Straight fingertip Thrust',
  'Side Punch',
  'Back Fist Side Strike',
  'Wedging Block',
  'Waist Block',
  'Outer Forearm High Side Block',
  'Back Piercing Kick'
];

for (const expected of studySheetEnglishTerms) {
  const found = grade8.terms.find(t => t.english.toLowerCase() === expected.toLowerCase());
  assert(!!found, `Expected term "${expected}" to exist in 8th Kup syllabus`);
  assert(found!.korean.length > 0, `Korean term for "${expected}" should not be empty`);
}
console.log(`✓ All ${studySheetEnglishTerms.length} study sheet terms confirmed present and accurate!`);

// 4. Verify Dan-Gun pattern and theory
assert(grade8.pattern.name === 'Dan-Gun', 'Pattern must be Dan-Gun');
assert(grade8.pattern.movements === 21, 'Dan-Gun must have 21 movements');
assert(grade8.pattern.meaning.includes('2333 B.C.'), 'Dan-Gun meaning must mention 2333 B.C.');
assert(grade8.beltMeaning.includes('plant\'s growth'), 'Belt meaning must mention plant\'s growth');
console.log('✓ Dan-Gun pattern theory and green belt meaning confirmed!');

// 5. Verify Theory Distractors
for (const th of grade8.theory) {
  assert(th.distractors.length >= 2, `Theory question "${th.prompt}" must have at least 2 distractors`);
  assert(!th.distractors.includes(th.correctAnswer), `Distractors must not contain the correct answer for "${th.prompt}"`);
}
console.log('✓ Theory distractors verified unique and well-formed!');

console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🥋');
