/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScriptMapping {
  id: string;
  name: string;
  localName: string;
  script: string;
  exampleEnglish: string;
  exampleNative: string;
  vowels: { key: string; char: string; ipa?: string }[];
  consonants: { key: string; char: string; ipa?: string }[];
  matras: { key: string; char: string; ipa?: string }[];
  specials: { key: string; char: string; description: string }[];
  virama: string;
  inherentVowel: string;
}

export const LANGUAGE_MAPPINGS: Record<string, ScriptMapping> = {
  hindi: {
    id: "hindi",
    name: "Hindi / Sanskrit",
    localName: "हिन्दी / संस्कृत",
    script: "Devanagari",
    exampleEnglish: "namaste",
    exampleNative: "नमस्ते",
    vowels: [
      { key: "a", char: "अ" },
      { key: "aa", char: "आ" },
      { key: "A", char: "आ" },
      { key: "i", char: "इ" },
      { key: "ii", char: "ई" },
      { key: "ee", char: "ई" },
      { key: "I", char: "ई" },
      { key: "u", char: "उ" },
      { key: "uu", char: "ऊ" },
      { key: "U", char: "ऊ" },
      { key: "ri", char: "ऋ" },
      { key: "R", char: "ऋ" },
      { key: "e", char: "ए" },
      { key: "ai", char: "ऐ" },
      { key: "o", char: "ओ" },
      { key: "au", char: "औ" },
    ],
    consonants: [
      // Velars
      { key: "k", char: "क" },
      { key: "kh", char: "ख" },
      { key: "g", char: "ग" },
      { key: "gh", char: "घ" },
      { key: "ng", char: "ङ" },
      // Palatals
      { key: "ch", char: "च" },
      { key: "chh", char: "छ" },
      { key: "j", char: "ज" },
      { key: "jh", char: "झ" },
      { key: "ny", char: "ञ" },
      // Retroflex
      { key: "T", char: "ट" },
      { key: "Th", char: "ठ" },
      { key: "D", char: "ड" },
      { key: "Dh", char: "ढ" },
      { key: "N", char: "ण" },
      // Dentals
      { key: "t", char: "त" },
      { key: "th", char: "थ" },
      { key: "d", char: "द" },
      { key: "dh", char: "ध" },
      { key: "n", char: "न" },
      // Labials
      { key: "p", char: "प" },
      { key: "ph", char: "फ" },
      { key: "b", char: "ब" },
      { key: "bh", char: "भ" },
      { key: "m", char: "म" },
      // Semivowels / Liquids
      { key: "y", char: "य" },
      { key: "r", char: "र" },
      { key: "l", char: "ल" },
      { key: "v", char: "व" },
      { key: "w", char: "व" },
      // Sibilants & Aspirate
      { key: "sh", char: "श" },
      { key: "Sh", char: "ष" },
      { key: "s", char: "स" },
      { key: "h", char: "ह" },
      // Conjuncts
      { key: "ksh", char: "क्ष" },
      { key: "tr", char: "त्र" },
      { key: "gy", char: "ज्ञ" },
    ],
    matras: [
      { key: "aa", char: "ा" },
      { key: "A", char: "ा" },
      { key: "i", char: "ि" },
      { key: "ii", char: "ी" },
      { key: "ee", char: "ी" },
      { key: "I", char: "ी" },
      { key: "u", char: "ु" },
      { key: "uu", char: "ू" },
      { key: "U", char: "ू" },
      { key: "ri", char: "ृ" },
      { key: "R", char: "ृ" },
      { key: "e", char: "े" },
      { key: "ai", char: "ै" },
      { key: "o", char: "ो" },
      { key: "au", char: "ौ" },
    ],
    specials: [
      { key: "M", char: "ं", description: "Anusvara (nasalization)" },
      { key: "H", char: "ः", description: "Visarga (breath release)" },
      { key: "z", char: "़", description: "Nukta (dot below for foreign sounds eg. z/f)" },
    ],
    virama: "्",
    inherentVowel: "a",
  },
  tamil: {
    id: "tamil",
    name: "Tamil",
    localName: "தமிழ்",
    script: "Tamil",
    exampleEnglish: "vanakkam",
    exampleNative: "வணக்கம்",
    vowels: [
      { key: "a", char: "அ" },
      { key: "aa", char: "ஆ" },
      { key: "A", char: "ஆ" },
      { key: "i", char: "இ" },
      { key: "ii", char: "ஈ" },
      { key: "u", char: "உ" },
      { key: "uu", char: "ஊ" },
      { key: "e", char: "எ" },
      { key: "ee", char: "ஏ" },
      { key: "ai", char: "ஐ" },
      { key: "o", char: "ஒ" },
      { key: "oo", char: "ஓ" },
      { key: "au", char: "ஔ" },
    ],
    consonants: [
      { key: "k", char: "க" },
      { key: "g", char: "க" },
      { key: "kh", char: "க" },
      { key: "gh", char: "க" },
      { key: "ng", char: "ங" },
      { key: "ch", char: "ச" },
      { key: "j", char: "ஜ" },
      { key: "ny", char: "ஞ" },
      { key: "T", char: "ட" },
      { key: "th", char: "த" },
      { key: "N", char: "ண" },
      { key: "n", char: "ந" },
      { key: "nn", char: "ன" },
      { key: "p", char: "ப" },
      { key: "b", char: "ப" },
      { key: "m", char: "ம" },
      { key: "y", char: "ய" },
      { key: "r", char: "ர" },
      { key: "R", char: "ற" },
      { key: "l", char: "ல" },
      { key: "L", char: "ள" },
      { key: "zh", char: "ழ" },
      { key: "v", char: "வ" },
      { key: "w", char: "வ" },
      { key: "sh", char: "ஷ" },
      { key: "s", char: "ஸ" },
      { key: "h", char: "ஹ" },
    ],
    matras: [
      { key: "aa", char: "ா" },
      { key: "A", char: "ா" },
      { key: "i", char: "ி" },
      { key: "ii", char: "ீ" },
      { key: "u", char: "ு" },
      { key: "uu", char: "ூ" },
      { key: "e", char: "ெ" },
      { key: "ee", char: "ே" },
      { key: "ai", char: "ை" },
      { key: "o", char: "ொ" },
      { key: "oo", char: "ோ" },
      { key: "au", char: "ௌ" },
    ],
    specials: [
      { key: "H", char: "ஃ", description: "Aytham (special modifier)" },
    ],
    virama: "்",
    inherentVowel: "a",
  },
  telugu: {
    id: "telugu",
    name: "Telugu",
    localName: "తెలుగు",
    script: "Telugu",
    exampleEnglish: "namaste",
    exampleNative: "నమస్తే",
    vowels: [
      { key: "a", char: "అ" },
      { key: "aa", char: "ఆ" },
      { key: "A", char: "ఆ" },
      { key: "i", char: "ఇ" },
      { key: "ii", char: "ఈ" },
      { key: "I", char: "ఈ" },
      { key: "u", char: "ఉ" },
      { key: "uu", char: "ఊ" },
      { key: "U", char: "ఊ" },
      { key: "ri", char: "ఋ" },
      { key: "R", char: "ఋ" },
      { key: "e", char: "ఎ" },
      { key: "ee", char: "ఏ" },
      { key: "ai", char: "ఐ" },
      { key: "o", char: "ఒ" },
      { key: "oo", char: "ఓ" },
      { key: "au", char: "ఔ" },
    ],
    consonants: [
      { key: "k", char: "క" },
      { key: "kh", char: "ఖ" },
      { key: "g", char: "గ" },
      { key: "gh", char: "ఘ" },
      { key: "ng", char: "ఙ" },
      { key: "ch", char: "చ" },
      { key: "chh", char: "ఛ" },
      { key: "j", char: "జ" },
      { key: "jh", char: "ఝ" },
      { key: "ny", char: "ఞ" },
      { key: "T", char: "ట" },
      { key: "Th", char: "ఠ" },
      { key: "D", char: "డ" },
      { key: "Dh", char: "ఢ" },
      { key: "N", char: "ణ" },
      { key: "t", char: "త" },
      { key: "th", char: "థ" },
      { key: "d", char: "ద" },
      { key: "dh", char: "ధ" },
      { key: "n", char: "న" },
      { key: "p", char: "ప" },
      { key: "ph", char: "ఫ" },
      { key: "b", char: "బ" },
      { key: "bh", char: "భ" },
      { key: "m", char: "మ" },
      { key: "y", char: "య" },
      { key: "r", char: "ర" },
      { key: "l", char: "ల" },
      { key: "v", char: "వ" },
      { key: "w", char: "వ" },
      { key: "sh", char: "శ" },
      { key: "Sh", char: "ష" },
      { key: "s", char: "స" },
      { key: "h", char: "హ" },
      { key: "L", char: "ళ" },
    ],
    matras: [
      { key: "aa", char: "ా" },
      { key: "A", char: "ా" },
      { key: "i", char: "ి" },
      { key: "ii", char: "ీ" },
      { key: "I", char: "ీ" },
      { key: "u", char: "ు" },
      { key: "uu", char: "ూ" },
      { key: "U", char: "ూ" },
      { key: "ri", char: "ృ" },
      { key: "R", char: "ృ" },
      { key: "e", char: "ె" },
      { key: "ee", char: "ే" },
      { key: "ai", char: "ై" },
      { key: "o", char: "ొ" },
      { key: "oo", char: "ో" },
      { key: "au", char: "ౌ" },
    ],
    specials: [
      { key: "M", char: "ం", description: "Anusvara (Sunna / nasal dot)" },
      { key: "H", char: "ః", description: "Visarga" },
    ],
    virama: "్",
    inherentVowel: "a",
  },
  bengali: {
    id: "bengali",
    name: "Bengali",
    localName: "বাংলা",
    script: "Bengali",
    exampleEnglish: "maataram",
    exampleNative: "মাতরম্",
    vowels: [
      { key: "a", char: "অ" },
      { key: "aa", char: "আ" },
      { key: "A", char: "আ" },
      { key: "i", char: "ই" },
      { key: "ii", char: "ঈ" },
      { key: "ee", char: "ঈ" },
      { key: "I", char: "ঈ" },
      { key: "u", char: "উ" },
      { key: "uu", char: "ঊ" },
      { key: "ri", char: "ঋ" },
      { key: "R", char: "ঋ" },
      { key: "e", char: "এ" },
      { key: "ai", char: "ঐ" },
      { key: "o", char: "ও" },
      { key: "au", char: "ঔ" },
    ],
    consonants: [
      { key: "k", char: "ক" },
      { key: "kh", char: "খ" },
      { key: "g", char: "গ" },
      { key: "gh", char: "ঘ" },
      { key: "ng", char: "ঙ" },
      { key: "ch", char: "চ" },
      { key: "chh", char: "ছ" },
      { key: "j", char: "জ" },
      { key: "jh", char: "ঝ" },
      { key: "ny", char: "ঞ" },
      { key: "T", char: "ট" },
      { key: "Th", char: "ঠ" },
      { key: "D", char: "ড" },
      { key: "Dh", char: "ঢ" },
      { key: "N", char: "ণ" },
      { key: "t", char: "ত" },
      { key: "th", char: "থ" },
      { key: "d", char: "দ" },
      { key: "dh", char: "ধ" },
      { key: "n", char: "ন" },
      { key: "p", char: "প" },
      { key: "ph", char: "ফ" },
      { key: "b", char: "ব" },
      { key: "bh", char: "ভ" },
      { key: "m", char: "ম" },
      { key: "y", char: "য" },
      { key: "r", char: "র" },
      { key: "l", char: "ল" },
      { key: "v", char: "ব" },
      { key: "w", char: "ব" },
      { key: "L", char: "ল" },
      { key: "sh", char: "শ" },
      { key: "Sh", char: "ষ" },
      { key: "s", char: "স" },
      { key: "h", char: "হ" },
      { key: "R", char: "ড়" },
      { key: "Rh", char: "ঢ়" },
      { key: "Y", char: "য়" },
    ],
    matras: [
      { key: "aa", char: "া" },
      { key: "A", char: "া" },
      { key: "i", char: "ি" },
      { key: "ii", char: "ী" },
      { key: "ee", char: "ী" },
      { key: "I", char: "ী" },
      { key: "u", char: "ু" },
      { key: "uu", char: "ূ" },
      { key: "ri", char: "ৃ" },
      { key: "R", char: "ৃ" },
      { key: "e", char: "ে" },
      { key: "ai", char: "ৈ" },
      { key: "o", char: "ো" },
      { key: "au", char: "ৌ" },
    ],
    specials: [
      { key: "M", char: "ং", description: "Anusvara" },
      { key: "H", char: "ঃ", description: "Visarga" },
      { key: "NN", char: "ঁ", description: "Chandrabindu" },
    ],
    virama: "্",
    inherentVowel: "a",
  },
  gujarati: {
    id: "gujarati",
    name: "Gujarati",
    localName: "ગુજરાતી",
    script: "Gujarati",
    exampleEnglish: "kem chho",
    exampleNative: "કેમ છો",
    vowels: [
      { key: "a", char: "અ" },
      { key: "aa", char: "આ" },
      { key: "A", char: "આ" },
      { key: "i", char: "ઇ" },
      { key: "ii", char: "ઈ" },
      { key: "ee", char: "ઈ" },
      { key: "I", char: "ઈ" },
      { key: "u", char: "ઉ" },
      { key: "uu", char: "ઊ" },
      { key: "ri", char: "ઋ" },
      { key: "e", char: "એ" },
      { key: "ai", char: "ઐ" },
      { key: "o", char: "ઓ" },
      { key: "au", char: "ઔ" },
    ],
    consonants: [
      { key: "k", char: "ક" },
      { key: "kh", char: "ખ" },
      { key: "g", char: "ગ" },
      { key: "gh", char: "ઘ" },
      { key: "ng", char: "ઙ" },
      { key: "ch", char: "ચ" },
      { key: "chh", char: "છ" },
      { key: "j", char: "જ" },
      { key: "jh", char: "ઝ" },
      { key: "ny", char: "ઞ" },
      { key: "T", char: "ટ" },
      { key: "Th", char: "ઠ" },
      { key: "D", char: "ડ" },
      { key: "Dh", char: "ઢ" },
      { key: "N", char: "ણ" },
      { key: "t", char: "ત" },
      { key: "th", char: "થ" },
      { key: "d", char: "દ" },
      { key: "dh", char: "ધ" },
      { key: "n", char: "ન" },
      { key: "p", char: "પ" },
      { key: "ph", char: "ફ" },
      { key: "b", char: "બ" },
      { key: "bh", char: "ભ" },
      { key: "m", char: "મ" },
      { key: "y", char: "ય" },
      { key: "r", char: "ર" },
      { key: "l", char: "લ" },
      { key: "v", char: "વ" },
      { key: "w", char: "વ" },
      { key: "sh", char: "શ" },
      { key: "Sh", char: "ષ" },
      { key: "s", char: "સ" },
      { key: "h", char: "હ" },
      { key: "L", char: "ળ" },
    ],
    matras: [
      { key: "aa", char: "ા" },
      { key: "A", char: "ા" },
      { key: "i", char: "િ" },
      { key: "ii", char: "ી" },
      { key: "ee", char: "ી" },
      { key: "I", char: "ી" },
      { key: "u", char: "ુ" },
      { key: "uu", char: "ૂ" },
      { key: "ri", char: "ૃ" },
      { key: "e", char: "ે" },
      { key: "ai", char: "ૈ" },
      { key: "o", char: "ો" },
      { key: "au", char: "ૌ" },
    ],
    specials: [
      { key: "M", char: "ં", description: "Anusvara" },
      { key: "H", char: "ઃ", description: "Visarga" },
    ],
    virama: "્",
    inherentVowel: "a",
  },
  kannada: {
    id: "kannada",
    name: "Kannada",
    localName: "ಕನ್ನಡ",
    script: "Kannada",
    exampleEnglish: "shubhodaya",
    exampleNative: "ಶುಭೋದಯ",
    vowels: [
      { key: "a", char: "ಅ" },
      { key: "aa", char: "ಆ" },
      { key: "A", char: "ಆ" },
      { key: "i", char: "ಇ" },
      { key: "ii", char: "ಈ" },
      { key: "I", char: "ಈ" },
      { key: "u", char: "ಉ" },
      { key: "uu", char: "ಊ" },
      { key: "U", char: "ಊ" },
      { key: "ri", char: "ಋ" },
      { key: "e", char: "ಎ" },
      { key: "ee", char: "ಏ" },
      { key: "ai", char: "ಐ" },
      { key: "o", char: "ಒ" },
      { key: "oo", char: "ಓ" },
      { key: "au", char: "ಔ" },
    ],
    consonants: [
      { key: "k", char: "ಕ" },
      { key: "kh", char: "ಖ" },
      { key: "g", char: "ಗ" },
      { key: "gh", char: "ಘ" },
      { key: "ng", char: "ಙ" },
      { key: "ch", char: "ಚ" },
      { key: "chh", char: "ಛ" },
      { key: "j", char: "ಜ" },
      { key: "jh", char: "ಝ" },
      { key: "ny", char: "ಞ" },
      { key: "T", char: "ಟ" },
      { key: "Th", char: "ಠ" },
      { key: "D", char: "ಡ" },
      { key: "Dh", char: "ಢ" },
      { key: "N", char: "ಣ" },
      { key: "t", char: "ತ" },
      { key: "th", char: "ಥ" },
      { key: "d", char: "ದ" },
      { key: "dh", char: "ಧ" },
      { key: "n", char: "ನ" },
      { key: "p", char: "ಪ" },
      { key: "ph", char: "ಫ" },
      { key: "b", char: "ಬ" },
      { key: "bh", char: "ಭ" },
      { key: "m", char: "ಮ" },
      { key: "y", char: "ಯ" },
      { key: "r", char: "ರ" },
      { key: "l", char: "ಲ" },
      { key: "v", char: "ವ" },
      { key: "w", char: "ವ" },
      { key: "sh", char: "ಶ" },
      { key: "Sh", char: "ಷ" },
      { key: "s", char: "ಸ" },
      { key: "h", char: "ಹ" },
      { key: "L", char: "ಳ" },
    ],
    matras: [
      { key: "aa", char: "ಾ" },
      { key: "A", char: "ಾ" },
      { key: "i", char: "ಿ" },
      { key: "ii", char: "ೀ" },
      { key: "I", char: "ೀ" },
      { key: "u", char: "ು" },
      { key: "uu", char: "ೂ" },
      { key: "U", char: "ೂ" },
      { key: "ri", char: "ೃ" },
      { key: "e", char: "ೆ" },
      { key: "ee", char: "ೇ" },
      { key: "ai", char: "ೈ" },
      { key: "o", char: "ೊ" },
      { key: "oo", char: "ೋ" },
      { key: "au", char: "ೌ" },
    ],
    specials: [
      { key: "M", char: "ಂ", description: "Anusvara" },
      { key: "H", char: "ಃ", description: "Visarga" },
    ],
    virama: "್",
    inherentVowel: "a",
  },
};

export interface TransliterationSegment {
  original: string;
  transliterated: string;
  type: "consonant_vowel" | "consonant_halant" | "independent_vowel" | "special" | "literal" | "space";
}

export function transliterateDetailed(
  input: string,
  langId: string,
  options: { autoTerminalVowel: boolean } = { autoTerminalVowel: true }
): { output: string; segments: TransliterationSegment[] } {
  const mapping = LANGUAGE_MAPPINGS[langId] || LANGUAGE_MAPPINGS.hindi;
  let i = 0;
  const segments: TransliterationSegment[] = [];

  // Sort consonants, vowels, matras, specials descending by key length to do longest-match greedly
  const sortedConsonants = [...mapping.consonants].sort((a, b) => b.key.length - a.key.length);
  const sortedVowels = [...mapping.vowels].sort((a, b) => b.key.length - a.key.length);
  const sortedMatras = [...mapping.matras].sort((a, b) => b.key.length - a.key.length);
  const sortedSpecials = [...mapping.specials].sort((a, b) => b.key.length - a.key.length);

  const isAlpha = (char: string) => /^[a-zA-Z]$/.test(char);

  while (i < input.length) {
    const char = input[i];

    // Check for Whitespace or Non-Alphanumeric characters first to preserve formatting
    if (char === " " || char === "\n" || char === "\t" || /^\s$/.test(char)) {
      segments.push({
        original: char,
        transliterated: char,
        type: "space",
      });
      i++;
      continue;
    }

    // Attempt matching a special character (like Anusvara M/H/etc.)
    let matchedSpecial = false;
    for (const spec of sortedSpecials) {
      const len = spec.key.length;
      if (input.substring(i, i + len) === spec.key) {
        segments.push({
          original: spec.key,
          transliterated: spec.char,
          type: "special",
        });
        i += len;
        matchedSpecial = true;
        break;
      }
    }
    if (matchedSpecial) continue;

    // Attempt matching a Consonant
    let matchedConsonant = false;
    for (const cons of sortedConsonants) {
      const cLen = cons.key.length;
      if (input.substring(i, i + cLen) === cons.key) {
        // We found a consonant. Let's see if a vowel or Matra follows it.
        let vLenMatched = 0;
        let matraChar = "";
        let origVowel = "";

        // Check the string immediately following the consonant
        const lookaheadIndex = i + cLen;
        for (const matra of sortedMatras) {
          const mLen = matra.key.length;
          if (
            lookaheadIndex + mLen <= input.length &&
            input.substring(lookaheadIndex, lookaheadIndex + mLen) === matra.key
          ) {
            vLenMatched = mLen;
            matraChar = matra.char;
            origVowel = matra.key;
            break;
          }
        }

        // Check if plain "a" follows (which removes halant, leaves baseline consonant)
        if (vLenMatched === 0 && lookaheadIndex < input.length && input[lookaheadIndex] === "a") {
          vLenMatched = 1;
          matraChar = ""; // no visible matra sign, just inherent vowel
          origVowel = "a";
        }

        if (vLenMatched > 0) {
          // Consonant + Vowel structure (e.g. ka -> क, kaa -> का)
          segments.push({
            original: cons.key + origVowel,
            transliterated: cons.char + matraChar,
            type: "consonant_vowel",
          });
          i += cLen + vLenMatched;
        } else {
          // Check if this consonant is at the very end of the alphabetic word segments
          // if autoTerminalVowel is enabled, we don't append a virama if it looks like a typical natural terminal vowel pronunciation,
          // but to be standard: terminal consonants get virama in precise scripts unless followed by space or non-alphabetic,
          // Let's decide if this consonant requires virama (halant)
          const nextIndex = i + cLen;
          const isWordEnd =
            nextIndex >= input.length ||
            !isAlpha(input[nextIndex]);

          if (isWordEnd && options.autoTerminalVowel) {
            // Treat as inherent terminal vowel (no halant)
            segments.push({
              original: cons.key,
              transliterated: cons.char,
              type: "consonant_vowel",
            });
          } else {
            // Append with Halant/Virama
            segments.push({
              original: cons.key,
              transliterated: cons.char + mapping.virama,
              type: "consonant_halant",
            });
          }
          i += cLen;
        }

        matchedConsonant = true;
        break;
      }
    }
    if (matchedConsonant) continue;

    // Attempt matching an Independent Vowel
    let matchedVowel = false;
    for (const vow of sortedVowels) {
      const vLen = vow.key.length;
      if (input.substring(i, i + vLen) === vow.key) {
        segments.push({
          original: vow.key,
          transliterated: vow.char,
          type: "independent_vowel",
        });
        i += vLen;
        matchedVowel = true;
        break;
      }
    }
    if (matchedVowel) continue;

    // Default: copy directly if it is not a direct phonetic indicator
    segments.push({
      original: char,
      transliterated: char,
      type: "literal",
    });
    i++;
  }

  const output = segments.map((seg) => seg.transliterated).join("");
  return { output, segments };
}

export const SCRIPT_BASES: Record<string, number> = {
  hindi: 0x0900,
  bengali: 0x0980,
  gujarati: 0x0A80,
  tamil: 0x0B80,
  telugu: 0x0C00,
  kannada: 0x0C80,
};

/**
 * Direct Script-to-Script Transliteration using Unicode relative offset math
 * among Brahmi-derived scripts. Standardizes unmapped characters for Tamil
 * and preserves custom non-Indic chars.
 */
export function transliterateIndicToIndic(text: string, srcLangId: string, destLangId: string): string {
  if (!text) return "";
  const destBase = SCRIPT_BASES[destLangId] || SCRIPT_BASES.hindi;
  
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    
    // Auto-detect script base for this specific character if it falls into any Brahmi block
    let detectedBase = 0;
    if (srcLangId === "auto") {
      for (const base of Object.values(SCRIPT_BASES)) {
        if (code >= base && code < base + 0x80) {
          detectedBase = base;
          break;
        }
      }
    } else {
      const srcBase = SCRIPT_BASES[srcLangId];
      if (srcBase && code >= srcBase && code < srcBase + 0x80) {
        detectedBase = srcBase;
      }
    }
    
    if (detectedBase > 0) {
      const offset = code - detectedBase;
      
      // Handle script-specific exceptions
      // E.g. Tamil only has 1 sound for each consonant row (unvoiced unaspirated)
      if (destLangId === "tamil") {
        // Aspirated, Voiced, Voiced-Aspirated Velars -> k
        if (offset === 0x16 || offset === 0x17 || offset === 0x18) {
          result += String.fromCharCode(destBase + 0x15);
          continue;
        }
        // Palatals
        if (offset === 0x1B || offset === 0x1D) {
          result += String.fromCharCode(destBase + 0x1A);
          continue;
        }
        // Retroflex
        if (offset === 0x20 || offset === 0x21 || offset === 0x22) {
          result += String.fromCharCode(destBase + 0x1F);
          continue;
        }
        // Dentals
        if (offset === 0x25 || offset === 0x26 || offset === 0x27) {
          result += String.fromCharCode(destBase + 0x24);
          continue;
        }
        // Labials
        if (offset === 0x2A || offset === 0x2B || offset === 0x2C) {
          result += String.fromCharCode(destBase + 0x29);
          continue;
        }
      }

      // Bengali script-specific exceptions to map unassigned/unsupported characters
      if (destLangId === "bengali") {
        // short e (vowel U+xx0E) -> long e (U+xx0F)
        if (offset === 0x0E) {
          result += String.fromCharCode(destBase + 0x0F);
          continue;
        }
        // short o (vowel U+xx12) -> long o (U+xx13)
        if (offset === 0x12) {
          result += String.fromCharCode(destBase + 0x13);
          continue;
        }
        // short e matra (U+xx46) -> long e matra (U+xx47)
        if (offset === 0x46) {
          result += String.fromCharCode(destBase + 0x47);
          continue;
        }
        // short o matra (U+xx4A) -> long o matra (U+xx4B)
        if (offset === 0x4A) {
          result += String.fromCharCode(destBase + 0x4B);
          continue;
        }
        // Tamil alveolar nasal ன (U+xx29) -> dental nasal ন (U+xx28)
        if (offset === 0x29) {
          result += String.fromCharCode(destBase + 0x28);
          continue;
        }
        // Tamil RRa ற (U+xx31) -> dental/alveolar ra র (U+xx30)
        if (offset === 0x31) {
          result += String.fromCharCode(destBase + 0x30);
          continue;
        }
        // Retroflex LLA ಳ/ళ/ળ/ள (U+xx33) -> standard lateral l ল (U+xx32)
        if (offset === 0x33) {
          result += String.fromCharCode(destBase + 0x32);
          continue;
        }
        // Tamil retroflex approximant zha ழ/ഴ (U+xx34) -> standard lateral l ল (U+xx32)
        if (offset === 0x34) {
          result += String.fromCharCode(destBase + 0x32);
          continue;
        }
        // Semivowel va വ/ವ/వ/व (U+xx35) -> standard Bengali ba ব (U+xx2C)
        if (offset === 0x35) {
          result += String.fromCharCode(destBase + 0x2C);
          continue;
        }
      }
      
      const targetCode = destBase + offset;
      result += String.fromCharCode(targetCode);
    } else {
      // Keep punctuation, space, English letters as-is
      result += char;
    }
  }
  
  return result;
}

