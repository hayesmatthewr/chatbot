// Word start times (s) from a Whisper transcription of the voiceover.
// Each inner array is one caption group (one spoken phrase).
export type Word = { w: string; t: number };

const g = (pairs: [string, number][]): Word[] => pairs.map(([w, t]) => ({ w, t }));

export const GROUPS: Word[][] = [
  g([["Your", 0.0], ["focus", 0.18], ["isn't", 0.46], ["broken,", 0.84], ["it's", 1.4], ["being", 1.5], ["overridden.", 1.66]]),
  g([["48", 2.5], ["people", 2.76], ["were", 3.2], ["tested", 3.4], ["for", 3.64], ["attention", 3.86], ["and", 4.16], ["self-control,", 4.38]]),
  g([["while", 5.14], ["EEG", 5.28], ["tracked", 5.74], ["their", 5.98], ["brainwaves.", 6.24]]),
  g([["The", 6.98], ["more", 7.04], ["doom-scrolling,", 7.18], ["the", 7.94], ["weaker", 8.02], ["the", 8.24], ["prefrontal", 8.44], ["cortex", 8.94], ["fired", 9.2]]),
  g([["when", 9.64], ["it", 9.9], ["had", 10.0], ["to", 10.1], ["filter", 10.22], ["distractions.", 10.4]]),
  g([["That's", 11.32], ["executive", 11.54], ["control,", 11.82]]),
  g([["your", 12.56], ["brain", 12.66], ["system", 12.88], ["for", 13.22], ["saying", 13.48], ["no,", 13.68]]),
  g([["holding", 14.12], ["focus,", 14.32], ["staying", 15.0], ["on", 15.22], ["task.", 15.4]]),
  g([["Fast", 16.24], ["dopamine,", 16.62], ["slower", 17.34], ["control,", 17.54], ["that's", 18.2], ["the", 18.42], ["trade,", 18.52]]),
  g([["and", 18.96], ["you're", 19.04], ["making", 19.16], ["it", 19.36], ["right", 19.52], ["now.", 19.66]]),
];

/** Start time of a spoken word (first match at or after `after`). */
export const at = (word: string, after = 0) => {
  for (const grp of GROUPS) for (const x of grp) if (x.t >= after && x.w.replace(/[,.]/g, "") === word) return x.t;
  throw new Error(`word not found: ${word}`);
};
