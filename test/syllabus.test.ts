import { ALL_GRADES, getGradeById } from '../src/data/grades/index.ts';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- Testing Complete TAGB Grades & Syllabus Data (9th to 2nd Kup) ---');

// 1. Verify all 8 grades exist in order
assert(ALL_GRADES.length === 8, `Expected 8 grades in syllabus, found ${ALL_GRADES.length}`);
const expectedGradeIds = [
  '9th-kup',
  '8th-kup',
  '7th-kup',
  '6th-kup',
  '5th-kup',
  '4th-kup',
  '3rd-kup',
  '2nd-kup'
];

for (let i = 0; i < expectedGradeIds.length; i++) {
  const expectedId = expectedGradeIds[i];
  const grade = ALL_GRADES[i];
  assert(grade.id === expectedId, `Grade index ${i} should be ${expectedId}, got ${grade.id}`);
  assert(getGradeById(expectedId).id === expectedId, `getGradeById("${expectedId}") failed`);
}
console.log('✓ All 8 grades registered and indexed in correct hierarchy');

// 2. Comprehensive check for every grade
for (const grade of ALL_GRADES) {
  assert(grade.title.length > 0, `Grade ${grade.id} title should not be empty`);
  assert(grade.beltColor.startsWith('#'), `Grade ${grade.id} belt color should be hex string`);
  assert(grade.pattern.name.length > 0, `Grade ${grade.id} pattern name missing`);
  assert(grade.pattern.movements > 0, `Grade ${grade.id} pattern movements must be > 0`);
  assert(grade.pattern.meaning.length > 10, `Grade ${grade.id} pattern meaning missing/short`);
  assert(grade.beltMeaning.length > 10, `Grade ${grade.id} belt meaning missing/short`);
  assert(grade.terms.length >= 4, `Grade ${grade.id} should have at least 4 terms`);
  assert(grade.theory.length >= 2, `Grade ${grade.id} should have at least 2 theory questions`);

  // Verify term integrity
  for (const t of grade.terms) {
    assert(t.id.length > 0, `Term id missing in ${grade.id}`);
    assert(t.english.length > 0, `English term missing in ${grade.id}`);
    assert(t.korean.length > 0, `Korean term missing for "${t.english}" in ${grade.id}`);
    assert(t.category.length > 0, `Category missing for "${t.english}" in ${grade.id}`);
  }

  // Verify theory question integrity
  for (const th of grade.theory) {
    assert(th.id.length > 0, `Theory question id missing in ${grade.id}`);
    assert(th.prompt.length > 0, `Theory prompt missing in ${grade.id}`);
    assert(th.correctAnswer.length > 0, `Correct answer missing for "${th.prompt}"`);
    assert(th.distractors.length >= 2, `Theory question "${th.prompt}" must have at least 2 distractors`);
    assert(!th.distractors.includes(th.correctAnswer), `Distractors must not contain correct answer for "${th.prompt}"`);
  }
}
console.log('✓ Generic data integrity verified across all 8 grades');

// 3. Verify 6th Kup (Green Belt - Won-Hyo)
const grade6 = getGradeById('6th-kup');
assert(grade6.pattern.name === 'Won-Hyo', '6th Kup pattern must be Won-Hyo');
assert(grade6.pattern.movements === 28, 'Won-Hyo must have 28 movements');
assert(grade6.pattern.meaning.includes('686 A.D.'), 'Won-Hyo meaning must mention 686 A.D.');
const studySheet6Terms = [
  'Elbow',
  'Knee',
  'Side sole',
  'Reverse Footsword',
  'Sole',
  'Knee Kick',
  'Crescent Kick',
  'Twin knife hand block',
  'Double forearm block',
  'Crescent punch'
];
for (const term of studySheet6Terms) {
  const found = grade6.terms.find(t => t.english.toLowerCase() === term.toLowerCase());
  assert(!!found, `Expected term "${term}" in 6th Kup`);
}
console.log('✓ 6th Kup (Won-Hyo, 28 moves, 686 A.D.) verified');

// 4. Verify 5th Kup (Green Belt Blue Tag - Yul-Gok)
const grade5 = getGradeById('5th-kup');
assert(grade5.pattern.name === 'Yul-Gok', '5th Kup pattern must be Yul-Gok');
assert(grade5.pattern.movements === 38, 'Yul-Gok must have 38 movements');
assert(grade5.pattern.meaning.includes('1536-1584'), 'Yul-Gok meaning must mention 1536-1584');
const studySheet5Terms = [
  'Arc hand',
  "'X' Stance",
  'Downward punch',
  'High elbow strike',
  "'U' shaped block",
  "'X' fist rising block"
];
for (const term of studySheet5Terms) {
  const found = grade5.terms.find(t => t.english.toLowerCase() === term.toLowerCase());
  assert(!!found, `Expected term "${term}" in 5th Kup`);
}
console.log('✓ 5th Kup (Yul-Gok, 38 moves, 1536-1584 A.D.) verified');

// 5. Verify 4th Kup (Blue Belt - Joong-Gun)
const grade4 = getGradeById('4th-kup');
assert(grade4.pattern.name === 'Joong-Gun', '4th Kup pattern must be Joong-Gun');
assert(grade4.pattern.movements === 32, 'Joong-Gun must have 32 movements');
assert(grade4.pattern.meaning.includes('1910'), 'Joong-Gun meaning must mention 1910');
assert(grade4.beltMeaning.includes('Danger'), 'Red belt meaning must mention Danger');
const studySheet4Terms = [
  'Vertical kick',
  'Downward kick',
  'Flying kick',
  'W-Shape Block',
  'Angle punch',
  'Upset finger tip thrust'
];
for (const term of studySheet4Terms) {
  const found = grade4.terms.find(t => t.english.toLowerCase() === term.toLowerCase());
  assert(!!found, `Expected term "${term}" in 4th Kup`);
}
console.log('✓ 4th Kup (Joong-Gun, 32 moves, 1910) verified');

// 6. Verify 3rd Kup (Blue Belt Red Tag - Toi-Gye)
const grade3 = getGradeById('3rd-kup');
assert(grade3.pattern.name === 'Toi-Gye', '3rd Kup pattern must be Toi-Gye');
assert(grade3.pattern.movements === 37, 'Toi-Gye must have 37 movements');
assert(grade3.pattern.meaning.includes('16th Century A.D.'), 'Toi-Gye meaning must mention 16th Century A.D.');
const studySheet3Terms = [
  'Vertical Stance',
  'Upward punch',
  'Palm pushing block',
  'Flying back piercing kick',
  'Twin foot front kick'
];
for (const term of studySheet3Terms) {
  const found = grade3.terms.find(t => t.english.toLowerCase() === term.toLowerCase());
  assert(!!found, `Expected term "${term}" in 3rd Kup`);
}
console.log('✓ 3rd Kup (Toi-Gye, 37 moves, 16th Century A.D.) verified');

// 7. Verify 2nd Kup (Red Belt - Hwa-Rang)
const grade2 = getGradeById('2nd-kup');
assert(grade2.pattern.name === 'Hwa-Rang', '2nd Kup pattern must be Hwa-Rang');
assert(grade2.pattern.movements === 29, 'Hwa-Rang must have 29 movements');
assert(grade2.pattern.meaning.includes('1350'), 'Hwa-Rang meaning must mention 1350 years ago');
assert(grade2.beltMeaning.includes('Black is opposite to white'), 'Black belt meaning must be present');
const studySheet2Terms = [
  "Close ready 'C'",
  'Twisting kick',
  'Jumping kick',
  "'X' fist middle side block",
  'Twin palm upward block'
];
for (const term of studySheet2Terms) {
  const found = grade2.terms.find(t => t.english.toLowerCase() === term.toLowerCase());
  assert(!!found, `Expected term "${term}" in 2nd Kup`);
}
console.log('✓ 2nd Kup (Hwa-Rang, 29 moves, 1350 years ago) verified');

console.log('\n🥋 ALL 8 TAGB GRADES & STUDY SHEET REQUIREMENTS VERIFIED SUCCESSFULLY! 🥋\n');
