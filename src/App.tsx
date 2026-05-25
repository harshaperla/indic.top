/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import logo from "./assets/indic.top.png";
import {
  Keyboard,
  BookOpen,
  Smartphone,
  Laptop,
  Info,
  Award,
  Globe2,
} from "lucide-react";
import { LANGUAGE_MAPPINGS } from "./transliteration";
import { LANG_COLOR_MAP } from "./constants/colors";
import PlaygroundView from "./components/PlaygroundView";
import IndicConverterView from "./components/IndicConverterView";
import LessonsView from "./components/LessonsView";
import ComparatorView from "./components/ComparatorView";
import StudyView from "./components/StudyView";

export default function App() {
  // Application Views & Layout States
  const [selectedLang, setSelectedLang] = useState<string>("hindi");
  const [inputText, setInputText] = useState<string>("namaste bhaarata");
  const [autoTerminalVowel, setAutoTerminalVowel] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"playground" | "study" | "lessons" | "comparator" | "indic-converter">("indic-converter");
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Speech Synth state
  const [speachSupported, setSpeechSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }
  }, []);

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

  const handleKeyClickGlobal = (keyString: string) => {
    setInputText((prev) => prev + keyString);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900 font-sans">
      {/* Upper Subtle Announcement System */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs font-mono flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Phonetic Offline Engine: ACTIVE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Lat: 2026-05-25</span>
          <span>UTC Client Sandbox</span>
        </div>
      </div>

      {/* Primary Navigation Shell header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
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
        <div className="border-t border-slate-100 bg-slate-50/50 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 min-w-max">
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

      {/* Dynamic Master Area Layout Handler */}
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
            <span className="text-slate-400">Ver 1.1.0</span>
            <span className="text-slate-400">Time: 2026-05-25</span>
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
        {/* Unified Language Flag / Title selection rail */}
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

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-sans">
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
                  className={`group flex flex-col justify-between p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[160px] sm:min-h-[190px] relative overflow-hidden text-left focus:outline-hidden ${
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

                  {/* Aesthetic Calligraphy Emblem */}
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
                    
                    {/* Small preview of the language signature letter */}
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

        {/* Dispatch to view components */}
        {activeTab === "playground" && (
          <PlaygroundView
            isCompactMode={isCompactMode}
            selectedLang={selectedLang}
            inputText={inputText}
            setInputText={setInputText}
            autoTerminalVowel={autoTerminalVowel}
            speachSupported={speachSupported}
            isSpeaking={isSpeaking}
            handleTextToSpeech={handleTextToSpeech}
          />
        )}
        {activeTab === "indic-converter" && (
          <IndicConverterView
            isCompactMode={isCompactMode}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            speachSupported={speachSupported}
          />
        )}
        {activeTab === "lessons" && (
          <LessonsView isCompactMode={isCompactMode} />
        )}
        {activeTab === "comparator" && (
          <ComparatorView
            inputText={inputText}
            setInputText={setInputText}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            autoTerminalVowel={autoTerminalVowel}
          />
        )}
        {activeTab === "study" && (
          <StudyView
            selectedLang={selectedLang}
            onKeyClick={handleKeyClickGlobal}
          />
        )}
      </div>
    );
  }
}
