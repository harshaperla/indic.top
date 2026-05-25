/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Info } from "lucide-react";
import { LANGUAGE_MAPPINGS } from "../transliteration";

interface StudyViewProps {
  selectedLang: string;
  onKeyClick: (key: string) => void;
}

export default function StudyView({ selectedLang, onKeyClick }: StudyViewProps) {
  const activeMapping = LANGUAGE_MAPPINGS[selectedLang] || LANGUAGE_MAPPINGS.hindi;

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
                  onClick={() => onKeyClick(v.key)}
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
                  onClick={() => onKeyClick(m.key)}
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
