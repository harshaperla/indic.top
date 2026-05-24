/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  langId: string;
  title: string;
  promptEnglish: string; // The phonetics they need to type
  solutionNative: string; // The correct transliterated output
  clue: string; // Meaning or pronunciation clue
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  steps: { key: string; char: string }[];
}

export const PRACTICAL_LESSONS: Lesson[] = [
  {
    id: "h1",
    langId: "hindi",
    title: "The Universal Greeting",
    promptEnglish: "namaste",
    solutionNative: "नमस्ते",
    clue: "Traditional Indian greeting meaning 'I bow to you'.",
    difficulty: "Beginner",
    steps: [
      { key: "na", char: "न" },
      { key: "ma", char: "म" },
      { key: "s", char: "स्" },
      { key: "te", char: "ते" },
    ],
  },
  {
    id: "h2",
    langId: "hindi",
    title: "Expression of Gratitude",
    promptEnglish: "dhanyavaad",
    solutionNative: "धन्यवाद",
    clue: "Formal way of saying 'Thank you' in Hindi.",
    difficulty: "Intermediate",
    steps: [
      { key: "dha", char: "ध" },
      { key: "nya", char: "न्य" },
      { key: "vaa", char: "वा" },
      { key: "d", char: "द्" },
    ],
  },
  {
    id: "h3",
    langId: "hindi",
    title: "Light & Festivals",
    promptEnglish: "diwaalee",
    solutionNative: "दीवाली",
    clue: "The Hindu festival of lights, representing victory of light over darkness.",
    difficulty: "Beginner",
    steps: [
      { key: "dee", char: "दी" },
      { key: "waa", char: "वा" },
      { key: "lee", char: "ली" },
    ],
  },
  {
    id: "t1",
    langId: "tamil",
    title: "Tamil Welcome",
    promptEnglish: "vanakkam",
    solutionNative: "வணக்கம்",
    clue: "The standard respectful greeting in Tamil Nadu.",
    difficulty: "Beginner",
    steps: [
      { key: "va", char: "வ" },
      { key: "Na", char: "ண" },
      { key: "k", char: "க்" },
      { key: "ka", char: "க" },
      { key: "m", char: "ம்" },
    ],
  },
  {
    id: "t2",
    langId: "tamil",
    title: "A Sweet Tamil Feast",
    promptEnglish: "pongal",
    solutionNative: "பொங்கல்",
    clue: "An auspicious harvest festival and sweet rice dish.",
    difficulty: "Intermediate",
    steps: [
      { key: "po", char: "பொ" },
      { key: "ng", char: "ங்" },
      { key: "ka", char: "க" },
      { key: "l", char: "ல்" },
    ],
  },
  {
    id: "tel1",
    langId: "telugu",
    title: "Festive Ugadi",
    promptEnglish: "ugaadi",
    solutionNative: "ఉగాది",
    clue: "The New Year festival for people of Andhra Pradesh and Telangana.",
    difficulty: "Intermediate",
    steps: [
      { key: "u", char: "ఉ" },
      { key: "gaa", char: "గా" },
      { key: "di", char: "ది" },
    ],
  },
  {
    id: "b1",
    langId: "bengali",
    title: "Sweet Celebration",
    promptEnglish: "shandesh",
    solutionNative: "শন্দেশ",
    clue: "A highly popular milk-based Bengali sweet dessert.",
    difficulty: "Intermediate",
    steps: [
      { key: "sha", char: "শ" },
      { key: "n", char: "ন্" },
      { key: "de", char: "দে" },
      { key: "sh", char: "শ্" },
    ],
  },
  {
    id: "g1",
    langId: "gujarati",
    title: "Gujarati Comfort Food",
    promptEnglish: "dhoklaa",
    solutionNative: "ધોકલા",
    clue: "A savory, steamed cake made of fermented chickpea batter.",
    difficulty: "Intermediate",
    steps: [
      { key: "dho", char: "ધો" },
      { key: "k", char: "ક્" },
      { key: "laa", char: "લા" },
    ],
  },
  {
    id: "k1",
    langId: "kannada",
    title: "Morning Sunshine",
    promptEnglish: "shubhodaya",
    solutionNative: "ಶುಭೋದಯ",
    clue: "'Good Morning' in Kannada language.",
    difficulty: "Advanced",
    steps: [
      { key: "shu", char: "ಶು" },
      { key: "bho", char: "ಭೋ" },
      { key: "da", char: "ದ" },
      { key: "ya", char: "ಯ" },
    ],
  },
];
