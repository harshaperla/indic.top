/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
