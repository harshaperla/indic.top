/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import logo from "./assets/indic.top.png";
import {
  Keyboard,
  BookOpen,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  Smartphone,
  Laptop,
  CheckCircle2,
  Info,
  Award,
  Flame,
  Globe2,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  CornerDownLeft,
  Search,
} from "lucide-react";
import {
  LANGUAGE_MAPPINGS,
  transliterateDetailed,
  ScriptMapping,
  TransliterationSegment,
  transliterateIndicToIndic,
} from "./transliteration";
import { PRACTICAL_LESSONS, Lesson } from "./lessons";

export const LANG_COLOR_MAP: Record<string, {
  accentColor: string;
  pathD: string;
  bgBadge: string;
  textBadge: string;
  borderBadge: string;
  bgActiveCard: string;
  borderActiveCard: string;
  ringActiveCard: string;
  bgOutputGlow: string;
  textOutputMarker: string;
  bgOutputMarkerTab: string;
  borderOutputMarkerTab: string;
  keyboardKeyBg: string;
  keyboardKeyHover: string;
  keyboardKeyBorder: string;
  keyboardKeyText: string;
}> = {
  hindi: {
    accentColor: "text-amber-400 group-hover:text-amber-300",
    pathD: "M50 85 V70 M50 70 Q40 54 25 58 Q38 43 50 70 M50 70 Q60 54 75 58 Q62 43 50 70",
    bgBadge: "bg-amber-50",
    textBadge: "text-amber-700",
    borderBadge: "border-amber-150",
    bgActiveCard: "bg-gradient-to-br from-amber-950/90 to-[#121316] shadow-amber-950/40",
    borderActiveCard: "border-amber-400",
    ringActiveCard: "ring-amber-500/25",
    bgOutputGlow: "bg-amber-600/15",
    textOutputMarker: "text-amber-300",
    bgOutputMarkerTab: "bg-amber-400/10",
    borderOutputMarkerTab: "border-amber-400/20",
    keyboardKeyBg: "bg-amber-50/50",
    keyboardKeyHover: "hover:bg-amber-100/90",
    keyboardKeyBorder: "border-amber-200/80 hover:border-amber-400",
    keyboardKeyText: "text-amber-950"
  },
  tamil: {
    accentColor: "text-rose-400 group-hover:text-rose-300",
    pathD: "M50 85 V60 M32 35 C32 50 40 58 50 58 C60 58 68 50 68 35 C61 40 50 40 50 40 C50 40 39 40 32 35 Z",
    bgBadge: "bg-rose-50",
    textBadge: "text-rose-700",
    borderBadge: "border-rose-150",
    bgActiveCard: "bg-gradient-to-br from-rose-950/90 to-[#121316] shadow-rose-950/40",
    borderActiveCard: "border-rose-400",
    ringActiveCard: "ring-rose-500/25",
    bgOutputGlow: "bg-rose-600/15",
    textOutputMarker: "text-rose-300",
    bgOutputMarkerTab: "bg-rose-400/10",
    borderOutputMarkerTab: "border-rose-400/20",
    keyboardKeyBg: "bg-rose-50/40",
    keyboardKeyHover: "hover:bg-rose-100/80",
    keyboardKeyBorder: "border-rose-200/70 hover:border-rose-450",
    keyboardKeyText: "text-rose-950"
  },
  kannada: {
    accentColor: "text-indigo-400 group-hover:text-indigo-300",
    pathD: "M50 85 C35 60 38 42 50 28 C62 42 65 60 50 85 M50 85 C18 74 27 52 40 48 C45 62 48 74 50 85 M50 85 C82 74 73 52 60 48 C55 62 52 74 50 85",
    bgBadge: "bg-indigo-50",
    textBadge: "text-indigo-700",
    borderBadge: "border-indigo-150",
    bgActiveCard: "bg-gradient-to-br from-indigo-950/90 to-[#121316] shadow-indigo-950/40",
    borderActiveCard: "border-indigo-400",
    ringActiveCard: "ring-indigo-500/25",
    bgOutputGlow: "bg-indigo-600/15",
    textOutputMarker: "text-indigo-300",
    bgOutputMarkerTab: "bg-indigo-400/10",
    borderOutputMarkerTab: "border-indigo-400/20",
    keyboardKeyBg: "bg-indigo-50/40",
    keyboardKeyHover: "hover:bg-indigo-100/80",
    keyboardKeyBorder: "border-indigo-200/70 hover:border-indigo-450",
    keyboardKeyText: "text-indigo-950"
  },
  telugu: {
    accentColor: "text-emerald-400 group-hover:text-emerald-300",
    pathD: "M50 85 V70 M50 70 Q41 58 28 62 Q39 48 50 70 M50 70 Q59 58 72 62 Q61 48 50 70",
    bgBadge: "bg-emerald-50",
    textBadge: "text-emerald-700",
    borderBadge: "border-emerald-150",
    bgActiveCard: "bg-gradient-to-br from-emerald-950/90 to-[#121316] shadow-emerald-950/40",
    borderActiveCard: "border-emerald-400",
    ringActiveCard: "ring-emerald-500/25",
    bgOutputGlow: "bg-emerald-600/15",
    textOutputMarker: "text-emerald-300",
    bgOutputMarkerTab: "bg-emerald-400/10",
    borderOutputMarkerTab: "border-emerald-400/20",
    keyboardKeyBg: "bg-emerald-50/40",
    keyboardKeyHover: "hover:bg-emerald-100/80",
    keyboardKeyBorder: "border-emerald-200/70 hover:border-emerald-450",
    keyboardKeyText: "text-emerald-950"
  },
  bengali: {
    accentColor: "text-cyan-400 group-hover:text-cyan-300",
    pathD: "M50 85 V65 M35 48 C35 34 50 28 50 28 C50 28 65 34 65 48 C65 62 50 74 50 74 Z",
    bgBadge: "bg-cyan-50",
    textBadge: "text-cyan-700",
    borderBadge: "border-cyan-150",
    bgActiveCard: "bg-gradient-to-br from-cyan-950/90 to-[#121316] shadow-cyan-950/40",
    borderActiveCard: "border-cyan-400",
    ringActiveCard: "ring-cyan-500/25",
    bgOutputGlow: "bg-cyan-600/15",
    textOutputMarker: "text-cyan-300",
    bgOutputMarkerTab: "bg-cyan-400/10",
    borderOutputMarkerTab: "border-cyan-400/20",
    keyboardKeyBg: "bg-cyan-50/40",
    keyboardKeyHover: "hover:bg-cyan-100/80",
    keyboardKeyBorder: "border-cyan-200/70 hover:border-cyan-450",
    keyboardKeyText: "text-cyan-950"
  },
  gujarati: {
    accentColor: "text-pink-400 group-hover:text-pink-300",
    pathD: "M50 85 C38 65 38 48 50 35 C62 48 62 65 50 85",
    bgBadge: "bg-pink-50",
    textBadge: "text-pink-700",
    borderBadge: "border-pink-150",
    bgActiveCard: "bg-gradient-to-br from-pink-950/90 to-[#121316] shadow-pink-950/40",
    borderActiveCard: "border-pink-400",
    ringActiveCard: "ring-pink-500/25",
    bgOutputGlow: "bg-pink-600/15",
    textOutputMarker: "text-pink-300",
    bgOutputMarkerTab: "bg-pink-400/10",
    borderOutputMarkerTab: "border-pink-400/20",
    keyboardKeyBg: "bg-pink-50/40",
    keyboardKeyHover: "hover:bg-pink-100/80",
    keyboardKeyBorder: "border-pink-200/70 hover:border-pink-450",
    keyboardKeyText: "text-pink-950"
  }
};

export default function App() {
  // Application Views & Layout States
  const [selectedLang, setSelectedLang] = useState<string>("hindi");
  const [inputText, setInputText] = useState<string>("namaste bhaarata");
  const [autoTerminalVowel, setAutoTerminalVowel] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"playground" | "study" | "lessons" | "comparator" | "indic-converter">("indic-converter");
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Indian Language to Indian Language Converter States
  const [indicInputText, setIndicInputText] = useState<string>("வணக்கம்");
  const [indicSourceLang, setIndicSourceLang] = useState<string>("auto");
  const [indicKeyboardLang, setIndicKeyboardLang] = useState<string>("hindi");
  const [indicKeyboardTab, setIndicKeyboardTab] = useState<"vowels" | "consonants" | "matras">("vowels");
  const [matrixCategory, setMatrixCategory] = useState<"vowels" | "consonants" | "matras">("vowels");

  // Keyboard Filter State
  const [keyboardCategory, setKeyboardCategory] = useState<"all" | "vowels" | "consonants" | "matras">("all");
  const [keyboardSearch, setKeyboardSearch] = useState<string>("");

  // Practice Lesson States
  const [selectedLessonId, setSelectedLessonId] = useState<string>("h1");
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  const [lessonInput, setLessonInput] = useState<string>("");
  const [lessonSuccess, setLessonSuccess] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(() => {
    try {
      return Number(localStorage.getItem("indic_lesson_streak") || "0");
    } catch {
      return 0;
    }
  });

  // Copy Feedback state
  const [copiedIndicator, setCopiedIndicator] = useState<boolean>(false);

  // Speech Synth state
  const [speachSupported, setSpeechSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Ref to the input element for injecting keyboard clicks
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Sync streaks to local storage
  const updateStreak = (newStreak: number) => {
    setStreak(newStreak);
    try {
      localStorage.setItem("indic_lesson_streak", String(newStreak));
    } catch (e) {
      console.warn("Storage unreachable", e);
    }
  };

  const activeMapping = LANGUAGE_MAPPINGS[selectedLang] || LANGUAGE_MAPPINGS.hindi;

  // Perform Transliteration
  const { output: transliteratedText, segments } = transliterateDetailed(inputText, selectedLang, {
    autoTerminalVowel,
  });

  // Handle Preset Clicks
  const handleQuickPreset = (preset: string) => {
    setInputText(preset);
  };

  // Handle Key Clicks from the on-screen phonetic guide block
  const handleKeyboardKeyClick = (keyString: string) => {
    if (!inputRef.current) {
      setInputText((prev) => prev + keyString);
      return;
    }

    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    const textBefore = inputText.substring(0, start);
    const textAfter = inputText.substring(end);

    setInputText(textBefore + keyString + textAfter);

    // Reposition cursor after the inserted key
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd = start + keyString.length;
        inputRef.current.focus();
      }
    }, 10);
  };

  // Copy to clipboard helper
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndicator(true);
    setTimeout(() => setCopiedIndicator(false), 2000);
  };

  // TTS Reader
  const handleTextToSpeech = (textToRead: string, langCode: string) => {
    if (!speachSupported || isSpeaking) return;

    // Detect general speech voices
    const utterance = new SpeechSynthesisUtterance(textToRead);
    setIsSpeaking(true);

    // Attempt to match language support
    if (langCode === "hindi") utterance.lang = "hi-IN";
    else if (langCode === "tamil") utterance.lang = "ta-IN";
    else if (langCode === "telugu") utterance.lang = "te-IN";
    else if (langCode === "bengali") utterance.lang = "bn-IN";
    else if (langCode === "gujarati") utterance.lang = "gu-IN";
    else if (langCode === "kannada") utterance.lang = "kn-IN";
    else utterance.lang = "hi-IN";

    utterance.rate = 0.85; // slightly slower for orthographic feedback
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Lesson evaluation
  const currentLesson: Lesson =
    PRACTICAL_LESSONS.find((l) => l.id === selectedLessonId) || PRACTICAL_LESSONS[0];

  const handleLessonInputChange = (val: string) => {
    const sanitized = val.toLowerCase().trim();
    setLessonInput(val);

    const lessonResult = transliterateDetailed(val, currentLesson.langId, {
      autoTerminalVowel: true,
    }).output.trim();

    if (
      sanitized === currentLesson.promptEnglish.toLowerCase() ||
      lessonResult === currentLesson.solutionNative
    ) {
      setLessonSuccess(true);
    } else {
      setLessonSuccess(false);
    }
  };

  const handleNextLesson = () => {
    const currentIdx = PRACTICAL_LESSONS.findIndex((l) => l.id === selectedLessonId);
    let nextIdx = currentIdx + 1;
    if (nextIdx >= PRACTICAL_LESSONS.length) {
      nextIdx = 0; // Wrap around
    }
    setSelectedLessonId(PRACTICAL_LESSONS[nextIdx].id);
    setLessonInput("");
    setLessonSuccess(false);
    if (lessonSuccess) {
      updateStreak(streak + 1);
    }
  };

  const handleSkipLesson = () => {
    const currentIdx = PRACTICAL_LESSONS.findIndex((l) => l.id === selectedLessonId);
    let nextIdx = (currentIdx + 1) % PRACTICAL_LESSONS.length;
    setSelectedLessonId(PRACTICAL_LESSONS[nextIdx].id);
    setLessonInput("");
    setLessonSuccess(false);
  };

  // Generate Multi-script comparison for comparative learning
  const getMultiScriptComparison = (text: string) => {
    return Object.values(LANGUAGE_MAPPINGS).map((lang) => {
      const translit = transliterateDetailed(text, lang.id, { autoTerminalVowel }).output;
      return {
        ...lang,
        translit,
      };
    });
  };

  const comparedOutputs = getMultiScriptComparison(inputText || "namaste");

  // Filtered keys for the Interactive Study Keyboard Map
  const getFilteredKeys = () => {
    let list: { key: string; char: string; category: string; description?: string }[] = [];

    if (keyboardCategory === "all" || keyboardCategory === "vowels") {
      activeMapping.vowels.forEach((v) => list.push({ key: v.key, char: v.char, category: "Vowel" }));
    }
    if (keyboardCategory === "all" || keyboardCategory === "consonants") {
      activeMapping.consonants.forEach((c) => list.push({ key: c.key, char: c.char, category: "Consonant" }));
    }
    if (keyboardCategory === "all" || keyboardCategory === "matras") {
      activeMapping.matras.forEach((m) =>
        list.push({
          key: m.key,
          char: m.char,
          category: "Matra (Post-Consonant Modifier)",
          description: `Attach after a consonant to modify tone: e.g. ${activeMapping.consonants[0]?.char || "क"}${m.char}`,
        })
      );
    }

    if (keyboardSearch.trim() !== "") {
      const query = keyboardSearch.toLowerCase();
      list = list.filter((item) => item.key.toLowerCase().includes(query) || item.char.includes(query));
    }

    return list;
  };

  const filteredKeysList = getFilteredKeys();

  // Preset expressions for immediate exploration
  const samplePills = [
    { text: "namaste", label: "नमस्ते (Hello)" },
    { text: "bhaarata", label: "भारत (India)" },
    { text: "shanti", label: "शान्ति (Peace)" },
    { text: "dhanyavaad", label: "धन्यवाद (Thanks)" },
    { text: "karma", label: "कर्म (Karma)" },
    { text: "guru", label: "गुरु (Teacher)" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Upper Subtle Announcement System / Anti-AI-Slop Clean Margin Header */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs font-mono flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Phonetic Offline Engine: ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Lat: 2026-05-24</span>
          <span>UTC Client Sandbox</span>
        </div>
      </div>

      {/* Primary Navigation Shell header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Subsystem */}
          <div className="flex items-center">
            <h1 className="flex items-center">
              <span className="sr-only">indic.top - Offline Indic Script Transliteration & Keyboard</span>
              <img src={logo} alt="indic.top logo" className="h-10 w-auto object-contain" />
            </h1>
          </div>

          {/* Quick Layout Viewport Config & Platform Emulators */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-4 ml-auto">
            {/* Environment Toggle: Web Standard vs Interactive Mobile Device Mimic wrapper */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs text-slate-600 font-medium">
              <button
                id="view-mode-web"
                onClick={() => setIsMobileFrame(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  !isMobileFrame
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "hover:text-slate-900"
                }`}
                title="View full width web interface layout"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Web Workspace</span>
              </button>
              <button
                id="view-mode-mobile"
                onClick={() => setIsMobileFrame(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
                  isMobileFrame
                    ? "bg-white text-slate-900 shadow-sm font-semibold"
                    : "hover:text-slate-900"
                }`}
                title="Pack application into an interactive handheld mobile simulator viewport"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile Simulator</span>
              </button>
            </div>

            {/* Inherent terminal vowel scheme control */}
            <label
              className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none bg-slate-50 border border-slate-200 hover:border-slate-300 py-1.5 px-3 rounded-lg transition-all"
              title="Toggle whether terminal letters strictly receive halant/virama or relaxed natural ending vowels."
            >
              <input
                id="auto-terminal-vowel-checkbox"
                type="checkbox"
                checked={autoTerminalVowel}
                onChange={(e) => setAutoTerminalVowel(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span className="text-emerald-800">Relaxed End Vowel (Namaste)</span>
            </label>
          </div>
        </div>

        {/* Dynamic Global Tab Nav */}
        <div className="border-t border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="flex space-x-1 py-1 px-1">
              {[
                { id: "playground", label: "Type & Transliterate", icon: Keyboard },
                { id: "indic-converter", label: "Indic Script-to-Script", icon: Globe2 },
                { id: "lessons", label: "Phonetic Challenges", icon: Award },
                { id: "comparator", label: "Multi-Script Matrix", icon: Globe2 },
                { id: "study", label: "Study & Key Cheat Sheets", icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    id={`nav-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white text-indigo-600 shadow-sm border-b-2 border-indigo-600 font-semibold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Dynamic Master Area Layout Handler (Can bind into desktop fluid or virtual handset size container) */}
      <main className="flex-1 py-6 px-4 max-w-7xl mx-auto w-full flex flex-col">
        {isMobileFrame ? (
          /* Handheld mobile simulator wrapper interface */
          <div className="flex-1 flex justify-center items-center py-4">
            <div className="relative mx-auto border-[11px] border-slate-950 bg-slate-50 rounded-[44px] shadow-2xl w-[375px] h-[780px] overflow-hidden flex flex-col border-solid outline-none">
              {/* Phone ear-speaker Notch */}
              <div className="absolute top-0 inset-x-0 h-5 bg-slate-950 flex justify-center items-end z-50">
                <div className="w-24 h-4 bg-slate-950 rounded-b-xl flex items-center justify-center">
                  <span className="w-8 h-1 bg-slate-700 rounded-full"></span>
                </div>
              </div>

              {/* Simulated Notification bar with custom clock */}
              <div className="bg-slate-900 text-slate-300 text-[10px] font-mono justify-between items-center px-6 pt-6 pb-2 inline-flex">
                <span>indic.top</span>
                <span>09:47 UTC</span>
                <span>🔋 100%</span>
              </div>

              {/* Handheld Content inside Simulator Scroll wrapper */}
              <div className="flex-1 overflow-y-auto bg-slate-50 p-3 pb-8 text-sm">
                <div className="mb-4 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded-xl p-2.5 text-xs flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">Simulated Smartphone Viewport!</span> See how the layout collapses dynamically into beautiful tactile touchscreens.
                  </div>
                </div>
                {renderCoreInteractiveContent(true)}
              </div>

              {/* Phone Home visual swipe pill */}
              <div className="absolute bottom-1 inset-x-0 h-3 flex items-center justify-center pointer-events-none">
                <div className="w-28 h-1 bg-slate-800 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Web standard workspace layout containing sidebars and large grids */
          <div className="flex-1 flex flex-col">
            {renderCoreInteractiveContent(false)}
          </div>
        )}
      </main>

      {/* Quick reference sidebar status footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 100% Client-Side Pure Transliteration. Offline support ready.</span>
          <div className="flex gap-4">
            <span className="text-slate-400">Ver 1.0.4</span>
            <span className="text-slate-400">Time: 2026-05-24</span>
          </div>
        </div>
      </footer>
    </div>
  );

  /**
   * Evaluates the active tab viewport and packs it for standard screen widths or compact handset simulator mode
   */
  function renderCoreInteractiveContent(isCompactMode: boolean) {
    return (
      <div className="w-full h-full flex flex-col gap-6">
        {/* Step A: Unified Language Flag / Title selection rail (Enhanced with colorful progress milestone cards style as instructed) */}
        <div className="w-full bg-gradient-to-r from-[#fda846] via-[#d0d35b] via-[#6ebe7d] to-[#3aa5ae] rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden text-white">
          {/* Subtle decorative grid/overlay lines */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="text-white/80 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-black/20 px-2.5 py-1 rounded-md">
                SELECT TARGET SCRIPT
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mt-1">
                Active Translation Targets
              </h2>
              <p className="text-white/90 text-xs mt-1 max-w-xl leading-relaxed">
                Choose a destination script to map your English phonetics. Explore its dynamic layout representation, learn letter curves, or study lessons.
              </p>
            </div>
            <span className="text-xs bg-black/20 text-white font-semibold font-mono px-3 py-1.5 rounded-full border border-white/10">
              {Object.keys(LANGUAGE_MAPPINGS).length} scripts synced
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-sans">
            {Object.values(LANGUAGE_MAPPINGS).map((lang) => {
              const isSelected = selectedLang === lang.id;
              const styles = LANG_COLOR_MAP[lang.id] || LANG_COLOR_MAP.hindi;

              return (
                <button
                  id={`lang-sel-${lang.id}`}
                  key={lang.id}
                  onClick={() => {
                    setSelectedLang(lang.id);
                    setInputText(lang.exampleEnglish);
                  }}
                  className={`group flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[190px] relative overflow-hidden text-left focus:outline-hidden ${
                    isSelected
                      ? `${styles.bgActiveCard} border-2 ${styles.borderActiveCard} shadow-2xl ring-4 ${styles.ringActiveCard} scale-102`
                      : `bg-[#191a1e]/90 hover:bg-[#121316] border border-white/10 shadow-lg hover:border-indigo-500/40`
                  }`}
                >
                  {/* Card glossy shimmer/reflection strip */}
                  <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  
                  <div className="flex justify-between items-start w-full">
                    <div className="text-left">
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase block group-hover:text-indigo-300">
                        {lang.script}
                      </span>
                      <h3 className="text-sm font-extrabold text-white mt-1 leading-tight">
                        {lang.name}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">
                        ( {lang.localName} )
                      </p>
                    </div>
                    {/* Floating signet shown in top right */}
                    <div className={`w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 bg-white/5 shrink-0 transition-all ${styles.accentColor}`}>
                      <span className="text-xs font-serif font-black">{lang.exampleNative[0]}</span>
                    </div>
                  </div>

                  {/* Aesthetic Plant Stage / Calligraphy Emblem */}
                  <div className="flex justify-center mt-3 relative h-16 items-center w-full">
                    <svg className="w-14 h-14 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300 text-violet-400" viewBox="0 0 100 100">
                      <path
                        d={styles.pathD}
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className={isSelected ? "text-violet-400" : "text-violet-400/40 group-hover:text-violet-400/80"}
                      />
                    </svg>
                    
                    {/* Small preview of the language signature letter in center of the flower/emblem */}
                    <span className="absolute text-violet-100 font-serif font-bold text-xs">
                      {lang.exampleNative[0]}
                    </span>
                  </div>

                  <div className="text-left mt-2 w-full">
                    <span className="text-[9px] font-mono tracking-wider text-slate-400 block uppercase">
                      Example: "{lang.exampleEnglish}"
                    </span>
                    <span className="text-xs font-bold text-violet-300 font-serif">
                      → {lang.exampleNative}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Inner Tab View dispatcher */}
        {activeTab === "playground" && renderPlaygroundView(isCompactMode)}
        {activeTab === "indic-converter" && renderIndicConverterView(isCompactMode)}
        {activeTab === "lessons" && renderLessonsView(isCompactMode)}
        {activeTab === "comparator" && renderComparatorView(isCompactMode)}
        {activeTab === "study" && renderStudyView(isCompactMode)}
      </div>
    );
  }

  /**
   * Tab 1: Direct conversion workspace (Type English -> output Indic script)
   */
  function renderPlaygroundView(isCompactMode: boolean) {
    return (
      <div className={`grid grid-cols-1 ${isCompactMode ? "gap-4" : "lg:grid-cols-12 gap-6"} flex-1`}>
        {/* Typing and Translating columns */}
        <div className={isCompactMode ? "" : "lg:col-span-7 flex flex-col gap-4"}>
          {/* Main active workcard */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="bg-slate-50 border-b border-slate-100 p-3 flex justify-between items-center flex-wrap gap-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Keyboard className="w-4 h-4 text-slate-500" />
                Phonetic Typing Area
              </span>
              <div className="flex gap-2">
                <span className="bg-slate-200 px-2 py-0.5 rounded font-mono text-[10px] text-slate-600">
                  Input: QWERTY-Latin
                </span>
                <span className="bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded text-indigo-700 text-[10px] font-medium">
                  Output: {activeMapping.name}
                </span>
              </div>
            </div>

            {/* Editor textarea and helper blocks wrapper */}
            <div className="p-4 flex flex-col gap-4">
              <div className="relative">
                <textarea
                  id="phonetic-input-textarea"
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Type English phonetics here ... (e.g. try "${activeMapping.exampleEnglish}")`}
                  className="w-full h-32 p-4 text-base leading-relaxed bg-white border border-slate-200 rounded-xl shadow-inner ring-1 ring-slate-200/50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-300 font-mono resize-none"
                />
                {inputText && (
                  <button
                    id="clear-input-btn"
                    onClick={() => setInputText("")}
                    className="absolute bottom-3 right-3 p-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition"
                    title="Clear text input"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Preset Pills for users to trial immediate conversions */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-indigo-500" />
                  Try typing:
                </span>
                {samplePills.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPreset(pill.text)}
                    className="text-xs border border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 py-1 px-2.5 rounded-full text-slate-700 font-medium transition cursor-pointer"
                  >
                    {pill.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Results block display */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                  Output {activeMapping.script} Glyphs
                </span>
                <div className="flex items-center gap-1">
                  {speachSupported && (
                    <button
                      id="pronounce-btn"
                      onClick={() => handleTextToSpeech(transliteratedText, selectedLang)}
                      disabled={!transliteratedText}
                      className={`p-1.5 rounded-md border border-slate-200 bg-white shadow-xs transition ${
                        !transliteratedText
                          ? "opacity-50 text-slate-300 pointer-events-none"
                          : isSpeaking
                          ? "text-orange-600 bg-orange-50 border-orange-200 animate-pulse"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                      title="Speak native text aloud using browser TTS"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    id="copy-text-btn"
                    onClick={() => handleCopyToClipboard(transliteratedText)}
                    disabled={!transliteratedText}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs text-xs font-medium cursor-pointer transition"
                    title="Copy output content to clipboard"
                  >
                    {copiedIndicator ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Outputs box */}
              <div className="p-5 text-slate-900 min-h-[6.5rem] flex items-center justify-center text-center bg-white border border-slate-200 rounded-xl relative overflow-hidden shadow-sm shadow-indigo-500/5 ring-1 ring-slate-100">
                {transliteratedText ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl sm:text-3xl font-bold tracking-wide block leading-relaxed text-slate-950 font-serif">
                      {transliteratedText}
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs italic">
                    Type phonetics above to output {activeMapping.name} native glyphs
                  </span>
                )}
              </div>

              {/* Segmented Phonetic Breakdowns (hover state to study mapping!) */}
              {transliteratedText && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Segment Map (Hover to learn)
                    </span>
                    <span className="text-[10px] text-indigo-700 font-medium">
                      Shows characters and keystrokes
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {segments.map((seg, idx) => {
                      if (seg.type === "space") return <div key={idx} className="w-3" />;
                      if (seg.type === "literal") return null;

                      return (
                        <div
                          key={idx}
                          className="group relative bg-white border border-slate-200 hover:border-indigo-400 py-1.5 px-2.5 rounded-lg flex flex-col items-center shadow-xs transition-all cursor-help"
                        >
                          {/* Roman typing trigger keys below */}
                          <div className="text-[10px] text-slate-400 font-mono group-hover:text-indigo-600 font-bold">
                            {seg.original}
                          </div>
                          {/* Transliterated Result glyph */}
                          <div className="text-base font-semibold text-slate-800 group-hover:scale-110 transition-transform font-serif">
                            {seg.transliterated}
                          </div>

                          {/* Float hovering Tooltip information card */}
                          <div className="pointer-events-none opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-slate-900 text-white rounded-lg p-2 text-[10px] text-center z-50 shadow-md leading-relaxed transition-opacity">
                            <span className="font-bold text-indigo-400 block mb-0.5">
                              {seg.type.toUpperCase().replace("_", " ")}
                            </span>
                            Keystrokes: <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300 font-mono font-bold">{seg.original}</code>
                            <div className="mt-1 border-t border-slate-800 pt-1 text-slate-300">
                              Produces: {seg.transliterated}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick interactive user hint guides */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 mb-2 flex items-center gap-1.5">
              <CornerDownLeft className="w-3.5 h-3.5 text-indigo-500" />
              Keystroke Modifiers Cheat Sheet
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs leading-relaxed text-slate-600">
              <div className="p-2 border border-slate-100 rounded-lg bg-slate-50/50">
                <span className="font-bold text-slate-900 block font-mono">Vowel Modifiers</span>
                <span className="text-slate-500">Append vowel keys directly code:</span>
                <code className="bg-slate-200 px-1 font-mono rounded mt-0.5 inline-block text-[11px] text-slate-800">k + a = {activeMapping.consonants[0]?.char || "क"}</code> or <code className="bg-slate-200 px-1 font-mono rounded mt-0.5 inline-block text-slate-800">k + aa = {activeMapping.consonants[0]?.char || "क"}{activeMapping.matras[0]?.char || "ा"}</code>
              </div>
              <div className="p-2 border border-slate-100 rounded-lg bg-slate-50/50">
                <span className="font-bold text-slate-900 block font-mono">Consonant Joint/Halant</span>
                <span className="text-slate-500">Typing consonants next to each other creates half letters or joint compound forms.</span>
              </div>
              <div className="p-2 border border-slate-100 rounded-lg bg-slate-50/50">
                <span className="font-bold text-slate-900 block font-mono">Special Signs</span>
                <span className="text-slate-500">Use uppercase <code className="font-bold text-slate-800">M</code> for Anusvara nasal dot, and <code className="font-bold text-slate-800">H</code> for Visarga draft sound.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-script study & mapping interactive keys column */}
        <div className={isCompactMode ? "" : "lg:col-span-12 xl:col-span-5 flex flex-col gap-4"}>
          {/* Virtual key maps widget */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            {/* Header containing filter buttons & parameters searching */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold text-xs font-mono">
                <Keyboard className="w-4 h-4 text-indigo-500" />
                <span>Interactive Sound Board Mapping</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                Click elements to append into editor
              </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {/* Filter selections bar */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: "all", label: "All Keys" },
                  { id: "vowels", label: "Vowels Only" },
                  { id: "consonants", label: "Consonants Only" },
                  { id: "matras", label: "Matra Shapes" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setKeyboardCategory(cat.id as any)}
                    className={`text-xs px-2.5 py-1 rounded-md transition duration-200 cursor-pointer ${
                      keyboardCategory === cat.id
                        ? "bg-indigo-600 text-white font-semibold"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Character Search filter */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter keys... e.g. type 'k' or 'aa'"
                  value={keyboardSearch}
                  onChange={(e) => setKeyboardSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-md focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Keys grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 xl:grid-cols-4 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {filteredKeysList.length > 0 ? (
                  filteredKeysList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleKeyboardKeyClick(item.key)}
                      className="group relative flex flex-col justify-between items-center bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 p-2 rounded-lg transition-all duration-150 cursor-pointer shadow-xs active:scale-95 text-center"
                      title={item.description || `Inserts '${item.key}' representing the glyph '${item.char}'`}
                    >
                      {/* Keystroke trigger text label */}
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-700 font-bold block">
                        {item.key}
                      </span>
                      {/* Character value output display */}
                      <span className="text-base font-bold text-slate-800 group-hover:scale-105 block mt-0.5 font-serif">
                        {item.char}
                      </span>

                      {/* Floating tag label indicating character category */}
                      <span className="hidden group-hover:inline-block pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded leading-none whitespace-nowrap z-30">
                        {item.category}: {item.key}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-6 text-center text-xs text-slate-400">
                    No character keys matched your search
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Core concept learning tooltip help box */}
          <div className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-indigo-500/15 rounded-full blur-2xl"></div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-display text-white mb-1">
                  Did you know?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unlike alphabetic English sentences, Indic scripts are arranged <b>syllabically</b> (aksharas) according to point of articulation (throat, palate, roof of mouth, teeth, lips). This system ensures highly phonetic typing mappings. Once you learn the core consonant row patterns, you can type effortlessly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Tab 2: Guided practice spelling challenges
   */
  function renderLessonsView(isCompactMode: boolean) {
    return (
      <div className={`grid grid-cols-1 ${isCompactMode ? "gap-4" : "lg:grid-cols-12 gap-6"} flex-1`}>
        {/* Left Side: Select challenge lessons */}
        <div className={isCompactMode ? "" : "lg:col-span-4 flex flex-col gap-4"}>
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-4 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Course Syllabus Map
              </h3>
              <p className="text-xs text-slate-500">
                Choose a phonetic typing challenge to check and master script writing
              </p>
            </div>

            {/* Streak count widget */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-200 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-indigo-500 fill-indigo-500 animate-bounce" />
                <div>
                  <span className="text-xs text-slate-500 font-mono block">SPARK STREAK</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {streak} Challenge{streak !== 1 ? "s" : ""} Mastered
                  </span>
                </div>
              </div>
              <button
                onClick={() => updateStreak(0)}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-mono underline cursor-pointer"
                title="Reset local mastery progress score"
              >
                Reset
              </button>
            </div>

            {/* List of Lessons */}
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {PRACTICAL_LESSONS.map((lesson) => {
                const isSelected = selectedLessonId === lesson.id;
                const lang = LANGUAGE_MAPPINGS[lesson.langId] || LANGUAGE_MAPPINGS.hindi;

                return (
                  <button
                    id={`lesson-selector-${lesson.id}`}
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      setLessonInput("");
                      setLessonSuccess(false);
                    }}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-750 text-white shadow-md ring-2 ring-indigo-500/10"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono tracking-wider font-semibold uppercase px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-white text-indigo-700 font-bold" : "bg-slate-200 text-slate-600"
                      }`}>
                        {lang.script}
                      </span>
                      <span className="text-[10px] font-mono font-bold opacity-80">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <span className="font-bold text-xs block mt-1.5 leading-tight">
                      {lesson.title}
                    </span>
                    <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      Spelling words: {lesson.promptEnglish}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Primary Practice Desk Interface */}
        <div className={isCompactMode ? "" : "lg:col-span-8 flex flex-col gap-4"}>
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col p-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono block">
              PHONETIC CHALLENGE SYSTEM
            </span>
            <h2 className="text-xl font-bold font-display text-slate-900 mt-1">
              {currentLesson.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Clue / Usage: {currentLesson.clue}
            </p>

            {/* Targets displays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {/* Target Roman characters phonetics */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-mono block mb-1">
                  Target Roman Spelling
                </span>
                <span className="text-2xl font-mono font-bold text-slate-900 block tracking-wider">
                  {currentLesson.promptEnglish}
                </span>
              </div>

              {/* Target indigenous Script Glyphs */}
              <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4 text-center">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide font-mono block mb-1">
                  Expected Output Script
                </span>
                <span className="text-3xl font-bold text-indigo-950 block tracking-normal font-serif">
                  {currentLesson.solutionNative}
                </span>
              </div>
            </div>

            {/* Guided breakdown steps list */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-mono block mb-2">
                Spelling Syllable breakdown map:
              </span>
              <div className="flex flex-wrap gap-3">
                {currentLesson.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded font-black text-slate-800">
                      {step.key}
                    </span>
                    <span className="text-xs text-slate-400">→</span>
                    <span className="text-sm font-bold text-slate-800">
                      {step.char}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge input box editor */}
            <div className="mt-8 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide font-mono block">
                Type the correct roman spellings pattern:
              </span>
              <div className="relative">
                <input
                  id="challenge-practice-input"
                  type="text"
                  value={lessonInput}
                  onChange={(e) => handleLessonInputChange(e.target.value)}
                  placeholder={`Type and compile "${currentLesson.promptEnglish}"`}
                  className={`w-full p-4 text-lg font-mono border rounded-xl focus:outline-hidden transition-all duration-300 ${
                    lessonSuccess
                      ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 text-emerald-950"
                      : "bg-slate-50/50 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  disabled={lessonSuccess}
                />
                <div className="absolute right-3.5 top-3.5">
                  {lessonSuccess && (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 animate-bounce" />
                  )}
                </div>
              </div>

              {/* Dynamic conversion translation mirror */}
              {lessonInput && (
                <div className="p-3 bg-slate-100 rounded-lg text-xs flex items-center justify-between text-slate-600">
                  <span>
                    Your Typed Output:{" "}
                    <b>
                      {
                        transliterateDetailed(lessonInput, currentLesson.langId, {
                          autoTerminalVowel: true,
                        }).output
                      }
                    </b>
                  </span>
                  <span>Press Submit / Next to advance</span>
                </div>
              )}

              {/* Success validation message box & control buttons */}
              <AnimatePresence>
                {lessonSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-900 mt-2 text-xs"
                  >
                    <h4 className="font-bold text-sm flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
                      Wonderful Spelling Achievement!
                    </h4>
                    Excellent! The key sequence accurately matches that phonetic sequence. Tap the button below to claim your spark point and master the next script word challenge.
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Button controllers */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handleFirstHint}
                  className="text-xs text-indigo-700 font-semibold hover:text-indigo-900 flex items-center gap-1 underline transition cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
                  Need a hint?
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleSkipLesson}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition"
                  >
                    Skip Word
                  </button>
                  <button
                    id="lesson-action-btn"
                    onClick={handleNextLesson}
                    disabled={!lessonSuccess}
                    className={`px-5 py-2.5 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition ${
                      lessonSuccess
                        ? "bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer"
                        : "bg-slate-200 text-slate-400 pointer-events-none"
                    }`}
                  >
                    <span>{lessonSuccess ? "Next Challenge" : "Solve to Unlock"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    function handleFirstHint() {
      if (currentLesson.promptEnglish) {
        setLessonInput(currentLesson.promptEnglish);
        setLessonSuccess(true);
      }
    }
  }

  /**
   * Tab 3: Comparative script workspace (Type once, view in Hindi, Tamil, Telugu, Kannada, Bengali...)
   */
  function renderComparatorView(isCompactMode: boolean) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-bold font-display text-slate-900">
            Multi-Script Translit Matrix
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Type any Latin word and monitor its orthography simultaneously mapped across Devanagari, Dravidian and Bengali variants. Perfect for comparative studies, identifying script cognates, and studying mapping nuances!
          </p>
        </div>

        {/* Input area */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 font-mono text-[10px] tracking-wide uppercase">
            Input Query string
          </label>
          <input
            id="comparator-matrix-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type any character string... e.g. typing 'guru'"
            className="w-full p-3 font-mono text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Matrix comparisons lists cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparedOutputs.map((lang) => (
            <div
              key={lang.id}
              className={`border rounded-xl p-4 transition-all duration-150 ${
                selectedLang === lang.id
                  ? "border-indigo-500 bg-indigo-50/20 shadow-xs"
                  : "border-slate-200 bg-slate-50/30 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">
                    {lang.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Script: {lang.script}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLang(lang.id)}
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                    selectedLang === lang.id
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
                  title="Make this language active on main playground"
                >
                  {selectedLang === lang.id ? "Selected" : "Use script"}
                </button>
              </div>

              {/* Master glyph comparative presentation */}
              <div className="text-center py-4 bg-white rounded-lg border border-slate-100 mb-3 shadow-2xs">
                {lang.translit ? (
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    {lang.translit}
                  </span>
                ) : (
                  <span className="text-xs text-slate-300 italic">No output</span>
                )}
              </div>

              {/* Details table and actions */}
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 font-mono">
                  Sample: {lang.exampleEnglish} → {lang.exampleNative}
                </span>
                <button
                  onClick={() => handleCopyToClipboard(lang.translit)}
                  className="text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  title="Copy this specific script's output"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /**
   * Tab 4: Study Center with dynamic mapping matrices for all language letters
   */
  function renderStudyView(isCompactMode: boolean) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900">
              Grammatical Key Matrix Directory
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Study standard phonetic keyboard mapping schemas directly below to understand root swar, vyanjan and diacritics values.
            </p>
          </div>

          {/* Quick interactive print/reference details */}
          <div className="flex items-center gap-1.5 self-start text-xs text-slate-400 bg-slate-50 border border-slate-100 py-1.5 px-3 rounded-lg font-mono">
            <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Synced 2026-05 ISO Maps</span>
          </div>
        </div>

        {/* Dynamic Study Table cards splits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Swar / Independent Vowels block */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">
                Swar / Independent Vowels Schema
              </span>
              <span className="text-xs bg-indigo-50 px-2.5 py-0.5 rounded text-indigo-700 font-mono font-bold">
                {activeMapping.vowels.length} Glyphs
              </span>
            </div>
            <div className="p-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {activeMapping.vowels.map((v, vIdx) => (
                  <div
                    key={vIdx}
                    onClick={() => handleKeyboardKeyClick(v.key)}
                    className="flex flex-col justify-center items-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-400 cursor-pointer text-center group transition"
                  >
                    <span className="text-[11px] font-mono font-bold text-indigo-600 group-hover:text-indigo-800">
                      {v.key}
                    </span>
                    <span className="text-lg font-bold text-slate-800 mt-1 font-serif">
                      {v.char}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dependent diacritics (Matra shapes) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">
                Matra Modifiers / Dependent Shapes
              </span>
              <span className="text-xs bg-indigo-50 px-2.5 py-0.5 rounded text-indigo-700 font-mono font-bold">
                {activeMapping.matras.length} Shapes
              </span>
            </div>
            <div className="p-3">
              <div className="text-[11px] text-slate-400 italic mb-2">
                Append after consonants (e.g., typing <b className="text-slate-600">k + {activeMapping.matras[1]?.key || "i"}</b> removes the base inherent value to construct syllables):
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {activeMapping.matras.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    onClick={() => handleKeyboardKeyClick(m.key)}
                    className="flex flex-col justify-center items-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg hover:border-indigo-400 cursor-pointer text-center group transition"
                  >
                    <span className="text-[11px] font-mono font-bold text-indigo-600 group-hover:text-indigo-800">
                      +{m.key}
                    </span>
                    <span className="text-lg font-bold text-slate-800 mt-1 font-serif">
                      {m.char}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vyanjan / Consonants complete spreadsheet layout */}
          <div className="col-span-1 md:col-span-full border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="bg-slate-50 p-3 border-b border-slate-200 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-mono">
                Vyanjan / Consonants Systematic Map Directory
              </span>
              <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-white font-mono font-bold">
                {activeMapping.consonants.length} Consonants
              </span>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100 text-slate-500 font-mono">
                    <th className="py-2.5 px-3">Latin Keys</th>
                    <th className="py-2.5 px-3">Script Character</th>
                    <th className="py-2.5 px-3">Syllabic Sample (with "a")</th>
                    <th className="py-2.5 px-3">Syllabic Compound Sample</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeMapping.consonants.slice(0, 16).map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        {c.key}
                      </td>
                      <td className="py-2.5 px-3 text-base font-bold text-slate-900 font-serif">
                        {c.char}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-indigo-900 font-serif">
                        {c.char}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-serif">
                        {c.char}{activeMapping.virama}{activeMapping.consonants[(idx + 1) % activeMapping.consonants.length]?.char}
                      </td>
                    </tr>
                  ))}
                  {activeMapping.consonants.length > 16 && (
                    <tr className="bg-slate-100">
                      <td colSpan={4} className="py-3 px-3 text-center text-[10px] text-slate-400 font-mono font-bold">
                        and {activeMapping.consonants.length - 16} more consonants are mapped dynamically in our deterministic lookup engine.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderIndicConverterView(isCompactMode: boolean) {
    const convertedText = transliterateIndicToIndic(indicInputText, indicSourceLang, selectedLang);

    const languages = [
      { id: "hindi", name: "Hindi / Sanskrit (हिन्दी / संस्कृत)", script: "Devanagari" },
      { id: "tamil", name: "Tamil (தமிழ்)", script: "Tamil" },
      { id: "kannada", name: "Kannada (ಕನ್ನಡ)", script: "Kannada" },
      { id: "telugu", name: "Telugu (తెలుగు)", script: "Telugu" },
      { id: "bengali", name: "Bengali (বাংলা)", script: "Bengali" },
      { id: "gujarati", name: "Gujarati (ગુજરાતી)", script: "Gujarati" },
    ];

    const presets = [
      {
        lang: "tamil",
        label: "Tamil wisdom (Kural)",
        text: "யாதும் ஊரே யாவரும் கேளிர்",
        meaning: "All cities are my hometown, all people are my kin"
      },
      {
        lang: "tamil",
        label: "Tamil Greeting",
        text: "வணக்கம்",
        meaning: "Vanakkam - Standard Tamil polite greeting"
      },
      {
        lang: "kannada",
        label: "Kannada Welcome",
        text: "ಶುಭೋದಯ ಕನ್ನಡ ನಾಡಿಗೆ ಬನ್ನಿ",
        meaning: "Good morning, welcome to Karnataka"
      },
      {
        lang: "hindi",
        label: "Sanskrit Gayatri Mantra",
        text: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं",
        meaning: "Let us meditate on the supreme light of the sun"
      },
      {
        lang: "telugu",
        label: "Telugu Greeting",
        text: "ನಮಸ್ಕಾರಂ తెలుగు ప్రజలకు",
        meaning: "Greetings to Telugu people"
      },
      {
        lang: "bengali",
        label: "Bengali Greeting",
        text: "নমস্কার কেমন আছেন",
        meaning: "Hello, how are you?"
      },
      {
        lang: "gujarati",
        label: "Gujarati Welcome",
        text: "કેમ છો મજામાં",
        meaning: "How are you? Are you fine?"
      }
    ];

    // Character mapping keys for the comparative matrix table
    const matrixVowelKeys = ["a", "aa", "i", "ee", "u", "uu", "e", "ee", "ai", "o", "oo", "au"];
    const matrixMatraKeys = ["aa", "i", "ee", "u", "uu", "e", "ee", "ai", "o", "oo", "au"];
    const matrixConsonantKeys = [
      "k", "kh", "g", "gh", "ng",
      "ch", "chh", "j", "jh", "ny",
      "T", "Th", "D", "Dh", "N",
      "t", "th", "d", "dh", "n",
      "p", "ph", "b", "bh", "m",
      "y", "r", "l", "v",
      "sh", "Sh", "s", "h",
      "L"
    ];

    const getGlyph = (langId: string, category: "vowel" | "consonant" | "matra", key: string): string => {
      const mapping = LANGUAGE_MAPPINGS[langId];
      if (!mapping) return "-";
      if (category === "vowel") {
        const found = mapping.vowels.find(v => v.key === key);
        return found ? found.char : "-";
      } else if (category === "matra") {
        const found = mapping.matras.find(m => m.key === key);
        return found ? found.char : "-";
      } else if (category === "consonant") {
        const found = mapping.consonants.find(c => c.key === key);
        return found ? found.char : "-";
      }
      return "-";
    };

    const targetLangDisplay = languages.find(l => l.id === selectedLang);
    const activeMapping = LANGUAGE_MAPPINGS[indicKeyboardLang] || LANGUAGE_MAPPINGS.hindi;
    
    // Choose keys based on active state of keyboard tab
    const keyboardKeys =
      indicKeyboardTab === "vowels"
        ? activeMapping.vowels
        : indicKeyboardTab === "consonants"
        ? activeMapping.consonants
        : activeMapping.matras;

    return (
      <div className="bg-slate-50 min-h-screen p-1 sm:p-4 flex flex-col gap-6">
        {/* Live Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Input Panel with Soft Typing Keyboard Helper */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">
                    1. Source Indic Input
                  </h3>
                </div>
                
                {/* Source Selection Dropdown */}
                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                    From:
                  </label>
                  <select
                    id="indic-source-lang-select"
                    value={indicSourceLang}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIndicSourceLang(val);
                      // Auto align keyboard with selected source if not auto
                      if (val !== "auto") {
                        setIndicKeyboardLang(val);
                      }
                    }}
                    className="p-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="auto">🔍 Auto-detect Script</option>
                    {languages.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-1.5 relative">
                <textarea
                  id="indic-source-textarea"
                  rows={4}
                  value={indicInputText}
                  onChange={(e) => setIndicInputText(e.target.value)}
                  placeholder="Paste native text here or use the Soft Typing Deck below to select letters..."
                  className="w-full p-4 font-serif text-lg bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400 placeholder:italic leading-relaxed resize-y shadow-inner"
                />
              </div>

              {/* Soft Keyboard Typing Utility Box */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 mt-2 shadow-xs">
                <div className="flex flex-col gap-3">
                  
                  {/* Keyboard Language Selector Tab Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-100 p-1.5 rounded-xl">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                      Soft Keypad Script:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {languages.map((l) => {
                        const isKeyboardSelected = indicKeyboardLang === l.id;
                        const kbdStyles = LANG_COLOR_MAP[l.id] || LANG_COLOR_MAP.hindi;
                        return (
                          <button
                            id={`kbd-lang-tab-${l.id}`}
                            key={l.id}
                            onClick={() => {
                              setIndicKeyboardLang(l.id);
                              // Sync source language dropdown to keep things consistent!
                              setIndicSourceLang(l.id);
                            }}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg transition-all active:scale-95 ${
                              isKeyboardSelected
                                ? `${kbdStyles.bgBadge} ${kbdStyles.textBadge} border ${kbdStyles.borderBadge} shadow-xs font-black`
                                : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                            }`}
                          >
                            {l.script}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Character Groups Selector Tabs */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex gap-1.5">
                      {(["vowels", "consonants", "matras"] as const).map((tab) => {
                        const isActive = indicKeyboardTab === tab;
                        let activeStyle = "bg-white border border-slate-200 text-slate-700 shadow-xs";
                        if (isActive) {
                          if (tab === "vowels") {
                            activeStyle = "bg-amber-500 text-white border-amber-500 shadow-sm ring-4 ring-amber-500/15 font-black";
                          } else if (tab === "consonants") {
                            activeStyle = "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-4 ring-emerald-600/15 font-black";
                          } else if (tab === "matras") {
                            activeStyle = "bg-rose-500 text-white border-rose-500 shadow-sm ring-4 ring-rose-500/15 font-black";
                          }
                        }
                        return (
                          <button
                            id={`kbd-char-group-${tab}`}
                            key={tab}
                            onClick={() => setIndicKeyboardTab(tab)}
                            className={`px-3 py-1 rounded-md text-[10.5px] font-extrabold uppercase transition-all ${
                              isActive
                                ? activeStyle
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {tab === "vowels" ? "Vowels (Swar)" : tab === "consonants" ? "Consonants (Vyanjan)" : "Matras (Swar Chinha)"}
                          </button>
                        );
                      })}
                    </div>

                    <span className="text-[9px] font-mono text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                      {keyboardKeys.length} characters loaded
                    </span>
                  </div>

                  {/* Keyboard Keys Layout Panel */}
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-8 xl:grid-cols-9 gap-1.5 justify-center max-h-[190px] overflow-y-auto pr-1">
                    {keyboardKeys.map((item, index) => {
                      let keyStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-850";
                      if (indicKeyboardTab === "vowels") {
                        keyStyle = "bg-amber-50/70 hover:bg-amber-100 border-amber-200/80 hover:border-amber-400 text-amber-950 font-semibold hover:scale-105";
                      } else if (indicKeyboardTab === "consonants") {
                        keyStyle = "bg-emerald-50/50 hover:bg-emerald-100 border-emerald-200/70 hover:border-emerald-450 text-emerald-950 font-semibold hover:scale-105";
                      } else if (indicKeyboardTab === "matras") {
                        keyStyle = "bg-rose-50/50 hover:bg-rose-100 border-rose-200/70 hover:border-rose-450 text-rose-950 font-semibold hover:scale-105";
                      }

                      return (
                        <button
                          id={`kbd-key-${item.key}-${index}`}
                          key={index}
                          onClick={() => setIndicInputText(prev => prev + item.char)}
                          className={`group flex flex-col items-center justify-center p-2 active:scale-95 border rounded-lg shadow-2xs transition-all cursor-pointer select-none ${keyStyle}`}
                        >
                          <span className="text-lg font-serif font-black transition-transform group-hover:scale-110">
                            {item.char}
                          </span>
                          <span className="text-[8px] font-mono opacity-80 mt-0.5 font-bold uppercase truncate max-w-full">
                            {item.key}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Typing Control Deck Key Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-t border-slate-200 pt-2.5">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <button
                        onClick={() => setIndicInputText(prev => prev + " ")}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-all active:scale-95 flex items-center gap-1"
                        title="Add spacer block"
                      >
                        <span>␣ Space</span>
                      </button>

                      <button
                        onClick={() => {
                          setIndicInputText(prev => {
                            if (!prev) return "";
                            return prev.slice(0, -1);
                          });
                        }}
                        className="px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-850 font-semibold text-xs rounded-lg transition-all active:scale-95 flex items-center gap-1"
                      >
                        <span>⌫ Backspace</span>
                      </button>

                      {activeMapping.virama && (
                        <button
                          onClick={() => setIndicInputText(prev => prev + activeMapping.virama)}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 font-serif text-xs rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1"
                          title="Inject conjunct links (virama/halant)"
                        >
                          <span className="font-mono text-[10px] text-indigo-500 font-normal">Halant:</span>
                          <span className="text-sm font-bold bg-white px-1.5 rounded-sm shadow-2xs border border-indigo-150">
                            {activeMapping.virama}
                          </span>
                        </button>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          handleCopyToClipboard(indicInputText);
                          setCopiedIndicator(true);
                          setTimeout(() => setCopiedIndicator(false), 1500);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-800 font-semibold text-xs rounded-lg transition-all active:scale-95 inline-flex items-center gap-1"
                      >
                        {copiedIndicator ? "Copied Source!" : "Copy Source"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Minimal Presets Grid */}
              <div className="flex flex-col gap-1.5 mt-1 border-t border-slate-100 pt-3">
                <span className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-widest block">
                  Interactive Test Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, pIdx) => {
                    const presetStyles = LANG_COLOR_MAP[p.lang] || LANG_COLOR_MAP.hindi;
                    return (
                      <button
                        id={`preset-btn-${pIdx}`}
                        key={pIdx}
                        onClick={() => {
                          setIndicInputText(p.text);
                          setIndicSourceLang(p.lang);
                          setIndicKeyboardLang(p.lang);
                        }}
                        className={`px-2 py-1 border text-[10.5px] font-medium rounded-md transition-all text-left flex items-center gap-2 outline-hidden uppercase tracking-wide cursor-pointer ${presetStyles.bgBadge} ${presetStyles.borderBadge} ${presetStyles.textBadge} hover:scale-105 active:scale-95`}
                        title={p.meaning}
                      >
                        <span className="font-serif font-black">
                          {p.text}
                        </span>
                        <span className="text-[8.5px] opacity-75 font-mono font-bold">
                          ({p.label})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Quick Status Bar */}
            <div className="text-[10px] text-slate-400 font-mono mt-4 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
              <span>Length: {indicInputText.length} characters</span>
              <span className={`font-bold uppercase tracking-widest text-[8.5px] px-2 py-0.5 rounded-full border ${(LANG_COLOR_MAP[indicKeyboardLang] || LANG_COLOR_MAP.hindi).bgBadge} ${(LANG_COLOR_MAP[indicKeyboardLang] || LANG_COLOR_MAP.hindi).textBadge} ${(LANG_COLOR_MAP[indicKeyboardLang] || LANG_COLOR_MAP.hindi).borderBadge}`}>
                🚀 {activeMapping.script} keypad linked
              </span>
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">
                  2. Transliterated Target Result
                </h3>

                {/* Linked Target Script indicator matches visual selection above */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                    Target Script (linked):
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-black rounded-full border uppercase tracking-wider ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).bgBadge} ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).textBadge} ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).borderBadge}`}>
                    {targetLangDisplay ? targetLangDisplay.script : selectedLang}
                  </span>
                </div>
              </div>

              {/* Result card representation */}
              <div className="relative group bg-slate-950 rounded-2xl p-6 text-center min-h-[140px] flex flex-col justify-center items-center shadow-lg border border-slate-850 transition-all overflow-hidden">
                {/* Glowing neon bg accent */}
                <div className={`absolute -top-12 -right-12 w-48 h-48 ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).bgOutputGlow} rounded-full blur-3xl pointer-events-none transition-all duration-500`} />
                
                {convertedText ? (
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-white px-2 tracking-wide leading-relaxed filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      {convertedText}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest mt-2 px-3 py-0.5 rounded-full inline-block mx-auto border transition-colors duration-500 ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).bgOutputMarkerTab} ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).textOutputMarker} ${(LANG_COLOR_MAP[selectedLang] || LANG_COLOR_MAP.hindi).borderOutputMarkerTab}`}>
                      Rendered in {targetLangDisplay ? targetLangDisplay.script : selectedLang} Script
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic text-xs">Waiting for valid source input strings...</span>
                )}
              </div>

              {/* Action Operations */}
              <div className="flex flex-wrap gap-2 justify-end mt-2">
                <button
                  id="indic-copy-btn"
                  onClick={() => {
                    handleCopyToClipboard(convertedText);
                    setCopiedIndicator(true);
                    setTimeout(() => setCopiedIndicator(false), 2000);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedIndicator ? "Copied!" : "Copy Output"}
                </button>

                {speachSupported && (
                  <button
                    id="indic-speak-btn"
                    onClick={() => {
                      if ("speechSynthesis" in window) {
                        const utterance = new SpeechSynthesisUtterance(convertedText);
                        const voices = window.speechSynthesis.getVoices();
                        let matchingVoice = null;
                        if (selectedLang === "hindi") {
                          matchingVoice = voices.find(v => v.lang.includes("hi-IN") || v.lang.includes("hi"));
                        } else if (selectedLang === "tamil") {
                          matchingVoice = voices.find(v => v.lang.includes("ta-IN") || v.lang.includes("ta"));
                        } else if (selectedLang === "kannada") {
                          matchingVoice = voices.find(v => v.lang.includes("kn-IN") || v.lang.includes("kn"));
                        } else if (selectedLang === "telugu") {
                          matchingVoice = voices.find(v => v.lang.includes("te-IN") || v.lang.includes("te"));
                        } else if (selectedLang === "bengali") {
                          matchingVoice = voices.find(v => v.lang.includes("bn-IN") || v.lang.includes("bn"));
                        }
                        if (matchingVoice) utterance.voice = matchingVoice;
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-all outline-hidden cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                    Speak result
                  </button>
                )}
              </div>
            </div>

            {/* Explanatory Note */}
            <div className="text-[10.5px] text-slate-500 mt-4 leading-relaxed bg-indigo-50/40 border border-indigo-100/50 p-3 rounded-lg flex gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                <b>Phonetic Congruency Tip:</b> Notice how Tamil <b className="text-indigo-900 font-serif">வணக்கம்</b> contains EXACT corresponding letter blocks to Kannada <b className="text-indigo-900 font-serif">ವಣಕ್ಕಮ್</b>. This enables instant script transposition without any intermediate semantic distortion!
              </span>
            </div>
          </div>
        </div>

        {/* Universal Script Mapping Matrix Section */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Universal Script Correspondence Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
                Compare phoneme representation side-by-side. Observe how vowels, consonants and matras render uniformly across all six scripts!
              </p>
            </div>
            
            {/* Table categories choice */}
            <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg self-start">
              {(["vowels", "consonants", "matras"] as const).map((cat) => (
                <button
                  id={`matrix-cat-tab-${cat}`}
                  key={cat}
                  onClick={() => setMatrixCategory(cat as any)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition ${
                    matrixCategory === cat
                      ? "bg-white text-indigo-600 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat === "vowels" ? "Vowels (Swar)" : cat === "consonants" ? "Consonants (Vyanjan)" : "Matras (Diacritics)"}
                </button>
              ))}
            </div>
          </div>

          {/* Grid spreadsheet matrix table */}
          <div className="overflow-x-auto border border-slate-100 rounded-xl font-sans">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono text-slate-500">
                  <th className="py-3 px-2 font-bold text-left pl-4 w-32 bg-slate-50">SOUND/KEY</th>
                  {languages.map((l) => {
                    const isCurTarget = l.id === selectedLang;
                    const styles = LANG_COLOR_MAP[l.id] || LANG_COLOR_MAP.hindi;
                    return (
                      <th
                        key={l.id}
                        className={`py-3 px-2 border-l border-slate-150 font-black font-serif uppercase tracking-wider text-xs transition-all ${
                          isCurTarget
                            ? `${styles.bgBadge} ${styles.textBadge} ring-2 ring-indigo-500/10`
                            : "bg-slate-50/50 text-slate-700"
                        }`}
                      >
                        {l.script}
                        {isCurTarget && (
                          <span className="block text-[8px] font-mono tracking-widest text-indigo-500 font-extrabold uppercase mt-0.5 animate-bounce">
                            ★ TARGET
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {(matrixCategory === "vowels" ? matrixVowelKeys : matrixCategory === "matras" ? matrixMatraKeys : matrixConsonantKeys).map((key) => (
                  <tr key={key} className="hover:bg-slate-50 transition-colors">
                    {/* Phoneme/IPA Key Label Column */}
                    <td className="py-3 px-3 text-left pl-4 font-mono font-bold text-xs text-indigo-700 bg-indigo-50/25 border-r border-slate-100">
                      {matrixCategory === "matras" ? `+${key}` : key}
                    </td>

                    {languages.map((l) => {
                      const isCurTarget = l.id === selectedLang;
                      const styles = LANG_COLOR_MAP[l.id] || LANG_COLOR_MAP.hindi;
                      const glyph = getGlyph(l.id, matrixCategory === "vowels" ? "vowel" : matrixCategory === "matras" ? "matra" : "consonant", key);
                      
                      return (
                        <td
                          key={l.id}
                          className={`py-3 px-2 font-bold text-xl border-l border-slate-100/60 font-serif transition-colors ${
                            isCurTarget
                              ? `${styles.bgBadge}/45 ${styles.textBadge} scale-102 font-serif font-extrabold`
                              : "text-slate-800"
                          }`}
                        >
                          {glyph}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
