/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Flame,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import {
  LANGUAGE_MAPPINGS,
  transliterateDetailed,
} from "../transliteration";
import { PRACTICAL_LESSONS, Lesson } from "../lessons";

interface LessonsViewProps {
  isCompactMode: boolean;
}

export default function LessonsView({ isCompactMode }: LessonsViewProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<string>("h1");
  const [lessonInput, setLessonInput] = useState<string>("");
  const [lessonSuccess, setLessonSuccess] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(() => {
    try {
      return Number(localStorage.getItem("indic_lesson_streak") || "0");
    } catch {
      return 0;
    }
  });

  // Sync streaks to local storage
  const updateStreak = (newStreak: number) => {
    setStreak(newStreak);
    try {
      localStorage.setItem("indic_lesson_streak", String(newStreak));
    } catch (e) {
      console.warn("Storage unreachable", e);
    }
  };

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

  const handleFirstHint = () => {
    if (currentLesson.promptEnglish) {
      setLessonInput(currentLesson.promptEnglish);
      setLessonSuccess(true);
    }
  };

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
}
