/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Keyboard,
  Sparkles,
  Copy,
  Volume2,
} from "lucide-react";
import {
  LANGUAGE_MAPPINGS,
  transliterateIndicToIndic,
} from "../transliteration";
import { LANG_COLOR_MAP } from "../constants/colors";

interface IndicConverterViewProps {
  isCompactMode: boolean;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  speachSupported: boolean;
}

export default function IndicConverterView({
  isCompactMode,
  selectedLang,
  setSelectedLang,
  speachSupported,
}: IndicConverterViewProps) {
  // Localized states specific to converter view
  const [indicInputText, setIndicInputText] = useState<string>("வணக்கம்");
  const [indicSourceLang, setIndicSourceLang] = useState<string>("auto");
  const [indicKeyboardLang, setIndicKeyboardLang] = useState<string>("hindi");
  const [indicKeyboardTab, setIndicKeyboardTab] = useState<"vowels" | "consonants" | "matras">("vowels");
  const [matrixCategory, setMatrixCategory] = useState<"vowels" | "consonants" | "matras">("vowels");
  const [copiedIndicator, setCopiedIndicator] = useState<boolean>(false);

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
      text: "నమస్కారం తెలుగు ప్రజలకు",
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
  const matrixVowelKeys = ["a", "aa", "i", "ii", "u", "uu", "ri", "e", "ee", "ai", "o", "oo", "au"];
  const matrixMatraKeys = ["aa", "i", "ii", "u", "uu", "ri", "e", "ee", "ai", "o", "oo", "au"];
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
  const rawKeyboardKeys =
    indicKeyboardTab === "vowels"
      ? activeMapping.vowels
      : indicKeyboardTab === "consonants"
      ? activeMapping.consonants
      : activeMapping.matras;

  // Deduplicate and group keyboard keys by character representation to avoid duplicate buttons
  const keyboardKeys: { key: string; char: string; allKeys: string[] }[] = [];
  const kbdCharMap = new Map<string, typeof keyboardKeys[0]>();

  rawKeyboardKeys.forEach(item => {
    const existing = kbdCharMap.get(item.char);
    if (existing) {
      if (!existing.allKeys.includes(item.key)) {
        existing.allKeys.push(item.key);
        existing.key = existing.allKeys.join(" / ");
      }
    } else {
      const newItem = {
        ...item,
        allKeys: [item.key]
      };
      kbdCharMap.set(item.char, newItem);
      keyboardKeys.push(newItem);
    }
  });

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndicator(true);
    setTimeout(() => setCopiedIndicator(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Live Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Input Panel with Soft Typing Keyboard Helper */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-100 p-1.5 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                    Soft Keypad Script:
                  </span>
                  <div className="flex flex-wrap gap-1 justify-end">
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
                          {tab === "vowels" ? (
                            <>
                              <span className="hidden sm:inline">Vowels (Swar)</span>
                              <span className="sm:hidden">Vowels</span>
                            </>
                          ) : tab === "consonants" ? (
                            <>
                              <span className="hidden sm:inline">Consonants (Vyanjan)</span>
                              <span className="sm:hidden">Consonants</span>
                            </>
                          ) : (
                            <>
                              <span className="hidden sm:inline">Matras (Swar Chinha)</span>
                              <span className="sm:hidden">Matras</span>
                            </>
                          )}
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
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
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

          {/* Table split tab actions switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start text-xs font-semibold text-slate-600">
            {(["vowels", "consonants", "matras"] as const).map((cat) => (
              <button
                id={`matrix-cat-tab-${cat}`}
                key={cat}
                onClick={() => setMatrixCategory(cat)}
                className={`px-3 py-1.5 rounded-lg uppercase transition-all duration-150 cursor-pointer ${
                  matrixCategory === cat
                    ? "bg-white text-indigo-700 shadow-sm font-black"
                    : "hover:text-slate-900"
                }`}
              >
                {cat}
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
