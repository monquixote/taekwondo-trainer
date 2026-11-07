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

class SpeechManager {
  private koreanMaleVoice: SpeechSynthesisVoice | null = null;

  constructor() {
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

      // Prioritize local voices over remote to avoid silent hangs in WebKit/Blink
      const localKoVoices = koVoices.filter(v => v.localService);
      const searchPool = localKoVoices.length > 0 ? localKoVoices : koVoices;

      // 1. Explicit Korean Male Voices:
      // macOS/iOS: Reed, Eddy, Rocko, Grandpa
      // Windows: InJoon (Microsoft InJoon)
      // Generic: any voice containing 'male' or 'minsu'
      const maleKeywords = ['reed', 'eddy', 'rocko', 'injoon', 'minsu', 'min-su', 'grandpa', 'male'];
      let male = searchPool.find(v => maleKeywords.some(kw => v.name.toLowerCase().includes(kw)));

      if (!male && localKoVoices.length > 0) {
        male = koVoices.find(v => maleKeywords.some(kw => v.name.toLowerCase().includes(kw)));
      }

      // 2. Korean voices not known to be female
      if (!male) {
        const femaleKeywords = ['yuna', 'flo', 'sandy', 'shelley', 'grandma', 'heami', 'sunhi', 'female', 'woman'];
        male = searchPool.find(v => !femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)));
      }

      // 3. Fallback to any local Korean voice, or first Korean voice
      if (!male) {
        male = searchPool[0] || koVoices[0] || null;
      }

      this.koreanMaleVoice = male;
    };

    findVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = findVoices;
    }
  }

  /**
   * Translates a romanized Korean term into native Hangul script
   * for authentic Korean pronunciation.
   */
  public getPronunciation(term: string): { text: string; isHangul: boolean } {
    const clean = term.replace(/[()]/g, '').trim();

    // 1. Exact match in full phrases
    if (HANGUL_MAP[clean]) {
      return { text: HANGUL_MAP[clean].hangul, isHangul: true };
    }

    // 2. Case-insensitive exact match
    const foundKey = Object.keys(HANGUL_MAP).find(k => k.toLowerCase() === clean.toLowerCase());
    if (foundKey) {
      return { text: HANGUL_MAP[foundKey].hangul, isHangul: true };
    }

    // 3. Deconstruct word by word
    const words = clean.split(/\s+/);
    const hangulWords: string[] = [];

    for (const w of words) {
      const entry = HANGUL_MAP[w] || Object.entries(HANGUL_MAP).find(([k]) => k.toLowerCase() === w.toLowerCase())?.[1];
      if (entry) {
        hangulWords.push(entry.hangul);
      } else {
        hangulWords.push(w);
      }
    }

    const text = hangulWords.join(' ').replace(/[-_!?,.:;()]/g, ' ').replace(/\s+/g, ' ').trim();
    return { text, isHangul: true };
  }

  /**
   * Speaks the terminology using a Korean male instructor voice.
   * Cancels any currently playing utterance and honors the global sound toggle.
   */
  public speakKorean(term: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!soundFx.isEnabled()) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // Stop overlapping speech

      // Ensure voices are initialized
      if (!this.koreanMaleVoice) {
        this.initVoices();
      }

      const { text, isHangul } = this.getPronunciation(term);
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.koreanMaleVoice) {
        utterance.voice = this.koreanMaleVoice;
        utterance.lang = this.koreanMaleVoice.lang || 'ko-KR';
      } else {
        utterance.lang = 'ko-KR';
      }

      // Measured, authentic Korean martial arts instructor delivery at natural pitch
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Robust fallback if a specific voice fails to synthesize
      utterance.onerror = (e) => {
        console.warn('Speech synthesis utterance error:', e);
        if (utterance.voice) {
          try {
            const fallbackUtterance = new SpeechSynthesisUtterance(text);
            fallbackUtterance.lang = isHangul ? 'ko-KR' : 'en-GB';
            fallbackUtterance.rate = 0.90;
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
