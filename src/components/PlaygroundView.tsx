/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import {
  Keyboard,
  RotateCcw,
  Lightbulb,
  Sparkles,
  Volume2,
  Copy,
  Check,
  CornerDownLeft,
  Search,
  HelpCircle,
} from "lucide-react";
import {
  LANGUAGE_MAPPINGS,
  transliterateDetailed,
} from "../transliteration";

interface PlaygroundViewProps {
  isCompactMode: boolean;
  selectedLang: string;
  inputText: string;
  setInputText: (text: string) => void;
  autoTerminalVowel: boolean;
  speachSupported: boolean;
  isSpeaking: boolean;
  handleTextToSpeech: (textToRead: string, langCode: string) => void;
}

export default function PlaygroundView({
  isCompactMode,
  selectedLang,
  inputText,
  setInputText,
  autoTerminalVowel,
  speachSupported,
  isSpeaking,
  handleTextToSpeech,
}: PlaygroundViewProps) {
  const [keyboardCategory, setKeyboardCategory] = useState<"all" | "vowels" | "consonants" | "matras">("all");
  const [keyboardSearch, setKeyboardSearch] = useState<string>("");
  const [copiedIndicator, setCopiedIndicator] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
      setInputText(inputText + keyString);
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

  // Filtered keys for the Interactive Study Keyboard Map (Deduplicated)
  const getFilteredKeys = () => {
    const list: { key: string; char: string; category: string; description?: string }[] = [];

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

    // Group and deduplicate keys by character representation to avoid visual keyboard duplicates
    const uniqueList: { key: string; char: string; category: string; description?: string; allKeys: string[] }[] = [];
    const charMap = new Map<string, typeof uniqueList[0]>();

    list.forEach(item => {
      const existing = charMap.get(item.char);
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
        charMap.set(item.char, newItem);
        uniqueList.push(newItem);
      }
    });

    let result = uniqueList;

    if (keyboardSearch.trim() !== "") {
      const query = keyboardSearch.toLowerCase();
      result = result.filter((item) =>
        item.allKeys.some(k => k.toLowerCase().includes(query)) ||
        item.char.includes(query)
      );
    }

    return result;
  };

  const filteredKeysList = getFilteredKeys();

  const samplePills = [
    { text: "namaste", label: "नमस्ते (Hello)" },
    { text: "bhaarata", label: "भारत (India)" },
    { text: "shanti", label: "शान्ति (Peace)" },
    { text: "dhanyavaad", label: "धन्यवाद (Thanks)" },
    { text: "karma", label: "कर्म (Karma)" },
    { text: "guru", label: "गुरु (Teacher)" },
  ];

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
              <span className="text-slate-500">Append vowel keys directly:</span>
              <code className="bg-slate-200 px-1 font-mono rounded mt-0.5 inline-block text-[11px] text-slate-800">k + a = {activeMapping.consonants[0]?.char || "क"}</code> or <code className="bg-slate-200 px-1 font-mono rounded mt-0.5 inline-block text-slate-800">k + aa = {activeMapping.consonants[0]?.char || "क"}{activeMapping.matras[0]?.char || "ಾ"}</code>
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
                    onClick={() => handleKeyboardKeyClick(item.allKeys ? item.allKeys[0] : item.key)}
                    className="group relative flex flex-col justify-between items-center bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 p-2 rounded-lg transition-all duration-150 cursor-pointer shadow-xs active:scale-95 text-center"
                    title={item.description || `Inserts '${item.allKeys ? item.allKeys[0] : item.key}' representing the glyph '${item.char}'`}
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
