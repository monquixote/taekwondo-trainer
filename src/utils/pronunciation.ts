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
  private koreanVoice: SpeechSynthesisVoice | null = null;
  private englishVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Collect Korean voices and prioritize Enhanced / Premium / Natural / Neural voices
        const koVoices = voices.filter(v => v.lang === 'ko-KR' || v.lang === 'ko_KR' || v.lang.startsWith('ko'));
        this.koreanVoice =
          koVoices.find(v => v.name.includes('Premium') || v.name.includes('Enhanced') || v.name.includes('Natural')) ||
          koVoices.find(v => v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Yuna')) ||
          koVoices.find(v => !v.localService) ||
          koVoices[0] ||
          null;

        // Best natural English voice for phonetic fallback
        const enVoices = voices.filter(v => v.lang.startsWith('en'));
        this.englishVoice =
          enVoices.find(v => v.name.includes('Premium') || v.name.includes('Enhanced') || v.name.includes('Natural')) ||
          enVoices.find(v => v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Google')) ||
          enVoices[0] ||
          null;
      }
    };

    load();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = load;
    }
  }

  /**
   * Translates a romanized Korean term or phrase into native Hangul
   * with fallback phonetic script.
   */
  public getPronunciation(term: string): { text: string; isHangul: boolean } {
    const clean = term.replace(/[()]/g, '').trim();

    // 1. Exact match in full phrases
    if (HANGUL_MAP[clean]) {
      return {
        text: this.koreanVoice ? HANGUL_MAP[clean].hangul : HANGUL_MAP[clean].phonetic,
        isHangul: Boolean(this.koreanVoice)
      };
    }

    // 2. Case-insensitive exact match
    const foundKey = Object.keys(HANGUL_MAP).find(k => k.toLowerCase() === clean.toLowerCase());
    if (foundKey) {
      return {
        text: this.koreanVoice ? HANGUL_MAP[foundKey].hangul : HANGUL_MAP[foundKey].phonetic,
        isHangul: Boolean(this.koreanVoice)
      };
    }

    // 3. Deconstruct word by word
    const words = clean.split(/\s+/);
    const hangulWords: string[] = [];
    const phoneticWords: string[] = [];
    let allMapped = true;

    for (const w of words) {
      const entry = HANGUL_MAP[w] || Object.entries(HANGUL_MAP).find(([k]) => k.toLowerCase() === w.toLowerCase())?.[1];
      if (entry) {
        hangulWords.push(entry.hangul);
        phoneticWords.push(entry.phonetic);
      } else {
        allMapped = false;
        hangulWords.push(w);
        phoneticWords.push(w);
      }
    }

    if (this.koreanVoice && allMapped) {
      return { text: hangulWords.join(' '), isHangul: true };
    } else if (this.koreanVoice) {
      return { text: hangulWords.join(' '), isHangul: true };
    } else {
      return { text: phoneticWords.join(' '), isHangul: false };
    }
  }

  /**
   * Speaks the Korean term using the Web Speech API.
   * Cancels any currently playing utterance and honors the global sound toggle.
   */
  public speakKorean(term: string): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!soundFx.isEnabled()) return;

    try {
      window.speechSynthesis.cancel(); // Stop overlapping speech

      // Ensure voices are initialized if they loaded after constructor
      if (!this.koreanVoice) {
        this.initVoices();
      }

      const { text, isHangul } = this.getPronunciation(term);
      
      // Martial arts command prosody: An exclamation mark triggers natural
      // assertive intonation contours instead of flat, trailing sentence cadence.
      const cadenceText = text.trim() + '!';
      const utterance = new SpeechSynthesisUtterance(cadenceText);

      if (isHangul && this.koreanVoice) {
        utterance.voice = this.koreanVoice;
        utterance.lang = 'ko-KR';
        // A crisp rate of 0.98 prevents robotic phoneme-stretching (which happened at 0.88),
        // while a pitch of 1.08 adds brightness, energy, and inflection.
        utterance.rate = 0.98;
        utterance.pitch = 1.08;
        utterance.volume = 1.0;
      } else {
        if (this.englishVoice) {
          utterance.voice = this.englishVoice;
        }
        utterance.lang = 'en-US';
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.volume = 1.0;
      }

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
