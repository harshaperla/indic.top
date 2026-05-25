/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Copy } from "lucide-react";
import {
  LANGUAGE_MAPPINGS,
  transliterateDetailed,
} from "../transliteration";

interface ComparatorViewProps {
  inputText: string;
  setInputText: (text: string) => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  autoTerminalVowel: boolean;
}

export default function ComparatorView({
  inputText,
  setInputText,
  selectedLang,
  setSelectedLang,
  autoTerminalVowel,
}: ComparatorViewProps) {
  const [copiedIndicator, setCopiedIndicator] = useState<boolean>(false);

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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndicator(true);
    setTimeout(() => setCopiedIndicator(false), 1500);
  };

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
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full cursor-pointer ${
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
