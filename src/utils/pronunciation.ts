import { soundFx } from './soundEffects';

interface PronunciationEntry {
  hangul: string;
  phonetic: string;
}

/**
 * Maps romanized ITF / TAGB Korean terminology to native Hangul script
 * for high-fidelity ko-KR speech synthesis, with phonetic English fallback.
 */
export const HANGUL_MAP: Record<string, PronunciationEntry> = {
  // 9th Kup
  'Gunnun Sogi': { hangul: '걷는 서기', phonetic: 'Guhn-noon Soh-gee' },
  'Najunde Bakat Palmok Makgi': { hangul: '낮은데 바깥 팔목 막기', phonetic: 'Nah-joon-deh Bah-kaht Pahl-mohk Mahk-gee' },
  'Kaunde Ap Joomuk Jirugi': { hangul: '가운데 앞 주먹 지르기', phonetic: 'Kah-oon-deh Ahp Joo-mook Jee-roo-gee' },
  'Apcha Busigi': { hangul: '앞차 부시기', phonetic: 'Ahp-chah Boo-shee-gee' },
  'Niunja Sogi': { hangul: '니은자 서기', phonetic: 'Nee-oon-jah Soh-gee' },
  'An Palmok Kaunde Makgi': { hangul: '안 팔목 가운데 막기', phonetic: 'Ahn Pahl-mohk Kah-oon-deh Mahk-gee' },
  'Chon-Ji': { hangul: '천지', phonetic: 'Chuhn-Jee' },

  // 8th Kup
  'Dung Joomuk': { hangul: '등 주먹', phonetic: 'Doong Joo-mook' },
  'Sonkut': { hangul: '손끝', phonetic: 'Sohn-koot' },
  'Gojung Sogi': { hangul: '고정 서기', phonetic: 'Goh-joong Soh-gee' },
  'Sang Joomuk sewo Jirugi': { hangul: '쌍 주먹 세워 지르기', phonetic: 'Sahng Joo-mook Seh-woh Jee-roo-gee' },
  'Sang Joomuk Dwijibo Jirugi': { hangul: '쌍 주먹 뒤집어 지르기', phonetic: 'Sahng Joo-mook Dwee-jee-boh Jee-roo-gee' },
  'Sun Sonkut Tulgi': { hangul: '선 손끝 뚫기', phonetic: 'Suhn Sohn-koot Tool-gee' },
  'Yop Jirugi': { hangul: '옆 지르기', phonetic: 'Yuhp Jee-roo-gee' },
  'Dung Joomuk Yop Taerigi': { hangul: '등 주먹 옆 때리기', phonetic: 'Doong Joo-mook Yuhp Teh-ree-gee' },
  'Hechyo Makgi': { hangul: '헤쳐 막기', phonetic: 'Heh-chyoh Mahk-gee' },
  'Hori Makgi': { hangul: '허리 막기', phonetic: 'Hoh-ree Mahk-gee' },
  'Hori Makgi ( Anuro/Bakuro )': { hangul: '허리 막기 안으로 밖으로', phonetic: 'Hoh-ree Mahk-gee' },
  'Bakat Palmok Nopunde Yop Makgi': { hangul: '바깥 팔목 높은데 옆 막기', phonetic: 'Bah-kaht Pahl-mohk Noh-poon-deh Yuhp Mahk-gee' },
  'Dwit Cha Jirugi': { hangul: '뒤차 지르기', phonetic: 'Dweet-chah Jee-roo-gee' },
  'Dan-Gun': { hangul: '단군', phonetic: 'Dahn-Goon' },

  // 7th Kup
  'Dwitchhook': { hangul: '뒤축', phonetic: 'Dwee-chook' },
  'Sonbadak': { hangul: '손바닥', phonetic: 'Sohn-bah-dahk' },
  'Balkut': { hangul: '발끝', phonetic: 'Bahl-koot' },
  'Nachuo': { hangul: '낮추어', phonetic: 'Nah-choo-oh' },
  'Dwitbal': { hangul: '뒷발', phonetic: 'Dweet-bahl' },
  'Opun Sonkut Tulgi': { hangul: '엎은 손끝 뚫기', phonetic: 'Uh-poon Sohn-koot Tool-gee' },
  'Opun sonkut tulgi': { hangul: '엎은 손끝 뚫기', phonetic: 'Uh-poon Sohn-koot Tool-gee' },
  'Dollymio Makgi': { hangul: '돌리며 막기', phonetic: 'Dohl-lee-myuh Mahk-gee' },
  'Dollymio makgi': { hangul: '돌리며 막기', phonetic: 'Dohl-lee-myuh Mahk-gee' },
  'Sonbadak Ollyo Makgi': { hangul: '손바닥 올려 막기', phonetic: 'Sohn-bah-dahk Ohl-lyoh Mahk-gee' },
  'Sonbadak ollyo makgi': { hangul: '손바닥 올려 막기', phonetic: 'Sohn-bah-dahk Ohl-lyoh Mahk-gee' },
  'Bandae Dollyo Chagi': { hangul: '반대 돌려 차기', phonetic: 'Bahn-deh Dohl-lyoh Chah-gee' },
  'Bandae dollyo chagi': { hangul: '반대 돌려 차기', phonetic: 'Bahn-deh Dohl-lyoh Chah-gee' },
  'Sonkal Dung': { hangul: '손칼 등', phonetic: 'Sohn-kahl Doong' },
  'Jappyosul Tae': { hangul: '잡혔을 때', phonetic: 'Jahp-hyuh-sool Teh' },
  'Jappyosul tae': { hangul: '잡혔을 때', phonetic: 'Jahp-hyuh-sool Teh' },
  'Do-San': { hangul: '도산', phonetic: 'Doh-Sahn' },

  // Individual Root Words (dictionary.ts)
  'Gunnun': { hangul: '걷는', phonetic: 'Guhn-noon' },
  'Sogi': { hangul: '서기', phonetic: 'Soh-gee' },
  'Najunde': { hangul: '낮은데', phonetic: 'Nah-joon-deh' },
  'Kaunde': { hangul: '가운데', phonetic: 'Kah-oon-deh' },
  'Nopunde': { hangul: '높은데', phonetic: 'Noh-poon-deh' },
  'Bakat': { hangul: '바깥', phonetic: 'Bah-kaht' },
  'An': { hangul: '안', phonetic: 'Ahn' },
  'Palmok': { hangul: '팔목', phonetic: 'Pahl-mohk' },
  'Makgi': { hangul: '막기', phonetic: 'Mahk-gee' },
  'Ap': { hangul: '앞', phonetic: 'Ahp' },
  'Joomuk': { hangul: '주먹', phonetic: 'Joo-mook' },
  'Jirugi': { hangul: '지르기', phonetic: 'Jee-roo-gee' },
  'Cha': { hangul: '차', phonetic: 'Chah' },
  'Chagi': { hangul: '차기', phonetic: 'Chah-gee' },
  'Busigi': { hangul: '부시기', phonetic: 'Boo-shee-gee' },
  'Niunja': { hangul: '니은자', phonetic: 'Nee-oon-jah' },
  'Dung': { hangul: '등', phonetic: 'Doong' },
  'Gojung': { hangul: '고정', phonetic: 'Goh-joong' },
  'Sang': { hangul: '쌍', phonetic: 'Sahng' },
  'Sewo': { hangul: '세워', phonetic: 'Seh-woh' },
  'Dwijibo': { hangul: '뒤집어', phonetic: 'Dwee-jee-boh' },
  'Sun': { hangul: '선', phonetic: 'Suhn' },
  'Tulgi': { hangul: '뚫기', phonetic: 'Tool-gee' },
  'Yop': { hangul: '옆', phonetic: 'Yuhp' },
  'Taerigi': { hangul: '때리기', phonetic: 'Teh-ree-gee' },
  'Hechyo': { hangul: '헤쳐', phonetic: 'Heh-chyoh' },
  'Hori': { hangul: '허리', phonetic: 'Hoh-ree' },
  'Anuro': { hangul: '안으로', phonetic: 'Ah-noo-roh' },
  'Bakuro': { hangul: '밖으로', phonetic: 'Bah-koo-roh' },
  'Dwit': { hangul: '뒤', phonetic: 'Dweet' },
  'Cha-Jirugi': { hangul: '차 지르기', phonetic: 'Chah Jee-roo-gee' },
  'Opun': { hangul: '엎은', phonetic: 'Uh-poon' },
  'Dollymio': { hangul: '돌리며', phonetic: 'Dohl-lee-myuh' },
  'Ollyo': { hangul: '올려', phonetic: 'Ohl-lyoh' },
  'Bandae': { hangul: '반대', phonetic: 'Bahn-deh' },
  'Dollyo': { hangul: '돌려', phonetic: 'Dohl-lyoh' },
  'Sonkal': { hangul: '손칼', phonetic: 'Sohn-kahl' },
  'Jappyosul': { hangul: '잡혔을', phonetic: 'Jahp-hyuh-sool' },
  'Tae': { hangul: '때', phonetic: 'Teh' }
};

export interface AvailableVoice {
  name: string;
  friendlyName: string;
  lang: string;
  voiceURI: string;
  isKorean: boolean;
  isEnglish: boolean;
  gender: 'male' | 'female' | 'unknown';
  isLocal: boolean;
  label: string;
  category: 'korean_male' | 'english_male' | 'korean_other' | 'english_other' | 'korean_female' | 'english_female';
}

export interface PronunciationResult {
  text: string;
  isHangul: boolean;
  hangulText: string;
  phoneticText: string;
}

export function parseVoiceMetadata(name: string, lang: string, voiceURI?: string): { friendlyName: string; gender: 'male' | 'female' | 'unknown' } {
  const lower = `${name} ${voiceURI || ''} ${lang}`.toLowerCase();

  // 1. Android Google TTS specific code checks
  if (lower.includes('en-gb-x-rjs')) return { friendlyName: 'Google UK English (Voice 2)', gender: 'male' };
  if (lower.includes('en-gb-x-fis')) return { friendlyName: 'Google UK English (Voice 1)', gender: 'female' };
  if (lower.includes('en-gb-x-gba') || lower.includes('en-gb-x-gbb') || lower.includes('en-gb-x-gbc') || lower.includes('en-gb-x-gbd')) {
    return { friendlyName: 'Google UK English (Voice 2)', gender: 'male' };
  }
  if (lower.includes('en-us-x-iom') || lower.includes('en-us-x-iol') || lower.includes('en-us-x-sfb') || lower.includes('en-us-x-sfd')) {
    return { friendlyName: 'Google US English (Voice 2)', gender: 'male' };
  }
  if (lower.includes('en-us-x-sfg') || lower.includes('en-us-x-tpf') || lower.includes('en-us-x-sfa') || lower.includes('en-us-x-sfc')) {
    return { friendlyName: 'Google US English (Voice 1)', gender: 'female' };
  }
  if (lower.includes('ko-kr-x-ism')) return { friendlyName: 'Google Korean (Voice 2)', gender: 'male' };
  if (lower.includes('ko-kr-x-koc')) return { friendlyName: 'Google Korean (Voice 3)', gender: 'male' };
  if (lower.includes('ko-kr-x-kod')) return { friendlyName: 'Google Korean (Voice 4)', gender: 'male' };
  if (lower.includes('ko-kr-x-kof')) return { friendlyName: 'Google Korean (Voice 1)', gender: 'female' };
  if (lower.includes('ko-kr-x-kob') || lower.includes('ko-kr-x-koa')) return { friendlyName: 'Google Korean (Voice 1)', gender: 'female' };

  if (lower.includes('ko-kr-language')) return { friendlyName: 'Android Korean System', gender: 'unknown' };
  if (lower.includes('en-gb-language')) return { friendlyName: 'Android UK English System', gender: 'unknown' };
  if (lower.includes('en-us-language')) return { friendlyName: 'Android US English System', gender: 'unknown' };

  // 2. Google Cloud / Neural / Wavenet / Standard
  if (lower.includes('neural2-c') || lower.includes('neural2-d') || lower.includes('neural2-b') || lower.includes('neural2-j') ||
      lower.includes('wavenet-c') || lower.includes('wavenet-d') || lower.includes('wavenet-b') || lower.includes('wavenet-j') ||
      lower.includes('standard-c') || lower.includes('standard-d') || lower.includes('standard-b') || lower.includes('standard-j')) {
    return { friendlyName: name, gender: 'male' };
  }
  if (lower.includes('neural2-a') || lower.includes('neural2-e') || lower.includes('neural2-f') ||
      lower.includes('wavenet-a') || lower.includes('wavenet-e') || lower.includes('wavenet-f') ||
      lower.includes('standard-a') || lower.includes('standard-e') || lower.includes('standard-f')) {
    return { friendlyName: name, gender: 'female' };
  }

  // 3. Known Apple/Windows/Local names
  const maleKeywords = [
    'reed', 'eddy', 'rocko', 'grandpa',
    'injoon', 'minsu', 'min-su',
    'voice ii', 'voice 2', 'voice iii', 'voice 3', 'voice v', 'voice 5',
    'voice-2', 'voice-3', 'voice-5',
    'daniel', 'oliver', 'george', 'arthur', 'alex', 'david', 'james', 'fred', 'ryan', 'malcolm', 'brian',
    '#male', 'male', '남성', '남자'
  ];
  if (maleKeywords.some(kw => lower.includes(kw))) {
    return { friendlyName: name, gender: 'male' };
  }

  const femaleKeywords = [
    'yuna', 'flo', 'sandy', 'shelley', 'grandma',
    'heami', 'sunhi',
    'voice i', 'voice 1', 'voice iv', 'voice 4',
    'voice-1', 'voice-4',
    'samantha', 'victoria', 'karen', 'moira', 'tessa',
    '#female', 'female', 'woman', '여성', '여자'
  ];
  if (femaleKeywords.some(kw => lower.includes(kw))) {
    return { friendlyName: name, gender: 'female' };
  }

  return { friendlyName: name, gender: 'unknown' };
}

class SpeechManager {
  private koreanMaleVoice: SpeechSynthesisVoice | null = null;
  private isExplicitMale: boolean = false;
  private selectedVoiceURI: string | null = null;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.selectedVoiceURI = localStorage.getItem('tagb_preferred_voice_uri');
    }
    this.initVoices();
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const findVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const koVoices = voices.filter(v => {
        const lang = (v.lang || '').replace('_', '-').toLowerCase();
        return lang.startsWith('ko');
      });

      if (koVoices.length === 0) return;

      // Prioritize local voices over remote to avoid silent hangs in WebKit/Blink
      const localKoVoices = koVoices.filter(v => v.localService);
      const searchPool = localKoVoices.length > 0 ? localKoVoices : koVoices;

      // 1. Explicit Korean Male Voices:
      // macOS/iOS: Reed, Eddy, Rocko, Grandpa
      // Windows: InJoon (Microsoft InJoon)
      // Android Google TTS: ko-kr-x-ism, ko-kr-x-koc, ko-kr-x-kod, Voice 2, Voice 3, Voice 5, Standard-C/D, Wavenet-C/D, Neural2-C/D
      // Samsung / generic: names or voiceURIs with 'male', '#male', '남성', '남자'
      const maleKeywords = [
        'reed', 'eddy', 'rocko', 'grandpa',
        'injoon', 'minsu', 'min-su',
        'ism', 'koc', 'kod',
        'voice ii', 'voice 2', 'voice iii', 'voice 3', 'voice v', 'voice 5',
        'voice-2', 'voice-3', 'voice-5',
        'standard-c', 'standard-d', 'wavenet-c', 'wavenet-d', 'neural2-c', 'neural2-d',
        'male', '#male', '남성', '남자'
      ];

      const getDesc = (v: SpeechSynthesisVoice) => `${v.name} ${v.voiceURI || ''}`.toLowerCase();

      let male = searchPool.find(v => maleKeywords.some(kw => getDesc(v).includes(kw)));
      if (!male && localKoVoices.length > 0) {
        male = koVoices.find(v => maleKeywords.some(kw => getDesc(v).includes(kw)));
      }

      if (male) {
        this.koreanMaleVoice = male;
        this.isExplicitMale = true;
        return;
      }

      // 2. Korean voices not known to be female
      const femaleKeywords = [
        'yuna', 'flo', 'sandy', 'shelley', 'grandma',
        'heami', 'sunhi',
        'kof', 'kob', 'koa',
        'voice i', 'voice 1', 'voice iv', 'voice 4',
        'voice-1', 'voice-4',
        'standard-a', 'standard-b', 'wavenet-a', 'wavenet-b', 'neural2-a', 'neural2-b',
        'female', '#female', 'woman', '여성', '여자'
      ];

      male = searchPool.find(v => !femaleKeywords.some(kw => getDesc(v).includes(kw)));
      if (!male && localKoVoices.length > 0) {
        male = koVoices.find(v => !femaleKeywords.some(kw => getDesc(v).includes(kw)));
      }

      // 3. Fallback to any available Korean voice (e.g. default Android Google TTS voice)
      if (!male) {
        male = searchPool[0] || koVoices[0] || null;
      }

      this.koreanMaleVoice = male;
      this.isExplicitMale = false;
    };

    findVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = findVoices;
    }
  }

  /**
   * Retrieves all available English and Korean voices discovered on the user's device,
   * categorizing them with friendly names and gender classification.
   */
  public getAvailableVoices(): AvailableVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];

    const rawVoices = window.speechSynthesis.getVoices();
    if (!rawVoices || rawVoices.length === 0) return [];

    const results: AvailableVoice[] = [];
    const seenURIs = new Set<string>();

    for (const v of rawVoices) {
      const uri = v.voiceURI || v.name;
      if (seenURIs.has(uri)) continue;

      const normLang = (v.lang || '').replace('_', '-').toLowerCase();
      const isKorean = normLang.startsWith('ko');
      const isEnglish = normLang.startsWith('en');

      if (!isKorean && !isEnglish) continue;
      seenURIs.add(uri);

      const { friendlyName, gender } = parseVoiceMetadata(v.name, v.lang, v.voiceURI);

      let category: AvailableVoice['category'];
      if (isKorean) {
        if (gender === 'male') category = 'korean_male';
        else if (gender === 'female') category = 'korean_female';
        else category = 'korean_other';
      } else {
        if (gender === 'male') category = 'english_male';
        else if (gender === 'female') category = 'english_female';
        else category = 'english_other';
      }

      const genderTag = gender === 'male' ? 'Male' : (gender === 'female' ? 'Female' : 'Voice');
      const langTag = isKorean ? 'Korean' : (v.lang || 'English');
      const label = `${friendlyName} (${langTag}) [${genderTag}]`;

      results.push({
        name: v.name,
        friendlyName,
        lang: v.lang,
        voiceURI: uri,
        isKorean,
        isEnglish,
        gender,
        isLocal: Boolean(v.localService),
        label,
        category
      });
    }

    // Sort order: Korean Male first, then English Male, then Korean Other, then English Other, then Female voices
    const sortOrder: Record<AvailableVoice['category'], number> = {
      korean_male: 0,
      english_male: 1,
      korean_other: 2,
      english_other: 3,
      korean_female: 4,
      english_female: 5
    };

    return results.sort((a, b) => {
      const catDiff = sortOrder[a.category] - sortOrder[b.category];
      if (catDiff !== 0) return catDiff;
      return a.friendlyName.localeCompare(b.friendlyName);
    });
  }

  public getActiveVoiceLabel(): string {
    const preferredURI = this.getSelectedVoiceURI();
    if (preferredURI && preferredURI !== 'auto') {
      const voices = this.getAvailableVoices();
      const found = voices.find(v => v.voiceURI === preferredURI);
      if (found) {
        const gTag = found.gender === 'male' ? '[MALE]' : (found.gender === 'female' ? '[FEMALE]' : '');
        return `${found.friendlyName} ${gTag}`.trim();
      }
    }
    if (this.koreanMaleVoice) {
      const gTag = this.isExplicitMale ? '[MALE]' : '';
      return `Auto-Detect (${this.koreanMaleVoice.name}) ${gTag}`.trim();
    }
    return 'Auto-Detect (Default)';
  }

  /**
   * Sets user's preferred voice by URI (or null for auto-detect).
   */
  public setSelectedVoiceURI(uri: string | null): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!uri || uri === 'auto') {
        localStorage.removeItem('tagb_preferred_voice_uri');
        this.selectedVoiceURI = null;
      } else {
        localStorage.setItem('tagb_preferred_voice_uri', uri);
        this.selectedVoiceURI = uri;
      }
    } else {
      this.selectedVoiceURI = uri;
    }
  }

  public getSelectedVoiceURI(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('tagb_preferred_voice_uri');
    }
    return this.selectedVoiceURI;
  }

  /**
   * User-chosen pitch override (null = automatic behaviour).
   */
  public getUserPitch(): number | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = localStorage.getItem('tagb_voice_pitch');
    if (raw === null) return null;
    const n = parseFloat(raw);
    return isNaN(n) ? null : n;
  }

  public setUserPitch(pitch: number | null): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    if (pitch === null) {
      localStorage.removeItem('tagb_voice_pitch');
    } else {
      localStorage.setItem('tagb_voice_pitch', pitch.toString());
    }
  }

  /**
   * Previews a voice with an authentic martial arts command.
   */
  public testVoice(voiceURI?: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!soundFx.isEnabled()) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const voices = window.speechSynthesis.getVoices();
      const targetURI = voiceURI || this.getSelectedVoiceURI();
      let targetVoice: SpeechSynthesisVoice | null = null;

      if (targetURI && targetURI !== 'auto') {
        targetVoice = voices.find(v => (v.voiceURI || v.name) === targetURI) || null;
      }

      if (!targetVoice && this.koreanMaleVoice) {
        targetVoice = this.koreanMaleVoice;
      }

      const isEnglish = targetVoice ? (targetVoice.lang || '').replace('_', '-').toLowerCase().startsWith('en') : false;
      const testText = isEnglish ? 'Chon Ji. Guhn noon Soh gee.' : '천지 걷는 서기';

      const utterance = new SpeechSynthesisUtterance(testText);
      if (targetVoice) {
        utterance.voice = targetVoice;
        utterance.lang = targetVoice.lang || (isEnglish ? 'en-GB' : 'ko-KR');
      } else {
        utterance.lang = isEnglish ? 'en-GB' : 'ko-KR';
      }

      utterance.rate = isEnglish ? 0.92 : 0.90;
      utterance.pitch = this.getUserPitch() ?? 1.0;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[TKD Audio] Voice test error:', e);
    }
  }

  /**
   * Translates a romanized Korean term into native Hangul script
   * and English phonetic transliteration.
   */
  public getPronunciation(term: string): PronunciationResult {
    const clean = term.replace(/[()]/g, '').trim();

    let hangulText = '';
    let phoneticText = '';

    // 1. Exact match in full phrases
    if (HANGUL_MAP[clean]) {
      hangulText = HANGUL_MAP[clean].hangul;
      phoneticText = HANGUL_MAP[clean].phonetic;
    } else {
      // 2. Case-insensitive exact match
      const foundKey = Object.keys(HANGUL_MAP).find(k => k.toLowerCase() === clean.toLowerCase());
      if (foundKey) {
        hangulText = HANGUL_MAP[foundKey].hangul;
        phoneticText = HANGUL_MAP[foundKey].phonetic;
      } else {
        // 3. Deconstruct word by word
        const words = clean.split(/\s+/);
        const hWords: string[] = [];
        const pWords: string[] = [];

        for (const w of words) {
          const entry = HANGUL_MAP[w] || Object.entries(HANGUL_MAP).find(([k]) => k.toLowerCase() === w.toLowerCase())?.[1];
          if (entry) {
            hWords.push(entry.hangul);
            pWords.push(entry.phonetic);
          } else {
            hWords.push(w);
            pWords.push(w);
          }
        }

        hangulText = hWords.join(' ');
        phoneticText = pWords.join(' ');
      }
    }

    const hangulClean = hangulText.replace(/[-_!?,.:;()]/g, ' ').replace(/\s+/g, ' ').trim();
    const phoneticClean = phoneticText.replace(/[-_!?,.:;()]/g, ' ').replace(/\s+/g, ' ').trim();

    return {
      text: hangulClean,
      isHangul: true,
      hangulText: hangulClean,
      phoneticText: phoneticClean
    };
  }

  /**
   * Speaks the terminology honoring the user's selected voice
   * (or falling back to the optimal auto-detected voice).
   */
  public speakKorean(term: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!soundFx.isEnabled()) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // Stop overlapping speech

      // Re-scan voices on user interaction
      if (!this.koreanMaleVoice || !this.isExplicitMale) {
        this.initVoices();
      }

      const pron = this.getPronunciation(term);
      const voices = window.speechSynthesis.getVoices();
      const preferredURI = this.getSelectedVoiceURI();

      let activeVoice: SpeechSynthesisVoice | null = null;
      if (preferredURI && preferredURI !== 'auto') {
        activeVoice = voices.find(v => (v.voiceURI || v.name) === preferredURI) || null;
      }

      // If no explicit voice selected or voice not found, use default Korean voice
      if (!activeVoice) {
        activeVoice = this.koreanMaleVoice;
      }

      const isEnglish = activeVoice ? (activeVoice.lang || '').replace('_', '-').toLowerCase().startsWith('en') : false;
      const textToSpeak = isEnglish ? pron.phoneticText : pron.hangulText;

      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (activeVoice) {
        utterance.voice = activeVoice;
        utterance.lang = activeVoice.lang || (isEnglish ? 'en-GB' : 'ko-KR');
      } else {
        utterance.lang = isEnglish ? 'en-GB' : 'ko-KR';
      }

      // Delivery settings
      const userPitch = this.getUserPitch();
      if (isEnglish) {
        utterance.rate = 0.92;
        utterance.pitch = userPitch ?? 1.0;
      } else {
        utterance.rate = 0.90;
        // Pitch: user override if set, otherwise natural (1.0) if an explicit male voice or
        // user-selected voice, or 0.78 fallback for unconfigured default voices on Android.
        utterance.pitch = userPitch ?? ((this.isExplicitMale || Boolean(preferredURI && preferredURI !== 'auto')) ? 1.0 : 0.78);
      }
      utterance.volume = 1.0;

      console.log(`[TKD Audio] Speaking with: "${activeVoice?.name || 'system default'}", URI: "${activeVoice?.voiceURI || ''}", isEnglish: ${isEnglish}`);

      // Robust fallback if speech synthesis errors out
      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error:', e);
        if (utterance.voice) {
          try {
            const fallbackUtterance = new SpeechSynthesisUtterance(textToSpeak);
            fallbackUtterance.lang = isEnglish ? 'en-GB' : 'ko-KR';
            fallbackUtterance.rate = isEnglish ? 0.92 : 0.90;
            fallbackUtterance.pitch = 1.0;
            window.speechSynthesis.speak(fallbackUtterance);
          } catch (err) {
            console.warn('Fallback speech error:', err);
          }
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechManager = new SpeechManager();
